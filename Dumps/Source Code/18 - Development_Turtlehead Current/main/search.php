<?php


global $smarty;
global $conf_file;
global $podrazdel;
global $search;
global $hide_cow_stuff;


// Необходима функция iteminfo
require_once('includes/game.php');
require_once('includes/allspells.php');
require_once('includes/allquests.php');
require_once('includes/allitems.php');
require_once('includes/allnpcs.php');
require_once('includes/allobjects.php');

// Настраиваем Smarty ;)
$smarty->config_load($conf_file, 'search');

// Строка поиска:
$nsearch = '%' . urldecode($podrazdel) . '%';

if (strlen($nsearch) <= 2)
    return false;

$search_array = explode(' ', $nsearch);

// Заголовок страницы
$title = $search . ' - ' . $smarty->get_config_vars('name') . ' ' . $smarty->get_config_vars('Search');
$tab = '0';

// Подключаемся к ДБ
global $DB;
global $allitems;
global $allspells;

global $npc_cols;
global $spell_cols;
global $item_cols;
global $object_cols;

// Массив всего найденного
$found = array();

// Ищем вещи:
if ($_SESSION['locale'] > 0) {
    $tmp = $DB->select('
			SELECT entry
			FROM ' . AOWOW . '.locales_item
			WHERE name_loc?d LIKE ?
            LIMIT 100
		', $_SESSION['locale'], $nsearch
    );
    foreach ($tmp as $t) {
        $m[] = $t['entry'];
    }
}

$rows = $DB->select('
		SELECT i.?#
			{, l.name_loc?d AS `name_loc`}
		FROM ' . AOWOW . '.aowow_icons a, ' . WORLD . '.item_template i
			{LEFT JOIN (' . WORLD . '.locales_item l) ON l.entry=i.entry AND ?d}
		WHERE
			(i.name LIKE ? {OR i.entry IN (?a)})
			AND a.id = i.display_id
			AND i.name NOT LIKE "%TEST%"
	', $item_cols[3], ($m) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($m) ? 1 : DBSIMPLE_SKIP, $nsearch, ($m) ? $m : DBSIMPLE_SKIP
);
unset($m);
unset($t);
unset($tmp);
foreach ($rows as $numRow => $row)
{
    if ($hide_cow_stuff)
    {
        if (!in_array($row['entry'], [60486, 51261, 60485, 60491, 60487, 60488, 60489, 60490, 60149,60150]))
            $found['item'][] = iteminfo2($row);
    }
    else
        $found['item'][] = iteminfo2($row);
}


// Ищем NPC:
if ($_SESSION['locale'] > 0) {
    $tmp = $DB->select('
			SELECT entry
			FROM ' . WORLD . '.locales_creature
			WHERE
				name_loc?d LIKE ?
				OR subname_loc?d LIKE ?
				GROUP BY entry
				LIMIT 100
		', $_SESSION['locale'], $nsearch, $_SESSION['locale'], $nsearch
    );

    foreach ($tmp as $t) {
        $m[] = $t['entry'];
    }
}
$rows = $DB->select('
		SELECT ?#, c.entry
			{, l.name_loc?d AS `name_loc`,
			l.subname_loc' . ($_SESSION['locale']) . ' AS `subname_loc`}
		FROM ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
			{LEFT JOIN (' . WORLD . '.locales_creature l) ON l.entry=c.entry AND ?d}
		WHERE
			(name LIKE ?
			OR subname LIKE ?
			{OR c.entry IN (?a)})
			GROUP BY c.entry
			LIMIT 100
			
	', $npc_cols[0], ($m) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($m) ? 1 : DBSIMPLE_SKIP, $nsearch, $nsearch, ($m) ? $m : DBSIMPLE_SKIP
);
//AND factiontemplateID=FactionAlliance
unset($m);
unset($t);
unset($tmp);
foreach ($rows as $numRow => $row)
    $found['npc'][] = creatureinfo2($row);

