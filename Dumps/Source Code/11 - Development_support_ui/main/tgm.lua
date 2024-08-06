local _G, _ = _G or getfenv()

local TGM = CreateFrame("Frame")

TGM.prefix = 'GM_ADDON'

-- .shop log accountname

TGM.tickets = {}
TGM.ticket = nil
TGM.ticketFrames = {}

TGM.races = {
    [1] = 'Human',
    [2] = 'Orc',
    [3] = 'Dwarf',
    [4] = 'Nightelf',
    [5] = 'Undead',
    [6] = 'Tauren',
    [7] = 'Gnome',
    [8] = 'Troll',
    [9] = 'Goblin',
    [10] = 'High Elf'
}

TGM.classes = {
    [1] = 'Warrior',
    [2] = 'Paladin',
    [3] = 'Hunter',
    [4] = 'Rogue',
    [5] = 'Priest',
    [7] = 'Shaman',
    [8] = 'Mage',
    [9] = 'Warlock',
    [11] = 'Druid'
}

TGM.classColors = {
    ["HUNTER"] = { r = 0.67, g = 0.83, b = 0.45, colorStr = "ffabd473" },
    ["WARLOCK"] = { r = 0.58, g = 0.51, b = 0.79, colorStr = "ff9482c9" },
    ["PRIEST"] = { r = 1.0, g = 1.0, b = 1.0, colorStr = "ffffffff" },
    ["PALADIN"] = { r = 0.96, g = 0.55, b = 0.73, colorStr = "fff58cba" },
    ["MAGE"] = { r = 0.41, g = 0.8, b = 0.94, colorStr = "ff69ccf0" },
    ["ROGUE"] = { r = 1.0, g = 0.96, b = 0.41, colorStr = "fffff569" },
    ["DRUID"] = { r = 1.0, g = 0.49, b = 0.04, colorStr = "ffff7d0a" },
    ["SHAMAN"] = { r = 0.0, g = 0.44, b = 0.87, colorStr = "ff0070de" },
    ["WARRIOR"] = { r = 0.78, g = 0.61, b = 0.43, colorStr = "ffc79c6e" }
};

TGM:RegisterEvent("ADDON_LOADED")
TGM:RegisterEvent("CHAT_MSG_ADDON")
TGM:RegisterEvent("CHAT_MSG_SYSTEM")

TGM:SetScript("OnEvent", function()
    if event then
        if event == "ADDON_LOADED" and string.lower(arg1) == 'gm-addon' then
            TGM.init()
        end
        if event == 'CHAT_MSG_SYSTEM' then
            TGM.handleSystemMessage(arg1)
        end
        if event == 'CHAT_MSG_ADDON' and arg1 == TGM.prefix then
            TGM.handleAddonMessage(arg2)
        end

    end

end)

