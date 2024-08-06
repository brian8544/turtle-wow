#include "rpll_hooks.h"
#include <iostream>
#include <iomanip>
#include <assert.h>
#include <chrono>
#include "SpellMgr.h"

uint8_t RPLLHooks::API_VERSION = 0;

// This is in MS
uint64_t RPLLHooks::OUT_OF_COMBAT_UPDATE_TIMEOUT = 10000;
uint64_t RPLLHooks::RAID_UPDATE_TIMEOUT = 1500;
uint64_t RPLLHooks::ARENA_UPDATE_TIMEOUT = 250;
uint64_t RPLLHooks::BATTLEGROUND_UPDATE_TIMEOUT = 1000;

float RPLLHooks::UPDATE_POSITION_LEEWAY = 15.0f;
float RPLLHooks::UPDATE_POSITION_LEEWAY_ARENA = 8.0f;
float RPLLHooks::UPDATE_POSITION_LEEWAY_NPC = 20.0f;
std::unordered_map<uint64_t, double> RPLLHooks::LAST_UNIT_POSITION = {};
std::unordered_map<uint64_t, RPLL_LastUpdate> RPLLHooks::LAST_UPDATE = {};

/*
 * ZMQ Messaging
 */
void *RPLLHooks::zmqContext = nullptr;
void *RPLLHooks::zmqSocket = nullptr;
void *RPLLHooks::GetZmqSocket()
{
    if (RPLLHooks::zmqSocket == nullptr)
    {
        std::cout << "Creating ZMQ Socket" << std::endl;
        RPLLHooks::zmqContext = zmq_ctx_new();
        RPLLHooks::zmqSocket = zmq_socket(RPLLHooks::zmqContext, ZMQ_PUSH);
        // Address of the Backend docker container
        int rc = zmq_connect(RPLLHooks::zmqSocket, "tcp://172.34.128.4:5690");
        assert(rc == 0);
    }
    return RPLLHooks::zmqSocket;
}

inline void RPLLHooks::SendZmqMessage(const ByteBuffer msg)
{
    zmq_send(GetZmqSocket(), msg.contents(), msg.size(), ZMQ_DONTWAIT);
}

/*
 * Time
 */
inline uint8_t RPLLHooks::GetCurrentTimeSize()
{
    return sizeof(uint64_t);
}
inline uint64_t RPLLHooks::GetCurrentTime()
{
    return static_cast<uint64_t>(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count());
}

/*
 * Conditions
 */
std::set<uint32_t> RPLLHooks::raidMapIds = {
    249, 309, 409, 469, 509, 531,                     // Vanilla
    532, 533, 534, 544, 548, 550, 564, 565, 568, 580, // TBC
    603, 615, 616, 624, 631, 649, 724                 // WOTLK
};
bool RPLLHooks::IsInRaid(const Unit *unit)
{
    return RPLLHooks::raidMapIds.find(unit->GetMap()->GetId()) != RPLLHooks::raidMapIds.end();
}

std::set<uint32_t> RPLLHooks::arenaMapIds = {
    559, 562, 572, 617, 618};
bool RPLLHooks::IsInArena(const Unit *unit)
{
    return RPLLHooks::arenaMapIds.find(unit->GetMap()->GetId()) != RPLLHooks::arenaMapIds.end();
}

std::set<uint32_t> RPLLHooks::battlegroundMapIds = {
    30, 489, 529, 566, 607, 628};
bool RPLLHooks::IsInBattleground(const Unit *unit)
{
    return RPLLHooks::battlegroundMapIds.find(unit->GetMap()->GetId()) != RPLLHooks::battlegroundMapIds.end();
}

bool RPLLHooks::IsInInstance(const Unit *unit)
{
    return IsInRaid(unit) || IsInArena(unit) || IsInBattleground(unit);
}

/*
 * Health/Power data
 */
inline uint8_t RPLLHooks::GetMapMetaDataSize()
{
    return 2 * sizeof(uint32_t) + sizeof(uint8_t);
}
inline void RPLLHooks::AppendMapMetaData(ByteBuffer &msg, const Unit *unit)
{
    const auto map = unit->GetMap();
    msg << static_cast<uint32_t>(map->GetId());
    msg << static_cast<uint32_t>(map->GetInstanceId());
    msg << static_cast<uint8_t>(map->GetDifficulty());
}

