#include "AutoScaler.hpp"
#include "Database/DatabaseEnv.h"
#include "Map.h"

#include <mutex>
#include <memory>

// I need to check if creature is an image in order to avoid scaling it
#include "../scripts/dungeons/temple_of_ahnqiraj/boss_skeram.cpp"

using namespace AutoScaling;

// Unused
void AutoScaler::LoadFromDB()
{
    std::unique_ptr<QueryResult> result{ WorldDatabase.Query("SELECT * FROM `disabled_dungeon_scaling`") };

    if (!result)
        return;

    do
    {
        auto fields = result->Fetch();
        disabledScaling.insert(fields[0].GetUInt32());
    } while (result->NextRow());
}

class Read_Mutex_Guard
{
public:
    explicit Read_Mutex_Guard(std::shared_mutex& mut)
        : mut(mut)
    {	// construct and lock
        mut.lock_shared();
    }
    ~Read_Mutex_Guard() noexcept
    {	// unlock
        mut.unlock_shared();
    }

    Read_Mutex_Guard(const Read_Mutex_Guard&) = delete;
    Read_Mutex_Guard& operator=(const Read_Mutex_Guard&) = delete;
private:
    std::shared_mutex& mut;
};

static uint32 disabledMapIds[] =
{
    807
};

void AutoScaler::Scale(DungeonMap* map)
{
    uint32 playerCount = map->GetPlayersCountExceptGMs();
    uint32 maxCount = map->GetMaxPlayers();

    if (std::find(std::begin(disabledMapIds), std::end(disabledMapIds), map->GetId()) != std::end(disabledMapIds))
        return;


    if (maxCount <= 10 || playerCount == maxCount)
        return;
    else if (maxCount == 20 && playerCount < 12)
        playerCount = 12;
    else if (maxCount == 40 && playerCount < 20)
        playerCount = 20;

    // Naxxramas specific
    if (map->GetId() == 533 && playerCount < 35)
        playerCount = 35;


    auto& lock = map->GetObjectLock();
    Read_Mutex_Guard guard{ lock };
    auto& container = const_cast<TypeUnorderedMapContainer<AllMapStoredObjectTypes, ObjectGuid>&>(map->GetObjectStore());

    auto pairItr = container.range<Creature>();
    while (pairItr.first != pairItr.second)
    {
        auto creature = pairItr.first->second;
        if (creature && !creature->IsInCombat())
            ScaleCreature(creature, playerCount, maxCount, map);

        ++pairItr.first;
    }
}

