// Giperion for Turtle WoW

#include <windows.h>
#include <filesystem>
#include <assert.h>
#include "StormLib.h"
#include "resource.h"
#include <Commctrl.h>
#include <iostream>
#include <string> 
#include <sstream>

#define fs std::filesystem

enum OriginalValues
{
OFFSET_NET_VERSION                            = 0x001B2122, // 2 bytes.Original value : unsigned short "5875"
OFFSET_PVP_RANK_CHECK                         = 0x002093B0, // 6 bytes. Remove check for PvP rank for player's title field.
OFFSET_VISUAL_VERSION                         = 0x00437C04, // String. Original value: "1.12.1"
OFFSET_VISUAL_BUILD                           = 0x00437BFC, // String. Original value: "5875"
OFFSET_VISUAL_BUILD_DATE                      = 0x00434798, // String. Original value: "Sep 19 2006"
OFFSET_KOREAN_WEBSITE_FILTER                  = 0x0045CCD8, // String. Original value: "*.worldofwarcraft.co.kr"
OFFSET_CHINA_WEBSITE_FILTER                   = 0x0045CC9C, // String. Original value: "*.wowchina.com"
OFFSET_SHELLCODE_LOAD_DLL                     = 0x00004122, // A small storage for Discord DLL code.
OFFSET_ORIGINAL_FOV_VALUE                     = 0x004089B4, // Original FoV value.
OFFSET_DWARF_MAGE_VALUE_1                     = 0x000706E5, // Removal of Blizzard's hackfix for Dwarf Mages.
OFFSET_DWARF_MAGE_VALUE_2                     = 0x000706EB, // Removal of Blizzard's hackfix for Dwarf Mages.
OFFSET_DWARF_MAGE_VALUE_3                     = 0x0007075D, // Removal of Blizzard's hackfix for Dwarf Mages.
OFFSET_DWARF_MAGE_VALUE_4                     = 0x00070763, // Removal of Blizzard's hackfix for Dwarf Mages.
OFFSET_WINMAIN_CALL_PART                      = 0x0000999C, // 1 byte. Calling WinMain (replaced with Discord DLL)
OFFSET_STR_DISCORD_OVERLAY                    = 0x003FFF60, // Original value is some kind of CRT error. 
OFFSET_SOUND_SOFTWARE_CHANNELS                = 0x0005728C, // Sound channel count, default game value is 12.
OFFSET_SOUND_HARDWARE_CHANNELS                = 0x00057250, // Sound channel count, default game value is 12.
OFFSET_SOUND_MEMORY_CACHE                     = 0x000572C8, // Sound channel count, default game value is 4.
OFFSET_NAMEPLATE_DISTANCE                     = 0x0040c448, // 20 yards is the default value, increased to 41 yards.
OFFSET_LARGE_ADDRESS_AWARE                    = 0x00000126, // Allows the game use up to 4GB RAM.
OFFSET_SOUND_IN_BACKGROUND                    = 0x003A4869, // Allows the game to play music while user is alt-tabbed.
OFFSET_TEXTEMOTE_SOUND_RACE_ID_CHECK          = 0x00059289, // Allows the game to play emote sounds for High Elves.
OFFSET_TEXTEMOTE_SOUND_LOAD_CHECK             = 0x00057C81, // Allows the game to play emote sounds for High Elves.
};

bool fov_build = false;

#define NEW_BUILD 7060u
#define NEW_VISUAL_BUILD "7060"
#define NEW_VISUAL_VERSION "1.16.5"
#define NEW_BUILD_DATE "Jan 03 2023"
#define NEW_WEBSITE_FILTER "*.turtle-wow.org" 
#define NEW_WEBSITE2_FILTER "*.discord.gg" 
#define PATCH_FILE "Data\\patch-3.mpq"
#define DISCORD_OVERLAY_FILE "DiscordOverlay.dll"
#define DISCORD_GAME_SDK_FILE "discord_game_sdk.dll"
#define LFT_ADDON_FILE "LFT.mpq"
#define ADDITIONAL_GAME_BINARY "WoWFoV.exe"

const unsigned char LoadDLLShellcode[] =
{
	0x68, 0x60, 0xFF, 0x7F, 0x00,		// push 0x007FFF60 (offset to string "DiscordOverlay.dll")
	0xFF, 0x15, 0xB4, 0xF2, 0x7F, 0x00, // call ds:LoadLibraryA
	0xEb, 0xD1,							// jmp short _WinMain
};

