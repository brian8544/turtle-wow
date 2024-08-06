#include "rpll_unit_hooks.h"
#define RPLL_SAFETY_CHECKS

void RPLLUnitHooks::SendAttackStateUpdate(const CalcDamageInfo *damageInfo)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (damageInfo == nullptr || damageInfo->Attacker == nullptr || damageInfo->Target == nullptr)
        return;
    #endif
    std::vector<RPLL_Damage> damages;
    damages.reserve(1);
    uint32_t total_damage = 0;
    for (auto dmg : damageInfo->Damages)
    {
        if (dmg.Damage == 0 && dmg.Absorb == 0 && dmg.Resist == 0)
            continue;
        const RPLL_DamageSchoolMask damageSchoolMask = RPLLHooks::mapSpellSchoolMaskToRPLLDamageSchoolMask(dmg.DamageSchoolMask);
        damages.push_back(std::move(RPLLHooks::BuildRPLLDamage(damageSchoolMask, static_cast<uint32_t>(dmg.Damage), static_cast<uint32_t>(dmg.Resist), static_cast<uint32_t>(dmg.Absorb))));
        total_damage += dmg.Damage;
    }
    const RPLL_HitMask hitMask = RPLLHooks::mapMeleeHitMaskToRPLLHitMask(damageInfo->HitInfo, damageInfo->TargetState, damageInfo->HitOutCome, total_damage);
    RPLLHooks::DealMeleeDamage(damageInfo->Attacker, damageInfo->Target, hitMask, static_cast<uint32_t>(damageInfo->Blocked), std::move(damages));
}

void RPLLUnitHooks::SendSpellNonMeleeDamageLog(const SpellNonMeleeDamage *damageInfo)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (damageInfo == nullptr || damageInfo->attacker == nullptr || damageInfo->target == nullptr)
        return;
    #endif

    const RPLL_DamageSchoolMask damageSchoolMask = RPLLHooks::mapSpellSchoolMaskToRPLLDamageSchoolMask(damageInfo->schoolMask);
    const RPLL_HitMask hitMask = RPLLHooks::mapSpellHitMaskToRPLLHitMask(damageInfo->HitInfo, damageInfo->resist, damageInfo->absorb, damageInfo->blocked, damageInfo->damage);
    RPLLHooks::DealSpellDamage(damageInfo->attacker, damageInfo->target, static_cast<uint32_t>(damageInfo->SpellID),
                               static_cast<uint32_t>(damageInfo->blocked),
                               std::move(RPLLHooks::BuildRPLLDamage(damageSchoolMask, static_cast<uint32_t>(damageInfo->damage), static_cast<uint32_t>(damageInfo->absorb), static_cast<uint32_t>(damageInfo->resist))), false, hitMask);
}

void RPLLUnitHooks::DealHeal(const HealInfo &healInfo)
{
    const RPLL_HitMask hitMask = RPLLHooks::mapSpellHitMaskToRPLLHitMask(healInfo.GetHitMask(), 0, healInfo.GetAbsorb(), 0, healInfo.GetHeal());
    RPLLHooks::Heal(healInfo.GetHealer(), healInfo.GetTarget(), healInfo.GetSpellInfo()->Id, healInfo.GetHeal(), healInfo.GetEffectiveHeal(), healInfo.GetAbsorb(), hitMask);
}

void RPLLUnitHooks::SendPeriodicAuraLog(const SpellPeriodicAuraLogInfo *pInfo)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (pInfo == nullptr)
        return;
    #endif

    AuraEffect const *aura = pInfo->auraEff;
    const Unit *caster = aura->GetCaster();
    std::vector<Unit *> targets;
    aura->GetTargetList(targets);
    switch (aura->GetAuraType())
    {
    case SPELL_AURA_PERIODIC_DAMAGE:
    case SPELL_AURA_PERIODIC_DAMAGE_PERCENT:
        for (Unit *target : targets)
        {
            const RPLL_DamageSchoolMask damageSchoolMask = RPLLHooks::mapSpellSchoolMaskToRPLLDamageSchoolMask(static_cast<uint32_t>(aura->GetSpellInfo()->SchoolMask));
            const RPLL_HitMask hitMask = RPLLHooks::mapSpellHitMaskToRPLLHitMask(0, pInfo->resist, pInfo->absorb, 0, pInfo->damage);
            RPLLHooks::DealSpellDamage(caster, target, aura->GetId(), 0,
                                       std::move(RPLLHooks::BuildRPLLDamage(damageSchoolMask, static_cast<uint32_t>(pInfo->damage), static_cast<uint32_t>(pInfo->absorb), static_cast<uint32_t>(pInfo->resist))), true, hitMask);
        }
        return;
    /*
        case SPELL_AURA_PERIODIC_HEAL:
        case SPELL_AURA_OBS_MOD_HEALTH:
            // This is taken care of in DealHeal
            return;
        case SPELL_AURA_OBS_MOD_POWER:
        case SPELL_AURA_PERIODIC_ENERGIZE:
            // This is not interesting, since we track all health changes anyway
            // This may give us some procs though
            // Maybe Extra attacks?
            return;
        case SPELL_AURA_PERIODIC_MANA_LEECH:
            // Also not interesting, atleast yet
            // Maybe we can deal "damage" in form of any power type
            return;
        */
    default:
        return;
    }
}

