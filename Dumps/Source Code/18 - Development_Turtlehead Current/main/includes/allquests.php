<?php

require_once('includes/game.php');
require_once('includes/alllocales.php');

global $UDWBaseconf;

$quest_class = array(
    0 => array(36, 45, 3, 25, 4, 35, 46, 132, 279, 41, 154, 2257, 1, 10, 139, 12, 3430, 3433, 267, 1537, 131, 38, 24, 9, 44, 51, 3487, 130, 1519, 33, 3431, 8, 47, 85, 1497, 28, 40, 11, 4080),
    1 => array(2079, 3526, 331, 16, 3524, 3525, 148, 221, 1657, 405, 14, 15, 1116, 361, 357, 493, 215, 1637, 220, 702, 188, 1377, 406, 440, 141, 17, 3557, 400, 1638, 1216, 490, 363, 618),
    /* Dungeons */
    2 => array(3790, 3688, 719, 1584, 1583, 1941, 3607, 2557, 133, 3535, 3792, 2100, 2437, 722, 491, 796, 2057, 3789, 209, 2017, 1417, 3842, 1581, 3717, 3715, 717, 3716, 1337, 718, 978),
    3 => array(3428, 2677, 3606, 2562, 3836, 2717, 3456, 2159, 3429, 3840, 19),
    4 => array(-263, -261, -161, -141, -262, -162, -82, -61, -81),
    5 => array(-181, -121, -304, -201, -324, -101, -24, -182, -264),
    6 => array(3358, 2597, 3277),
    7 => array(-365, -370, -364, -1, -368, -344, -366, -369, -367, -22, -284, -221),
    8 => array(3522, 3483, 3518, 3523, 3520, 3703, 3679, 3519, 3696, 3521),
    -2 => array(0)
);

// Флаги квестов
define('QUEST_FLAGS_NONE', 0);
define('QUEST_FLAGS_STAY_ALIVE', 1);
define('QUEST_FLAGS_EVENT ', 2);
define('QUEST_FLAGS_EXPLORATION', 4);
define('QUEST_FLAGS_SHARABLE', 8);
define('QUEST_FLAGS_NONE2', 16);
define('QUEST_FLAGS_EPIC', 32);
define('QUEST_FLAGS_RAID', 64);

define('QUEST_FLAGS_UNK2', 256);
define('QUEST_FLAGS_HIDDEN_REWARDS', 512);
define('QUEST_FLAGS_UNK4', 1024);

define('QUEST_SPECIALFLAGS_NONE', 0);
define('QUEST_SPECIALFLAGS_REPEATABLE', 1);
define('QUEST_SPECIALFLAGS_SCRIPTED', 2);

// Флаги для GetQuestInfo
define('QUEST_DATAFLAG_MINIMUM', 1);
define('QUEST_DATAFLAG_STRINGS', 2);
define('QUEST_DATAFLAG_SERIES', 4);
define('QUEST_DATAFLAG_LOCALE', 8); // Специальный флаг, $questcols не требуется
define('QUEST_DATAFLAG_REWARDS', 16); // Содержит также Req's
define('QUEST_DATAFLAG_PROPS', 32);
define('QUEST_DATAFLAG_LISTINGS', (QUEST_DATAFLAG_MINIMUM | QUEST_DATAFLAG_REWARDS | QUEST_DATAFLAG_PROPS));
define('QUEST_DATAFLAG_AJAXTOOLTIP', (QUEST_DATAFLAG_LISTINGS | QUEST_DATAFLAG_SERIES | QUEST_DATAFLAG_STRINGS));

