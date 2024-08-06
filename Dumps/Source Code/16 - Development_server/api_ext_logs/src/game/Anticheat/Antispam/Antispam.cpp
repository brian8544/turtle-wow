#include <regex>
#include <string>
#include <algorithm>

#include "Database/DatabaseEnv.h"
#include "Util.h"
#include "World.h"
#include "ObjectAccessor.h"
#include "ChannelMgr.h"
#include "Guild.h"
#include "Chat.h"
#include "Anticheat.h"
#include "Antispam.h"

Antispam& Antispam::Instance()
{
    static Antispam antispam;
    return antispam;
}

static inline void ReplaceAll(std::string &str, const std::string& from, const std::string& to)
{
    size_t startPos = 0;
    while ((startPos = str.find(from, startPos)) != std::string::npos)
    {
        str.replace(startPos, from.length(), to);
        startPos += to.length();
    }
}

static inline void ReplaceAllW(std::wstring &str, const std::wstring& from, const std::wstring& to)
{
    size_t startPos = 0;
    while ((startPos = str.find(from, startPos)) != std::wstring::npos)
    {
        str.replace(startPos, from.length(), to);
        startPos += to.length();
    }
}

void AntispamAsyncWorker(Antispam *antispam)
{
    using namespace std::chrono_literals;
    LoginDatabase.ThreadStart();
    auto prevNow = Clock::now();
    while (!sWorld.IsStopped())
    {
        auto currNow = Clock::now();
        auto diff = std::chrono::duration_cast<std::chrono::milliseconds>(currNow - prevNow).count();
        antispam->ProcessMessages(diff);
        prevNow = currNow;
        std::this_thread::sleep_for(100ms);
    }
    LoginDatabase.ThreadEnd();
}

Antispam::Antispam()
    :   m_enabled(false), m_restrictionLevel(0), m_originalNormalizeMask(0), m_fullyNormalizeMask(0),
        m_threshold(0), m_mutetime(0), m_chatMask(0), m_worker(), m_banEnabled(false), m_detectThreshold(3),
        m_messageBlockSize(5), m_updateTimer(60000), m_messageRepeatCount(5), m_frequencyCount(5.0f), m_frequencyTime(6.0f),
        m_mergeAllWhispers(false)
{
    m_frequencyCoeff = m_frequencyCount / m_frequencyTime;
}

void Antispam::LoadFromDB()
{
    sLog.outString("Loading table 'antispam_blacklist'");
    m_blackList.clear();

    QueryResult* result = LoginDatabase.Query("SELECT * FROM antispam_blacklist");
    if (result)
    {
        do
        {
            auto fields = result->Fetch();
            m_blackList.insert(fields[0].GetCppString());
        }
        while (result->NextRow());
        delete result;
    }

    sLog.outString(">> %u blacklist words loaded", m_blackList.size());
    sLog.outString();

    sLog.outString("Loading table 'antispam_replacement'");
    m_replacement.clear();

    result = LoginDatabase.Query("SELECT * FROM antispam_replacement");
    if (result)
    {
        do
        {
            auto fields = result->Fetch();
            m_replacement[fields[0].GetCppString()] = fields[1].GetCppString();
        }
        while (result->NextRow());
        delete result;
    }

    sLog.outString(">> %u replacements loaded", m_replacement.size());
    sLog.outString();

    sLog.outString("Loading table 'antispam_scores'");

    m_scores[MSG_TYPE_NORMALIZED].clear();
    m_scores[MSG_TYPE_ORIGINAL].clear();

    result = LoginDatabase.Query("SELECT * FROM antispam_scores");
    if (result)
    {
        do
        {
            auto fields = result->Fetch();
            m_scores[fields[2].GetUInt8()][fields[0].GetCppString()] = fields[1].GetInt32();
        }
        while (result->NextRow());
        delete result;
    }

    sLog.outString(">> %u scores loaded", m_scores[MSG_TYPE_NORMALIZED].size() + m_scores[MSG_TYPE_ORIGINAL].size());
    sLog.outString();
    
    sLog.outString("Loading table 'antispam_unicode'");
    m_unicode.clear();

    result = LoginDatabase.Query("SELECT * FROM antispam_unicode");
    if (result)
    {
        std::wostringstream wss;
        do
        {
            auto fields = result->Fetch();
            wss.str(std::wstring());
            wss << wchar_t(fields[0].GetUInt32());
            std::wstring key = wss.str();
            wss.str(std::wstring());
            wss << wchar_t(fields[1].GetUInt32());
            std::wstring value = wss.str();
            m_unicode[key] = value;
        }
        while (result->NextRow());
        delete result;
    }

    sLog.outString(">> %u unicode symbols loaded", m_unicode.size());
    sLog.outString();
}

