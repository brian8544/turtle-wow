#include "rpll_combat_manager_hooks.h"
#define RPLL_SAFETY_CHECKS

void RPLLCombatManagerHooks::UpdateOwnerCombatState(const Unit *unit, const bool result)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (!result || unit == nullptr)
        return;
    #endif
    RPLLHooks::Map(unit);
    RPLLHooks::CombatState(unit, unit->IsInCombat());
    RPLLHooks::Power(unit, RPLL_PowerType::RPLL_HEALTH, static_cast<uint32_t>(unit->GetMaxHealth()), static_cast<uint32_t>(unit->GetHealth()));
    const auto powerType = unit->GetPowerType();
    RPLLHooks::Power(unit, RPLLHooks::mapPowersToRPLLPowerType(powerType), static_cast<uint32_t>(unit->GetMaxPower(powerType)), static_cast<uint32_t>(unit->GetPower(powerType)));
}