/*
 * Message Meta Data
 */
uint64_t RPLLHooks::MESSAGE_COUNT = 0;
inline uint8_t RPLLHooks::GetMessageMetaDataSize()
{
    return 3 * sizeof(uint8_t) + GetCurrentTimeSize() + 8;
}
inline void RPLLHooks::AppendMessageMetaData(ByteBuffer &msg, const RPLL_MessageType msgType, const uint8_t msgLength)
{
    msg << API_VERSION;
    msg << static_cast<uint8_t>(msgType);
    msg << msgLength;
    msg << GetCurrentTime();
    msg << RPLLHooks::MESSAGE_COUNT++;
}

/*
 * Helper
 */

RPLL_Damage RPLLHooks::BuildRPLLDamage(const RPLL_DamageSchoolMask damageSchoolMask, const uint32_t damage, const uint32_t resisted_or_glanced, const uint32_t absorbed)
{
    RPLL_Damage dmg;
    dmg.damageSchoolMask = damageSchoolMask;
    dmg.damage = damage;
    dmg.resisted_or_glanced = resisted_or_glanced;
    dmg.absorbed = absorbed;
    return std::move(dmg);
}

inline void RPLLHooks::AppendRPLLDamage(ByteBuffer &msg, const RPLL_Damage &damage)
{
    msg << static_cast<uint8_t>(damage.damageSchoolMask);
    msg << damage.damage;
    msg << damage.resisted_or_glanced;
    msg << damage.absorbed;
}

/*
 * Methods used to optimize
 */
inline bool RPLLHooks::IsPowerWithinTimeout(const Unit *unit, const RPLL_PowerType power)
{
    uint64_t timeout;
    if (!unit->IsInCombat()) timeout = RPLLHooks::OUT_OF_COMBAT_UPDATE_TIMEOUT;
    else if (IsInRaid(unit)) timeout = RPLLHooks::RAID_UPDATE_TIMEOUT;
    else if (IsInArena(unit)) timeout = RPLLHooks::ARENA_UPDATE_TIMEOUT;
    else if (IsInBattleground(unit)) timeout = RPLLHooks::BATTLEGROUND_UPDATE_TIMEOUT;
    else timeout = std::numeric_limits<uint64_t>::max();

    const auto now = GetCurrentTime();
    const auto guid = unit->GetGUID().GetRawValue();
    auto res = RPLLHooks::LAST_UPDATE.find(guid);
    if (power == RPLL_PowerType::RPLL_HEALTH && (res == RPLLHooks::LAST_UPDATE.end() || (now - res->second.health) >= timeout))
    {
        RPLLHooks::LAST_UPDATE[guid].health = now;
        return true;
    }
    else if (res == RPLLHooks::LAST_UPDATE.end() || (now - res->second.power) >= timeout)
    {
        RPLLHooks::LAST_UPDATE[guid].power = now;
        return true;
    }
    return false;
}

inline bool RPLLHooks::IsPositionWithinTimeout(const Unit *unit)
{
    uint64_t timeout;
    if (!unit->IsInCombat()) timeout = RPLLHooks::OUT_OF_COMBAT_UPDATE_TIMEOUT;
    else if (IsInRaid(unit)) timeout = RPLLHooks::RAID_UPDATE_TIMEOUT;
    else if (IsInArena(unit)) timeout = RPLLHooks::ARENA_UPDATE_TIMEOUT;
    else if (IsInBattleground(unit)) timeout = RPLLHooks::BATTLEGROUND_UPDATE_TIMEOUT;
    else timeout = std::numeric_limits<uint64_t>::max();

    const auto now = GetCurrentTime();
    const auto guid = unit->GetGUID().GetRawValue();
    auto res = RPLLHooks::LAST_UPDATE.find(guid);
    if (res == RPLLHooks::LAST_UPDATE.end() || (now - res->second.position) >= timeout)
    {
        RPLLHooks::LAST_UPDATE[guid].position = now;
        return true;
    }
    return false;
}

