#include "rpll_spell_auras_hooks.h"
#define RPLL_SAFETY_CHECKS

void RPLLSpellAurasHooks::AuraCreate(const Aura *result)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (result == nullptr)
        return;
    #endif
    const auto owner = result->GetOwner();
    if (owner == nullptr || !owner->GetGUID().IsUnit())
        return;
    RPLLHooks::AuraApplication(result->GetCaster(), owner->ToUnit(), static_cast<uint32_t>(result->GetId()), static_cast<uint32_t>(result->GetStackAmount()), true);
}

void RPLLSpellAurasHooks::AuraSetStackAmount(const Aura *aura, const uint32_t oldAmount)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (aura == nullptr)
        return;
    #endif
    const auto owner = aura->GetOwner();
    #ifdef RPLL_SAFETY_CHECKS
    if (owner == nullptr || !owner->GetGUID().IsUnit())
        return;
    #endif

    const auto amount = static_cast<int32_t>(aura->GetStackAmount());
    if (amount != oldAmount)
        RPLLHooks::AuraApplication(aura->GetCaster(), owner->ToUnit(), static_cast<uint32_t>(aura->GetId()), static_cast<uint32_t>(aura->GetStackAmount()), static_cast<int8_t>(amount - static_cast<int32_t>(oldAmount)));
}