local RPLL = RPLL
RPLL.VERSION = 34
RPLL.MAX_MESSAGE_LENGTH = 300
RPLL.MESSAGE_PREFIX = "RPLL_H_"
RPLL.CONSOLIDATE_CHARACTER = "{"

RPLL.PlayerInformation = {}
RPLL.PlayerRotation = {}
RPLL.RotationLength = 0
RPLL.RotationIndex = 1
RPLL.ExtraMessages = {}
RPLL.ExtraMessageLength = 0
RPLL.ExtraMessageIndex = 1
RPLL.Synchronizers = {}

local strsplit = strsplit
local strjoin = strjoin
local tinsert = table.insert
local UnitName = UnitName
local UnitSex = UnitSex
local UnitRace = UnitRace
local UnitClass = UnitClass
local GetGuildInfo = GetGuildInfo
local GetInventoryItemLink = GetInventoryItemLink
local UnitGUID = UnitGUID
local IsInInstance = IsInInstance
local UnitIsPlayer = UnitIsPlayer
local strfind = string.find
local strsub = string.sub
local GetNumTalents = GetNumTalents
local GetTalentInfo = GetTalentInfo
local GetNumRaidMembers = GetNumRaidMembers
local GetNumPartyMembers = GetNumPartyMembers
local strlen = strlen
local GetArenaTeam = GetArenaTeam
local GetInspectArenaTeamData = GetInspectArenaTeamData
local date = date
local GetInstanceInfo = GetInstanceInfo
local GetNumSavedInstances = GetNumSavedInstances
local GetSavedInstanceInfo = GetSavedInstanceInfo
local unpack = unpack
local GetCurrentMapAreaID = GetCurrentMapAreaID
local setglobal = setglobal
local NotifyInspect = NotifyInspect
local CanInspect = CanInspect
local Unknown = UNKNOWN