function TGM.init()

    if not TGM_DATA then
        TGM_DATA = {
            scale = 1,
            templates = {
                {
                    title = 'At war',
                    text = 'Hello! Please open your reputation tab, locate the faction of this NPC, click on it, and make sure to remove the <At War> flag that\'s preventing you from opening the dialog window.'
                },
                {
                    title = 'Boosting',
                    text = 'Hello! It is strictly forbidden to sell/promote selling or buy/promote buying leveling and other boosting services on Turtle WoW for real money, donation tokens or in-game gold. But you can still give tanking or healing services for dungeons of your level bracket. Have a nice day!'
                },
                {
                    title = 'Bug Tracker',
                    text = 'Greetings! Unfortunately bugs must be submitted to the bug tracker (https://github.com/slowtorta/turtlewow-bug-tracker) so our developers can have a look, also try close your client and clear the WDB folder.'
                },
                {
                    title = 'Bugged Quest',
                    text = 'Hello! Please follow these steps: Click on your character portrait and ensure that you are not part of a raid group. Alternatively, close your client and clear the WDB folder. If you still experience any issues, please contact us. Have a nice day!'
                },
                {
                    title = 'Cheat',
                    text = 'Hello! Thank you for your report and for taking our rules seriously. We will investigate this matter and take appropriate action. Have a nice day!'
                },
                {
                    title = 'Clear WDB',
                    text = 'Greetings! Please try clearing your WDB folder inside your WoW game folder. If this does not fix the issue please create a new ticket noting this.'
                },
                {
                    title = 'Harassment',
                    text = 'Hello! We apologize for the behavior you experienced on our platform. We encourage you to use the /ignore feature to cut communication with the offending player. Please only contact support if the harassment persists, such as creating multiple characters to avoid being added to a blacklist.'
                },
                {
                    title = 'Missing tokens',
                    text = 'Hello! Thank you for supporting our project. Please send a full screenshot of your transaction along with your in-game account name to info.turtlewow@gmail.com. Your balance will be updated within the next 24 hours'
                },
                {
                    title = 'Name violations',
                    text = 'Greetings! We will be looking into this character name. Thank you for assisting us in these situations. Thank you for your patronage and have a magical evening.'
                },
                {
                    title = 'No loot distro',
                    text = 'Hello! We cannot restore items that were never looted. If you have video evidence of this case, please attach it and ask a party leader to submit a ticket specifying the name of the player who should receive it.'
                },
                {
                    title = 'Not enough detail',
                    text = 'Greetings! Unfortunately I cannot determine the nature of your ticket from what you put in it. Please create a new ticket and provide more information if you are still having trouble.'
                },
                {
                    title = 'Transmog bug',
                    text = 'Hello! Please try the following steps: Close your client, clear the WDB folder, and ensure that your client is not in a read-only state. Contact us if you still experience any issues. Have a nice day!'
                },
                {
                    title = 'War mode removal',
                    text = 'Hello! It is possible to activate War Mode twice and remove it once. If you have activated it for the first time, speak to the Glyph Master NPC to quit the challenge. If you have activated it for a second time, you cannot remove it until you reach level 60. Stay safe!'
                },
                {
                    title = 'Safe Spotting',
                    text = 'Greetings, Safe Spotting is against our rules. I will be placing a warning on your account. Performing this action again may result in further sanction being taken.'
                },
                {
                    title = 'Loot-misdistribution D',
                    text = 'Hello! Unfortunately, the correct distribution of loot in the instances is the player\'s direct responsibility. We cannot assist with issues of this nature :) Please visit the instance once again.'
                },
                {
                    title = 'Loot-misdistribution R',
                    text = 'Hello! Raiders are able to rectify any mistakes in loot distribution on their own within a short period of 10 minutes after the boss has been defeated.'
                },
                {
                    title = 'Lost & destroyed items',
                    text = 'Greetings! If you have sold or destroyed an important item, please visit NPC Trash Collector Gaston in Ratchet (https://database.turtle-wow.org/?npc=8). He will offer you 128 recently lost items.'
                },
                {
                    title = 'Restoration response - Hacked',
                    text = 'Greetings, thank you for contacting support. We are investigating your issue and you will be notified of an outcome within 10 days. Please change your password immediately. Have a great day!'
                },
                {
                    title = 'Name reservation',
                    text = 'Greetings, please see info regarding names, All inactive names will be cleaned up automatically on every Wednesday. Please also see: https://forum.turtle-wow.org/viewtopic.php?t=5599'
                },
                {
                    title = 'Restoration of HC characters',
                    text = 'Greetings! Unfortunately we do not restore Hardcore characters under any circumstances whatsoever. Apologies for the inconvenience.'
                },
                {
                    title = 'Non-Griefing',
                    text = 'Good day, this will not be considered Griefing or Harassment as pvp is on which you can activate by yourself, it is a choice to turn on and off. Hope this finds you well, have a great day support team.'
                },
                {
                    title = 'Race / Faction Changes',
                    text = 'Greetings, unfortunately race and faction changes are not currently available in any way. Have a great day!'
                },
                {
                    title = 'Dialogs',
                    text = 'Hello! Please open your reputation tab, locate the faction of this NPC, click on it, and make sure to remove the <At War> flag that\'s preventing you from opening the dialog window.'
                },
                {
                    title = 'Refund Rejection',
                    text = 'Hello! The item/items you wish to return were purchased more than a week ago and are therefore not eligible for a refund.'
                }
            },
            alpha = 1
        }
    end

    _G['TGM']:SetScale(TGM_DATA.scale)
    _G['TGM']:SetAlpha(TGM_DATA.alpha)
    TGM.disableButtonsAndText()
end

