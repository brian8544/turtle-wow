/*
SDName: Sunnyglade
SD%Complete:
SDComment:
SDCategory: BG
EndScriptData */

#include "scriptPCH.h"
#include "World.h"

enum SV_Spells
{
    /*human leader*/
    /*orc_leader*/
    SPELL_CLEAVE = 26350,
    SPELL_WARSTOMP = 24375,
    SPELL_REND = 18106,
    SPELL_SUNDER_ARMOR = 24317,
    SPELL_SLOW = 22356,
    SPELL_KNOCK = 20686,
    /*human_footman*/
    /*human_archer*/
    SPELL_AUTOSHOT = 75,
    /*human_conjurer*/
    SPELL_SUMMON_WATER_ELEMENTAL = 0,
    /*human_cleric*/
    /*orc_grunt*/
    /*orc_spearman*/
    /*orc_warlock*/
    /*orc_necrolyte*/
    /**/
    SPELL_TRANSFORM_VISUAL = 24085,
};

enum SV_Events
{
    /*human leader*/
    /*orc_leader*/
    EVENT_CLEAVE,
    EVENT_WARSTOMP,
    EVENT_REND,
    EVENT_SUNDER_ARMOR,
    EVENT_SLOW,
    EVENT_KNOCK,
    EVENT_TRANSFORM,
    /*human_footman*/
    /*human_archer*/
    EVENT_SHOOT,
    /*human_conjurer*/
    EVENT_SUMMON_WATER_ELEMENTAL,
    /*human_cleric*/
    EVENT_HEAL,
    /*orc_grunt*/
    /*orc_spearman*/
    /*orc_warlock*/
    /*orc_necrolyte*/
};

struct SV_heraldAI : public ScriptedAI
{
    SV_heraldAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_0, 13049);
        Reset();
    }

    EventMap m_events;

    void Reset() override
    {
        m_events.Reset();
    }

    void Aggro(Unit* pWho) override
    {
        //m_events.ScheduleEvent(EVENT_HOLY_STRIKE, Seconds(urand(8, 15)));
        //m_events.ScheduleEvent(EVENT_HAMMER_OF_JUSTICE, Seconds(urand(20, 45)));
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        m_events.Update(uiDiff);
        /*while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
            case EVENT_HOLY_STRIKE:
            {
                if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HOLY_STRIKE) == CAST_OK)
                    m_events.Repeat(Seconds(20));
                else
                    m_events.Repeat(100);

                break;
            }
            case EVENT_HAMMER_OF_JUSTICE:
            {
                if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HAMMER_OF_JUSTICE) == CAST_OK)
                    m_events.Repeat(Seconds(30));
                else
                    m_events.Repeat(100);

                break;
            }
            }
        }*/

        DoMeleeAttackIfReady();
    }
};

bool GossipHello_SV_herald(Player* pPlayer, Creature* pCreature)
{
    uint32 gossipTextId = pPlayer->GetGossipTextId(pCreature);
    if (BattleGroundMap* bgMap = dynamic_cast<BattleGroundMap*>(pCreature->GetMap()))
    {
        if (BattleGroundSV* bg = dynamic_cast<BattleGroundSV*>(bgMap->GetBG()))
        {
            if (bg->GetStatus() == STATUS_IN_PROGRESS && !bg->IsGeneralsActive())
            {
                if (bg->GetHeraldControlledTeam() == pPlayer->GetTeam())
                {
                    gossipTextId = 13762;
                    uint32 sparkCount = pPlayer->GetItemCount(81390);

                    if (sparkCount)
                    {
                        std::string text = "I found " + std::to_string(sparkCount) + " Time Sparks, does this help?";
                        pPlayer->ADD_GOSSIP_ITEM(GOSSIP_ICON_CHAT, text.c_str(), GOSSIP_SENDER_MAIN, GOSSIP_ACTION_INFO_DEF);
                    }
                }
                else
                    gossipTextId = 13760;
            }
        }
    }

    pPlayer->SEND_GOSSIP_MENU(gossipTextId, pCreature->GetGUID());
    return true;
}