$questcols[QUEST_DATAFLAG_MINIMUM] = array('entry', 'Title');
$questcols[QUEST_DATAFLAG_STRINGS] = array('Objectives', 'Details', 'RequestItemsText', 'OfferRewardText', 'EndText', 'ObjectiveText1', 'ObjectiveText2', 'ObjectiveText3', 'ObjectiveText4');
$questcols[QUEST_DATAFLAG_REWARDS] = array('RewChoiceItemId1', 'RewChoiceItemId2', 'RewChoiceItemId3', 'RewChoiceItemId4', 'RewChoiceItemId5', 'RewChoiceItemId6', 'RewChoiceItemCount1', 'RewChoiceItemCount2', 'RewChoiceItemCount3', 'RewChoiceItemCount4', 'RewChoiceItemCount5', 'RewChoiceItemCount6', 'RewItemId1', 'RewItemId2', 'RewItemId3', 'RewItemId4', 'RewItemCount1', 'RewItemCount2', 'RewItemCount3', 'RewItemCount4', 'RewMoneyMaxLevel', 'RewOrReqMoney', 'ReqSpellCast1', 'ReqSpellCast2', 'ReqSpellCast3', 'ReqSpellCast4', 'ReqCreatureOrGOId1', 'ReqCreatureOrGOId2', 'ReqCreatureOrGOId3', 'ReqCreatureOrGOId4', 'ReqItemId1', 'ReqItemId2', 'ReqItemId3', 'ReqItemId4', 'ReqItemCount1', 'ReqItemCount2', 'ReqItemCount3', 'ReqItemCount4', 'SrcItemId', 'ReqCreatureOrGOCount1', 'ReqCreatureOrGOCount2', 'ReqCreatureOrGOCount3', 'ReqCreatureOrGOCount4', 'RewSpell', 'RewSpellCast', 'RewRepFaction1', 'RewRepFaction2', 'RewRepFaction3', 'RewRepFaction4', 'RewRepFaction5', 'RewRepValue1', 'RewRepValue2', 'RewRepValue3', 'RewRepValue4', 'RewRepValue5');
$questcols[QUEST_DATAFLAG_PROPS] = array('Type', 'ZoneOrSort', 'QuestFlags', 'QuestLevel', 'MinLevel', 'RequiredRaces');
$questcols[QUEST_DATAFLAG_SERIES] = array('PrevQuestID', 'NextQuestInChain', 'ExclusiveGroup', 'NextQuestID');

$quest_cols[2] = array('entry', 'Title', 'QuestLevel', 'MinLevel', 'RequiredRaces', 'RewChoiceItemId1', 'RewChoiceItemId2', 'RewChoiceItemId3', 'RewChoiceItemId4', 'RewChoiceItemId5', 'RewChoiceItemId6', 'RewChoiceItemCount1', 'RewChoiceItemCount2', 'RewChoiceItemCount3', 'RewChoiceItemCount4', 'RewChoiceItemCount5', 'RewChoiceItemCount6', 'RewItemId1', 'RewItemId2', 'RewItemId3', 'RewItemId4', 'RewItemCount1', 'RewItemCount2', 'RewItemCount3', 'RewItemCount4', 'RewMoneyMaxLevel', 'RewOrReqMoney', 'Type', 'ZoneOrSort', 'QuestFlags');
$quest_cols[3] = array('Title', 'QuestLevel', 'MinLevel', 'RequiredRaces', 'RewChoiceItemId1', 'RewChoiceItemId2', 'RewChoiceItemId3', 'RewChoiceItemId4', 'RewChoiceItemId5', 'RewChoiceItemId6', 'RewChoiceItemCount1', 'RewChoiceItemCount2', 'RewChoiceItemCount3', 'RewChoiceItemCount4', 'RewChoiceItemCount5', 'RewChoiceItemCount6', 'RewItemId1', 'RewItemId2', 'RewItemId3', 'RewItemId4', 'RewItemCount1', 'RewItemCount2', 'RewItemCount3', 'RewItemCount4', 'RewMoneyMaxLevel', 'RewOrReqMoney', 'Type', 'ZoneOrSort', 'QuestFlags', 'RewRepFaction1', 'RewRepFaction2', 'RewRepFaction3', 'RewRepFaction4', 'RewRepFaction5', 'RewRepValue1', 'RewRepValue2', 'RewRepValue3', 'RewRepValue4', 'RewRepValue5', 'Objectives', 'Details', 'RequestItemsText', 'OfferRewardText', 'ReqCreatureOrGOId1', 'ReqCreatureOrGOId2', 'ReqCreatureOrGOId3', 'ReqCreatureOrGOId4', 'ReqItemId1', 'ReqItemId2', 'ReqItemId3', 'ReqItemId4', 'ReqItemCount1', 'ReqItemCount2', 'ReqItemCount3', 'ReqItemCount4', 'SrcItemId', 'ReqCreatureOrGOCount1', 'ReqCreatureOrGOCount2', 'ReqCreatureOrGOCount3', 'ReqCreatureOrGOCount4', 'ObjectiveText1', 'ObjectiveText2', 'ObjectiveText3', 'ObjectiveText4', 'EndText', 'PrevQuestID', 'NextQuestInChain', 'ExclusiveGroup', 'NextQuestID', 'RewSpellCast', 'RewSpell', 'RequiredSkillValue', 'RepObjectiveFaction', 'RepObjectiveValue', 'SuggestedPlayers', 'LimitTime', 'QuestFlags', 'SpecialFlags', 'CharTitleId', 'RequiredMinRepFaction', 'RequiredMinRepValue', 'RequiredMaxRepFaction', 'RequiredMaxRepValue', 'SrcSpell', 'SkillOrClass', 'ReqSpellCast1', 'ReqSpellCast2', 'ReqSpellCast3', 'ReqSpellCast4');

