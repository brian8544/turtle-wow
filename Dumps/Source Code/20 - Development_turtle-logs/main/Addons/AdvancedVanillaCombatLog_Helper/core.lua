local RPLL_HELPER = RPLL_HELPER
RPLL_HELPER.VERSION = 1
RPLL_HELPER.MESSAGE_PREFIX = "RPLL_HELPER_"
RPLL_HELPER.PlayerInfo = {}

RPLL_HELPER:RegisterEvent("ZONE_CHANGED_NEW_AREA")
RPLL_HELPER:RegisterEvent("PLAYER_ENTERING_WORLD")
RPLL_HELPER:RegisterEvent("PLAYER_GUILD_UPDATE")

RPLL_HELPER:RegisterEvent("UNIT_PET")
RPLL_HELPER:RegisterEvent("PLAYER_PET_CHANGED")
RPLL_HELPER:RegisterEvent("PET_STABLE_CLOSED")

RPLL_HELPER:RegisterEvent("CHAT_MSG_LOOT")
RPLL_HELPER:RegisterEvent("UNIT_INVENTORY_CHANGED")

local UnitName = UnitName
local UnitSex = UnitSex
local GetGuildInfo = GetGuildInfo
local GetInventoryItemLink = GetInventoryItemLink
local strfind = string.find
local Unknown = UNKNOWN
local time = time
local date = date
local SendAddonMessage = SendAddonMessage
local GetNumTalents = GetNumTalents
local GetTalentInfo = GetTalentInfo
local strjoin = string.join or function(delim, ...)
    if type(arg) == 'table' then
        return table.concat(arg, delim)
    else
        return delim
    end
end

RPLL_HELPER.ZONE_CHANGED_NEW_AREA = function()
    this:grab_player_information()
end

RPLL_HELPER.PLAYER_GUILD_UPDATE = function()
    this:grab_player_information()
end

RPLL_HELPER.UNIT_INVENTORY_CHANGED = function(unit)
    if unit == "player" then
        this:grab_player_information()
    end
end

local initialized = false
RPLL_HELPER.PLAYER_ENTERING_WORLD = function()
    if initialized then
        return
    end
    initialized = true

    this:grab_player_information()

    local player_name = UnitName("player")
    LOOT_ITEM_CREATED_SELF = player_name .. " creates: %sx1."
    TRADESKILL_LOG_FIRSTPERSON = player_name .. " creates %sx1."
    LOOT_ITEM_CREATED_SELF_MULTIPLE = player_name .. " creates: %sx%d."
    LOOT_ITEM_PUSHED_SELF = player_name .. " receives item: %sx1."
    LOOT_ITEM_PUSHED_SELF_MULTIPLE = player_name .. " receives item: %sx%d."
    LOOT_ITEM_SELF = player_name .. " receives loot: %sx1."
    LOOT_ITEM = "%s receives loot: %sx1."
    LOOT_ITEM_SELF_MULTIPLE = player_name .. " receives loot: %sx%d."

    this:SendMessage("Initialized!")
end

RPLL_HELPER.UNIT_PET = function(unit)
    if unit and unit == "player" then
        this:grab_pet_information()
    end
end

RPLL_HELPER.PLAYER_PET_CHANGED = function()
    this:grab_pet_information()
end

RPLL_HELPER.PET_STABLE_CLOSED = function()
    this:grab_pet_information()
end

RPLL_HELPER.CHAT_MSG_LOOT = function(msg)
    if strfind(msg, UnitName("player")) then
        SendAddonMessage(this.MESSAGE_PREFIX .. "LOOT", msg, "RAID")
    end
end

function RPLL_HELPER:grab_pet_information()
    local pet_name = UnitName("pet")
    if pet_name ~= nil and pet_name ~= Unknown and pet_name ~= "" then
        local player_name = UnitName("player")
        SendAddonMessage(this.MESSAGE_PREFIX .. "PET", player_name .. "&" .. pet_name, "RAID")
    end