inline bool RPLLHooks::HasSignificantPositionChange(const Unit *unit, const float x, const float y, const float z, const float orientation)
{
    const uint64_t unitGuid = unit->GetGUID().GetRawValue();
    auto oldPos = RPLLHooks::LAST_UNIT_POSITION.find(unitGuid);
    const double sumPos = std::abs(x) + std::abs(y) + std::abs(z) + std::abs(orientation);
    const float position_leeway = IsInArena(unit) ? RPLLHooks::UPDATE_POSITION_LEEWAY_ARENA : (unit->GetGUID().IsPlayer() ? RPLLHooks::UPDATE_POSITION_LEEWAY : RPLLHooks::UPDATE_POSITION_LEEWAY_NPC);

    if (oldPos == RPLLHooks::LAST_UNIT_POSITION.end() || std::fabs(oldPos->second - sumPos) >= position_leeway)
    {
        RPLLHooks::LAST_UNIT_POSITION[unitGuid] = sumPos;
        return true;
    }
    return false;
}

/*
 * Mapper
 */
RPLL_HitMask RPLLHooks::mapMeleeHitMaskToRPLLHitMask(const uint32_t hitMask, const uint8 victimState, const uint8 meleeHitOutcome, const uint32_t amount)
{
    RPLL_HitMask reshitMask = RPLL_HitMask::NONE;
    if (hitMask & HitInfo::HITINFO_OFFHAND)
        reshitMask |= RPLL_HitMask::OFF_HAND;
    if (meleeHitOutcome == MeleeHitOutcome::MELEE_HIT_NORMAL)
        reshitMask |= RPLL_HitMask::HIT;
    if (hitMask & HitInfo::HITINFO_CRITICALHIT || meleeHitOutcome == MeleeHitOutcome::MELEE_HIT_CRIT)
        reshitMask |= RPLL_HitMask::CRIT;
    if (hitMask & HitInfo::HITINFO_RESIST) {
        if (amount > 0) reshitMask |= RPLL_HitMask::PARTIAL_RESIST;
        else reshitMask |= RPLL_HitMask::FULL_RESIST;
    }
    if (hitMask & HitInfo::HITINFO_MISS || meleeHitOutcome == MeleeHitOutcome::MELEE_HIT_MISS)
        reshitMask |= RPLL_HitMask::MISS;
    if (hitMask & HitInfo::HITINFO_ABSORB) {
        if (amount > 0) reshitMask |= RPLL_HitMask::PARTIAL_ABSORB;
        else reshitMask |= RPLL_HitMask::FULL_ABSORB;
    }
    if (meleeHitOutcome == MeleeHitOutcome::MELEE_HIT_BLOCK || meleeHitOutcome == MeleeHitOutcome::MELEE_HIT_BLOCK_CRIT || victimState == VictimState::VICTIMSTATE_BLOCKS) {
        if (amount > 0) reshitMask |= RPLL_HitMask::PARTIAL_BLOCK;
        else reshitMask |= RPLL_HitMask::FULL_BLOCK;
    }
    if (hitMask & HitInfo::HITINFO_GLANCING || meleeHitOutcome == MeleeHitOutcome::MELEE_HIT_GLANCING)
        reshitMask |= RPLL_HitMask::GLANCING;
    if (hitMask & HitInfo::HITINFO_CRUSHING || meleeHitOutcome == MeleeHitOutcome::MELEE_HIT_CRUSHING)
        reshitMask |= RPLL_HitMask::CRUSHING;
    if (meleeHitOutcome == MeleeHitOutcome::MELEE_HIT_EVADE || victimState == VictimState::VICTIMSTATE_EVADES)
        reshitMask |= RPLL_HitMask::EVADE;
    if (meleeHitOutcome == MeleeHitOutcome::MELEE_HIT_DODGE || victimState == VictimState::VICTIMSTATE_DODGE)
        reshitMask |= RPLL_HitMask::DODGE;
    if (meleeHitOutcome == MeleeHitOutcome::MELEE_HIT_PARRY || victimState == VictimState::VICTIMSTATE_PARRY)
        reshitMask |= RPLL_HitMask::PARRY;
    if (victimState == VictimState::VICTIMSTATE_IS_IMMUNE)
        reshitMask |= RPLL_HitMask::IMMUNE;
    if (victimState == VictimState::VICTIMSTATE_DEFLECTS)
        reshitMask |= RPLL_HitMask::DEFLECT;
    if (victimState == VictimState::VICTIMSTATE_INTERRUPT)
        reshitMask |= RPLL_HitMask::INTERRUPT;
    return reshitMask;
}