bool GossipSelect_SV_herald(Player* player, Creature* creature, uint32 sender, uint32 action)
{
    if (action == GOSSIP_ACTION_INFO_DEF)
    {
        if (BattleGroundMap* bgMap = dynamic_cast<BattleGroundMap*>(creature->GetMap()))
        {
            if (BattleGroundSV* bg = dynamic_cast<BattleGroundSV*>(bgMap->GetBG()))
            {
                if (bg->GetStatus() == STATUS_IN_PROGRESS && !bg->IsGeneralsActive())
                {
                    uint32 sparkCount = player->GetItemCount(81390);
                    player->DestroyItemCount(81390, sparkCount, true);

                    bg->AddTeamSparks(player->GetTeamId(), sparkCount);

                    // check here
                    uint32 totalSparks = bg->GetTeamSparks(TEAM_ALLIANCE) + bg->GetTeamSparks(TEAM_HORDE);
                    uint32 maxSparks = sWorld.getConfig(CONFIG_UINT32_BG_SV_SPARK_MAX_COUNT);

                    if (totalSparks >= maxSparks)
                        bg->StartFinalEvent();

                    // if we use npc flag gossip and created gossip with action bg start
                    //player->CLOSE_GOSSIP_MENU();
                    //return true;
                }
            }
        }
    }

    player->CLOSE_GOSSIP_MENU();
    return true;
}

struct SV_human_leaderAI : public ScriptedAI
{
    SV_human_leaderAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_0, 13049);
        Reset();
    }

    EventMap m_events;
    bool m_blackDragon;

    void Reset() override
    {
        m_events.Reset();
        m_blackDragon = false;
    }

    void Aggro(Unit* pWho) override
    {
        m_events.ScheduleEvent(EVENT_CLEAVE, Seconds(10));
        m_events.ScheduleEvent(EVENT_WARSTOMP, Seconds(15));
        m_events.ScheduleEvent(EVENT_REND, Seconds(12));
        m_events.ScheduleEvent(EVENT_SUNDER_ARMOR, Seconds(2));
        m_events.ScheduleEvent(EVENT_SLOW, Seconds(urand(20, 35)));
        m_events.ScheduleEvent(EVENT_KNOCK, Seconds(18));
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        if (!m_blackDragon)
        {
            if (m_creature->GetHealthPercent() < 50.0f)
            {
                m_blackDragon = true;
                DoCast(m_creature, SPELL_TRANSFORM_VISUAL);
                m_events.ScheduleEvent(EVENT_TRANSFORM, 250);
            }
        }

        m_events.Update(uiDiff);
        while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
                case EVENT_CLEAVE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_CLEAVE) == CAST_OK)
                        m_events.Repeat(Seconds(10));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_WARSTOMP:
                {
                    if (DoCastSpellIfCan(m_creature, SPELL_WARSTOMP) == CAST_OK)
                        m_events.Repeat(Seconds(15));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_REND:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_REND) == CAST_OK)
                        m_events.Repeat(Seconds(18));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_SUNDER_ARMOR:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_SUNDER_ARMOR) == CAST_OK)
                        m_events.Repeat(Seconds(25));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_SLOW:
                {
                    if (DoCastSpellIfCan(m_creature, SPELL_SLOW) == CAST_OK)
                        m_events.Repeat(Seconds(20));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_KNOCK:
                {
                    if (DoCastSpellIfCan(m_creature, SPELL_KNOCK) == CAST_OK)
                        m_events.Repeat(Seconds(20));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_TRANSFORM:
                {
                    m_creature->SetDisplayId(18750);
                    break;
                }
            }
        }

        DoMeleeAttackIfReady();
    }
};

