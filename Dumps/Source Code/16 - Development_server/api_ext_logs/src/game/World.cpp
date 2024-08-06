/*
 * Copyright (C) 2005-2011 MaNGOS <http://getmangos.com/>
 * Copyright (C) 2009-2011 MaNGOSZero <https://github.com/mangos/zero>
 * Copyright (C) 2011-2016 Nostalrius <https://nostalrius.org>
 * Copyright (C) 2016-2017 Elysium Project <https://github.com/elysium-project>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

/** \file
    \ingroup world
*/

#include "World.h"
#include "Database/DatabaseEnv.h"
#include "Config/Config.h"
#include "Platform/Define.h"
#include "SystemConfig.h"
#include "Log.h"
#include "Opcodes.h"
#include "WorldSession.h"
#include "WorldPacket.h"
#include "Weather.h"
#include "Player.h"
#include "AccountMgr.h"
#include "AuctionHouseMgr.h"
#include "ObjectMgr.h"
#include "CreatureEventAIMgr.h"
#include "GuildMgr.h"
#include "SpellMgr.h"
#include "Chat.h"
#include "DBCStores.h"
#include "MassMailMgr.h"
#include "LootMgr.h"
#include "ItemEnchantmentMgr.h"
#include "MapManager.h"
#include "ScriptMgr.h"
#include "CreatureAIRegistry.h"
#include "Policies/SingletonImp.h"
#include "BattleGroundMgr.h"
#include "TemporarySummon.h"
#include "VMapFactory.h"
#include "GameEventMgr.h"
#include "PoolManager.h"
#include "Database/DatabaseImpl.h"
#include "GridNotifiersImpl.h"
#include "CellImpl.h"
#include "MapPersistentStateMgr.h"
#include "WaypointManager.h"
#include "GMTicketMgr.h"
#include "Util.h"
#include "CharacterDatabaseCleaner.h"
#include "LFGMgr.h"
#include "AutoBroadCastMgr.h"
#include "Transports/TransportMgr.h"
#include "PlayerBotMgr.h"
#include "ZoneScriptMgr.h"
#include "CharacterDatabaseCache.h"
#include "CreatureGroups.h"
#include "MoveMap.h"
#include "SpellModMgr.h"
#include "MovementBroadcaster.h"
#include "HonorMgr.h"
#include "ThreadPool.h"
#include "AuraRemovalMgr.h"
#include "GuardMgr.h"
#include "DailyQuestHandler.h"
#include "GuidObjectScaling.h"
#include "Database/AutoUpdater.hpp"
#include "CompanionManager.hpp"
#include "MountManager.hpp"
#include "Anticheat/libanticheat.hpp"
#include "Anticheat/Config.hpp"

#ifdef USING_DISCORD_BOT
#include "DiscordBot/Bot.hpp"
#endif

#include <filesystem>
#include <fstream>
#include <regex>
#include <unordered_map>
#include <string>
#include <iostream>

#include <chrono>

volatile bool World::m_stopEvent = false;
uint8 World::m_ExitCode = SHUTDOWN_EXIT_CODE;
volatile uint32 World::m_worldLoopCounter = 0;

float World::m_MaxVisibleDistanceOnContinents = DEFAULT_VISIBILITY_DISTANCE;
float World::m_MaxVisibleDistanceInInstances = DEFAULT_VISIBILITY_INSTANCE;
float World::m_MaxVisibleDistanceInBG = DEFAULT_VISIBILITY_BG;

float World::m_MaxVisibleDistanceInFlight = DEFAULT_VISIBILITY_DISTANCE;
float World::m_VisibleUnitGreyDistance = 0;
float World::m_VisibleObjectGreyDistance = 0;

float  World::m_relocation_lower_limit_sq = 10.f * 10.f;
uint32 World::m_relocation_ai_notify_delay = 1000u;

using namespace std::literals::chrono_literals;

void LoadGameObjectModelList();

World sWorld;

/// World constructor
World::World():
    m_playerLimit(0),
    m_allowMovement(true),
    m_gameTime(time(nullptr)),
    m_timeZoneOffset(0),
    m_gameDay((m_gameTime + m_timeZoneOffset) / DAY),
    m_startTime(m_gameTime),
    m_defaultDbcLocale(LOCALE_enUS),
    m_timeRate(1.0f)
{
    m_ShutdownMask = 0;
    m_ShutdownTimer = 0;
    m_maxActiveSessionCount = 0;
    m_maxQueuedSessionCount = 0;
    m_MaintenanceTimeChecker = 0;
    m_anticrashRearmTimer = 0;

    m_defaultDbcLocale = LOCALE_enUS;
    m_availableDbcLocaleMask = 0;

    for (uint32 & value : m_configUint32Values)
        value = 0;

    for (int32 & value : m_configInt32Values)
        value = 0;

    for (float & value : m_configFloatValues)
        value = 0.0f;

    for (bool & value : m_configBoolValues)
        value = false;

    m_timeRate = 1.0f;
    m_charDbWorkerThread    = nullptr;
}

/// World destructor
World::~World()
{
}

void World::Shutdown()
{
	sGuildMgr.SaveGuildBanks();
    sWorld.KickAll();                                       // save and kick all players
    sWorld.UpdateSessions(1);                               // real players unload required UpdateSessions call
    if (m_charDbWorkerThread && m_charDbWorkerThread->joinable())
        m_charDbWorkerThread->join();
}

AccountDataWrapper::~AccountDataWrapper()
{
    //relink lookuptable with normal table.
    auto itr = sWorld.m_accountDataLookup.find(m_data->username);
    if (itr != sWorld.m_accountDataLookup.end())
        itr->second = std::cref(*m_data);
    else
        sWorld.m_accountDataLookup.emplace(m_data->username, std::cref(*m_data));
}

void World::InternalShutdown()
{
	///- Empty the kicked session set
	while (!m_sessions.empty())
	{
		// not remove from queue, prevent loading new sessions
		delete m_sessions.begin()->second;
		m_sessions.erase(m_sessions.begin());
	}

	CliCommandHolder* command = nullptr;
	while (cliCmdQueue.next(command))
		delete command;

	VMAP::VMapFactory::clear();

	if (m_charDbWorkerThread)
	{
        if (m_charDbWorkerThread->joinable())
            m_charDbWorkerThread->join();
        m_charDbWorkerThread.reset(nullptr);
	}
	//TODO free addSessQueue

	m_broadcaster.reset();

    if (m_autoCommitThread.joinable())
        m_autoCommitThread.join();


#ifdef USING_DISCORD_BOT
    if (m_bot)
        delete m_bot;
#endif
}

/// Find a session by its id
WorldSession* World::FindSession(uint32 id) const
{
    SessionMap::const_iterator itr = m_sessions.find(id);

    if (itr != m_sessions.end())
        return itr->second;                                 // also can return nullptr for kicked session
    else
        return nullptr;
}

/// Remove a given session
bool World::RemoveSession(uint32 id)
{
    ///- Find the session, kick the user, but we can't delete session at this moment to prevent iterator invalidation
    SessionMap::const_iterator itr = m_sessions.find(id);

    if (itr != m_sessions.end() && itr->second)
    {
        if (itr->second->PlayerLoading())
            return false;
        itr->second->KickPlayer();
    }

    return true;
}

void World::AddSession(WorldSession* s)
{
    addSessQueue.add(s);
}

void World::AddSessionToSessionsMap(WorldSession* sess)
{
    m_sessions[sess->GetAccountId()] = sess;
}

void World::AddSession_(WorldSession* s)
{
    MANGOS_ASSERT(s);

    //NOTE - Still there is race condition in WorldSession* being used in the Sockets

    ///- kick already loaded player with same account (if any) and remove session
    ///- if player is in loading and want to load again, return
    if (!RemoveSession(s->GetAccountId()))
    {
        s->KickPlayer();
        delete s;                                           // session not added yet in session list, so not listed in queue
        return;
    }

    // decrease session counts only at not reconnection case
    bool decrease_session = true;

    // if session already exist, prepare to it deleting at next world update
    // NOTE - KickPlayer() should be called on "old" in RemoveSession()
    {
        SessionMap::const_iterator old = m_sessions.find(s->GetAccountId());

        if (old != m_sessions.end())
        {
            // prevent decrease sessions count if session queued
            if (RemoveQueuedSession(old->second))
                decrease_session = false;
            if (!old->second->ForcePlayerLogoutDelay())
                delete old->second;
        }
    }

    m_sessions[s->GetAccountId()] = s;

    uint32 Sessions = GetActiveAndQueuedSessionCount();
    uint32 pLimit = GetPlayerAmountLimit();
    uint32 QueueSize = GetQueuedSessionCount();             //number of players in the queue

    //so we don't count the user trying to
    //login as a session and queue the socket that we are using
    if (decrease_session)
        --Sessions;

    if (pLimit > 0 && Sessions >= pLimit && !CanSkipQueue(s))
    {
        AddQueuedSession(s);
        UpdateMaxSessionCounters();
        DETAIL_LOG("PlayerQueue: Account id %u is in Queue Position (%u).", s->GetAccountId(), ++QueueSize);
        return;
    }

    // Checked for 1.12.2
    WorldPacket packet(SMSG_AUTH_RESPONSE, 1 + 4 + 1 + 4);
    packet << uint8(AUTH_OK);
    packet << uint32(0);                                    // BillingTimeRemaining
    packet << uint8(0);                                     // BillingPlanFlags
    packet << uint32(0);                                    // BillingTimeRested
    s->SendPacket(&packet);

    UpdateMaxSessionCounters();

    // Updates the population
    if (pLimit > 0)
    {
        float popu = float(GetActiveSessionCount());        // updated number of users on the server
        popu /= pLimit;
        popu *= 2;

        static SqlStatementID id;

        SqlStatement stmt = LoginDatabase.CreateStatement(id, "UPDATE realmlist SET population = ? WHERE id = ?");
        stmt.PExecute(popu, realmID);

        DETAIL_LOG("Server Population (%f).", popu);
    }
}

int32 World::GetQueuedSessionPos(WorldSession* sess)
{
    uint32 position = 1;

    for (Queue::const_iterator iter = m_QueuedSessions.begin(); iter != m_QueuedSessions.end(); ++iter, ++position)
        if ((*iter) == sess)
            return position;

    return 0;
}

void World::AddQueuedSession(WorldSession* sess)
{
    sess->SetInQueue(true);
    m_QueuedSessions.push_back(sess);

    // [-ZERO] Possible wrong
    // The 1st SMSG_AUTH_RESPONSE needs to contain other info too.
    WorldPacket packet(SMSG_AUTH_RESPONSE, 1 + 4 + 1 + 4 + 4);
    packet << uint8(AUTH_WAIT_QUEUE);
    packet << uint32(0);                                    // BillingTimeRemaining
    packet << uint8(0);                                     // BillingPlanFlags
    packet << uint32(0);                                    // BillingTimeRested
    packet << uint32(GetQueuedSessionPos(sess));            // position in queue
    sess->SendPacket(&packet);

    //sess->SendAuthWaitQue (GetQueuePos (sess));
}

bool World::RemoveQueuedSession(WorldSession* sess)
{
    // sessions count including queued to remove (if removed_session set)
    uint32 sessions = GetActiveSessionCount();

    uint32 position = 1;
    Queue::iterator iter = m_QueuedSessions.begin();

    // search to remove and count skipped positions
    bool found = false;

    for (; iter != m_QueuedSessions.end(); ++iter, ++position)
    {
        if (*iter == sess)
        {
            sess->SetInQueue(false);
            iter = m_QueuedSessions.erase(iter);
            found = true;                                   // removing queued session
            break;
        }
    }

    // iter point to next socked after removed or end()
    // position store position of removed socket and then new position next socket after removed

    // if session not queued then we need decrease sessions count
    if (!found && sessions)
        --sessions;

    uint32 loggedInSessions = uint32(m_sessions.size() - m_QueuedSessions.size());
    if (loggedInSessions >= getConfig(CONFIG_UINT32_PLAYER_HARD_LIMIT))
        return found;

    // accept first in queue
    if ((!m_playerLimit || (int32)sessions < m_playerLimit) && !m_QueuedSessions.empty())
    {
        WorldSession* pop_sess = m_QueuedSessions.front();
        pop_sess->SetInQueue(false);
        pop_sess->m_idleTime = WorldTimer::getMSTime();
        pop_sess->SendAuthWaitQue(0);
        m_QueuedSessions.pop_front();

        // update iter to point first queued socket or end() if queue is empty now
        iter = m_QueuedSessions.begin();
        position = 1;
    }

    // update position from iter to end()
    // iter point to first not updated socket, position store new position
    for (; iter != m_QueuedSessions.end(); ++iter, ++position)
        (*iter)->SendAuthWaitQue(position);

    return found;
}