const char DiscordOverlayDllStr[] = "DiscordOverlay.dll";

void RemoveFilenameFromEnd(std::string& InOutStr)
{
	size_t LastTrailingSlash = InOutStr.find_last_of('\\');
	if (LastTrailingSlash != std::string::npos)
	{
		InOutStr.erase(LastTrailingSlash, InOutStr.size() - LastTrailingSlash);
	}
}

void PatchDiscordOverlayDLL(FILE* hWoW)
{
	fseek(hWoW, (long)OFFSET_SHELLCODE_LOAD_DLL, SEEK_SET);
	fwrite(LoadDLLShellcode, sizeof(LoadDLLShellcode), 1, hWoW);

	fseek(hWoW, (long)OFFSET_WINMAIN_CALL_PART, SEEK_SET);
	const unsigned char DifferentCallOffset = 0x82;
	fwrite(&DifferentCallOffset, 1, 1, hWoW);

	fseek(hWoW, (long)OFFSET_STR_DISCORD_OVERLAY, SEEK_SET);
	fwrite(DiscordOverlayDllStr, sizeof(DiscordOverlayDllStr), 1, hWoW);
	const unsigned char ZeroByte = 0x00;
	fwrite(&ZeroByte, 1, 1, hWoW);
}

void PatchNetVersion(FILE* hWoW, unsigned short Build)
{
	fseek(hWoW, (long)OFFSET_NET_VERSION, SEEK_SET);
	fwrite(&Build, 2, 1, hWoW);
}

void PatchVisualVersion(
	FILE* hWoW, 
	const std::string& VersionString, 
	const std::string& BuildString, 
	const std::string& DateString,
	const std::string& WebsiteFilter,
	const std::string& WebsiteFilter2)
{
	// We can't exceed client restriction
	assert(VersionString.size() <= 6);
	assert(BuildString.size() == 4);
	assert(DateString.size() == 11);

	fseek(hWoW, OFFSET_VISUAL_VERSION, SEEK_SET);
	fwrite(VersionString.c_str(), 1, VersionString.size(), hWoW);

	fseek(hWoW, OFFSET_VISUAL_BUILD, SEEK_SET);
	fwrite(BuildString.c_str(), 1, BuildString.size(), hWoW);

	fseek(hWoW, OFFSET_VISUAL_BUILD_DATE, SEEK_SET);
	fwrite(DateString.c_str(), 1, DateString.size(), hWoW);

	// change website filter to allow turtle-wow.org and discord.gg
	fseek(hWoW, OFFSET_KOREAN_WEBSITE_FILTER, SEEK_SET);
	fwrite(WebsiteFilter.c_str(), 1, WebsiteFilter.size(), hWoW);
	fwrite("\0", 1, 1, hWoW);

	fseek(hWoW, OFFSET_CHINA_WEBSITE_FILTER, SEEK_SET);
	fwrite(WebsiteFilter2.c_str(), 1, WebsiteFilter2.size(), hWoW);
	fwrite("\0", 1, 1, hWoW);
}