struct SV_orc_leaderAI : public ScriptedAI
{
    SV_orc_leaderAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_0, 15260);
        Reset();
    }

    EventMap m_events;
    bool m_blackDragon;

    void Reset() override
    {
        m_events.Reset();
        m_blackDragon = false;
    }

    void Aggro(Unit* pWho) override
    {
        m_events.ScheduleEvent(EVENT_CLEAVE, Seconds(10));
        m_events.ScheduleEvent(EVENT_WARSTOMP, Seconds(15));
        m_events.ScheduleEvent(EVENT_REND, Seconds(12));
        m_events.ScheduleEvent(EVENT_SUNDER_ARMOR, Seconds(2));
        m_events.ScheduleEvent(EVENT_SLOW, Seconds(urand(20, 35)));
        m_events.ScheduleEvent(EVENT_KNOCK, Seconds(18));
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        if (!m_blackDragon)
        {
            if (m_creature->GetHealthPercent() < 50.0f)
            {
                m_blackDragon = true;
                DoCast(m_creature, SPELL_TRANSFORM_VISUAL);
                m_events.ScheduleEvent(EVENT_TRANSFORM, 250);
            }
        }

        m_events.Update(uiDiff);
        while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
                case EVENT_CLEAVE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_CLEAVE) == CAST_OK)
                        m_events.Repeat(Seconds(10));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_WARSTOMP:
                {
                    if (DoCastSpellIfCan(m_creature, SPELL_WARSTOMP) == CAST_OK)
                        m_events.Repeat(Seconds(15));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_REND:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_REND) == CAST_OK)
                        m_events.Repeat(Seconds(18));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_SUNDER_ARMOR:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_SUNDER_ARMOR) == CAST_OK)
                        m_events.Repeat(Seconds(25));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_SLOW:
                {
                    if (DoCastSpellIfCan(m_creature, SPELL_SLOW) == CAST_OK)
                        m_events.Repeat(Seconds(20));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_KNOCK:
                {
                    if (DoCastSpellIfCan(m_creature, SPELL_KNOCK) == CAST_OK)
                        m_events.Repeat(Seconds(20));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_TRANSFORM:
                {
                    m_creature->SetDisplayId(18750);
                    break;
                }
            }
        }

        DoMeleeAttackIfReady();
    }
};

struct SV_human_footmanAI : public ScriptedAI
{
    SV_human_footmanAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_0, 15211);
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_1, 7188);
        Reset();
    }

    EventMap m_events;

    void Reset() override
    {
        m_events.Reset();
    }

    void Aggro(Unit* pWho) override
    {
    }

    void DamageTaken(Unit* pDoneBy, uint32& uiDamage) override
    {
        if (pDoneBy && pDoneBy->GetEntry() == NPC_ORC_GRUNT)
            uiDamage = 0;
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        m_events.Update(uiDiff);
        /*while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
                case EVENT_HOLY_STRIKE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HOLY_STRIKE) == CAST_OK)
                        m_events.Repeat(Seconds(20));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_HAMMER_OF_JUSTICE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HAMMER_OF_JUSTICE, CF_FORCE_CAST) == CAST_OK)
                        m_events.Repeat(Seconds(30));
                    else
                        m_events.Repeat(100);

                    break;
                }
            }
        }*/

        DoMeleeAttackIfReady();
    }
};

struct SV_human_archerAI : public ScriptedAI
{
    SV_human_archerAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_2, 15807);
        Reset();
    }

    EventMap m_events;

    void Reset() override
    {
        m_events.Reset();
    }

    void Aggro(Unit* pWho) override
    {
        m_events.ScheduleEvent(EVENT_SHOOT, Seconds(2));
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        m_events.Update(uiDiff);
        while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
            case EVENT_SHOOT:
            {
                if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_AUTOSHOT) == CAST_OK)
                    m_events.Repeat(Seconds(2));
                else
                    m_events.Repeat(100);

                break;
            }
            }
        }
    }
};

struct SV_human_conjurerAI : public ScriptedAI
{
    SV_human_conjurerAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        Reset();
    }

    EventMap m_events;

    void Reset() override
    {
        m_events.Reset();
    }

    void Aggro(Unit* pWho) override
    {
        m_events.ScheduleEvent(EVENT_SUMMON_WATER_ELEMENTAL, Seconds(5));
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        m_events.Update(uiDiff);
        while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
            case EVENT_SUMMON_WATER_ELEMENTAL:
            {
                m_events.CancelEvent(EVENT_SUMMON_WATER_ELEMENTAL);
                DoCastSpellIfCan(m_creature, SPELL_SUMMON_WATER_ELEMENTAL);
                break;
            }
            }
        }

        DoMeleeAttackIfReady();
    }
};