/// Initialize config values
void World::LoadConfigSettings(bool reload)
{
    if (reload)
    {
        if (!sConfig.Reload())
        {
            sLog.outError("World settings reload fail: can't read settings from %s.", sConfig.GetFilename().c_str());
            return;
        }
    }

    ///- Read the version of the configuration file and warn the user in case of emptiness or mismatch
    uint32 confVersion = sConfig.GetIntDefault("ConfVersion", 0);
    if (!confVersion)
    {
        sLog.outError("*****************************************************************************");
        sLog.outError(" WARNING: mangosd.conf does not include a ConfVersion variable.");
        sLog.outError("          Your configuration file may be out of date!");
        sLog.outError("*****************************************************************************");
        Log::WaitBeforeContinueIfNeed();
    }
    else
    {
        if (confVersion < _MANGOSDCONFVERSION)
        {
            sLog.outError("*****************************************************************************");
            sLog.outError(" WARNING: Your mangosd.conf version indicates your conf file is out of date!");
            sLog.outError("          Please check for updates, as your current default values may cause");
            sLog.outError("          unexpected behavior.");
            sLog.outError("*****************************************************************************");
            Log::WaitBeforeContinueIfNeed();
        }
    }

#ifdef USE_ANTICHEAT
    sAnticheatConfig.SetSource("anticheat.conf");
    sAnticheatConfig.loadConfigSettings();
#endif

    ///- Read the player limit and the Message of the day from the config file
    SetPlayerLimit(sConfig.GetIntDefault("PlayerLimit", DEFAULT_PLAYER_LIMIT), true);
    SetMotd(sConfig.GetStringDefault("Motd", "Welcome to the Massive Network Game Object Server."));

    ///- Read all rates from the config file
    setConfigPos(CONFIG_FLOAT_RATE_HEALTH,               "Rate.Health", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_POWER_MANA,           "Rate.Mana", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_POWER_RAGE_INCOME,       "Rate.Rage.Income", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_POWER_RAGE_LOSS,      "Rate.Rage.Loss", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_POWER_FOCUS,             "Rate.Focus", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_LOYALTY,              "Rate.Loyalty", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_POWER_ENERGY,            "Rate.Energy", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_SKILL_DISCOVERY,      "Rate.Skill.Discovery",      1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_DROP_ITEM_POOR,       "Rate.Drop.Item.Poor",       1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_DROP_ITEM_NORMAL,     "Rate.Drop.Item.Normal",     1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_DROP_ITEM_UNCOMMON,   "Rate.Drop.Item.Uncommon",   1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_DROP_ITEM_RARE,       "Rate.Drop.Item.Rare",       1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_DROP_ITEM_EPIC,       "Rate.Drop.Item.Epic",       1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_DROP_ITEM_LEGENDARY,  "Rate.Drop.Item.Legendary",  1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_DROP_ITEM_ARTIFACT,   "Rate.Drop.Item.Artifact",   1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_DROP_ITEM_REFERENCED, "Rate.Drop.Item.Referenced", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_DROP_MONEY,           "Rate.Drop.Money", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_XP_KILL,                 "Rate.XP.Kill",    1.0f);
    setConfig(CONFIG_FLOAT_RATE_XP_KILL_ELITE,		     "Rate.XP.Kill.Elite",    1.0f);
    setConfig(CONFIG_FLOAT_RATE_XP_QUEST,                "Rate.XP.Quest",   1.0f);
    setConfig(CONFIG_FLOAT_RATE_XP_EXPLORE,              "Rate.XP.Explore", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_REPUTATION_GAIN,           "Rate.Reputation.Gain", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_REPUTATION_LOWLEVEL_KILL,  "Rate.Reputation.LowLevel.Kill", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_REPUTATION_LOWLEVEL_QUEST, "Rate.Reputation.LowLevel.Quest", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_NORMAL_DAMAGE,               "Rate.Creature.Normal.Damage", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_ELITE_DAMAGE,          "Rate.Creature.Elite.Elite.Damage", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_RAREELITE_DAMAGE,      "Rate.Creature.Elite.RAREELITE.Damage", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_WORLDBOSS_DAMAGE,      "Rate.Creature.Elite.WORLDBOSS.Damage", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_RARE_DAMAGE,           "Rate.Creature.Elite.RARE.Damage", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_NORMAL_HP,                   "Rate.Creature.Normal.HP", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_ELITE_HP,              "Rate.Creature.Elite.Elite.HP", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_RAREELITE_HP,          "Rate.Creature.Elite.RAREELITE.HP", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_WORLDBOSS_HP,          "Rate.Creature.Elite.WORLDBOSS.HP", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_RARE_HP,               "Rate.Creature.Elite.RARE.HP", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_NORMAL_SPELLDAMAGE,          "Rate.Creature.Normal.SpellDamage", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_ELITE_SPELLDAMAGE,     "Rate.Creature.Elite.Elite.SpellDamage", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_RAREELITE_SPELLDAMAGE, "Rate.Creature.Elite.RAREELITE.SpellDamage", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_WORLDBOSS_SPELLDAMAGE, "Rate.Creature.Elite.WORLDBOSS.SpellDamage", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_ELITE_RARE_SPELLDAMAGE,      "Rate.Creature.Elite.RARE.SpellDamage", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CREATURE_AGGRO,              "Rate.Creature.Aggro", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_REST_INGAME,                    "Rate.Rest.InGame", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_REST_OFFLINE_IN_TAVERN_OR_CITY, "Rate.Rest.Offline.InTavernOrCity", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_REST_OFFLINE_IN_WILDERNESS,     "Rate.Rest.Offline.InWilderness", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_DAMAGE_FALL,                 "Rate.Damage.Fall", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_AUCTION_TIME,                "Rate.Auction.Time", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_AUCTION_DEPOSIT,                "Rate.Auction.Deposit", 1.0f);
    setConfig(CONFIG_FLOAT_RATE_AUCTION_CUT,                    "Rate.Auction.Cut", 1.0f);
    setConfigPos(CONFIG_UINT32_AUCTION_DEPOSIT_MIN,             "Auction.Deposit.Min", 0);
    setConfig(CONFIG_UINT32_ACCOUNT_CONCURRENT_AUCTION_LIMIT,   "Auction.AccountConcurrentLimit", 0);
    setConfig(CONFIG_FLOAT_RATE_WAR_EFFORT_RESOURCE,            "Rate.WarEffortResourceComplete", 0.0f);
    setConfig(CONFIG_UINT32_WAR_EFFORT_AUTOCOMPLETE_PERIOD,     "WarEffortResourceCompletePeriod", 86400);
    setConfig(CONFIG_FLOAT_RATE_HONOR,                  "Rate.Honor", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_MINING_AMOUNT,       "Rate.Mining.Amount", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_MINING_NEXT,         "Rate.Mining.Next", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_INSTANCE_RESET_TIME, "Rate.InstanceResetTime", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_TALENT,              "Rate.Talent", 1.0f);
    setConfigPos(CONFIG_FLOAT_RATE_CORPSE_DECAY_LOOTED, "Rate.Corpse.Decay.Looted", 0.0f);
    setConfig(CONFIG_UINT32_RESPEC_BASE_COST,           "Rate.RespecBaseCost", 1);
    setConfig(CONFIG_UINT32_RESPEC_MULTIPLICATIVE_COST, "Rate.RespecMultiplicativeCost", 5);
    setConfig(CONFIG_UINT32_RESPEC_MIN_MULTIPLIER,      "Rate.RespecMinMultiplier", 2);
    setConfig(CONFIG_UINT32_RESPEC_MAX_MULTIPLIER,      "Rate.RespecMaxMultiplier", 10);

    setConfigMinMax(CONFIG_FLOAT_RATE_TARGET_POS_RECALCULATION_RANGE, "TargetPosRecalculateRange", 1.5f, CONTACT_DISTANCE, ATTACK_DISTANCE);

    setConfigPos(CONFIG_FLOAT_RATE_DURABILITY_LOSS_DAMAGE, "DurabilityLossChance.Damage", 0.5f);
    setConfigPos(CONFIG_FLOAT_RATE_DURABILITY_LOSS_ABSORB, "DurabilityLossChance.Absorb", 0.5f);
    setConfigPos(CONFIG_FLOAT_RATE_DURABILITY_LOSS_PARRY,  "DurabilityLossChance.Parry",  0.05f);
    setConfigPos(CONFIG_FLOAT_RATE_DURABILITY_LOSS_BLOCK,  "DurabilityLossChance.Block",  0.05f);

    setConfigPos(CONFIG_FLOAT_LISTEN_RANGE_SAY,       "ListenRange.Say",       25.0f);
    setConfigPos(CONFIG_FLOAT_LISTEN_RANGE_YELL,      "ListenRange.Yell",     300.0f);
    setConfigPos(CONFIG_FLOAT_LISTEN_RANGE_TEXTEMOTE, "ListenRange.TextEmote", 25.0f);

    setConfigPos(CONFIG_FLOAT_GROUP_XP_DISTANCE, "MaxGroupXPDistance", 74.0f);

    setConfigPos(CONFIG_FLOAT_CREATURE_FAMILY_ASSISTANCE_RADIUS,      "CreatureFamilyAssistanceRadius",     10.0f);
    setConfigPos(CONFIG_FLOAT_CREATURE_FAMILY_FLEE_ASSISTANCE_RADIUS, "CreatureFamilyFleeAssistanceRadius", 30.0f);
    setConfig(CONFIG_FLOAT_THREAT_RADIUS, "ThreatRadius", 50.0f);
    setConfig(CONFIG_FLOAT_MAX_CREATURE_ATTACK_RADIUS, "MaxCreaturesAttackRadius", 40.0f);
    setConfig(CONFIG_FLOAT_MAX_PLAYERS_STEALTH_DETECT_RANGE, "MaxPlayersStealthDetectRange", 40.0f);

    ///- Read other configuration items from the config file
    setConfig(CONFIG_UINT32_LOGIN_PER_TICK, "LoginPerTick", 0);
    setConfig(CONFIG_UINT32_PLAYER_HARD_LIMIT, "PlayerHardLimit", 0);
    setConfig(CONFIG_UINT32_LOGIN_QUEUE_GRACE_PERIOD_SECS, "LoginQueue.GracePeriodSecs", 0);
    setConfig(CONFIG_UINT32_CHARACTER_SCREEN_MAX_IDLE_TIME, "CharacterScreenMaxIdleTime", 0);
    setConfig(CONFIG_UINT32_ASYNC_QUERIES_TICK_TIMEOUT, "AsyncQueriesTickTimeout", 0);
    setConfigMinMax(CONFIG_UINT32_COMPRESSION, "Compression", 1, 1, 9);
    setConfig(CONFIG_BOOL_ADDON_CHANNEL, "AddonChannel", true);
    setConfig(CONFIG_BOOL_CLEAN_CHARACTER_DB, "CleanCharacterDB", true);
    setConfig(CONFIG_BOOL_GRID_UNLOAD, "GridUnload", true);
    setConfig(CONFIG_BOOL_CLEANUP_TERRAIN, "CleanupTerrain", true);
    setConfigPos(CONFIG_UINT32_INTERVAL_SAVE, "PlayerSave.Interval", 15 * MINUTE * IN_MILLISECONDS);
    setConfigMinMax(CONFIG_UINT32_MIN_LEVEL_STAT_SAVE, "PlayerSave.Stats.MinLevel", 0, 0, MAX_LEVEL);
    setConfig(CONFIG_BOOL_STATS_SAVE_ONLY_ON_LOGOUT, "PlayerSave.Stats.SaveOnlyOnLogout", true);

    setConfigMin(CONFIG_UINT32_INTERVAL_GRIDCLEAN, "GridCleanUpDelay", 5 * MINUTE * IN_MILLISECONDS, MIN_GRID_DELAY);
    if (reload)
        sMapMgr.SetGridCleanUpDelay(getConfig(CONFIG_UINT32_INTERVAL_GRIDCLEAN));

    setConfigMin(CONFIG_UINT32_INTERVAL_MAPUPDATE, "MapUpdateInterval", 100, MIN_MAP_UPDATE_DELAY);
    if (reload)
        sMapMgr.SetMapUpdateInterval(getConfig(CONFIG_UINT32_INTERVAL_MAPUPDATE));

    setConfig(CONFIG_UINT32_INTERVAL_CHANGEWEATHER, "ChangeWeatherInterval", 10 * MINUTE * IN_MILLISECONDS);

    if (configNoReload(reload, CONFIG_UINT32_PORT_WORLD, "WorldServerPort", DEFAULT_WORLDSERVER_PORT))
        setConfig(CONFIG_UINT32_PORT_WORLD, "WorldServerPort", DEFAULT_WORLDSERVER_PORT);

    if (configNoReload(reload, CONFIG_UINT32_GAME_TYPE, "GameType", 0))
        setConfig(CONFIG_UINT32_GAME_TYPE, "GameType", 0);

    if (configNoReload(reload, CONFIG_UINT32_REALM_ZONE, "RealmZone", REALM_ZONE_DEVELOPMENT))
        setConfig(CONFIG_UINT32_REALM_ZONE, "RealmZone", REALM_ZONE_DEVELOPMENT);

    m_timeZoneOffset = sConfig.GetIntDefault("TimeZoneOffset", 0) * HOUR;

    setConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_ACCOUNTS,            "AllowTwoSide.Accounts", false);
    setConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_INTERACTION_CHAT,    "AllowTwoSide.Interaction.Chat", false);
    setConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_INTERACTION_CHANNEL, "AllowTwoSide.Interaction.Channel", false);
    setConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_INTERACTION_GROUP,   "AllowTwoSide.Interaction.Group", false);
    setConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_INTERACTION_GUILD,   "AllowTwoSide.Interaction.Guild", false);
    setConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_INTERACTION_TRADE,   "AllowTwoSide.Interaction.Trade", false);
    setConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_INTERACTION_AUCTION, "AllowTwoSide.Interaction.Auction", false);
    setConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_INTERACTION_MAIL,    "AllowTwoSide.Interaction.Mail", false);
    setConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_WHO_LIST,            "AllowTwoSide.WhoList", false);
    setConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_ADD_FRIEND,          "AllowTwoSide.AddFriend", false);

    setConfig(CONFIG_UINT32_STRICT_PLAYER_NAMES,  "StrictPlayerNames",  0);
    setConfig(CONFIG_UINT32_STRICT_CHARTER_NAMES, "StrictCharterNames", 0);
    setConfig(CONFIG_UINT32_STRICT_PET_NAMES,     "StrictPetNames",     0);

    setConfigMinMax(CONFIG_UINT32_MIN_PLAYER_NAME,  "MinPlayerName",  2, 1, MAX_PLAYER_NAME);
    setConfigMinMax(CONFIG_UINT32_MIN_CHARTER_NAME, "MinCharterName", 2, 1, MAX_CHARTER_NAME);
    setConfigMinMax(CONFIG_UINT32_MIN_PET_NAME,     "MinPetName",     2, 1, MAX_PET_NAME);

    setConfig(CONFIG_UINT32_CHARACTERS_CREATING_DISABLED, "CharactersCreatingDisabled", 0);
    setConfigMinMax(CONFIG_UINT32_CHARACTERS_PER_REALM, "CharactersPerRealm", 10, 1, 10);
    setConfigMin(CONFIG_UINT32_CHARACTERS_PER_ACCOUNT, "CharactersPerAccount", 50, getConfig(CONFIG_UINT32_CHARACTERS_PER_REALM));

    setConfigMinMax(CONFIG_UINT32_SKIP_CINEMATICS, "SkipCinematics", 0, 0, 2);
    setConfig(CONFIG_BOOL_OBJECT_HEALTH_VALUE_SHOW, "ShowHealthValues", false);
    if (configNoReload(reload, CONFIG_UINT32_MAX_PLAYER_LEVEL, "MaxPlayerLevel", PLAYER_MAX_LEVEL))
        setConfigMinMax(CONFIG_UINT32_MAX_PLAYER_LEVEL, "MaxPlayerLevel", PLAYER_MAX_LEVEL, 1, PLAYER_STRONG_MAX_LEVEL);
    setConfigMinMax(CONFIG_UINT32_START_PLAYER_LEVEL, "StartPlayerLevel", 1, 1, getConfig(CONFIG_UINT32_MAX_PLAYER_LEVEL));
    setConfigMinMax(CONFIG_UINT32_START_PLAYER_MONEY, "StartPlayerMoney", 0, 0, MAX_MONEY_AMOUNT);
    setConfigPos(CONFIG_UINT32_MAX_HONOR_POINTS, "MaxHonorPoints", 75000);
    setConfigMinMax(CONFIG_UINT32_START_HONOR_POINTS, "StartHonorPoints", 0, 0, getConfig(CONFIG_UINT32_MAX_HONOR_POINTS));
    setConfigMin(CONFIG_UINT32_MIN_HONOR_KILLS, "MinHonorKills", MIN_HONOR_KILLS, 1);
    setConfigMinMax(CONFIG_UINT32_MAINTENANCE_DAY, "MaintenanceDay", 4, 0, 6);
    setConfig(CONFIG_BOOL_AUTO_HONOR_RESTART, "AutoHonorRestart", true);
    setConfig(CONFIG_BOOL_ALL_TAXI_PATHS, "AllFlightPaths", false);
    setConfig(CONFIG_BOOL_CAST_UNSTUCK, "CastUnstuck", true);
    setConfig(CONFIG_UINT32_MAX_SPELL_CASTS_IN_CHAIN, "MaxSpellCastsInChain", 10);

    setConfig(CONFIG_BOOL_INSTANCE_IGNORE_LEVEL, "Instance.IgnoreLevel", false);
    setConfig(CONFIG_BOOL_INSTANCE_IGNORE_RAID,  "Instance.IgnoreRaid", false);
    setConfig(CONFIG_UINT32_INSTANCE_RESET_TIME_HOUR, "Instance.ResetTimeHour", 4);
    setConfig(CONFIG_UINT32_INSTANCE_UNLOAD_DELAY,    "Instance.UnloadDelay", 30 * MINUTE * IN_MILLISECONDS);

    setConfig(CONFIG_UINT32_MAX_PRIMARY_TRADE_SKILL, "MaxPrimaryTradeSkill", 2);
    setConfigMinMax(CONFIG_UINT32_MIN_PETITION_SIGNS, "MinPetitionSigns", 9, 0, 9);

    setConfig(CONFIG_UINT32_GM_LOGIN_STATE,       "GM.LoginState",    2);
    setConfig(CONFIG_UINT32_GM_VISIBLE_STATE,     "GM.Visible",       2);
    setConfig(CONFIG_UINT32_GM_ACCEPT_TICKETS,    "GM.AcceptTickets", 2);
    setConfig(CONFIG_UINT32_GM_CHAT,              "GM.Chat",          2);
    setConfig(CONFIG_UINT32_GM_WISPERING_TO,      "GM.WhisperingTo",  2);
    setConfig(CONFIG_UINT32_GM_LEVEL_IN_GM_LIST,  "GM.InGMList.Level",  SEC_ADMINISTRATOR);
    setConfig(CONFIG_UINT32_GM_LEVEL_IN_WHO_LIST, "GM.InWhoList.Level", SEC_ADMINISTRATOR);
    setConfig(CONFIG_BOOL_GM_LOG_TRADE,           "GM.LogTrade", false);
    setConfigMinMax(CONFIG_UINT32_START_GM_LEVEL, "GM.StartLevel", 1, getConfig(CONFIG_UINT32_START_PLAYER_LEVEL), MAX_LEVEL);
    setConfig(CONFIG_BOOL_DIE_COMMAND_CREDIT,     "GM.CreditOnDie", true);
    setConfig(CONFIG_BOOL_GM_LOWER_SECURITY,      "GM.LowerSecurity", false);
    setConfig(CONFIG_BOOL_GM_ALLOW_TRADES,        "GM.AllowTrades", true);
    setConfig(CONFIG_BOOL_GMS_ALLOW_PUBLIC_CHANNELS,         "GM.AllowPublicChannels", false);
    setConfig(CONFIG_BOOL_GM_JOIN_OPPOSITE_FACTION_CHANNELS, "GM.JoinOppositeFactionChannels", false);
    setConfig(CONFIG_BOOL_GM_START_ON_GM_ISLAND, "GM.StartOnGMIsland", true);
    if (getConfig(CONFIG_BOOL_ALLOW_TWO_SIDE_INTERACTION_CHAT))
        setConfig(CONFIG_BOOL_GM_JOIN_OPPOSITE_FACTION_CHANNELS, false);
    setConfig(CONFIG_BOOL_GMTICKETS_ENABLE,           "GMTickets.Enable", true);
    setConfig(CONFIG_UINT32_GMTICKETS_MINLEVEL,       "GMTickets.MinLevel", 0);
    setConfig(CONFIG_UINT32_GMTICKETS_ADMIN_SECURITY, "GMTickets.Admin.Security", SEC_CONSOLE);

    setConfig(CONFIG_UINT32_GROUP_VISIBILITY, "Visibility.GroupMode", 0);

    setConfig(CONFIG_UINT32_MAIL_DELIVERY_DELAY, "MailDeliveryDelay", HOUR);

    setConfigMin(CONFIG_UINT32_MASS_MAILER_SEND_PER_TICK, "MassMailer.SendPerTick", 10, 1);

    setConfig(CONFIG_UINT32_BANLIST_RELOAD_TIMER, "BanListReloadTimer", 60);
    setConfigPos(CONFIG_UINT32_UPTIME_UPDATE, "UpdateUptimeInterval", 10);
    if (reload)
    {
        m_timers[WUPDATE_UPTIME].SetInterval(getConfig(CONFIG_UINT32_UPTIME_UPDATE)*MINUTE * IN_MILLISECONDS);
        m_timers[WUPDATE_UPTIME].Reset();
    }

    setConfig(CONFIG_UINT32_SKILL_CHANCE_ORANGE, "SkillChance.Orange", 100);
    setConfig(CONFIG_UINT32_SKILL_CHANCE_YELLOW, "SkillChance.Yellow", 75);
    setConfig(CONFIG_UINT32_SKILL_CHANCE_GREEN,  "SkillChance.Green",  25);
    setConfig(CONFIG_UINT32_SKILL_CHANCE_GREY,   "SkillChance.Grey",   0);

    setConfigPos(CONFIG_UINT32_SKILL_CHANCE_MINING_STEPS,   "SkillChance.MiningSteps",   75);
    setConfigPos(CONFIG_UINT32_SKILL_CHANCE_SKINNING_STEPS, "SkillChance.SkinningSteps", 75);

    setConfigPos(CONFIG_UINT32_SKILL_GAIN_CRAFTING,  "SkillGain.Crafting",  1);
    setConfigPos(CONFIG_UINT32_SKILL_GAIN_DEFENSE,   "SkillGain.Defense",   1);
    setConfigPos(CONFIG_UINT32_SKILL_GAIN_GATHERING, "SkillGain.Gathering", 1);
    setConfig(CONFIG_UINT32_SKILL_GAIN_WEAPON,       "SkillGain.Weapon",    1);

    setConfig(CONFIG_BOOL_SKILL_FAIL_LOOT_FISHING,         "SkillFail.Loot.Fishing", false);
    setConfig(CONFIG_BOOL_SKILL_FAIL_GAIN_FISHING,         "SkillFail.Gain.Fishing", false);
    setConfig(CONFIG_BOOL_SKILL_FAIL_POSSIBLE_FISHINGPOOL, "SkillFail.Possible.FishingPool", true);

    setConfig(CONFIG_UINT32_MAX_OVERSPEED_PINGS, "MaxOverspeedPings", 2);
    if (getConfig(CONFIG_UINT32_MAX_OVERSPEED_PINGS) != 0 && getConfig(CONFIG_UINT32_MAX_OVERSPEED_PINGS) < 2)
    {
        sLog.outError("MaxOverspeedPings (%i) must be in range 2..infinity (or 0 to disable check). Set to 2.", getConfig(CONFIG_UINT32_MAX_OVERSPEED_PINGS));
        setConfig(CONFIG_UINT32_MAX_OVERSPEED_PINGS, 2);
    }

    setConfig(CONFIG_BOOL_SAVE_RESPAWN_TIME_IMMEDIATELY, "SaveRespawnTimeImmediately", true);
    setConfig(CONFIG_BOOL_WEATHER, "ActivateWeather", true);

    setConfig(CONFIG_BOOL_ALWAYS_MAX_SKILL_FOR_LEVEL, "AlwaysMaxSkillForLevel", false);

    setConfig(CONFIG_UINT32_CHATFLOOD_MESSAGE_COUNT, "ChatFlood.MessageCount", 10);
    setConfig(CONFIG_UINT32_CHATFLOOD_MESSAGE_DELAY, "ChatFlood.MessageDelay", 1);
    setConfig(CONFIG_UINT32_CHATFLOOD_MUTE_TIME,     "ChatFlood.MuteTime", 10);

    setConfig(CONFIG_BOOL_EVENT_ANNOUNCE, "Event.Announce", false);

    setConfig(CONFIG_UINT32_CREATURE_FAMILY_ASSISTANCE_DELAY, "CreatureFamilyAssistanceDelay", 1500);
    setConfig(CONFIG_UINT32_CREATURE_FAMILY_FLEE_DELAY,       "CreatureFamilyFleeDelay",       7000);

    setConfig(CONFIG_UINT32_WORLD_BOSS_LEVEL_DIFF, "WorldBossLevelDiff", 3);

    setConfig(CONFIG_INT32_QUEST_LOW_LEVEL_HIDE_DIFF, "Quests.LowLevelHideDiff", 4);
    setConfig(CONFIG_INT32_QUEST_HIGH_LEVEL_HIDE_DIFF, "Quests.HighLevelHideDiff", 7);

    setConfig(CONFIG_BOOL_QUEST_IGNORE_RAID, "Quests.IgnoreRaid", false);

    setConfig(CONFIG_BOOL_DETECT_POS_COLLISION, "DetectPosCollision", true);

    setConfig(CONFIG_BOOL_RESTRICTED_LFG_CHANNEL,      "Channel.RestrictedLfg", true);
    setConfig(CONFIG_BOOL_SILENTLY_GM_JOIN_TO_CHANNEL, "Channel.SilentlyGMJoin", false);
    setConfig(CONFIG_BOOL_STRICT_LATIN_IN_GENERAL_CHANNELS, "Channel.StrictLatinInGeneral", false);

    setConfig(CONFIG_BOOL_CHAT_FAKE_MESSAGE_PREVENTING, "ChatFakeMessagePreventing", true);

    setConfig(CONFIG_UINT32_CHAT_STRICT_LINK_CHECKING_SEVERITY, "ChatStrictLinkChecking.Severity", 2);
    setConfig(CONFIG_UINT32_CHAT_STRICT_LINK_CHECKING_KICK,     "ChatStrictLinkChecking.Kick", 0);

    setConfig(CONFIG_BOOL_SEND_LOOT_ROLL_UPON_RECONNECT, "SendLootRollUponReconnect", false);

    setConfig(CONFIG_UINT32_BONES_EXPIRE_MINUTES,      "Bones.ExpireMinutes", 60);
    setConfig(CONFIG_UINT32_CORPSES_UPDATE_MINUTES,    "Corpses.UpdateMinutes", 20);
    setConfig(CONFIG_BOOL_CORPSE_EMPTY_LOOT_SHOW,      "Corpse.EmptyLootShow", true);
    setConfigPos(CONFIG_UINT32_CORPSE_DECAY_NORMAL,    "Corpse.Decay.NORMAL",    300);
    setConfigPos(CONFIG_UINT32_CORPSE_DECAY_RARE,      "Corpse.Decay.RARE",      900);
    setConfigPos(CONFIG_UINT32_CORPSE_DECAY_ELITE,     "Corpse.Decay.ELITE",     600);
    setConfigPos(CONFIG_UINT32_CORPSE_DECAY_RAREELITE, "Corpse.Decay.RAREELITE", 1200);
    setConfigPos(CONFIG_UINT32_CORPSE_DECAY_WORLDBOSS, "Corpse.Decay.WORLDBOSS", 3600);
    m_timers[WUPDATE_CORPSES].SetInterval(getConfig(CONFIG_UINT32_CORPSES_UPDATE_MINUTES) * MINUTE * IN_MILLISECONDS);

    setConfig(CONFIG_INT32_DEATH_SICKNESS_LEVEL,          "Death.SicknessLevel", 11);
    setConfig(CONFIG_BOOL_DEATH_CORPSE_RECLAIM_DELAY_PVP, "Death.CorpseReclaimDelay.PvP", true);
    setConfig(CONFIG_BOOL_DEATH_CORPSE_RECLAIM_DELAY_PVE, "Death.CorpseReclaimDelay.PvE", true);
    setConfig(CONFIG_BOOL_DEATH_BONES_WORLD,              "Death.Bones.World", true);
    setConfig(CONFIG_BOOL_DEATH_BONES_BG,                 "Death.Bones.Battleground", true);
    setConfigMinMax(CONFIG_FLOAT_GHOST_RUN_SPEED_WORLD,   "Death.Ghost.RunSpeed.World", 1.0f, 0.1f, 10.0f);
    setConfigMinMax(CONFIG_FLOAT_GHOST_RUN_SPEED_BG,      "Death.Ghost.RunSpeed.Battleground", 1.0f, 0.1f, 10.0f);

    setConfig(CONFIG_UINT32_AV_MIN_PLAYERS_IN_QUEUE, "Alterac.MinPlayersInQueue", 0);
    setConfig(CONFIG_UINT32_AV_INITIAL_MAX_PLAYERS,  "Alterac.InitMaxPlayers", 0);
    setConfig(CONFIG_BOOL_BATTLEGROUND_CAST_DESERTER,                  "Battleground.CastDeserter", true);
    setConfigMinMax(CONFIG_UINT32_BATTLEGROUND_QUEUE_ANNOUNCER_JOIN,   "Battleground.QueueAnnouncer.Join", 0, 0, 2);
    setConfig(CONFIG_BOOL_BATTLEGROUND_QUEUE_ANNOUNCER_START,          "Battleground.QueueAnnouncer.Start", false);
    setConfig(CONFIG_UINT32_BATTLEGROUND_INVITATION_TYPE,              "Battleground.InvitationType", 0);
    setConfig(CONFIG_UINT32_BATTLEGROUND_PREMATURE_FINISH_TIMER,       "BattleGround.PrematureFinishTimer", 5 * MINUTE * IN_MILLISECONDS);
    setConfig(CONFIG_UINT32_BATTLEGROUND_PREMADE_GROUP_WAIT_FOR_MATCH, "BattleGround.PremadeGroupWaitForMatch", 0);
    setConfig(CONFIG_UINT32_BATTLEGROUND_PREMADE_QUEUE_GROUP_MIN_SIZE, "BattleGround.PremadeQueue.MinGroupSize", 6);
    setConfig(CONFIG_BOOL_BATTLEGROUND_RANDOMIZE,                      "BattleGround.RandomizeQueues", false);
    setConfig(CONFIG_UINT32_BATTLEGROUND_GROUP_LIMIT,                  "BattleGround.GroupQueueLimit", 40);
    setConfig(CONFIG_BOOL_TAG_IN_BATTLEGROUNDS,                        "BattleGround.TagInBattleGrounds", true);
    setConfigMinMax(CONFIG_UINT32_BATTLEGROUND_QUEUES_COUNT,           "BattleGround.QueuesCount", 0, 0, 3);
    setConfig(CONFIG_BOOL_ENABLE_CROSSFACTION_BATTLEGROUNDS,           "BattleGround.Crossfaction", false);
    setConfig(CONFIG_BOOL_ENABLE_GEAR_RATING_QUEUE,                    "BattleGround.GearQueue", false);
    setConfig(CONFIG_FLOAT_BATTLEGROUND_REPUTATION_RATE_AV,            "BattleGround.Rate.Reputation.AV", 1);
    setConfig(CONFIG_FLOAT_BATTLEGROUND_REPUTATION_RATE_WS,            "BattleGround.Rate.Reputation.WS", 1);
    setConfig(CONFIG_FLOAT_BATTLEGROUND_REPUTATION_RATE_AB,            "BattleGround.Rate.Reputation.AB", 1);
    setConfig(CONFIG_FLOAT_BATTLEGROUND_HONOR_RATE_AV,                 "BattleGround.Rate.Honor.AV", 1);
    setConfig(CONFIG_FLOAT_BATTLEGROUND_HONOR_RATE_WS,                 "BattleGround.Rate.Honor.WS", 1);
    setConfig(CONFIG_FLOAT_BATTLEGROUND_HONOR_RATE_AB,                 "BattleGround.Rate.Honor.AB", 1);
    

        // If max bg queues is at 0, decide based on patch.
    if (getConfig(CONFIG_UINT32_BATTLEGROUND_QUEUES_COUNT) == 0)
            setConfig(CONFIG_UINT32_BATTLEGROUND_QUEUES_COUNT, 3);

    setConfig(CONFIG_BOOL_OUTDOORPVP_EP_ENABLE, "OutdoorPvP.EP.Enable", true);
    setConfig(CONFIG_BOOL_OUTDOORPVP_SI_ENABLE, "OutdoorPvP.SI.Enable", true);

    setConfig(CONFIG_BOOL_PLAYER_COMMANDS, "PlayerCommands", true);
    setConfig(CONFIG_UINT32_INSTANT_LOGOUT, "InstantLogout", SEC_OBSERVER);
    setConfigMin(CONFIG_UINT32_GROUP_OFFLINE_LEADER_DELAY, "Group.OfflineLeaderDelay", 300, 0);
    setConfigMin(CONFIG_UINT32_GUILD_EVENT_LOG_COUNT, "Guild.EventLogRecordsCount", GUILD_EVENTLOG_MAX_RECORDS, GUILD_EVENTLOG_MAX_RECORDS);

    setConfig(CONFIG_UINT32_TIMERBAR_FATIGUE_GMLEVEL, "TimerBar.Fatigue.GMLevel", SEC_CONSOLE);
    setConfig(CONFIG_UINT32_TIMERBAR_FATIGUE_MAX,     "TimerBar.Fatigue.Max", 60);
    setConfig(CONFIG_UINT32_TIMERBAR_BREATH_GMLEVEL,  "TimerBar.Breath.GMLevel", SEC_CONSOLE);
    setConfig(CONFIG_UINT32_TIMERBAR_BREATH_MAX,      "TimerBar.Breath.Max", 60);
    setConfig(CONFIG_UINT32_TIMERBAR_FIRE_GMLEVEL,    "TimerBar.Fire.GMLevel", SEC_CONSOLE);
    setConfig(CONFIG_UINT32_TIMERBAR_FIRE_MAX,        "TimerBar.Fire.Max", 1);

    setConfig(CONFIG_BOOL_PET_UNSUMMON_AT_MOUNT,      "PetUnsummonAtMount", false);
    setConfigMinMax(CONFIG_UINT32_PET_DEFAULT_LOYALTY, "PetDefaultLoyalty", 1, 1, 6);

    //setConfig(CONFIG_UINT32_ANTIFLOOD_SANCTION,       "Antiflood.Sanction", CHEAT_ACTION_KICK);

    setConfig(CONFIG_BOOL_BEGINNERS_GUILD, "BeginnersGuilds", 0);
    setConfig(CONFIG_UINT32_BEGINNERS_GUILD_HORDE, "BeginnersGuildHorde", 0);
    setConfig(CONFIG_UINT32_BEGINNERS_GUILD_ALLIANCE, "BeginnersGuildAlliance", 0);

    setConfig(CONFIG_BOOL_PTR, "PTR", false);

    setConfig(CONFIG_BOOL_VISIBILITY_FORCE_ACTIVE_OBJECTS, "Visibility.ForceActiveObjects", true);
    m_relocation_ai_notify_delay = sConfig.GetIntDefault("Visibility.AIRelocationNotifyDelay", 1000u);
    m_relocation_lower_limit_sq  = pow(sConfig.GetFloatDefault("Visibility.RelocationLowerLimit", 10), 2);

    m_VisibleUnitGreyDistance = sConfig.GetFloatDefault("Visibility.Distance.Grey.Unit", 1);
    if (m_VisibleUnitGreyDistance >  MAX_VISIBILITY_DISTANCE)
    {
        sLog.outError("Visibility.Distance.Grey.Unit can't be greater %f", MAX_VISIBILITY_DISTANCE);
        m_VisibleUnitGreyDistance = MAX_VISIBILITY_DISTANCE;
    }
    m_VisibleObjectGreyDistance = sConfig.GetFloatDefault("Visibility.Distance.Grey.Object", 10);
    if (m_VisibleObjectGreyDistance >  MAX_VISIBILITY_DISTANCE)
    {
        sLog.outError("Visibility.Distance.Grey.Object can't be greater %f", MAX_VISIBILITY_DISTANCE);
        m_VisibleObjectGreyDistance = MAX_VISIBILITY_DISTANCE;
    }

    //visibility on continents
    m_MaxVisibleDistanceOnContinents      = sConfig.GetFloatDefault("Visibility.Distance.Continents",     DEFAULT_VISIBILITY_DISTANCE);
    if (m_MaxVisibleDistanceOnContinents < 45 * getConfig(CONFIG_FLOAT_RATE_CREATURE_AGGRO))
    {
        sLog.outError("Visibility.Distance.Continents can't be less max aggro radius %f", 45 * getConfig(CONFIG_FLOAT_RATE_CREATURE_AGGRO));
        m_MaxVisibleDistanceOnContinents = 45 * getConfig(CONFIG_FLOAT_RATE_CREATURE_AGGRO);
    }
    else if (m_MaxVisibleDistanceOnContinents + m_VisibleUnitGreyDistance >  MAX_VISIBILITY_DISTANCE)
    {
        sLog.outError("Visibility.Distance.Continents can't be greater %f", MAX_VISIBILITY_DISTANCE - m_VisibleUnitGreyDistance);
        m_MaxVisibleDistanceOnContinents = MAX_VISIBILITY_DISTANCE - m_VisibleUnitGreyDistance;
    }

    //visibility in instances
    m_MaxVisibleDistanceInInstances        = sConfig.GetFloatDefault("Visibility.Distance.Instances",       DEFAULT_VISIBILITY_INSTANCE);
    if (m_MaxVisibleDistanceInInstances < 45 * getConfig(CONFIG_FLOAT_RATE_CREATURE_AGGRO))
    {
        sLog.outError("Visibility.Distance.Instances can't be less max aggro radius %f", 45 * getConfig(CONFIG_FLOAT_RATE_CREATURE_AGGRO));
        m_MaxVisibleDistanceInInstances = 45 * getConfig(CONFIG_FLOAT_RATE_CREATURE_AGGRO);
    }
    else if (m_MaxVisibleDistanceInInstances + m_VisibleUnitGreyDistance >  MAX_VISIBILITY_DISTANCE)
    {
        sLog.outError("Visibility.Distance.Instances can't be greater %f", MAX_VISIBILITY_DISTANCE - m_VisibleUnitGreyDistance);
        m_MaxVisibleDistanceInInstances = MAX_VISIBILITY_DISTANCE - m_VisibleUnitGreyDistance;
    }

    //visibility in BG
    m_MaxVisibleDistanceInBG        = sConfig.GetFloatDefault("Visibility.Distance.BG",       DEFAULT_VISIBILITY_BG);
    if (m_MaxVisibleDistanceInBG < 45 * sWorld.getConfig(CONFIG_FLOAT_RATE_CREATURE_AGGRO))
    {
        sLog.outError("Visibility.Distance.BG can't be less max aggro radius %f", 45 * getConfig(CONFIG_FLOAT_RATE_CREATURE_AGGRO));
        m_MaxVisibleDistanceInBG = 45 * getConfig(CONFIG_FLOAT_RATE_CREATURE_AGGRO);
    }
    else if (m_MaxVisibleDistanceInBG + m_VisibleUnitGreyDistance >  MAX_VISIBILITY_DISTANCE)
    {
        sLog.outError("Visibility.Distance.BG can't be greater %f", MAX_VISIBILITY_DISTANCE - m_VisibleUnitGreyDistance);
        m_MaxVisibleDistanceInBG = MAX_VISIBILITY_DISTANCE - m_VisibleUnitGreyDistance;
    }

    m_MaxVisibleDistanceInFlight    = sConfig.GetFloatDefault("Visibility.Distance.InFlight",      DEFAULT_VISIBILITY_DISTANCE);
    if (m_MaxVisibleDistanceInFlight + m_VisibleObjectGreyDistance > MAX_VISIBILITY_DISTANCE)
    {
        sLog.outError("Visibility.Distance.InFlight can't be greater %f", MAX_VISIBILITY_DISTANCE - m_VisibleObjectGreyDistance);
        m_MaxVisibleDistanceInFlight = MAX_VISIBILITY_DISTANCE - m_VisibleObjectGreyDistance;
    }

    ///- Load the CharDelete related config options
    setConfigMinMax(CONFIG_UINT32_CHARDELETE_METHOD, "CharDelete.Method", 0, 0, 1);
    setConfigMinMax(CONFIG_UINT32_CHARDELETE_MIN_LEVEL, "CharDelete.MinLevel", 0, 0, getConfig(CONFIG_UINT32_MAX_PLAYER_LEVEL));
    setConfigPos(CONFIG_UINT32_CHARDELETE_KEEP_DAYS, "CharDelete.KeepDays", 30);

    if (configNoReload(reload, CONFIG_UINT32_GUID_RESERVE_SIZE_CREATURE, "GuidReserveSize.Creature", 100))
        setConfigPos(CONFIG_UINT32_GUID_RESERVE_SIZE_CREATURE,   "GuidReserveSize.Creature",   100);
    if (configNoReload(reload, CONFIG_UINT32_GUID_RESERVE_SIZE_GAMEOBJECT, "GuidReserveSize.GameObject", 100))
        setConfigPos(CONFIG_UINT32_GUID_RESERVE_SIZE_GAMEOBJECT, "GuidReserveSize.GameObject", 100);

    ///- Read the "Honor" directory from the config file (basically these are PvP ranking logs)
    std::string honorPath = sConfig.GetStringDefault("HonorDir", "./");

    // for empty string use current dir as for absent case
    if (honorPath.empty())
        honorPath = "./";
    // normalize dir path to path/ or path\ form
    else if (honorPath.at(honorPath.length() - 1) != '/' && honorPath.at(honorPath.length() - 1) != '\\')
        honorPath.append("/");

    if (reload)
    {
        if (honorPath != m_honorPath)
            sLog.outError("HonorDir option can't be changed at mangosd.conf reload, using current value (%s).", m_honorPath.c_str());
    }
    else
    {
        m_honorPath = honorPath;
    }


    ///- Read the "Data" directory from the config file
    std::string dataPath = sConfig.GetStringDefault("DataDir", "./");

    // for empty string use current dir as for absent case
    if (dataPath.empty())
        dataPath = "./";
    // normalize dir path to path/ or path\ form
    else if (dataPath.at(dataPath.length() - 1) != '/' && dataPath.at(dataPath.length() - 1) != '\\')
        dataPath.append("/");

    if (reload)
    {
        if (dataPath != m_dataPath)
            sLog.outError("DataDir option can't be changed at mangosd.conf reload, using current value (%s).", m_dataPath.c_str());
    }
    else
    {
        m_dataPath = dataPath;
    }

    setConfig(CONFIG_BOOL_VMAP_INDOOR_CHECK, "vmap.enableIndoorCheck", true);
    bool enableLOS = sConfig.GetBoolDefault("vmap.enableLOS", false);
    bool enableHeight = sConfig.GetBoolDefault("vmap.enableHeight", false);
    bool disableModelUnload = sConfig.GetBoolDefault("Collision.Models.Unload", false);
    std::string ignoreSpellIds = sConfig.GetStringDefault("vmap.ignoreSpellIds", "");
    setConfig(CONFIG_BOOL_PET_LOS, "vmap.petLoS", true);

    if (!enableHeight)
        sLog.outError("VMAP height use disabled! Creatures movements and other things will be in broken state.");

    VMAP::VMapFactory::createOrGetVMapManager()->setEnableLineOfSightCalc(enableLOS);
    VMAP::VMapFactory::createOrGetVMapManager()->setEnableHeightCalc(enableHeight);
    VMAP::VMapFactory::createOrGetVMapManager()->setUseManagedPtrs(!disableModelUnload);
    VMAP::VMapFactory::preventSpellsFromBeingTestedForLoS(ignoreSpellIds.c_str());
    sLog.outString("VMap data directory: %svmaps.", m_dataPath.c_str());
    sLog.outString("VMap support included. LineOfSight: %i | getHeight: %i | indoorCheck: %i.", enableLOS, enableHeight, getConfig(CONFIG_BOOL_VMAP_INDOOR_CHECK) ? 1 : 0);
    setConfig(CONFIG_BOOL_MMAP_ENABLED, "mmap.enabled", true);
    sLog.outString("MMap pathfinding %sabled.", getConfig(CONFIG_BOOL_MMAP_ENABLED) ? "en" : "dis");

    setConfig(CONFIG_UINT32_EMPTY_MAPS_UPDATE_TIME, "MapUpdate.Empty.UpdateTime", 0);
    setConfigMinMax(CONFIG_UINT32_MAP_OBJECTSUPDATE_THREADS, "MapUpdate.ObjectsUpdate.MaxThreads", 4, 1, 20);
    setConfigMinMax(CONFIG_UINT32_MAP_OBJECTSUPDATE_TIMEOUT, "MapUpdate.ObjectsUpdate.Timeout", 100, 10, 2000);
    setConfigMinMax(CONFIG_UINT32_MAP_VISIBILITYUPDATE_THREADS, "MapUpdate.VisibilityUpdate.MaxThreads", 4, 1, 20);
    setConfigMinMax(CONFIG_UINT32_MAP_VISIBILITYUPDATE_TIMEOUT, "MapUpdate.VisibilityUpdate.Timeout", 100, 10, 2000);
    setConfigMinMax(CONFIG_UINT32_MAPUPDATE_INSTANCED_UPDATE_THREADS, "MapUpdate.Instanced.UpdateThreads", 2, 0, 20);
    setConfigMinMax(CONFIG_UINT32_MTCELLS_THREADS, "MapUpdate.Continents.MTCells.Threads", 0, 0, 20);
    setConfigMinMax(CONFIG_UINT32_MTCELLS_SAFEDISTANCE, "MapUpdate.Continents.MTCells.SafeDistance", 1066, 0, 34112);
    setConfigMinMax(CONFIG_UINT32_MAPUPDATE_UPDATE_PACKETS_DIFF, "MapUpdate.UpdatePacketsDiff", 100, 1, 10000);
    setConfigMinMax(CONFIG_UINT32_MAPUPDATE_UPDATE_PLAYERS_DIFF, "MapUpdate.UpdatePlayersDiff", 100, 1, 10000);
    setConfigMinMax(CONFIG_UINT32_MAPUPDATE_UPDATE_CELLS_DIFF, "MapUpdate.UpdateCellsDiff", 100, 1, 10000);
    setConfigMinMax(CONFIG_UINT32_INACTIVE_PLAYERS_SKIP_UPDATES, "Continents.InactivePlayers.SkipUpdates", 0, 0, 100);
    setConfig(CONFIG_UINT32_MAPUPDATE_TICK_LOWER_GRID_ACTIVATION_DISTANCE, "MapUpdate.ReduceGridActivationDist.Tick", 0);
    setConfig(CONFIG_UINT32_MAPUPDATE_TICK_INCREASE_GRID_ACTIVATION_DISTANCE, "MapUpdate.IncreaseGridActivationDist.Tick", 0);
    setConfig(CONFIG_UINT32_MAPUPDATE_MIN_GRID_ACTIVATION_DISTANCE, "MapUpdate.MinGridActivationDistance", 0);
    setConfig(CONFIG_UINT32_MAPUPDATE_TICK_LOWER_VISIBILITY_DISTANCE, "MapUpdate.ReduceVisDist.Tick", 0);
    setConfig(CONFIG_UINT32_MAPUPDATE_TICK_INCREASE_VISIBILITY_DISTANCE, "MapUpdate.IncreaseVisDist.Tick", 0);
    setConfig(CONFIG_UINT32_MAPUPDATE_MIN_VISIBILITY_DISTANCE, "MapUpdate.MinVisibilityDistance", 0);
    setConfig(CONFIG_BOOL_CONTINENTS_INSTANCIATE, "Continents.Instanciate", false);
    setConfig(CONFIG_UINT32_CONTINENTS_MOTIONUPDATE_THREADS, "Continents.MotionUpdate.Threads", 0);
    setConfig(CONFIG_BOOL_TERRAIN_PRELOAD_CONTINENTS, "Terrain.Preload.Continents", 1);
    setConfig(CONFIG_BOOL_TERRAIN_PRELOAD_INSTANCES, "Terrain.Preload.Instances", 1);

    setConfig(CONFIG_BOOL_ENABLE_MOVEMENT_EXTRAPOLATION_PLAYER, "Movement.ExtrapolatePlayerPosition", false);
    setConfig(CONFIG_BOOL_ENABLE_MOVEMENT_EXTRAPOLATION_PET, "Movement.ExtrapolatePetPosition", true);
    setConfig(CONFIG_UINT32_MOVEMENT_CHANGE_ACK_TIME, "Movement.PendingAckResponseTime", 2000);
    setConfigMinMax(CONFIG_UINT32_MAX_POINTS_PER_MVT_PACKET, "Movement.MaxPointsPerPacket", 80, 5, 10000);
    setConfigMinMax(CONFIG_UINT32_RELOCATION_VMAP_CHECK_TIMER, "Movement.RelocationVmapsCheckDelay", 0, 0, 2000);

    sPlayerBotMgr.LoadConfig();

    setConfigMinMax(CONFIG_UINT32_SPELLS_CCDELAY, "Spells.CCDelay", 200, 0, 20000);
    setConfigMinMax(CONFIG_UINT32_DEBUFF_LIMIT, "DebuffLimit", 0, 0, 40);

    if (getConfig(CONFIG_UINT32_DEBUFF_LIMIT) == 0)
        setConfig(CONFIG_UINT32_DEBUFF_LIMIT, 16);

    setConfig(CONFIG_UINT32_ANTICRASH_OPTIONS, "Anticrash.Options", 0);
    setConfig(CONFIG_UINT32_ANTICRASH_REARM_TIMER, "Anticrash.Rearm.Timer", 0);

    setConfig(CONFIG_UINT32_PERFLOG_SLOW_WORLD_UPDATE, "PerformanceLog.SlowWorldUpdate", 100);
    setConfig(CONFIG_UINT32_PERFLOG_SLOW_MAPSYSTEM_UPDATE, "PerformanceLog.SlowMapSystemUpdate", 100);
    setConfig(CONFIG_UINT32_PERFLOG_SLOW_MAP_UPDATE, "PerformanceLog.SlowMapUpdate", 100);
    setConfig(CONFIG_UINT32_PERFLOG_SLOW_ASYNC_QUERIES, "PerformanceLog.SlowAsynQueries", 100);
    setConfig(CONFIG_UINT32_PERFLOG_SLOW_UNIQUE_SESSION_UPDATE, "PerformanceLog.SlowUniqueSessionUpdate", 20);
    setConfig(CONFIG_UINT32_PERFLOG_SLOW_PACKET, "PerformanceLog.SlowPackets", 20);
    setConfig(CONFIG_UINT32_PERFLOG_SLOW_MAP_PACKETS, "PerformanceLog.SlowMapPackets", 60);
    setConfig(CONFIG_UINT32_PERFLOG_SLOW_SESSIONS_UPDATE, "PerformanceLog.SlowSessionsUpdate", 0);
    setConfig(CONFIG_UINT32_PERFLOG_SLOW_PACKET_BCAST, "PerformanceLog.SlowPacketBroadcast", 0);
    setConfig(CONFIG_UINT32_LOG_MONEY_TRADES_TRESHOLD, "LogMoneyTreshold", 10000);

    setConfig(CONFIG_FLOAT_DYN_RESPAWN_CHECK_RANGE, "DynamicRespawn.Range", -1.0f);
    setConfig(CONFIG_FLOAT_DYN_RESPAWN_MAX_REDUCTION_RATE, "DynamicRespawn.MaxReductionRate", 0.0f);
    setConfig(CONFIG_FLOAT_DYN_RESPAWN_PERCENT_PER_PLAYER, "DynamicRespawn.PercentPerPlayer", 0.0f);
    setConfig(CONFIG_UINT32_DYN_RESPAWN_MIN_RESPAWN_TIME, "DynamicRespawn.MinRespawnTime", 0);
    setConfig(CONFIG_UINT32_DYN_RESPAWN_MIN_RESPAWN_TIME_ELITE, "DynamicRespawn.MinEliteRespawnTime", 0);
    setConfig(CONFIG_UINT32_DYN_RESPAWN_MIN_RESPAWN_TIME_INDOORS, "DynamicRespawn.MinIndoorRespawnTime", 0);
    setConfig(CONFIG_UINT32_DYN_RESPAWN_AFFECT_RESPAWN_TIME_BELOW, "DynamicRespawn.AffectRespawnTimeBelow", 0);
    setConfig(CONFIG_UINT32_DYN_RESPAWN_AFFECT_LEVEL_BELOW, "DynamicRespawn.AffectLevelBelow", 0);
    setConfig(CONFIG_UINT32_DYN_RESPAWN_PLAYERS_THRESHOLD, "DynamicRespawn.PlayersThreshold", 0);
    setConfig(CONFIG_UINT32_DYN_RESPAWN_PLAYERS_LEVELDIFF, "DynamicRespawn.PlayersMaxLevelDiff", 0);

    setConfig(CONFIG_UINT32_CHANNEL_INVITE_MIN_LEVEL, "ChannelInvite.MinLevel", 10);
    setConfig(CONFIG_BOOL_WHISPER_RESTRICTION, "WhisperRestriction", false);
    setConfig(CONFIG_UINT32_WORLD_CHAN_MIN_LEVEL, "WorldChan.MinLevel", 0);
    setConfig(CONFIG_UINT32_WORLD_CHAN_CD, "WorldChan.Cooldown", 0);
    setConfig(CONFIG_UINT32_WORLD_CHAN_CD_MAX_LEVEL, "WorldChan.CooldownMaxLevel", 0);
    setConfig(CONFIG_UINT32_WORLD_CHAN_CD_SCALING, "WorldChan.CooldownScaling", 0);
    setConfig(CONFIG_UINT32_WORLD_CHAN_CD_USE_ACCOUNT_MAX_LEVEL, "WorldChan.CooldownUseAccountLevel", 0);
    setConfig(CONFIG_UINT32_PUB_CHANS_MUTE_VANISH_LEVEL, "PublicChansMute.BypassLevel", 61);
    setConfig(CONFIG_UINT32_SAY_MIN_LEVEL, "SayMinLevel", 0);
    setConfig(CONFIG_UINT32_YELL_MIN_LEVEL, "YellMinLevel", 0);
    setConfig(CONFIG_UINT32_SAY_EMOTE_MIN_LEVEL, "SayEmoteMinLevel", 0);
    setConfig(CONFIG_UINT32_WHISP_DIFF_ZONE_MIN_LEVEL, "WhisperDiffZone.MinLevel", 0);
    setConfig(CONFIG_UINT32_YELLRANGE_LINEARSCALE_MAXLEVEL, "YellRange.LinearScale.MaxLevel", 0);
    setConfig(CONFIG_UINT32_YELLRANGE_QUADRATICSCALE_MAXLEVEL, "YellRange.QuadraticScale.MaxLevel", 0);
    setConfig(CONFIG_UINT32_YELLRANGE_MIN, "YellRange.Min", 0);
    setConfig(CONFIG_UINT32_WHISPER_TARGETS_MAX, "WhisperTargets.MaxTargets", 0);
    setConfig(CONFIG_UINT32_WHISPER_TARGETS_DECAY, "WhisperTargets.DecayTime", 0);
    setConfig(CONFIG_UINT32_WHISPER_TARGETS_BYPASS_LEVEL, "WhisperTargets.BypassLevel", 0);

    setConfig(CONFIG_UINT32_ITEM_INSTANTSAVE_QUALITY, "Item.InstantSaveQuality", ITEM_QUALITY_ARTIFACT);
    setConfig(CONFIG_UINT32_ITEM_RARELOOT_QUALITY, "Item.RareLoot.Quality", ITEM_QUALITY_EPIC);
    setConfig(CONFIG_BOOL_PREVENT_ITEM_DATAMINING, "Item.PreventDataMining", true);

    setConfig(CONFIG_UINT32_MAILSPAM_EXPIRE_SECS, "MailSpam.ExpireSecs", 0);
    setConfig(CONFIG_UINT32_MAILSPAM_MAX_MAILS, "MailSpam.MaxMails", 2);
	setConfig(CONFIG_UINT32_MAILSPAM_LEVEL, "MailSpam.Level", 1);
	setConfig(CONFIG_UINT32_MAILSPAM_ACCOUNT_LEVEL, "MailSpam.AccountCharLevel", 1);
    setConfig(CONFIG_UINT32_MAILSPAM_MONEY, "MailSpam.Money", 0);
    setConfig(CONFIG_BOOL_MAILSPAM_ITEM, "MailSpam.Item", false);
    setConfig(CONFIG_UINT32_COD_FORCE_TAG_MAX_LEVEL, "Mails.COD.ForceTag.MaxLevel", 0);

    // Presents:
    setConfig(CONFIG_BOOL_ANNIVERSARY, "Anniversary", true);

    setConfigMinMax(CONFIG_UINT32_ASYNC_TASKS_THREADS_COUNT,       "AsyncTasks.Threads", 1, 1, 20);
    setConfig(CONFIG_BOOL_KICK_PLAYER_ON_BAD_PACKET,               "Network.KickOnBadPacket", false);
    setConfig(CONFIG_UINT32_PACKET_BCAST_THREADS,                  "Network.PacketBroadcast.Threads", 0);
    setConfig(CONFIG_UINT32_PACKET_BCAST_FREQUENCY,                "Network.PacketBroadcast.Frequency", 50);
    setConfig(CONFIG_UINT32_PBCAST_DIFF_LOWER_VISIBILITY_DISTANCE, "Network.PacketBroadcast.ReduceVisDistance.DiffAbove", 0);
    
    sLog.outString("Anticrash: 0x%x rearm after %u seconds.", getConfig(CONFIG_UINT32_ANTICRASH_OPTIONS), getConfig(CONFIG_UINT32_ANTICRASH_REARM_TIMER) / 1000);
    sLog.outString("Pathfinding: [%s]", getConfig(CONFIG_BOOL_MMAP_ENABLED) ? "Enabled" : "Disabled");

    // Update packet broadcaster config
    if (reload) {
        sWorld.m_broadcaster->UpdateConfiguration(getConfig(CONFIG_UINT32_PACKET_BCAST_THREADS),
            std::chrono::milliseconds(getConfig(CONFIG_UINT32_PACKET_BCAST_FREQUENCY)));
    }

    // PvP options
    setConfig(CONFIG_BOOL_ACCURATE_PVP_EQUIP_REQUIREMENTS, "PvP.AccurateEquipRequirements", true);
    setConfig(CONFIG_BOOL_ACCURATE_PVP_PURCHASE_REQUIREMENTS, "PvP.AccuratePurchaseRequirements", true);
    setConfig(CONFIG_BOOL_ACCURATE_PVP_TIMELINE, "PvP.AccurateTimeline", true);
    setConfig(CONFIG_BOOL_ACCURATE_PVP_REWARDS, "PvP.AccurateRewards", true);
    setConfig(CONFIG_BOOL_ENABLE_DK, "PvP.DishonorableKills", true);

    // Progression settings
    setConfig(CONFIG_BOOL_ACCURATE_PETS, "Progression.AccuratePetStatistics", true);
    setConfig(CONFIG_BOOL_ACCURATE_LFG, "Progression.AccurateLFGAvailability", true);
    setConfig(CONFIG_BOOL_ACCURATE_PVE_EVENTS, "Progression.AccuratePVEEvents", true);
    setConfig(CONFIG_BOOL_ACCURATE_SPELL_EFFECTS, "Progression.AccurateSpellEffects", true);
    setConfig(CONFIG_BOOL_NO_RESPEC_PRICE_DECAY, "Progression.NoRespecPriceDecay", true);
    setConfig(CONFIG_BOOL_NO_QUEST_XP_TO_GOLD, "Progression.NoQuestXpToGold", true);
    setConfig(CONFIG_BOOL_RESTORE_DELETED_ITEMS, "Progression.RestoreDeletedItems", true);

    // Movement Anticheat
    /*setConfig(CONFIG_BOOL_AC_MOVEMENT_ENABLED, "Anticheat.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_PLAYERS_ONLY, "Anticheat.PlayersOnly", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_NOTIFY_CHEATERS, "Anticheat.NotifyCheaters", false);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_BAN_DURATION, "Anticheat.BanDuration", 86400);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_LOG_DATA, "Anticheat.LogData", false);
    setConfig(CONFIG_INT32_AC_ANTICHEAT_MAX_ALLOWED_DESYNC, "Anticheat.MaxAllowedDesync", 0);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_REVERSE_TIME_ENABLED, "Anticheat.ReverseTime.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_REVERSE_TIME_THRESHOLD, "Anticheat.ReverseTime.Threshold", 1);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_REVERSE_TIME_PENALTY, "Anticheat.ReverseTime.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_NULL_TIME_ENABLED, "Anticheat.NullTime.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_NULL_TIME_THRESHOLD, "Anticheat.NullTime.Threshold", 2);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_NULL_TIME_PENALTY, "Anticheat.NullTime.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_SKIPPED_HEARTBEATS_ENABLED, "Anticheat.SkippedHeartbeats.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_SKIPPED_HEARTBEATS_THRESHOLD_TICK, "Anticheat.SkippedHeartbeats.Threshold.Total", 2);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_SKIPPED_HEARTBEATS_THRESHOLD_TOTAL, "Anticheat.SkippedHeartbeats.Threshold.Total", 10);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_SKIPPED_HEARTBEATS_PENALTY, "Anticheat.SkippedHeartbeats.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_TIME_DESYNC_ENABLED, "Anticheat.TimeDesync.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_TIME_DESYNC_THRESHOLD, "Anticheat.TimeDesync.Threshold", 10000);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_TIME_DESYNC_PENALTY, "Anticheat.TimeDesync.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_NUM_DESYNCS_ENABLED, "Anticheat.NumDesyncs.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_NUM_DESYNCS_THRESHOLD, "Anticheat.NumDesyncs.Threshold", 5);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_NUM_DESYNCS_PENALTY, "Anticheat.NumDesyncs.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_SPEED_HACK_ENABLED, "Anticheat.SpeedHack.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_OVERSPEED_DISTANCE_ENABLED, "Anticheat.OverpspeedDistance.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_OVERSPEED_DISTANCE_THRESHOLD, "Anticheat.OverpspeedDistance.Threshold", 30);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_OVERSPEED_DISTANCE_PENALTY, "Anticheat.OverpspeedDistance.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_OVERSPEED_JUMP_ENABLED, "Anticheat.OverspeedJump.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_OVERSPEED_JUMP_REJECT, "Anticheat.OverspeedJump.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_OVERSPEED_JUMP_THRESHOLD, "Anticheat.OverspeedJump.Threshold", 3);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_OVERSPEED_JUMP_PENALTY, "Anticheat.OverspeedJump.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_JUMP_SPEED_CHANGE_ENABLED, "Anticheat.JumpSpeedChange.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_JUMP_SPEED_CHANGE_REJECT, "Anticheat.JumpSpeedChange.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_JUMP_SPEED_CHANGE_THRESHOLD, "Anticheat.JumpSpeedChange.Threshold", 3);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_JUMP_SPEED_CHANGE_PENALTY, "Anticheat.JumpSpeedChange.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_MULTI_JUMP_ENABLED, "Anticheat.MultiJump.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_MULTI_JUMP_REJECT, "Anticheat.MultiJump.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_MULTI_JUMP_THRESHOLD_TICK, "Anticheat.MultiJump.Threshold.Tick", 2);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_MULTI_JUMP_THRESHOLD_TOTAL, "Anticheat.MultiJump.Threshold.Total", 10);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_MULTI_JUMP_PENALTY, "Anticheat.MultiJump.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_WALL_CLIMB_ENABLED, "Anticheat.WallClimb.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_WALL_CLIMB_REJECT, "Anticheat.WallClimb.Reject", true);
    setConfig(CONFIG_FLOAT_AC_MOVEMENT_CHEAT_WALL_CLIMB_ANGLE, "Anticheat.WallClimb.Angle", 1.0f);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_WALL_CLIMB_THRESHOLD_TICK, "Anticheat.WallClimb.Threshold.Tick", 3);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_WALL_CLIMB_THRESHOLD_TOTAL, "Anticheat.WallClimb.Threshold.Total", 30);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_WALL_CLIMB_PENALTY, "Anticheat.WallClimb.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_UNREACHABLE_ENABLED, "Anticheat.Unreachable.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_UNREACHABLE_THRESHOLD, "Anticheat.Unreachable.Threshold", 40);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_UNREACHABLE_PENALTY, "Anticheat.Unreachable.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_FLY_ENABLED, "Anticheat.FlyHack.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_FLY_REJECT, "Anticheat.FlyHack.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_FLY_THRESHOLD, "Anticheat.FlyHack.Threshold", 3);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_FLY_PENALTY, "Anticheat.FlyHack.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_NO_FALL_TIME_ENABLED, "Anticheat.NoFallTime.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_NO_FALL_TIME_REJECT, "Anticheat.NoFallTime.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_NO_FALL_TIME_THRESHOLD, "Anticheat.NoFallTime.Threshold", 5);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_NO_FALL_TIME_PENALTY, "Anticheat.NoFallTime.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_TELEPORT_ENABLED, "Anticheat.Teleport.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_TELEPORT_REJECT, "Anticheat.Teleport.Reject", true);
    setConfig(CONFIG_FLOAT_AC_MOVEMENT_CHEAT_TELEPORT_DISTANCE, "Anticheat.Teleport.Distance", 40.0f);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_TELEPORT_THRESHOLD, "Anticheat.Teleport.Threshold", 3);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_TELEPORT_PENALTY, "Anticheat.Teleport.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_BAN_ACCOUNT);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_TELE_TO_TRANSPORT_ENABLED, "Anticheat.TeleportToTransport.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_TELE_TO_TRANSPORT_REJECT, "Anticheat.TeleportToTransport.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_TELE_TO_TRANSPORT_THRESHOLD, "Anticheat.TeleportToTransport.Threshold", 2);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_TELE_TO_TRANSPORT_PENALTY, "Anticheat.TeleportToTransport.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_FAKE_TRANSPORT_ENABLED, "Anticheat.FakeTransport.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_FAKE_TRANSPORT_THRESHOLD, "Anticheat.FakeTransport.Threshold", 1);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_FAKE_TRANSPORT_PENALTY, "Anticheat.FakeTransport.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_WATER_WALK_ENABLED, "Anticheat.WaterWalk.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_WATER_WALK_REJECT, "Anticheat.WaterWalk.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_WATER_WALK_THRESHOLD, "Anticheat.WaterWalk.Threshold", 5);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_WATER_WALK_PENALTY, "Anticheat.WaterWalk.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_SLOW_FALL_ENABLED, "Anticheat.SlowFall.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_SLOW_FALL_REJECT, "Anticheat.SlowFall.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_SLOW_FALL_THRESHOLD, "Anticheat.SlowFall.Threshold", 5);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_SLOW_FALL_PENALTY, "Anticheat.SlowFall.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_HOVER_ENABLED, "Anticheat.Hover.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_HOVER_REJECT, "Anticheat.Hover.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_HOVER_THRESHOLD, "Anticheat.Hover.Threshold", 5);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_HOVER_PENALTY, "Anticheat.Hover.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_FIXED_Z_ENABLED, "Anticheat.FixedZ.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_FIXED_Z_REJECT, "Anticheat.FixedZ.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_FIXED_Z_THRESHOLD, "Anticheat.FixedZ.Threshold", 5);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_FIXED_Z_PENALTY, "Anticheat.FixedZ.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_ROOT_MOVE_ENABLED, "Anticheat.RootMove.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_ROOT_MOVE_REJECT, "Anticheat.RootMove.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_ROOT_MOVE_THRESHOLD_TICK, "Anticheat.RootMove.Threshold.Tick", 5);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_ROOT_MOVE_THRESHOLD_TOTAL, "Anticheat.RootMove.Threshold.Total", 30);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_ROOT_MOVE_PENALTY, "Anticheat.RootMove.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_SELF_ROOT_ENABLED, "Anticheat.SelfRoot.Enable", true);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_SELF_ROOT_REJECT, "Anticheat.SelfRoot.Reject", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_SELF_ROOT_THRESHOLD, "Anticheat.SelfRoot.Threshold", 1);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_SELF_ROOT_PENALTY, "Anticheat.SelfRoot.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_WRONG_ACK_DATA_ENABLED, "Anticheat.WrongAckData.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_WRONG_ACK_DATA_THRESHOLD, "Anticheat.WrongAckData.Threshold", 3);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_WRONG_ACK_DATA_PENALTY, "Anticheat.WrongAckData.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_PENDING_ACK_DELAY_ENABLED, "Anticheat.PendingAckDelay.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_PENDING_ACK_DELAY_THRESHOLD, "Anticheat.PendingAckDelay.Threshold", 3);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_PENDING_ACK_DELAY_PENALTY, "Anticheat.PendingAckDelay.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_EXPLORE_ENABLED, "Anticheat.ExploreArea.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_EXPLORE_THRESHOLD, "Anticheat.ExploreArea.Threshold", 100);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_EXPLORE_PENALTY, "Anticheat.ExploreArea.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_EXPLORE_HIGH_LEVEL_ENABLED, "Anticheat.ExploreHighLevelArea.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_EXPLORE_HIGH_LEVEL_THRESHOLD, "Anticheat.ExploreHighLevelArea.Threshold", 50);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_EXPLORE_HIGH_LEVEL_PENALTY, "Anticheat.ExploreHighLevelArea.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS | CHEAT_ACTION_KICK);
    setConfig(CONFIG_BOOL_AC_MOVEMENT_CHEAT_FORBIDDEN_AREA_ENABLED, "Anticheat.ForbiddenArea.Enable", true);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_FORBIDDEN_AREA_THRESHOLD, "Anticheat.ForbiddenArea.Threshold", 1);
    setConfig(CONFIG_UINT32_AC_MOVEMENT_CHEAT_FORBIDDEN_AREA_PENALTY, "Anticheat.ForbiddenArea.Penalty", CHEAT_ACTION_INFO_LOG | CHEAT_ACTION_REPORT_GMS);

    // Warden Anticheat
    setConfig(CONFIG_BOOL_AC_WARDEN_WIN_ENABLED, "Warden.WinEnabled", false);
    setConfig(CONFIG_BOOL_AC_WARDEN_OSX_ENABLED, "Warden.OSXEnabled", false);
    setConfig(CONFIG_BOOL_AC_WARDEN_PLAYERS_ONLY, "Warden.PlayersOnly", true);
    setConfig(CONFIG_UINT32_AC_WARDEN_NUM_MEM_CHECKS, "Warden.NumMemChecks", 3);
    setConfig(CONFIG_UINT32_AC_WARDEN_NUM_OTHER_CHECKS, "Warden.NumOtherChecks", 7);
    //setConfigMinMax(CONFIG_UINT32_AC_WARDEN_DEFAULT_PENALTY, "Warden.DefaultPenalty", WARDEN_ACTION_BAN, WARDEN_ACTION_LOG, WARDEN_ACTION_BAN);
    setConfig(CONFIG_UINT32_AC_WARDEN_CLIENT_BAN_DURATION, "Warden.BanDuration", 86400);
    setConfig(CONFIG_UINT32_AC_WARDEN_CLIENT_CHECK_HOLDOFF, "Warden.ClientCheckHoldOff", 30);
    setConfig(CONFIG_UINT32_AC_WARDEN_CLIENT_RESPONSE_DELAY, "Warden.ClientResponseDelay", 120);
    setConfig(CONFIG_UINT32_AC_WARDEN_DB_LOGLEVEL, "Warden.DBLogLevel", 0);*/
    m_wardenModuleDirectory = sConfig.GetStringDefault("Warden.ModuleDir", "warden_modules");

    // Antispam
    setConfig(CONFIG_BOOL_AC_ANTISPAM_ENABLED, "Antispam.Enable", true);
    setConfig(CONFIG_BOOL_AC_ANTISPAM_BAN_ENABLED, "Antispam.BanEnable", false);
    setConfig(CONFIG_BOOL_AC_ANTISPAM_MERGE_ALL_WHISPERS, "Antispam.MergeAllWhispers", false);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_MAX_RESTRICTION_LEVEL, "Antispam.MaxRestrictionLevel", 20);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_ORIGINAL_NORMALIZE_MASK, "Antispam.OriginalNormalizeMask", 0);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_FULLY_NORMALIZE_MASK, "Antispam.FullyNormalizeMask", 0);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_SCORE_THRESHOLD, "Antispam.ScoreThreshold", 4);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_MUTETIME, "Antispam.Mutetime", 3600);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_CHAT_MASK, "Antispam.ChatMask", 0);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_DETECT_THRESHOLD, "Antispam.DetectThreshold", 3);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_REPEAT_COUNT, "Antispam.RepeatCount", 5);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_UPDATE_TIMER, "Antispam.UpdateTimer", 60000);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_MESSAGE_BLOCK_SIZE, "Antispam.MessageBlockSize", 5);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_FREQUENCY_TIME, "Antispam.FrequencyTime", 3);
    setConfig(CONFIG_UINT32_AC_ANTISPAM_FREQUENCY_COUNT, "Antispam.FrequencyCount", 3);

    setConfig(CONFIG_UINT32_CREATURE_SUMMON_LIMIT, "MaxCreatureSummonLimit", DEFAULT_CREATURE_SUMMON_LIMIT);

    // Smartlog data
    sLog.InitSmartlogEntries(sConfig.GetStringDefault("Smartlog.ExtraEntries", ""));
    sLog.InitSmartlogGuids(sConfig.GetStringDefault("Smartlog.ExtraGuids", ""));

    // Server autobroadcast settings:
    setConfig(CONFIG_UINT32_AUTOBROADCAST_INTERVAL, "AutoBroadcast.Timer", 60000);

    setConfig(CONFIG_BOOL_TRANSMOG_ENABLED, "Transmog.Enable", false);

    setConfig(CONFIG_UINT32_TRANSMOG_REQ_ITEM, "Transmog.ReqItemID", 0);
    if (getConfig(CONFIG_UINT32_TRANSMOG_REQ_ITEM) < 0)
    {
        sLog.outError("WORLD: CONFIG_UINT32_TRANSMOG_REQ_ITEM has wrong value (%u). Must be > 0. Set to 0.", getConfig(CONFIG_UINT32_TRANSMOG_REQ_ITEM));
        setConfig(CONFIG_UINT32_TRANSMOG_REQ_ITEM, 0);
    }
    setConfig(CONFIG_UINT32_TRANSMOG_REQ_ITEM_COUNT, "Transmog.ReqItemCount", 1);
    if (getConfig(CONFIG_UINT32_TRANSMOG_REQ_ITEM_COUNT) <= 0 || getConfig(CONFIG_UINT32_TRANSMOG_REQ_ITEM_COUNT) > 200)
    {
        sLog.outError("WORLD: CONFIG_UINT32_TRANSMOG_REQ_ITEM_COUNT has wrong value (%u). Must be 1 - 200. Set to 1.", getConfig(CONFIG_UINT32_TRANSMOG_REQ_ITEM_COUNT));
        setConfig(CONFIG_UINT32_TRANSMOG_REQ_ITEM_COUNT, 1);
    }
    setConfig(CONFIG_FLOAT_TRANSMOG_REQ_MONEY_RATE, "Transmog.ReqMoneyRate", 0.0);
    setConfig(CONFIG_BOOL_STATIC_OBJECT_LOS, "StaticObjectLOS", true);
    setConfig(CONFIG_BOOL_DUAL_SPEC, "DualSpec", false);
    
    setConfig(CONFIG_BOOL_HARDCORE_DISABLE_DUEL, "Hardcore.Disable.Duel", false);

    setConfig(CONFIG_UINT32_BG_SV_SPARK_MAX_COUNT, "BattlegroundSV.MaxSparks", 100);

    setConfig(CONFIG_UINT32_ITEM_LOG_RESTORE_QUALITY, "ItemRestoreLog.MinQuality", 3);

    setConfig(CONFIG_UINT32_CHAT_MIN_LEVEL, "Chat.MinLevel", 5);

    setConfig(CONFIG_UINT32_ACCOUNT_DATA_LAST_LOGIN_DAYS, "AccountData.LastLoginDays", 60);

    setConfig(CONFIG_BOOL_ITEM_LOG_RESTORE_QUEST_ITEMS, "ItemRestoreLog.QuestItems", false);

    setConfigMinMax(CONFIG_INT32_KALIMDOR_TIME_OFFSET, "KalimdorTimeOffset", 0, 0, 23);

    m_minChatLevel = getConfig(CONFIG_UINT32_CHAT_MIN_LEVEL);

    m_timers[WUPDATE_CENSUS].SetInterval(60 * MINUTE * IN_MILLISECONDS);
    m_timers[WUPDATE_SHELLCOIN].SetInterval(10 * MINUTE * IN_MILLISECONDS);

    // Migration for auto committing updates.
    setConfig(CONFIG_UINT32_AUTO_COMMIT_MINUTES, "AutoCommit.Minutes", 0);
    auto pathString = sConfig.GetStringDefault("Database.AutoUpdate.Path", "");
    auto worldUpdateFolder = sConfig.GetStringDefault("Database.AutoUpdate.WorldUpdateName", "World");
    std::filesystem::path folderPath{ pathString };
    std::filesystem::directory_entry worldUpdatePath{ folderPath / worldUpdateFolder };
    m_worldUpdatesDirectory = fs::absolute(worldUpdatePath.path()).string();
    time_t curr;
    tm local;
    time(&curr);                                        // get current time_t value
    local = *(localtime(&curr));                        // dereference and assign
    char fName[128];
    sprintf(fName, "%04d%02d%02d%02d%02d%02d_world.sql", local.tm_year + 1900, local.tm_mon + 1, local.tm_mday, local.tm_hour, local.tm_min, local.tm_sec);
    m_worldUpdatesMigration = m_worldUpdatesDirectory + "/" + fName;
}