local SpellFailedCombatLogEvents = {
    "SPELL_FAILED_AFFECTING_COMBAT",
    "SPELL_FAILED_ALREADY_BEING_TAMED",
    "SPELL_FAILED_ALREADY_HAVE_CHARM",
    "SPELL_FAILED_ALREADY_HAVE_SUMMON",
    "SPELL_FAILED_ALREADY_OPEN",
    "SPELL_FAILED_ARTISAN_RIDING_REQUIREMENT",
    "SPELL_FAILED_AURA_BOUNCED",
    "SPELL_FAILED_BAD_IMPLICIT_TARGETS",
    "SPELL_FAILED_BAD_TARGETS",
    "SPELL_FAILED_BM_OR_INVISGOD",
    "SPELL_FAILED_CANT_BE_CHARMED",
    "SPELL_FAILED_CANT_BE_DISENCHANTED",
    "SPELL_FAILED_CANT_BE_DISENCHANTED_SKILL",
    "SPELL_FAILED_CANT_BE_MILLED",
    "SPELL_FAILED_CANT_BE_PROSPECTED",
    "SPELL_FAILED_CANT_CAST_ON_TAPPED",
    "SPELL_FAILED_CANT_DO_THAT_RIGHT_NOW",
    "SPELL_FAILED_CANT_DUEL_WHILE_INVISIBLE",
    "SPELL_FAILED_CANT_DUEL_WHILE_STEALTHED",
    "SPELL_FAILED_CANT_STEALTH",
    "SPELL_FAILED_CASTER_AURASTATE",
    "SPELL_FAILED_CASTER_DEAD",
    "SPELL_FAILED_CASTER_DEAD_FEMALE",
    "SPELL_FAILED_CAST_NOT_HERE",
    "SPELL_FAILED_CHARMED",
    "SPELL_FAILED_CHEST_IN_USE",
    "SPELL_FAILED_CONFUSED",
    "SPELL_FAILED_CUSTOM_ERROR_1",
    "SPELL_FAILED_CUSTOM_ERROR_10",
    "SPELL_FAILED_CUSTOM_ERROR_11",
    "SPELL_FAILED_CUSTOM_ERROR_12",
    "SPELL_FAILED_CUSTOM_ERROR_13",
    "SPELL_FAILED_CUSTOM_ERROR_14_NONE",
    "SPELL_FAILED_CUSTOM_ERROR_15",
    "SPELL_FAILED_CUSTOM_ERROR_16",
    "SPELL_FAILED_CUSTOM_ERROR_17",
    "SPELL_FAILED_CUSTOM_ERROR_18",
    "SPELL_FAILED_CUSTOM_ERROR_19",
    "SPELL_FAILED_CUSTOM_ERROR_2",
    "SPELL_FAILED_CUSTOM_ERROR_20",
    "SPELL_FAILED_CUSTOM_ERROR_21",
    "SPELL_FAILED_CUSTOM_ERROR_22",
    "SPELL_FAILED_CUSTOM_ERROR_23",
    "SPELL_FAILED_CUSTOM_ERROR_24",
    "SPELL_FAILED_CUSTOM_ERROR_25",
    "SPELL_FAILED_CUSTOM_ERROR_26",
    "SPELL_FAILED_CUSTOM_ERROR_27",
    "SPELL_FAILED_CUSTOM_ERROR_28",
    "SPELL_FAILED_CUSTOM_ERROR_29",
    "SPELL_FAILED_CUSTOM_ERROR_3",
    "SPELL_FAILED_CUSTOM_ERROR_30",
    "SPELL_FAILED_CUSTOM_ERROR_31",
    "SPELL_FAILED_CUSTOM_ERROR_32",
    "SPELL_FAILED_CUSTOM_ERROR_33",
    "SPELL_FAILED_CUSTOM_ERROR_34",
    "SPELL_FAILED_CUSTOM_ERROR_35",
    "SPELL_FAILED_CUSTOM_ERROR_36",
    "SPELL_FAILED_CUSTOM_ERROR_37",
    "SPELL_FAILED_CUSTOM_ERROR_38",
    "SPELL_FAILED_CUSTOM_ERROR_39",
    "SPELL_FAILED_CUSTOM_ERROR_4",
    "SPELL_FAILED_CUSTOM_ERROR_40",
    "SPELL_FAILED_CUSTOM_ERROR_41",
    "SPELL_FAILED_CUSTOM_ERROR_42",
    "SPELL_FAILED_CUSTOM_ERROR_43",
    "SPELL_FAILED_CUSTOM_ERROR_44",
    "SPELL_FAILED_CUSTOM_ERROR_45",
    "SPELL_FAILED_CUSTOM_ERROR_46",
    "SPELL_FAILED_CUSTOM_ERROR_47",
    "SPELL_FAILED_CUSTOM_ERROR_48",
    "SPELL_FAILED_CUSTOM_ERROR_49",
    "SPELL_FAILED_CUSTOM_ERROR_5",
    "SPELL_FAILED_CUSTOM_ERROR_50",
    "SPELL_FAILED_CUSTOM_ERROR_51",
    "SPELL_FAILED_CUSTOM_ERROR_52",
    "SPELL_FAILED_CUSTOM_ERROR_53",
    "SPELL_FAILED_CUSTOM_ERROR_54",
    "SPELL_FAILED_CUSTOM_ERROR_55",
    "SPELL_FAILED_CUSTOM_ERROR_56",
    "SPELL_FAILED_CUSTOM_ERROR_57",
    "SPELL_FAILED_CUSTOM_ERROR_58",
    "SPELL_FAILED_CUSTOM_ERROR_59",
    "SPELL_FAILED_CUSTOM_ERROR_6",
    "SPELL_FAILED_CUSTOM_ERROR_60",
    "SPELL_FAILED_CUSTOM_ERROR_61",
    "SPELL_FAILED_CUSTOM_ERROR_62",
    "SPELL_FAILED_CUSTOM_ERROR_63_NONE",
    "SPELL_FAILED_CUSTOM_ERROR_64_NONE",
    "SPELL_FAILED_CUSTOM_ERROR_65",
    "SPELL_FAILED_CUSTOM_ERROR_66",
    "SPELL_FAILED_CUSTOM_ERROR_67",
    "SPELL_FAILED_CUSTOM_ERROR_7",
    "SPELL_FAILED_CUSTOM_ERROR_75",
    "SPELL_FAILED_CUSTOM_ERROR_76",
    "SPELL_FAILED_CUSTOM_ERROR_77",
    "SPELL_FAILED_CUSTOM_ERROR_78",
    "SPELL_FAILED_CUSTOM_ERROR_79",
    "SPELL_FAILED_CUSTOM_ERROR_8",
    "SPELL_FAILED_CUSTOM_ERROR_83",
    "SPELL_FAILED_CUSTOM_ERROR_84",
    "SPELL_FAILED_CUSTOM_ERROR_85",
    "SPELL_FAILED_CUSTOM_ERROR_86",
    "SPELL_FAILED_CUSTOM_ERROR_87",
    "SPELL_FAILED_CUSTOM_ERROR_88",
    "SPELL_FAILED_CUSTOM_ERROR_9",
    "SPELL_FAILED_CUSTOM_ERROR_90",
    "SPELL_FAILED_CUSTOM_ERROR_96",
    "SPELL_FAILED_CUSTOM_ERROR_97",
    "SPELL_FAILED_CUSTOM_ERROR_98",
    "SPELL_FAILED_CUSTOM_ERROR_99",
    "SPELL_FAILED_DAMAGE_IMMUNE",
    "SPELL_FAILED_EQUIPPED_ITEM",
    "SPELL_FAILED_EQUIPPED_ITEM_CLASS",
    "SPELL_FAILED_EQUIPPED_ITEM_CLASS_MAINHAND",
    "SPELL_FAILED_EQUIPPED_ITEM_CLASS_OFFHAND",
    "SPELL_FAILED_ERROR",
    "SPELL_FAILED_EXPERT_RIDING_REQUIREMENT",
    "SPELL_FAILED_FISHING_TOO_LOW",
    "SPELL_FAILED_FIZZLE",
    "SPELL_FAILED_FLEEING",
    "SPELL_FAILED_FOOD_LOWLEVEL",
    "SPELL_FAILED_GLYPH_SOCKET_LOCKED",
    "SPELL_FAILED_HIGHLEVEL",
    "SPELL_FAILED_IMMUNE",
    "SPELL_FAILED_INCORRECT_AREA",
    "SPELL_FAILED_INTERRUPTED",
    "SPELL_FAILED_INTERRUPTED_COMBAT",
    "SPELL_FAILED_INVALID_GLYPH",
    "SPELL_FAILED_ITEM_ALREADY_ENCHANTED",
    "SPELL_FAILED_ITEM_AT_MAX_CHARGES",
    "SPELL_FAILED_ITEM_ENCHANT_TRADE_WINDOW",
    "SPELL_FAILED_ITEM_GONE",
    "SPELL_FAILED_ITEM_NOT_FOUND",
    "SPELL_FAILED_ITEM_NOT_READY",
    "SPELL_FAILED_LEVEL_REQUIREMENT",
    "SPELL_FAILED_LEVEL_REQUIREMENT_PET",
    "SPELL_FAILED_LIMIT_CATEGORY_EXCEEDED",
    "SPELL_FAILED_LINE_OF_SIGHT",
    "SPELL_FAILED_LOWLEVEL",
    "SPELL_FAILED_LOW_CASTLEVEL",
    "SPELL_FAILED_MAINHAND_EMPTY",
    "SPELL_FAILED_MIN_SKILL",
    "SPELL_FAILED_MOVING",
    "SPELL_FAILED_NEED_AMMO",
    "SPELL_FAILED_NEED_AMMO_POUCH",
    "SPELL_FAILED_NEED_EXOTIC_AMMO",
    "SPELL_FAILED_NEED_MORE_ITEMS",
    "SPELL_FAILED_NOPATH",
    "SPELL_FAILED_NOTHING_TO_DISPEL",
    "SPELL_FAILED_NOTHING_TO_STEAL",
    "SPELL_FAILED_NOT_BEHIND",
    "SPELL_FAILED_NOT_FISHABLE",
    "SPELL_FAILED_NOT_FLYING",
    "SPELL_FAILED_NOT_HERE",
    "SPELL_FAILED_NOT_IDLE",
    "SPELL_FAILED_NOT_INACTIVE",
    "SPELL_FAILED_NOT_INFRONT",
    "SPELL_FAILED_NOT_IN_ARENA",
    "SPELL_FAILED_NOT_IN_BARBERSHOP",
    "SPELL_FAILED_NOT_IN_BATTLEGROUND",
    "SPELL_FAILED_NOT_IN_CONTROL",
    "SPELL_FAILED_NOT_IN_RAID_INSTANCE",
    "SPELL_FAILED_NOT_KNOWN",
    "SPELL_FAILED_NOT_MOUNTED",
    "SPELL_FAILED_NOT_ON_DAMAGE_IMMUNE",
    "SPELL_FAILED_NOT_ON_GROUND",
    "SPELL_FAILED_NOT_ON_MOUNTED",
    "SPELL_FAILED_NOT_ON_SHAPESHIFT",
    "SPELL_FAILED_NOT_ON_STEALTHED",
    "SPELL_FAILED_NOT_ON_TAXI",
    "SPELL_FAILED_NOT_ON_TRANSPORT",
    "SPELL_FAILED_NOT_READY",
    "SPELL_FAILED_NOT_SHAPESHIFT",
    "SPELL_FAILED_NOT_STANDING",
    "SPELL_FAILED_NOT_TRADEABLE",
    "SPELL_FAILED_NOT_TRADING",
    "SPELL_FAILED_NOT_UNSHEATHED",
    "SPELL_FAILED_NOT_WHILE_FATIGUED",
    "SPELL_FAILED_NOT_WHILE_GHOST",
    "SPELL_FAILED_NOT_WHILE_LOOTING",
    "SPELL_FAILED_NOT_WHILE_TRADING",
    "SPELL_FAILED_NO_AMMO",
    "SPELL_FAILED_NO_CHAMPION",
    "SPELL_FAILED_NO_CHARGES_REMAIN",
    "SPELL_FAILED_NO_COMBO_POINTS",
    "SPELL_FAILED_NO_DUELING",
    "SPELL_FAILED_NO_EDIBLE_CORPSES",
    "SPELL_FAILED_NO_ENDURANCE",
    "SPELL_FAILED_NO_EVASIVE_CHARGES",
    "SPELL_FAILED_NO_FISH",
    "SPELL_FAILED_NO_ITEMS_WHILE_SHAPESHIFTED",
    "SPELL_FAILED_NO_MAGIC_TO_CONSUME",
    "SPELL_FAILED_NO_MOUNTS_ALLOWED",
    "SPELL_FAILED_NO_PET",
    "SPELL_FAILED_NO_PLAYTIME",
    "SPELL_FAILED_ONLY_ABOVEWATER",
    "SPELL_FAILED_ONLY_BATTLEGROUNDS",
    "SPELL_FAILED_ONLY_DAYTIME",
    "SPELL_FAILED_ONLY_INDOORS",
    "SPELL_FAILED_ONLY_IN_ARENA",
    "SPELL_FAILED_ONLY_MOUNTED",
    "SPELL_FAILED_ONLY_NIGHTTIME",
    "SPELL_FAILED_ONLY_OUTDOORS",
    "SPELL_FAILED_ONLY_SHAPESHIFT",
    "SPELL_FAILED_ONLY_STEALTHED",
    "SPELL_FAILED_ONLY_UNDERWATER",
    "SPELL_FAILED_OUT_OF_RANGE",
    "SPELL_FAILED_PACIFIED",
    "SPELL_FAILED_PARTIAL_PLAYTIME",
    "SPELL_FAILED_PET_CAN_RENAME",
    "SPELL_FAILED_POSSESSED",
    "SPELL_FAILED_PREVENTED_BY_MECHANIC",
    "SPELL_FAILED_REAGENTS",
    "SPELL_FAILED_REPUTATION",
    "SPELL_FAILED_REQUIRES_AREA",
    "SPELL_FAILED_REQUIRES_SPELL_FOCUS",
    "SPELL_FAILED_ROCKET_PACK",
    "SPELL_FAILED_ROOTED",
    "SPELL_FAILED_SILENCED",
    "SPELL_FAILED_SPELL_IN_PROGRESS",
    "SPELL_FAILED_SPELL_LEARNED",
    "SPELL_FAILED_SPELL_UNAVAILABLE",
    "SPELL_FAILED_SPELL_UNAVAILABLE_PET",
    "SPELL_FAILED_STUNNED",
    "SPELL_FAILED_SUMMON_PENDING",
    "SPELL_FAILED_TARGETS_DEAD",
    "SPELL_FAILED_TARGET_AFFECTING_COMBAT",
    "SPELL_FAILED_TARGET_AURASTATE",
    "SPELL_FAILED_TARGET_CANNOT_BE_RESURRECTED",
    "SPELL_FAILED_TARGET_DUELING",
    "SPELL_FAILED_TARGET_ENEMY",
    "SPELL_FAILED_TARGET_ENRAGED",
    "SPELL_FAILED_TARGET_FREEFORALL",
    "SPELL_FAILED_TARGET_FRIENDLY",
    "SPELL_FAILED_TARGET_IN_COMBAT",
    "SPELL_FAILED_TARGET_IS_PLAYER",
    "SPELL_FAILED_TARGET_IS_PLAYER_CONTROLLED",
    "SPELL_FAILED_TARGET_IS_TRIVIAL",
    "SPELL_FAILED_TARGET_LOCKED_TO_RAID_INSTANCE",
    "SPELL_FAILED_TARGET_NOT_DEAD",
    "SPELL_FAILED_TARGET_NOT_GHOST",
    "SPELL_FAILED_TARGET_NOT_IN_INSTANCE",
    "SPELL_FAILED_TARGET_NOT_IN_PARTY",
    "SPELL_FAILED_TARGET_NOT_IN_RAID",
    "SPELL_FAILED_TARGET_NOT_IN_SANCTUARY",
    "SPELL_FAILED_TARGET_NOT_LOOTED",
    "SPELL_FAILED_TARGET_NOT_PLAYER",
    "SPELL_FAILED_TARGET_NO_POCKETS",
    "SPELL_FAILED_TARGET_NO_RANGED_WEAPONS",
    "SPELL_FAILED_TARGET_NO_WEAPONS",
    "SPELL_FAILED_TARGET_ON_TAXI",
    "SPELL_FAILED_TARGET_UNSKINNABLE",
    "SPELL_FAILED_TOO_CLOSE",
    "SPELL_FAILED_TOO_MANY_OF_ITEM",
    "SPELL_FAILED_TOO_SHALLOW",
    "SPELL_FAILED_TOTEMS",
    "SPELL_FAILED_TOTEM_CATEGORY",
    "SPELL_FAILED_TRANSFORM_UNUSABLE",
    "SPELL_FAILED_TRY_AGAIN",
    "SPELL_FAILED_UNIQUE_GLYPH",
    "SPELL_FAILED_UNIT_NOT_BEHIND",
    "SPELL_FAILED_UNIT_NOT_INFRONT",
    "SPELL_FAILED_UNKNOWN",
    "SPELL_FAILED_WRONG_PET_FOOD",
    "SPELL_FAILED_WRONG_WEATHER",
    "ERR_OUT_OF_ENERGY",
    "ERR_OUT_OF_FOCUS",
    "ERR_OUT_OF_HEALTH",
    "ERR_OUT_OF_MANA",
    "ERR_OUT_OF_RANGE",
    "ERR_OUT_OF_RUNES",
    "ERR_OUT_OF_RUNIC_POWER",
}