void PatchBinary(FILE* hWoW)
{
	fseek(hWoW, 0x2f113a, SEEK_SET);
	char patch_1[] = { 0xeb, 0x19 };
	fwrite(patch_1, sizeof(patch_1), 1, hWoW);

	char patch_2[] = { 0x03 };
	fseek(hWoW, 0x2f1158, SEEK_SET);
	fwrite(patch_2, sizeof(patch_2), 1, hWoW);

	char patch_3[] = { 0x03 };
	fseek(hWoW, 0x2f11a7, SEEK_SET);
	fwrite(patch_3, sizeof(patch_3), 1, hWoW);

	char patch_4[] = { 0xeb, 0xb2 };
	fseek(hWoW, 0x2f11f0, SEEK_SET);
	fwrite(patch_4, sizeof(patch_4), 1, hWoW);

	char patch_5[] = { 0x90, 0x90, 0x90, 0x90, 0x90, 0x90 };
	fseek(hWoW, OFFSET_PVP_RANK_CHECK, SEEK_SET);
	fwrite(patch_5, sizeof(patch_5), 1, hWoW);

	char patch_7[] = { 0xFE };
	fseek(hWoW, OFFSET_DWARF_MAGE_VALUE_1, SEEK_SET);
	fwrite(patch_7, sizeof(patch_7), 1, hWoW);
	fseek(hWoW, OFFSET_DWARF_MAGE_VALUE_2, SEEK_SET);
	fwrite(patch_7, sizeof(patch_7), 1, hWoW);
	fseek(hWoW, OFFSET_DWARF_MAGE_VALUE_3, SEEK_SET);
	fwrite(patch_7, sizeof(patch_7), 1, hWoW);
	fseek(hWoW, OFFSET_DWARF_MAGE_VALUE_4, SEEK_SET);
	fwrite(patch_7, sizeof(patch_7), 1, hWoW);

	char patch_14[] = { 0x40 };
	fseek(hWoW, OFFSET_TEXTEMOTE_SOUND_RACE_ID_CHECK, SEEK_SET);
	fwrite(patch_14, sizeof(patch_14), 1, hWoW);

	char patch_15[] = { 0x40 };
	fseek(hWoW, OFFSET_TEXTEMOTE_SOUND_LOAD_CHECK, SEEK_SET);
	fwrite(patch_15, sizeof(patch_15), 1, hWoW);

	char patch_11[] = { 0x00, 0x00, 0x24, 0x42 };
	fseek(hWoW, OFFSET_NAMEPLATE_DISTANCE, SEEK_SET);
	fwrite(patch_11, sizeof(patch_11), 1, hWoW);

	// Increased value:
	char patch_12[] = { 0x2F, 0x01 };
	fseek(hWoW, OFFSET_LARGE_ADDRESS_AWARE, SEEK_SET);
	fwrite(patch_12, sizeof(patch_12), 1, hWoW);

	// Original 1.12.1 value:
	//char patch_12[] = { 0x0F, 0x01 };
	//fseek(hWoW, OFFSET_LARGE_ADDRESS_AWARE, SEEK_SET);
	//fwrite(patch_12, sizeof(patch_12), 1, hWoW);

	// Sound channel count original values:
	char patch_8[] = { 0x38, 0x5D, 0x83, 0x00 };
	fseek(hWoW, OFFSET_SOUND_SOFTWARE_CHANNELS, SEEK_SET);
	fwrite(patch_8, sizeof(patch_8), 1, hWoW);

	char patch_9[] = { 0x38, 0x5D, 0x83, 0x0 };
	fseek(hWoW, OFFSET_SOUND_HARDWARE_CHANNELS, SEEK_SET);
	fwrite(patch_9, sizeof(patch_9), 1, hWoW);

	char patch_10[] = { 0x6C, 0x5C, 0x83, 0x00 };
	fseek(hWoW, OFFSET_SOUND_MEMORY_CACHE, SEEK_SET);
	fwrite(patch_10, sizeof(patch_10), 1, hWoW);

	// Sound in background, original value:
	char patch_13[] = { 0x14 };
	fseek(hWoW, OFFSET_SOUND_IN_BACKGROUND, SEEK_SET);
	fwrite(patch_13, sizeof(patch_13), 1, hWoW);

	// *****************************************************
	// Optional changes for the additionally distributed binary:
	// *****************************************************

	if (fov_build)
	{
		// Improved FoV value:
		char patch_6[] = { 0x66, 0x66, 0xF6, 0x3F };
		fseek(hWoW, OFFSET_ORIGINAL_FOV_VALUE, SEEK_SET);
		fwrite(patch_6, sizeof(patch_6), 1, hWoW);

		// Sound while alt-tabbed:
		char patch_13[] = { 0x27 };
		fseek(hWoW, OFFSET_SOUND_IN_BACKGROUND, SEEK_SET);
		fwrite(patch_13, sizeof(patch_13), 1, hWoW);
	}
}

constexpr int max_path = 260;
using string_path = char[2 * max_path];

struct StormFile
{
	HANDLE hFile = NULL;
	LARGE_INTEGER Size;

	StormFile(HANDLE InFile)
		: hFile(InFile)
	{
		assert(hFile != NULL);

		Size.LowPart = SFileGetFileSize(hFile, (LPDWORD)&Size.HighPart);
	}

	void ReadToBuffer(void* pOutData, DWORD NumBytes)
	{
		DWORD ReadedBytes = 0;
		bool bSuccess = SFileReadFile(hFile, pOutData, NumBytes, &ReadedBytes, NULL);
		assert(bSuccess);
		assert(ReadedBytes == NumBytes);
	}

