/*
 * Copyright (C) 2021-2022 Nolin (nolin.nolin.nolin.nolin@gmail.org)
 *
 * This is private software and may not be shared under any circumstances,
 * absent permission of Nolin.
 */

#include "scriptPCH.h"
#include "black_morass.h"
#include <algorithm>


instance_black_morass::instance_black_morass(Map* pMap) : ScriptedInstance(pMap)
{
    instance_black_morass::Initialize();
}

void instance_black_morass::Initialize()
{
    if (Creature* entityCreature{ instance->SummonCreature(66003, -1591.57f, 7106.07f, 23.73f, 0, TEMPSUMMON_CORPSE_DESPAWN) })
    {
        unknownEntity = entityCreature->GetObjectGuid();
    }
}

void instance_black_morass::OnPlayerEnter(Player* pPlayer)
{
    if (pPlayer)
    {
        pPlayer->PlayDirectMusic(30274, pPlayer);
    }
}

void instance_black_morass::Update(uint32 uiDiff)
{
    bool bDoOnce{ false };

    if (!bDoOnce)
    {
        bDoOnce = true;

        if (Creature* pPortal{ instance->SummonCreature(81048, -1595.23f, 7112.18f, 23.72f, 0, TEMPSUMMON_TIMED_DESPAWN, 5000) })
        {
            DoAfterTime(pPortal, 2 * IN_MILLISECONDS, [Instance = instance]()
            {
                if (Creature* pChromie{ Instance->SummonCreature(91003, -1593.85f, 7111.85f, 23.72f, 0, TEMPSUMMON_DEAD_DESPAWN) })
                {
                    pChromie->CastSpell(pChromie, 26638, false); // Teleport
                    pChromie->SetFacingTo(6.18f);
                    pChromie->HandleEmote(EMOTE_ONESHOT_WAVE);
                    pChromie->PMonsterSay("You did it!");
                }
            });
        }
    }
}

InstanceData* GetInstanceData_instance_black_morass(Map* pMap)
{
    return new instance_black_morass(pMap);
}


void AddSC_instance_black_morass()
{
    Script* pNewscript{ new Script };
    pNewscript->Name = "instance_black_morass";
    pNewscript->GetInstanceData = &GetInstanceData_instance_black_morass;
    pNewscript->RegisterSelf();
}
