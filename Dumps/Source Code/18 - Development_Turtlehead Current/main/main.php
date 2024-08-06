<?php

global $DB;
global $smarty;

$rows = $DB->select('SELECT text_loc?d AS text FROM ' . AOWOW . '.aowow_news ORDER BY time DESC, id DESC LIMIT 5', $_SESSION['locale']);
if ($rows)
    $smarty->assign('news', $rows);

//$rows2 = @$DB->select('SELECT version AS text FROM ' . AOWOW . '.db_version LIMIT 1');
//if ($rows2)
//    $smarty->assign('version', $rows2);

global $page;
$smarty->assign('page', $page);
$smarty->display('main.tpl');