function TGM.clearScrollbarTexture(frame)
    _G[frame:GetName() .. 'ScrollUpButton']:SetNormalTexture(nil)
    _G[frame:GetName() .. 'ScrollUpButton']:SetDisabledTexture(nil)
    _G[frame:GetName() .. 'ScrollUpButton']:SetPushedTexture(nil)
    _G[frame:GetName() .. 'ScrollUpButton']:SetHighlightTexture(nil)

    _G[frame:GetName() .. 'ScrollDownButton']:SetNormalTexture(nil)
    _G[frame:GetName() .. 'ScrollDownButton']:SetDisabledTexture(nil)
    _G[frame:GetName() .. 'ScrollDownButton']:SetPushedTexture(nil)
    _G[frame:GetName() .. 'ScrollDownButton']:SetHighlightTexture(nil)

    _G[frame:GetName() .. 'ThumbTexture']:SetTexture(nil)
end

function TGM.disableButtonsAndText()
    TGMLeftPanelResponsePlayerName:SetText()
    TGMLeftPanelResponseAccount:SetText()
    TGMLeftPanelResponseIP:SetText()
    TGMLeftPanelResponseLevel:SetText()
    TGMLeftPanelResponseEmail:SetText()
    TGMLeftPanelResponseForum:SetText()
    TGMLeftPanelResponseOnlineStatus:SetText()
    TGMLeftPanelResponseRaceClass:SetText()

    TGMLeftPanelResponseRespondToMailbox:Disable()
    TGMLeftPanelResponseRespondToChat:Disable()
    TGMLeftPanelResponseCloseTicket:Disable()

    TGMLeftPanelResponseGoTo:Disable()
    TGMLeftPanelResponseSummon:Disable()
    TGMLeftPanelResponseInfo:Disable()
    TGMLeftPanelResponseRecall:Disable()
    TGMLeftPanelResponseBaninfo:Disable()
    TGMLeftPanelResponseTarget:Disable()
    TGMLeftPanelResponseShopLog:Disable()

    TGMLeftPanelResponsePlayerNameCopyButton:Disable()
    TGMLeftPanelResponseAccountCopyButton:Disable()
    TGMLeftPanelResponseIPCopyButton:Disable()
end

function TGM.enableButtons()
    TGMLeftPanelResponseRespondToMailbox:Enable()
    TGMLeftPanelResponseRespondToChat:Enable()
    TGMLeftPanelResponseCloseTicket:Enable()

    TGMLeftPanelResponseGoTo:Enable()
    TGMLeftPanelResponseSummon:Enable()
    TGMLeftPanelResponseInfo:Enable()
    TGMLeftPanelResponseRecall:Enable()
    TGMLeftPanelResponseBaninfo:Enable()
    TGMLeftPanelResponseTarget:Enable()
    TGMLeftPanelResponseShopLog:Enable()

    TGMLeftPanelResponsePlayerNameCopyButton:Enable()
    TGMLeftPanelResponseAccountCopyButton:Enable()
    TGMLeftPanelResponseIPCopyButton:Enable()
end

function TGM.handleSystemMessage(text)

    -- refresh tickets on new ticket
    if string.find(text, "New ticket", 1, true) then
		local soundfile = "igTextPopupPing02.wav"
		if GetRealmName() == "Tel'Abim" then soundfile = "PlaceHolder.wav" end
		PlaySoundFile("Sound\\Interface\\"..soundfile)
        TGM_refreshTickets()
        return
    end

    -- refresh tickets on ticket assign
    if string.find(text, "Ticket", 1, true) and
            string.find(text, "Assigned to", 1, true) then
        TGM_refreshTickets()
        return
    end

    -- stop if no ticket is active
    if not TGM.ticket then
        return
    end

end

