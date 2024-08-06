#include "scriptPCH.h"

struct custom_dungeon_portal : public GameObjectAI
{
    explicit custom_dungeon_portal(GameObject* pGo) : GameObjectAI(pGo)
    {
        m_uiUpdateTimer = 300;
    }

    uint32 m_uiUpdateTimer{};

    void UpdateAI(uint32 const uiDiff) override
    {
        if (m_uiUpdateTimer < uiDiff)
        {
            using namespace std;
            using namespace MaNGOS;

            list<Player*> players;
            AnyPlayerInObjectRangeCheck check(me, 4.0f, true, false);
            PlayerListSearcher<AnyPlayerInObjectRangeCheck> searcher(players, check);
            Cell::VisitWorldObjects(me, searcher, 4.0f);

            for (Player* player : players)
            {
                bool available{ true };

                switch (me->GetEntry())
                {
                    case 112920: // Scarlet Citadel
                    {
                        player->GetSession()->SendNotification("This raid is currently not available.");
                        available = false;
                        break;
                    }
                    case 112923: // Caverns of Time Placeholder Portal I  (Entrance)
                    case 112924: // Caverns of Time Placeholder Portal II (Entrance)
                    case 112915: // Black Morass
                    {
                        player->GetSession()->SendNotification("This dungeon is currently not available.");
                        available = false;
                        break;
                    }
                }

                if (!player->IsAlive())
                {
                    player->ResurrectPlayer(.5f);
                    player->SpawnCorpseBones();
                }

                static std::array<std::tuple<uint32, WorldLocation, uint32>, 10> portals_and_locations =
                { {
                    { 181580, WorldLocation{800, -11068.1F, -1806.4F, 52.7F, 1.5F}, 55 },  // Karazhan Crypt (Entrance)
                    { 181581, WorldLocation{0, -11068.9F, -1828.6F, 60.26F, 3.1F},  1 },   // Karazhan Crypt (Exit)
                    { 112911, WorldLocation{802, 579.13F, 90.70F, 276.11F, 3.4F},   32 },  // The Crescent Grove (Entrance)
                    { 112912, WorldLocation{1, 1722.0F, -1272.6F, 163.26F, 5.8F},   1 },   // The Crescent Grove (Exit)
                    { 112915, WorldLocation{269, -2002.5F, 6575.3F, -154.9F, 5.7F}, 58 },  // Black Morass (Entrance)
                    { 112916, WorldLocation{1, -8756.8F, -4191.3F, -209.4F, 5.5F},  1 },   // Black Morass (Exit)
                    { 112917, WorldLocation{35, -1.15F, 44.4F, -25.58F, 1.6F},      58 },  // Stromwind Vault (Entrance)
                    { 112918, WorldLocation{0, -8679.11F, 639.33F, 95.81F, 2.29F},  1 },   // Stromwind Vault (Exit)      
                    { 112940, WorldLocation{808, -8173.9F, -3120.6F, 199.8F, 4.7F}, 48 },  // Hateforge Quarry (Entrance)
                    { 112941, WorldLocation{0, -8169.2F, -3106.71F, 200.4F, 1.1F},  1 },   // Hateforge Quarry (Exit)   
                } };

                for (auto const& teleport : portals_and_locations)
                {
                    const auto& [portal_id, destination, min_level] = teleport;
                    if (me->GetEntry() == portal_id)
                    {

                        if (player->GetLevel() >= min_level)
                        {
                            if (available || player->IsGameMaster())
                            {
                                player->TeleportTo(destination);
                            }
                        }
                        else
                        {
                            player->GetSession()->SendNotification("Your level is too low.");
                        }
                    }
                }
            }

            m_uiUpdateTimer = 500;
        }
        else
        {
            m_uiUpdateTimer -= uiDiff;
        }
    }
};

GameObjectAI* GetAI_custom_dungeon_portal(GameObject* gameobject) { return new custom_dungeon_portal(gameobject); }

void AddSC_custom_teleports()
{
    Script* newscript;

    newscript = new Script;
    newscript->Name = "custom_dungeon_portal";
    newscript->GOGetAI = &GetAI_custom_dungeon_portal;
    newscript->RegisterSelf();   
}
