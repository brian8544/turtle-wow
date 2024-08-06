; Giperion - Turtle WoW Project

[Setup]
DisableWelcomePage=False
AppName=Patch 1.17.0 — Beyond the Greymane Wall
AppVersion=1.17.0
AppCopyright=Turtle WoW
PrivilegesRequired=lowest
AppId={{71806FB6-8616-44CD-BC26-30777CB36F57}
RestartIfNeededByRun=False
SetupIconFile=turtle_icon_round.ico
ShowLanguageDialog=no
AppPublisher=Turtle WoW
AppPublisherURL=https://turtle-wow.org
Uninstallable=no
EnableDirDoesntExistWarning=True
DisableDirPage=no
DirExistsWarning=no
DefaultDirName={code:GetInstallPath}
AlwaysShowComponentsList=False
WizardStyle=modern
OutputBaseFilename=twow_patch_1170
WizardImageFile=twizard.bmp
SolidCompression=True
AppendDefaultDirName=False
VersionInfoVersion=1.17.0
VersionInfoCompany=Turtle WoW

[Files]
Source: "WoW.exe"; DestDir: "{app}"
Source: "WoWFoV.exe"; DestDir: "{app}"
Source: "patch-4.mpq"; DestDir: "{app}\Data"

[ThirdParty]
UseRelativePaths=True

[CustomMessages]
MSG_TURTLE_INCORRECT_DIR=You must point to correct Turtle WoW 1.16.5 installation directory

[Languages]
Name: "chinesesimplified"; MessagesFile: "compiler:Languages\ChineseSimplified.isl"

[Code]
var
  ExistedWoWInstallation : String;

function FindExistedTurtleWoWInstallation : Boolean;
begin
   if RegQueryStringValue(HKEY_LOCAL_MACHINE, 'SOFTWARE\Blizzard Entertainment\World of Warcraft', 'InstallPath', ExistedWoWInstallation) = True then
   begin
      Log('Found existed WoW installation');
      Log(ExistedWoWInstallation);
   end;
end;

function GetInstallPath(Param: String): String;
begin
  Result := ExistedWoWInstallation;
end;

function InitializeSetup : Boolean;
begin
  Log('TurtleInitializeSetup');
  FindExistedTurtleWoWInstallation
  Result := TRUE;
end;


procedure InitializeWizard;
begin

end;

function NextButtonClick(CurPageID: Integer): Boolean;
var
	selectedGameDirectoryWithPatch3 : String;
begin
	Result := True;
	if CurPageID = wpSelectDir then
	begin
		selectedGameDirectoryWithPatch3 := ExpandConstant('{app}\Data\patch-3.mpq');
		if FileExists(selectedGameDirectoryWithPatch3) = True then
		begin
			Log('Installation directory is successfully validated!');
      Result := True;
		end
		else 
		begin
			MsgBox(CustomMessage('MSG_TURTLE_INCORRECT_DIR'), mbError, MB_OK);
			Result := False;
		end;
	end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
var
  i : integer;
  PatchLetters : String;
  PatchLetter : String;
  TargetFileNameFormat : String;
  TargetFileName : String;
  TargetFileNameLog : String;
  FindRec: TFindRec;
begin
  if CurStep = ssPostInstall then
  begin
    // Remove deprecated patches
    for i := 5 to 9 do
    begin
      TargetFileNameFormat := Format('{app}\Data\patch-%d.mpq', [i]);
      TargetFileName := ExpandConstant(TargetFileNameFormat);
      if DeleteFile(TargetFileName) = True then
      begin
         TargetFileNameLog := Format('Deleting old mpq %s', [TargetFileName]);
         Log(TargetFileNameLog);
      end;
    end;

    PatchLetters := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for i := 1 to Length(PatchLetters) do
    begin
      PatchLetter := Copy(PatchLetters, i, 1);
      TargetFileNameFormat := Format('{app}\Data\patch-%s.mpq', [PatchLetter]);
      Log(TargetFileNameFormat);
      TargetFileName := ExpandConstant(TargetFileNameFormat);
      if DeleteFile(TargetFileName) = True then
      begin
         TargetFileNameLog := Format('Deleting old mpq %s', [TargetFileName]);
         Log(TargetFileNameLog);
      end;
    end;

    // Remove chat cache
    if FindFirst(ExpandConstant('{app}\WTF\Account\*'), FindRec) then
    begin
      try
        repeat
            if FindRec.Attributes and FILE_ATTRIBUTE_DIRECTORY = FILE_ATTRIBUTE_DIRECTORY then
            begin
               TargetFileNameFormat := Format('{app}\WTF\Account\%s\chat-cache.txt', [FindRec.Name]);
               TargetFileName := ExpandConstant(TargetFileNameFormat);
               if DeleteFile(TargetFileName) = True then
                begin
                   TargetFileNameLog := Format('Deleting old chat-cache %s', [TargetFileName]);
                   Log(TargetFileNameLog);
                end;
            end;
        until not FindNext(FindRec);
      finally
        FindClose(FindRec);
      end;
    end;

    // Remove WDB
    DelTree(ExpandConstant('{app}\WDB'), True, True, True);

    // Remove old LFT addon
    DelTree(ExpandConstant('{app}\Interface\AddOns\LFT'), True, True, True);

  end;
end;
