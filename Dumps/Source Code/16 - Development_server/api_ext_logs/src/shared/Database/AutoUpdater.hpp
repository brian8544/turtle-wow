#pragma once
#include <filesystem>
namespace fs = std::filesystem;


#include <vector>
#include <optional>
#include <unordered_map>


#include "DatabaseEnv.h"
#include "Common.h"


namespace DBUpdater
{
    struct Migration
    {
        std::string Hash;
        std::string Name;
    };

    struct FileMigration : public Migration
    {
        std::vector<uint8> FileData;
        std::filesystem::file_time_type ModifiedAt;
    };

    class AutoUpdater final
    {
    private:
        AutoUpdater() = default;

    public:
        AutoUpdater(const AutoUpdater&) = delete;
        AutoUpdater(AutoUpdater&&) = delete;

        static AutoUpdater* Instance()
        {
            static AutoUpdater instance;
            return &instance;
        }

        bool ProcessUpdates();

    protected:

        bool ExecuteUpdate(const FileMigration& fileData, DatabaseType* targetDatabase) const;

        bool ProcessTargetUpdates(const fs::directory_entry& targetPath, DatabaseType* targetDatabase) const;

        std::unordered_map<std::string, FileMigration> LoadFileMigrations(const std::filesystem::directory_entry& targetPath) const;
        std::unordered_map<std::string, Migration> LoadDatabaseMigrations(DatabaseType* targetDatabase) const;


        bool CalculateFileHash(const std::string& fileName, std::string& hexResult, std::optional<std::reference_wrapper<std::vector<uint8>>> fileData) const;


    };
}

#define sAutoUpdater DBUpdater::AutoUpdater::Instance()
