local RPLL = RPLL
RPLL.VERSION = 14
RPLL.MAX_MESSAGE_LENGTH = 500
RPLL.CONSOLIDATE_CHARACTER = "{"
RPLL.MESSAGE_PREFIX = "RPLL_HELPER_"

RPLL.PlayerInformation = {}
RPLL.PlayerRotationQueue = {}
RPLL.RotationQueueIndex = 1
RPLL.RotationQueueLength = 0
RPLL.ExtraMessageQueue = {}
RPLL.ExtraMessageQueueIndex = 1
RPLL.ExtraMessageQueueLength = 0
RPLL.Synchronizers = {}

RPLL:RegisterEvent("PLAYER_TARGET_CHANGED")
RPLL:RegisterEvent("RAID_ROSTER_UPDATE")
RPLL:RegisterEvent("PARTY_MEMBERS_CHANGED")

RPLL:RegisterEvent("ZONE_CHANGED_NEW_AREA")
RPLL:RegisterEvent("UPDATE_INSTANCE_INFO")

RPLL:RegisterEvent("UPDATE_MOUSEOVER_UNIT")
RPLL:RegisterEvent("PLAYER_ENTERING_WORLD")

RPLL:RegisterEvent("UNIT_PET")
RPLL:RegisterEvent("PLAYER_PET_CHANGED")
RPLL:RegisterEvent("PET_STABLE_CLOSED")

RPLL:RegisterEvent("UI_ERROR_MESSAGE")

RPLL:RegisterEvent("CHAT_MSG_LOOT")
RPLL:RegisterEvent("PLAYER_AURAS_CHANGED")

RPLL:RegisterEvent("CHAT_MSG_ADDON")
RPLL:RegisterEvent("UNIT_INVENTORY_CHANGED")

local tinsert = table.insert
local UnitName = UnitName
local strsub = string.sub
local GetNumSavedInstances = GetNumSavedInstances
local GetSavedInstanceInfo = GetSavedInstanceInfo
local IsInInstance = IsInInstance
local pairs = pairs
local GetNumPartyMembers = GetNumPartyMembers
local GetNumRaidMembers = GetNumRaidMembers
local UnitIsPlayer = UnitIsPlayer
local UnitSex = UnitSex
local strlower = strlower
local GetGuildInfo = GetGuildInfo
local GetInventoryItemLink = GetInventoryItemLink
local strfind = string.find
local Unknown = UNKNOWN
local LoggingCombat = LoggingCombat
local time = time
local GetRealZoneText = GetRealZoneText
local date = date
local strjoin = string.join or function(delim, ...)
    if type(arg) == 'table' then
        return table.concat(arg, delim)
    else
        return delim
    end
end

local function strsplit(pString, pPattern)
    local Table = {}
    local fpat = "(.-)" .. pPattern
    local last_end = 1
    local s, e, cap = strfind(pString, fpat, 1)
    while s do
        if s ~= 1 or cap ~= "" then
            table.insert(Table, cap)
        end
        last_end = e + 1
        s, e, cap = strfind(pString, fpat, last_end)
    end
    if last_end <= strlen(pString) then
        cap = strfind(pString, last_end)
        table.insert(Table, cap)
    end
    return Table
end

RPLL.CHAT_MSG_ADDON = function(prefix, msg, channel, sender)
    if strfind(prefix, this.MESSAGE_PREFIX) ~= nil then
        this.Synchronizers[sender] = true
        if strfind(prefix, "LOOT") ~= nil then
            tinsert(this.ExtraMessageQueue, "LOOT: " .. date("%d.%m.%y %H:%M:%S") .. "&" .. msg)
            this.ExtraMessageQueueLength = this.ExtraMessageQueueLength + 1
        elseif strfind(prefix, "PET") ~= nil then
            tinsert(this.ExtraMessageQueue, "PET: " .. date("%d.%m.%y %H:%M:%S") .. "&" .. msg)
            this.ExtraMessageQueueLength = this.ExtraMessageQueueLength + 1
        elseif strfind(prefix, "COMBATANT_INFO") ~= nil then
            local split = strsplit(msg, "&")
            local player_info = {}
            if split[1] == "nil" or split[2] == "nil" or split[3] == "nil" or split[4] == "nil" or split[28] == "nil" then
                return
            end

            player_info["last_update_date"] = date("%d.%m.%y %H:%M:%S")
            player_info["last_update"] = time()
            player_info["name"] = split[1]
            player_info["race"] = split[2]
            player_info["hero_class"] = split[3]
            player_info["sex"] = split[4]
            if split[5] ~= "nil" then
                player_info["guild_name"] = split[5]
                player_info["guild_rank_name"] = split[6]
                player_info["guild_rank_index"] = split[7]
            end
            player_info["gear"] = {}
            for i=8, 27 do
                if split[i] ~= "nil" then
                    player_info["gear"][i] = split[i]
                end
            end
            player_info["talents"] = split[28]
            this.PlayerInformation[sender] = player_info

            tinsert(this.PlayerRotationQueue, sender)
            this.RotationQueueLength = this.RotationQueueLength + 1
        end
    end
end

RPLL.UNIT_INVENTORY_CHANGED = function(unit)
    this:grab_unit_information(unit)
end

RPLL.ZONE_CHANGED_NEW_AREA = function()
    LoggingCombat(IsInInstance("player"))
    this:grab_unit_information("player")
    this:RAID_ROSTER_UPDATE()
    this:PARTY_MEMBERS_CHANGED()
    this:QueueRaidIds()
    this:IssueSpamWarning()
    if IsInInstance("player") then
        this:ImportantNotes()
    end
end

RPLL.UPDATE_INSTANCE_INFO = function()
    LoggingCombat(IsInInstance("player"))
    this:grab_unit_information("player")
    this:RAID_ROSTER_UPDATE()
    this:PARTY_MEMBERS_CHANGED()
    this:QueueRaidIds()
    this:IssueSpamWarning()
    if IsInInstance("player") then
        this:ImportantNotes()
    end
end

local initialized = false
RPLL.PLAYER_ENTERING_WORLD = function()
    if initialized then
        return
    end
    initialized = true

    if RPLL_PlayerInformation == nil then
        RPLL_PlayerInformation = {}
    end
    this.PlayerInformation = RPLL_PlayerInformation
    this.PlayerRotationQueue, this.RotationQueueLength = this:Build_RotationTable()

    this:grab_unit_information("player")
    this:RAID_ROSTER_UPDATE()
    this:PARTY_MEMBERS_CHANGED()
    this:fix_combat_log_strings()
    this:IssueSpamWarning()
    this:ImportantNotes()
