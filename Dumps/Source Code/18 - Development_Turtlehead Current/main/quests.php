<?php

global $smarty;
global $conf_file;
global $UDWBaseconf;
global $allitems;

// Необходима функция questinfo
require_once('includes/allquests.php');

$smarty->config_load($conf_file, 'quests');

// Разделяем из запроса класс и подкласс квестов
point_delim($podrazdel, $Type, $ZoneOrSort);


$cache_str = (empty($Type) ? 'x' : intval($Type)) . '_' . (empty($ZoneOrSort) ? 'x' : intval($ZoneOrSort));

if (!$quests = load_cache(12, $cache_str)) {
    unset($quests);

    global $DB, $quest_class, $quest_cols;

    // tw quests
    if ($podrazdel == -44) {
        $rows = $DB->select('
		SELECT ?# , entry as id
		FROM ' . WORLD . '.quest_template q
		WHERE
			1 = 1
			{ AND q.entry >= 30000 }
		ORDER BY Title
		', $quest_cols[2], (isset($ZoneOrSort)) ? $ZoneOrSort : DBSIMPLE_SKIP,
            ((!isset($ZoneOrSort)) and $Type) ? $quest_class[$Type] : DBSIMPLE_SKIP
        );
    } else {
        $rows = $DB->select('
		SELECT ?# , entry as id
		FROM ' . WORLD . '.quest_template q
		WHERE
			1 = 1
			{ AND ZoneOrSort = ? }
			{ AND ZoneOrSort IN (?a) }
		ORDER BY Title
		{LIMIT ?d}
		', $quest_cols[2], (isset($ZoneOrSort)) ? $ZoneOrSort : DBSIMPLE_SKIP,
            ((!isset($ZoneOrSort)) and $Type) ? $quest_class[$Type] : DBSIMPLE_SKIP,
            ($UDWBaseconf['limit'] > 0) ? $UDWBaseconf['limit'] : DBSIMPLE_SKIP
        );
    }


    $quests = array();
    foreach ($rows as $numRow => $row) {
        ini_set('mbstring.substitute_character', "none");
        $row['Title'] = mb_convert_encoding($row['Title'], 'UTF-8', 'UTF-8');
        $quests[] = GetQuestInfo($row, QUEST_DATAFLAG_LISTINGS);
    }

    save_cache(12, $cache_str, $quests);
}
global $page;
$page = array(
    'Mapper' => false,
    'Book' => false,
    'Title' => $smarty->get_config_vars('Quests'),
    'tab' => 0,
    'type' => 0,
    'typeid' => 0,
    'path' => '[0, 3,' . $Type . ' ,' . $ZoneOrSort . ']'
);
$smarty->assign('page', $page);

// Если хоть одна информация о вещи найдена - передаём массив с информацией о вещях шаблонизатору
if ($allitems)
    $smarty->assign('allitems', $allitems);
if ($quests)
    $smarty->assign('quests', $quests);
// Количество MySQL запросов
$smarty->assign('mysql', $DB->getStatistics());
// Загружаем страницу
$smarty->display('quests.tpl');