local message_limiter = {}
local num_messages_per_minute = 60
local message_limiter_wipe_interval = 60
local message_limiter_last_wipe = 0

function RPLL:find_unit_id(name)
    for key, val in pairs(RPLL.PlayerInformation) do
        if val["unit_name"] == name then
            return key
        end
    end
    return nil
end

RPLL:RegisterEvent("CHAT_MSG_ADDON")
RPLL.CHAT_MSG_ADDON = function(prefix, msg, channel, sender)
    if strfind(prefix, RPLL.MESSAGE_PREFIX) ~= nil then
        RPLL.Synchronizers[sender] = true
        if message_limiter[sender] == nil  then
            message_limiter[sender] = 1
        else
            message_limiter[sender] = message_limiter[sender] + 1
        end
        if message_limiter[sender] > num_messages_per_minute then
            return
        end

        if strfind(prefix, "LOOT") ~= nil then
            tinsert(RPLL.ExtraMessages, "LOOT: " .. date("%d.%m.%y %H:%M:%S") .. "&" .. msg)
            RPLL.ExtraMessageLength = RPLL.ExtraMessageLength + 1
        elseif strfind(prefix, "PET") ~= nil then
            tinsert(RPLL.ExtraMessages, "PET_SUMMON: " .. date("%d.%m.%y %H:%M:%S") .. "&" .. msg)
            RPLL.ExtraMessageLength = RPLL.ExtraMessageLength + 1
        elseif strfind(prefix, "CBT_I_1") ~= nil then
            local unit_guid, unit_name, race, hero_class, gender, g_name, g_rank_name, g_rank_index = strsplit("&", msg)
            local found_unit_id = RPLL.find_unit_id(sender)
            if found_unit_id ~= nil then
                unit_guid = found_unit_id
            end

            if unit_guid == "nil" or unit_name == "nil" or race == "nil" or gender == "nil" or hero_class == "nil" then
                return
            end

            if RPLL.PlayerInformation[unit_guid] == nil then
                RPLL.PlayerInformation[unit_guid] = {}
            end

            local player_info = RPLL.PlayerInformation[unit_guid]

            player_info["last_updated"] = date("%d.%m.%y %H:%M:%S")
            player_info["last_updated_time"] = time()
            player_info["unit_guid"] = unit_guid
            player_info["unit_name"] = sender
            player_info["race"] = race
            player_info["hero_class"] = hero_class
            player_info["gender"] = gender
            if player_info["gear"] == nil then
                player_info["gear"] = {}
            end
            if player_info["arena_teams"] == nil then
                player_info["arena_teams"] = {}
            end

            if g_name ~= "nil" then
                player_info["guild_name"] = g_name
                player_info["guild_rank_name"] = g_rank_name
                player_info["guild_rank_index"] = g_rank_index
            end

            if not RPLL:PlayerIsQueued(unit_guid) then
                tinsert(RPLL.PlayerRotation, sender)
                RPLL.RotationLength = RPLL.RotationLength + 1
            end
        elseif strfind(prefix, "CBT_I_2") ~= nil then
            local unit_guid, talents, team1, team2, team3 = strsplit("&", msg)
            local found_unit_id = RPLL.find_unit_id(sender)
            if found_unit_id ~= nil then
                unit_guid = found_unit_id
            end

            if unit_guid == "nil" or talents == "nil" then
                return
            end

            if RPLL.PlayerInformation[unit_guid] == nil then
                RPLL.PlayerInformation[unit_guid] = {}
            end

            local player_info = RPLL.PlayerInformation[unit_guid]
            if player_info["gear"] == nil then
                player_info["gear"] = {}
            end
            if player_info["arena_teams"] == nil then
                player_info["arena_teams"] = {}
            end

            player_info["last_updated"] = date("%d.%m.%y %H:%M:%S")
            player_info["last_updated_time"] = time()
            player_info["unit_guid"] = unit_guid
            player_info["talents"] = talents
            if team1 ~= "nil" then
                player_info["arena_teams"][2] = team1
            end
            if team2 ~= "nil" then
                player_info["arena_teams"][3] = team2
            end
            if team3 ~= "nil" then
                player_info["arena_teams"][5] = team3
            end

            if not RPLL:PlayerIsQueued(unit_guid) then
                tinsert(RPLL.PlayerRotation, sender)
                RPLL.RotationLength = RPLL.RotationLength + 1
            end
        elseif strfind(prefix, "CBT_I_3") ~= nil then
            local unit_guid, gear_str = strsplit("&", msg)
            local found_unit_id = RPLL.find_unit_id(sender)
            if found_unit_id ~= nil then
                unit_guid = found_unit_id
            end

            if unit_guid == "nil" or gear_str == "nil" then
                return
            end

            if RPLL.PlayerInformation[unit_guid] == nil then
                RPLL.PlayerInformation[unit_guid] = {}
            end

            local player_info = RPLL.PlayerInformation[unit_guid]
            if player_info["arena_teams"] == nil then
                player_info["arena_teams"] = {}
            end

            player_info["last_updated"] = date("%d.%m.%y %H:%M:%S")
            player_info["last_updated_time"] = time()
            player_info["unit_guid"] = unit_guid

            if player_info["gear"] == nil then
                player_info["gear"] = {}
            end
            local p1, p2, p3, p4, p5 = strsplit("}", gear_str)
            if p1 ~= "nil" then
                player_info["gear"][1] = p1
            end
            if p2 ~= "nil" then
                player_info["gear"][2] = p2
            end
            if p3 ~= "nil" then
                player_info["gear"][3] = p3
            end
            if p4 ~= "nil" then
                player_info["gear"][4] = p4
            end
            if p5 ~= "nil" then
                player_info["gear"][5] = p5
            end

            if not RPLL:PlayerIsQueued(unit_guid) then
                tinsert(RPLL.PlayerRotation, sender)
                RPLL.RotationLength = RPLL.RotationLength + 1
            end
        elseif strfind(prefix, "CBT_I_4") ~= nil then
            local unit_guid, gear_str = strsplit("&", msg)
            local found_unit_id = RPLL.find_unit_id(sender)
            if found_unit_id ~= nil then
                unit_guid = found_unit_id
            end

            if unit_guid == "nil" or gear_str == "nil" then
                return
            end

            if RPLL.PlayerInformation[unit_guid] == nil then
                RPLL.PlayerInformation[unit_guid] = {}
            end

            local player_info = RPLL.PlayerInformation[unit_guid]

            if player_info["arena_teams"] == nil then
                player_info["arena_teams"] = {}
            end

            player_info["last_updated"] = date("%d.%m.%y %H:%M:%S")
            player_info["last_updated_time"] = time()
            player_info["unit_guid"] = unit_guid

            if player_info["gear"] == nil then
                player_info["gear"] = {}
            end
            local p1, p2, p3, p4, p5 = strsplit("}", gear_str)
            if p1 ~= "nil" then
                player_info["gear"][6] = p1
            end
            if p2 ~= "nil" then
                player_info["gear"][7] = p2
            end
            if p3 ~= "nil" then
                player_info["gear"][8] = p3
            end
            if p4 ~= "nil" then
                player_info["gear"][9] = p4
            end
            if p5 ~= "nil" then
                player_info["gear"][10] = p5
            end

            if not RPLL:PlayerIsQueued(unit_guid) then
                tinsert(RPLL.PlayerRotation, sender)
                RPLL.RotationLength = RPLL.RotationLength + 1
            end
        elseif strfind(prefix, "CBT_I_5") ~= nil then
            local unit_guid, gear_str = strsplit("&", msg)
            local found_unit_id = RPLL.find_unit_id(sender)
            if found_unit_id ~= nil then
                unit_guid = found_unit_id
            end

            if unit_guid == "nil" or gear_str == "nil" then
                return
            end

            if RPLL.PlayerInformation[unit_guid] == nil then
                RPLL.PlayerInformation[unit_guid] = {}
            end

            local player_info = RPLL.PlayerInformation[unit_guid]
            if player_info["arena_teams"] == nil then
                player_info["arena_teams"] = {}
            end

            player_info["last_updated"] = date("%d.%m.%y %H:%M:%S")
            player_info["last_updated_time"] = time()
            player_info["unit_guid"] = unit_guid

            if player_info["gear"] == nil then
                player_info["gear"] = {}
            end
            local p1, p2, p3, p4, p5 = strsplit("}", gear_str)
            if p1 ~= "nil" then
                player_info["gear"][11] = p1
            end
            if p2 ~= "nil" then
                player_info["gear"][12] = p2
            end
            if p3 ~= "nil" then
                player_info["gear"][13] = p3
            end
            if p4 ~= "nil" then
                player_info["gear"][14] = p4
            end
            if p5 ~= "nil" then
                player_info["gear"][15] = p5
            end

            if not RPLL:PlayerIsQueued(unit_guid) then
                tinsert(RPLL.PlayerRotation, sender)
                RPLL.RotationLength = RPLL.RotationLength + 1
            end
        elseif strfind(prefix, "CBT_I_6") ~= nil then
            local unit_guid, gear_str = strsplit("&", msg)
            local found_unit_id = RPLL.find_unit_id(sender)
            if found_unit_id ~= nil then
                unit_guid = found_unit_id
            end

            if unit_guid == "nil" or gear_str == "nil" then
                return
            end

            if RPLL.PlayerInformation[unit_guid] == nil then
                RPLL.PlayerInformation[unit_guid] = {}
            end

            local player_info = RPLL.PlayerInformation[unit_guid]
            if player_info["arena_teams"] == nil then
                player_info["arena_teams"] = {}
            end

            player_info["last_updated"] = date("%d.%m.%y %H:%M:%S")
            player_info["last_updated_time"] = time()
            player_info["unit_guid"] = unit_guid

            if player_info["gear"] == nil then
                player_info["gear"] = {}
            end
            local p1, p2, p3, p4 = strsplit("}", gear_str)
            if p1 ~= "nil" then
                player_info["gear"][16] = p1
            end
            if p2 ~= "nil" then
                player_info["gear"][17] = p2
            end
            if p3 ~= "nil" then
                player_info["gear"][18] = p3
            end
            if p4 ~= "nil" then
                player_info["gear"][19] = p4
            end

            if not RPLL:PlayerIsQueued(unit_guid) then
                tinsert(RPLL.PlayerRotation, sender)
                RPLL.RotationLength = RPLL.RotationLength + 1
            end
        end
    end