// Ищем объекты
if ($_SESSION['locale'] > 0) {
    $tmp = $DB->select('
			SELECT entry
			FROM ' . WORLD . '.locales_gameobject
			WHERE
				name_loc?d LIKE ?
		', $_SESSION['locale'], $nsearch
    );
    foreach ($tmp as $t) {
        $m[] = $t['entry'];
    }
}
$rows = $DB->select('
		SELECT g.?#
			{, l.name_loc?d AS `name_loc`}
		FROM ' . WORLD . '.gameobject_template g
			{LEFT JOIN (' . WORLD . '.locales_gameobject l) ON l.entry=g.entry AND ?d}
		WHERE name LIKE ? {OR g.entry IN (?a)}
	', $object_cols[0], ($m) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($m) ? 1 : DBSIMPLE_SKIP, $nsearch, ($m) ? $m : DBSIMPLE_SKIP
);
unset($m);
unset($t);
unset($tmp);
foreach ($rows as $numRow => $row)
    $found['object'][] = objectinfo2($row);

// Ищем квесты
if ($_SESSION['locale'] > 0) {
    $tmp = $DB->select('
			SELECT entry
			FROM ' . WORLD . '.locales_quest
			WHERE
				Title_loc?d LIKE ?
		', $_SESSION['locale'], $nsearch
    );
    foreach ($tmp as $t) {
        $m[] = $t['entry'];
    }
}
$rows = $DB->select('
		SELECT *, q.entry as id
			{, l.Title_loc?d AS `Title_loc`}
		FROM ' . WORLD . '.quest_template q
			{LEFT JOIN (' . WORLD . '.locales_quest l) ON l.entry=q.entry AND ?d}
		WHERE Title LIKE ? {OR q.entry IN (?a)}
	', ($m) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($m) ? 1 : DBSIMPLE_SKIP, $nsearch, ($m) ? $m : DBSIMPLE_SKIP
);
unset($m);
unset($t);
unset($tmp);
foreach ($rows as $numRow => $row)
    $found['quest'][] = GetQuestInfo($row, 0xFFFFFF);

// Ищем наборы вещей
$rows = $DB->select('
		SELECT *
		FROM ' . AOWOW . '.aowow_itemset
		WHERE name_loc' . $_SESSION['locale'] . ' LIKE ?
	', $nsearch
);
foreach ($rows as $numRow => $row)
    $found['itemset'][] = itemsetinfo2($row);

// Ищем спеллы
$rows = $DB->select('
		SELECT ?#, spellID
		FROM ' . AOWOW . '.aowow_spell s, ' . AOWOW . '.aowow_spellicons i
		WHERE
			s.spellname_loc' . $_SESSION['locale'] . ' like ?
			AND i.id = s.spellicon
	', $spell_cols[2], $nsearch
);
foreach ($rows as $numRow => $row)
    $found['spell'][] = spellinfo2($row);

$keys = array_keys($found);

foreach ($found as $key => $f)
    foreach ($f as $key2 =>$ff)
        $found[$key][$key2]['name'] = str_replace("\n", "", $ff['name']);

if ((count($found) == 1) and (count($found[$keys[0]]) == 1)) {
    header("Location: ?" . $keys[0] . '=' . $found[$keys[0]][0]['entry']);
} else {

    $smarty->assign('found', $found);

    // Если хоть одна информация о вещи найдена - передаём массив с информацией о вещях шаблонизатору
    if (isset($allitems))
        $smarty->assign('allitems', $allitems);
    if (isset($allspells))
        $smarty->assign('allspells', $allspells);

    // Параметры страницы
    $page = array();
    // Номер вкладки меню
    $page['tab'] = 0;
    // Заголовок страницы
    $page['title'] = $search . ' - ' . $smarty->get_config_vars('Search');
    $smarty->assign('page', $page);

    $smarty->assign('mysql', $DB->getStatistics());
    $smarty->assign('search', $search);

    $smarty->display('search.tpl');
}
