; Giperion - Turtle WoW Project

[Setup]
DisableWelcomePage=False
AppName=Patch 1.17.1 — Labor and Legacy
AppVersion=1.17.1
AppCopyright=Turtle WoW
PrivilegesRequired=lowest
AppId={{71806FB6-8616-44CD-BC26-30777CB36F57}
RestartIfNeededByRun=False
SetupIconFile=turtle_icon_round.ico
ShowLanguageDialog=auto
AppPublisher=Turtle WoW
AppPublisherURL=https://turtle-wow.org
Uninstallable=no
EnableDirDoesntExistWarning=True
DisableDirPage=no
DirExistsWarning=no
DefaultDirName={code:GetInstallPath}
AlwaysShowComponentsList=False
WizardStyle=modern
OutputBaseFilename=twow_patch_1171
WizardImageFile=twizard.bmp
SolidCompression=True
AppendDefaultDirName=False
VersionInfoVersion=1.17.1
VersionInfoCompany=Turtle WoW

[Files]
Source: "WoW.exe"; DestDir: "{app}"
Source: "WoWFoV.exe"; DestDir: "{app}"
Source: "patch-5.mpq"; DestDir: "{app}\Data"

[ThirdParty]
UseRelativePaths=True

[CustomMessages]
MSG_TURTLE_INCORRECT_DIR=You must point to correct Turtle WoW 1.17.0 installation directory

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
	selectedGameDirectoryWithPatch4 : String;
begin
	Result := True;
	if CurPageID = wpSelectDir then
	begin
		selectedGameDirectoryWithPatch4 := ExpandConstant('{app}\Data\patch-4.mpq');
		if FileExists(selectedGameDirectoryWithPatch4) = True then
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
	
	  for i := 6 to 9 do
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

    // Remove WDB
    DelTree(ExpandConstant('{app}\WDB'), True, True, True);

    // Remove old LFT addon
    DelTree(ExpandConstant('{app}\Interface\AddOns\LFT'), True, True, True);

  end;
end;
