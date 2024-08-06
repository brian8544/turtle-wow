<?php

require_once('includes/allobjects.php');
require_once('includes/allitems.php');
require_once('includes/allcomments.php');
require_once('includes/allquests.php');

global $smarty;
global $conf_file;
global $podrazdel;
global $hide_cow_stuff;

$smarty->config_load($conf_file, 'object');

// номер объекта;
$id = $podrazdel;

if (in_array($id, [2])) {
    $id = -$id;
}

$cow_objects = [2010810, 2010811, 2010812, 2010813, 2010814];

if (in_array($id, $cow_objects) && $hide_cow_stuff)
    $id = rand(1, 10000);

if (!$object = load_cache(3, intval($id))) {
    unset($object);

    // БД
    global $DB;

    // Данные об объекте:
    $object = array();
    $object = objectinfo($id, 1);

    // starts
    $quest_cols[2] = array('entry', 'Title', 'QuestLevel', 'MinLevel', 'RequiredRaces', 'RewChoiceItemId1', 'RewChoiceItemId2', 'RewChoiceItemId3', 'RewChoiceItemId4', 'RewChoiceItemId5', 'RewChoiceItemId6', 'RewChoiceItemCount1', 'RewChoiceItemCount2', 'RewChoiceItemCount3', 'RewChoiceItemCount4', 'RewChoiceItemCount5', 'RewChoiceItemCount6', 'RewItemId1', 'RewItemId2', 'RewItemId3', 'RewItemId4', 'RewItemCount1', 'RewItemCount2', 'RewItemCount3', 'RewItemCount4', 'RewMoneyMaxLevel', 'RewOrReqMoney', 'Type', 'ZoneOrSort', 'QuestFlags');
    $rows_qs = $DB->select('
		SELECT o.?# , entry as id
		FROM '.WORLD.'.gameobject_questrelation q, ' . WORLD . '.quest_template o
		WHERE
			q.id = ?d
			AND o.entry = q.quest
		', $quest_cols[2], $id
    );
    if ($rows_qs) {
        $object['starts'] = array();
        foreach ($rows_qs as $numRow => $row)
            $object['starts'][] = GetQuestInfo($row, 0xFFFFFF);
    }
    unset($rows_qs);

    // ends
    $quest_cols[2] = array('entry', 'Title', 'QuestLevel', 'MinLevel', 'RequiredRaces', 'RewChoiceItemId1', 'RewChoiceItemId2', 'RewChoiceItemId3', 'RewChoiceItemId4', 'RewChoiceItemId5', 'RewChoiceItemId6', 'RewChoiceItemCount1', 'RewChoiceItemCount2', 'RewChoiceItemCount3', 'RewChoiceItemCount4', 'RewChoiceItemCount5', 'RewChoiceItemCount6', 'RewItemId1', 'RewItemId2', 'RewItemId3', 'RewItemId4', 'RewItemCount1', 'RewItemCount2', 'RewItemCount3', 'RewItemCount4', 'RewMoneyMaxLevel', 'RewOrReqMoney', 'Type', 'ZoneOrSort', 'QuestFlags');
    $rows_qe = $DB->select('
		SELECT o.?# , entry as id
		FROM '.WORLD.'.gameobject_involvedrelation q, '.WORLD.'.quest_template o
		WHERE
			q.id = ?d
			AND o.entry = q.quest
		', $quest_cols[2], $id
    );
    if ($rows_qe) {
        $object['ends'] = array();
        foreach ($rows_qe as $numRow => $row)
            $object['ends'][] = GetQuestInfo($row, 0xFFFFFF);
    }
    unset($rows_qe);

    // Положения объектофф:
    position($object['entry'], 'gameobject');

    save_cache(3, $object['entry'], $object);
}

global $page;
$page = array(
    'Mapper' => false,
    'Book' => false,
    'Title' => $object['name'] . ' - ' . $smarty->get_config_vars('Objects'),
    'tab' => 0,
    'type' => 2,
    'typeid' => $object['entry'],
    'path' => '[0,5,' . $object['type'] . ']'
);
if ($object['pagetext'])
    $page['Book'] = true;
$page['Mapper'] = true;

$smarty->assign('page', $page);

// Комментарии
$smarty->assign('comments', getcomments($page['type'], $page['typeid']));

if (isset($allitems))
    $smarty->assign('allitems', $allitems);
if (isset($object))
    $smarty->assign('object', $object);
// Количество MySQL запросов
$smarty->assign('mysql', $DB->getStatistics());
$smarty->display('object.tpl');