void Antispam::LoadConfig()
{
    LoadFromDB(); // temporary solution for reload from game

    m_enabled = sWorld.getConfig(CONFIG_BOOL_AC_ANTISPAM_ENABLED);
    m_restrictionLevel = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_MAX_RESTRICTION_LEVEL);
    m_originalNormalizeMask = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_ORIGINAL_NORMALIZE_MASK);
    m_fullyNormalizeMask = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_FULLY_NORMALIZE_MASK);
    m_threshold = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_SCORE_THRESHOLD);
    m_mutetime = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_MUTETIME);
    m_chatMask = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_CHAT_MASK);

    m_mergeAllWhispers = sWorld.getConfig(CONFIG_BOOL_AC_ANTISPAM_MERGE_ALL_WHISPERS);
    m_banEnabled = sWorld.getConfig(CONFIG_BOOL_AC_ANTISPAM_BAN_ENABLED);
    m_detectThreshold = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_DETECT_THRESHOLD);
    m_messageRepeatCount = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_REPEAT_COUNT);
    m_updateTimer = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_UPDATE_TIMER);
    m_messageBlockSize = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_MESSAGE_BLOCK_SIZE);
    m_frequencyTime = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_FREQUENCY_TIME);
    m_frequencyCount = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_FREQUENCY_COUNT);
    m_frequencyCoeff = m_frequencyCount / m_frequencyTime;

    if (!m_worker.joinable())
        m_worker = std::thread(AntispamAsyncWorker, this);
}

bool Antispam::AddMessage(std::string const& msg, uint32 language, uint32 type, PlayerPointer from, PlayerPointer to, Channel* channel, Guild* guild)
{
    if (!m_enabled || from->IsGameMaster() || to && to->IsGameMaster())
        return true;

    if (from->GetLevel() > m_restrictionLevel)
        return true;

    uint8 chatType = GetConvertedChatType(type);

    if (chatType == A_CHAT_TYPE_MAX)
        return true;

    if (m_chatMask && (m_chatMask & (1 << chatType)) == 0)
        return true;

    MessageBlock messageBlock;
    messageBlock.fromGuid = from->GetObjectGuid();
    messageBlock.fromAccount = from->GetSession()->GetAccountId();
    messageBlock.toGuid = (to && !m_mergeAllWhispers ? to->GetObjectGuid() : ObjectGuid());
    messageBlock.msg = msg;
    messageBlock.language = language;
    messageBlock.type = chatType;
    messageBlock.count = 1;
    messageBlock.time = time(nullptr);
    messageBlock.channel = channel;
    messageBlock.guild = guild;

    std::lock_guard<std::mutex> guard(m_messageMutex);
    m_messageQueue.push_back(messageBlock);
    return false;
}

struct FindMsg
{
    FindMsg(const std::string& m) : msg(m) {}
    bool operator()(const std::string& s) { return s == msg; }

    private:
        const std::string& msg;
};