end

RPLL.PLAYER_TARGET_CHANGED = function()
    this:grab_unit_information("target")
    this:IssueSpamWarning()
end

RPLL.UPDATE_MOUSEOVER_UNIT = function()
    this:grab_unit_information("mouseover")
    this:IssueSpamWarning()
end

RPLL.RAID_ROSTER_UPDATE = function()
    for i = 1, GetNumRaidMembers() do
        if UnitName("raid" .. i) then
            this:grab_unit_information("raid" .. i)
        end
    end
    this:IssueSpamWarning()
    if IsInInstance("player") then
        this:ImportantNotes()
    end
end

RPLL.PARTY_MEMBERS_CHANGED = function()
    for i = 1, GetNumPartyMembers() do
        if UnitName("party" .. i) then
            this:grab_unit_information("party" .. i)
        end
    end
    this:IssueSpamWarning()
end

RPLL.UNIT_PET = function(unit)
    if unit then
        this:grab_unit_information(unit)
    end
    this:IssueSpamWarning()
end

RPLL.PLAYER_PET_CHANGED = function()
    this:grab_unit_information("player")
    this:IssueSpamWarning()
end

RPLL.PET_STABLE_CLOSED = function()
    this:grab_unit_information("player")
    this:IssueSpamWarning()
end

local rotate_reasons = {
    "Can't do that while moving",
    "Interrupted",
    "Not yet recovered",
    "Target needs to be in front of you",
    "Not enough rage",
    "Target too close",
    "Out of range",
    "Not enough energy",
    "Not enough mana",
    "Invalid target",
    "Item is not ready yet",
    "Can only use while",
    "A more powerful spell is already active",
    "Another action is in progress",
    "Can only use outside",
    "Item is not ready yet",
    "Must be in Bear Form, Dire Bear Form",
    "Must have a Ranged Weapon equipped",
    "No path available",
    "No target",
    "Nothing to dispel",
    "Target is friendly",
    "Target is hostile",
    "Target not in line of sight",
    "You are dead",
    "You are in combat",
    "You are in shapeshift form",
    "You are unable to move",
    "You can't do that yet",
    "You must be behind your target.",
    "Your target is dead",
}

RPLL.UI_ERROR_MESSAGE = function(msg)
    for _, reason in rotate_reasons do
        if this:DeepSubString(msg, reason) then
            this:rotate_combat_log_global_string()
            break
        end
    end
    this:IssueSpamWarning()
end

RPLL.CHAT_MSG_LOOT = function(msg)
    if not this:ContainsSynchronizer(msg) then
        tinsert(this.ExtraMessageQueue, "LOOT: " .. date("%d.%m.%y %H:%M:%S") .. "&" .. msg)
        this.ExtraMessageQueueLength = this.ExtraMessageQueueLength + 1
        this:IssueSpamWarning()
    end
end

RPLL.PLAYER_AURAS_CHANGED = function()
    this:grab_unit_information("player")
    this:IssueSpamWarning()
end

function RPLL:ContainsSynchronizer(msg)
    for key, val in pairs(this.Synchronizers) do
        if strfind(msg, key) ~= nil then
            return true
        end
    end
    return false
end

function RPLL:DeepSubString(str1, str2)
    if str1 == nil or str2 == nil then
        return false
    end

    str1 = strlower(str1)
    str2 = strlower(str2)
    if (strfind(str1, str2) or strfind(str2, str1)) then
        return true;
    end
    for cat, val in pairs(strsplit(str1, " ")) do
        if val ~= "the" then
            if (strfind(val, str2) or strfind(str2, val)) then
                return true;
            end
        end
    end
    return false;
end

function RPLL:QueueRaidIds()
    local zone = strlower(GetRealZoneText())
    local found = false
    for i = 1, GetNumSavedInstances() do
        local instance_name, instance_id = GetSavedInstanceInfo(i)
        if zone == strlower(instance_name) then
            tinsert(this.ExtraMessageQueue, "ZONE_INFO: " .. date("%d.%m.%y %H:%M:%S") .. "&" .. instance_name .. "&" .. instance_id)
            this.ExtraMessageQueueLength = this.ExtraMessageQueueLength + 1
            found = true
            break
        end
    end

    if found == false then
        tinsert(this.ExtraMessageQueue, "ZONE_INFO: " .. date("%d.%m.%y %H:%M:%S") .. "&" .. zone .. "&0")
        this.ExtraMessageQueueLength = this.ExtraMessageQueueLength + 1
    end
end

