<?php

require_once('includes/allnpcs.php');
require_once('includes/allitems.php');
require_once('includes/allquests.php');
require_once('includes/allcomments.php');

global $npc_cols;
global $item_cols;
global $quest_cols;
global $smarty;
global $conf_file;
global $podrazdel;

global $DB;

$smarty->config_load($conf_file, 'faction');

// Номер фракции
$id = $podrazdel;

if (!$faction = load_cache(18, intval($id))) {
    unset($faction);

    $row = $DB->selectRow('
			SELECT factionID, name_loc' . $_SESSION['locale'] . ', description1_loc' . $_SESSION['locale'] . ', description2_loc' . $_SESSION['locale'] . ', team, side
			FROM ' . AOWOW . '.aowow_factions
			WHERE factionID=?d
			LIMIT 1
		', $id
    );
    if ($row) {
        $faction = array();
        // Номер фракции
        $faction['entry'] = $row['factionID'];
        // Название фракции
        $faction['name'] = $row['name_loc' . $_SESSION['locale']];
        // Описание фракции, из клиента:
        $faction['description1'] = $row['description1_loc' . $_SESSION['locale']];
        // Описание фракции, c wowwiki.com, находится в таблице factions.sql:
        $faction['description2'] = $row['description2_loc' . $_SESSION['locale']];
        // Команда/Группа фракции
        if ($row['team'] != 0)
            $faction['group'] = $DB->selectCell('SELECT name_loc' . $_SESSION['locale'] . ' FROM ' . AOWOW . '.aowow_factions WHERE factionID=?d LIMIT 1', $row['team']);
        // Альянс(1)/Орда(2)
        if ($row['side'] != 0)
            $faction['side'] = $row['side'];

        // Итемы с requiredreputationfaction
        $item_rows = $DB->select('
			SELECT ?#, entry
			FROM ' . WORLD . '.item_template i, ' . AOWOW . '.aowow_icons a
			WHERE
				i.required_reputation_faction=?d
				AND a.id=i.display_id
			', $item_cols[2], $id
        );
        if ($item_rows) {
            $faction['items'] = array();
            foreach ($item_rows as $i => $row)
                $faction['items'][] = iteminfo2($row, 0);
            unset($faction['items']);
        }

        // Персонажи, состоящие во фракции
        $creature_rows = $DB->select('
			SELECT ?#, entry
			FROM ' . WORLD . '.creature_template, ' . AOWOW . '.aowow_factiontemplate
			WHERE
				faction IN (SELECT factiontemplateID FROM ' . AOWOW . '.aowow_factiontemplate WHERE factionID=?d)
				AND factiontemplateID = faction
			', $npc_cols[0], $id
        );
        if ($creature_rows) {
            $faction['creatures'] = array();
            foreach ($creature_rows as $i => $row)
                $faction['creatures'][] = creatureinfo2($row);
            unset($creature_rows);
        }

        // Квесты для этой фракции
        $quests_rows = $DB->select('
			SELECT ?#
			FROM ' . WORLD . '.quest_template
			WHERE
				RewRepFaction1=?d
				OR RewRepFaction2=?d
				OR RewRepFaction3=?d
				OR RewRepFaction4=?d
			', $quest_cols[2], $id, $id, $id, $id
        );

        if ($quests_rows) {
            $faction['quests'] = array();
            foreach ($quests_rows as $i => $row)
                $faction['quests'][] = GetQuestInfo($row, 0xFFFFFF);
            unset($quests_rows);
        }

        foreach ($faction['quests'] as $key => $f)
            $faction['quests'][$key]['id'] = $f['entry'];

        // Faction cache
        save_cache(18, $faction['entry'], $faction);
    }
}

$page = array(
    'Mapper' => false,
    'Book' => false,
    'Title' => $faction['name'] . ' - ' . $smarty->get_config_vars('Factions'),
    'tab' => 0,
    'type' => 8,
    'typeid' => $faction['entry'],
    'path' => '[0, 7, 0]'
);
$smarty->assign('page', $page);

// Комментарии
$smarty->assign('comments', getcomments($page['type'], $page['typeid']));

// Данные о квесте
$smarty->assign('faction', $faction);
// Если хоть одна информация о вещи найдена - передаём массив с информацией о вещях шаблонизатору
if (isset($allitems))
    $smarty->assign('allitems', $allitems);
/*
  if (isset($npcs))
  $smarty->assign('npcs',$npcs);
  if (isset($quests))
  $smarty->assign('quests',$quests);
  if (isset($items))
  $smarty->assign('items',$items);
 */
// Количество MySQL запросов
$smarty->assign('mysql', $DB->getStatistics());
// Загружаем страницу
$smarty->display('faction.tpl');