$locale_quest_cols = array('Title_loc' . $UDWBaseconf['locale'], 'Details_loc' . $UDWBaseconf['locale'], 'Objectives_loc' . $UDWBaseconf['locale'], 'OfferRewardText_loc' . $UDWBaseconf['locale'], 'RequestItemsText_loc' . $UDWBaseconf['locale'], 'EndText_loc' . $UDWBaseconf['locale'], 'ObjectiveText1_loc' . $UDWBaseconf['locale'], 'ObjectiveText2_loc' . $UDWBaseconf['locale'], 'ObjectiveText3_loc' . $UDWBaseconf['locale'], 'ObjectiveText4_loc' . $UDWBaseconf['locale']);

function QuestReplaceStr($STR)
{
    global $smarty;
    // сначала заменяем $N, $R, $C
    $toreplace = array(
        0 => array('1' => '$b', '2' => '<br />',),
        1 => array('1' => '$r', '2' => '&lt;' . (isset($smarty) ? $smarty->get_config_vars('race') : 'race') . '&gt;',),
        2 => array('1' => '$c', '2' => '&lt;' . (isset($smarty) ? $smarty->get_config_vars('class') : 'class') . '&gt;',),
        3 => array('1' => '$n', '2' => '&lt;' . (isset($smarty) ? $smarty->get_config_vars('name') : 'name') . '&gt;',),
        4 => array('1' => '$G', '2' => '$g',),
    );
    for ($i = 0; $i <= 3; $i++) {
        $STR = str_replace($toreplace[$i][1], $toreplace[$i][2], $STR);
        $STR = str_replace(strtoupper($toreplace[$i][1]), $toreplace[$i][2], $STR);
    }
    // теперь - пол
    while (strpos($STR, '$g') || strpos($STR, '$G')) {
        $gPos = strpos($STR, '$g');
        if (!$gPos)
            $gPos = strpos($STR, '$G');
        if ($gPos) {
            $ePos = strpos($STR, ';', $gPos);
            if (!$ePos)
                return $STR; // error!
            $string = explode(':', substr($STR, $gPos + 2, $ePos));
            $STR = substr($STR, 0, $gPos) . $string[0] . substr($STR, $ePos + 1, 0xffff);
        }
    }
    return $STR;
}

function GetQuestXpOrMoney($data)
{
    // From MaNGOS Sources
    $pLevel = $data['MinLevel'] + 1;
    $qLevel = $data['QuestLevel'];
    $RewMoneyMaxLevel = $data['RewMoneyMaxLevel'];
    if (!$RewMoneyMaxLevel)
        return 0;
    $fullxp = 0;
    if ($qLevel >= 15)
        $fullxp = $RewMoneyMaxLevel / 6.0;
    elseif ($qLevel == 14)
        $fullxp = $RewMoneyMaxLevel / 4.8;
    elseif ($qLevel == 13)
        $fullxp = $RewMoneyMaxLevel / 3.666;
    elseif ($qLevel == 12)
        $fullxp = $RewMoneyMaxLevel / 2.4;
    elseif ($qLevel == 11)
        $fullxp = $RewMoneyMaxLevel / 1.2;
    elseif ($qLevel >= 1 && $qLevel <= 10)
        $fullxp = $RewMoneyMaxLevel / 0.6;
    elseif ($qLevel == 0)
        $fullxp = $RewMoneyMaxLevel;

    if ($pLevel <= $qLevel + 5)
        return $fullxp;
    elseif ($pLevel == $qLevel + 6)
        return ($fullxp * 0.8);
    elseif ($pLevel == $qLevel + 7)
        return ($fullxp * 0.6);
    elseif ($pLevel == $qLevel + 8)
        return ($fullxp * 0.4);
    elseif ($pLevel == $qLevel + 9)
        return ($fullxp * 0.2);
    else
        return ($fullxp * 0.1);
}