local GlobalStrings = {
    "COMBATHITCRITOTHEROTHER",
    "COMBATHITCRITSCHOOLOTHEROTHER",
    "COMBATHITCRITOTHERSELF",
    "COMBATHITCRITSCHOOLOTHERSELF",
    "COMBATHITCRITSCHOOLSELFOTHER",
    "COMBATHITCRITSELFOTHER",
    "COMBATHITOTHEROTHER",
    "COMBATHITSCHOOLOTHEROTHER",
    "COMBATHITSCHOOLOTHERSELF",
    "COMBATHITOTHERSELF",
    "COMBATHITSCHOOLSELFOTHER",
    "COMBATHITSELFOTHER",
    "DAMAGESHIELDOTHEROTHER",
    "DAMAGESHIELDOTHERSELF",
    "DAMAGESHIELDSELFOTHER",
    "ERR_COMBAT_DAMAGE_SSI",
    "HEALEDCRITOTHEROTHER",
    "HEALEDCRITOTHERSELF",
    "HEALEDCRITSELFOTHER",
    "HEALEDCRITSELFSELF",
    "HEALEDOTHEROTHER",
    "HEALEDOTHERSELF",
    "HEALEDSELFOTHER",
    "HEALEDSELFSELF",
    "PERIODICAURADAMAGEOTHEROTHER",
    "PERIODICAURADAMAGEOTHERSELF",
    "PERIODICAURADAMAGESELFOTHER",
    "PERIODICAURADAMAGESELFSELF",
    "PERIODICAURAHEALOTHEROTHER",
    "PERIODICAURAHEALOTHERSELF",
    "PERIODICAURAHEALSELFOTHER",
    "PERIODICAURAHEALSELFSELF",
    "PET_DAMAGE_PERCENTAGE",
    "SPELLEXTRAATTACKSOTHER",
    "SPELLEXTRAATTACKSOTHER_SINGULAR",
    "SPELLEXTRAATTACKSSELF",
    "SPELLEXTRAATTACKSSELF_SINGULAR",
    "SPELLHAPPINESSDRAINOTHER",
    "SPELLHAPPINESSDRAINSELF",
    "SPELLLOGCRITOTHEROTHER",
    "SPELLLOGCRITOTHERSELF",
    "SPELLLOGCRITSCHOOLOTHEROTHER",
    "SPELLLOGCRITSCHOOLOTHERSELF",
    "SPELLLOGCRITSCHOOLSELFOTHER",
    "SPELLLOGCRITSCHOOLSELFSELF",
    "SPELLLOGCRITSELFOTHER",
    "SPELLLOGCRITSELFSELF",
    "SPELLLOGOTHEROTHER",
    "SPELLLOGOTHERSELF",
    "SPELLLOGSCHOOLOTHEROTHER",
    "SPELLLOGSCHOOLOTHERSELF",
    "SPELLLOGSCHOOLSELFOTHER",
    "SPELLLOGSCHOOLSELFSELF",
    "SPELLLOGSELFOTHER",
    "SPELLLOGSELFSELF",
    "SPELLPOWERDRAINOTHEROTHER",
    "SPELLPOWERDRAINOTHERSELF",
    "SPELLPOWERDRAINSELFOTHER",
    "SPELLPOWERLEECHOTHEROTHER",
    "SPELLPOWERLEECHOTHERSELF",
    "SPELLPOWERLEECHSELFOTHER",
    "SPELLSPLITDAMAGEOTHEROTHER",
    "SPELLSPLITDAMAGEOTHERSELF",
    "SPELLSPLITDAMAGESELFOTHER",
    "VSENVIRONMENTALDAMAGE_DROWNING_OTHER",
    "VSENVIRONMENTALDAMAGE_DROWNING_SELF",
    "VSENVIRONMENTALDAMAGE_FALLING_OTHER",
    "VSENVIRONMENTALDAMAGE_FALLING_SELF",
    "VSENVIRONMENTALDAMAGE_FATIGUE_OTHER",
    "VSENVIRONMENTALDAMAGE_FATIGUE_SELF",
    "VSENVIRONMENTALDAMAGE_FIRE_OTHER",
    "VSENVIRONMENTALDAMAGE_FIRE_SELF",
    "VSENVIRONMENTALDAMAGE_LAVA_OTHER",
    "VSENVIRONMENTALDAMAGE_LAVA_SELF",
    "VSENVIRONMENTALDAMAGE_SLIME_OTHER",
    "VSENVIRONMENTALDAMAGE_SLIME_SELF",
    "POWERGAINOTHEROTHER",
    "POWERGAINOTHERSELF",
    "POWERGAINSELFOTHER",
    "POWERGAINSELFSELF",
    "AURAAPPLICATIONADDEDOTHERHARMFUL",
    "AURAAPPLICATIONADDEDOTHERHELPFUL",
    "AURAAPPLICATIONADDEDSELFHARMFUL",
    "AURAAPPLICATIONADDEDSELFHELPFUL",
    "AURAADDEDSELFHELPFUL",
    "AURAADDEDOTHERHELPFUL",
    "AURAREMOVEDSELF",
    "AURAREMOVEDOTHER",
    "AURAADDEDSELFHARMFUL",
    "AURAADDEDOTHERHARMFUL",
    "AURADISPELSELF",
    "AURADISPELOTHER",
    "AURASTOLENOTHEROTHER",
    "AURASTOLENOTHERSELF",
    "AURASTOLENSELFOTHER",
    "AURASTOLENSELFSELF",
    "AURA_END",
    "SIMPLECASTOTHEROTHER",
    "SIMPLECASTOTHERSELF",
    "SIMPLECASTSELFOTHER",
    "SIMPLECASTSELFSELF",
    "COMBATLOG_HONORGAIN",
    "COMBATLOG_HONORAWARD",
    "MISSEDSELFOTHER",
    "MISSEDOTHERSELF",
    "MISSEDOTHEROTHER",
    "SPELLMISSSELFSELF",
    "SPELLMISSSELFOTHER",
    "SPELLMISSOTHERSELF",
    "SPELLMISSOTHEROTHER",
    "VSBLOCKSELFOTHER",
    "VSBLOCKOTHERSELF",
    "VSBLOCKOTHEROTHER",
    "SPELLBLOCKEDSELFOTHER",
    "SPELLBLOCKEDOTHERSELF",
    "SPELLBLOCKEDOTHEROTHER",
    "VSPARRYSELFOTHER",
    "VSPARRYOTHERSELF",
    "VSPARRYOTHEROTHER",
    "SPELLPARRIEDOTHEROTHER",
    "SPELLPARRIEDOTHERSELF",
    "SPELLPARRIEDSELFOTHER",
    "SPELLPARRIEDSELFSELF",
    "SPELLINTERRUPTOTHEROTHER",
    "SPELLINTERRUPTOTHERSELF",
    "SPELLINTERRUPTSELFOTHER",
    "SPELLEVADEDOTHEROTHER",
    "SPELLEVADEDSELFOTHER",
    "SPELLEVADEDOTHERSELF",
    "SPELLEVADEDSELFSELF",
    "VSEVADEOTHEROTHER",
    "VSEVADEOTHERSELF",
    "VSEVADESELFOTHER",
    "VSABSORBSELFOTHER",
    "VSABSORBOTHERSELF",
    "VSABSORBOTHEROTHER",
    "SPELLLOGABSORBSELFSELF",
    "SPELLLOGABSORBSELFOTHER",
    "SPELLLOGABSORBOTHERSELF",
    "SPELLLOGABSORBOTHEROTHER",
    "VSDODGESELFOTHER",
    "VSDODGEOTHERSELF",
    "VSDODGEOTHEROTHER",
    "SPELLDODGEDSELFSELF",
    "SPELLDODGEDSELFOTHER",
    "SPELLDODGEDOTHERSELF",
    "SPELLDODGEDOTHEROTHER",
    "VSRESISTSELFOTHER",
    "VSRESISTOTHERSELF",
    "VSRESISTOTHEROTHER",
    "SPELLRESISTSELFSELF",
    "SPELLRESISTSELFOTHER",
    "SPELLRESISTOTHERSELF",
    "SPELLRESISTOTHEROTHER",
    "PROCRESISTSELFSELF",
    "PROCRESISTSELFOTHER",
    "PROCRESISTOTHERSELF",
    "PROCRESISTOTHEROTHER",
    "SPELLREFLECTSELFSELF",
    "SPELLREFLECTSELFOTHER",
    "SPELLREFLECTOTHERSELF",
    "SPELLREFLECTOTHEROTHER",
    "VSDEFLECTSELFOTHER",
    "VSDEFLECTOTHERSELF",
    "VSDEFLECTOTHEROTHER",
    "SPELLDEFLECTEDSELFSELF",
    "SPELLDEFLECTEDSELFOTHER",
    "SPELLDEFLECTEDOTHERSELF",
    "SPELLDEFLECTEDOTHEROTHER",
    "VSIMMUNESELFOTHER",
    "VSIMMUNEOTHERSELF",
    "VSIMMUNEOTHEROTHER",
    "SPELLIMMUNESELFSELF",
    "SPELLIMMUNESELFOTHER",
    "SPELLIMMUNEOTHERSELF",
    "SPELLIMMUNEOTHEROTHER",
    "UNITDIESSELF",
    "UNITDIESOTHER",
    "UNITDESTROYEDOTHER",
    "ERR_KILLED_BY_S",
    "SELFKILLOTHER",
    "PARTYKILLOTHER",
    "INSTAKILLSELF",
    "INSTAKILLOTHER",
    "SPELLCASTGOOTHER",
    "SPELLCASTGOOTHERTARGETTED",
    "SPELLCASTGOSELF",
    "SPELLCASTGOSELFTARGETTED",
    "SPELLCASTOTHERSTART",
    "SPELLCASTSELFSTART",
    "SPELLTERSE_OTHER",
    "SPELLTERSE_SELF",
    "SPELLTERSEPERFORM_OTHER",
    "SPELLTERSEPERFORM_SELF",
    "SIMPLEPERFORMOTHEROTHER",
    "SIMPLEPERFORMOTHERSELF",
    "SIMPLEPERFORMSELFOTHER",
    "SIMPLEPERFORMSELFSELF",
    "SPELLPERFORMGOOTHER",
    "SPELLPERFORMGOOTHERTARGETTED",
    "SPELLPERFORMGOSELF",
    "SPELLPERFORMGOSELFTARGETTED",
    "SPELLPERFORMOTHERSTART",
    "SPELLPERFORMSELFSTART",
    "DISPELFAILEDOTHEROTHER",
    "DISPELFAILEDSELFOTHER",
    "DISPELFAILEDOTHERSELF",
    "DISPELFAILEDSELFSELF",
    "IMMUNESPELLSELFSELF",
    "IMMUNESPELLSELFOTHER",
    "IMMUNESPELLOTHERSELF",
    "IMMUNESPELLOTHEROTHER",
    "IMMUNESELFSELF",
    "IMMUNESELFOTHER",
    "IMMUNEOTHERSELF",
    "IMMUNEOTHEROTHER",
}