void Antispam::ProcessMessages(uint32 diff)
{
    if (m_updateTimer <= diff)
    {
        m_updateTimer = sWorld.getConfig(CONFIG_UINT32_AC_ANTISPAM_UPDATE_TIMER);
        m_mutedAccounts.clear();

        for (auto i = 0; i < A_CHAT_TYPE_MAX; ++i)
        {
            m_messageBlocks[i].clear();
            m_messageCounters[i].clear();
            m_messageRepeats[i].clear();
        }
    }
    else
        m_updateTimer -= diff;

    std::vector<MessageBlock> tempMessageQueue;
    {
        std::lock_guard<std::mutex> guard(m_messageMutex);
        std::swap(m_messageQueue, tempMessageQueue);
    }

    for (auto const& messageBlock : tempMessageQueue)
    {
        if (IsMuted(messageBlock.fromAccount))
            continue;

        auto type = messageBlock.type;
        auto guidFrom = messageBlock.fromGuid.GetCounter();
        auto guidTo = messageBlock.toGuid.GetCounter();

        LowGuidPair lowGuidPair(guidFrom, guidTo);

        m_messageRepeats[type][guidFrom].push_back(messageBlock.msg);

        auto counter = m_messageCounters[type].find(guidFrom);
        auto hasCounter = counter != m_messageCounters[type].end();

        if (hasCounter)
        {
            counter->second.count++;
            counter->second.timeDiff = counter->second.timeDiff + (messageBlock.time - counter->second.timeLast);
            counter->second.timeLast = messageBlock.time;
        }
        else
        {
            MessageCounter messageCounter;
            messageCounter.count = 1;
            messageCounter.timeDiff = 0;
            messageCounter.timeLast = messageBlock.time;
            messageCounter.detectMarker = false;
            m_messageCounters[type][guidFrom] = messageCounter;
        }

        if (hasCounter)
        {
            auto repeats = std::count_if(m_messageRepeats[type][guidFrom].begin(), m_messageRepeats[type][guidFrom].end(), FindMsg(messageBlock.msg));
            if (repeats > m_messageRepeatCount)
            {
                ApplySanction(messageBlock, DETECT_FLOOD, repeats);
                continue;
            }

            if (counter->second.detectMarker || !m_frequencyCount ||
                ((counter->second.count >= m_frequencyCount) && ((counter->second.count / m_frequencyCoeff) > counter->second.timeDiff)))
            {
                counter->second.detectMarker = true;

                auto itr = m_messageBlocks[type].find(lowGuidPair);
                if (itr != m_messageBlocks[type].end())
                {
                    itr->second.msg.append(messageBlock.msg);
                    itr->second.count++;

                    if (FilterMessage(itr->second.msg))
                    {
                        ApplySanction(itr->second, DETECT_SEPARATED);
                        m_messageBlocks[type].erase(itr);
                        continue;
                    }

                    if (itr->second.count == m_messageBlockSize)
                        m_messageBlocks[type].erase(itr);

                }
                else if (FilterMessage(messageBlock.msg))
                {
                    ApplySanction(messageBlock, DETECT_STANDARD);
                    continue;
                }
                else
                    m_messageBlocks[type][lowGuidPair] = messageBlock;
            }
            else if (FilterMessage(messageBlock.msg))
            {
                ApplySanction(messageBlock, DETECT_STANDARD);
                continue;
            }
        }
        else if (FilterMessage(messageBlock.msg))
        {
            ApplySanction(messageBlock, DETECT_STANDARD);
            continue;
        }
        else if (!m_frequencyCount)
            m_messageBlocks[type][lowGuidPair] = messageBlock;

        switch (messageBlock.type)
        {
            case A_CHAT_TYPE_WHISPER:
            {
                if (MasterPlayer* pSender = ObjectAccessor::FindMasterPlayer(messageBlock.fromGuid))
                {
                    if (MasterPlayer* pReceiver = ObjectAccessor::FindMasterPlayer(messageBlock.toGuid))
                    {
                        pSender->Whisper(messageBlock.msg, messageBlock.language, pReceiver, true);
                    }
                }
                break;
            }
            case A_CHAT_TYPE_CHANNEL:
            {
                if (messageBlock.channel)
                    messageBlock.channel->Say(messageBlock.fromGuid, messageBlock.msg.c_str(), messageBlock.language);
                break;
            }
            case A_CHAT_TYPE_GUILD:
            {
                if (MasterPlayer* pSender = ObjectAccessor::FindMasterPlayer(messageBlock.fromGuid))
                {
                    if (messageBlock.guild)
                        messageBlock.guild->BroadcastToGuild(pSender, messageBlock.msg, LANG_UNIVERSAL);
                }
                break;
            }
        }
    }
}

