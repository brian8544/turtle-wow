#ifndef _RPLL_PLAYER_HOOKS_H
#define _RPLL_PLAYER_HOOKS_H

#include "rpll_spell_auras_hooks.h"
#include "Player.h"
#include "Item.h"

class RPLLPlayerHooks
{
public:
    static void SendNewItem(const Unit *unit, const Item *item, const uint32_t count, const bool received, const bool created, const bool broadcast, const bool sendChatMessage);
    // Note: Use the player for the unit
    static void EnvironmentalDamage(Unit *unit, const EnviromentalDamage type, const uint32_t damage, const uint32_t result);
    // Used to get state on login/logout instance enter etc.
    static void SetMap(const Unit *unit);
};

#endif