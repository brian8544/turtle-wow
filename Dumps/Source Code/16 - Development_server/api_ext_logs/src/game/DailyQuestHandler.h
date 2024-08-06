#pragma once
#include <ctime>
#include <vector>
#include <SystemConfig.h>
#include <Common.h>

constexpr uint32 CheckUpdateTimer = 60 * IN_MILLISECONDS;

class DailyQuestHandler
{
public:
    DailyQuestHandler() : m_nextResetTime(0), m_shouldCheckUpdate(CheckUpdateTimer) {}

    static DailyQuestHandler* Instance()
    {
        static DailyQuestHandler instance;
        return &instance;
    }

    void LoadFromDB(bool quests);
    void Update(uint32 diff);

private:
    time_t m_nextResetTime;
    uint32 m_shouldCheckUpdate;
    std::vector<uint32> m_questIds;
};

#define sDailyQuestHandler DailyQuestHandler::Instance()