end

RPLL:RegisterEvent("UPDATE_MOUSEOVER_UNIT")
RPLL.UPDATE_MOUSEOVER_UNIT = function()
    RPLL:CollectUnit("mouseover")
end
RPLL:RegisterEvent("PLAYER_TARGET_CHANGED")
RPLL.PLAYER_TARGET_CHANGED = function()
    RPLL:CollectUnit("target")
end
RPLL:RegisterEvent("RAID_ROSTER_UPDATE")
RPLL.RAID_ROSTER_UPDATE = function()
    for i = 1, GetNumRaidMembers() do
        if UnitName("raid" .. i) then
            RPLL:CollectUnit("raid" .. i)
        end
    end
end
RPLL:RegisterEvent("PARTY_MEMBERS_CHANGED")
RPLL.PARTY_MEMBERS_CHANGED = function()
    for i = 1, GetNumPartyMembers() do
        if UnitName("party" .. i) then
            RPLL:CollectUnit("party" .. i)
        end
    end
end

RPLL:RegisterEvent("ZONE_CHANGED_NEW_AREA")
RPLL.ZONE_CHANGED_NEW_AREA = function()
    LoggingCombat(IsInInstance("player"))
    RPLL:PushCurrentInstanceInfo()
end
RPLL:RegisterEvent("UPDATE_INSTANCE_INFO")
RPLL.UPDATE_INSTANCE_INFO = function()
    LoggingCombat(IsInInstance("player"))
    RPLL:PushCurrentInstanceInfo()