function TGM.handleAddonMessage(m)

    if string.find(m, 'tickets;;start', 1, true) then
        TGM.tickets = {}
    elseif string.find(m, 'tickets;;end', 1, true) then
        TGM.processTickets()
    elseif string.find(m, 'tickets;;', 1, true) then

        --tickets;;id;;name;;playeronlinestatus;;ticketassignedstatus;;tickettimestamp;;ticket_text

        local t = __explode(m, ';;')

        local stamp = string.format(SecondsToTime(time() - tonumber(t[6])))

        TGM.tickets[__length(TGM.tickets) + 1] = {
            id = tonumber(t[2]),
            name = t[3],
            onlineStatus = t[4] == 'online' and '|cff00ff00online' or '|cffff0000offline',
            assigned = t[5],
            stamp = stamp,
            message = t[7],
            message_replaced = __replace(t[7], "\n", ""),
        }

    elseif string.find(m, 'playerinfo;;', 1, true) then

        --playerinfo;;guid;;account;;ip;;level;;email;;forumusername;;race;;class

        local pi = __explode(m, ";;")
        local guid = pi[2]
        local account = pi[3]
        local ip = pi[4]
        local level = tonumber(pi[5])
        local email = pi[6]
        local forum = pi[7]
        local race = pi[8]
        local class = pi[9]

        if TGM.ticket then
            TGM.ticket.guid = guid
            TGM.ticket.account = account
            TGM.ticket.ip = ip
            TGM.ticket.level = level
            TGM.ticket.email = email
            TGM.ticket.forum = forum
            TGM.ticket.raceClass = TGM.races[tonumber(race)] ..
                    " |c" ..
                    TGM.classColors[string.upper(TGM.classes[tonumber(class)])].colorStr ..
                    TGM.classes[tonumber(class)]

            TGMLeftPanelResponseTitle:SetText("Ticket |cffffffff" .. TGM.ticket.id .. " |rcreated |cffffffff" ..
                    TGM.ticket.stamp .. "|rago by |c" .. TGM.classColors[string.upper(TGM.classes[tonumber(class)])].colorStr .. TGM.ticket.name)

            TGMLeftPanelResponsePlayerName:SetText("Name: |cffffffff" .. TGM.ticket.name)
            TGMLeftPanelResponsePlayerNameCopyEditbox:SetText(TGM.ticket.name)
            TGMLeftPanelResponseAccount:SetText("Account: |cffffffff" .. TGM.ticket.account)
            TGMLeftPanelResponseAccountCopyEditbox:SetText(TGM.ticket.account)
            TGMLeftPanelResponseIP:SetText("IP: |cffffffff" .. TGM.ticket.ip)
            TGMLeftPanelResponseLevel:SetText("Level: |cffffffff" .. TGM.ticket.level)
            TGMLeftPanelResponseEmail:SetText("E-mail: |cffffffff" .. TGM.ticket.email)
            TGMLeftPanelResponseForum:SetText("Forum: |cffffffff" .. TGM.ticket.forum)
            TGMLeftPanelResponseOnlineStatus:SetText("Online Status: |cffffffff" .. TGM.ticket.onlineStatus)
            TGMLeftPanelResponseRaceClass:SetText("Race/Class: |cffffffff" .. TGM.ticket.raceClass)

            TGMLeftPanelResponseTicketScrollFrameTicketBox:SetText(TGM.ticket.message)

            TGMLeftPanelResponseCloseTicket:SetID(TGM.ticket.id)

            TGM.enableButtons()

            TGMLeftPanelResponseReplyScrollFrameReplyBox:SetText('')
            TGMLeftPanelResponseReplyScrollFrameReplyBox:ClearFocus()

        end
    end
end

function TGM.processTickets()

    for i, frame in next, TGM.ticketFrames do
        frame:Hide()
    end

    for i, data in next, TGM.tickets do

        if not TGM.ticketFrames[i] then
            TGM.ticketFrames[i] = CreateFrame("Frame", "TGM_Ticket_" .. i, TGMRightPanelScrollFrameChild, "TGMTicketTemplate")
        end

        local frame = "TGM_Ticket_" .. i

        _G[frame]:SetPoint("TOPLEFT", TGMRightPanelScrollFrameChild, "TOPLEFT", 11, 26 - 26 * i)

        _G[frame .. 'TicketIndex']:SetText('|cffffffff' .. i)
        _G[frame .. 'PlayerName']:SetText(data.name)
        _G[frame .. 'TicketTextShort']:SetText(string.sub(data.message_replaced, 1, 35) .. '...')
        _G[frame .. 'AssignButton']:SetID(data.id)
        _G[frame .. 'ManageTicket']:SetID(data.id)

        _G[frame .. 'Selected']:Hide()

        if TGM.ticket and data.id == TGM.ticket.id then
            _G[frame .. 'Selected']:Show()
        end

        if data.assigned == '0' then
            _G[frame .. 'AssignButton']:SetText('-Assign-')
        else
            _G[frame .. 'AssignButton']:SetText('|cffffffff' .. data.assigned)
        end

        _G[frame]:Show()
    end

    TGMRightPanelTicketCount:SetText('Tickets (' .. __length(TGM.tickets) .. ')')

    TGMRightPanelScrollFrame:UpdateScrollChildRect();
    TGMRightPanelScrollFrame:SetVerticalScroll(0)

    TGM.clearScrollbarTexture(TGMRightPanelScrollFrameScrollBar)