struct SV_human_clericAI : public ScriptedAI
{
    SV_human_clericAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_0, 13049);
        Reset();
    }

    EventMap m_events;

    void Reset() override
    {
        m_events.Reset();
    }

    void Aggro(Unit* pWho) override
    {
        //m_events.ScheduleEvent(EVENT_HEAL, Seconds(urand(8, 15)));
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        m_events.Update(uiDiff);
        /*while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
                case EVENT_HEAL:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HOLY_STRIKE) == CAST_OK)
                        m_events.Repeat(Seconds(20));
                    else
                        m_events.Repeat(100);

                    break;
                }
            }
        }*/

        DoMeleeAttackIfReady();
    }
};

struct SV_orc_gruntAI : public ScriptedAI
{
    SV_orc_gruntAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_0, 4562);
        Reset();
    }

    EventMap m_events;

    void Reset() override
    {
        m_events.Reset();
    }

    void Aggro(Unit* pWho) override
    {
    }

    void DamageTaken(Unit* pDoneBy, uint32& uiDamage) override
    {
        if (pDoneBy && pDoneBy->GetEntry() == NPC_HUMAN_FOOTMAN)
            uiDamage = 0;
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        m_events.Update(uiDiff);
        /*while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
                case EVENT_HOLY_STRIKE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HOLY_STRIKE) == CAST_OK)
                        m_events.Repeat(Seconds(20));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_HAMMER_OF_JUSTICE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HAMMER_OF_JUSTICE, CF_FORCE_CAST) == CAST_OK)
                        m_events.Repeat(Seconds(30));
                    else
                        m_events.Repeat(100);

                    break;
                }
            }
        }*/

        DoMeleeAttackIfReady();
    }
};

struct SV_orc_spearmanAI : public ScriptedAI
{
    SV_orc_spearmanAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_0, 2023);
        Reset();
    }

    EventMap m_events;

    void Reset() override
    {
        m_events.Reset();
    }

    void Aggro(Unit* pWho) override
    {
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        m_events.Update(uiDiff);
        /*while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
                case EVENT_HOLY_STRIKE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HOLY_STRIKE) == CAST_OK)
                        m_events.Repeat(Seconds(20));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_HAMMER_OF_JUSTICE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HAMMER_OF_JUSTICE, CF_FORCE_CAST) == CAST_OK)
                        m_events.Repeat(Seconds(30));
                    else
                        m_events.Repeat(100);

                    break;
                }
            }
        }*/

        DoMeleeAttackIfReady();
    }
};

struct SV_orc_warlockAI : public ScriptedAI
{
    SV_orc_warlockAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_0, 13078);
        Reset();
    }

    EventMap m_events;

    void Reset() override
    {
        m_events.Reset();
    }

    void Aggro(Unit* pWho) override
    {
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        m_events.Update(uiDiff);
        /*while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
                case EVENT_HOLY_STRIKE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HOLY_STRIKE) == CAST_OK)
                        m_events.Repeat(Seconds(20));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_HAMMER_OF_JUSTICE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HAMMER_OF_JUSTICE, CF_FORCE_CAST) == CAST_OK)
                        m_events.Repeat(Seconds(30));
                    else
                        m_events.Repeat(100);

                    break;
                }
            }
        }*/

        DoMeleeAttackIfReady();
    }
};