function RPLL:fix_combat_log_strings()
    local player_name = UnitName("player")
    if SW_FixLogStrings == nil and (DPSMate == nil or DPSMate.VERSION < 130) then
        for _, val in GlobalStrings do
            local glb = getglobal(val)
            local str = string.gsub(glb, "(%%%d?$?s)('s)", "%1% %2")
            setglobal(val, str)
        end
    end

    if DPSMate ~= nil and DPSMate.VERSION < 130 then
        this:SendMessage("Your current DPSMate version is outdated and not compatible. Please get a version >= 130.")
    end

    AURAADDEDSELFHARMFUL = player_name .. " is afflicted by %s (1)."
    AURAADDEDSELFHELPFUL = player_name .. " gains %s (1)."
    AURAAPPLICATIONADDEDSELFHARMFUL = player_name .. " is afflicted by %s (%d)."
    AURAAPPLICATIONADDEDSELFHELPFUL = player_name .. " gains %s (%d)."
    AURACHANGEDSELF = player_name .. " replaces %s with %s."
    AURADISPELSELF = player_name .. " 's %s is removed."
    AURAREMOVEDSELF = "%s fades from " .. player_name .. "."
    AURASTOLENOTHERSELF = "%s steals " .. player_name .. " 's %s."
    AURASTOLENSELFOTHER = player_name .. " steals %s" .. " 's %s."
    AURASTOLENSELFSELF = player_name .. " steals " .. player_name .. " 's %s."
    COMBATHITCRITOTHERSELF = "%s crits " .. player_name .. " for %d."
    COMBATHITCRITSCHOOLOTHERSELF = "%s crits " .. player_name .. " for %d %s damage."
    COMBATHITCRITSCHOOLSELFOTHER = player_name .. " crits %s for %d %s damage."
    COMBATHITCRITSELFOTHER = player_name .. " crits %s for %d."
    COMBATHITOTHERSELF = "%s hits " .. player_name .. " for %d."
    COMBATHITSCHOOLOTHERSELF = "%s hits " .. player_name .. " for %d %s damage."
    COMBATHITSCHOOLSELFOTHER = player_name .. " hits %s for %d %s damage."
    COMBATHITSELFOTHER = player_name .. " hits %s for %d."
    DAMAGESHIELDOTHERSELF = "%s reflects %d %s damage to " .. player_name .. "."
    DAMAGESHIELDSELFOTHER = player_name .. " reflects %d %s damage to %s."
    HEALEDCRITOTHERSELF = "%s" .. " 's %s critically heals " .. player_name .. " for %d."
    HEALEDCRITSELFOTHER = player_name .. " 's %s critically heals %s for %d."
    HEALEDCRITSELFSELF = player_name .. " 's %s critically heals " .. player_name .. " for %d."
    HEALEDOTHERSELF = "%s" .. " 's %s heals " .. player_name .. " for %d."
    HEALEDSELFOTHER = player_name .. " 's %s heals %s for %d."
    HEALEDSELFSELF = player_name .. " 's %s heals " .. player_name .. " for %d."
    IMMUNEDAMAGECLASSOTHERSELF = player_name .. " is immune to %s" .. " 's %s damage."
    IMMUNEDAMAGECLASSSELFOTHER = "%s is immune to " .. player_name .. " 's %s damage."
    IMMUNEOTHEROTHER = "%s hits %s, who is immune."
    IMMUNEOTHERSELF = "%s hits " .. player_name .. ", who is immune."
    IMMUNESELFOTHER = player_name .. " hits %s, who is immune."
    IMMUNESELFSELF = player_name .. " hits " .. player_name .. ", who is immune."
    IMMUNESPELLOTHERSELF = player_name .. " is immune to %s" .. " 's %s."
    IMMUNESPELLSELFOTHER = "%s is immune to " .. player_name .. " 's %s."
    IMMUNESPELLSELFSELF = player_name .. " is immune to " .. player_name .. " 's %s."
    INSTAKILLSELF = player_name .. " is killed by %s."
    ITEMENCHANTMENTADDOTHERSELF = "%s casts %s on " .. player_name .. " 's %s."
    ITEMENCHANTMENTADDSELFOTHER = player_name .. " casts %s on %s" .. " 's %s."
    ITEMENCHANTMENTADDSELFSELF = player_name .. " casts %s on " .. player_name .. " 's %s."
    ITEMENCHANTMENTREMOVESELF = "%s has faded from " .. player_name .. " 's %s."
    LOOT_ITEM_CREATED_SELF = player_name .. " creates: %sx1."
    TRADESKILL_LOG_FIRSTPERSON = player_name .. " creates %sx1."
    LOOT_ITEM_CREATED_SELF_MULTIPLE = player_name .. " creates: %sx%d."
    LOOT_ITEM_PUSHED_SELF = player_name .. " receives item: %sx1."
    LOOT_ITEM_PUSHED_SELF_MULTIPLE = player_name .. " receives item: %sx%d."
    LOOT_ITEM_SELF = player_name .. " receives loot: %sx1."
    LOOT_ITEM = "%s receives loot: %sx1."
    LOOT_ITEM_SELF_MULTIPLE = player_name .. " receives loot: %sx%d."
    MISSEDOTHERSELF = "%s misses " .. player_name .. "."
    MISSEDSELFOTHER = player_name .. " misses %s."
    OPEN_LOCK_SELF = player_name .. " performs %s on %s."
    PERIODICAURADAMAGEOTHERSELF = player_name .. " suffers %d %s damage from %s" .. " 's %s."
    PERIODICAURADAMAGESELFOTHER = "%s suffers %d %s damage from " .. player_name .. " 's %s."
    PERIODICAURADAMAGESELFSELF = player_name .. " suffers %d %s damage from " .. player_name .. " 's %s."
    PERIODICAURAHEALOTHERSELF = player_name .. " gains %d health from %s" .. " 's %s."
    PERIODICAURAHEALSELFOTHER = "%s gains %d health from " .. player_name .. " 's %s."
    PERIODICAURAHEALSELFSELF = player_name .. " gains %d health from " .. player_name .. " 's %s."
    POWERGAINOTHERSELF = player_name .. " gains %d %s from %s" .. " 's %s."
    POWERGAINSELFOTHER = "%s gains %d %s from " .. player_name .. " 's %s."
    POWERGAINSELFSELF = player_name .. " gains %d %s from " .. player_name .. " 's %s."
    PROCRESISTOTHERSELF = player_name .. " resists %s" .. " 's %s."
    PROCRESISTSELFOTHER = "%s resists " .. player_name .. " 's %s."
    PROCRESISTSELFSELF = player_name .. " resists " .. player_name .. " 's %s."
    SELFKILLOTHER = player_name .. " slays %s!"
    SIMPLECASTOTHERSELF = "%s casts %s on " .. player_name .. "."
    SIMPLECASTSELFOTHER = player_name .. " casts %s on %s."
    SIMPLECASTSELFSELF = player_name .. " casts %s on " .. player_name .. "."
    SIMPLEPERFORMOTHERSELF = player_name .. " performs %s on " .. player_name .. "."
    SIMPLEPERFORMSELFOTHER = player_name .. " performs %s on %s."
    SIMPLEPERFORMSELFSELF = player_name .. " performs %s on " .. player_name .. "."
    SPELLBLOCKEDOTHERSELF = "%s" .. " 's %s was blocked by " .. player_name .. "."
    SPELLBLOCKEDSELFOTHER = player_name .. " 's %s was blocked by " .. player_name .. "."
    SPELLCASTGOSELF = player_name .. " casts %s."
    SPELLCASTGOSELFTARGETTED = player_name .. " casts %s on %s."
    SPELLCASTSELFSTART = player_name .. " begins to casts %s."
    SPELLDEFLECTEDOTHERSELF = "%s" .. " 's %s was deflected by " .. player_name .. "."
    SPELLDEFLECTEDSELFOTHER = player_name .. " 's %s was deflected by %s."
    SPELLDEFLECTEDSELFSELF = player_name .. " 's %s was deflected by " .. player_name .. "."
    SPELLDISMISSPETSELF = player_name .. " 's %s is dismissed."
    SPELLDODGEDOTHERSELF = "%s" .. " 's %s was dodged by " .. player_name .. "."
    SPELLDODGEDSELFOTHER = player_name .. " 's %s was dodged by %s."
    SPELLDODGEDSELFSELF = player_name .. " 's %s was dodged by " .. player_name .. "."
    SPELLDURABILITYDAMAGEALLOTHERSELF = "%s casts %s on " .. player_name .. ": all items damaged."
    SPELLDURABILITYDAMAGEALLSELFOTHER = player_name .. " casts %s on %s: all items damaged."
    SPELLDURABILITYDAMAGEOTHERSELF = "%s casts %s on " .. player_name .. ": %s damaged."
    SPELLDURABILITYDAMAGESELFOTHER = player_name .. " casts %s on %s: %s damaged."
    SPELLEVADEDOTHERSELF = "%s" .. " 's %s was evaded by " .. player_name .. "."
    SPELLEVADEDSELFOTHER = player_name .. " 's %s was evaded by %s."
    SPELLEVADEDSELFSELF = player_name .. " 's %s was evaded by " .. player_name .. "."
    SPELLEXTRAATTACKSOTHER_SINGULAR = "%s gains %d extra attacks through %s."
    SPELLEXTRAATTACKSSELF = player_name .. " gains %d extra attacks through %s."
    SPELLEXTRAATTACKSSELF_SINGULAR = player_name .. " gains %d extra attacks through %s."
    SPELLFAILCASTSELF = player_name .. " fails to cast %s: %s."
    SPELLFAILPERFORMSELF = player_name .. " fails to perform %s: %s."
    SPELLHAPPINESSDRAINSELF = player_name .. " 's %s loses %d happiness."
    SPELLIMMUNEOTHERSELF = "%s" .. " 's %s fails. " .. player_name .. " is immune."
    SPELLIMMUNESELFOTHER = player_name .. " 's %s fails. %s is immune."
    SPELLIMMUNESELFSELF = player_name .. " 's fails. " .. player_name .. " is immune."
    SPELLINTERRUPTOTHERSELF = "%s interrupts " .. player_name .. " 's %s."
    SPELLINTERRUPTSELFOTHER = player_name .. " interrupts %s" .. " 's %s."
    SPELLLOGABSORBOTHERSELF = player_name .. " absorbs %s" .. " 's %s."
    SPELLLOGABSORBSELFOTHER = player_name .. " 's %s is absorbed by %s."
    SPELLLOGABSORBSELFSELF = player_name .. " 's %s is absorbed by " .. player_name .. "."
    SPELLLOGCRITOTHERSELF = "%s" .. " 's %s crits " .. player_name .. " for %d."
    SPELLLOGCRITSCHOOLOTHERSELF = "%s" .. " 's %s crits " .. player_name .. " for %d %s damage."
    SPELLLOGCRITSCHOOLSELFOTHER = player_name .. " 's %s crits %s for %d %s damage."
    SPELLLOGCRITSCHOOLSELFSELF = player_name .. " 's %s crits " .. player_name .. " for %d %s damage."
    SPELLLOGCRITSELFOTHER = player_name .. " 's %s crits %s for %d."
    SPELLLOGCRITSELFSELF = player_name .. " 's %s crits " .. player_name .. " for %d."
    SPELLLOGOTHERSELF = "%s" .. " 's %s hits " .. player_name .. " for %d."
    SPELLLOGSCHOOLOTHERSELF = "%s" .. " 's %s hits " .. player_name .. " for %d %s damage."
    SPELLLOGSCHOOLSELFOTHER = player_name .. " 's %s hits %s for %d %s damage."
    SPELLLOGSCHOOLSELFSELF = player_name .. " 's %s hits " .. player_name .. " for %d %s damage."
    SPELLLOGSELFOTHER = player_name .. " 's %s hits %s for %d."
    SPELLLOGSELFSELF = player_name .. " 's hits " .. player_name .. " for %d."
    SPELLMISSOTHERSELF = "%s" .. " 's %s misses " .. player_name .. "."
    SPELLMISSSELFOTHER = player_name .. " 's %s misses %s."
    SPELLMISSSELFSELF = player_name .. " 's %s misses " .. player_name .. "."
    SPELLPARRIEDOTHERSELF = "%s" .. " 's %s was parried by " .. player_name .. "."
    SPELLPARRIEDSELFOTHER = player_name .. " 's %s was parried by %s."
    SPELLPARRIEDSELFSELF = player_name .. " 's %s was parried by " .. player_name .. "."
    SPELLPERFORMGOSELF = player_name .. " performs %s."
    SPELLPERFORMGOSELFTARGETTED = player_name .. " performs %s on %s."
    SPELLPERFORMSELFSTART = player_name .. " begins to perform %s."
    SPELLPOWERDRAINOTHERSELF = "%s" .. " 's %s drains %d %s from " .. player_name .. "."
    SPELLPOWERDRAINSELFOTHER = player_name .. " 's %s drains %d %s from %s."
    SPELLPOWERDRAINSELFSELF = player_name .. " 's %s drains %d %s from " .. player_name .. "."
    SPELLPOWERLEECHOTHERSELF = "%s" .. " 's %s drains %d %s from " .. player_name .. ". %s gains %d %s."
    SPELLPOWERLEECHSELFOTHER = player_name .. " 's %s drains %d %s from %s. " .. player_name .. " gains %d %s."
    SPELLREFLECTOTHERSELF = "%s" .. " 's %s is reflected back by " .. player_name .. "."
    SPELLREFLECTSELFOTHER = player_name .. " 's %s is reflected back by %s."
    SPELLREFLECTSELFSELF = player_name .. " 's %s is reflected back by " .. player_name .. "."
    SPELLRESISTOTHERSELF = "%s" .. " 's %s was resisted by " .. player_name .. "."
    SPELLRESISTSELFOTHER = player_name .. " 's %s was resisted by " .. player_name .. "."
    SPELLRESISTSELFSELF = player_name .. " 's %s was resisted by " .. player_name .. "."
    SPELLSPLITDAMAGEOTHERSELF = "%s" .. " 's %s causes " .. player_name .. " %d damage."
    SPELLSPLITDAMAGESELFOTHER = player_name .. " 's %s causes %s %d damage."
    SPELLTEACHOTHERSELF = "%s teaches " .. player_name .. " %s."
    SPELLTEACHSELFOTHER = player_name .. " teaches %s %s."
    SPELLTEACHSELFSELF = player_name .. " teaches " .. player_name .. " %s."
    SPELLTERSEPERFORM_SELF = player_name .. " performs %s."
    SPELLTERSE_SELF = player_name .. " casts %s."
    UNITDIESSELF = player_name .. " dies."
    VSABSORBOTHERSELF = "%s attacks. " .. player_name .. " absorbs all the damage."
    VSABSORBSELFOTHER = player_name .. " attacks. " .. player_name .. " absorbs all the damage."
    VSBLOCKOTHERSELF = "%s attacks. " .. player_name .. " blocks."
    VSBLOCKSELFOTHER = player_name .. " attacks. %s blocks."
    VSDEFLECTOTHERSELF = "%s attacks. " .. player_name .. " deflects."
    VSDEFLECTSELFOTHER = player_name .. " attacks. %s deflects."
    VSDODGEOTHERSELF = "%s attacks. " .. player_name .. " dodges."
    VSDODGESELFOTHER = player_name .. " attacks. %s dodges."
    VSENVIRONMENTALDAMAGE_DROWNING_SELF = player_name .. " is drowning and loses %d health."
    VSENVIRONMENTALDAMAGE_FALLING_SELF = player_name .. " falls and loses %d health."
    VSENVIRONMENTALDAMAGE_FATIGUE_SELF = player_name .. " is exhausted and loses %d health."
    VSENVIRONMENTALDAMAGE_FIRE_SELF = player_name .. " suffers %d points of fire damage."
    VSENVIRONMENTALDAMAGE_LAVA_SELF = player_name .. " loses %d health for swimming in lava."
    VSENVIRONMENTALDAMAGE_SLIME_SELF = player_name .. " loses %d health for swimming in slime."
    VSEVADEOTHERSELF = "%s attacks. " .. player_name .. " evades."
    VSEVADESELFOTHER = player_name .. " attacks. %s evades."
    VSIMMUNEOTHERSELF = "%s attacks but " .. player_name .. " is immune."
    VSIMMUNESELFOTHER = player_name .. " attacks but %s is immune."
    VSPARRYOTHERSELF = player_name .. " attacks. %s parries."
    VSPARRYSELFOTHER = player_name .. " attacks. %s parries."
    VSRESISTOTHERSELF = "%s attacks. " .. player_name .. " resists all the damage."
    VSRESISTSELFOTHER = player_name .. " attacks. %s resists all the damage."
    DURABILITYDAMAGE_DEATH = player_name .. " 's equipped items suffer a 10\% durability loss."
    AURAADDEDOTHERHELPFUL = "%s gains %s (1)."
    AURAADDEDOTHERHARMFUL = "%s is afflicted by %s (1)."

    -- Fix KTM
    if klhtm ~= nil then
        klhtm.combatparser.parserset = {}
        klhtm.combatparser.onload()
    end

    -- Fix DPSMate
    if DPSMate ~= nil then
        DPSMate.Parser.CHAT_MSG_COMBAT_HOSTILE_DEATH = function(arg1)
            this:CombatFriendlyDeath(arg1)
        end
        DPSMate.Parser.CHAT_MSG_SPELL_AURA_GONE_SELF = function(arg1)
            this:SpellAuraGoneSelf(arg1)
        end
        DPSMate.Parser.CHAT_MSG_SPELL_PERIODIC_SELF_BUFFS = function(arg1)
            this:SpellPeriodicFriendlyPlayerBuffs(arg1)
            this:SpellPeriodicFriendlyPlayerBuffsAbsorb(arg1)
        end
        DPSMate.Parser.CHAT_MSG_SPELL_SELF_BUFF = function(arg1)
            this:SpellHostilePlayerBuff(arg1)
            this:SpellHostilePlayerBuffDispels(arg1)
        end
        DPSMate.Parser.CHAT_MSG_SPELL_PERIODIC_SELF_DAMAGE = function(arg1)
            this:SpellPeriodicDamageTaken(arg1)
        end
        DPSMate.Parser.CHAT_MSG_SPELL_CREATURE_VS_SELF_DAMAGE = function(arg1)
            this:CreatureVsCreatureSpellDamage(arg1)
            this:CreatureVsCreatureSpellDamageAbsorb(arg1)
        end
        DPSMate.Parser.CHAT_MSG_COMBAT_CREATURE_VS_SELF_MISSES = function(arg1)
            this:CreatureVsCreatureMisses(arg1)
        end
        DPSMate.Parser.CHAT_MSG_COMBAT_CREATURE_VS_SELF_HITS = function(arg1)
            this:CreatureVsCreatureHits(arg1)
            this:CreatureVsCreatureHitsAbsorb(arg1)
        end
        DPSMate.Parser.CHAT_MSG_SPELL_DAMAGESHIELDS_ON_SELF = function(arg1)
            this:SpellDamageShieldsOnOthers(arg1)
        end
        DPSMate.Parser.CHAT_MSG_SPELL_SELF_DAMAGE = function(arg1)
            this:FriendlyPlayerDamage(arg1)
        end
        DPSMate.Parser.CHAT_MSG_COMBAT_SELF_MISSES = function(arg1)
            this:FriendlyPlayerMisses(arg1)
        end
        DPSMate.Parser.CHAT_MSG_COMBAT_SELF_HITS = function(arg1)
            this:FriendlyPlayerHits(arg1)
        end
    end

    -- Fix ParserLib
    if ParserLib ~= nil then
        local parser_lib = ParserLib:GetInstance("1.1")
        if parser_lib ~= nil then
            ParserLib_SELF = player_name
            parser_lib.eventTable["CHAT_MSG_COMBAT_SELF_HITS"] = parser_lib:LoadPatternCategoryTree({ "HitOtherOther", "EnvOther" })
            parser_lib.eventTable["CHAT_MSG_COMBAT_CREATURE_VS_SELF_HITS"] = parser_lib:LoadPatternCategoryTree({ "HitOtherOther", "EnvOther" })
            parser_lib.eventTable["CHAT_MSG_COMBAT_SELF_MISSES"] = parser_lib:LoadPatternCategoryTree({ "MissOtherOther" })
            parser_lib.eventTable["CHAT_MSG_COMBAT_HOSTILEPLAYER_HITS"] = parser_lib:LoadPatternCategoryTree({ "HitOtherOther", "EnvOther" })
            parser_lib.eventTable["CHAT_MSG_COMBAT_HOSTILEPLAYER_MISSES"] = parser_lib:LoadPatternCategoryTree({ "MissOtherOther" })
            parser_lib.eventTable["CHAT_MSG_SPELL_SELF_BUFF"] = parser_lib:LoadPatternCategoryTree({ { "HealOther", "PowerGainOther", "ExtraAttackOther", "DrainOther" }, "SPELLCASTOTHERSTART", { "CastOther", "PerformOther" }, "SPELLPERFORMOTHERSTART", "SpellMissOther", "ProcResistOther", "SplitDamageOther", "DispelFailOther" })
            parser_lib.eventTable["CHAT_MSG_SPELL_SELF_DAMAGE"] = parser_lib:LoadPatternCategoryTree({ "SpellHitOther", "SPELLCASTOTHERSTART", "SPELLPERFORMOTHERSTART", "DrainOther", "SpellMissOther", { "INSTAKILLOTHER" }, { "PROCRESISTOTHEROTHER" }, "SplitDamageOther", { "CastOther", "InterruptOther", "DurabilityDamageOther" }, "PerformOther", "ExtraAttackOther", { "DISPELFAILEDOTHEROTHER" } })
            parser_lib.eventTable["CHAT_MSG_SPELL_PERIODIC_SELF_BUFFS"] = parser_lib:LoadPatternCategoryTree({ { "HotOther", "DrainOther" }, { "BuffOther", "PowerGainOther", "DrainOther" }, "DotOther", "DebuffOther" })
            parser_lib.eventTable["CHAT_MSG_SPELL_PERIODIC_SELF_DAMAGE"] = parser_lib:LoadPatternCategoryTree({ "DebuffOther", "DotOther", { "SPELLLOGABSORBOTHEROTHER" }, "DrainOther", { "PowerGainOther", "BuffOther" } })
            parser_lib.eventTable["CHAT_MSG_SPELL_DAMAGESHIELDS_ON_SELF"] = { "SPELLRESISTOTHEROTHER", "DAMAGESHIELDOTHEROTHER" }
            parser_lib.eventTable["CHAT_MSG_SPELL_AURA_GONE_SELF"] = { "AURAREMOVEDOTHER" }
        end
    end
