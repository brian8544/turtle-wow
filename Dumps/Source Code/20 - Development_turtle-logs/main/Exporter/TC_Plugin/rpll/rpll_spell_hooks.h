#ifndef _RPLL_SPELL_HOOKS_H
#define _RPLL_SPELL_HOOKS_H

#include "rpll_hooks.h"
#include "Spell.h"

class RPLLSpellHooks
{
public:
    static void SendCastResult(const Spell *spell, const SpellCastResult result);
    // IMPORTANT: Call after the original function
    static void DoDamageAndTriggers(const Spell *spell, const uint32 hitMask);
};

#endif