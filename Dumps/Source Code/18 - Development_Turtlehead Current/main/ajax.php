<?php

header('Content-type: application/x-javascript');
error_reporting(E_ALL | E_STRICT);
ini_set('serialize_precision', 4);
session_start();

if (isset($_GET['admin-loader']) && $_SESSION['roles'] == 2) {
    include 'templates/wowhead/js/admin.js';
    exit;
}

// Настройки
require_once 'configs/config.php';
// Для Ajax отключаем debug
$UDWBaseconf['debug'] = false;
// Для Ajax ненужен реалм
$UDWBaseconf['realmd'] = false;
// Настройка БД
global $DB;
require_once('includes/db.php');

function str_normalize($string) {
    return strtr($string, array('\\' => '\\\\', "'" => "\\'", '"' => '\\"', "\r" => '\\r', "\n" => '\\n', '</' => '<\/'));
}

// Параметры передаваемые скрипту
@list($what, $id) = explode("=", $_SERVER['QUERY_STRING']);
$id = intval($id);

$x = '';

switch ($what) {
    case 'item':
        if (!$item = load_cache(6, $id)) {
            require_once('includes/allitems.php');
            $item = allitemsinfo($id, 1);
            save_cache(6, $id, $item);
        }
        $x .= '$WowheadPower.registerItem(' . $id . ', 0, {';
        if ($item['name'])
            $x .= 'name: \'' . str_normalize($item['name']) . '\',';
        if ($item['quality'])
            $x .= 'quality: ' . $item['quality'] . ',';
        if ($item['icon'])
            $x .= 'icon: \'' . str_normalize($item['icon']) . '\',';
        if ($item['info'])
            $x .= 'tooltip: \'' . str_normalize($item['info']) . '\'';
        $x .= '});';
        break;
    case 'spell':
        if (!$spell = load_cache(14, $id)) {
            require_once('includes/allspells.php');
            $spell = allspellsinfo($id, 1);
            save_cache(14, $id, $spell);
        }
        $x .= '$WowheadPower.registerSpell(' . $id . ', 0,{';
        if ($spell['name'])
            $x .= 'name: \'' . str_normalize($spell['name']) . '\',';
        if ($spell['icon'])
            $x .= 'icon: \'' . str_normalize($spell['icon']) . '\',';
        if ($spell['info'])
            $x .= 'tooltip: \'' . str_normalize($spell['info']) . '\'';
        $x .= '});';
        break;
    case 'quest':
        if (!$quest = load_cache(11, $id)) {
            require_once('includes/allquests.php');
            $quest = GetDBQuestInfo($id, QUEST_DATAFLAG_AJAXTOOLTIP);
            $quest['tooltip'] = GetQuestTooltip($quest);
            save_cache(11, $id, $quest);
        }
        $x .= '$WowheadPower.registerQuest(' . $id . ', 0,{';
        if (isset($quest['Title']))
        {
            $x .= 'name: \'' . str_normalize($quest['Title']) . '\',';
        }
        else
        {
            $x .= 'name: \'' . 'error' . '\',';
        }
        if ($quest['tooltip'])
        {
            $x .= 'tooltip: \'' . str_normalize($quest['tooltip']) . '\'';
        }
        $x .= '});';
        break;
    default:
        break;
}

echo $x;