struct SV_orc_necrolyteAI : public ScriptedAI
{
    SV_orc_necrolyteAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        me->SetVirtualItem(VIRTUAL_ITEM_SLOT_0, 19214);
        Reset();
    }

    EventMap m_events;

    void Reset() override
    {
        m_events.Reset();
    }

    void Aggro(Unit* pWho) override
    {
        //m_events.ScheduleEvent(EVENT_HOLY_STRIKE, Seconds(urand(8, 15)));
        //m_events.ScheduleEvent(EVENT_HAMMER_OF_JUSTICE, Seconds(urand(20, 45)));
    }

    void UpdateAI(uint32 const uiDiff)  override
    {
        if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
            return;

        m_events.Update(uiDiff);
        /*while (auto l_EventId = m_events.ExecuteEvent())
        {
            switch (l_EventId)
            {
                case EVENT_HOLY_STRIKE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HOLY_STRIKE) == CAST_OK)
                        m_events.Repeat(Seconds(20));
                    else
                        m_events.Repeat(100);

                    break;
                }
                case EVENT_HAMMER_OF_JUSTICE:
                {
                    if (DoCastSpellIfCan(m_creature->GetVictim(), SPELL_HAMMER_OF_JUSTICE, CF_FORCE_CAST) == CAST_OK)
                        m_events.Repeat(Seconds(30));
                    else
                        m_events.Repeat(100);

                    break;
                }
            }
        }*/

        DoMeleeAttackIfReady();
    }
};

CreatureAI* GetAI_SV_herald(Creature* pCreature)
{
    return new SV_heraldAI(pCreature);
}

CreatureAI* GetAI_SV_human_leader(Creature* pCreature)
{
    return new SV_human_leaderAI(pCreature);
}

CreatureAI* GetAI_SV_orc_leader(Creature* pCreature)
{
    return new SV_orc_leaderAI(pCreature);
}

CreatureAI* GetAI_SV_human_footman(Creature* pCreature)
{
    return new SV_human_footmanAI(pCreature);
}

CreatureAI* GetAI_SV_human_archer(Creature* pCreature)
{
    return new SV_human_archerAI(pCreature);
}

CreatureAI* GetAI_SV_human_conjurer(Creature* pCreature)
{
    return new SV_human_conjurerAI(pCreature);
}

CreatureAI* GetAI_SV_human_cleric(Creature* pCreature)
{
    return new SV_human_clericAI(pCreature);
}

CreatureAI* GetAI_SV_orc_grunt(Creature* pCreature)
{
    return new SV_orc_gruntAI(pCreature);
}

CreatureAI* GetAI_SV_orc_spearman(Creature* pCreature)
{
    return new SV_orc_spearmanAI(pCreature);
}

CreatureAI* GetAI_SV_orc_warlock(Creature* pCreature)
{
    return new SV_orc_warlockAI(pCreature);
}

CreatureAI* GetAI_SV_orc_necrolyte(Creature* pCreature)
{
    return new SV_orc_necrolyteAI(pCreature);
}

void AddSC_bg_sunnyglade()
{
    Script* newscript;
    newscript = new Script;
    newscript->Name = "npc_sv_herald";
    newscript->GetAI = &GetAI_SV_herald;
    newscript->pGossipHello = &GossipHello_SV_herald;
    newscript->pGossipSelect = &GossipSelect_SV_herald;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "npc_sv_human_leader";
    newscript->GetAI = &GetAI_SV_human_leader;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "npc_sv_orc_leader";
    newscript->GetAI = &GetAI_SV_orc_leader;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "npc_sv_human_footman";
    newscript->GetAI = &GetAI_SV_human_footman;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "npc_sv_human_archer";
    newscript->GetAI = &GetAI_SV_human_archer;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "npc_sv_human_conjurer";
    newscript->GetAI = &GetAI_SV_human_conjurer;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "npc_sv_human_cleric";
    newscript->GetAI = &GetAI_SV_human_cleric;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "npc_sv_orc_grunt";
    newscript->GetAI = &GetAI_SV_orc_grunt;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "npc_sv_orc_spearman";
    newscript->GetAI = &GetAI_SV_orc_spearman;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "npc_sv_orc_warlock";
    newscript->GetAI = &GetAI_SV_orc_warlock;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "npc_sv_orc_necrolyte";
    newscript->GetAI = &GetAI_SV_orc_necrolyte;
    newscript->RegisterSelf();
}