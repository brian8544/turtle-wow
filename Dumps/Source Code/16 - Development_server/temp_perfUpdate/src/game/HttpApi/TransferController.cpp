#include "TransferController.hpp"

#include "HttpApi/Authorizers/ApiKeyAuthorizer.hpp"

#include "World.h"
#include "ObjectMgr.h"

using namespace httplib;

namespace HttpApi
{
    TransferController::TransferController(std::string key)
    {
        _authorizer = std::make_unique<ApiKeyAuthorizer>(key.c_str());
    }

    std::string DumpReturnToString(DumpReturn dumpReturn)
    {
        switch (dumpReturn)
        {
            case DUMP_SUCCESS:
                return "Dump success";
            case DUMP_FILE_OPEN_ERROR:
                return "Error with file open";
            case DUMP_TOO_MANY_CHARS:
                return "Too many characters on import";
            case DUMP_UNEXPECTED_END:
                return "Unexpeced end on the import file";
            case DUMP_FILE_BROKEN:
                return "Dump file broken";
        }
        return "";
    }

    //This is part 1 of transfer procedure, will EXTRACT char data.
    void InitTransferAction(const Request& req, Response& resp, const ContentReader& reader)
    {
        if (!req.has_header("Content-Type"))
            return;

        if (req.get_header_value("Content-Type") != "application/json")
            return;


        std::string body;
        reader([&](const char* data, size_t data_length) {
            body.append(data, data_length);
            return true;
            });

        sLog.out(LOG_API, "Init transfer started.");

        rapidjson::Document d;
        d.Parse(body.c_str());

        if (d.HasParseError())
        {
            resp.set_content("Bad JSON.", "text/plain");
            sLog.out(LOG_API, "Bad JSON for init Transfer.\nData:%s\nIP:%s", body.c_str(), req.remote_addr.c_str());
            return;
        }

        if (!d.IsObject() || !d.HasMember("lowGuid"))
        {
            resp.set_content("Bad JSON.", "text/plain");
            sLog.out(LOG_API, "Bad JSON for init Transfer.\nData:%s\nIP:%s", body.c_str(), req.remote_addr.c_str());
            return;
        }

        uint32 lowGuid = d["lowGuid"].GetUint();

        if (!sObjectMgr.GetPlayerDataByGUID(lowGuid))
        {
            sLog.out(LOG_API, "Init transfer could not find player by supplied GUID %u, aborting.", lowGuid);
            return;
        }

        std::string pDumpData;
        PlayerDumpWriter().ReturnDump(pDumpData, lowGuid);

        rapidjson::Document retDoc;
        retDoc.SetObject();

        rapidjson::Value transferStatusValue{ true };
        rapidjson::Value realmId{ realmID };
        retDoc.AddMember("transferStatus", transferStatusValue, retDoc.GetAllocator());

        auto dataRef = rapidjson::StringRef(pDumpData.c_str());

        retDoc.AddMember("data", dataRef, retDoc.GetAllocator());
        retDoc.AddMember("realmId", realmID, retDoc.GetAllocator());

        rapidjson::StringBuffer buffer;
        rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);

        retDoc.Accept(writer);
        resp.set_content(buffer.GetString(), "application/json");
    }


    //This is part 2 of the transfer procedure. This will IMPORT the pdump data and call the necessary import functions.
    //This should be done on the world thread on the OTHER server where extractions take place to do a successful transfer.
    void ProceedTransferAction(const Request& req, Response& resp, const ContentReader& reader)
    {
        if (!req.has_header("Content-Type"))
            return;

        if (req.get_header_value("Content-Type") != "application/json")
            return;


        std::string body;
        reader([&](const char* data, size_t data_length) {
            body.append(data, data_length);
        return true;
            });

        rapidjson::Document d;
        d.Parse(body.c_str());


        if (d.HasParseError())
        {
            resp.set_content("Bad JSON.", "text/plain");
            sLog.out(LOG_API, "Bad JSON for Proceed Transfer.\nData:%s\nIP:%s", body.c_str(), req.remote_addr.c_str());
            return;
        }

        if (!d.IsObject())
        {
            resp.set_content("Bad JSON.", "text/plain");
            sLog.out(LOG_API, "Bad JSON for Proceed Transfer.\nData:%s\nIP:%s", body.c_str(), req.remote_addr.c_str());
            return;
        }

        if (!d.HasMember("data") || !d.HasMember("targetAccountId"))
        {
            resp.set_content("Bad JSON.", "text/plain");
            sLog.out(LOG_API, "Bad JSON for Proceed Transfer.\nData:%s\nIP:%s", body.c_str(), req.remote_addr.c_str());
            return;
        }

        std::string pdumpData = d["data"].GetString();
        uint32 accountId = d["targetAccountId"].GetUint();


        sLog.out(LOG_API, "Accepting transfer for targetAccount:%u\nData:%s", accountId, body.c_str());

        uint32 guid = 0;
        std::string charName = "";
        auto res = PlayerDumpReader().LoadStringDump(pdumpData, accountId, charName, guid);
        sLog.out(LOG_API, "Result of transfer for targetAccount:%u\nres:%s.\nnewGuid:%u\nplayername:%s", accountId, (uint32)res, guid, charName.c_str());

        if (res == DumpReturn::DUMP_SUCCESS) 
        {
            CharacterDatabase.PExecute("UPDATE `characters` SET `active` = 1 WHERE `guid` = %u", guid);
            sLog.out(LOG_API, "Sucessfully accepted transfer import. AccountId:%u, newGuid:%u,playername:%s", accountId, guid, charName.c_str());
        }
        else
            sLog.out(LOG_API, "FAILED dump import.Account:%u\nres:%s.\newGuid:%u\nplayername:%s\ndump result:%s", accountId, (uint32)res, guid, charName.c_str(), DumpReturnToString(res)
            .c_str());

        rapidjson::Document retDoc;
        retDoc.SetObject();

        rapidjson::Value transferResult{ res };
        retDoc.AddMember("transferResult", transferResult, retDoc.GetAllocator());

        rapidjson::StringBuffer buffer;
        rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);

        
        retDoc.Accept(writer);
        resp.set_content(buffer.GetString(), "application/json");
    }
}