end
RPLL:RegisterEvent("PLAYER_REGEN_ENABLED")
RPLL.PLAYER_REGEN_ENABLED = function()
    RPLL:PushCurrentInstanceInfo()
end
RPLL:RegisterEvent("PLAYER_DIFFICULTY_CHANGED")
RPLL.PLAYER_DIFFICULTY_CHANGED = function()
    RPLL:PushCurrentInstanceInfo()
end

RPLL:RegisterEvent("UNIT_PET")
RPLL.UNIT_PET = function(unit)
    RPLL:CollectUnit(unit)
end
RPLL:RegisterEvent("UNIT_ENTERED_VEHICLE")
RPLL.UNIT_ENTERED_VEHICLE = function(unit)
    RPLL:CollectUnit(unit)
end

RPLL:RegisterEvent("PLAYER_PET_CHANGED")
RPLL.PLAYER_PET_CHANGED = function()
    RPLL:CollectUnit("player")
end
RPLL:RegisterEvent("PET_STABLE_CLOSED")
RPLL.PET_STABLE_CLOSED = function()
    RPLL:CollectUnit("player")
end

RPLL:RegisterEvent("CHAT_MSG_LOOT")
RPLL.CHAT_MSG_LOOT = function(msg)
    if not IsInInstance() or RPLL:ContainsSynchronizer(msg) then
        return
    end
    RPLL:PushExtraMessage("LOOT", msg)
