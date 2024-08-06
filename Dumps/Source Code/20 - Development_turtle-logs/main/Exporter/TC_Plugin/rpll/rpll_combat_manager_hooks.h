#ifndef _RPLL_CM_HOOKS_H
#define _RPLL_CM_HOOKS_H

#include "rpll_hooks.h"

class RPLLCombatManagerHooks
{
public:
    static void UpdateOwnerCombatState(const Unit *unit, const bool result);
};

#endif