void autoCommitWorkerThread()
{
    time_t lastUpdateTime = time(0);
    while (!sWorld.IsStopped())
    {
        time_t now = time(0);
        if (sWorld.GetMigration().HasChanges() &&
           (lastUpdateTime + sWorld.getConfig(CONFIG_UINT32_AUTO_COMMIT_MINUTES) * MINUTE) < now)
        {
            lastUpdateTime = now;
            sWorld.GetMigration().CommitUpdates();
        }
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
}

constexpr uint32 MailReturnDelay = 30 * MINUTE * IN_MILLISECONDS;

void charactersDatabaseWorkerThread()
{
    static uint32 returnDelay = MailReturnDelay;
    static uint32 currentMs = WorldTimer::getMSTime();

    CharacterDatabase.ThreadStart();
    while (!sWorld.IsStopped())
    {
        std::this_thread::sleep_for(5s);
        if (CharacterDatabase.HasAsyncQuery())
            continue;

        uint32 diff = WorldTimer::getMSTimeDiffToNow(currentMs);
        currentMs = WorldTimer::getMSTime();
        
        if (returnDelay >= diff)
        {
            returnDelay -= diff;
            continue;
        }

        Player::DeleteOldCharacters();
        sObjectMgr.ReturnOrDeleteOldMails(true);
        returnDelay = MailReturnDelay;
    }
    CharacterDatabase.ThreadEnd();
}

void World::RestoreLostGOs()
{
    std::fstream file{ "log.txt" };

    if (!file)
        return;

    std::regex pattern{ "gobject (add|delete|turn) (\\d+) +X: +([+-]?[0-9]*[.]?[0-9]+) +Y: +([+-]?[0-9]*[.]?[0-9]+) +Z: +([+-]?[0-9]*[.]?[0-9]+) +Map: +(\\d+)" };


    const uint32 startingGuid = 5000095;
    uint32 currentGuid = startingGuid;

    std::unordered_map<uint32, GameObject*> guidLinkage;
    std::string val;
    while (std::getline(file, val))
    {
        std::smatch match;
        if (!std::regex_search(val, match, pattern))
            continue;

        const std::string command = match[1].str();
        const uint32 entryOrGuid =  atoi(match[2].str().c_str());
        float xCoord = strtod(match[3].str().c_str(), nullptr);
        float yCoord = strtod(match[4].str().c_str(), nullptr);
        float zCoord = strtod(match[5].str().c_str(), nullptr);
        uint32 mapId  = atoi(match[6].str().c_str());

        if (command.find("add") != std::string::npos)
        {
            const GameObjectInfo* gInfo = sObjectMgr.GetGameObjectInfo(entryOrGuid);

            if (!gInfo)
            {
                sLog.outError("ERROR WITH GO PROTO.");
                continue;
            }

            Map* map = sMapMgr.FindMap(mapId);

            if (!map)
            {
                sLog.outError("ERROR WITH MAP ID.");
                continue;
            }

            GameObject* pGameObj = new GameObject;

            // used guids from specially reserved range (can be 0 if no free values)
            uint32 db_lowGUID = sObjectMgr.GenerateStaticGameObjectLowGuid();
            if (!db_lowGUID)
            {
                sLog.outError("ERROR WITH lowGUID.");
                continue;
            }

            if (!pGameObj->Create(db_lowGUID, gInfo->id, map, xCoord, yCoord, zCoord, 0.f, 0.0f, 0.0f, 0.0f, 0.0f, GO_ANIMPROGRESS_DEFAULT, GO_STATE_READY))
            {
                delete pGameObj;
                continue;
            }


            pGameObj->SetRespawnTime(300); // Default 5 min.
       
            guidLinkage[currentGuid] = pGameObj;
            ++currentGuid;
        }

        if (command.find("delete") != std::string::npos)
        {
            guidLinkage.erase(entryOrGuid);
        }

        if (command.find("turn") != std::string::npos)
        {
            //dont have orientation from logs so can't correct orientation for GOs
        }

        for (auto obj : guidLinkage)
        {
            obj.second->SaveToDB(obj.second->GetMapId());
        } 
    }

}

/// Initialize the World
void World::SetInitialWorldSettings()
{
    ///- Initialize the random number generator
    srand((unsigned int)time(nullptr));

    ///- Time server startup
    uint32 uStartTime = WorldTimer::getMSTime();

    sLog.outString("Loading config...");
    LoadConfigSettings();

    ///- Check the existence of the map files for all races start areas.
    if (!MapManager::ExistMapAndVMap(0, -6240.32f, 331.033f) ||
            !MapManager::ExistMapAndVMap(0, -8949.95f, -132.493f) ||
            !MapManager::ExistMapAndVMap(1, -618.518f, -4251.67f) ||
            !MapManager::ExistMapAndVMap(0, 1676.35f, 1677.45f) ||
            !MapManager::ExistMapAndVMap(1, 10311.3f, 832.463f) ||
            !MapManager::ExistMapAndVMap(1, -2917.58f, -257.98f))
    {
        sLog.outError("Correct *.map files not found in path '%smaps' or *.vmtree/*.vmtile files in '%svmaps'. Please place *.map and vmap files in appropriate directories or correct the DataDir value in the mangosd.conf file.", m_dataPath.c_str(), m_dataPath.c_str());
        Log::WaitBeforeContinueIfNeed();
        exit(1);
    }

    ///- Loading strings. Getting no records means core load has to be canceled because no error message can be output.
    sLog.outString("Loading MaNGOS strings...");
    if (!sObjectMgr.LoadMangosStrings())
    {
        Log::WaitBeforeContinueIfNeed();
        exit(1);                                            // Error message displayed in function already
    }

    sLog.outString("Initiating auto-updater...");
    using namespace DBUpdater;
    if (!sAutoUpdater->ProcessUpdates())
    {
        sLog.outError("DB AutoUpdater FAILED, cancelling server.");
        Log::WaitBeforeContinueIfNeed();
        exit(1);
    }

    ///- Loading shop tables
    sLog.outString("Loading shop...");
    sObjectMgr.LoadShop();

    ///- Loads existing IDs in the database.
    sLog.outString("Loading existing IDs in the database...");
    sObjectMgr.LoadAllIdentifiers();

    ///- Chargements des variables (necessaire pour le OutdoorJcJ)
    sLog.outString("Loading saved variables...");
    sObjectMgr.LoadSavedVariable();

    ///- Update the realm entry in the database with the realm type from the config file
    //No SQL injection as values are treated as integers

    // not send custom type REALM_FFA_PVP to realm list
    uint32 server_type = IsFFAPvPRealm() ? REALM_TYPE_PVP : getConfig(CONFIG_UINT32_GAME_TYPE);
    uint32 realm_zone = getConfig(CONFIG_UINT32_REALM_ZONE);
    LoginDatabase.PExecute("UPDATE realmlist SET icon = %u, timezone = %u WHERE id = '%u'", server_type, realm_zone, realmID);

    sAccountMgr.Load();

    ///- Remove the bones (they should not exist in DB though) and old corpses after a restart
    CharacterDatabase.PExecute("DELETE FROM corpse WHERE corpse_type = '0' OR time < (UNIX_TIMESTAMP()-'%u')", 3 * DAY);

    sLog.outString("Loading spells...");
    sSpellMgr.LoadSpells();
    sLog.outString("Loading factions...");
    sObjectMgr.LoadFactions();
    sLog.outString("Loading sounds...");
    sObjectMgr.LoadSoundEntries();
    sLog.outString("Loading taxi nodex...");
    sObjectMgr.LoadTaxiNodes();
    sLog.outString("Loading area triggers...");
    sObjectMgr.LoadAreaTriggers();
    sLog.outString("Loading skill lines...");
    sObjectMgr.LoadSkillLineAbility();
    sLog.outString("Loading mail templates...");
    sObjectMgr.LoadMailTemplate();
    sLog.outString("Loading pet spell data...");
    sObjectMgr.LoadPetSpellData();
    sLog.outString("Loading world safe location orientation...");
    sObjectMgr.LoadWorldSafeLocsFacing();
    sLog.outString("Loading DBC data...");
    LoadDBCStores(m_dataPath);
    DetectDBCLang();
    sObjectMgr.SetDBCLocaleIndex(GetDefaultDbcLocale());    // Get once for all the locale index of DBC language (console/broadcasts)
    sLog.outString("Loading script names...");
    sScriptMgr.LoadScriptNames();
    sLog.outString("Loading map templates...");
    sObjectMgr.LoadMapTemplate();
    sLog.outString("Loading area templates...");
    sObjectMgr.LoadAreaTemplate();
    sLog.outString("Loading spell mods...");
    sSpellModMgr.LoadSpellMods();
    sSpellMgr.AssignInternalSpellFlags();
    sLog.outString("Loading skill line ability maps...");
    sSpellMgr.LoadSkillLineAbilityMaps();
    sLog.outString("Loading race and class skills...");
    sSpellMgr.LoadSkillRaceClassInfoMap();

	///- Clean up and pack instances
	sMapPersistentStateMgr.CleanupInstances();              // must be called before `creature_respawn`/`gameobject_respawn` tables

	sMapPersistentStateMgr.PackInstances();

	sObjectMgr.PackGroupIds();                              // must be after CleanupInstances

	sMapPersistentStateMgr.ScheduleInstanceResets();        // Must be after cleanup and packing

    ///- Init highest guids before any guid using table loading to prevent using not initialized guids in some code.
    sObjectMgr.SetHighestGuids();                           // must be after packing instances
    sLog.outString("Loading broadcast texts...");
    sObjectMgr.LoadBroadcastTexts();
    sLog.outString("Loading page texts...");
    sObjectMgr.LoadPageTexts();
    sLog.outString("Loading gameobject info...");
    sObjectMgr.LoadGameobjectInfo();
    sLog.outString("Loading transport templates...");
    sTransportMgr->LoadTransportTemplates();
    sLog.outString("Loading spell chains...");
    sSpellMgr.LoadSpellChains();
    sLog.outString("Loading spell elixirs...");
    sSpellMgr.LoadSpellElixirs();
    sLog.outString("Loading spell learn skills...");
    sSpellMgr.LoadSpellLearnSkills();                       // must be after LoadSpellChains
    sLog.outString("Loading spell learn spells...");
    sSpellMgr.LoadSpellLearnSpells();
    sLog.outString("Loading spell proc events...");
    sSpellMgr.LoadSpellProcEvents();
    sLog.outString("Loading spell proc item enchants...");
    sSpellMgr.LoadSpellProcItemEnchant();                   // must be after LoadSpellChains
    sLog.outString("Loading spell threats...");
    sSpellMgr.LoadSpellThreats();
    sLog.outString("Loading spell enchant charges...");
    sSpellMgr.LoadSpellEnchantCharges();
    sLog.outString("Loading NPC texts...");
    sObjectMgr.LoadNPCText();
    LoadRandomEnchantmentsTable();
    sLog.outString("Loading items...");
    sObjectMgr.LoadItemPrototypes();
    sLog.outString("Loading item texts...");
    sObjectMgr.LoadItemTexts();
    sLog.outString("Loading creature display data...");
    sObjectMgr.LoadCreatureDisplayInfoAddon();
    sLog.outString("Loading creature equipment templates...");
    sObjectMgr.LoadEquipmentTemplates();
    sLog.outString("Loading creature spells...");
    sObjectMgr.LoadCreatureSpells();
    sLog.outString("Loading creature templates...");
    sObjectMgr.LoadCreatureTemplates();
    sLog.outString("Loading spell script targets...");
    sSpellMgr.LoadSpellScriptTarget();                      // must be after LoadCreatureTemplates and LoadGameobjectInfo
    sLog.outString("Loading item required targets...");
    sObjectMgr.LoadItemRequiredTarget();
    sLog.outString("Loading reputation reward rates...");
    sObjectMgr.LoadReputationRewardRate();
    sLog.outString("Loading reputation reward values...");
    sObjectMgr.LoadReputationOnKill();
    sLog.outString("Loading reputation spillover templates...");
    sObjectMgr.LoadReputationSpilloverTemplate();
    sLog.outString("Loading points of interest...");
    sObjectMgr.LoadPointsOfInterest();
    sLog.outString("Loading defaul pet spells...");
    sObjectMgr.LoadPetCreateSpells();
    sLog.outString("Loading creatures...");
    sObjectMgr.LoadCreatures();
    sLog.outString("Loading creature addons...");    
    sObjectMgr.LoadCreatureAddons();                        // must be after LoadCreatureTemplates() and LoadCreatures()    
    sCreatureGroupsManager->Load();
    sLog.outString("Loading gameobjects...");
    sObjectMgr.LoadGameobjects();
    sLog.outString("Loading gameobject requirements...");
    sObjectMgr.LoadGameobjectsRequirements();
    sLog.outString("Loading gameobject display data...");
    sObjectMgr.LoadGameObjectDisplayInfoAddon();
    sCreatureLinkingMgr.LoadFromDB();
    sLog.outString("Loading object pooling data...");
    sPoolMgr.LoadFromDB();
    sLog.outString("Loading weather...");
    sWeatherMgr.LoadWeatherZoneChances();
    sLog.outString("Loading quests...");
    sObjectMgr.LoadQuests();                                // must be loaded after DBCs, creature_template, item_template, gameobject tables
    sLog.outString("Loading quest relations...");
    sObjectMgr.LoadQuestRelations();                        // must be after quest load
    sLog.outString("Loading quest greetings...");
    sObjectMgr.LoadQuestGreetings();
    sLog.outString("Loading trainer greetings...");
    sObjectMgr.LoadTrainerGreetings();    
    sGameEventMgr.LoadFromDB();
    sLog.outString("Loading scaling...");
    sGuidObjectScaling->LoadFromDB();
    sLog.outString("Loading conditions...");
    sObjectMgr.LoadConditions();
    sLog.outString("Loading creature respawn timers...");
    sMapPersistentStateMgr.LoadCreatureRespawnTimes();
    sLog.outString("Loading gameobject respawn timers...");
    sMapPersistentStateMgr.LoadGameobjectRespawnTimes();
    sLog.outString("Loading spell areas...");
    sSpellMgr.LoadSpellAreas();
    sLog.outString("Loading area trigger teleports...");
    sObjectMgr.LoadAreaTriggerTeleports();                  // must be after item template load
    sLog.outString("Loading quest area trigger...");
    sObjectMgr.LoadQuestAreaTriggers();                     // must be after LoadQuests
    sLog.outString("Loading custom graveyards...");
    sObjectMgr.LoadCustomGraveyards();                   
    sLog.outString("Loading tavern area triggers...");
    sObjectMgr.LoadTavernAreaTriggers();
    sLog.outString("Loading battlegroun entry triggers...");
    sObjectMgr.LoadBattlegroundEntranceTriggers();
    sLog.outString("Loading area trigger scripts...");
    sScriptMgr.LoadAreaTriggerScripts();
    sLog.outString("Loading event ID scripts...");
    sScriptMgr.LoadEventIdScripts();
    sLog.outString("Loading graveyard zones...");
    sObjectMgr.LoadGraveyardZones();
    sLog.outString("Loading spell target positions...");
    sSpellMgr.LoadSpellTargetPositions();
    sLog.outString("Loading spell affects...");
    sSpellMgr.LoadSpellAffects();
    sLog.outString("Loading spell pet auras...");
    sSpellMgr.LoadSpellPetAuras();
    sLog.outString("Loading player info...");    
    sObjectMgr.LoadPlayerInfo();
    sLog.outString("Loading exploration base XP...");
    sObjectMgr.LoadExplorationBaseXP();
    sLog.outString("Loading pet names...");
    sObjectMgr.LoadPetNames();
    sLog.outString("Initiating a character DB cleanup...");
    CharacterDatabaseCleaner::CleanDatabase();
    sLog.outString("Loading character cache data...");
    sObjectMgr.LoadPlayerCacheData();
    sLog.outString("Loading the max pet number...");
    sObjectMgr.LoadPetNumber();
    sLog.outString("Loading pet level stats...");
    sObjectMgr.LoadPetLevelInfo();
    sLog.outString("Loading player corpses...");
	sObjectMgr.LoadCorpses();
    sLog.outString("Loading loot tables...");    
    LootIdSet ids_set;
    LoadLootTables(ids_set);
    sLog.outString("Loading custom character skins...");
    sObjectMgr.LoadCustomCharacterSkins();
    sLog.outString("Loading fishing base level requirements...");
    sObjectMgr.LoadFishingBaseSkillLevel();
    sLog.outString("Loading NPC gossips...");
    sObjectMgr.LoadNpcGossips();                            // must be after load Creature and LoadNPCText
    sLog.outString("Loading gossip scripts...");
    sScriptMgr.LoadGossipScripts();                         // must be before gossip menu options
    sLog.outString("Loading gossip menus...");
    sObjectMgr.LoadGossipMenu();
    sLog.outString("Loading gossip menu items...");
    sObjectMgr.LoadGossipMenuItems();
    sLog.outString("Loading vendor templates...");
    sObjectMgr.LoadVendorTemplates();                       // must be after load ItemTemplate
    sLog.outString("Loading vendors...");
    sObjectMgr.LoadVendors();                               // must be after load CreatureTemplate, VendorTemplate, and ItemTemplate
    sLog.outString("Loading trainer templates...");
    sObjectMgr.LoadTrainerTemplates();                      // must be after load CreatureTemplate
    sLog.outString("Loading trainers...");
    sObjectMgr.LoadTrainers();                              // must be after load CreatureTemplate, TrainerTemplate
    sLog.outString("Loading creature movement scripts...");
    sScriptMgr.LoadCreatureMovementScripts();
    sLog.outString("Loading waypoints...");    
    sWaypointMgr.Load();
    sLog.outString("Loading localization data...");
    sObjectMgr.LoadBroadcastTextLocales();
    sObjectMgr.LoadCreatureLocales();                       // must be after CreatureInfo loading
    sObjectMgr.LoadGameObjectLocales();                     // must be after GameobjectInfo loading
    sObjectMgr.LoadItemLocales();                           // must be after ItemPrototypes loading
    sObjectMgr.LoadQuestLocales();                          // must be after QuestTemplates loading
    sObjectMgr.LoadPageTextLocales();                       // must be after PageText loading
    sObjectMgr.LoadGossipMenuItemsLocales();                // must be after gossip menu items loading
    sObjectMgr.LoadPointOfInterestLocales();                // must be after POI loading
    sObjectMgr.LoadAreaLocales();
    sObjectMgr.LoadCartographerAreas();
    sLog.outString("Loading auction houses...");	
	sAuctionMgr.LoadAuctionHouses();
    sLog.outString("Loading auction items...");
	sAuctionMgr.LoadAuctionItems();
    sLog.outString("Loading auctions...");
	sAuctionMgr.LoadAuctions();
    sLog.outString("Loading guilds...");
	sGuildMgr.LoadGuilds();
    sLog.outString("Loading guild petisions...");
    sObjectMgr.LoadGuildHouses();
    sLog.outString("Loading guild houses...");
	sGuildMgr.LoadPetitions();
    sLog.outString("Loading groups...");
	sObjectMgr.LoadGroups();
    sLog.outString("Loading reserved player names...");
	sObjectMgr.LoadReservedPlayersNames();
    sLog.outString("Loading gameobjects for quests...");
    sObjectMgr.LoadGameObjectForQuests();
    sLog.outString("Loading battlemasters...");
    sBattleGroundMgr.LoadBattleMastersEntry();
    sLog.outString("Loading battle events...");
    sBattleGroundMgr.LoadBattleEventIndexes();
    sLog.outString("Loading GM telepors...");
    sObjectMgr.LoadGameTele();
    sLog.outString("Loading taxi path transitions...");
    sObjectMgr.LoadTaxiPathTransitions();
    sLog.outString("Loading tickets...");
	sTicketMgr->Initialize();
	sTicketMgr->LoadTickets();
    sLog.outString("Loading surveys...");
	sTicketMgr->LoadSurveys();
    sLog.outString("Returning old mails...");
	sObjectMgr.ReturnOrDeleteOldMails(false);
    sLog.outString("Loading quest start scripts...");
    sScriptMgr.LoadQuestStartScripts();                     // must be after load Creature/Gameobject(Template/Data) and QuestTemplate
    sLog.outString("Loading quest completion scripts...");
    sScriptMgr.LoadQuestEndScripts();                       // must be after load Creature/Gameobject(Template/Data) and QuestTemplate
    sLog.outString("Loading spell scripts...");
    sScriptMgr.LoadSpellScripts();                          // must be after load Creature/Gameobject(Template/Data)
    sLog.outString("Loading creature spell scripts...");
    sScriptMgr.LoadCreatureSpellScripts();
    sLog.outString("Loading gameobject scripts...");
    sScriptMgr.LoadGameObjectScripts();                     // must be after load Creature/Gameobject(Template/Data)
    sLog.outString("Loading event scripts...");
    sScriptMgr.LoadEventScripts();                          // must be after load Creature/Gameobject(Template/Data)
    sLog.outString("Loading generic scripts...");
    sScriptMgr.LoadGenericScripts();
    sLog.outString("Loading creature EventAI scripts...");
    sScriptMgr.LoadCreatureEventAIScripts();
    sScriptMgr.CheckAllScriptTexts(); 
    sLog.outString("Loading creature EventAI events...");
    sEventAIMgr.LoadCreatureEventAI_Events();
    sScriptMgr.Initialize();    
    sLog.outString("Loading aura removal handler...");
    sAuraRemovalMgr.LoadFromDB();
    sLog.outString("Loading daily quests handler...");
    sDailyQuestHandler->LoadFromDB(true);
    sLog.outString("Loading companion manager...");
    sCompanionMgr->LoadFromDB();
    sLog.outString("Loading mount manager...");
    sMountMgr->LoadFromDB();

    sLog.outString("Loading cached Account data...");
    LoadAccountData();

    ///- Initialize game time and timers
    m_gameTime = time(nullptr);
    m_startTime = m_gameTime;
    m_gameDay = (m_gameTime + m_timeZoneOffset) / DAY;

    tm local;
    time_t curr;
    time(&curr);
    local = *(localtime(&curr));                            // dereference and assign
    char isoDate[128];
    sprintf(isoDate, "%04d-%02d-%02d %02d:%02d:%02d",
            local.tm_year + 1900, local.tm_mon + 1, local.tm_mday, local.tm_hour, local.tm_min, local.tm_sec);

    LoginDatabase.PExecute("INSERT INTO uptime (realmid, starttime, startstring, uptime) VALUES('%u', " UI64FMTD ", '%s', 0)",
                           realmID, uint64(m_startTime), isoDate);

    // Only store destroyed items for 30 days.
    CharacterDatabase.PExecute("DELETE FROM `character_destroyed_items` WHERE (`time` + %u) < " UI64FMTD, 30 * DAY, m_startTime);

    m_timers[WUPDATE_AUCTIONS].SetInterval(MINUTE * IN_MILLISECONDS);
    m_timers[WUPDATE_UPTIME].SetInterval(getConfig(CONFIG_UINT32_UPTIME_UPDATE)*MINUTE * IN_MILLISECONDS);
    //Update "uptime" table based on configuration entry in minutes.
    m_timers[WUPDATE_CORPSES].SetInterval(20 * MINUTE * IN_MILLISECONDS);
    m_timers[WUPDATE_SAVE_VAR].SetInterval(MINUTE * IN_MILLISECONDS);

    // Update groups with offline leader after delay in seconds
    m_timers[WUPDATE_GROUPS].SetInterval(IN_MILLISECONDS);

    ///- Initialize static helper structures
    AIRegistry::Initialize();
    Player::InitVisibleBits();
    sLog.outString("Loading gameobject model list...");
    LoadGameObjectModelList();

    sLog.outString("Initiating map manager...");
    sMapMgr.Initialize();
    sLog.outString("Deleting expired bans...");
    sBattleGroundMgr.CreateInitialBattleGrounds();
    CheckLootTemplates_Reference(ids_set);
    sLog.outString("Initiating zone scripts...");
    sZoneScriptMgr.InitZoneScripts();
    sLog.outString("Loading transport on continents...");
	sTransportMgr->SpawnContinentTransports();
    sLog.outString("Deleting expired bans...");
	LoginDatabase.Execute("DELETE FROM ip_banned WHERE unbandate<=UNIX_TIMESTAMP() AND unbandate<>bandate");
    sLog.outString("Initiating honor maintenance...");
	sHonorMaintenancer.Initialize();
	sHonorMaintenancer.DoMaintenance();

    uint32 nextGameEvent = sGameEventMgr.Initialize();
    m_timers[WUPDATE_EVENTS].SetInterval(nextGameEvent);    //depend on next event

    sLog.outString("Loading disable spells...");
    sObjectMgr.LoadSpellDisabledEntrys();
    sLog.outString("Loading anticheat...");
    sAnticheatLib->Initialize();
    sLog.outString("Loading autobroadcat...");
	sAutoBroadCastMgr.Load();
    sLog.outString("Loading player phasing...");
	sObjectMgr.LoadPlayerPhaseFromDb();
    sLog.outString("Caching player pets...");
	sCharacterDatabaseCache.LoadAll();
    sLog.outString("Loading player bot manager...");
	sPlayerBotMgr.Load();
    sLog.outString("Loading faction change reputations...");
	sObjectMgr.LoadFactionChangeReputations();
    sLog.outString("Loading faction change spells...");
	sObjectMgr.LoadFactionChangeSpells();
    sLog.outString("Loading faction change items...");
	sObjectMgr.LoadFactionChangeItems();
    sLog.outString("Loading faction change quests...");
	sObjectMgr.LoadFactionChangeQuests();
    sLog.outString("Loading faction change mounts...");
	sObjectMgr.LoadFactionChangeMounts();
    sLog.outString("Loading loot-disable map list...");
    sObjectMgr.LoadMapLootDisabled();
    sLog.outString("Loading cinematic waypoints...");
    sObjectMgr.LoadCinematicsWaypoints();
    sLog.outString("Loading transmogrification templates...");
    if (sWorld.getConfig(CONFIG_BOOL_TRANSMOG_ENABLED) || true) //temp, idk if this is enabled on ptr
    {
        sLog.outString("Loading transmogrification templates...");
        sObjectMgr.LoadItemTransmogrifyTemplates();
    }
    sLog.outString("Loading spell groups...");
    sSpellMgr.LoadSpellGroups();
    sLog.outString("Loading spell group stack rules...");
    sSpellMgr.LoadSpellGroupStackRules();
    if (getConfig(CONFIG_BOOL_RESTORE_DELETED_ITEMS))
    {
        sLog.outString("Restoring deleted items...");
        sObjectMgr.RestoreDeletedItems();
    }

    sLog.outString("Loading shell coins...");
    sObjectMgr.LoadShellCoinCount();
    m_lastShellCoinPrice = sObjectMgr.GetShellCoinBuyPrice();
    
    m_broadcaster =
        std::make_unique<MovementBroadcaster>(sWorld.getConfig(CONFIG_UINT32_PACKET_BCAST_THREADS),
                                              std::chrono::milliseconds(sWorld.getConfig(CONFIG_UINT32_PACKET_BCAST_FREQUENCY)));

    m_charDbWorkerThread.reset(new std::thread(&charactersDatabaseWorkerThread));

    if (getConfig(CONFIG_UINT32_AUTO_COMMIT_MINUTES))
        m_autoCommitThread = std::thread(&autoCommitWorkerThread);

	uint32 uTransmogFillStartTime = WorldTimer::getMSTime();
	sObjectMgr.FillPossibleTransmogs();
	uint32 uTransmogFillDuration = WorldTimer::getMSTimeDiff(uTransmogFillStartTime, WorldTimer::getMSTime());
	sLog.outString("Loading possible transmogs: %i minutes %i seconds", uTransmogFillDuration / 60000, (uTransmogFillDuration % 60000) / 1000);

#ifdef USING_DISCORD_BOT
    sLog.outString("Loading Discord Bot...");

    auto token = sConfig.GetStringDefault("DiscordBot.Token", "");
    if (!token.empty())
    {
        m_bot = new DiscordBot::Bot();
        m_bot->Setup(token);
    }
#endif

    uint32 uStartInterval = WorldTimer::getMSTimeDiff(uStartTime, WorldTimer::getMSTime());
    sLog.outString("World server is up and running! Loading time: %i minutes %i seconds", uStartInterval / 60000, (uStartInterval % 60000) / 1000);
}

void World::DetectDBCLang()
{
    uint32 m_lang_confid = sConfig.GetIntDefault("DBC.Locale", 255);

    if (m_lang_confid != 255 && m_lang_confid >= MAX_DBC_LOCALE)
    {
        sLog.outError("Incorrect DBC.Locale! Must be >= 0 and < %d (set to 0)", MAX_DBC_LOCALE);
        m_lang_confid = LOCALE_enUS;
    }

    ChrRacesEntry const* race = sChrRacesStore.LookupEntry(RACE_HUMAN);
    MANGOS_ASSERT(race);

    std::string availableLocalsStr;

    uint32 default_locale = MAX_DBC_LOCALE;
    for (int i = MAX_DBC_LOCALE - 1; i >= 0; --i)
    {
        if (strlen(race->name[i]) > 0)                      // check by race names
        {
            default_locale = i;
            m_availableDbcLocaleMask |= (1 << i);
            availableLocalsStr += localeNames[i];
            availableLocalsStr += " ";
        }
    }

    if (default_locale != m_lang_confid && m_lang_confid < MAX_DBC_LOCALE &&
            (m_availableDbcLocaleMask & (1 << m_lang_confid)))
        default_locale = m_lang_confid;

    if (default_locale >= MAX_DBC_LOCALE)
    {
        sLog.outError("Unable to determine your DBC Locale! (corrupt DBC?)");
        Log::WaitBeforeContinueIfNeed();
        exit(1);
    }

    m_defaultDbcLocale = LocaleConstant(default_locale);

    sLog.outString("Using %s DBC locale as default.", localeNames[m_defaultDbcLocale]);
    
}

/// Update the World !
void World::Update(uint32 diff)
{
    ///- Update the different timers
    for (auto& timer : m_timers)
    {
        if (timer.GetCurrent() >= 0)
            timer.Update(diff);
        else
            timer.SetCurrent(0);
    }

    ///- Update the game time and check for shutdown time
    _UpdateGameTime();

    ///-Update mass mailer tasks if any
    sMassMailMgr.Update();

    /// <ul><li> Handle auctions when the timer has passed
    if (m_timers[WUPDATE_AUCTIONS].Passed())
    {
        m_timers[WUPDATE_AUCTIONS].Reset();
        ///- Handle expired auctions
        sAuctionMgr.Update();
    }

    /// <li> Handle session updates
    uint32 updateSessionsTime = WorldTimer::getMSTime();
    UpdateSessions(diff);
    updateSessionsTime = WorldTimer::getMSTimeDiffToNow(updateSessionsTime);
    if (getConfig(CONFIG_UINT32_PERFLOG_SLOW_SESSIONS_UPDATE) && updateSessionsTime > getConfig(CONFIG_UINT32_PERFLOG_SLOW_SESSIONS_UPDATE))
        sLog.out(LOG_PERFORMANCE, "Update sessions: %ums", updateSessionsTime);

    /// <li> Update uptime table
    if (m_timers[WUPDATE_UPTIME].Passed())
    {
        uint32 tmpDiff = uint32(m_gameTime - m_startTime);
        uint32 onlineClientsNum = GetActiveSessionCount();
        uint32 maxClientsNum = GetMaxActiveSessionCount();

        m_timers[WUPDATE_UPTIME].Reset();
        LoginDatabase.PExecute("UPDATE uptime SET uptime = %u, onlineplayers = %u, maxplayers = %u WHERE realmid = %u AND starttime = " UI64FMTD, tmpDiff, onlineClientsNum, maxClientsNum, realmID, uint64(m_startTime));
    }

    ///- Update objects (maps, transport, creatures,...)
    uint32 updateMapSystemTime = WorldTimer::getMSTime();
    //TODO: find a better place for this
    if (!m_updateThreads)
    {
        m_updateThreads = std::unique_ptr<ThreadPool>( new ThreadPool(
                    getConfig(CONFIG_UINT32_ASYNC_TASKS_THREADS_COUNT),
                    ThreadPool::ClearMode::UPPON_COMPLETION)
                                             );
        m_updateThreads->start<ThreadPool::MySQL<>>();
    }
    std::unique_lock<std::mutex> lock(m_asyncTaskQueueMutex);
    _asyncTasks.swap(_asyncTasksBusy);
    std::future<void> job = m_updateThreads->processWorkload(_asyncTasksBusy);
    _asyncTasks.clear();
    lock.unlock();

    sMapMgr.Update(diff);
    sBattleGroundMgr.Update(diff);
    sLFGMgr.Update(diff);
    sGuardMgr.Update(diff);
    sZoneScriptMgr.Update(diff);

    ///- Update groups with offline leaders
    if (m_timers[WUPDATE_GROUPS].Passed())
    {
        m_timers[WUPDATE_GROUPS].Reset();
        if (const uint32 delay = getConfig(CONFIG_UINT32_GROUP_OFFLINE_LEADER_DELAY))
        {
            for (ObjectMgr::GroupMap::const_iterator i = sObjectMgr.GetGroupMapBegin(); i != sObjectMgr.GetGroupMapEnd(); ++i)
                i->second->UpdateOfflineLeader(m_gameTime, delay);
        }
    }

    uint32 asyncWaitBegin = WorldTimer::getMSTime();
    if (job.valid())
        job.wait();

    updateMapSystemTime = WorldTimer::getMSTimeDiffToNow(updateMapSystemTime);
    if (getConfig(CONFIG_UINT32_PERFLOG_SLOW_MAPSYSTEM_UPDATE) && updateMapSystemTime > getConfig(CONFIG_UINT32_PERFLOG_SLOW_MAPSYSTEM_UPDATE))
        sLog.out(LOG_PERFORMANCE, "Update map system: %ums [%ums for async]", updateMapSystemTime, WorldTimer::getMSTimeDiffToNow(asyncWaitBegin));

    ///- Sauvegarde des variables internes (table variables) : MaJ par rapport a la DB
    if (m_timers[WUPDATE_SAVE_VAR].Passed())
    {
        m_timers[WUPDATE_SAVE_VAR].Reset();
        sObjectMgr.SaveVariables();
    }

    // execute callbacks from sql queries that were queued recently
    uint32 asyncQueriesTime = WorldTimer::getMSTime();
    UpdateResultQueue();
    asyncQueriesTime = WorldTimer::getMSTimeDiffToNow(asyncQueriesTime);
    if (getConfig(CONFIG_UINT32_PERFLOG_SLOW_ASYNC_QUERIES) && asyncQueriesTime > getConfig(CONFIG_UINT32_PERFLOG_SLOW_ASYNC_QUERIES))
        sLog.out(LOG_PERFORMANCE, "Update async queries: %ums", asyncQueriesTime);

    ///- Erase old corpses
    if (m_timers[WUPDATE_CORPSES].Passed())
    {
        m_timers[WUPDATE_CORPSES].Reset();

        sObjectAccessor.RemoveOldCorpses();
    }

    ///- Process Game events when necessary
    if (m_timers[WUPDATE_EVENTS].Passed())
    {
        m_timers[WUPDATE_EVENTS].Reset();                   // to give time for Update() to be processed
        uint32 nextGameEvent = sGameEventMgr.Update();
        m_timers[WUPDATE_EVENTS].SetInterval(nextGameEvent);
        m_timers[WUPDATE_EVENTS].Reset();
    }

    if (m_timers[WUPDATE_CENSUS].Passed())
    {
        m_timers[WUPDATE_CENSUS].Reset();

        uint32 alliancePlayers = 0, hordePlayers = 0;

        const auto& players = sWorld.GetAllSessions();
        for (const auto& [id, session] : players)
        {
            auto player = session->GetPlayer();
            if (!player || !player->IsInWorld())
                continue;

            if (player->GetTeamId() == TEAM_HORDE)
                ++hordePlayers;
            else
                ++alliancePlayers;
        }

        WorldDatabase.PExecute("INSERT INTO `player_census` (`alliance_players`, `horde_players`, `total_players`, `date_time`) VALUES (%u, %u, %u, NOW())", alliancePlayers,
            hordePlayers, hordePlayers + alliancePlayers);
    }

    if (m_timers[WUPDATE_SHELLCOIN].Passed())
    {
        m_timers[WUPDATE_SHELLCOIN].Reset();

        int32 buyPrice = sObjectMgr.GetShellCoinBuyPrice();
        int32 coinCount = sObjectMgr.GetShellCoinCount();

        if (m_lastShellCoinPrice)
        {
            std::string message;
            if (buyPrice > m_lastShellCoinPrice)
                message = "Shellcoin price has increased to " + std::to_string(buyPrice) + " copper (up " + std::to_string(int32((float(buyPrice) / float(m_lastShellCoinPrice)) * 100.0f - 100.0f)) + "%).";
            else if (buyPrice < m_lastShellCoinPrice)
                message = "Shellcoin price has decreased to " + std::to_string(buyPrice) + " copper (down " + std::to_string(int32(100.0f - (float(buyPrice) / float(m_lastShellCoinPrice)) * 100.0f)) + "%).";

            if (!message.empty())
            {
                for (auto const& guid : m_shellCoinOwners)
                {
                    if (Player* pPlayer = sObjectAccessor.FindPlayer(guid))
                    {
                        if (pPlayer->IsInWorld())
                            ChatHandler(pPlayer).SendSysMessage(message.c_str());
                    }
                }
            }
        }

        CharacterDatabase.PExecute("INSERT INTO `logs_shellcoin` (`time`, `count`, `price`) VALUES (%u, %u, %u)",
            m_gameTime, coinCount, buyPrice);

        m_lastShellCoinPrice = buyPrice;
    }

    /// </ul>
    ///- Move all creatures with "delayed move" and remove and delete all objects with "delayed remove"
    sMapMgr.RemoveAllObjectsInRemoveList();

    // update the instance reset times
    sMapPersistentStateMgr.Update();

    /// Maintenance checker
    if (m_MaintenanceTimeChecker < diff)
    {
        sHonorMaintenancer.CheckMaintenanceDay();
        m_MaintenanceTimeChecker = 60000;
    }
    else
        m_MaintenanceTimeChecker -= diff;

    //Update PlayerBotMgr
    sPlayerBotMgr.Update(diff);
    // Update AutoBroadcast
    sAutoBroadCastMgr.Update(diff);
    // Update liste des ban si besoin
    sAccountMgr.Update(diff);

    sDailyQuestHandler->Update(diff);

    // And last, but not least handle the issued cli commands
    ProcessCliCommands();

    //cleanup unused GridMap objects as well as VMaps
    if (getConfig(CONFIG_BOOL_CLEANUP_TERRAIN))
        sTerrainMgr.Update(diff);

	sGuildMgr.Update(diff);
}

/// Send a packet to all players (except self if mentioned)
void World::SendGlobalMessage(WorldPacket *packet, WorldSession *self, uint32 team)
{
    for (const auto& itr : m_sessions)
    {
        if (WorldSession* session = itr.second)
        {
            if (session != self)
            {
                Player* player = session->GetPlayer();
                if (player && player->IsInWorld() && (team == TEAM_NONE || player->GetTeam() == team))
                    session->SendPacket(packet);
            }
        }
    }
} 

namespace MaNGOS
{

    void MaNGOS::WorldWorldTextBuilder::operator()(WorldPacketList& data_list, int32 loc_idx)
    {
        char const* text = sObjectMgr.GetMangosString(i_textId, loc_idx);

        if (i_args)
        {
            // we need copy va_list before use or original va_list will corrupted
            va_list ap;
            va_copy(ap, *i_args);

            char str[2048];
            vsnprintf(str, 2048, text, ap);
            va_end(ap);

            do_helper(data_list, &str[0]);
        }
        else
            do_helper(data_list, (char*)text);
    }

    void MaNGOS::WorldWorldTextBuilder::do_helper(WorldPacketList& data_list, char* text)
    {
        char* pos = text;

        while (char* line = lineFromMessage(pos))
        {
            WorldPacket* data = new WorldPacket();
            ChatHandler::BuildChatPacket(*data, CHAT_MSG_SYSTEM, line);
            data_list.push_back(data);
        }
    }
}

/// Send a System Message to all players (except self if mentioned)
void World::SendWorldText(int32 string_id, ...)
{
    va_list ap;
    va_start(ap, string_id);

    MaNGOS::WorldWorldTextBuilder wt_builder(string_id, &ap);
    LocalizedPacketListDo<MaNGOS::WorldWorldTextBuilder> wt_do(wt_builder);
    for (const auto& itr : m_sessions)
    {
        if (WorldSession* session = itr.second)
        {
            Player* player = session->GetPlayer();
            if (player && player->IsInWorld())
                wt_do(player);
        }
    }

    va_end(ap);
}

void World::SendGMTicketText(const char* text)
{
    for (const auto& itr : m_sessions)
    {
        if (WorldSession* session = itr.second)
        {
            if (session->GetSecurity() > SEC_PLAYER)
            {
                Player* player = session->GetPlayer();
                if (player && player->IsInWorld() && player->IsAcceptTickets())
                    ChatHandler(player).SendSysMessage(text);
            }
        }
    }
}

void World::SendGMTicketText(int32 string_id, ...)
{
    va_list ap;
    va_start(ap, string_id);

    MaNGOS::WorldWorldTextBuilder wt_builder(string_id, &ap);
    LocalizedPacketListDo<MaNGOS::WorldWorldTextBuilder> wt_do(wt_builder);
    for (const auto& itr : m_sessions)
    {
        if (WorldSession* session = itr.second)
        {
            if (session->GetSecurity() > SEC_PLAYER)
            {
                Player* player = session->GetPlayer();
                if (player && player->IsInWorld() && player->IsAcceptTickets())
                {
                    wt_do(player);
                }
            }
        }
    }
}

void World::SendGMTextFlags(uint32 accountFlags, int32 string_id, ...)
{
    va_list ap;
    va_start(ap, string_id);

    MaNGOS::WorldWorldTextBuilder wt_builder(string_id, &ap);
    LocalizedPacketListDo<MaNGOS::WorldWorldTextBuilder> wt_do(wt_builder);
    for (SessionMap::iterator itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
    {
        if (!itr->second ||
            !itr->second->GetPlayer() ||
            !itr->second->GetPlayer()->IsInWorld() ||
            itr->second->GetSecurity() == SEC_PLAYER ||
            !(itr->second->GetAccountFlags() & accountFlags))
            continue;

        wt_do(itr->second->GetPlayer());
    }

    va_end(ap);
}


void World::SendGMText(int32 string_id, ...)
{
    va_list ap;
    va_start(ap, string_id);

    MaNGOS::WorldWorldTextBuilder wt_builder(string_id, &ap);
    LocalizedPacketListDo<MaNGOS::WorldWorldTextBuilder> wt_do(wt_builder);
    for (const auto& itr : m_sessions)
    {
        if (WorldSession* session = itr.second)
        {
            if (session->GetSecurity() > SEC_PLAYER)
            {
                Player* player = session->GetPlayer();
                if (player && player->IsInWorld())
                {
                    wt_do(player);
                }
            }
        }
    }
}

/// DEPRICATED, only for debug purpose. Send a System Message to all players (except self if mentioned)
void World::SendGlobalText(const char* text, WorldSession *self)
{
    WorldPacket data;

    // need copy to prevent corruption by strtok call in LineFromMessage original string
    char* buf = mangos_strdup(text);
    char* pos = buf;

    while (char* line = ChatHandler::LineFromMessage(pos))
    {
        ChatHandler::BuildChatPacket(data, CHAT_MSG_SYSTEM, line);
        SendGlobalMessage(&data, self);
    }

    delete [] buf;
}

/// Send a packet to all players (or players selected team) in the zone (except self if mentioned)
void World::SendZoneMessage(uint32 zone, WorldPacket *packet, WorldSession *self, uint32 team)
{
    for (const auto& itr : m_sessions)
    {
        if (WorldSession* session = itr.second)
        {
            if (session != self)
            {
                Player* player = session->GetPlayer();
                if (player && player->IsInWorld() &&
                   (player->GetZoneId() == zone) &&
                   (team == TEAM_NONE || player->GetTeam() == team))
                {
                    session->SendPacket(packet);
                }
            }
        }
    }
}

/// Send a System Message to all players in the zone (except self if mentioned)
void World::SendZoneText(uint32 zone, const char* text, WorldSession *self, uint32 team)
{
    WorldPacket data;
    ChatHandler::BuildChatPacket(data, CHAT_MSG_SYSTEM, text);
    SendZoneMessage(zone, &data, self, team);
}

/// Kick (and save) all players
void World::KickAll()
{
    m_QueuedSessions.clear();                               // prevent send queue update packet and login queued sessions

    // session not removed at kick and will removed in next update tick
    for (const auto& itr : m_sessions)
        itr.second->KickPlayer();
    for (const auto& itr : m_disconnectedSessions)
        (*itr).KickPlayer();
}

/// Kick (and save) all players with security level less `sec`
void World::KickAllLess(AccountTypes sec)
{
    // session not removed at kick and will removed in next update tick
    for (const auto& itr : m_sessions)
        if (WorldSession* session = itr.second)
            if (session->GetSecurity() < sec)
                session->KickPlayer();
}

void World::WarnAccount(uint32 accountId, std::string from, std::string reason, const char* type)
{
    LoginDatabase.escape_string(from);
    reason = std::string(type) + ": " + reason;
    LoginDatabase.escape_string(reason);

    LoginDatabase.PExecute("INSERT INTO account_banned (id, bandate, unbandate, bannedby, banreason, active, realm) VALUES ('%u', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()+1, '%s', '%s', '0', %u)",
        accountId, from.c_str(), reason.c_str(), realmID);
}

void World::BanAccount(uint32 accountId, uint32 duration, std::string reason, std::string const& author)
{
    LoginDatabase.escape_string(reason);
    std::string safe_author = author;
    LoginDatabase.escape_string(safe_author);

    //No SQL injection as strings are escaped
    LoginDatabase.PExecute("INSERT INTO account_banned (id, bandate, unbandate, bannedby, banreason, active, realm) VALUES ('%u', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()+%u, '%s', '%s', '1', %u)",
        accountId, duration, safe_author.c_str(), reason.c_str(), realmID);

    if (duration > 0)
        sAccountMgr.BanAccount(accountId, time(nullptr) + duration);
    else
        sAccountMgr.BanAccount(accountId, 0xFFFFFFFF);

    if (WorldSession* sess = FindSession(accountId))
    {
        if (std::string(sess->GetPlayerName()) != author)
        {
            sess->LogoutPlayer(true);
            sess->KickPlayer();
        }
    }
}

class BanQueryHolder : public SqlQueryHolder
{
public:
    BanQueryHolder(BanMode mode, std::string banTarget, uint32 duration, std::string reason, uint32 realmId, std::string author, uint32 authorAccountId) :
        m_mode(mode), m_duration(duration), m_reason(reason), m_realmId(realmId), m_author(author), m_banTarget(banTarget), m_accountId(authorAccountId) { }

    BanMode GetBanMode() const { return m_mode; }
    uint32 GetDuration() const { return m_duration; }
    std::string& GetReason() { return m_reason; }
    uint32 GetRealmId() const { return m_realmId; }
    std::string& GetAuthor() { return m_author; }
    std::string& GetBanTarget() { return m_banTarget; }
    uint32 GetAuthorAccountId() const { return m_accountId; }

private:
    BanMode m_mode;
    uint32 m_duration;
    std::string m_reason;
    uint32 m_realmId;
    std::string m_author;
    std::string m_banTarget;
    uint32 m_accountId;
};

// Not thread-safe, performed in async unsafe callback
class BanAccountHandler
{
public:
    void HandleAccountSelectResult(QueryResult*, SqlQueryHolder* queryHolder)
    {
        BanQueryHolder* holder = static_cast<BanQueryHolder*>(queryHolder);
        if (!holder)
            return;

        BanReturn banResult = BAN_SUCCESS;

        WorldSession* session = sWorld.FindSession(holder->GetAuthorAccountId());

        QueryResult* result = holder->GetResult(0);
        if (!result)
        {
            if (session)
                ChatHandler(session).SendBanResult(holder->GetBanMode(), BAN_NOTFOUND, holder->GetBanTarget(), holder->GetDuration(), holder->GetReason());
            delete holder;
            return;
        }

        ///- Disconnect all affected players (for IP it can be several)
        do
        {
            Field* fieldsAccount = result->Fetch();
            uint32 account = fieldsAccount->GetUInt32();

            if (holder->GetBanMode() != BAN_IP)
            {
                //No SQL injection as strings are escaped
                LoginDatabase.PExecute("INSERT INTO account_banned (id, bandate, unbandate, bannedby, banreason, active, realm) VALUES ('%u', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()+%u, '%s', '%s', '1', %u)",
                    account, holder->GetDuration(), holder->GetAuthor().c_str(), holder->GetReason().c_str(), holder->GetRealmId());
                if (holder->GetDuration() > 0)
                    sAccountMgr.BanAccount(account, time(nullptr) + holder->GetDuration());
                else
                    sAccountMgr.BanAccount(account, 0xFFFFFFFF);
            }
            // Don't immediately kick if we're banning ourselves (destroys session, crash)
            if (account != holder->GetAuthorAccountId())
            {
                if (WorldSession* sess = sWorld.FindSession(account))
                {
                    sess->LogoutPlayer(true);
                    sess->KickPlayer();
                }
            }
        } while (result->NextRow());

        banResult = BAN_SUCCESS;

        if (session)
        {
            ChatHandler(session).SendBanResult(holder->GetBanMode(), banResult, holder->GetBanTarget(), holder->GetDuration(), holder->GetReason());
        }

        holder->DeleteAllResults();
        delete holder;
    }
} banHandler;

/// Ban an account or ban an IP address, duration_secs if it is positive used, otherwise permban
BanReturn World::BanAccount(BanMode mode, std::string nameOrIP, uint32 duration_secs, std::string reason, std::string author)
{
    LoginDatabase.escape_string(nameOrIP);
    LoginDatabase.escape_string(reason);
    std::string safe_author = author;
    LoginDatabase.escape_string(safe_author);

    PlayerCacheData* authorData = sObjectMgr.GetPlayerDataByName(author);

    BanQueryHolder* holder = new BanQueryHolder(mode, nameOrIP, duration_secs, reason, realmID, safe_author,
        authorData ? authorData->uiAccount : 0);

    holder->SetSize(1);

    DatabaseType* db = nullptr;
    ///- Update the database with ban information
    switch (mode)
    {
        case BAN_IP:
            //No SQL injection as strings are escaped
            db = &LoginDatabase;

            holder->SetPQuery(0, "SELECT id FROM account WHERE last_ip = '%s'", nameOrIP.c_str());
            LoginDatabase.PExecute("INSERT INTO ip_banned VALUES ('%s',UNIX_TIMESTAMP(),UNIX_TIMESTAMP()+%u,'%s','%s')", nameOrIP.c_str(), duration_secs, safe_author.c_str(), reason.c_str());

            if (duration_secs > 0)
                sAccountMgr.BanIP(nameOrIP, time(nullptr) + duration_secs);
            else
                sAccountMgr.BanIP(nameOrIP, 0xFFFFFFFF);
            break;
        case BAN_ACCOUNT:
            //No SQL injection as string is escaped
            db = &LoginDatabase;
            holder->SetPQuery(0, "SELECT id FROM account WHERE username = '%s'", nameOrIP.c_str());
            break;
        case BAN_CHARACTER:
        {
            db = &CharacterDatabase;
            if (uint32 guid = sObjectMgr.GetPlayerGuidByName(nameOrIP))
                holder->SetPQuery(0, "SELECT account FROM characters WHERE guid = %u", guid);
            break;
        }
        default:
            return BAN_SYNTAX_ERROR;
    }

    db->DelayQueryHolderUnsafe(&banHandler, &BanAccountHandler::HandleAccountSelectResult, holder);

    return BAN_INPROGRESS;
}

/// Remove a ban from an account or IP address
bool World::RemoveBanAccount(BanMode mode, std::string const& source, std::string const& message, std::string nameOrIP)
{
    if (mode == BAN_IP)
    {
        LoginDatabase.escape_string(nameOrIP);
        LoginDatabase.PExecute("DELETE FROM ip_banned WHERE ip = '%s'", nameOrIP.c_str());
        sAccountMgr.UnbanIP(nameOrIP);
    }
    else
    {
        uint32 account = 0;
        if (mode == BAN_ACCOUNT)
            account = sAccountMgr.GetId(nameOrIP);
        else if (mode == BAN_CHARACTER)
            account = sObjectMgr.GetPlayerAccountIdByPlayerName(nameOrIP);

        if (!account)
            return false;

        //NO SQL injection as account is uint32
        LoginDatabase.PExecute("UPDATE account_banned SET active = '0' WHERE id = '%u'", account);
        sAccountMgr.UnbanAccount(account);
    }
    return true;
}

/// Update the game time
void World::_UpdateGameTime()
{
    ///- update the time
    time_t thisTime = time(nullptr);
    uint32 elapsed = uint32(thisTime - m_gameTime);
    m_gameTime = thisTime;
    m_gameDay = (m_gameTime + m_timeZoneOffset) / DAY;

    ///- if there is a shutdown timer
    if (!m_stopEvent && m_ShutdownTimer > 0 && elapsed > 0)
    {
        ///- ... and it is overdue, stop the world (set m_stopEvent)
        if (m_ShutdownTimer <= elapsed)
        {
            if (!(m_ShutdownMask & SHUTDOWN_MASK_IDLE) || GetActiveAndQueuedSessionCount() == 0)
                m_stopEvent = true;                         // exist code already set
            else
                m_ShutdownTimer = 1;                        // minimum timer value to wait idle state
        }
        ///- ... else decrease it and if necessary display a shutdown countdown to the users
        else
        {
            m_ShutdownTimer -= elapsed;

            ShutdownMsg();
        }
    }
}

/// Shutdown the server
void World::ShutdownServ(uint32 time, uint32 options, uint8 exitcode)
{
    // ignore if server shutdown at next tick
    if (m_stopEvent)
        return;

    m_ShutdownMask = options;
    m_ExitCode = exitcode;

    ///- If the shutdown time is 0, set m_stopEvent (except if shutdown is 'idle' with remaining sessions)
    if (time == 0)
    {
        if (!(options & SHUTDOWN_MASK_IDLE) || GetActiveAndQueuedSessionCount() == 0)
            m_stopEvent = true;                             // exist code already set
        else
            m_ShutdownTimer = 1;                            //So that the session count is re-evaluated at next world tick
    }
    ///- Else set the shutdown timer and warn users
    else
    {
        m_ShutdownTimer = time;
        ShutdownMsg(true);
    }
}

/// Display a shutdown message to the user(s)
void World::ShutdownMsg(bool show, Player* player)
{
    // not show messages for idle shutdown mode
    if (m_ShutdownMask & SHUTDOWN_MASK_IDLE)
        return;

    ///- Display a message every 12 hours, hours, 5 minutes, minute, 5 seconds and finally seconds
    if (show ||
            (m_ShutdownTimer < 10) ||
            // < 30 sec; every 5 sec
            (m_ShutdownTimer < 30        && (m_ShutdownTimer % 5) == 0) ||
            // < 5 min ; every 1 min
            (m_ShutdownTimer < 5 * MINUTE  && (m_ShutdownTimer % MINUTE) == 0) ||
            // < 30 min ; every 5 min
            (m_ShutdownTimer < 30 * MINUTE && (m_ShutdownTimer % (5 * MINUTE)) == 0) ||
            // < 12 h ; every 1 h
            (m_ShutdownTimer < 12 * HOUR   && (m_ShutdownTimer % HOUR) == 0) ||
            // > 12 h ; every 12 h
            (m_ShutdownTimer > 12 * HOUR   && (m_ShutdownTimer % (12 * HOUR)) == 0))
    {
        std::string str = secsToTimeString(m_ShutdownTimer);

        ServerMessageType msgid = (m_ShutdownMask & SHUTDOWN_MASK_RESTART) ? SERVER_MSG_RESTART_TIME : SERVER_MSG_SHUTDOWN_TIME;

        SendServerMessage(msgid, str.c_str(), player);
        DEBUG_LOG("Server is %s in %s", (m_ShutdownMask & SHUTDOWN_MASK_RESTART ? "restart" : "shutting down"), str.c_str());
    }
}

/// Cancel a planned server shutdown
void World::ShutdownCancel()
{
    // nothing cancel or too later
    if (!m_ShutdownTimer || m_stopEvent)
        return;

    ServerMessageType msgid = (m_ShutdownMask & SHUTDOWN_MASK_RESTART) ? SERVER_MSG_RESTART_CANCELLED : SERVER_MSG_SHUTDOWN_CANCELLED;

    m_ShutdownMask = 0;
    m_ShutdownTimer = 0;
    m_ExitCode = SHUTDOWN_EXIT_CODE;                       // to default value
    SendServerMessage(msgid);

    DEBUG_LOG("Server %s cancelled.", (m_ShutdownMask & SHUTDOWN_MASK_RESTART ? "restart" : "shutdown"));
}

/// Send a server message to the user(s)
void World::SendServerMessage(ServerMessageType type, const char *text, Player* player)
{
    WorldPacket data(SMSG_SERVER_MESSAGE, 50);              // guess size
    data << uint32(type);
    data << text;

    if (player)
        player->GetSession()->SendPacket(&data);
    else
        SendGlobalMessage(&data);
}

void World::UpdateSessions(uint32 diff)
{
    ///- Update player limit if needed
    int32 hardPlayerLimit = getConfig(CONFIG_UINT32_PLAYER_HARD_LIMIT);
    if (hardPlayerLimit)
        m_playerLimit = std::min(hardPlayerLimit, m_playerLimit);
    uint32 loggedInSessions = uint32(m_sessions.size() - m_QueuedSessions.size());
    if (m_playerLimit >= 0 && static_cast <int32> (loggedInSessions) < hardPlayerLimit)
        if (uint32 acceptNow = getConfig(CONFIG_UINT32_LOGIN_PER_TICK))
        {
            m_playerLimit = std::min(m_playerLimit + acceptNow, loggedInSessions + acceptNow);
            if (hardPlayerLimit && m_playerLimit > hardPlayerLimit)
            {
                m_playerLimit = hardPlayerLimit;
                acceptNow = 0;
            }
            for (uint32 i = 0; i < acceptNow && !m_QueuedSessions.empty(); ++i)
            {
                // accept first in queue
                WorldSession* pop_sess = m_QueuedSessions.front();
                pop_sess->SetInQueue(false);
                pop_sess->m_idleTime = WorldTimer::getMSTime();
                pop_sess->SendAuthWaitQue(0);
                m_QueuedSessions.pop_front();
            }

            // update position from iter to end()
            // iter point to first not updated socket, position store new position
            int position = 1;
            for (Queue::iterator iter = m_QueuedSessions.begin(); iter != m_QueuedSessions.end(); ++iter, ++position)
                (*iter)->SendAuthWaitQue(position);
        }

    ///- Add new sessions
    WorldSession* sess;
    while (addSessQueue.next(sess))
        AddSession_(sess);

    ///- Then send an update signal to remaining ones
    time_t time_now = time(nullptr);
    for (SessionMap::iterator itr = m_sessions.begin(), next; itr != m_sessions.end(); itr = next)
    {
        next = itr;
        ++next;
        ///- and remove not active sessions from the list
        WorldSession * pSession = itr->second;
        WorldSessionFilter updater(pSession);

        if (!pSession->Update(updater))
        {
            if (pSession->PlayerLoading())
                sLog.outInfo("[CRASH] World::UpdateSession attempt to delete session %u loading a player.", pSession->GetAccountId());
            if (!RemoveQueuedSession(pSession))
                m_accountsLastLogout[pSession->GetAccountId()] = time_now;
            m_sessions.erase(itr);
            delete pSession;
        }
    }
    ///- Update disconnected sessions
    for (SessionSet::iterator itr = m_disconnectedSessions.begin(), next; itr != m_disconnectedSessions.end(); itr = next)
    {
        next = itr;
        ++next;
        WorldSession * pSession = *itr;

        if (!pSession->UpdateDisconnected(diff))
        {
            delete pSession;
            m_disconnectedSessions.erase(itr);
        }
    }
}

// This handles the issued and queued CLI/RA commands
void World::ProcessCliCommands()
{
    CliCommandHolder* command;
    while (cliCmdQueue.next(command))
    {
        DEBUG_LOG("CLI command under processing...");
        CliCommandHolder::Print* zprint = command->m_print;
        std::any callbackArg = command->m_callbackArg;
        CliHandler handler(command->m_cliAccountId, command->m_cliAccessLevel, callbackArg, zprint);
        handler.ParseCommands(command->m_command);

        if (command->m_commandFinished)
            command->m_commandFinished(callbackArg, !handler.HasSentErrorMessage());

        delete command;
    }
}

void World::InitResultQueue()
{
}

void World::UpdateResultQueue()
{
    //process async result queues
    CharacterDatabase.ProcessResultQueue(getConfig(CONFIG_UINT32_ASYNC_QUERIES_TICK_TIMEOUT));
    WorldDatabase.ProcessResultQueue(getConfig(CONFIG_UINT32_ASYNC_QUERIES_TICK_TIMEOUT));
    LoginDatabase.ProcessResultQueue(getConfig(CONFIG_UINT32_ASYNC_QUERIES_TICK_TIMEOUT));
}

void World::UpdateRealmCharCount(uint32 accountId)
{
    CharacterDatabase.AsyncPQuery(this, &World::_UpdateRealmCharCount, accountId,
                                  "SELECT COUNT(guid) FROM characters WHERE account = '%u'", accountId);
}

void World::_UpdateRealmCharCount(QueryResult *resultCharCount, uint32 accountId)
{
    if (resultCharCount)
    {
        Field *fields = resultCharCount->Fetch();
        uint32 charCount = fields[0].GetUInt32();
        delete resultCharCount;

        LoginDatabase.BeginTransaction();
        LoginDatabase.PExecute("DELETE FROM realmcharacters WHERE acctid= '%u' AND realmid = '%u'", accountId, realmID);
        LoginDatabase.PExecute("INSERT INTO realmcharacters (numchars, acctid, realmid) VALUES (%u, %u, %u)", charCount, accountId, realmID);
        LoginDatabase.CommitTransaction();
    }
}

void World::LoadAccountData()
{
    uint32 days = getConfig(CONFIG_UINT32_ACCOUNT_DATA_LAST_LOGIN_DAYS);
    if (!days)
        return;

    std::unique_ptr<QueryResult> result{ LoginDatabase.PQuery("SELECT id, username, email FROM account WHERE last_login >= NOW() - INTERVAL %u DAY", days) };

    uint32 count = 0;

    if (!result)
        return;

    do {
        auto fields = result->Fetch();

        uint32 id = fields[0].GetUInt32();
        auto accountData = GetAccountData(id);
        accountData->id = id;
        accountData->username = fields[1].GetCppString();
        accountData->email = fields[2].GetCppString();
        ++count;
    } while (result->NextRow());

    sLog.outString("Loaded %u cached accounts.", count);
}

std::unordered_set<std::string> World::GetAccountNamesByFingerprint(uint32 fingerprint) const
{
    const auto itr = m_fingerprintAccounts.find(fingerprint);
    if (itr == m_fingerprintAccounts.end())
        return {};
    return itr->second;
}


void World::AddFingerprint(uint32 fingerprint, std::string accountName)
{
    m_fingerprintAccounts[fingerprint].insert(accountName);
}

void World::SetPlayerLimit(int32 limit, bool needUpdate)
{
    if (limit < -SEC_ADMINISTRATOR)
        limit = -SEC_ADMINISTRATOR;

    // lock update need
    bool db_update_need = needUpdate || (limit < 0) != (m_playerLimit < 0) || (limit < 0 && m_playerLimit < 0 && limit != m_playerLimit);

    m_playerLimit = limit;

    if (db_update_need)
        LoginDatabase.PExecute("UPDATE realmlist SET allowedSecurityLevel = '%u' WHERE id = '%u'",
                               uint32(GetPlayerSecurityLimit()), realmID);
}

void World::UpdateMaxSessionCounters()
{
    m_maxActiveSessionCount = std::max(m_maxActiveSessionCount, uint32(m_sessions.size() - m_QueuedSessions.size()));
    m_maxQueuedSessionCount = std::max(m_maxQueuedSessionCount, uint32(m_QueuedSessions.size()));
}

void World::setConfig(eConfigUInt32Values index, char const* fieldname, uint32 defvalue)
{
    setConfig(index, sConfig.GetIntDefault(fieldname, defvalue));
}

void World::setConfig(eConfigInt32Values index, char const* fieldname, int32 defvalue)
{
    setConfig(index, sConfig.GetIntDefault(fieldname, defvalue));
}

void World::setConfig(eConfigFloatValues index, char const* fieldname, float defvalue)
{
    setConfig(index, sConfig.GetFloatDefault(fieldname, defvalue));
}

void World::setConfig(eConfigBoolValues index, char const* fieldname, bool defvalue)
{
    setConfig(index, sConfig.GetBoolDefault(fieldname, defvalue));
}

void World::setConfigPos(eConfigUInt32Values index, char const* fieldname, uint32 defvalue)
{
    setConfig(index, fieldname, defvalue);
    if (int32(getConfig(index)) < 0)
    {
        sLog.outError("%s (%i) can't be negative. Using %u instead.", fieldname, int32(getConfig(index)), defvalue);
        setConfig(index, defvalue);
    }
}

void World::setConfigPos(eConfigFloatValues index, char const* fieldname, float defvalue)
{
    setConfig(index, fieldname, defvalue);
    if (getConfig(index) < 0.0f)
    {
        sLog.outError("%s (%f) can't be negative. Using %f instead.", fieldname, getConfig(index), defvalue);
        setConfig(index, defvalue);
    }
}

void World::setConfigMin(eConfigUInt32Values index, char const* fieldname, uint32 defvalue, uint32 minvalue)
{
    setConfig(index, fieldname, defvalue);
    if (getConfig(index) < minvalue)
    {
        sLog.outError("%s (%u) must be >= %u. Using %u instead.", fieldname, getConfig(index), minvalue, minvalue);
        setConfig(index, minvalue);
    }
}

void World::setConfigMin(eConfigInt32Values index, char const* fieldname, int32 defvalue, int32 minvalue)
{
    setConfig(index, fieldname, defvalue);
    if (getConfig(index) < minvalue)
    {
        sLog.outError("%s (%i) must be >= %i. Using %i instead.", fieldname, getConfig(index), minvalue, minvalue);
        setConfig(index, minvalue);
    }
}

void World::setConfigMin(eConfigFloatValues index, char const* fieldname, float defvalue, float minvalue)
{
    setConfig(index, fieldname, defvalue);
    if (getConfig(index) < minvalue)
    {
        sLog.outError("%s (%f) must be >= %f. Using %f instead.", fieldname, getConfig(index), minvalue, minvalue);
        setConfig(index, minvalue);
    }
}

void World::setConfigMinMax(eConfigUInt32Values index, char const* fieldname, uint32 defvalue, uint32 minvalue, uint32 maxvalue)
{
    setConfig(index, fieldname, defvalue);
    if (getConfig(index) < minvalue)
    {
        sLog.outError("%s (%u) must be in range %u...%u. Using %u instead.", fieldname, getConfig(index), minvalue, maxvalue, minvalue);
        setConfig(index, minvalue);
    }
    else if (getConfig(index) > maxvalue)
    {
        sLog.outError("%s (%u) must be in range %u...%u. Using %u instead.", fieldname, getConfig(index), minvalue, maxvalue, maxvalue);
        setConfig(index, maxvalue);
    }
}

void World::setConfigMinMax(eConfigInt32Values index, char const* fieldname, int32 defvalue, int32 minvalue, int32 maxvalue)
{
    setConfig(index, fieldname, defvalue);
    if (getConfig(index) < minvalue)
    {
        sLog.outError("%s (%i) must be in range %i...%i. Using %i instead.", fieldname, getConfig(index), minvalue, maxvalue, minvalue);
        setConfig(index, minvalue);
    }
    else if (getConfig(index) > maxvalue)
    {
        sLog.outError("%s (%i) must be in range %i...%i. Using %i instead.", fieldname, getConfig(index), minvalue, maxvalue, maxvalue);
        setConfig(index, maxvalue);
    }
}

void World::setConfigMinMax(eConfigFloatValues index, char const* fieldname, float defvalue, float minvalue, float maxvalue)
{
    setConfig(index, fieldname, defvalue);
    if (getConfig(index) < minvalue)
    {
        sLog.outError("%s (%f) must be in range %f...%f. Using %f instead.", fieldname, getConfig(index), minvalue, maxvalue, minvalue);
        setConfig(index, minvalue);
    }
    else if (getConfig(index) > maxvalue)
    {
        sLog.outError("%s (%f) must be in range %f...%f. Using %f instead.", fieldname, getConfig(index), minvalue, maxvalue, maxvalue);
        setConfig(index, maxvalue);
    }
}

bool World::configNoReload(bool reload, eConfigUInt32Values index, char const* fieldname, uint32 defvalue)
{
    if (!reload)
        return true;

    uint32 val = sConfig.GetIntDefault(fieldname, defvalue);
    if (val != getConfig(index))
        sLog.outError("%s option can't be changed at mangosd.conf reload, using current value (%u).", fieldname, getConfig(index));

    return false;
}

bool World::configNoReload(bool reload, eConfigInt32Values index, char const* fieldname, int32 defvalue)
{
    if (!reload)
        return true;

    int32 val = sConfig.GetIntDefault(fieldname, defvalue);
    if (val != getConfig(index))
        sLog.outError("%s option can't be changed at mangosd.conf reload, using current value (%i).", fieldname, getConfig(index));

    return false;
}

bool World::configNoReload(bool reload, eConfigFloatValues index, char const* fieldname, float defvalue)
{
    if (!reload)
        return true;

    float val = sConfig.GetFloatDefault(fieldname, defvalue);
    if (val != getConfig(index))
        sLog.outError("%s option can't be changed at mangosd.conf reload, using current value (%f).", fieldname, getConfig(index));

    return false;
}

bool World::configNoReload(bool reload, eConfigBoolValues index, char const* fieldname, bool defvalue)
{
    if (!reload)
        return true;

    bool val = sConfig.GetBoolDefault(fieldname, defvalue);
    if (val != getConfig(index))
        sLog.outError("%s option can't be changed at mangosd.conf reload, using current value (%s).", fieldname, getConfig(index) ? "'true'" : "'false'");

    return false;
}

void World::InvalidatePlayerDataToAllClients(ObjectGuid guid)
{
    WorldPacket data(SMSG_INVALIDATE_PLAYER, 8);
    data << guid;
    SendGlobalMessage(&data);
}

void World::SendCreatureStatsInvalidate(uint32 entry, WorldSession* self)
{
    WorldPacket data(SMSG_CREATURE_QUERY_RESPONSE, 4);
    data << uint32(entry | 0x80000000);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendGameObjectStatsInvalidate(uint32 entry, WorldSession* self)
{
    WorldPacket data(SMSG_GAMEOBJECT_QUERY_RESPONSE, 4);
    data << uint32(entry | 0x80000000);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendGuildStatsInvalidate(uint32 guildId, WorldSession* self)
{
    WorldPacket data(SMSG_GUILD_QUERY_RESPONSE, 35);
    data << uint32(guildId);
    data << uint8(0);

    for (size_t i = 0; i < GUILD_RANKS_MAX_COUNT; ++i)
            data << uint8(0);

    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendQuestStatsInvalidate(uint32 questId, WorldSession* self)
{
    WorldPacket data(SMSG_QUEST_QUERY_RESPONSE, 100);       // guess size

    data << uint32(questId);                                // quest id
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);

    for (int i = 0; i < 4; ++i)
        data << uint32(0) << uint32(0);

    for (int i = 0; i < 6; ++i)
        data << uint32(0) << uint32(0);

    data << uint32(0);
    data << float(0.0f);
    data << float(0.0f);
    data << uint32(0);

    data << uint8(0);
    data << uint8(0);
    data << uint8(0);
    data << uint8(0);

    for (int i = 0; i < 4; ++i)
        data << uint32(0) << uint32(0) << uint32(0) << uint32(0);

    for (int i = 0; i < 4; ++i)
        data << uint8(0);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendNpcTextInvalidate(uint32 textId, WorldSession* self)
{
    WorldPacket data(SMSG_NPC_TEXT_UPDATE, 4);
    data << uint32(textId | 0x80000000);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendPlayerNameInvalidate(ObjectGuid guid, WorldSession* self)
{
    WorldPacket data(SMSG_NAME_QUERY_RESPONSE, 22);
    data << guid;
    data << uint8(0);
    data << uint8(0);

    data << uint32(0);
    data << uint32(0);
    data << uint32(0);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendPetNameInvalidate(uint32 petNumber, WorldSession* self)
{
    WorldPacket data(SMSG_PET_NAME_QUERY_RESPONSE, 9);
    data << uint32(petNumber);
    data << uint8(0);
    data << uint32(0);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendPageTextInvalidate(uint32 pageId, WorldSession* self)
{
    WorldPacket data(SMSG_PAGE_TEXT_QUERY_RESPONSE, 9);
    data << uint32(pageId | 0x80000000);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendPetitionInvalidate(uint32 petitionId, WorldSession* self)
{
    WorldPacket data(SMSG_PETITION_QUERY_RESPONSE, 64);
    petitionId *= -1;
    data << petitionId;                           // petition guid
    data << uint64(0);
    data << uint8(0);
    data << uint8(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint16(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);
    data << uint32(0);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendSingleItemInvalidate(uint32 entry, WorldSession* self)
{
    WorldPacket data(SMSG_ITEM_QUERY_SINGLE_RESPONSE, 4);
    data << uint32(entry | 0x80000000);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendMultipleItemsInvalidate(const std::vector<uint32>& items, WorldSession* self)
{
    WorldPacket data(SMSG_ITEM_QUERY_MULTIPLE_RESPONSE, 1 + 4 * items.size());
    data << uint8(items.size());
    for (const auto& entry : items)
        data << uint32(entry | 0x80000000);

    if (self)
        self->SendPacket(&data);
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
                itr->second->SendPacket(&data);
        }
    }
}

void World::SendUpdateCreatureStats(const CreatureInfo& crInfo, WorldSession* self)
{
    WorldPacket data(SMSG_CREATURE_QUERY_RESPONSE, 100);
    data << crInfo.entry;
    size_t NamePos = data.wpos();
    data << crInfo.name;
    data << uint8(0) << uint8(0) << uint8(0);
    size_t SubNamePos = data.wpos();
    data << crInfo.subname;
    data << crInfo.type_flags;
    data << crInfo.type;
    data << crInfo.beast_family;
    data << crInfo.rank;
    data << uint32(0);
    data << crInfo.pet_spell_list_id;
    data << crInfo.display_id;
    data << crInfo.civilian;
    data << crInfo.racial_leader;

    if (self)
    {
        int loc_idx = self->GetSessionDbLocaleIndex();
        if (loc_idx >= 0)
        {
            CreatureLocale const* cl = sObjectMgr.GetCreatureLocale(crInfo.entry);
            if (cl)
            {
                if (cl->Name.size() > size_t(loc_idx) && !cl->Name[loc_idx].empty())
                    data.put<std::string>(NamePos, cl->Name[loc_idx]);
                if (cl->SubName.size() > size_t(loc_idx) && !cl->SubName[loc_idx].empty())
                    data.put<std::string>(SubNamePos, cl->SubName[loc_idx]);
            }
        }

        self->SendPacket(&data);
    }
    else
    {
        SessionMap::const_iterator itr;
        for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
        {
            if (itr->second)
            {
                int loc_idx = itr->second->GetSessionDbLocaleIndex();
                if (loc_idx >= 0)
                {
                    CreatureLocale const* cl = sObjectMgr.GetCreatureLocale(crInfo.entry);
                    if (cl)
                    {
                        if (cl->Name.size() > size_t(loc_idx) && !cl->Name[loc_idx].empty())
                            data.put<std::string>(NamePos, cl->Name[loc_idx]);
                        if (cl->SubName.size() > size_t(loc_idx) && !cl->SubName[loc_idx].empty())
                            data.put<std::string>(SubNamePos, cl->SubName[loc_idx]);
                    }
                }

                itr->second->SendPacket(&data);
            }
        }
    }
}

void World::SendUpdateSingleItem(uint32 entry, WorldSession* self)
{
    // While only for transmogrification
    ItemPrototype const* pProto = ObjectMgr::GetItemPrototype(entry);
    if (pProto)
    {
        WorldPacket data(SMSG_ITEM_QUERY_SINGLE_RESPONSE, 600);
        data << pProto->ItemId;
        data << pProto->Class;
        // client known only 0 subclass (and 1-2 obsolute subclasses)
        data << (pProto->Class == ITEM_CLASS_CONSUMABLE ? uint32(0) : pProto->SubClass);
        size_t NamePos = data.wpos();
        data << pProto->Name1;                              // max length of any of 4 names: 256 bytes
        data << uint8(0x00);                                //pProto->Name2; // blizz not send name there, just uint8(0x00); <-- \0 = empty string = empty name...
        data << uint8(0x00);                                //pProto->Name3; // blizz not send name there, just uint8(0x00);
        data << uint8(0x00);                                //pProto->Name4; // blizz not send name there, just uint8(0x00);
        data << pProto->DisplayInfoID;
        data << pProto->Quality;
        data << pProto->Flags;
        data << pProto->BuyPrice;
        data << pProto->SellPrice;
        data << pProto->InventoryType;
        data << pProto->AllowableClass;
        data << pProto->AllowableRace;
        data << pProto->ItemLevel;
        data << pProto->RequiredLevel;
        data << pProto->RequiredSkill;
        data << pProto->RequiredSkillRank;
        data << pProto->RequiredSpell;
        // Item de style insigne
        if (pProto->Spells[0].SpellId != 0)
            data << uint32(0);
        else
            data << pProto->RequiredHonorRank;

        data << pProto->RequiredCityRank;
        data << pProto->RequiredReputationFaction;
        data << (pProto->RequiredReputationFaction > 0 ? pProto->RequiredReputationRank : 0);   // send value only if reputation faction id setted ( needed for some items)
        data << pProto->MaxCount;
        data << pProto->Stackable;
        data << pProto->ContainerSlots;
        for (int i = 0; i < MAX_ITEM_PROTO_STATS; ++i)
        {
            data << pProto->ItemStat[i].ItemStatType;
            data << pProto->ItemStat[i].ItemStatValue;
        }
        for (int i = 0; i < MAX_ITEM_PROTO_DAMAGES; ++i)
        {
            data << pProto->Damage[i].DamageMin;
            data << pProto->Damage[i].DamageMax;
            data << pProto->Damage[i].DamageType;
        }

        // resistances (7)
        data << pProto->Armor;
        data << pProto->HolyRes;
        data << pProto->FireRes;
        data << pProto->NatureRes;
        data << pProto->FrostRes;
        data << pProto->ShadowRes;
        data << pProto->ArcaneRes;

        data << pProto->Delay;
        data << pProto->AmmoType;
        data << (float)pProto->RangedModRange;

        for (int s = 0; s < MAX_ITEM_PROTO_SPELLS; ++s)
        {
            // send DBC data for cooldowns in same way as it used in Spell::SendSpellCooldown
            // use `item_template` or if not set then only use spell cooldowns
            SpellEntry const* spell = sSpellMgr.GetSpellEntry(pProto->Spells[s].SpellId);
            if (spell)
            {
                bool db_data = pProto->Spells[s].SpellCooldown >= 0 || pProto->Spells[s].SpellCategoryCooldown >= 0;

                data << pProto->Spells[s].SpellId;
                data << pProto->Spells[s].SpellTrigger;

                // let the database control the sign here.  negative means that the item should be consumed once the charges are consumed.
                data << pProto->Spells[s].SpellCharges;

                if (db_data)
                {
                    data << uint32(pProto->Spells[s].SpellCooldown);
                    data << uint32(pProto->Spells[s].SpellCategory);
                    data << uint32(pProto->Spells[s].SpellCategoryCooldown);
                }
                else
                {
                    data << uint32(spell->RecoveryTime);
                    data << uint32(spell->Category);
                    data << uint32(spell->CategoryRecoveryTime);
                }
            }
            else
            {
                data << uint32(0);
                data << uint32(0);
                data << uint32(0);
                data << uint32(-1);
                data << uint32(0);
                data << uint32(-1);
            }
        }
        data << pProto->Bonding;
        size_t DescPos = data.wpos();
        data << pProto->Description;
        data << pProto->PageText;
        data << pProto->LanguageID;
        data << pProto->PageMaterial;
        data << pProto->StartQuest;
        data << pProto->LockID;
        data << pProto->Material;
        data << pProto->Sheath;
        data << pProto->RandomProperty;
        data << pProto->Block;
        data << pProto->ItemSet;
        data << pProto->MaxDurability;
        data << pProto->Area;
        data << pProto->Map;                                // Added in 1.12.x & 2.0.1 client branch
        data << pProto->BagFamily;

        if (self)
        {
            int loc_idx = self->GetSessionDbLocaleIndex();
            if (loc_idx >= 0)
            {
                ItemLocale const* il = sObjectMgr.GetItemLocale(pProto->DestItemId);
                if (il)
                {
                    if (il->Name.size() > size_t(loc_idx) && !il->Name[loc_idx].empty())
                        data.put<std::string>(NamePos, il->Name[loc_idx]);
                    if (il->Description.size() > size_t(loc_idx) && !il->Description[loc_idx].empty())
                        data.put<std::string>(DescPos, il->Description[loc_idx]);
                }
            }

            self->SendPacket(&data);
        }
        else
        {
            SessionMap::const_iterator itr;
            for (itr = m_sessions.begin(); itr != m_sessions.end(); ++itr)
            {
                if (itr->second)
                {
                    int loc_idx = itr->second->GetSessionDbLocaleIndex();
                    if (loc_idx >= 0)
                    {
                        ItemLocale const* il = sObjectMgr.GetItemLocale(pProto->DestItemId);
                        if (il)
                        {
                            if (il->Name.size() > size_t(loc_idx) && !il->Name[loc_idx].empty())
                                data.put<std::string>(NamePos, il->Name[loc_idx]);
                            if (il->Description.size() > size_t(loc_idx) && !il->Description[loc_idx].empty())
                                data.put<std::string>(DescPos, il->Description[loc_idx]);
                        }
                    }

                    itr->second->SendPacket(&data);
                }
            }
        }
    }
}

void World::SendUpdateMultipleItems(const std::vector<uint32>& items, WorldSession* self)
{
    // While only for transmogrification
    WorldPacket data(SMSG_ITEM_QUERY_MULTIPLE_RESPONSE, 600*items.size());
    data << uint8(items.size());
    for (const auto& entry : items)
    {
        if (ItemPrototype const* pProto = ObjectMgr::GetItemPrototype(entry))
        {
            data << pProto->ItemId;
            data << pProto->Class;
            // client known only 0 subclass (and 1-2 obsolute subclasses)
            data << (pProto->Class == ITEM_CLASS_CONSUMABLE ? uint32(0) : pProto->SubClass);
            size_t NamePos = data.wpos();
            data << pProto->Name1;                              // max length of any of 4 names: 256 bytes
            data << uint8(0x00);                                //pProto->Name2; // blizz not send name there, just uint8(0x00); <-- \0 = empty string = empty name...
            data << uint8(0x00);                                //pProto->Name3; // blizz not send name there, just uint8(0x00);
            data << uint8(0x00);                                //pProto->Name4; // blizz not send name there, just uint8(0x00);
            data << pProto->DisplayInfoID;
            data << pProto->Quality;
            data << pProto->Flags;
            data << pProto->BuyPrice;
            data << pProto->SellPrice;
            data << pProto->InventoryType;
            data << pProto->AllowableClass;
            data << pProto->AllowableRace;
            data << pProto->ItemLevel;
            data << pProto->RequiredLevel;
            data << pProto->RequiredSkill;
            data << pProto->RequiredSkillRank;
            data << pProto->RequiredSpell;
            // Item de style insigne
            if (pProto->Spells[0].SpellId != 0)
                data << uint32(0);
            else
                data << pProto->RequiredHonorRank;

            data << pProto->RequiredCityRank;
            data << pProto->RequiredReputationFaction;
            data << (pProto->RequiredReputationFaction > 0 ? pProto->RequiredReputationRank : 0);   // send value only if reputation faction id setted ( needed for some items)
            data << pProto->MaxCount;
            data << pProto->Stackable;
            data << pProto->ContainerSlots;
            for (int i = 0; i < MAX_ITEM_PROTO_STATS; ++i)
            {
                data << pProto->ItemStat[i].ItemStatType;
                data << pProto->ItemStat[i].ItemStatValue;
            }
            for (int i = 0; i < MAX_ITEM_PROTO_DAMAGES; ++i)
            {
                data << pProto->Damage[i].DamageMin;
                data << pProto->Damage[i].DamageMax;
                data << pProto->Damage[i].DamageType;
            }

            // resistances (7)
            data << pProto->Armor;
            data << pProto->HolyRes;
            data << pProto->FireRes;
            data << pProto->NatureRes;
            data << pProto->FrostRes;
            data << pProto->ShadowRes;
            data << pProto->ArcaneRes;

            data << pProto->Delay;
            data << pProto->AmmoType;
            data << (float)pProto->RangedModRange;

            for (int s = 0; s < MAX_ITEM_PROTO_SPELLS; ++s)
            {
                // send DBC data for cooldowns in same way as it used in Spell::SendSpellCooldown
                // use `item_template` or if not set then only use spell cooldowns
                SpellEntry const* spell = sSpellMgr.GetSpellEntry(pProto->Spells[s].SpellId);
                if (spell)
                {
                    bool db_data = pProto->Spells[s].SpellCooldown >= 0 || pProto->Spells[s].SpellCategoryCooldown >= 0;

                    data << pProto->Spells[s].SpellId;
                    data << pProto->Spells[s].SpellTrigger;

                    // let the database control the sign here.  negative means that the item should be consumed once the charges are consumed.
                    data << pProto->Spells[s].SpellCharges;

                    if (db_data)
                    {
                        data << uint32(pProto->Spells[s].SpellCooldown);
                        data << uint32(pProto->Spells[s].SpellCategory);
                        data << uint32(pProto->Spells[s].SpellCategoryCooldown);
                    }
                    else
                    {
                        data << uint32(spell->RecoveryTime);
                        data << uint32(spell->Category);
                        data << uint32(spell->CategoryRecoveryTime);
                    }
                }
                else
                {
                    data << uint32(0);
                    data << uint32(0);
                    data << uint32(0);
                    data << uint32(-1);
                    data << uint32(0);
                    data << uint32(-1);
                }
            }
            data << pProto->Bonding;
            size_t DescPos = data.wpos();
            data << pProto->Description;
            data << pProto->PageText;
            data << pProto->LanguageID;
            data << pProto->PageMaterial;
            data << pProto->StartQuest;
            data << pProto->LockID;
            data << pProto->Material;
            data << pProto->Sheath;
            data << pProto->RandomProperty;
            data << pProto->Block;
            data << pProto->ItemSet;
            data << pProto->MaxDurability;
            data << pProto->Area;
            data << pProto->Map;                                // Added in 1.12.x & 2.0.1 client branch
            data << pProto->BagFamily;

            // TODO: global broadcast?
            if (self)
            {
                int loc_idx = self->GetSessionDbLocaleIndex();
                if (loc_idx >= 0)
                {
                    ItemLocale const* il = sObjectMgr.GetItemLocale(pProto->DestItemId);
                    if (il)
                    {
                        if (il->Name.size() > size_t(loc_idx) && !il->Name[loc_idx].empty())
                            data.put<std::string>(NamePos, il->Name[loc_idx]);
                        if (il->Description.size() > size_t(loc_idx) && !il->Description[loc_idx].empty())
                            data.put<std::string>(DescPos, il->Description[loc_idx]);
                    }
                }
            }
        }
    }

    if (self)
        self->SendPacket(&data);
}

void World::SetSessionDisconnected(WorldSession* sess)
{
    SessionMap::iterator itr = m_sessions.find(sess->GetAccountId());
    ASSERT(itr != m_sessions.end());
    m_accountsLastLogout[sess->GetAccountId()] = time(nullptr);
    m_sessions.erase(itr);
    m_disconnectedSessions.insert(sess);
}

void World::AddAsyncTask(std::function<void()> task)
{
    std::lock_guard<std::mutex> lock(m_asyncTaskQueueMutex);
    _asyncTasks.push_back(task);
}

void World::StopDiscordBot()
{
    if (!m_bot)
        return;

    m_bot->GetCore()->shutdown();
}

bool World::CanSkipQueue(WorldSession const* sess)
{
    if (sess->GetSecurity() > SEC_PLAYER)
        return true;
    uint32 grace_period = getConfig(CONFIG_UINT32_LOGIN_QUEUE_GRACE_PERIOD_SECS);
    if (!grace_period)
        return false;
    auto prev_logout = m_accountsLastLogout.find(sess->GetAccountId());
    if (prev_logout == m_accountsLastLogout.end())
        return false;
    time_t now = time(nullptr);
    return (now - prev_logout->second) < grace_period;
}

uint32 World::InsertLog(std::string const& message, AccountTypes sec)
{
    uint32 key = m_logMessages.size();
    ArchivedLogMessage& s = m_logMessages[key];
    s.msg = message;
    s.sec = sec;
    return key;
}

World::ArchivedLogMessage* World::GetLog(uint32 logId, AccountTypes my_sec)
{
    LogMessagesMap::iterator it = m_logMessages.find(logId);
    if (it == m_logMessages.end() || it->second.sec > my_sec)
        return nullptr;
    return &(it->second);
}

void World::SetWorldUpdateTimer(WorldTimers timer, uint32 current)
{
    if (timer >= WUPDATE_COUNT)
        return;

    m_timers[timer].SetCurrent(current);
}

time_t World::GetWorldUpdateTimer(WorldTimers timer)
{
    if (timer >= WUPDATE_COUNT)
        return 0;

    return m_timers[timer].GetCurrent();
}

time_t World::GetWorldUpdateTimerInterval(WorldTimers timer)
{
    if (timer >= WUPDATE_COUNT)
        return 0;

    return m_timers[timer].GetInterval();
}

void SessionPacketSendTask::operator()()
{
    if (WorldSession* session = sWorld.FindSession(m_accountId))
    {
        session->SendPacket(&m_data);
    }
}

void World::LogChat(WorldSession* sess, const char* type, std::string const& msg, PlayerPointer target, uint32 chanId, const char* chanStr)
{
    ASSERT(sess);
    PlayerPointer plr = sess->GetPlayerPointer();
    ASSERT(plr);

    std::string stringType = type;

    if (sess->GetSecurity() >= SEC_MODERATOR || (target && target->GetSession() && target->GetSession()->GetSecurity() >= SEC_MODERATOR))
    {
        stringType += "|GM";
    }

    std::ostringstream ss;
    ss << plr->GetName() << ":" << sess->GetAccountId();

    if (target)
        sLog.out(LOG_CHAT, "[%s] %s:%u -> %s:%u : %s", stringType.c_str(), ss.str().c_str(), plr->GetObjectGuid().GetCounter(), target->GetName(), target->GetObjectGuid().GetCounter(), msg.c_str());
    else if (chanId)
        sLog.out(LOG_CHAT, "[%s:%u] %s:%u : %s", stringType.c_str(), chanId, ss.str().c_str(), plr->GetObjectGuid().GetCounter(), msg.c_str());
    else if (chanStr)
        sLog.out(LOG_CHAT, "[%s:%s] %s:%u : %s", stringType.c_str(), chanStr, ss.str().c_str(), plr->GetObjectGuid().GetCounter(), msg.c_str());
    else
        sLog.out(LOG_CHAT, "[%s] %s:%u : %s", stringType.c_str(), ss.str().c_str(), plr->GetObjectGuid().GetCounter(), msg.c_str());
}

void MigrationFile::SetAuthor(std::string const& author)
{
    if (!sWorld.getConfig(CONFIG_UINT32_AUTO_COMMIT_MINUTES))
        return;

    if (author != lastAuthor)
    {
        FILE* pFile;
        pFile = fopen(sWorld.GetWorldUpdatesMigration().c_str(), "a");
        if (pFile)
        {
            fprintf(pFile, "\n-- Changes by %s\n", author.c_str());
            fclose(pFile);
        }
        lastAuthor = author;
    }
}

void MigrationFile::AddRow(char const* row)
{
    if (!row)
        return;

    if (!sWorld.getConfig(CONFIG_UINT32_AUTO_COMMIT_MINUTES))
        return;

    FILE* pFile;
    pFile = fopen(sWorld.GetWorldUpdatesMigration().c_str(), "a");
    if (pFile)
    {
        fprintf(pFile, "%s;\n", row);
        fclose(pFile);
        hasChanges = true;
    }
}

void MigrationFile::AddRowFormat(char const* format, ...)
{
    if (!format)
        return;

    if (!sWorld.getConfig(CONFIG_UINT32_AUTO_COMMIT_MINUTES))
        return;

    va_list ap;
    char szQuery[MAX_QUERY_LEN];
    va_start(ap, format);
    int res = vsnprintf(szQuery, MAX_QUERY_LEN, format, ap);
    va_end(ap);

    if (res == -1)
        return;

    FILE* pFile;
    pFile = fopen(sWorld.GetWorldUpdatesMigration().c_str(), "a");
    if (pFile)
    {
        fprintf(pFile, "%s;\n", szQuery);
        fclose(pFile);
        hasChanges = true;
    }
}

void MigrationFile::CommitUpdates()
{
    hasChanges = false;
    std::string command = "cd \"" + sWorld.GetWorldUpdatesDirectory() + "\" && git add --all && git commit -m \"Direct world update.\" && git pull --rebase && git push";
    system(command.c_str());
}

bool World::ExecuteUpdate(char const* format, ...)
{
    if (!format)
        return false;

    va_list ap;
    char szQuery[MAX_QUERY_LEN];
    va_start(ap, format);
    int res = vsnprintf(szQuery, MAX_QUERY_LEN, format, ap);
    va_end(ap);

    if (res == -1)
    {
        sLog.outError("SQL Query truncated (and not execute) for format: %s", format);
        return false;
    }

    GetMigration().AddRow(szQuery);
    return WorldDatabase.PExecuteLog(szQuery);
}
