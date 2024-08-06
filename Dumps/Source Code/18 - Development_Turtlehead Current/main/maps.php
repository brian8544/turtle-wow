<?php

global $smarty;
global $conf_file;

$smarty->config_load($conf_file);

global $page;
$page = array(
    'Mapper' => true,
    'Book' => false,
    'Title' => $smarty->get_config_vars('Maps'),
    'tab' => 1,
    'type' => 0,
    'typeid' => 0,
    'path' => '[]'
);
$smarty->assign('page', $page);

$smarty->display('maps.tpl');