RPLL_HitMask RPLLHooks::mapSpellHitMaskToRPLLHitMask(const uint32_t hitMask, const uint32_t resist, const uint32_t absorb, const uint32_t block, const uint32_t amount) {
    RPLL_HitMask reshitMask = RPLL_HitMask::NONE;
    if (hitMask & SpellHitType::SPELL_HIT_TYPE_CRIT || hitMask & SpellHitType::SPELL_HIT_TYPE_CRIT_DEBUG)
        reshitMask |= RPLL_HitMask::CRIT;
    else if (hitMask & SpellHitType::SPELL_HIT_TYPE_HIT_DEBUG)
        reshitMask |= RPLL_HitMask::HIT;
    if (hitMask & SpellHitType::SPELL_HIT_TYPE_SPLIT)
        reshitMask |= RPLL_HitMask::SPLIT;
    if (amount > 0) {
        if (resist > 0)
            reshitMask |= RPLL_HitMask::PARTIAL_RESIST;
        if (absorb > 0)
            reshitMask |= RPLL_HitMask::PARTIAL_ABSORB;
        if (block > 0)
            reshitMask |= RPLL_HitMask::PARTIAL_BLOCK;
        if ((reshitMask & RPLL_HitMask::CRIT) == RPLL_HitMask::NONE)
            reshitMask |= RPLL_HitMask::HIT;
    } else {
        if (resist > 0)
            reshitMask |= RPLL_HitMask::FULL_RESIST;
        if (absorb > 0)
            reshitMask |= RPLL_HitMask::FULL_RESIST;
        if (block > 0)
            reshitMask |= RPLL_HitMask::FULL_RESIST;
    }
    return reshitMask;
}

RPLL_HitMask RPLLHooks::mapSpellCastHitMaskToRPLLHitMask(const uint32_t hitMask) {
    RPLL_HitMask reshitMask = RPLL_HitMask::NONE;
    if (hitMask & ProcFlagsHit::PROC_HIT_NONE || hitMask & ProcFlagsHit::PROC_HIT_NORMAL)
        reshitMask |= RPLL_HitMask::HIT;
    else if (hitMask & ProcFlagsHit::PROC_HIT_CRITICAL)
        reshitMask |= RPLL_HitMask::CRIT;
    else if (hitMask & ProcFlagsHit::PROC_HIT_MISS)
        reshitMask |= RPLL_HitMask::MISS;
    if (hitMask & ProcFlagsHit::PROC_HIT_FULL_RESIST)
        reshitMask |= RPLL_HitMask::FULL_RESIST;
    if (hitMask & ProcFlagsHit::PROC_HIT_DODGE)
        reshitMask |= RPLL_HitMask::DODGE;
    if (hitMask & ProcFlagsHit::PROC_HIT_PARRY)
        reshitMask |= RPLL_HitMask::PARRY;
    if (hitMask & ProcFlagsHit::PROC_HIT_BLOCK)
        reshitMask |= RPLL_HitMask::PARTIAL_BLOCK;
    if (hitMask & ProcFlagsHit::PROC_HIT_EVADE)
        reshitMask |= RPLL_HitMask::EVADE;
    if (hitMask & ProcFlagsHit::PROC_HIT_IMMUNE)
        reshitMask |= RPLL_HitMask::IMMUNE;
    if (hitMask & ProcFlagsHit::PROC_HIT_DEFLECT)
        reshitMask |= RPLL_HitMask::DEFLECT;
    if (hitMask & ProcFlagsHit::PROC_HIT_ABSORB)
        reshitMask |= RPLL_HitMask::PARTIAL_ABSORB;
    if (hitMask & ProcFlagsHit::PROC_HIT_REFLECT)
        reshitMask |= RPLL_HitMask::REFLECT;
    if (hitMask & ProcFlagsHit::PROC_HIT_INTERRUPT)
        reshitMask |= RPLL_HitMask::INTERRUPT;
    if (hitMask & ProcFlagsHit::PROC_HIT_FULL_BLOCK)
        reshitMask |= RPLL_HitMask::FULL_BLOCK;
    return reshitMask;
}