end

RPLL:RegisterEvent("COMBAT_LOG_EVENT_UNFILTERED")
RPLL.COMBAT_LOG_EVENT_UNFILTERED = function(ts, evt)
    if evt == "SPELL_CAST_FAILED" then
        RPLL:RotateSpellFailedMessages()
    end
end

local initialized = false
RPLL:RegisterEvent("PLAYER_ENTERING_WORLD")
RPLL.PLAYER_ENTERING_WORLD = function()
    if initialized then
        return
    end
    initialized = true

    if RPLL_PlayerInformation == nil then
        RPLL_PlayerInformation = {}
    else
        RPLL.PlayerInformation = RPLL_PlayerInformation
        for key, val in pairs(RPLL.PlayerInformation) do
            tinsert(RPLL.PlayerRotation, key)
            RPLL.RotationLength = RPLL.RotationLength + 1
        end
    end

    UIErrorsFrame:Hide()
    UIErrorsFrame.Show = function() end
    local player_name = UnitName("player")

    LOOT_ITEM_CREATED_SELF = player_name .. " creates: %sx1."
    TRADESKILL_LOG_FIRSTPERSON = player_name .. " creates %sx1."
    LOOT_ITEM_CREATED_SELF_MULTIPLE = player_name .. " creates: %sx%d."
    LOOT_ITEM_PUSHED_SELF = player_name .. " receives item: %sx1."
    LOOT_ITEM_PUSHED_SELF_MULTIPLE = player_name .. " receives item: %sx%d."
    LOOT_ITEM_SELF = player_name .. " receives loot: %sx1."
    LOOT_ITEM = "%s receives loot: %sx1."
    LOOT_ITEM_SELF_MULTIPLE = player_name .. " receives loot: %sx%d."

    SLASH_rpll1 = "/rpll"
    SLASH_rpll2 = "/RPLL"
    SlashCmdList["rpll"] = function(msg)
        if msg == "nuke" then
            RPLL_PlayerInformation = {}
            RPLL.PlayerInformation = {}
            RPLL.PlayerRotation = {}
            RPLL.RotationLength = 0
            RPLL.RotationIndex = 1
            RPLL.ExtraMessages = {}
            RPLL.ExtraMessageLength = 0
            RPLL.ExtraMessageIndex = 1
            RPLL:SendMessage("Log nuked")
            RPLL:CollectUnit("player")
            RPLL:RAID_ROSTER_UPDATE()
            RPLL:PARTY_MEMBERS_CHANGED()
        else
            RPLL:SendMessage("LegacyPlayers: To nuke a log type: /rpll nuke!");
        end
    end

    RPLL:SendMessage("LegacyPlayers collector v" .. RPLL.VERSION .. " has been loaded. Type /rpll for help.")

    RPLL:CollectUnit("player")
    RPLL:RAID_ROSTER_UPDATE()
    RPLL:PARTY_MEMBERS_CHANGED()
end

RPLL:RegisterEvent("PLAYER_LOGOUT")
RPLL.PLAYER_LOGOUT = function()
    RPLL_PlayerInformation = RPLL.PlayerInformation
end

RPLL:RegisterEvent("UNIT_INVENTORY_CHANGED")
RPLL.UNIT_INVENTORY_CHANGED = function(unit)
    RPLL:CollectUnit(unit)
end