void RPLLUnitHooks::Kill(const Unit *attacker, const Unit *victim)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (attacker == nullptr || victim == nullptr)
        return;
    #endif

    RPLLHooks::Death(attacker, victim);
}

void RPLLUnitHooks::RemoveAurasDueToSpellByDispel(const Unit *target, const uint32_t spellId, const uint32_t dispellerSpellId, const ObjectGuid casterGUID, const WorldObject *dispeller, const uint8 chargesRemoved)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (!casterGUID.IsUnit() || !dispeller->GetGUID().IsUnit() || dispeller->ToUnit() == nullptr)
        return;
    #endif    
    RPLLHooks::Dispel(dispeller->ToUnit(), target, casterGUID, dispellerSpellId, spellId, chargesRemoved);
}

void RPLLUnitHooks::RemoveAurasDueToSpellBySteal(const Unit *target, const uint32_t spellId, const uint32_t stealSpellId, const ObjectGuid casterGUID, const WorldObject *stealer)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (!casterGUID.IsUnit() || !stealer->GetGUID().IsUnit() || stealer->ToUnit() == nullptr)
        return;
    #endif

    RPLLHooks::SpellSteal(stealer->ToUnit(), target, casterGUID, stealSpellId, spellId, 1);
}

void RPLLUnitHooks::UpdatePosition(const Unit *unit, const float x, const float y, const float z, const float orientation)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (unit == nullptr)
        return;
    #endif
    RPLLHooks::Position(unit, x, y, z, orientation);
}

// Upon getting into PoV of the player the health is set.
// So while we may loose some precision, we get rid of a lot redundant events
void RPLLUnitHooks::SetHealth(const Unit *unit, const uint32_t oldVal)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (unit == nullptr)
        return;
    #endif
    if (oldVal == 0 || unit->GetHealth() == oldVal)
        return;

    RPLLHooks::Power(unit, RPLL_PowerType::RPLL_HEALTH, static_cast<uint32_t>(unit->GetMaxHealth()), static_cast<uint32_t>(unit->GetHealth()));
}

void RPLLUnitHooks::SetMaxHealth(const Unit *unit, const uint32_t oldVal)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (unit == nullptr)
        return;
    #endif
    if (oldVal == 0 || unit->GetMaxHealth() == oldVal)
        return;
    
    RPLLHooks::Power(unit, RPLL_PowerType::RPLL_HEALTH, static_cast<uint32_t>(unit->GetMaxHealth()), static_cast<uint32_t>(unit->GetHealth()));
}

void RPLLUnitHooks::SetPower(const Unit *unit, const Powers powerType, const uint32_t oldVal)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (unit == nullptr)
        return;
    #endif
    if (oldVal == 0 || unit->GetPower(powerType) == oldVal)
        return;

    RPLLHooks::Power(unit, RPLLHooks::mapPowersToRPLLPowerType(powerType), static_cast<uint32_t>(unit->GetMaxPower(powerType)), static_cast<uint32_t>(unit->GetPower(powerType)));
}

void RPLLUnitHooks::SetMaxPower(const Unit *unit, const Powers powerType, const uint32_t oldVal)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (unit == nullptr)
        return;
    #endif
    if (oldVal == 0 || unit->GetMaxPower(powerType) == oldVal)
        return;

    RPLLHooks::Power(unit, RPLLHooks::mapPowersToRPLLPowerType(powerType), static_cast<uint32_t>(unit->GetMaxPower(powerType)), static_cast<uint32_t>(unit->GetPower(powerType)));
}

void RPLLUnitHooks::RemoveOwnedAura(const Aura *aura)
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
    RPLLHooks::AuraApplication(aura->GetCaster(), owner->ToUnit(), static_cast<uint32_t>(aura->GetId()), 0, false);
}

void RPLLUnitHooks::SetOwnerGUID(const Unit *unit, const ObjectGuid owner)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (unit == nullptr)
        return;
    if (!unit->GetGUID().IsUnit() || !owner.IsUnit())
        return;
    #endif
    RPLLHooks::Summon(unit, owner.GetRawValue());
}