RPLL_PowerType RPLLHooks::mapPowersToRPLLPowerType(const Powers power)
{
    switch (power)
    {
    case Powers::POWER_MANA:
        return RPLL_PowerType::RPLL_MANA;
    case Powers::POWER_RAGE:
        return RPLL_PowerType::RPLL_RAGE;
    case Powers::POWER_FOCUS:
        return RPLL_PowerType::RPLL_FOCUS;
    case Powers::POWER_ENERGY:
        return RPLL_PowerType::RPLL_ENERGY;
    case Powers::POWER_HAPPINESS:
        return RPLL_PowerType::RPLL_HAPPINESS;
    case Powers::POWER_HEALTH:
        return RPLL_PowerType::RPLL_HEALTH;
    }
    return RPLL_PowerType::RPLL_PWT_UNDEFINED;
}

RPLL_DamageSchoolMask RPLLHooks::mapSpellSchoolMaskToRPLLDamageSchoolMask(const uint32_t schoolMask)
{
    return static_cast<RPLL_DamageSchoolMask>(schoolMask);
}

RPLL_PvP_Winner RPLLHooks::mapPvPWinnerToRPLLPvPWinner(const uint8_t winner)
{
    if (winner == TEAM_ALLIANCE)
    {
        return RPLL_PvP_Winner::RPLL_TEAM_ALLIANCE;
    }
    else if (winner == TEAM_HORDE)
    {
        return RPLL_PvP_Winner::RPLL_TEAM_HORDE;
    }
    return RPLL_PvP_Winner::RPLL_TEAM_NONE;
}

/*
 * Pack information and send messages
 */
