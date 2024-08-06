#include "Object.h"
#include "Player.h"
#include "BattleGround.h"
#include "BattleGroundBR.h"
#include "Creature.h"
#include "GameObject.h"
#include "ObjectMgr.h"
#include "BattleGroundMgr.h"
#include "WorldPacket.h"
#include "Language.h"
#include "MapManager.h"
#include "World.h"

BattleGroundBR::BattleGroundBR()
{
    m_StartMessageIds[BG_STARTING_EVENT_FIRST]  = 0;
    m_StartMessageIds[BG_STARTING_EVENT_SECOND] = LANG_ARENA_THIRTY_SECONDS;
    m_StartMessageIds[BG_STARTING_EVENT_THIRD]  = LANG_ARENA_FIFTEEN_SECONDS;
    m_StartMessageIds[BG_STARTING_EVENT_FOURTH] = LANG_ARENA_BEGUN;

    m_StartDelayTimes[BG_STARTING_EVENT_FIRST] = BG_START_DELAY_35S;
    m_StartDelayTimes[BG_STARTING_EVENT_SECOND] = BG_START_DELAY_30S;
    m_StartDelayTimes[BG_STARTING_EVENT_THIRD] = BG_START_DELAY_15S;
    m_StartDelayTimes[BG_STARTING_EVENT_FOURTH] = BG_START_DELAY_NONE;
}

BattleGroundBR::~BattleGroundBR()
{
}

void BattleGroundBR::Update(uint32 diff)
{
    // Execute this at the end, since it can delete the BattleGround object!
    BattleGround::Update(diff);
}

Team BattleGroundBR::GetWinningTeam() const
{
    if (m_AllianceDeaths == m_HordeDeaths)
        return TEAM_NONE;
    return m_AllianceDeaths < m_HordeDeaths ? ALLIANCE : HORDE;
}

void BattleGroundBR::StartingEventCloseDoors()
{
    if (GetStatus() != STATUS_WAIT_JOIN)
        return;

    // Plummet visibility distance so you cannot see enemy players until the match begins.
    // May be better to just update visibility code instead of this...
    // 40 is roughly to the middle of the map -- perfect area to not be able to see other team.
    //GetBgMap()->SetVisibilityDistance(45.0f);
}

void BattleGroundBR::StartingEventOpenDoors()
{
    // Reset visibility distance back to normal.
    // GetBgMap()->InitVisibilityDistance();
    OpenDoorEvent(BG_EVENT_DOOR);

    // Loop through players in BG and reset their health and mana again. This is due to the lack of Preparation spell in vanilla.
    // Notice we do not reset cooldowns here, like on AddPlayer() due to potential abuse.
    for (auto& itr : GetPlayers())
    {
        if (Player* plr = sObjectMgr.GetPlayer(itr.first))
        {
            plr->SetHealth(plr->GetMaxHealth());

            if (plr->GetPowerType() == POWER_MANA)
                plr->SetPower(POWER_MANA, plr->GetMaxPower(POWER_MANA));
        }
    }
}

void BattleGroundBR::AddPlayer(Player *plr)
{
    BattleGround::AddPlayer(plr);
    //create score and add it to map, default values are set in constructor
    BattleGroundBRScore* sc = new BattleGroundBRScore;

    m_PlayerScores[plr->GetObjectGuid()] = sc;

    // When player is added, call this function to restore full hp/mana and reset cooldowns.
    plr->RemoveAllArenaSpellCooldown();
}

void BattleGroundBR::RemovePlayer(Player* /*plr*/, ObjectGuid /*guid*/)
{
}

void BattleGroundBR::UpdateTeamScore(Team team)
{
}

void BattleGroundBR::HandleAreaTrigger(Player *Source, uint32 Trigger)
{
    // this is wrong way to implement these things. On official it done by gameobject spell cast.
    if (GetStatus() != STATUS_IN_PROGRESS)
        return;
}

bool BattleGroundBR::SetupBattleGround()
{
    /*doors
    for (int i = 0; i < BG_BR_NODES_MAX; ++i)
    {
        if (!AddObject(ARENA_OBJECT_DOOR + 3 * i, DOOR_ENTRY, ARENA_BR_DoorPositions[i][0], ARENA_BR_DoorPositions[i][1], ARENA_SV_DoorPositions[i][2], ARENA_BR_DoorPositions[i][3], 0, 0, sin(ARENA_BR_DoorPositions[i][3] / 2), cos(ARENA_BR_DoorPositions[i][3] / 2), RESPAWN_ONE_DAY)
            || !AddObject(ARENA_OBJECT_DOOR + 3 * i + 1, DOOR_ENTRY, ARENA_BR_DoorPositions[i][0], ARENA_BR_DoorPositions[i][1], ARENA_SV_DoorPositions[i][2], ARENA_BR_DoorPositions[i][3], 0, 0, sin(ARENA_BR_DoorPositions[i][3] / 2), cos(ARENA_BR_DoorPositions[i][3] / 2), RESPAWN_ONE_DAY))
            sLog.outErrorDb("BatteGroundSV: Failed to spawn door objects!");
    }
    */

    return true;
}

void BattleGroundBR::Reset()
{
    //call parent's class reset
    BattleGround::Reset();

    for (uint32 i = 0; i < BG_TEAMS_COUNT; ++i)
    {
        m_TeamScores[i] = 0;
    }
}

void BattleGroundBR::EndBattleGround(Team winner)
{
    if (winner == TEAM_NONE)
        return;

    Team loser = (winner == ALLIANCE) ? HORDE : ALLIANCE;
    // rewards
    RewardReputationToTeam(1008, 100, winner);
    RewardReputationToTeam(1008, 25, loser);
    RewardHonorToTeam(200, winner);
    RewardHonorToTeam(50, loser);

    BattleGround::EndBattleGround(winner);
}

void BattleGroundBR::HandleKillPlayer(Player *player, Player *killer)
{
    if (GetStatus() != STATUS_IN_PROGRESS)
        return;

    BattleGround::HandleKillPlayer(player, killer);

    // Applied above but remove here instead.
    player->RemoveFlag(UNIT_FIELD_FLAGS, UNIT_FLAG_SKINNABLE);
}

void BattleGroundBR::UpdatePlayerScore(Player *Source, uint32 type, uint32 value)
{
    BattleGroundScoreMap::iterator itr = m_PlayerScores.find(Source->GetObjectGuid());
    if (itr == m_PlayerScores.end())                        // player not found
        return;

    BattleGround::UpdatePlayerScore(Source, type, value);

    if (type == SCORE_DEATHS)
    {
        switch (Source->GetTeam())
        {
            case ALLIANCE:
                m_AllianceDeaths++;
                break;
            case HORDE:
                m_HordeDeaths++;
                break;
        }

        // If both all team members are dead on either side, end arena.
        if (m_AllianceDeaths >= GetMaxPlayersPerTeam())
            EndBattleGround(HORDE);
        else if (m_HordeDeaths >= GetMaxPlayersPerTeam())
            EndBattleGround(ALLIANCE);
    }
}

WorldSafeLocsEntry const* BattleGroundBR::GetClosestGraveYard(Player* player)
{
    return nullptr;
}

void BattleGroundBR::FillInitialWorldStates(WorldPacket& data, uint32& count)
{
}