# Turtle-WoW Emulation Server Source Code

This repository was initiated after the Turtle-WoW server was presumably compromised through a reverse payload, exploit in their CMS or potentially by a malicious team member.

## Important Notice

**Caution:** Users should be aware of the possibility of backdoors, exploits, or other malicious elements within the source files due to the history of the owner of Turtle-WoW, known as Shenna/Torta. Exercise caution when using or reviewing the code.

## Disclaimer

- **No Liability:** I am not liable for any issues, damages, or legal consequences that may arise from the use of this source code.
- **No Affiliation:** I have no affiliation with Turtle-WoW or any related parties. This repository is for informational purposes only.
- **Rights:** The rights to almost all material included in this repository belong to Blizzard Entertainment or Activision, as applicable.

Use this source code at your own risk. Ensure you thoroughly review and understand the code before making any use of it.

## Authentication Databases

I have not included the authentication databases in this repository for privacy and moral reasons. It is advised to never use the same password across different platforms, especially not on shady emulation projects.

Passwords used up to Cataclysm can be easily cracked due to limitations set by the client. So it’s not a matter of if, but when the passwords will be decrypted.

## Security Advisory

Whenever you connect to a Vanilla, TBC, WotLK (and possibly higher expansion) server, you are susceptible to a payload that can run malicious code on your system. Fortunately, this leak has prompted the community to create a fix to counter such payload injections for the WotLK (3.3.5a) client of the game, by disabling Warden (anti-cheat system). You can view this fix here: [RCEPatcher](https://github.com/stoneharry/RCEPatcher). Be aware that this fix prevents you playing on Warden enabled servers.

On top of this, if you logged in and received a patch in the last couple of days, you might be infected with a virus. The Vanilla and Burning Crusade clients are especially insecure, because the RSA keys got cracked, the Turtle-WoW uses this patching mechanism in the client. There is information going around in the community that the hacker(s) tried to exploit this, but it's unclear.

For more information, you can refer to the [original_readme.txt](original_readme.txt) included in this leak.