end

function RPLL:grab_unit_information(unit)
    local unit_name = UnitName(unit)
    if UnitIsPlayer(unit) and unit_name ~= nil and unit_name ~= Unknown and not this:ContainsSynchronizer(unit_name) then
        if this.PlayerInformation[unit_name] == nil then
            this.PlayerInformation[unit_name] = {}
        end
        local info = this.PlayerInformation[unit_name]
        if info["last_update"] ~= nil and time() - info["last_update"] <= 30 then
            return
        end
        info["last_update_date"] = date("%d.%m.%y %H:%M:%S")
        info["last_update"] = time()
        info["name"] = unit_name

        -- Guild info
        local guildName, guildRankName, guildRankIndex = GetGuildInfo(unit)
        if guildName ~= nil then
            info["guild_name"] = guildName
            info["guild_rank_name"] = guildRankName
            info["guild_rank_index"] = guildRankIndex
        end

        -- Pet name
        if strfind(unit, "pet") == nil then
            local pet_name = nil
            if unit == "player" then
                pet_name = UnitName("pet")
            elseif strfind(unit, "raid") then
                pet_name = UnitName("raidpet" .. strsub(unit, 5))
            elseif strfind(unit, "party") then
                pet_name = UnitName("partypet" .. strsub(unit, 6))
            end

            if pet_name ~= nil and pet_name ~= Unknown and pet ~= "" then
                info["pet"] = pet_name
            end
        end

        -- Hero Class, race, sex
        if UnitClass(unit) ~= nil then
            local _, english_class = UnitClass(unit)
            info["hero_class"] = english_class
        end
        if UnitRace(unit) ~= nil then
            local _, en_race = UnitRace(unit)
            info["race"] = en_race
        end
        if UnitSex(unit) ~= nil then
            info["sex"] = UnitSex(unit)
        end

        -- Gear
        local any_item = false
        for i = 1, 19 do
            if GetInventoryItemLink(unit, i) ~= nil then
                any_item = true
                break
            end
        end

        if info["gear"] == nil then
            info["gear"] = {}
        end

        if any_item then
            info["gear"] = {}
            for i = 1, 19 do
                local inv_link = GetInventoryItemLink(unit, i)
                if inv_link == nil then
                    info["gear"][i] = nil
                else
                    local found, _, itemString = strfind(inv_link, "Hitem:(.+)\124h%[")
                    if found == nil then
                        info["gear"][i] = nil
                    else
                        info["gear"][i] = itemString
                    end
                end
            end
        end

        -- Talents
        if unit == "player" then
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
                info["talents"] = talents
            end
        end

        tinsert(this.PlayerRotationQueue, unit_name)
        this.RotationQueueLength = this.RotationQueueLength + 1
    end
