#include "scriptPCH.h"

using namespace std;

template <typename Functor>
void DoAfterTime(Player* player, uint32 p_time, Functor&& function)
{
    player->m_Events.AddEvent(new LambdaBasicEvent<Functor>(std::move(function)), player->m_Events.CalculateTime(p_time));
}

enum mob_entries
{
    maddened_guard = 60597,
    hungry_rat = 93105,
    black_bride = 80850,
    thamgrarr = 80852,
    aszosh_grimflame = 80853,
    damian = 80854
};

enum object_entries
{
    NPC_VAULT_RAT   = 93106,
    GO_RAT_DOOR_ONE = 3000275,
    GO_RAT_DOOR_TWO = 3000276,
};

const string dialog_lines[3] = { 
    "Do you hear them?! In the walls... They're always watching!",
    "What even are you?! The watchers sent you, you're going to rip us apart!",
    "There is no leaving, not for any of us, they block our escape..."
};

struct instance_stormwind_vault : public ScriptedInstance
{
    explicit instance_stormwind_vault(Map* p_Map) : ScriptedInstance(p_Map)
    {
        Initialize();
    };

    bool bride_killed;
    bool thamgrarr_killed;
    bool aszosh_killed;
    bool damian_killed;

    void Initialize() override
    {
        bride_killed = false;
        thamgrarr_killed = false;
        aszosh_killed = false;
        damian_killed = false;
    }

    void OnCreatureEnterCombat(Creature* pCreature) override
    {
        if (pCreature->IsAlive() && !pCreature->IsInCombat())
            pCreature->SetInCombatWithZone();

        switch (pCreature->GetEntry())
        {
        case maddened_guard:
            int32 line = urand(0, 2);
            int32 chance = urand(0, 100);
            if (chance > 70)
                pCreature->PMonsterSay("%s", dialog_lines[line].c_str());
            break;
        }
    }

    void OnCreatureDeath(Creature* boss) override
    {
        switch (boss->GetEntry())
        {
        case black_bride:
        case thamgrarr: 
        case aszosh_grimflame: 
        case damian: 

            if (black_bride) bride_killed = true;             
            if (thamgrarr) thamgrarr_killed = true; 
            if (aszosh_grimflame) aszosh_killed = true; 
            if (damian) damian_killed = true;

            if (bride_killed && thamgrarr_killed && aszosh_killed && damian_killed)
            {
                GameObject* vault_door = boss->FindNearestGameObject(4000509, 1500.0f);
                vault_door->UseDoorOrButton(10800);
                break;
            }
        }
    }
};

InstanceData* GetInstanceData_instance_stormwind_vault(Map* p_Map) { return new instance_stormwind_vault(p_Map); }

struct stormwind_vault_rat_trap : public GameObjectAI
{
    explicit stormwind_vault_rat_trap(GameObject* pGo) : GameObjectAI(pGo)
    {
        m_uiStep = 0;
        m_uiUpdateTimer = 300;
    }

    uint32 m_uiStep;
    uint32 m_uiUpdateTimer;

    void UpdateAI(uint32 const uiDiff) override
    {
        if (m_uiUpdateTimer < uiDiff)
        {
            if (me->GetMapId() != 35)
            {
                me->MonsterYell("Object spawned on wrong map!");
                return;
            }

            switch (m_uiStep)
            {
                case 0: // Not Activated
                {
                    if (Player* pPlayer = me->FindNearestPlayer(5.0f))
                    {
                        pPlayer->PlayDirectMusic(8740);
                        if (GameObject* pDoor = me->FindNearestGameObject(GO_RAT_DOOR_ONE, 20.0F))
                            pDoor->SetGoState(GO_STATE_READY);
                        if (GameObject* pDoor = me->FindNearestGameObject(GO_RAT_DOOR_TWO, 20.0F))
                            pDoor->SetGoState(GO_STATE_READY);
                        m_uiStep = 1;
                        m_uiUpdateTimer = 1000;
                    }
                    else
                        m_uiUpdateTimer = 300;
                    break;
                }
                case 1: // Summon Mobs
                {
                    if (Player* pPlayer = me->FindNearestPlayer(5.0f))
                    {
                        for (int i = 0; i < 15; ++i)
                        {
                            if (Creature* pMob = pPlayer->SummonCreature(NPC_VAULT_RAT, pPlayer->GetPositionX() + urand(1, 4), pPlayer->GetPositionY() + urand(1, 4), pPlayer->GetPositionZ(), pPlayer->GetOrientation(), TEMPSUMMON_TIMED_OR_CORPSE_DESPAWN, 350 * IN_MILLISECONDS))
                                pMob->AI()->AttackStart(pPlayer);
                        }
                    }
                    m_uiStep = 2;
                    m_uiUpdateTimer = 1000;
                    break;
                }
                case 2: // Wait For Clear
                {
                    if (!me->FindNearestPlayer(5.0f) || !me->FindNearestCreature(NPC_VAULT_RAT, 5.0f))
                    {
                        if (GameObject* pDoor = me->FindNearestGameObject(GO_RAT_DOOR_ONE, 20.0F))
                            pDoor->SetGoState(GO_STATE_ACTIVE);
                        if (GameObject* pDoor = me->FindNearestGameObject(GO_RAT_DOOR_TWO, 20.0F))
                            pDoor->SetGoState(GO_STATE_ACTIVE);
                        m_uiStep = 0;
                        m_uiUpdateTimer = 60 * MINUTE * IN_MILLISECONDS;
                    }
                    else
                        m_uiUpdateTimer = 1000;
                    break;
                }
            }
        }
        else
            m_uiUpdateTimer -= uiDiff;
    }
};

GameObjectAI* GetAI_stormwind_vault_rat_trap(GameObject* gameobject) { return new stormwind_vault_rat_trap(gameobject); }

void AddSC_instance_stormwind_vaults()
{
    Script* newscript;

    newscript = new Script;
    newscript->Name = "instance_stormwind_vault";
    newscript->GetInstanceData = &GetInstanceData_instance_stormwind_vault;
    newscript->RegisterSelf();

    newscript = new Script;
    newscript->Name = "stormwind_vault_rat_trap";
    newscript->GOGetAI = &GetAI_stormwind_vault_rat_trap;
    newscript->RegisterSelf();
}
