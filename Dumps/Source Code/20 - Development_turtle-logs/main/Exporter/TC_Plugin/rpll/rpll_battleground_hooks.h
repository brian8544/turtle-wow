#ifndef _RPLL_BG_HOOKS_H
#define _RPLL_BG_HOOKS_H

#include "rpll_hooks.h"
#include "Battlegrounds/Battleground.h"

class RPLLBattlegroundHooks
{
public:
    static void StartBattleground(const Battleground *battleground);
    static void EndBattleground(const Battleground *battleground, const uint32_t *scores);
};

#endif