#include "rpll_player_hooks.h"
#define RPLL_SAFETY_CHECKS

void RPLLPlayerHooks::SendNewItem(const Unit *unit, const Item *item, const uint32_t count, const bool received, const bool created, const bool broadcast, const bool sendChatMessage)
{
    #ifdef RPLL_SAFETY_CHECKS
    if (item == nullptr || unit == nullptr)
        return;
    #endif

    if (!created && (broadcast || sendChatMessage) && count >= 1)
        RPLLHooks::Loot(unit, item->GetEntry(), count);
}

void RPLLPlayerHooks::EnvironmentalDamage(Unit *unit, const EnviromentalDamage type, const uint32_t damage, const uint32_t result)
{
    if (result == 0)
        return;

    // CalcAbsorbResist has side effects, so we guess the absorb value here
    uint32_t absorb = 0;
    uint32_t resist = 0;
    if (type == DAMAGE_LAVA || type == DAMAGE_SLIME)
    {
        const uint32_t dmgCopy = damage;
        const DamageInfo dmgInfo(unit, unit, dmgCopy, nullptr, type == DAMAGE_LAVA ? SPELL_SCHOOL_MASK_FIRE : SPELL_SCHOOL_MASK_NATURE, DIRECT_DAMAGE, BASE_ATTACK);
        resist = Unit::CalcSpellResistedDamage(dmgInfo);
        absorb = damage - result - resist;
    }

    RPLL_DamageSchoolMask damageSchoolMask;
    switch (type)
    {
    case DAMAGE_LAVA:
    case DAMAGE_FIRE:
        damageSchoolMask = RPLL_DamageSchoolMask::RPLL_FIRE;
        break;
    case DAMAGE_SLIME:
        damageSchoolMask = RPLL_DamageSchoolMask::RPLL_NATURE;
        break;
    default:
        damageSchoolMask = RPLL_DamageSchoolMask::RPLL_PHYSICAL;
        break;
    }
    RPLLHooks::DealMeleeDamage(unit, unit, RPLL_HitMask::ENVIRONMENT, 0,
                               std::move(RPLLHooks::BuildRPLLDamage(damageSchoolMask, result, resist, absorb)));
}

void RPLLPlayerHooks::SetMap(const Unit *unit)
{
    #ifdef RPLL_SAFETY_CHECKS
        if (unit == nullptr)
            return;
    #endif

    RPLLHooks::Map(unit);
    RPLLHooks::Position(unit, unit->GetPositionX(), unit->GetPositionY(), unit->GetPositionZ(), unit->GetOrientation());
    for (auto aura : unit->GetOwnedAuras())
        RPLLSpellAurasHooks::AuraCreate(aura.second);
    RPLLHooks::Summon(unit, unit->GetOwnerGUID().GetRawValue());
}