	~StormFile()
	{
		SFileCloseFile(hFile);
	}
};

struct StormArchive
{
	HANDLE mpq = NULL;
	StormArchive(const char* pPath)
	{
		if (!SFileOpenArchive(pPath, 0, 0, &mpq))
		{
			mpq = NULL;
		}
	}

	bool IsValid() const
	{
		return mpq != NULL;
	}

	StormFile* OpenFile(const char* filename)
	{
		if (!IsValid())
		{
			return nullptr;
		}

		HANDLE hFile;
		if (SFileOpenFileEx(mpq, filename, 0, &hFile))
		{
			return new StormFile(hFile);
		}

		return nullptr;
	}

	bool HasFile(const char* filename)
	{
		if (!IsValid())
		{
			return false;
		}

		return SFileHasFile(mpq, filename);
	}

	~StormArchive()
	{
		if (mpq != NULL)
		{
			SFileCloseArchive(mpq);
		}
	}

	struct FileIterator
	{
		HANDLE ParentMPQ = NULL;
		HANDLE hFind = NULL;
		SFILE_FIND_DATA FileData;
		bool bReachEnd = false;

		FileIterator(HANDLE hMPQ)
			: ParentMPQ(hMPQ)
		{
			ZeroMemory(&FileData, sizeof(FileData));

			hFind = SFileFindFirstFile(ParentMPQ, "*", &FileData, nullptr);
			if (hFind == NULL)
			{
				bReachEnd = true;
			}
		}

		
		FileIterator& operator++(int)
		{
			if (!bReachEnd)
			{
				bReachEnd = !SFileFindNextFile(hFind, &FileData);
			}

			return *this;
		}

		operator bool()
		{
			return !bReachEnd;
		}

		StormFile* OpenCurrentFile()
		{
			HANDLE hFile;
			if (SFileOpenFileEx(ParentMPQ, FileData.cFileName, 0, &hFile))
			{
				return new StormFile(hFile);
			}

			return nullptr;
		}

		~FileIterator()
		{
			SFileFindClose(hFind);
		}
	};
};

HINSTANCE gHInstance;
HWND hDialog = NULL;

#define WM_SETPROGRESS WM_USER + 1

INT_PTR CALLBACK Dlgproc(HWND Arg1, UINT Message, WPARAM wParam, LPARAM lParam)
{
	static HWND hProgressBar = NULL;

	switch (Message)
	{
	case WM_INITDIALOG:
	{
		HICON hIcon = (HICON)LoadImage(gHInstance, MAKEINTRESOURCE(IDI_ICON3), IMAGE_ICON, GetSystemMetrics(SM_CXSMICON), GetSystemMetrics(SM_CYSMICON), 0);

		if (hIcon != NULL)
		{
			SendMessage(Arg1, WM_SETICON, ICON_SMALL, (LPARAM)hIcon);
		}

		hProgressBar = GetDlgItem(Arg1, IDC_PROGRESS1);

		SendMessage(hProgressBar, PBM_SETRANGE32, 0, 100);
		SendMessage(hProgressBar, PBM_SETSTEP, 1, 0);

		return TRUE;
	}

	case WM_COMMAND:
	{
		switch (LOWORD(wParam))
		{
		case IDC_CANCELBTN:
		{
			DestroyWindow(Arg1);
			hDialog = NULL;
			return TRUE;
		}
		default:
			break;
		}
	}

	case WM_SETPROGRESS:
	{
		SendMessage(hProgressBar, PBM_STEPIT, 0, 0);
	}

	default:
		break;
	}
	return FALSE;
}

HANDLE hLogFile = NULL;

void WriteLog(const char* format, ...)
{
	if (hLogFile == NULL)
	{
		return;
	}

	va_list ap;
	va_start(ap, format);
	char Message[4096] = {0};

	int NumBytes = vsnprintf_s(Message, sizeof(Message), format, ap);

	va_end(ap);
	Message[NumBytes] = '\n';
	Message[NumBytes + 1] = '\0';

	DWORD bytesWritten = 0;
	WriteFile(hLogFile, Message, NumBytes + 1, &bytesWritten, NULL);
}