std::string Antispam::NormalizeMessage(const std::string& msg, uint32 mask)
{
    auto newMsg = msg;

    if (!mask)
        mask = m_fullyNormalizeMask;

    if (mask & NF_CUT_COLOR)
    {
        static std::regex regex1("(\\|c\\w{8})");
        static std::regex regex2("(\\|H[\\w|\\W]{1,}\\|h)");
        newMsg = std::regex_replace(newMsg, regex1, "");
        ReplaceAll(newMsg, "|h|r", "");
        newMsg = std::regex_replace(newMsg, regex2, "");
    }

    if (mask & NF_REPLACE_WORDS)
        for (auto& e : m_replacement)
            ReplaceAll(newMsg, e.first, e.second);
    
    if (mask & NF_CUT_CTRL)
    {
        static std::regex regex4("([[:cntrl:]]+)");
        newMsg = std::regex_replace(newMsg, regex4, "");
    }

    if (mask & NF_CUT_PUNCT)
    {
        static std::regex regex5("([[:punct:]]+)");
        newMsg = std::regex_replace(newMsg, regex5, "");
    }

    if (mask & NF_CUT_SPACE)
    {
        static std::regex regex6("(\\s+|_)");
        newMsg = std::regex_replace(newMsg, regex6, "");
    }

    if (mask & NF_CUT_NUMBERS)
    {
        static std::regex regex3("(\\d+)");
        newMsg = std::regex_replace(newMsg, regex3, "");
    }

    if (mask & NF_REPLACE_UNICODE)
    {
        std::wstring w_tempMsg, w_tempMsg2;
        Utf8toWStr(newMsg, w_tempMsg);
        wstrToUpper(w_tempMsg);

        if (!isBasicLatinString(w_tempMsg, true))
        {
            for (auto& s : m_unicode)
                ReplaceAllW(w_tempMsg, s.first, s.second);

            if (mask & NF_REMOVE_NON_LATIN)
            {
                for (size_t i = 0; i < w_tempMsg.size(); ++i)
                    if (isBasicLatinCharacter(w_tempMsg[i]) || isNumeric(w_tempMsg[i]))
                        w_tempMsg2.push_back(w_tempMsg[i]);
            }
            else
                w_tempMsg2 = w_tempMsg;
        }
        else
            w_tempMsg2 = w_tempMsg;

        newMsg = std::string(w_tempMsg2.begin(), w_tempMsg2.end());
    }
    else
        std::transform(newMsg.begin(), newMsg.end(), newMsg.begin(), ::toupper);

    if (mask & NF_REMOVE_REPEATS)
        newMsg.erase(std::unique(newMsg.begin(), newMsg.end()), newMsg.end());

    return newMsg;
}

bool Antispam::FilterMessage(const std::string &msg)
{
    auto normMsg = NormalizeMessage(msg);
    auto origMsg = NormalizeMessage(msg, m_originalNormalizeMask);

    bool block = false;
    uint32 score = 0;

    for (auto& word : m_blackList)
    {
        if (origMsg.find(word) != std::string::npos ||
            normMsg.find(word) != std::string::npos)
        {
            block = true;
            break;
        }
    }

    if (!block)
    {
        for (auto& word : m_scores[MSG_TYPE_NORMALIZED])
            if (normMsg.find(word.first) != std::string::npos)
                score += word.second;

        for (auto& word : m_scores[MSG_TYPE_ORIGINAL])
            if (origMsg.find(word.first) != std::string::npos)
                score += word.second;

        if (score > m_threshold)
            block = true;
    }

    return block;
}