end

function TGM_AssignTicket(id)

    for _, data in next, TGM.tickets do
        if data.id == id then
            if data.assigned == '0' then
                SendChatMessage('.ticket assign ' .. id .. ' ' .. UnitName('player'))
            else
                SendChatMessage('.ticket unassign ' .. id)
            end
        end
    end
    --TGM_refreshTickets()
end

function TGM_ManageTicket(id)
    TGM.ticket = {}
    for i, data in next, TGM.tickets do
        if data.id == id then
            TGM.ticket = data
            _G["TGM_Ticket_" .. i .. 'Selected']:Show()
            _G["TGM_Ticket_" .. i .. 'Selected']:SetVertexColor(1, 1, 1, 0.2)
        else
            _G["TGM_Ticket_" .. i .. 'Selected']:Hide()
        end
    end

    if not TGM.ticket.name then
        return
    end

    TGM.send("PLAYER_INFO:" .. TGM.ticket.name)
    -- rest is in addon_message handler
end

function TGM_refreshTickets()
    TGM.send("GET_TICKETS")
end

function TGM_CloseTicket(id)
    SendChatMessage('.ticket close ' .. id)

    TGMLeftPanelResponseTicketScrollFrameTicketBox:SetText('')
    TGMLeftPanelResponseTicketScrollFrameTicketBox:ClearFocus()
    TGMLeftPanelResponseReplyScrollFrameReplyBox:SetText('')
    TGMLeftPanelResponseReplyScrollFrameReplyBox:ClearFocus()

    TGM.disableButtonsAndText()
    TGM_refreshTickets()

    TGM.ticket = nil
end

function TGM_MailPlayer()

    local text = TGMLeftPanelResponseReplyScrollFrameReplyBox:GetText()
    if text == '' then
        return
    end

    SendChatMessage('.send mail ' .. TGM.ticket.name .. ' "Ticket" "' .. text .. '"')

    TGMLeftPanelResponseReplyScrollFrameReplyBox:SetText('')
    TGMLeftPanelResponseReplyScrollFrameReplyBox:ClearFocus()
end

function TGM_WhisperPlayer()
    local text = TGMLeftPanelResponseReplyScrollFrameReplyBox:GetText()
    if text == '' then
        return
    end

    SendChatMessage(text, "WHISPER", DEFAULT_CHAT_FRAME.editBox.languageID, TGM.ticket.name);

    TGMLeftPanelResponseReplyScrollFrameReplyBox:SetText('')
    TGMLeftPanelResponseReplyScrollFrameReplyBox:ClearFocus()
end

function TGM_GoToPlayer()
    SendChatMessage('.goname ' .. TGM.ticket.name)
end

function TGM_SummonPlayer()
    SendChatMessage('.summon ' .. TGM.ticket.name)
end

function TGM_PlayerInfo()
    SendChatMessage('.pinfo ' .. TGM.ticket.name)
end

function TGM_Target()
    TargetByName(TGM.ticket.name)
end

function TGM_BanInfo()
    SendChatMessage('.baninfo account ' .. TGM.ticket.account)
end

function TGM_Recall()
    SendChatMessage('.recall ' .. TGM.ticket.name)
end

function TGM_ShopLog()
    SendChatMessage('.shop log ' .. TGM.ticket.account)
end

function TGM_Toggle()
    if _G['TGM']:IsVisible() then
        _G['TGM']:Hide()
    else
        _G['TGM']:Show()
    end
end

function TGM_CopyButtonOnClick(field)

    if IsShiftKeyDown() then


        if ChatFrameEditBox:IsVisible() then
            if field == 'PlayerName' then
                ChatFrameEditBox:Insert(TGM.ticket.name);
            end
            if field == 'Account' then
                ChatFrameEditBox:Insert(TGM.ticket.account);
            end
            if field == 'IP' then
                ChatFrameEditBox:Insert(TGM.ticket.ip);
            end
            return
        end

        --DEFAULT_CHAT_FRAME:AddMessage("|Hplayer:Sausage|h" .. "[Sausage]" .. "|h");
        return
    end

    --_G['TGMLeftPanelResponse' .. field .. 'CopyButton']:Hide()
    --_G['TGMLeftPanelResponse' .. field .. 'CopyEditbox']:Show()
    --_G['TGMLeftPanelResponse' .. field .. 'CopyEditbox']:SetFocus()
    --_G['TGMLeftPanelResponse' .. field .. 'CopyEditbox']:HighlightText()
