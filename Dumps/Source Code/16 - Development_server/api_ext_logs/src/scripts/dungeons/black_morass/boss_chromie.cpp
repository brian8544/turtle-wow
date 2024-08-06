/*
 * Copyright (C) 2021-2022 Nolin (nolin.nolin.nolin.nolin@gmail.org)
 *
 * This is private software and may not be shared under any circumstances,
 * absent permission of Nolin.
 */

#include "scriptPCH.h"
#include "black_morass.h"
#include "boss_chromie.hpp"


class boss_chromieAI : public ScriptedAI
{
public:
    explicit boss_chromieAI(Creature* pCreature) : ScriptedAI(pCreature)
    {
        m_pInstance = static_cast<instance_black_morass*>(pCreature->GetInstanceData());
        boss_chromieAI::Reset();
    }

private:

    bool m_bDidDialog0{};
    bool m_bDidDialog1{};
    bool m_bDidDialog2{};
    bool m_bFriendly{};
    bool m_bIsChronormuSummoned{};
    bool m_bChronormuCombatStarted{};

    float m_fX{}, m_fY{}, m_fZ{};

    uint32 m_uiTeleport_Timer{};
    uint32 m_uiAoeSleep_Timer{};
    uint32 m_uiLightningCloud_Timer{};

    uint32 m_uiChronormu_Timer{};
    uint32 m_uiChronormuCombatStart_Timer{};

    uint32 m_uiDialog0_Timer{};
    uint32 m_uiDialog1_Timer{};
    uint32 m_uiDialog2_Timer{};

    ObjectGuid m_guidChronormu{};

    instance_black_morass* m_pInstance{};

public:
    void Reset() override
    {
        m_bDidDialog0 = false;
        m_bDidDialog1 = false;
        m_bDidDialog2 = false;
        m_bFriendly = false;
        m_bIsChronormuSummoned = false;
        m_bChronormuCombatStarted = false;

        m_fX, m_fY, m_fZ = 0.f;

        m_uiTeleport_Timer = 6000;
        m_uiAoeSleep_Timer = 12000;
        m_uiLightningCloud_Timer = 8000;

        m_uiChronormu_Timer = 3000;
        m_uiChronormuCombatStart_Timer = 46000;

        m_uiDialog0_Timer = 8000;
        m_uiDialog1_Timer = 24000;
        m_uiDialog2_Timer = 40000;

        m_guidChronormu.Clear();
    }

    void Aggro(Unit* /*pWho*/) override
    {
        if (!m_pInstance)
            return;

        m_creature->AddAura(SPELL_PURPLE_PARTICLES_VISUAL);
        m_creature->SetInCombatWithZone();
    }

    void JustSummoned(Creature* pSummoned) override
    {
        if (pSummoned->GetEntry() == NPC_CHRONORMU)
        {
            m_guidChronormu = pSummoned->GetObjectGuid();

            pSummoned->SetFactionTemplateId(FACTION_FRIENDLY);
            pSummoned->ClearTarget();
            pSummoned->AI()->SetCombatMovement(false);
            pSummoned->CastSpell(pSummoned, SPELL_TWIN_TELEPORT_VISUAL, true);
            m_creature->SetFacingTo(m_creature->GetAngle(m_fX, m_fY));

            pSummoned->MonsterYell("You have failed me, my puppet!");

            m_bIsChronormuSummoned = true;
        }
    }

    bool IsFriendly()
    {
        return m_bFriendly;
    }

    void LeaveCombat()
    {
        m_creature->ClearTarget();
        m_creature->ClearInCombat();
        m_creature->CombatStop(true);
        m_creature->UpdateCombatState(false);
        m_creature->UpdateCombatWithZoneState(false);
    }

