<?php

require_once('includes/allitemsets.php');

global $smarty;
global $conf_file;

$smarty->config_load($conf_file);

global $DB;
global $allitems;
global $itemset_col;
global $UDWBaseconf;

if (!$itemsets = load_cache(9, 'x')) {
    unset($itemsets);

    $rows = $DB->select('
		SELECT ?#
		FROM ' . AOWOW . '.aowow_itemset
		ORDER by name_loc' . $_SESSION['locale'] . '
		{LIMIT ?d}', $itemset_col[0], ($UDWBaseconf['limit'] != 0) ? $UDWBaseconf['limit'] : DBSIMPLE_SKIP
    );

    $itemsets = array();
    foreach ($rows as $numRow => $row)
        $itemsets[] = itemsetinfo2($row);

    save_cache(9, 'x', $itemsets);
}
$smarty->assign('itemsets', $itemsets);

global $page;
$page = array(
    'Mapper' => false,
    'Book' => false,
    'Title' => $smarty->get_config_vars('Item_Sets'),
    'tab' => 0,
    'type' => 0,
    'typeid' => 0,
    'path' => '[0, 2]'
);
$smarty->assign('page', $page);

// --Передаем данные шаблонизатору--
// Количество MySQL запросов
$smarty->assign('mysql', $DB->getStatistics());
// Если хоть одна информация о вещи найдена - передаём массив с информацией о вещях шаблонизатору
if (isset($allitems))
    $smarty->assign('allitems', $allitems);
// Запускаем шаблонизатор
$smarty->display('itemsets.tpl');