inline void ErrorBox(const char* errorTxt)
{
	MessageBox(NULL, errorTxt, "Error", MB_OK | MB_ICONERROR);
}

int PatchWoWExe()
{
	// patch WoW.exe
	if (FILE* hWoWBinary = fopen("WoW.exe", "r+b"))
	{
		PatchBinary(hWoWBinary);
		PatchNetVersion(hWoWBinary, NEW_BUILD);
	 // PatchDiscordOverlayDLL(hWoWBinary);

		std::string Version(NEW_VISUAL_VERSION);
		std::string Build(NEW_VISUAL_BUILD);
		std::string Date(NEW_BUILD_DATE);
		std::string WebsiteFilter(NEW_WEBSITE_FILTER);
		std::string WebsiteFilter2(NEW_WEBSITE2_FILTER);
		PatchVisualVersion(hWoWBinary, Version, Build, Date, WebsiteFilter, WebsiteFilter2);

		fclose(hWoWBinary);
	}
	else
	{
		WriteLog("ERROR: Can't patch WoW.exe");
//		ErrorBox("Can't patch WoW.exe");
		return 1;
	}

	return 0;
}

void PrintInstructions()
{
	WriteLog(" ");
	WriteLog("Hello! It seems that something went wrong with your installation process. Here's a list of possible solutions:");
	WriteLog(" ");
	WriteLog("Please ensure that your Antivirus, Backup Software or Windows Defender is not blocking TWPatcher.exe, DiscordOverlay.dll or WoW.exe. Open Window Security in your right bottom taskbar, go to Virus and Scan protection > Allowed Threats > Protected Threats and select the files and click the Restore option.");
	WriteLog(" ");
	WriteLog("Move the game out of read-only folders such as Program Files, User Folder, Downloads, Desktop, etc.");
	WriteLog(" ");
	WriteLog("Try to run WoW as Administrator!");
	WriteLog(" ");
	WriteLog("If everything is done right, your Data folder should have %s installed an your binary file should have revision %s", PATCH_FILE, NEW_VISUAL_VERSION);
	WriteLog(" ");
	WriteLog("If it still doesn't work please use a direct download from our website.");
	WriteLog(" ");
	WriteLog("If you need help, join our Discord: https://discord.com/invite/mBGxmHy or contact us via e-mail help.turtlewow@gmail.com");
}

void ClearWDBCache()
{
	fs::path current_path = fs::current_path();

	{
		fs::path wdb = current_path / "WDB";

		if (fs::exists(wdb))
		{
			WriteLog("Deleting client cache...");
			fs::remove_all(wdb);
		}	
	}
}

void DeleteDeprecatedMPQ()
{
	fs::path currentPath = fs::current_path();

	{
		int numerical_patches[6] = { 4, 5, 6, 7, 8, 9 };
		for (int i : numerical_patches)
		{
			WriteLog("Searching for patch-%i...", i);
			std::stringstream ss;
			std::stringstream ss_r;
			ss << "patch-" << std::to_string(i) << ".mpq";
			ss_r << "patch-" << std::to_string(i) << ".mpq.off";
			std::string patch_name = ss.str();
			std::string patch_rename = ss_r.str();

			fs::path patch_path = currentPath / "Data" / patch_name;

			if (fs::exists(patch_path))
			{
				WriteLog("Renaming deprecated patch-%i to %s...", i, patch_rename.c_str());
				fs::rename(currentPath / "Data" / patch_path, currentPath / "Data" / patch_rename);

				fs::path patch_disabled = currentPath / "Data" / patch_rename;
				if (fs::exists(patch_disabled))
				{
					WriteLog("Deleting deprecated patch-%i...", i);
					fs::remove(patch_disabled);
				}
				else
				{
					WriteLog("Deprecated patch-%i not found.", i);
				}
			}
			else
			{
				WriteLog("Patch-%i not found.", i);
			}
		}
	}

	{
		for (char let = 'A'; let <= 'Z'; ++let)
		{
			std::stringstream ss_n;
			ss_n << "patch-" << let << ".mpq";
			std::string i = ss_n.str();

			WriteLog("Searching for %s...", i.c_str());

			std::stringstream ss_r;
			ss_r << i << ".off";
			std::string patch_rename = ss_r.str();

			fs::path patch_path = currentPath / "Data" / i.c_str();

			if (fs::exists(patch_path))
			{
				WriteLog("Renaming deprecated %s to %s...", i.c_str(), patch_rename.c_str());
				fs::rename(currentPath / "Data" / patch_path, currentPath / "Data" / patch_rename);

				fs::path patch_disabled = currentPath / "Data" / patch_rename;
				if (fs::exists(patch_disabled))
				{
					WriteLog("Deleting deprecated %s...", i.c_str());
					fs::remove(patch_disabled);
				}
				else
				{
					WriteLog("Deprecated %s not found.", i.c_str());
				}
			}
			else
			{
				WriteLog("%s not found.", i.c_str());
			}
		}
	}
}