function GetQuestTitle(&$data)
{
    $title = QuestReplaceStr(!empty($data['Title_loc']) ? $data['Title_loc'] : $data['Title']);
    $data['Title'] = $title;
    return $title;
}

function GetQuestStrings(&$data)
{
    $data['Title'] = QuestReplaceStr((!empty($data['Title_loc']) ? $data['Title_loc'] : $data['Title']));
    $data['Objectives'] = QuestReplaceStr(htmlspecialchars(!empty($data['Objectives_loc']) ? $data['Objectives_loc'] : $data['Objectives']));
    $data['Details'] = QuestReplaceStr(htmlspecialchars(!empty($data['Details_loc']) ? $data['Details_loc'] : $data['Details']));
    $data['RequestItemsText'] = QuestReplaceStr(htmlspecialchars(!empty($data['RequestItemsText_loc']) ? $data['RequestItemsText_loc'] : $data['RequestItemsText']));
    $data['OfferRewardText'] = QuestReplaceStr(htmlspecialchars(!empty($data['OfferRewardText_loc']) ? $data['OfferRewardText_loc'] : $data['OfferRewardText']));
    $data['EndText'] = QuestReplaceStr(htmlspecialchars(!empty($data['EndText_loc']) ? $data['EndText_loc'] : $data['EndText']));

    for ($j = 1; $j <= 4; ++$j) {
        $data['ObjectiveText'][$j] = QuestReplaceStr(htmlspecialchars(!empty($data['ObjectiveText' . $j . '_loc']) ? $data['ObjectiveText' . $j . '_loc'] : $data['ObjectiveText' . $j]));
    }
}


function GetQuestReq($id, $count, $type)
{
    global $DB;
    switch ($type) {
        case 1:
            $row = $DB->selectRow('
					SELECT name
						{, l.name_loc?d AS name_loc}
					FROM ' . WORLD . '.creature_template c
						{ LEFT JOIN (' . WORLD . 'locales_creature l) ON l.entry=c.entry AND ? }
					WHERE
						c.entry = ?d
					LIMIT 1
				', ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $id
            );
            $name = !empty($row['name_loc']) ? $row['name_loc'] : $row['name'];
            return $name . (($count > 1) ? (' x' . $count) : '');
            break;
        case 2:
            $row = $DB->selectRow('
					SELECT name
						{, l.name_loc?d AS name_loc}
					FROM ' . WORLD . '.item_template c
						{ LEFT JOIN (' . WORLD . '.locales_item l) ON l.entry=c.entry AND ? }
					WHERE
						c.entry = ?d
					LIMIT 1
				', ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $id
            );
            $name = !empty($row['name_loc']) ? $row['name_loc'] : $row['name'];
            return $name . (($count > 1) ? (' x' . $count) : '');
            break;
    }
}

function GetQuestTooltip($row)
{
    $x = '';

    // Название квеста
    $x .= '<table><tr><td><b class="q">' . $row['Title'] . '</b></td></tr></table>';

    $x .= '<table>';
    if ($row['Objectives']) {
        $x .= '<tr><td><br>';
        $x .= $row['Objectives'];
        $x .= '</td></tr>';
    }

//	$x .= '<br>';

    if ((($row['ReqCreatureOrGOId1']) and ($row['ReqCreatureOrGOCount1'])) or
        (($row['ReqCreatureOrGOId2']) and ($row['ReqCreatureOrGOCount2'])) or
        (($row['ReqCreatureOrGOId3']) and ($row['ReqCreatureOrGOCount3'])) or
        (($row['ReqCreatureOrGOId4']) and ($row['ReqCreatureOrGOCount4'])) or
        (($row['ReqItemId1']) and ($row['ReqItemCount1'])) or
        (($row['ReqItemId2']) and ($row['ReqItemCount2'])) or
        (($row['ReqItemId3']) and ($row['ReqItemCount3'])) or
        (($row['ReqItemId4']) and ($row['ReqItemCount4']))) {
        $x .= '<tr><td><br>';
        $x .= '<div class="q">' . LOCALE_REQUIREMENTS . ':<br></div>';
        for ($j = 1; $j <= 4; $j++)
            if ($row['ReqCreatureOrGOId' . $j] and $row['ReqCreatureOrGOCount' . $j])
                $x .= '- '
                    . (
                    (!empty($row['ObjectiveText'][$j])) ?
                        $row['ObjectiveText'][$j] :
                        GetQuestReq($row['ReqCreatureOrGOId' . $j], $row['ReqCreatureOrGOCount' . $j], 1)
                    ) . '<br>';
        for ($j = 1; $j <= 4; $j++)
            if ($row['ReqItemId' . $j] and $row['ReqItemCount' . $j])
                $x .= '- ' . GetQuestReq($row['ReqItemId' . $j], $row['ReqItemCount' . $j], 2) . '<br>';
        $x .= '</td></tr>';
    }
    $x .= '</table>';

    return $x;
}