RPLL:RegisterEvent("INSPECT_TALENT_READY")
RPLL.INSPECT_TALENT_READY = function()
    RPLL:CollectCurrentTalentsAndArenaTeams()
end

local inspect_queue = {}
local inspect_queue_length = 0
local inspect_queue_index = 1
local inspect_queue_last_inspect = 0
local inspect_timeout = 3 -- 3 seconds
local inspect_in_progress = false
function RPLL:OnUpdate()
    -- Suppress Addon Error frame
    if StaticPopup1 ~= nil and StaticPopup1:IsShown() ~= nil and strfind(StaticPopup1Text:GetText(), "AdvancedWotLKCombatLog") ~= nil then
        StaticPopup1:Hide()
    end

    if inspect_queue_length >= inspect_queue_index then
        if not inspect_in_progress or time() - inspect_queue_last_inspect >= inspect_timeout then
            inspect_in_progress = true
            inspect_queue_last_inspect = time()
            NotifyInspect(inspect_queue[inspect_queue_index][1])
            inspect_queue_index = inspect_queue_index + 1
        end
    end

    if time() - message_limiter_last_wipe >= message_limiter_wipe_interval then
        message_limiter_last_wipe = time()
        message_limiter = {}
    end
end

function RPLL:ContainsSynchronizer(msg)
    if msg == nil then
        return true
    end

    for key, val in pairs(RPLL.Synchronizers) do
        if strfind(msg, key) ~= nil then
            return true
        end
    end
    return false
end

function RPLL:RotateSpellFailedMessages()
    local result = ""
    if RPLL.ExtraMessageIndex <= RPLL.ExtraMessageLength then
        local consolidate_count = 1
        local current_result = "CONSOLIDATED: " .. RPLL.ExtraMessages[RPLL.ExtraMessageIndex]
        for i = RPLL.ExtraMessageIndex + 1, RPLL.ExtraMessageLength do
            local pot_new_result = current_result .. RPLL.CONSOLIDATE_CHARACTER .. RPLL.ExtraMessages[i]
            if strlen(pot_new_result) < RPLL.MAX_MESSAGE_LENGTH then
                current_result = pot_new_result
                consolidate_count = consolidate_count + 1
            else
                break
            end
        end
        result = current_result
        RPLL.ExtraMessageIndex = RPLL.ExtraMessageIndex + consolidate_count
    elseif RPLL.RotationIndex <= RPLL.RotationLength and RPLL.PlayerInformation[RPLL.PlayerRotation[RPLL.RotationIndex]] ~= nil then
        result = "COMBATANT_INFO: "..RPLL:SerializePlayerInformation()
        RPLL.RotationIndex = RPLL.RotationIndex + 1
    else
        result = "NONE"
    end
    for _, evt in pairs(SpellFailedCombatLogEvents) do
        setglobal(evt, result)
    end
end

function RPLL:SerializePlayerInformation()
    local val = RPLL.PlayerInformation[RPLL.PlayerRotation[RPLL.RotationIndex]]

    local gear = prep_value(val["gear"][1])
    for i = 2, 19 do
        gear = gear .. "}" .. prep_value(val["gear"][i])
    end

    return strjoin("&", val["last_updated"], prep_value(val["unit_guid"]), prep_value(val["unit_name"]),
            prep_value(val["race"]), prep_value(val["hero_class"]), prep_value(val["gender"]), prep_value(val["guild_name"]),
            prep_value(val["guild_rank_name"]), prep_value(val["guild_rank_index"]), gear, prep_value(val["talents"]),
            prep_value(val["arena_teams"][2]), prep_value(val["arena_teams"][3]), prep_value(val["arena_teams"][5]))
end

function RPLL:UpdatePlayer(unit_guid, unit_name, race, hero_class, gender, guild_name, guild_rank_name, guild_rank_index)
    if unit_guid == nil or unit_name == nil then
        return
    end

    if RPLL.PlayerInformation[unit_guid] == nil then
        RPLL.PlayerInformation[unit_guid] = {}
    end

    local info = RPLL.PlayerInformation[unit_guid]
    info["unit_guid"] = unit_guid
    info["unit_name"] = unit_name
    info["last_updated"] = date("%d.%m.%y %H:%M:%S")

    if race ~= nil then
        info["race"] = race
    end

    if hero_class ~= nil then
        info["hero_class"] = hero_class
    end

    if gender ~= nil then
        info["gender"] = gender
    end

    if guild_name ~= nil and guild_rank_name ~= nil then
        info["guild_name"] = guild_name
        info["guild_rank_name"] = guild_rank_name
        info["guild_rank_index"] = guild_rank_index
    end

    if info["gear"] == nil then
        info["gear"] = {}
    end

    if info["arena_teams"] == nil then
        info["arena_teams"] = {}
    end

    if not RPLL:PlayerIsQueued(unit_guid) then
        tinsert(RPLL.PlayerRotation, unit_guid)
        RPLL.RotationLength = RPLL.RotationLength + 1
    end
end

function RPLL:CollectGear(unit)
    local unit_guid = UnitGUID(unit)
    if RPLL.PlayerInformation[unit_guid] == nil then
        return
    end

    local info = RPLL.PlayerInformation[unit_guid]
    local gear = {}
    for i = 1, 19 do
        local inv_link = GetInventoryItemLink(unit, i)
        if inv_link == nil then
            gear[i] = nil
        else
            local _, itemId, enchantId, jewelId1, jewelId2, jewelId3,
            jewelId4, suffixId, uniqueId = strsplit(":", inv_link)
            if itemId == nil then
                gear[i] = nil
            else
                gear[i] = strjoin(":", itemId, enchantId, jewelId1, jewelId2, jewelId3, jewelId4, suffixId, uniqueId)
            end
        end
    end

    if info["gear"] == nil then
        info["gear"] = {}
    end
    if gear ~= nil then
        local any_item = false
        for i = 1, 19 do
            if gear[i] ~= nil then
                any_item = true
                break
            end
        end

        if any_item then
            info["gear"] = gear
        end
    end

    if not RPLL:PlayerIsQueued(unit_guid) then
        tinsert(RPLL.PlayerRotation, unit_guid)
        RPLL.RotationLength = RPLL.RotationLength + 1
    end