    void DoDialogue(const uint32& uiDiff)
    {
        if (m_creature->SelectHostileTarget() || m_creature->GetVictim())
        {
            LeaveCombat();
        }

        if (m_uiChronormu_Timer < uiDiff && !m_bIsChronormuSummoned)
        {
            m_creature->SummonCreature(NPC_CHRONORMU, m_fX, m_fY, m_fZ, 0, TEMPSUMMON_CORPSE_TIMED_DESPAWN, 300000);
        }
        else
        {
            m_uiChronormu_Timer -= uiDiff;
        }

        if (m_bIsChronormuSummoned)
        {
            if (m_uiDialog0_Timer < uiDiff && !m_bDidDialog0)
            {
                if (Creature* chronormu{ m_creature->GetMap()->GetCreature(m_guidChronormu) })
                {
                    chronormu->SetFacingToObject(m_creature);
                    chronormu->MonsterSay("Your time here has come to an end, mortals. The dragonflights won't tolerate living in a world inhabited by such evil, greedy and cynical beings.");
                    chronormu->MonsterSay("I ask you again, \"Chromie\", why don't you join me? Why don't you join your wiser self?");

                    m_bDidDialog0 = true;
                }
            }
            else
            {
                m_uiDialog0_Timer -= uiDiff;
            }

            if (m_uiDialog1_Timer < uiDiff && !m_bDidDialog1)
            {
                m_creature->MonsterSay("NEVER! You are set on a final road, one ending timeline, while my hearth still throbs with the hopes of tomorrow. The Sands of Time flows different, shifting day by day, with every choice, yet yours is an never ending sea of still sand. These mortals, with every choice and every action they do they give birth to another future, I rather part of theirs than wither away with you.");

                m_bDidDialog1 = true;
            }
            else
            {
                m_uiDialog1_Timer -= uiDiff;
            }

            if (m_uiDialog2_Timer < uiDiff && !m_bDidDialog2)
            {
                if (Creature* chronormu{ m_creature->GetMap()->GetCreature(m_guidChronormu) })
                {
                    chronormu->MonsterYell("How pitful... I truly believed you'd understand. Come then, mortals, witness your own demise. WITNESS THE CREATION OF A NEW ORCISH ARMY!");

                    m_bDidDialog1 = true;
                }
            }
            else
            {
                m_uiDialog2_Timer -= uiDiff;
            }

            if (m_uiChronormuCombatStart_Timer < uiDiff && !m_bChronormuCombatStarted)
            {
                if (Creature* chronormu{ m_creature->GetMap()->GetCreature(m_guidChronormu) })
                {
                    m_creature->MonsterYell("Now, heroes! Attack now! I'll contain Chronormu's strength!");

                    m_bChronormuCombatStarted = true;
                    m_creature->RemoveAllAuras();

                    DoCast(m_creature, SPELL_GREEN_CHANNELING, true);
                    chronormu->SetObjectScale(.75f);
                    chronormu->AddAura(SPELL_PARTICLES_GREEN);

                    chronormu->SetFactionTemplateId(38);
                    chronormu->AI()->SetCombatMovement(true);
                }
            }
            else
            {
                m_uiChronormuCombatStart_Timer -= uiDiff;
            }
        }
    }

