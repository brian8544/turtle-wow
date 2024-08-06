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