function GetQuestDBLocale($quest)
{
    global $DB;
    $data = array();
    $loc = $_SESSION['locale'];
    $row = $DB->selectRow('
			SELECT
				Title_loc?d				AS Title,
				Details_loc?d			AS Details,
				Objectives_loc?d		AS Objectives,
				OfferRewardText_loc?d	AS OfferRewardText,
				RequestItemsText_loc?d	AS RequestItemsText,
				EndText_loc?d			AS EndText,
				ObjectiveText1_loc?d	AS ObjectiveText1,
				ObjectiveText2_loc?d	AS ObjectiveText2,
				ObjectiveText3_loc?d	AS ObjectiveText3,
				ObjectiveText4_loc?d	AS ObjectiveText4
			FROM ' . WORLD . 'locales_quest
			WHERE entry = ?d
			LIMIT 1
		', $loc, $loc, $loc, $loc, $loc, $loc, $loc, $loc, $loc, $loc, $quest
    );
    if ($row)
        foreach ($row as $item => $itemContent)
            if (!empty($itemContent))
                $data[$item] = $itemContent;
    return $data;
}

function GetDBQuestInfo($id, $dataflag = QUEST_DATAFLAG_MINIMUM)
{
    global $DB, $questcols, $quest_class;

    $data = $DB->selectRow('
			SELECT
				1 money, RewXP, SuggestedPlayers, LimitTime, SpecialFlags, entry as id, RequiredClasses, RequiredRaces, StartScript, CompleteScript
				{, ?# } {, ?# } {, ?# } {, ?# } {, ?# }
			FROM ' . WORLD . '.quest_template
			WHERE entry=?d
			LIMIT 1
		', ($dataflag & QUEST_DATAFLAG_MINIMUM) ? $questcols[QUEST_DATAFLAG_MINIMUM] : DBSIMPLE_SKIP,
        ($dataflag & QUEST_DATAFLAG_STRINGS) ? $questcols[QUEST_DATAFLAG_STRINGS] : DBSIMPLE_SKIP,
        ($dataflag & QUEST_DATAFLAG_SERIES) ? $questcols[QUEST_DATAFLAG_SERIES] : DBSIMPLE_SKIP,
        ($dataflag & QUEST_DATAFLAG_PROPS) ? $questcols[QUEST_DATAFLAG_PROPS] : DBSIMPLE_SKIP,
        ($dataflag & QUEST_DATAFLAG_REWARDS) ? $questcols[QUEST_DATAFLAG_REWARDS] : DBSIMPLE_SKIP,
        $id
    );

    if (!$data)
        return false;
    else
        return GetQuestInfo($data, $dataflag);
}

/*
 * &$data - ссылка на массив с данными
 * $dataflag - флаг уровень:
 * QUEST_DATAFLAG_MINIMUN	- entry, Title
 * QUEST_DATAFLAG_STRINGS	- Objectives, Details, RequestItemsText, OfferRewardText, EndText, ObjectiveText1, ObjectiveText2, ObjectiveText3, ObjectiveText4
 * QUEST_DATAFLAG_SERIES	- PrevQuestID, NextQuestInChain, ExclusiveGroup, NextQuestID
 * QUEST_DATAFLAG_PROPS		- Daily, Type, side, etc.
 * QUEST_DATAFLAG_REWARDS	- RewChoiceItemId1, RewChoiceItemId2, RewChoiceItemId3, RewChoiceItemId4, RewChoiceItemId5, RewChoiceItemId6, RewChoiceItemCount1', 'RewChoiceItemCount2, RewChoiceItemCount3, 'RewChoiceItemCount4', 'RewChoiceItemCount5', 'RewChoiceItemCount6', 'RewItemId1', 'RewItemId2', 'RewItemId3', 'RewItemId4', 'RewItemCount1', 'RewItemCount2', 'RewItemCount3', 'RewItemCount4', 'RewMoneyMaxLevel', 'RewOrReqMoney', 'ReqSpellCast1', 'ReqSpellCast2', 'ReqSpellCast3', 'ReqSpellCast4', 'ReqCreatureOrGOId1', 'ReqCreatureOrGOId2', 'ReqCreatureOrGOId3', 'ReqCreatureOrGOId4', 'ReqItemId1', 'ReqItemId2', 'ReqItemId3', 'ReqItemId4', 'ReqItemCount1', 'ReqItemCount2', 'ReqItemCount3', 'ReqItemCount4', 'SrcItemId', 'ReqCreatureOrGOCount1', 'ReqCreatureOrGOCount2', 'ReqCreatureOrGOCount3', 'ReqCreatureOrGOCount4
 *
 */


function GetQuestInfo(&$data, $dataflag = QUEST_DATAFLAG_MINIMUM)
{
    global $DB, $quest_class;
    /* else
      {
      $data = $DB->selectRow('
      SELECT
      1
      {, ?# } {, ?# } {, ?# } {, ?# } {, ?# }
      FROM '.WORLD.'quest_template
      WHERE entry=?d
      LIMIT 1
      ',
      ($dataflag & QUEST_DATAFLAG_MINIMUM)?$questcols[QUEST_DATAFLAG_MINIMUM]:DBSIMPLE_SKIP,
      ($dataflag & QUEST_DATAFLAG_STRINGS)?$questcols[QUEST_DATAFLAG_STRINGS]:DBSIMPLE_SKIP,
      ($dataflag & QUEST_DATAFLAG_SERIES) ?$questcols[QUEST_DATAFLAG_SERIES] :DBSIMPLE_SKIP,
      ($dataflag & QUEST_DATAFLAG_PROPS)  ?$questcols[QUEST_DATAFLAG_PROPS]  :DBSIMPLE_SKIP,
      ($dataflag & QUEST_DATAFLAG_REWARDS)?$questcols[QUEST_DATAFLAG_REWARDS]:DBSIMPLE_SKIP,
      $data['entry']
      );
      }
      if(!$data)
      {
      return false;
      } */

    // Локализация
    $loc = $_SESSION['locale'];

    if ($dataflag & QUEST_DATAFLAG_LOCALE && $_SESSION['locale'] > 0)
        $data = array_merge($data, $DB->selectRow('
				SELECT
					Title_loc?d				AS Title_loc,
					Details_loc?d			AS Details_loc,
					Objectives_loc?d		AS Objectives_loc,
					OfferRewardText_loc?d	AS OfferRewardText_loc,
					RequestItemsText_loc?d	AS RequestItemsText_loc,
					EndText_loc?d			AS EndText_loc,
					ObjectiveText1_loc?d	AS ObjectiveText1_loc,
					ObjectiveText2_loc?d	AS ObjectiveText2_loc,
					ObjectiveText3_loc?d	AS ObjectiveText3_loc,
					ObjectiveText4_loc?d	AS ObjectiveText4_loc
				FROM ' . WORLD . '.locales_quest
				WHERE entry = ?d
				LIMIT 1
			', $loc, $loc, $loc, $loc, $loc, $loc, $loc, $loc, $loc, $loc, $data['id'] ? $data['id'] : $data['entry']
        ));
    // Минимальные данные
    // ID квеста
    // Имя квеста
    $data['entry'] = $data['id'];
    $data['Title'] = GetQuestTitle($data);



    $races = [
        1 => 'Human',
        2 => 'Orc',
        4 => 'Dwarf',
        8 => 'Nightelf',
        16 => 'Undead',
        32 => 'Tauren',
        64 => 'Gnome',
        128 => 'Troll',
        256 => 'Goblin',
        512 => 'Highelf'
    ];

    if ($data['RequiredRaces'] != 0) {
        foreach ($races as $bit => $race) {
            if ($data['RequiredRaces'] & $bit)
                $data['nice_races'] .= $race . ', ';
        }

        $data['nice_races'] = rtrim($data['nice_races'], ', ');

    } else {
        $data['nice_races'] = 'All';
    }

    $classes = [
        1 => 'Warrior',
        2 => 'Paladin',
        4 => 'Hunter',
        8 => 'Rogue',
        16 => 'Priest',
        64 => 'Shaman',
        128 => 'Mage',
        256 => 'Warlock',
        1024 => 'Druid',
    ];

    if ($data['RequiredClasses'] != 0) {
        foreach ($classes as $bit => $class) {
            if ($data['RequiredClasses'] & $bit)
                $data['nice_classes'] .= $class. ', ';
        }
        $data['nice_classes'] = rtrim($data['nice_classes'], ', ');

    } else {
        $data['nice_classes'] = 'All';
    }





    // Описания
    if ($dataflag & QUEST_DATAFLAG_STRINGS)
        GetQuestStrings($data);

    // Свойства
    if ($dataflag & QUEST_DATAFLAG_PROPS) {
        // Уровень квеста
        $data['QuestLevel'] = $data['QuestLevel'];
        // Требуемый уровень квеста
        $data['MinLevel'] = $data['MinLevel'];
        // Доступен расам

        $data['side'] = races($data['RequiredRaces']);
        // Флаги
        $data['QuestFlags'] = $data['QuestFlags'];
        // not used
        //if($data['QuestFlags'] & QUEST_FLAGS_DAILY)
        //		$data['Daily'] = true;
        // Тип квеста
        $data['type'] = $data['Type'];
        if ($data['type'] == 1)
            $data['typename'] = 'Group';
        else
            $data['typename'] = $data['type'];
        // Путь к этому разделу (главная категория)
        foreach ($quest_class as $i => $class)
            if (in_array($data['ZoneOrSort'], $class)) {
                $data['maincat'] = $i;
                break;
            }
        // Категория 1
        $data['category'] = $data['ZoneOrSort'];
        // Категория 2 ???
        $data['category2'] = $data['QuestFlags'];
        // Требуемое пати
        if ($data['SuggestedPlayers'] > 1)
            $data['splayers'] = $data['SuggestedPlayers'];
        // Лимит времени

        if ($data['LimitTime'] > 0)
            $data['LimitTime'] = sec_to_time($data['LimitTime']);
        if ($data['QuestFlags'] & QUEST_FLAGS_SHARABLE)
            $data['Sharable'] = true;
        if ($data['SpecialFlags'] & QUEST_SPECIALFLAGS_REPEATABLE)
            $data['Repeatable'] = true;

        $data['titlereward'] = NULL;
    }

    // Награды и задания
    if ($dataflag & QUEST_DATAFLAG_REWARDS) {
        // Опыт/деньги@70
        $data['xp'] = GetQuestXpOrMoney($data);
        // Награды вещей
        for ($j = 1; $j <= 6; ++$j)
            if (($data['RewChoiceItemId' . $j] != 0) and ($data['RewChoiceItemCount' . $j] != 0))
                $data['itemchoices'][] = array_merge(
                    array(allitemsinfo($data['RewChoiceItemId' . $j], 0)), array('count' => $data['RewChoiceItemCount' . $j])
                );
        for ($j = 1; $j <= 4; ++$j)
            if (($data['RewItemId' . $j] != 0) and ($data['RewItemCount' . $j] != 0))
                $data['itemrewards'][] = array_merge(
                    array(allitemsinfo($data['RewItemId' . $j], 0)), array('count' => $data['RewItemCount' . $j])
                );
        // Вознаграждение репутацией
        for ($j = 1; $j <= 5; $j++)
            if (($data['RewRepFaction' . $j] != 0) && ($data['RewRepValue' . $j] != 0))
                $data['reprewards'][] = array_merge(factioninfo($data['RewRepFaction' . $j]), array('value' => $data['RewRepValue' . $j]));
        // Вознаграждение деньгами
        if ($data['money'] > 0)
            $data['money'] = money2coins($data['money']);
        elseif ($data['money'] < 0)
            $data['moneyreq'] = money2coins(-$data['money']);
    }

    // Последовательность квестов, требования, цепочки
    if ($dataflag & QUEST_DATAFLAG_SERIES) {
        // не используется для вычисления самих сериесов, исключительно для внесения соответствующих полей в массив информации
    }

    // Все ОК. Это не обязательный return, но в некоторых функциях нужен.

    return $data;
}