end

function RPLL:Build_RotationTable()
    local rotation_table = {}
    local table_length = 0
    local now = time()
    for key, val in this.PlayerInformation do
        if key ~= nil and val ~= nil then
            if now - val["last_update"] <= 7200 then
                tinsert(rotation_table, key)
                table_length = table_length + 1
            end
        end
    end
    return rotation_table, table_length
end

function RPLL:rotate_combat_log_global_string()
    if this.ExtraMessageQueueLength >= this.ExtraMessageQueueIndex then
        local consolidate_count = 1
        local current_result = "CONSOLIDATED: " .. this.ExtraMessageQueue[this.ExtraMessageQueueIndex]
        for i = this.ExtraMessageQueueIndex + 1, this.ExtraMessageQueueLength do
            local pot_new_result = current_result .. this.CONSOLIDATE_CHARACTER .. this.ExtraMessageQueue[i]
            if strlen(pot_new_result) < this.MAX_MESSAGE_LENGTH then
                current_result = pot_new_result
                consolidate_count = consolidate_count + 1
            else
                break
            end
        end

        SPELLFAILCASTSELF = current_result
        SPELLFAILPERFORMSELF = current_result
        this.ExtraMessageQueueIndex = this.ExtraMessageQueueIndex + consolidate_count
    elseif this.RotationQueueLength >= this.RotationQueueIndex then
        local character = this.PlayerInformation[this.PlayerRotationQueue[this.RotationQueueIndex]]
        if character ~= nil then
            local result = "COMBATANT_INFO: " .. prep_value(character["last_update_date"]) .. "&"
            local gear_str = prep_value(character["gear"][1])
            for i = 2, 19 do
                gear_str = gear_str .. "&" .. prep_value(character["gear"][i])
            end

            result = result .. prep_value(character["name"]) .. "&" .. prep_value(character["hero_class"]) .. "&" .. prep_value(character["race"]) .. "&" .. prep_value(character["sex"]) .. "&" .. prep_value(character["pet"]) .. "&" .. prep_value(character["guild_name"]) .. "&" .. prep_value(character["guild_rank_name"]) .. "&" .. prep_value(character["guild_rank_index"]) .. "&" .. gear_str .. "&" .. prep_value(character["talents"])
            SPELLFAILCASTSELF = result
            SPELLFAILPERFORMSELF = result
        end
        this.RotationQueueIndex = this.RotationQueueIndex + 1
    else
        SPELLFAILCASTSELF = "NONE"
        SPELLFAILPERFORMSELF = "NONE"
    end
