#include "rpll_battleground_hooks.h"
#define RPLL_SAFETY_CHECKS

void RPLLBattlegroundHooks::StartBattleground(const Battleground *battleground)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (battleground == nullptr)
        return;
    #endif
    if (battleground->isBattleground())
    {
        RPLLHooks::StartBattleground(static_cast<uint32_t>(battleground->GetMapId()), static_cast<uint32_t>(battleground->GetInstanceID()));
    }
    else if (battleground->isRated())
    {
        const uint32_t teamId1 = battleground->GetArenaTeamIdForTeam(ALLIANCE);
        const uint32_t teamId2 = battleground->GetArenaTeamIdForTeam(HORDE);
        RPLLHooks::StartRatedArena(static_cast<uint32_t>(battleground->GetMapId()), static_cast<uint32_t>(battleground->GetInstanceID()), teamId1, teamId2);
    }
    else
    {
        RPLLHooks::StartUnratedArena(static_cast<uint32_t>(battleground->GetMapId()), static_cast<uint32_t>(battleground->GetInstanceID()));
    }
}

void RPLLBattlegroundHooks::EndBattleground(const Battleground *battleground, const uint32_t *scores)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (battleground == nullptr || scores == nullptr)
        return;
    #endif
    const RPLL_PvP_Winner winner = RPLLHooks::mapPvPWinnerToRPLLPvPWinner(battleground->GetWinner());
    if (battleground->isBattleground())
    {
        const uint32_t scoreAlliance = scores[TEAM_ALLIANCE];
        const uint32_t scoreHorde = scores[TEAM_HORDE];
        RPLLHooks::EndBattleground(static_cast<uint32_t>(battleground->GetMapId()), static_cast<uint32_t>(battleground->GetInstanceID()), winner, scoreAlliance, scoreHorde);
    }
    else if (battleground->isRated())
    {
        const uint32_t teamId1 = battleground->GetArenaTeamIdForTeam(ALLIANCE);
        const uint32_t teamId2 = battleground->GetArenaTeamIdForTeam(HORDE);
        const int32_t teamChange1 = battleground->GetArenaTeamRatingChangeForTeam(ALLIANCE);
        const int32_t teamChange2 = battleground->GetArenaTeamRatingChangeForTeam(HORDE);
        RPLLHooks::EndRatedArena(static_cast<uint32_t>(battleground->GetMapId()), static_cast<uint32_t>(battleground->GetInstanceID()), winner, teamId1, teamId2, teamChange1, teamChange2);
    }
    else
    {
        RPLLHooks::EndUnratedArena(static_cast<uint32_t>(battleground->GetMapId()), static_cast<uint32_t>(battleground->GetInstanceID()), winner);
    }
}