end

function TGM_CopyEditboxOnEscape(field)
    --_G['TGMLeftPanelResponse' .. field .. 'CopyButton']:Show()
    --_G['TGMLeftPanelResponse' .. field .. 'CopyEditbox']:Hide()
    --_G['TGMLeftPanelResponse' .. field .. 'CopyEditbox']:ClearFocus()
end

function TGM_OnMouseWheel()

    if IsControlKeyDown() then
        TGM_DATA.alpha = TGM_DATA.alpha + arg1 * 0.05
        if TGM_DATA.alpha > 1 then
            TGM_DATA.alpha = 1
        end
        if TGM_DATA.alpha < 0.1 then
            TGM_DATA.alpha = 0.1
        end
        _G['TGM']:SetAlpha(TGM_DATA.alpha)
        return
    end

    if IsShiftKeyDown() then
        TGM_DATA.scale = 1
        _G['TGM']:SetScale(TGM_DATA.scale)
        return
    end
    TGM_DATA.scale = TGM_DATA.scale + arg1 * 0.05
    _G['TGM']:SetScale(TGM_DATA.scale)
end

TGM.templatesFrames = {}

function TGM_ToggleTemplates()

    TGMRightPanel:Hide()
    TGMTemplatesPanel:Show()

    for _, frame in next, TGM.templatesFrames do
        frame:Hide()
    end

    local col, row = 1, 1

    for i, data in next, TGM_DATA.templates do

        if not TGM.templatesFrames[i] then
            TGM.templatesFrames[i] = CreateFrame("Frame", "TGM_ResponseTemplate_" .. i, TGMTemplatesPanel, "TGM_ResponseTemplate")
        end

        local frame = "TGM_ResponseTemplate_" .. i

        _G[frame]:SetPoint("TOPLEFT", TGMTemplatesPanel, "TOPLEFT", 18 - 260 + 260 * col, -30 * row)
        _G[frame .. 'Button']:SetText(data.title)
        _G[frame .. 'Button']:SetID(i)
        _G[frame .. 'EditButton']:SetID(i)
        _G[frame .. 'DeleteButton']:SetID(i)

        _G[frame]:Show()

        col = col + 1

        if col > 2 then
            col = 1
            row = row + 1
        end


    end

end

function TGM_UseTemplate()

    TGMLeftPanelResponseReplyScrollFrameReplyBox:SetText(TGM_DATA.templates[this:GetID()].text)

    TGMTemplatesPanel:Hide()
    TGMRightPanel:Show()
end

function TGM_SaveTemplate()
    TGMLeftPanelResponseReplyScrollFrameReplyBox:ClearFocus()
    StaticPopup_Show('TGM_NEW_TEMPLATE')
end

TGM.templateToDelete = 0
function TGM_DeleteTemplate()
    TGM.templateToDelete = this:GetID()
    StaticPopup_Show('CONFIRM_DELETE_TEMPLATE')
end

function TGM.send(m)
    --DEFAULT_CHAT_FRAME:AddMessage("Send:" .. m)
    SendAddonMessage(TGM.prefix, m, "GUILD")
end

TGM.templateToEdit = 0
function TGM_EditTemplate()
    TGM.templateToEdit = this:GetID()
    StaticPopup_Show('TGM_EDIT_TEMPLATE_TITLE')
end

function TGM_CloseTemplates()
    TGMTemplatesPanel:Hide()
    TGMRightPanel:Show()
end

function __length(arr)
    if not arr then
        return 0
    end
    local rd = 0
    for a in next, arr do
        rd = rd + 1
    end
    return rd
end

function __explode(str, delimiter)
    local result = {}
    local from = 1
    local delim_from, delim_to = string.find(str, delimiter, from, 1, true)
    while delim_from do
        tinsert(result, string.sub(str, from, delim_from - 1))
        from = delim_to + 1
        delim_from, delim_to = string.find(str, delimiter, from, true)
    end
    tinsert(result, string.sub(str, from))
    return result
