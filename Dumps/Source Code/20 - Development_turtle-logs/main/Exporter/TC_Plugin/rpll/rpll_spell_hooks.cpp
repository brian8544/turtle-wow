#include "rpll_spell_hooks.h"
#define RPLL_SAFETY_CHECKS

void RPLLSpellHooks::SendCastResult(const Spell *spell, const SpellCastResult result)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (spell == nullptr || result != SpellCastResult::SPELL_FAILED_INTERRUPTED)
        return;
    #endif
    if (result != SpellCastResult::SPELL_FAILED_INTERRUPTED)
        return;

    const auto caster = spell->GetCaster();
    #ifdef RPLL_SAFETY_CHECKS
    if (!caster->GetGUID().IsUnit())
        return;
    #endif
    RPLLHooks::Interrupt(caster->ToUnit(), spell->GetSpellInfo()->Id);
}

void RPLLSpellHooks::DoDamageAndTriggers(const Spell *spell, const uint32 hitMask)
{
    const auto caster = spell->GetCaster();
    #ifdef RPLL_SAFETY_CHECKS
    if (!caster->GetGUID().IsUnit())
        return;
    #endif

    const RPLL_HitMask reshitMask = RPLLHooks::mapSpellCastHitMaskToRPLLHitMask(hitMask);

    const auto unitTarget = spell->m_targets.GetUnitTarget();
    if (unitTarget != nullptr)
    {
        RPLLHooks::SpellCast(caster->ToUnit(), unitTarget->GetGUID().GetRawValue(), spell->GetSpellInfo()->Id, reshitMask);
        return;
    }
    if (spell->m_targets.GetCorpseTarget() != nullptr || spell->m_targets.GetItemTarget() != nullptr || spell->m_targets.GetObjectTarget() != nullptr || spell->m_targets.GetGOTarget() != nullptr)
    {
        RPLLHooks::SpellCast(caster->ToUnit(), 0, spell->GetSpellInfo()->Id, reshitMask);
        return;
    }

    // Assume self cast
    RPLLHooks::SpellCast(caster->ToUnit(), caster->GetGUID().GetRawValue(), spell->GetSpellInfo()->Id, reshitMask);
}