int GuardedMain(HINSTANCE hInstance)
{
	gHInstance = hInstance;

	PatchWoWExe();

	// create log file
	// By default we try to create a log in working directory.
	// But if that not possible - create in temp dir

	fs::path currentPath = fs::current_path();
	const char* LogFilename = "tw_update.log";

	fs::path LogFilePlace1 = currentPath / LogFilename;
	std::wstring LogFilePlace1str = LogFilePlace1.wstring();

	hLogFile = CreateFileW(LogFilePlace1str.c_str(), GENERIC_WRITE, FILE_SHARE_READ, NULL, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);

	if (hLogFile == NULL)
	{
		fs::path TempPath = fs::temp_directory_path();
		TempPath = TempPath / LogFilename;
		std::wstring TempPathStr = TempPath.wstring();
		hLogFile = CreateFileW(TempPathStr.c_str(), GENERIC_WRITE, FILE_SHARE_READ, NULL, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
		if (hLogFile == NULL)
		{
			ErrorBox("Can't create log file. Perhaps you don't have enough free space on disk, or something wrong happened.\nPatcher will try to work anyway.");
		}
	}

	struct AutoLogCloser
	{
		~AutoLogCloser()
		{
			if (hLogFile != NULL)
			{
				CloseHandle(hLogFile);
			}
		}
	} closer;

	WriteLog("Log file created.");

	fs::path PatchDir = currentPath / "wow-patch.mpq";

	// create a dialog
	hDialog = CreateDialog(hInstance, MAKEINTRESOURCE(IDD_DIALOGBAR), NULL, Dlgproc);
	ShowWindow(hDialog, SW_SHOW);
	//DialogBox(hInstance, MAKEINTRESOURCE(IDD_DIALOGBAR), NULL, Dlgproc);

	// Handle all dialog creation messages
	MSG		msg;
	while (PeekMessage(&msg, nullptr, 0U, 0U, PM_REMOVE))
	{
		if (!IsWindow(hDialog) || !IsDialogMessage(hDialog, &msg))
		{
			TranslateMessage(&msg);
			DispatchMessage(&msg);
		}
	}
	// Then sleep for 5 sec. because there is a strange error if we working too fast
	Sleep(5000);

	// Delete deprecated MPQ files:
	DeleteDeprecatedMPQ();

	// Delete WDB:
	ClearWDBCache();


	// unpack patch files
	{
		std::string strPathDir = PatchDir.u8string();
		WriteLog("Trying open downloaded path file \"%S\"", PatchDir.c_str());
		StormArchive PatchFile(strPathDir.c_str());

		if (!PatchFile.IsValid())
		{
			WriteLog("ERROR: Can't open patch \"%S\"", PatchDir.c_str());
			PrintInstructions();
		}
		else
		{
			WriteLog("Opened \"%S\"", PatchDir.c_str());
		}

		auto OnOpenFileLambda = [&PatchDir](LPCSTR File)
		{
			WriteLog("Opened \"%s\" inside \"%S\"", File, PatchDir.c_str());
			if (fs::exists(File))
			{
				WriteLog("File \"%s\" existed, removing", File);
				if (!fs::remove(File))
				{
					WriteLog("ERROR: Can't remove file \"%s\"", File);
				}
			}
		};

		auto OpenFileWithLogLambda = [](LPCSTR File) -> FILE*
		{
			FILE* hTargetFile = fopen(File, "wb");
			if (hTargetFile == NULL)
			{
				WriteLog("Can't create \"%s\" for writting", File);
				assert(hTargetFile != NULL);
				return nullptr;
			}

			return hTargetFile;
		};

		auto CopyFromMPQToFileLambda = [](StormFile* pFile, FILE* hTargetFile)
		{
			char* allFile = new char[pFile->Size.LowPart]; // Only 4GB files are supported
			pFile->ReadToBuffer(allFile, pFile->Size.LowPart);
			fwrite(allFile, pFile->Size.LowPart, 1, hTargetFile);

			delete[] allFile;
		};

		// unpack discord overlay and discord game sdk
		{
			if (StormFile* pFile = PatchFile.OpenFile(DISCORD_OVERLAY_FILE))
			{
				OnOpenFileLambda(DISCORD_OVERLAY_FILE);
				std::unique_ptr<StormFile> patchData(pFile);

				FILE* hTargetFile = OpenFileWithLogLambda(DISCORD_OVERLAY_FILE);
				if (hTargetFile == nullptr)
				{
					return 1;
				}

				CopyFromMPQToFileLambda(pFile, hTargetFile);
				fclose(hTargetFile);
			}

			if (StormFile* pFile = PatchFile.OpenFile(DISCORD_GAME_SDK_FILE))
			{
				OnOpenFileLambda(DISCORD_GAME_SDK_FILE);
				std::unique_ptr<StormFile> patchData(pFile);

				FILE* hTargetFile = OpenFileWithLogLambda(DISCORD_GAME_SDK_FILE);
				if (hTargetFile == nullptr)
				{
					return 1;
				}

				CopyFromMPQToFileLambda(pFile, hTargetFile);
				fclose(hTargetFile);
			}

			// Unpack additionally distributed binary:

			if (StormFile* pFile = PatchFile.OpenFile(ADDITIONAL_GAME_BINARY))
			{
				OnOpenFileLambda(ADDITIONAL_GAME_BINARY);
				std::unique_ptr<StormFile> patchData(pFile);

				FILE* hTargetFile = OpenFileWithLogLambda(ADDITIONAL_GAME_BINARY);
				if (hTargetFile == nullptr)
				{
					return 1;
				}

				CopyFromMPQToFileLambda(pFile, hTargetFile);
				fclose(hTargetFile);
			}
			else
			{
				WriteLog("File WoWFoV.exe not found.");
			}
		}
		
		// Unpack LFT.mpq
		{
			if (StormFile* pFile = PatchFile.OpenFile(LFT_ADDON_FILE))
			{
				OnOpenFileLambda(LFT_ADDON_FILE);
				std::unique_ptr<StormFile> patchData(pFile);

				FILE* hTargetFile = OpenFileWithLogLambda(LFT_ADDON_FILE);
				if (hTargetFile == nullptr)
				{
					return 1;
				}

				CopyFromMPQToFileLambda(pFile, hTargetFile);
				fclose(hTargetFile);

				fs::path LFTAddonPath = "Interface\\AddOns\\LFT";
				if (fs::exists(LFTAddonPath))
				{
					fs::remove_all(LFTAddonPath);
				}

				fs::create_directories(LFTAddonPath);

				{
					StormArchive LFTArchive(LFT_ADDON_FILE);

					for (StormArchive::FileIterator it(LFTArchive.mpq); it; it++)
					{
						std::unique_ptr<StormFile> FileInside( it.OpenCurrentFile());

						WriteLog("Unpack LFT file %s", it.FileData.cFileName);

						char FilePath[256] = {0};
						sprintf(FilePath, "Interface\\AddOns\\LFT\\%s", it.FileData.cFileName);

						std::string sFilePath = FilePath;
						RemoveFilenameFromEnd(sFilePath);
						fs::create_directories(sFilePath);

						FILE* hTargetFile = OpenFileWithLogLambda(FilePath);
						if (hTargetFile == nullptr)
						{
							continue;
						}

						CopyFromMPQToFileLambda(FileInside.get(), hTargetFile);

						fclose(hTargetFile);
					}
				}

				fs::remove(LFT_ADDON_FILE);
			}
		}

		// unpack mpq
		//if (StormFile* pFile = PatchFile.OpenFile(PATCH_FILE))
		//{
		//	OnOpenFileLambda(PATCH_FILE);
		//	std::unique_ptr<StormFile> patchData(pFile);

		//	// copy shit to target path
		//	FILE* hTargetFile = OpenFileWithLogLambda(PATCH_FILE);
		//	if (hTargetFile == nullptr)
		//	{
		//		return 1;
		//	}

		//	// split to chunks
		//	const DWORD chunkSize = 4096;
		//	DWORD chunks = patchData->Size.QuadPart / chunkSize;
		//	chunks += (patchData->Size.QuadPart % chunkSize) != 0;
		//	char ReadingBuffer[4096];

		//	PeekMessage(&msg, nullptr, 0U, 0U, PM_NOREMOVE);

		//	DWORD ExtractProgress = 0;

		//	for (DWORD i = 0; i < chunks; i++)
		//	{
		//		if (hDialog == NULL)
		//		{
		//			break;
		//		}

		//		DWORD ReadingQuota = std::min<DWORD>(patchData->Size.QuadPart - ((i + 1) * chunkSize), chunkSize);

		//		patchData->ReadToBuffer(&ReadingBuffer[0], ReadingQuota);

		//		fwrite(ReadingBuffer, ReadingQuota, 1, hTargetFile);

		//		// update progress
		//		float progress = float(i) / float(chunks);
		//		progress *= 100.0f;

		//		DWORD NewExtractProgress = DWORD(progress);

		//		for (; ExtractProgress < NewExtractProgress; ExtractProgress++)
		//		{
		//			SendMessage(hDialog, WM_SETPROGRESS, 0, 0);
		//		}

		//		while (PeekMessage(&msg, nullptr, 0U, 0U, PM_REMOVE))
		//		{
		//			if (!IsWindow(hDialog) || !IsDialogMessage(hDialog, &msg))
		//			{
		//				TranslateMessage(&msg);
		//				DispatchMessage(&msg);
		//			}
		//		}
		//	}

		//	fclose(hTargetFile);
		//}
		//else
		//{
		//	WriteLog("The file you're looking for is probably already installed!");
		//	ErrorBox("Your client is already updated.");
		//	return 1;
		//}
	}

	//if (hDialog == NULL)
	//{
	//	WriteLog("INFO: User has cancelled update.");
	//	if (fs::exists(PATCH_FILE))
	//	{
	//		WriteLog("Removing patch files...");
	//		fs::remove(PATCH_FILE);
	//	}

	//	return 0;
	//}
	//else
	//{
	//	DestroyWindow(hDialog);
	//	hDialog = NULL;
	//}

	WriteLog("Patching WoW.exe...");

	if (int ErrCode = PatchWoWExe())
	{
		return ErrCode;
	}

#if 0
	HMODULE hWoW = LoadLibrary("WoW.exe");

	HRSRC VersionInfo = FindResourceEx(hWoW, MAKEINTRESOURCE(16), MAKEINTRESOURCE(1), MAKELANGID(LANG_NEUTRAL, SUBLANG_NEUTRAL));

	HGLOBAL hVersionInfoHandle = LoadResource(hWoW, VersionInfo);
	LPVOID pVerInfo = LockResource(hVersionInfoHandle);
#endif
	WriteLog("Update is complete, starting the game...");
	if (hDialog != NULL)
	{
		DestroyWindow(hDialog);
		hDialog = NULL;
	}

#ifndef _DEBUG
	fs::remove("wow-patch.mpq");
#endif

	STARTUPINFO info;
	PROCESS_INFORMATION pInfo;
	ZeroMemory(&info, sizeof(info));
	ZeroMemory(&pInfo, sizeof(pInfo));

	char WoWExe[24] = "WoW.exe";
	if (!CreateProcess(NULL, WoWExe, NULL, NULL, FALSE, NORMAL_PRIORITY_CLASS, NULL, NULL, &info, &pInfo))
	{
		WriteLog("ERROR: Can't start WoW.exe");
	}

	return 0;
}

int UnhandledExceptionFilter(unsigned int code, struct _EXCEPTION_POINTERS *ep)
{
	MessageBox(NULL, "Couldn't patch Turtle WoW. See tw_update.log for details.", "Critical Error", MB_OK | MB_ICONERROR);
	PrintInstructions();

	if (code == EXCEPTION_ACCESS_VIOLATION)
	{
		return EXCEPTION_EXECUTE_HANDLER;
	}
	else
	{
		return EXCEPTION_CONTINUE_SEARCH;
	};
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow)
{
	int Result = 0;

	__try
	{
		Result = GuardedMain(hInstance);
	}
	__except(UnhandledExceptionFilter(GetExceptionCode(), GetExceptionInformation()))
	{}

	return Result;
}