end

function __replace(s, c, cc)
    return (string.gsub(s, c, cc))
end

StaticPopupDialogs["TGM_NEW_TEMPLATE"] = {
    text = "Enter Template Title:",
    button1 = "Save",
    button2 = "Cancel",
    hasEditBox = 1,
    autoFocus = 1,
    OnAccept = function()
        local templateTitle = getglobal(this:GetParent():GetName() .. "EditBox"):GetText()
        if templateTitle == '' then
            StaticPopup_Show('TGM_TEMPLATES_EMPTY_TITLE')
            return
        end

        TGM_DATA.templates[table.getn(TGM_DATA.templates) + 1] = {
            title = templateTitle,
            text = TGMLeftPanelResponseReplyScrollFrameReplyBox:GetText(),
        }

        getglobal(this:GetParent():GetName() .. "EditBox"):SetText('')
        DEFAULT_CHAT_FRAME:AddMessage('Template ' .. templateTitle .. ' added.')

    end,
    timeout = 0,
    whileDead = 0,
    hideOnEscape = 1,
};

StaticPopupDialogs["TGM_TEMPLATES_EMPTY_TITLE"] = {
    text = "Template Title cannot be empty.",
    button1 = "Okay",
    timeout = 0,
    exclusive = 1,
    whileDead = 1,
    hideOnEscape = 1
};

StaticPopupDialogs["TGM_TEMPLATES_EMPTY_TEXT"] = {
    text = "Template Text cannot be empty.",
    button1 = "Okay",
    timeout = 0,
    exclusive = 1,
    whileDead = 1,
    hideOnEscape = 1
};

StaticPopupDialogs["CONFIRM_DELETE_TEMPLATE"] = {
    text = "Delete Template ?",
    button1 = TEXT(YES),
    button2 = TEXT(NO),
    OnAccept = function()
        DEFAULT_CHAT_FRAME:AddMessage("Template " .. TGM_DATA.templates[TGM.templateToDelete].title .. " deleted.")
        TGM_DATA.templates[TGM.templateToDelete] = nil
        TGM_ToggleTemplates()
        TGM.templateToDelete = 0
    end,
    timeout = 0,
    whileDead = 1,
    hideOnEscape = 1,
};

StaticPopupDialogs["TGM_EDIT_TEMPLATE_TITLE"] = {
    text = "Edit Template Title:",
    button1 = "Save",
    button2 = "Cancel",
    hasEditBox = 1,
    autoFocus = 1,
    OnShow = function()
        getglobal(this:GetName() .. "EditBox"):SetText(TGM_DATA.templates[TGM.templateToEdit].title)
    end,
    OnAccept = function()
        local templateTitle = getglobal(this:GetParent():GetName() .. "EditBox"):GetText()
        if templateTitle == '' then
            StaticPopup_Show('TGM_TEMPLATES_EMPTY_TITLE')
            return
        end

        TGM_DATA.templates[TGM.templateToEdit].title = templateTitle
        StaticPopup_Show('TGM_EDIT_TEMPLATE_TEXT')
    end,
    timeout = 0,
    whileDead = 0,
    hideOnEscape = 1,
};

StaticPopupDialogs["TGM_EDIT_TEMPLATE_TEXT"] = {
    text = "Edit Template Text:",
    button1 = "Save",
    button2 = "Cancel",
    hasEditBox = 1,
    autoFocus = 1,
    OnShow = function()
        getglobal(this:GetName() .. "EditBox"):SetText(TGM_DATA.templates[TGM.templateToEdit].text)
    end,
    OnAccept = function()
        local templateText = getglobal(this:GetParent():GetName() .. "EditBox"):GetText()
        if templateTitle == '' then
            StaticPopup_Show('TGM_TEMPLATES_EMPTY_TEXT')
            return
        end

        TGM_DATA.templates[TGM.templateToEdit].text = templateText
        DEFAULT_CHAT_FRAME:AddMessage("Template " .. TGM_DATA.templates[TGM.templateToEdit].title .. " updated.")
        TGM_ToggleTemplates()
        TGM.templateToEdit = 0

    end,
    timeout = 0,
    whileDead = 0,
    hideOnEscape = 1,
};
