//This file included in Anticheat.h. This private table information

static ChatCommand anticheatFingerprintAutobanCommandTable[] =
{
    { "add",      SEC_ADMINISTRATOR, false, &ChatHandler::HandleAnticheatFingerprintAutobanAddCommand,      "", nullptr },
    { "remove",   SEC_ADMINISTRATOR, false, &ChatHandler::HandleAnticheatFingerprintAutobanRemoveCommand,   "", nullptr },
    { nullptr,   0,                  false, nullptr,                                             "", nullptr },
};

static ChatCommand anticheatFingerprintCommandTable[] =
{
    { "list",      SEC_ADMINISTRATOR, false, &ChatHandler::HandleAnticheatFingerprintListCommand,      "", nullptr },
    { "history",   SEC_DEVELOPER, false, &ChatHandler::HandleAnticheatFingerprintHistoryCommand,      "", nullptr },
    { "ahistory",  SEC_ADMINISTRATOR, false, &ChatHandler::HandleAnticheatFingerprintAHistoryCommand,      "", nullptr },
    { "autoban",   SEC_CONSOLE, false, nullptr,                                            "", anticheatFingerprintAutobanCommandTable },
    { nullptr,   0,                  false, nullptr,                                             "", nullptr },
};


static ChatCommand anticheatHwprintCommandTable[] =
{
    { "mark",      SEC_ADMINISTRATOR, true, &ChatHandler::HandleAnticheatHwPrintMarkCommand,      "", nullptr },
    { "list",      SEC_DEVELOPER, true, &ChatHandler::HandleAnticheatHwPrintListCommand,      "", nullptr },
    { nullptr,   0,                  false, nullptr,                                             "", nullptr },
};

static ChatCommand anticheatCommandTable[] =
{
    { "info",         SEC_DEVELOPER,    true,  &ChatHandler::HandleAnticheatInfoCommand,           "", nullptr },
    { "enable",       SEC_ADMINISTRATOR, true,  &ChatHandler::HandleAnticheatEnableCommand,         "", nullptr },
    { "silence",      SEC_DEVELOPER,    false, &ChatHandler::HandleAnticheatSilenceCommand,        "", nullptr },
    { "unsilence",    SEC_DEVELOPER,    false, &ChatHandler::HandleAnticheatUnsilenceCommand,      "", nullptr },
    { "spaminfo",     SEC_ADMINISTRATOR, false, &ChatHandler::HandleAnticheatSpaminfoCommand,       "", nullptr },
    { "fingerprint",  SEC_ADMINISTRATOR, false, nullptr,                                            "", anticheatFingerprintCommandTable },
    { "hwprint",      SEC_DEVELOPER,    true, nullptr,                                            "", anticheatHwprintCommandTable},
    { "cheatinform",  SEC_DEVELOPER,    false, &ChatHandler::HandleAnticheatCheatinformCommand,    "", nullptr },
    { "spaminform",   SEC_DEVELOPER,    false, &ChatHandler::HandleAnticheatSpaminformCommand,     "", nullptr },
    { "blacklist",    SEC_DEVELOPER,    false, &ChatHandler::HandleAnticheatBlacklistCommand,      "", nullptr },
    { "whitelist",    SEC_DEVELOPER,    false, &ChatHandler::HandleAnticheatWhitelistCommand,      "", nullptr },
    { "debugextrap",  SEC_ADMINISTRATOR, true,  &ChatHandler::HandleAnticheatDebugExtrapCommand,    "", nullptr },
    { nullptr,   0,                  false, nullptr,                                             "", nullptr },
};