    void UpdateAI(const uint32 uiDiff) override
    {
        if (!IsFriendly())
        {
            if (!m_creature->SelectHostileTarget() || !m_creature->GetVictim())
                return;

            if (m_creature->HealthAbovePct(25))
            {
                if (m_uiTeleport_Timer < uiDiff)
                {
                    if (Unit* pTarget{ m_creature->SelectAttackingTarget(ATTACKING_TARGET_RANDOM, 0, nullptr, SELECT_FLAG_PLAYER) })
                    {
                        m_creature->NearTeleportTo(pTarget->GetPositionX(), pTarget->GetPositionY(), pTarget->GetPositionZ(), m_creature->GetOrientation());
                        DoCastSpellIfCan(pTarget, SPELL_ARCANE_EXPLOSION, CF_TRIGGERED);
                        DoCastSpellIfCan(pTarget, SPELL_KNOCKBACK, CF_TRIGGERED);
                    }

                    m_uiTeleport_Timer = urand(8000, 12000);
                }
                else
                {
                    m_uiTeleport_Timer -= uiDiff;
                }

                if (m_uiLightningCloud_Timer < uiDiff)
                {
                    if (Unit* pTarget{ m_creature->SelectAttackingTarget(ATTACKING_TARGET_RANDOM, 0, nullptr, SELECT_FLAG_PLAYER) })
                    {
                        if (DoCastSpellIfCan(pTarget, SPELL_LIGHTNING_CLOUD, CF_TRIGGERED) == CAST_OK)
                        {
                            m_uiLightningCloud_Timer = 16000;
                        }
                    }
                }
                else
                {
                    m_uiLightningCloud_Timer -= uiDiff;
                }

                if (m_uiAoeSleep_Timer < uiDiff)
                {
                    DoCastAOE(SPELL_AOE_SLEEP, false);

                    m_uiAoeSleep_Timer = 20000;
                }
                else
                {
                    m_uiAoeSleep_Timer -= uiDiff;
                }

                DoMeleeAttackIfReady();
            }
            else
            {
                m_creature->AddUnitState(UNIT_STAT_ROOT);
                m_creature->SetFactionTemplateId(FACTION_FRIENDLY);
                m_bFriendly = true;

                LeaveCombat();

                m_creature->RemoveAllAuras();
                m_creature->RemoveFlag(UNIT_NPC_FLAGS, UNIT_NPC_FLAG_GOSSIP);

                m_creature->MonsterYell("STOP! What is this? I tried to convince her, I mean, me, I mean...");

                m_fX = (m_creature->GetPositionX() + 1.f);
                m_fY = (m_creature->GetPositionY() - 1.f);
                m_fZ = m_creature->GetPositionZ();

                if (Unit* pTarget{ m_creature->SelectAttackingTarget(ATTACKING_TARGET_FARTHEST, 0, nullptr, SELECT_FLAG_PLAYER) })
                {
                    DoCastSpellIfCan(m_creature, SPELL_TWIN_TELEPORT_VISUAL, CF_FORCE_CAST);

                    m_creature->NearTeleportTo((pTarget->GetPositionX() + 1.f), (pTarget->GetPositionY() - 1.f), pTarget->GetPositionZ(), m_creature->GetOrientation());

                    DoPlaySoundToSet(m_creature, SOUND_BODY_OF_KATHUNE);
                }
            }
        }
        else
        {
            DoDialogue(uiDiff);
        }
    }
};

bool GossipHello_chromie(Player* pPlayer, Creature* pCreature)
{
    if (boss_chromieAI* boss_chromie{ dynamic_cast<boss_chromieAI*>(pCreature->AI()) })
    {
        if (!boss_chromie->IsFriendly())
        {
            pPlayer->ADD_GOSSIP_ITEM(GOSSIP_ICON_CHAT, "Chromie? What are you doing here? What is happening?", GOSSIP_SENDER_MAIN, GOSSIP_ACTION_INFO_DEF);
            pPlayer->SEND_GOSSIP_MENU(100004, pCreature->GetGUID());
            return true;
        }
    }

    return false;
}

bool GossipSelect_chromie(Player* pPlayer, Creature* pCreature, const uint32 uiSender, const uint32 uiAction)
{
    pPlayer->CLOSE_GOSSIP_MENU();

    if (uiAction == GOSSIP_ACTION_INFO_DEF)
    {
        pCreature->SetFactionTemplateId(38);
        pCreature->SetInCombatWith(pPlayer);
        pCreature->Attack(pPlayer, true);
        pCreature->UpdateCombatState(true);
        pCreature->UpdateCombatWithZoneState(true);
    }

    return true;
}

CreatureAI* GetAI_boss_chromie(Creature* pCreature)
{
    return new boss_chromieAI(pCreature);
}


void AddSC_boss_chromie()
{
    Script* pNewscript{ new Script };
    pNewscript->Name = "boss_chromie";
    pNewscript->GetAI = &GetAI_boss_chromie;
    pNewscript->RegisterSelf();
}