end

function prep_value(val)
    if val == nil then
        return "nil"
    end
    return val
end

local last_spam_warning = 0
function RPLL:IssueSpamWarning()
    if not IsInInstance("player") then
        return
    end

    local messages_todo = this.ExtraMessageQueueLength - this.ExtraMessageQueueIndex + this.RotationQueueLength - this.RotationQueueIndex
    if messages_todo >= 10 and time() - last_spam_warning >= 60 then
        this:SendMessage("There are " .. messages_todo .. " messages that have not been written to the CombatLog yet.")
        this:SendMessage("These messages are of utmost importance to upload correct logs.")
        this:SendMessage("One way to write them into the CombatLog is to deselect any target and spam an ability, such that any UI error message shows up, e.g. Invalid target.")
        this:SendMessage("You need to spam the your ability at least " .. messages_todo .. " times.")
        last_spam_warning = time()
    end
end

local last_important_notes_message = 0
function RPLL:ImportantNotes()
    if time() - last_important_notes_message >= 600 then
        this:SendMessage("IMPORTANT: Make sure to delete the WoWCombatLog.txt before the raid session starts.")
        this:SendMessage("IMPORTANT: Make sure that no Hunter named their pet after an instance NPC, otherwise this will serious mess up your logs!")
        last_important_notes_message = time()
    end
end

function RPLL:SendMessage(msg)
    DEFAULT_CHAT_FRAME:AddMessage("|cFFFF8080LegacyPlayers|r: " .. msg)
end