void Antispam::LogSpam(MessageBlock const& messageBlock, std::string const& reason)
{
    sLog.outSpam("[Acc %u][Char %u][Reason %s] %s", messageBlock.fromAccount, messageBlock.fromGuid.GetCounter(), reason.c_str(), messageBlock.msg.c_str());
}

void Antispam::ApplySanction(MessageBlock const& messageBlock, uint32 detectType, uint32 repeats)
{
    auto chatType = std::to_string(messageBlock.type);

    switch (detectType)
    {
        case DETECT_STANDARD:
            LogSpam(messageBlock, "DETECT_STANDARD, chatType " + chatType);
            break;
        case DETECT_SEPARATED:
            LogSpam(messageBlock, "DETECT_SEPARATED, chatType " + chatType);
            break;
        case DETECT_FLOOD:
            std::string reason = "DETECT_FLOOD, " + std::to_string(repeats) + " repeats, chatType " + chatType;
            LogSpam(messageBlock, reason);
            break;
    }

    Mute(messageBlock.fromAccount);
    ChannelMgr::AnnounceBothFactionsChannel("ChatSpam", messageBlock.fromGuid, messageBlock.msg.c_str());

    auto itr = m_detectScores.find(messageBlock.fromAccount);
    if (itr == m_detectScores.end())
        itr = m_detectScores.insert({ messageBlock.fromAccount, 1 }).first;
    else
        itr->second++;

    if (itr->second >= m_detectThreshold)
    {
        LogSpam(messageBlock, "BAN SANCTION");
        if (m_banEnabled)
        {
            sWorld.BanAccount(messageBlock.fromAccount, HOUR, "Spam detected. See details in logs.", "Antispam");
        }
    }

    m_mutedMessages[messageBlock.fromAccount].insert(messageBlock.msg);
}

bool Antispam::IsMuted(uint32 accountId, bool checkChatType, uint32 chatType) const
{
    if (checkChatType)
    {
        uint8 type = GetConvertedChatType(chatType);
        if (type == A_CHAT_TYPE_MAX || (m_chatMask && (m_chatMask & (1 << type)) == 0))
            return false;
    }

    auto itr = m_mutedAccounts.find(accountId);
    if (itr != m_mutedAccounts.end())
        return true;

    return false;
}

void Antispam::Mute(uint32 accountId)
{
    m_mutedAccounts.insert(accountId);
}

void Antispam::Unmute(uint32 accountId)
{
    m_mutedAccounts.erase(accountId);
    m_detectScores.erase(accountId);
}

void Antispam::ShowMuted(WorldSession* session)
{
    if (m_mutedAccounts.empty())
    {
        ChatHandler(session).SendSysMessage("No muted spamers");
        return;
    }

    ChatHandler(session).SendSysMessage("Muted spamers accounts list:");
    for (auto& e : m_mutedAccounts)
        ChatHandler(session).SendSysMessage(std::to_string(e).c_str());
}

void Antispam::BlacklistWord(std::string word)
{
    m_blackList.insert(word);

    LoginDatabase.escape_string(word);
    LoginDatabase.PExecute("REPLACE INTO `antispam_blacklist` (`word`) VALUES ('%s')", word.c_str());
}

void Antispam::WhitelistWord(std::string word)
{
    m_blackList.erase(word);

    LoginDatabase.escape_string(word);
    LoginDatabase.PExecute("DELETE FROM `antispam_blacklist` WHERE `word` = '%s'", word.c_str());
}