void AutoScaler::ScaleCreature(Creature* creature, uint32 playerCount, uint32 maxCount, Map* map)
{
    if (creature->IsPet() && creature->GetOwner() && creature->GetOwner()->IsPlayer())
        return;

    if (creature->IsDead())
        return;

    float specificHPFactor = 1.f;
    float specificPowerFactor = 1.f;
    float specificDmgFactor = 1.f;

    switch (creature->GetEntry())
    {
        case 12057: // Garr
        {
            if (playerCount < 30)
            {
                specificHPFactor = 0.75f;
                specificDmgFactor = 0.65f;
            }

            break;
        }
        case 12099: // Firesworn, Garr add.
        {
            if (playerCount < 30)
            {
                specificHPFactor = 0.30f;
                specificDmgFactor = 0.15f;
            }

            break;
        }
        case 11661: // Flamewaker, Gehenass add.
        case 12119: // Flamewaker Protector, Lucifron add.
        case 11672: // Core Rager, Golemagg add
        {
            if (playerCount < 30)
            {
                specificDmgFactor = 0.75f;
            }

            break;
        }
        case 11669: // Flame Imp
        {
            if (playerCount < 30)
            {
                specificHPFactor = 0.75f;
                specificDmgFactor = 0.75f;
            }
            break;
        }
        case 11662: // Flamewaker Priest, Sulfuron Harbringer add
        case 11663: // Majordomo Executus healer
        case 11664: // Majordomo Executus elite
        {
            if (playerCount < 30)
            {
                specificHPFactor = 0.75f;
                specificDmgFactor = 0.5f;
            }

            break;
        }
        case 11368: // Bloodseeker bat, Jeklik add
        case 15101: // Zulian Prowler
        {
            if (playerCount < 20)
            {
                specificHPFactor = 0.5f;
                specificDmgFactor = 0.5f;
            }

            break;
        }
        case 12422: // Razorgore the Untamed adds
        case 12420:
        case 12416:
        {
            if (playerCount < 30)
            {
                specificHPFactor = 0.75f;
                specificDmgFactor = 0.35f;
            }

            break;
        }
        case 14022: // Corrupted Dragon whelps
        case 14023:
        case 14024:
        case 14025:
        {
            if (playerCount < 30)
            {
                specificHPFactor = 0.5f;
                specificDmgFactor = 0.75f;
            }

            break;
        }
        case 14261: // Nefarian adds
        case 14262:
        case 14263:
        case 14264:
        case 14265:
        {
            if (playerCount < 30)
            {
                specificHPFactor = 0.65f;
                specificDmgFactor = 0.5f;
            }

            break;
        }
        case 15263:
        {
            if (auto* imageAI = dynamic_cast<boss_skeramAI*>(creature->AI()))
            {
                if (imageAI->IsImage)
                    return;
            }

            break;
        }
    }

    const float hpPercentage = static_cast<float>(playerCount) / static_cast<float>(maxCount) * 100.f;
    auto ScaleHp = [hpPercentage](float value)
    {
        return value / 100 * hpPercentage;
    };

    const float dmgPercentage = (static_cast<float>(playerCount) / static_cast<float>(maxCount) * 100.f) + (maxCount - playerCount);
    auto ScaleDamage = [dmgPercentage](float value)
    {
        return value / 100 * dmgPercentage;
    };

    creature->SetMaxHealth(std::max(1u, static_cast<uint32>(ScaleHp(creature->GetCreateHealth()) * specificHPFactor)));

    if (creature->GetEntry() == 13020) // Valestrasz the Corrupt, set his health to 30% to avoid visual bug before the first pull
        creature->SetHealthPercent(30.0);

    if (baseDamages.find(creature->GetEntry()) == baseDamages.end())
    {
        // store base vals.
        auto tup = std::make_tuple(
                std::make_pair(creature->GetWeaponDamageRange(BASE_ATTACK, MINDAMAGE), creature->GetWeaponDamageRange(BASE_ATTACK, MAXDAMAGE)),
                std::make_pair(creature->GetFloatValue(UNIT_FIELD_MINRANGEDDAMAGE), creature->GetFloatValue(UNIT_FIELD_MAXRANGEDDAMAGE)),
                creature->GetModifierValue(UNIT_MOD_ATTACK_POWER, BASE_VALUE));
        baseDamages[creature->GetEntry()] = std::move(tup);
    }

    auto& tup = baseDamages[creature->GetEntry()];

    creature->SetBaseWeaponDamage(BASE_ATTACK, MINDAMAGE, ScaleDamage(std::get<0>(tup).first) * specificDmgFactor);
    creature->SetBaseWeaponDamage(BASE_ATTACK, MAXDAMAGE, ScaleDamage(std::get<0>(tup).second) * specificDmgFactor);

    creature->SetBaseWeaponDamage(OFF_ATTACK, MINDAMAGE, ScaleDamage(std::get<0>(tup).first) * specificDmgFactor);
    creature->SetBaseWeaponDamage(OFF_ATTACK, MAXDAMAGE, ScaleDamage(std::get<0>(tup).second) * specificDmgFactor);

    creature->SetFloatValue(UNIT_FIELD_MINRANGEDDAMAGE, ScaleDamage(std::get<1>(tup).first) * specificDmgFactor);
    creature->SetFloatValue(UNIT_FIELD_MAXRANGEDDAMAGE, ScaleDamage(std::get<1>(tup).second) * specificDmgFactor);

    creature->SetModifierValue(UNIT_MOD_ATTACK_POWER, BASE_VALUE, ScaleDamage(std::get<2>(tup)) * specificDmgFactor);
}

void AutoScaler::GenerateScaledMoneyLoot(Creature* creature, Loot* loot)
{
    uint32 playerCount = creature->GetMap()->GetPlayersCountExceptGMs();
    const uint32 maxCount = ((DungeonMap*)creature->GetMap())->GetMaxPlayers();
    if (maxCount > 10 && playerCount < maxCount)
    {
        if (maxCount == 20 && playerCount < 12)
            playerCount = 12;
        else if (maxCount == 40 && playerCount < 20)
            playerCount = 20;
    }

    const float gold_factor = static_cast<float>(playerCount) / static_cast<float>(maxCount);
    loot->GenerateMoneyLoot(static_cast<uint32>(creature->GetCreatureInfo()->gold_min * gold_factor),
                            static_cast<uint32>(creature->GetCreatureInfo()->gold_max * gold_factor));
}
