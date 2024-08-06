#include <iostream>
#include <thread>
#include <filesystem>
#include <ace/ACE.h>
#include "httplib.h"
#include "Config/Config.h"
#include "Log.h"
#include "HttpApi/BaseController.hpp"
#include "AllocatorWithCategory.h"

#include "rapidjson/document.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/prettywriter.h"
#include "rapidjson/writer.h"

#define fs std::filesystem

void CreateHashFromFile(const std::string& filePath, uint8 (&OutHash)[SHA256_DIGEST_LENGTH])
{
	memset(OutHash, 0, SHA256_DIGEST_LENGTH);
	if (FILE* hFile = fopen(filePath.c_str(), "rb"))
	{
		SHA256_CTX sha256;
		memset(&sha256, 0, sizeof(sha256));
		SHA256_Init(&sha256);

		do 
		{
			uint8 FileBuffer[8192];
			size_t BytesReaded = fread(FileBuffer, 1, sizeof(FileBuffer), hFile);
			SHA256_Update(&sha256, FileBuffer, BytesReaded);
		} while (!feof(hFile));

		SHA256_Final(OutHash, &sha256);

		fclose(hFile);
	}
}

void GetManifestAction(const httplib::Request& req, httplib::Response& resp)
{
	std::string WoWPath = "D:\\Games\\WoW_Turtle_Live\\";

	//std::filesystem::path awda;
	fs::path WoWPath2 = WoWPath;
	for (const fs::directory_entry& FileEntry : fs::recursive_directory_iterator{ WoWPath2 })
	{
		fs::path CurrentPath = FileEntry.path();
		std::string PathAsSimpleStr = CurrentPath.generic_string();
		sLog.outInfo("%S", CurrentPath.c_str());

		uint8 FileHash[SHA256_DIGEST_LENGTH];
		CreateHashFromFile(PathAsSimpleStr, FileHash);

		std::stringstream ss;
		for (unsigned char i : FileHash) 
		{
			ss << std::hex << std::setw(2) << std::setfill('0') << (int)i;
		}

		std::string HexStr = ss.str();
		sLog.outInfo("Hash: %s", HexStr.c_str());
	}

	resp.set_content("AWDA!", "text/plain");
}

class ManifestController : public HttpApi::BaseController
{
public:

	void RegisterCommands(httplib::Server* server) override
	{
		RegisterEndpoint<HttpApi::HttpMethod::Get>("/manifest", &GetManifestAction);
	}

};

void SetSocketOpt(socket_t sock)
{
	HttpApi::detail::set_nonblocking(sock, true);
	HttpApi::default_socket_options(sock);
}

class TurtleBackend
{
public:

	void Start()
	{
		bind_ip = sConfig.GetStringDefault("BindIP", "0.0.0.0");
		Port = sConfig.GetIntDefault("Port", 1100);

		pManifestController = std::make_unique<ManifestController>();

		Server.set_socket_options(SetSocketOpt);
		
		Server.set_error_handler([](const httplib::Request& req, httplib::Response& res)
		{
			const char* fmt = "<p>Error Status: <span style='color:red;'>%d</span></p>";
			char buf[BUFSIZ];
			snprintf(buf, sizeof(buf), fmt, res.status);
			res.set_content(buf, "text/html");
		});

		Server.set_exception_handler([](const httplib::Request& req, httplib::Response& res, std::exception_ptr ep)
		{
			const char* fmt = "<h1>Error 500</h1><p>%s</p>";
			char buf[BUFSIZ];
			try
			{
				std::rethrow_exception(ep);
			}
			catch (std::exception& e)
			{
				snprintf(buf, sizeof(buf), fmt, e.what());
			}
			catch (...)
			{
				snprintf(buf, sizeof(buf), fmt, "Unknown Exception");
			}

			sLog.out(LOG_API, "API Exception: %s", buf);
			res.set_content(buf, "text/html");
			res.status = 500;
		});

		Server.set_logger([](const httplib::Request& req, const httplib::Response& res) 
		{
			sLog.out(LOG_API, "Handling request from %s.\nRoute:%s\nBody:%s", req.remote_addr.c_str(), req.path.c_str(), req.body.c_str());
		});

		HttpApi::BaseController::RegisterAll(&Server);

	}

	void Tick()
	{
		Server.listen(bind_ip, Port);
	}

protected:
	
	std::string bind_ip;
	int32 Port;
	httplib::Server Server;

	std::unique_ptr< ManifestController > pManifestController;
};

bool stopEvent = false;

void OnSignal(int s)
{
	switch (s)
	{
	case SIGINT:
	case SIGTERM:
		stopEvent = true;
		break;
#ifdef _WIN32
	case SIGBREAK:
		stopEvent = true;
		break;
#endif
	}

	signal(s, OnSignal);
}

void HookSignals()
{
	signal(SIGINT, OnSignal);
	signal(SIGTERM, OnSignal);
#ifdef _WIN32
	signal(SIGBREAK, OnSignal);
#endif
}

/// Unhook the signals before leaving
void UnhookSignals()
{
	signal(SIGINT, 0);
	signal(SIGTERM, 0);
#ifdef _WIN32
	signal(SIGBREAK, 0);
#endif
}

static const char teststr[] = "Hello world!";

extern int main(int argc, char** argv)
{
	const char* cfg_file = "TurtleBackend.conf";

	if (!sConfig.SetSource(cfg_file))
	{
		std::cerr << "Config not found, abort launching" << std::endl;
		return 1;
	}

	sLog.Initialize();
	sLog.outInfo("Turtle Launcher Backend ver 1.0");
	sLog.outInfo("Giperion 2024");
	DETAIL_LOG("%s (Library: %s)", OPENSSL_VERSION_TEXT, SSLeay_version(SSLEAY_VERSION));

	using TestAllocator = AllocatorCategory<uint8, teststr>;
	std::vector<uint8, TestAllocator> awdaVec;

	HookSignals();

	TurtleBackend Backend;
	Backend.Start();

	while (!stopEvent)
	{
		Backend.Tick();
		std::this_thread::sleep_for(std::chrono::milliseconds(500)); // 2 FPS
	}

	UnhookSignals();

	return 0;
}