void RPLLHooks::DealSpellDamage(const Unit *attacker, const Unit *victim, const uint32_t spellId, const uint32_t blocked, const RPLL_Damage damage, const bool overTime, const RPLL_HitMask hitMask)
{
    if (!IsInInstance(victim))
        return;
    const uint8_t msgLength = 29 + GetMessageMetaDataSize() + 13;
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_SPELL_DAMAGE, msgLength);
    msg << static_cast<uint64_t>(attacker->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(victim->GetGUID().GetRawValue());
    msg << spellId;
    msg << blocked;
    AppendRPLLDamage(msg, damage);
    msg << static_cast<uint8_t>(overTime);
    msg << static_cast<uint32_t>(hitMask);
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::DealMeleeDamage(const Unit *attacker, const Unit *victim, const RPLL_HitMask hitMask, const uint32_t blocked, const std::vector<RPLL_Damage> damages)
{
    if (!IsInInstance(victim))
        return;
    const uint8_t msgLength = 24 + GetMessageMetaDataSize() + damages.size() * 13;
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_MELEE_DAMAGE, msgLength);
    msg << static_cast<uint64_t>(attacker->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(victim->GetGUID().GetRawValue());
    msg << blocked;
    msg << static_cast<uint32_t>(hitMask);
    for (auto dmg : damages)
        AppendRPLLDamage(msg, dmg);
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::DealMeleeDamage(const Unit *attacker, const Unit *victim, const RPLL_HitMask hitMask, const uint32_t blocked, const RPLL_Damage damage)
{
    if (!IsInInstance(victim))
        return;
    const uint8_t msgLength = 24 + GetMessageMetaDataSize() + sizeof(RPLL_Damage);
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_MELEE_DAMAGE, msgLength);
    msg << static_cast<uint64_t>(attacker->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(victim->GetGUID().GetRawValue());
    msg << blocked;
    msg << static_cast<uint32_t>(hitMask);
    AppendRPLLDamage(msg, damage);
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Heal(const Unit *caster, const Unit *target, const uint32_t spellId, const uint32_t totalHeal, const uint32_t effectiveHeal, const uint32_t absorb, const RPLL_HitMask hitMask)
{
    if (!IsInInstance(target))
        return;
    const uint8_t msgLength = 36 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_HEAL, msgLength);
    msg << static_cast<uint64_t>(caster->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(target->GetGUID().GetRawValue());
    msg << spellId;
    msg << totalHeal;
    msg << effectiveHeal;
    msg << absorb; // ?
    msg << static_cast<uint32_t>(hitMask);
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Death(const Unit *cause, const Unit *victim)
{
    if (!IsInInstance(victim))
        return;
    const uint8_t msgLength = 16 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_DEATH, msgLength);
    msg << static_cast<uint64_t>(cause->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(victim->GetGUID().GetRawValue());
    SendZmqMessage(std::move(msg));
}

// Apllied = True => A stack has been added (Also refresh)
// Applied = False => A stack has been removed
void RPLLHooks::AuraApplication(const Unit *caster, const Unit *target, const uint32_t spellId, const uint32_t stackAmount, const int8_t delta)
{
    if (!IsInInstance(target))
        return;
    const uint8_t msgLength = 25 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_AURA_APPLICATION, msgLength);
    msg << static_cast<uint64_t>(caster->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(target->GetGUID().GetRawValue());
    msg << spellId;
    msg << stackAmount;
    msg << delta;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Dispel(const Unit *dispeller, const Unit *target, const ObjectGuid auraCaster, const uint32_t dispelSpellId, const uint32_t dispelledSpellId, const uint8_t dispelAmount)
{
    if (!IsInInstance(target))
        return;
    const uint8_t msgLength = 33 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_DISPEL, msgLength);
    msg << static_cast<uint64_t>(dispeller->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(target->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(auraCaster.GetRawValue());
    msg << dispelSpellId;
    msg << dispelledSpellId;
    msg << dispelAmount;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::SpellSteal(const Unit *dispeller, const Unit *target, const ObjectGuid auraCaster, const uint32_t stealSpellId, const uint32_t stolenSpellId, const uint8_t stealAmount)
{
    if (!IsInInstance(target))
        return;
    const uint8_t msgLength = 33 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_SPELL_STEAL, msgLength);
    msg << static_cast<uint64_t>(dispeller->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(target->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(auraCaster.GetRawValue());
    msg << stealSpellId;
    msg << stolenSpellId;
    msg << stealAmount;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Interrupt(const Unit *target, const uint32_t interruptedSpellId)
{
    if (!IsInInstance(target))
        return;
    const uint8_t msgLength = 12 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_INTERRUPT, msgLength);
    msg << static_cast<uint64_t>(target->GetGUID().GetRawValue());
    msg << interruptedSpellId;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Position(const Unit *unit, const float x, const float y, const float z, const float orientation)
{
    if (!HasSignificantPositionChange(unit, x, y, z, orientation))
        return;
    if (!IsPositionWithinTimeout(unit))
        return; // Implies is in Instance
    const uint8_t msgLength = 24 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_POSITION, msgLength);
    msg << static_cast<uint64_t>(unit->GetGUID().GetRawValue());
    msg << static_cast<int32_t>(x * 10);
    msg << static_cast<int32_t>(y * 10);
    msg << static_cast<int32_t>(z * 10);
    msg << static_cast<int32_t>(orientation * 10);
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Map(const Unit *unit)
{
    const uint8_t msgLength = 8 + GetMessageMetaDataSize() + GetMapMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_MAP, msgLength);
    AppendMapMetaData(msg, unit);
    msg << static_cast<uint64_t>(unit->GetGUID().GetRawValue());
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::CombatState(const Unit *unit, const bool inCombat)
{
    if (!IsInInstance(unit))
        return;
    const uint8_t msgLength = 9 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_COMBAT_STATE, msgLength);
    msg << static_cast<uint64_t>(unit->GetGUID().GetRawValue());
    msg << static_cast<uint8_t>(inCombat);
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Power(const Unit *unit, const RPLL_PowerType powerType, const uint32_t maxPower, const uint32_t currentPower)
{
    if (!IsPowerWithinTimeout(unit, powerType))
        return; // This implies IsInInstance
    const uint8_t msgLength = 17 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_POWER, msgLength);
    msg << static_cast<uint64_t>(unit->GetGUID().GetRawValue());
    msg << static_cast<uint8_t>(powerType);
    msg << maxPower;
    msg << currentPower;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::StartBattleground(const uint32_t mapId, const uint32_t instanceId)
{
    RPLLHooks::Instance(mapId, instanceId, RPLL_MessageType::RPLL_MSG_INSTANCE_PVP_START_BATTLEGROUND);
}

void RPLLHooks::StartUnratedArena(const uint32_t mapId, const uint32_t instanceId)
{
    RPLLHooks::Instance(mapId, instanceId, RPLL_MessageType::RPLL_MSG_INSTANCE_PVP_START_UNRATED_ARENA);
}

void RPLLHooks::StartRatedArena(const uint32_t mapId, const uint32_t instanceId, const uint32_t teamId1, const uint32_t teamId2)
{
    const uint8_t msgLength = 16 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_INSTANCE_PVP_START_RATED_ARENA, msgLength);
    msg << mapId;
    msg << instanceId;
    msg << teamId1;
    msg << teamId2;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Instance(const uint32_t mapId, const uint32_t instanceId, const RPLL_MessageType messageType)
{
    const uint8_t msgLength = 8 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, messageType, msgLength);
    msg << mapId;
    msg << instanceId;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::EndUnratedArena(const uint32_t mapId, const uint32_t instanceId, const RPLL_PvP_Winner winner)
{
    const uint8_t msgLength = 9 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_INSTANCE_PVP_END_UNRATED_ARENA, msgLength);
    msg << mapId;
    msg << instanceId;
    msg << static_cast<uint8_t>(winner);
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::EndBattleground(const uint32_t mapId, const uint32_t instanceId, const RPLL_PvP_Winner winner, const uint32_t scoreAlliance, const uint32_t scoreHorde)
{
    const uint8_t msgLength = 17 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_INSTANCE_PVP_END_BATTLEGROUND, msgLength);
    msg << mapId;
    msg << instanceId;
    msg << static_cast<uint8_t>(winner);
    msg << scoreAlliance;
    msg << scoreHorde;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::EndRatedArena(const uint32_t mapId, const uint32_t instanceId, const RPLL_PvP_Winner winner, const uint32_t teamId1, const uint32_t teamId2, const int32_t teamChange1, const int32_t teamChange2)
{
    const uint8_t msgLength = 25 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_INSTANCE_PVP_END_RATED_ARENA, msgLength);
    msg << mapId;
    msg << instanceId;
    msg << static_cast<uint8_t>(winner);
    msg << teamId1;
    msg << teamId2;
    msg << teamChange1;
    msg << teamChange2;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Loot(const Unit *unit, const uint32_t itemId, const uint32_t count)
{
    if (!IsInInstance(unit))
        return;
    const uint8_t msgLength = 16 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_LOOT, msgLength);
    msg << static_cast<uint64_t>(unit->GetGUID().GetRawValue());
    msg << itemId;
    msg << count;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::SpellCast(const Unit *caster, const uint64_t targetGUID, const uint32_t spellId, const RPLL_HitMask hitMask)
{
    if (!IsInInstance(caster))
        return;
    const uint8_t msgLength = 24 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_SPELL_CAST, msgLength);
    msg << static_cast<uint64_t>(caster->GetGUID().GetRawValue());
    msg << targetGUID; // Can be 0 for objects, like Rezz on a corpse
    msg << spellId;
    msg << static_cast<uint32_t>(hitMask);
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Threat(const Unit *threater, const Unit *threatened, const uint32_t spellId, const int32_t amount)
{
    if (!IsInInstance(threater))
        return;
    const uint8_t msgLength = 24 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_THREAT, msgLength);
    msg << static_cast<uint64_t>(threater->GetGUID().GetRawValue());
    msg << static_cast<uint64_t>(threatened->GetGUID().GetRawValue());
    msg << spellId;
    msg << amount;
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Event(const Unit *unit, const RPLL_Event event)
{
    if (!IsInInstance(unit))
        return;
    const uint8_t msgLength = 9 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_EVENT, msgLength);
    msg << static_cast<uint64_t>(unit->GetGUID().GetRawValue());
    msg << static_cast<uint8_t>(event);
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::Summon(const Unit *unit, const uint64_t ownerGUID)
{
    if (!IsInInstance(unit))
        return;
    const uint8_t msgLength = 16 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_SUMMON, msgLength);
    msg << ownerGUID;
    msg << static_cast<uint64_t>(unit->GetGUID().GetRawValue());
    SendZmqMessage(std::move(msg));
}

void RPLLHooks::InstanceDelete(const uint32_t instanceId)
{
    const uint8_t msgLength = 4 + GetMessageMetaDataSize();
    ByteBuffer msg(msgLength);
    AppendMessageMetaData(msg, RPLL_MessageType::RPLL_MSG_INSTANCE_DELETE, msgLength);
    msg << instanceId;
    SendZmqMessage(std::move(msg));
}