end

function RPLL:CollectCurrentTalentsAndArenaTeams()
    if inspect_queue_index - 1 > inspect_queue_length then
        return
    end
    local current_inspect = inspect_queue[inspect_queue_index - 1]
    local unit = current_inspect[1]
    local unit_guid = current_inspect[2]

    if UnitGUID(unit) ~= unit_guid then
        return
    end

    if RPLL.PlayerInformation[unit_guid] == nil then
        return
    end
    local info = RPLL.PlayerInformation[unit_guid]

    local talents = { "", "", "" };
    local arena_teams = {}
    for t = 1, 3 do
        local numTalents = GetNumTalents(t, unit_guid ~= UnitGUID("player"));
        -- Last one is missing?
        for i = 1, numTalents do
            local _, _, _, _, currRank = GetTalentInfo(t, i, unit_guid ~= UnitGUID("player"));
            talents[t] = talents[t] .. currRank
        end
    end
    talents = strjoin("}", talents[1], talents[2], talents[3])
    if strlen(talents) <= 10 then
        talents = nil
    end

    for i = 1, 3 do
        local team_name, team_size
        if unit == "player" then
            team_name, team_size = GetArenaTeam(i);
        else
            team_name, team_size = GetInspectArenaTeamData(i);
        end

        if team_name ~= nil and team_size ~= nil then
            arena_teams[team_size] = team_name
        end
    end

    if talents ~= nil then
        info["talents"] = talents
    end

    info["arena_teams"] = {}
    for team_size, team_name in pairs(arena_teams) do
        info["arena_teams"][team_size] = team_name
    end

    inspect_in_progress = false

    if not RPLL:PlayerIsQueued(unit_guid) then
        tinsert(RPLL.PlayerRotation, unit_guid)
        RPLL.RotationLength = RPLL.RotationLength + 1
    end
end

function RPLL:PlayerIsQueued(unit_guid)
    for i=RPLL.RotationIndex, RPLL.RotationLength do
        if RPLL.PlayerRotation[i] == unit_guid then
            return true
        end
    end
    return false
end

function RPLL:CollectUnit(unit)
    if not UnitIsPlayer(unit) then
        return
    end

    if UnitGUID(unit) ~= nil and UnitGUID(unit) == UnitGUID("player") then
        unit = "player"
    end

    local unit_name = UnitName(unit)
    if unit_name == Unknown then
        return
    end

    if RPLL:ContainsSynchronizer(unit_name) then
        return
    end

    local unit_guid = UnitGUID(unit)
    if CanInspect(unit) then
        tinsert(inspect_queue, { unit, unit_guid })
        inspect_queue_length = inspect_queue_length + 1
    end

    local _, unit_race = UnitRace(unit)
    local _, unit_hero_class = UnitClass(unit)
    local unit_gender = UnitSex(unit)
    local guild_name, guild_rank_name, guild_rank_index = GetGuildInfo(unit)

    RPLL:PushPet(unit)
    RPLL:UpdatePlayer(unit_guid, unit_name, unit_race, unit_hero_class, unit_gender, guild_name, guild_rank_name, guild_rank_index)
    RPLL:CollectGear(unit)
end

function RPLL:PushExtraMessage(prefix, msg)
    tinsert(RPLL.ExtraMessages, prefix .. ": " .. date("%d.%m.%y %H:%M:%S") .. "&" .. msg)
    RPLL.ExtraMessageLength = RPLL.ExtraMessageLength + 1
end

function RPLL:PushCurrentInstanceInfo()
    --if not IsInInstance() then
    --    return
    --end

    local name, type, difficultyIndex, difficultyName, maxPlayers, playerDifficulty = GetInstanceInfo()
    if type ~= nil and type ~= "none" then
        local found_instance_id = nil
        for i = 1, GetNumSavedInstances() do
            local instance_name, instance_id, _, _, _, _, _, _, _, instance_difficultyName = GetSavedInstanceInfo(i)
            if name == instance_name and instance_difficultyName == difficultyName then
                found_instance_id = instance_id
                break
            end
        end

        -- Get all participating UnitGUID
        local participants = {}
        tinsert(participants, UnitGUID("player"))
        for i = 1, GetNumRaidMembers() do
            if UnitName("raid" .. i) then
                tinsert(participants, UnitGUID("raid" .. i))
            end
        end
        for i = 1, GetNumPartyMembers() do
            if UnitName("party" .. i) then
                tinsert(participants, UnitGUID("party" .. i))
            end
        end

        RPLL:PushExtraMessage("ZONE_INFO", strjoin("&", name, type, difficultyIndex, difficultyName, maxPlayers, playerDifficulty, GetCurrentMapAreaID(), prep_value(found_instance_id), unpack(participants)))
    else
        RPLL:PushExtraMessage("NONE_ZONE_INFO", "")
    end
end

function RPLL:PushPet(owner_unit)
    if not IsInInstance() then
        return
    end

    local pet_guid = nil;
    if owner_unit == "player" then
        pet_guid = UnitGUID("pet")
    elseif strfind(owner_unit, "raid") then
        pet_guid = UnitGUID("raidpet" .. strsub(owner_unit, 5))
    elseif strfind(owner_unit, "party") then
        pet_guid = UnitGUID("partypet" .. strsub(owner_unit, 6))
    end

    if pet_guid == nil then
        return
    end

    local owner_guid = UnitGUID(owner_unit)
    RPLL:PushExtraMessage("PET_SUMMON", strjoin("&", owner_guid, pet_guid))
end

function RPLL:SendMessage(msg)
    DEFAULT_CHAT_FRAME:AddMessage("|cFFFF8080LegacyPlayers|r: "..msg)
end

function prep_value(val)
    if val == nil then
        return "nil"
    end
    return val
end

function table_contains(table, val)
    for _, v in pairs(table) do
        if v == val then
            return true
        end
    end
    return false
end

function table_len(table)
    local len = 0
    for _, _ in pairs(table) do
        len = len + 1
    end
    return len
end