end

function RPLL_HELPER:grab_player_information()
    local unit_name = UnitName("player")
    if unit_name ~= nil and unit_name ~= Unknown then
        if this.PlayerInfo["last_update"] ~= nil and time() - this.PlayerInfo["last_update"] <= 30 then
            return
        end
        this.PlayerInfo["last_update_date"] = date("%d.%m.%y %H:%M:%S")
        this.PlayerInfo["last_update"] = time()
        this.PlayerInfo["name"] = unit_name

        -- Guild this.PlayerInfo
        local guildName, guildRankName, guildRankIndex = GetGuildInfo("player")
        if guildName ~= nil then
            this.PlayerInfo["guild_name"] = guildName
            this.PlayerInfo["guild_rank_name"] = guildRankName
            this.PlayerInfo["guild_rank_index"] = guildRankIndex
        end

        -- Pet name
        local pet_name = UnitName("pet")
        if pet_name ~= nil and pet_name ~= Unknown and pet ~= "" then
            this.PlayerInfo["pet"] = pet_name
        end

        -- Hero Class, race, sex
        if UnitClass("player") ~= nil then
            local _, english_class = UnitClass("player")
            this.PlayerInfo["hero_class"] = english_class
        end
        if UnitRace("player") ~= nil then
            local _, en_race = UnitRace("player")
            this.PlayerInfo["race"] = en_race
        end
        if UnitSex("player") ~= nil then
            this.PlayerInfo["sex"] = UnitSex("player")
        end

        -- Gear
        local any_item = false
        for i = 1, 19 do
            if GetInventoryItemLink("player", i) ~= nil then
                any_item = true
                break
            end
        end

        if this.PlayerInfo["gear"] == nil then
            this.PlayerInfo["gear"] = {}
        end

        if any_item then
            this.PlayerInfo["gear"] = {}
            for i = 1, 19 do
                local inv_link = GetInventoryItemLink("player", i)
                if inv_link == nil then
                    this.PlayerInfo["gear"][i] = nil
                else
                    local found, _, itemString = strfind(inv_link, "Hitem:(.+)\124h%[")
                    if found == nil then
                        this.PlayerInfo["gear"][i] = nil
                    else
                        this.PlayerInfo["gear"][i] = itemString
                    end
                end
            end
        end

        -- Talents
        local talents = { "", "", "" };
        for t = 1, 3 do
            local numTalents = GetNumTalents(t);
            -- Last one is missing?
            for i = 1, numTalents do
                local _, _, _, _, currRank = GetTalentInfo(t, i);
                talents[t] = talents[t] .. currRank
            end
        end
        talents = strjoin("}", talents[1], talents[2], talents[3])
        if strlen(talents) <= 10 then
            talents = nil
        end

        if talents ~= nil then
            this.PlayerInfo["talents"] = talents
        end

        SendAddonMessage(this.MESSAGE_PREFIX .. "COMBATANT_INFO", this:SerializePlayerInformation(), "RAID")
    end
end

function RPLL_HELPER:SerializePlayerInformation()
    local val = this.PlayerInfo;
    local gear = prep_value(val["gear"][1])
    for i = 2, 19 do
        gear = gear .. "&" .. prep_value(val["gear"][i])
    end

    return strjoin("&", prep_value(val["name"]),
            prep_value(val["race"]), prep_value(val["hero_class"]), prep_value(val["sex"]), prep_value(val["guild_name"]),
            prep_value(val["guild_rank_name"]), prep_value(val["guild_rank_index"]), gear, prep_value(val["talents"]))
end

function prep_value(val)
    if val == nil then
        return "nil"
    end
    return val
end

function RPLL_HELPER:SendMessage(msg)
    DEFAULT_CHAT_FRAME:AddMessage("|cFFFF8080LegacyPlayers Helper|r: " .. msg)
end