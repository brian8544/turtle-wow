#pragma once

#include "AuthManager.hpp"

#include "AccountMgr.h"
#include "Database/DatabaseEnv.h"

namespace DiscordBot
{
    std::string AuthManager::AuthResultToString(AuthResult res)
    {
        switch (res)
        {
        case AuthResult::AlreadyAuthed:
            return "You are already logged in.";

        case AuthResult::Successful:
            return "Successfully logged in.";

        case AuthResult::WrongCredentials:
            return "Wrong Credentials.";

        default:
            return "Unkown Error.";
        }
    }

    bool AuthManager::IsAuthenticated(const dpp::user* user) const
    {
        if (!user)
            return nullptr;

        auto pairItr = _authData.find(user->id);

        if (pairItr == _authData.end() || !pairItr->second.authenticated)
            return false;
        return true;
    }

    bool AuthManager::IsAuthenticated(uint32_t gameAccountId) const
    {
        auto pairItr = _authDataLookup.find(gameAccountId);

        if (pairItr == _authDataLookup.end() || !pairItr->second.get().authenticated)
            return false;
        return true;
    }

    const AuthenticationInfo* AuthManager::GetAuthInfo(const dpp::user* user) const
    {
        if (!user)
            return nullptr;

        const auto pairItr = _authData.find(user->id);

        if (pairItr != _authData.end())
            return &pairItr->second;
        return nullptr;
    }

    const AuthenticationInfo* AuthManager::GetAuthInfo(uint32_t gameAccountId) const
    {
        const auto pairItr = _authDataLookup.find(gameAccountId);

        if (pairItr != _authDataLookup.end())
            return &pairItr->second.get();
        return nullptr;
    }

    AuthResult AuthManager::Authenticate(std::string username, std::string password, const dpp::user* user)
    {
        if (!user)
            return AuthResult::WrongCredentials;

        std::string safeUsername = username;
        LoginDatabase.escape_string(safeUsername);

        if (!sAccountMgr.normalizeString(username) || !sAccountMgr.normalizeString(password))
            return AuthResult::WrongCredentials;

        std::unique_ptr<QueryResult> result = 
            std::unique_ptr<QueryResult>(LoginDatabase.PQuery("SELECT id, sha_pass_hash, rank, username FROM account WHERE username = '%s'", safeUsername.c_str()));


        if (!result)
            return AuthResult::WrongCredentials;

        auto fields = result->Fetch();


        uint32_t accountId = fields[0].GetUInt32();

        if (!accountId)
            return AuthResult::WrongCredentials;

        auto userHash = sAccountMgr.CalculateShaPassHash(username, password);


        if (userHash != fields[1].GetCppString())
            return AuthResult::WrongCredentials;

        if (IsAuthenticated(user))
            return AuthResult::AlreadyAuthed;

        auto& authData = _authData[user->id];

        authData.authenticated = true;
        authData.discordId = user->id;
        authData.gameAccountId = accountId;
        authData.securityLevel = fields[2].GetUInt8();
        authData.gameAccountName = fields[3].GetCppString();

        auto info = _authData[user->id];
        _authDataLookup.insert({ accountId, std::ref(info) });
        return AuthResult::Successful;
    }

    AuthResult AuthManager::Login(std::string username, std::string password, const dpp::user* user)
    {
        return Authenticate(username, password, user);
    }

    void AuthManager::Logout(const dpp::user* user)
    {
        auto itr = _authData.find(user->id);

        if (itr == _authData.end())
            return;

        _authDataLookup.erase(itr->second.gameAccountId);
        _authData.erase(itr);
    }
}