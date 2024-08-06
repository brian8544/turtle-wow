#ifndef _RPLL_UNIT_HOOKS_H
#define _RPLL_UNIT_HOOKS_H

#include "rpll_hooks.h"
#include "SpellAuraEffects.h"

class RPLLUnitHooks
{
public:
    static void SendAttackStateUpdate(const CalcDamageInfo *damageInfo);
    static void SendSpellNonMeleeDamageLog(const SpellNonMeleeDamage *damageInfo);
    static void SendPeriodicAuraLog(const SpellPeriodicAuraLogInfo *pInfo);
    // IMPORTANT: Add hook AFTER original function
    static void DealHeal(const HealInfo &healInfo);
    static void Kill(const Unit *attacker, const Unit *victim);
    // Note: Target is the Unit on whom it is called, i.e. "this"
    static void RemoveAurasDueToSpellByDispel(const Unit *target, const uint32_t spellId, const uint32_t dispellerSpellId, const ObjectGuid casterGUID, const WorldObject *dispeller, const uint8 chargesRemoved = 1);
    // Note: The implementation may not give you the used spell to steal
    // Set the stealSpellId to 0 in this case
    // The target is again the Unit, i.e. "this"
    static void RemoveAurasDueToSpellBySteal(const Unit *target, const uint32_t spellId, const uint32_t stealSpellId, const ObjectGuid casterGUID, const WorldObject *stealer);
    // Note: Only call if the position update was successful
    static void UpdatePosition(const Unit *unit, const float x, const float y, const float z, const float orientation);
    // IMPORTANT: These have to be called AFTER the original function.
    // BUT save the old value before!
    static void SetHealth(const Unit *unit, const uint32_t oldVal);
    static void SetMaxHealth(const Unit *unit, const uint32_t oldVal);
    static void SetPower(const Unit *unit, const Powers powerType, const uint32_t oldVal);
    static void SetMaxPower(const Unit *unit, const Powers powerType, const uint32_t oldVal);
    // IMPORTANT: Make sure to call it BEFORE the original call
    static void RemoveOwnedAura(const Aura *aura);
    // Note: Unit is "this"
    static void SetOwnerGUID(const Unit *unit, const ObjectGuid owner);
};

#endif