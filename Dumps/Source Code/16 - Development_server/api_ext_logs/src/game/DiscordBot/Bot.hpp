#pragma once
#include "dpp/dpp.h"
#include "Common.h"
#include "Platform/Define.h"

#include <string>
#include <optional>
#include <functional>
#include <memory>
#include <stdint.h>

namespace DiscordBot
{
    constexpr uint32_t MaxMessageLength = 2000;
    
    class BaseCommandHandler;

    class Bot
    {
    public:
        Bot() noexcept = default;
        ~Bot();

        void Setup(std::string token);
        void SendMessageToChannel(uint64_t channelId, std::string message);



        dpp::cluster* GetCore() const;

        void AddHandler(BaseCommandHandler* handler);

    private:
        std::unique_ptr<dpp::cluster> _core;

        std::unordered_map<std::string, BaseCommandHandler*> _commandLinks;

        std::vector<BaseCommandHandler*> _handlers;
        std::string _commandOutput;
    };
}
