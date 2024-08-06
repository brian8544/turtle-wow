<?php

require_once('includes/game.php');

global $DB;
global $rDB;
global $smarty;
global $types;

switch ($_GET['latest']) {
    case 'comments':
        $comments = array();
        $rows = $DB->select('
			SELECT `id`, `type`, `typeID`, LEFT(`commentbody`, 120) as `preview`, `userID` as `user`, `post_date` as `date`, (NOW()-`post_date`) as `elapsed`
			FROM ' . AOWOW . '.aowow_comments
			WHERE 1
			ORDER BY post_date DESC
			LIMIT 300');
        foreach ($rows as $i => $row) {
            $comments[$i] = array();
            $comments[$i] = $row;
            switch ($row['type']) {
                case 1: // NPC
                    $comments[$i]['subject'] = $DB->selectCell('SELECT name FROM ' . WORLD . '.creature_template WHERE entry=?d LIMIT 1', $row['typeID']);
                    break;
                case 2: // GO
                    $comments[$i]['subject'] = $DB->selectCell('SELECT name FROM ' . WORLD . '.gameobject_template WHERE entry=?d LIMIT 1', $row['typeID']);
                    break;
                case 3: // Item
                    $comments[$i]['subject'] = $DB->selectCell('SELECT name FROM ' . WORLD . '.item_template WHERE entry=?d LIMIT 1', $row['typeID']);
                    break;
                case 4: // Item Set
                    $comments[$i]['subject'] = $DB->selectCell('SELECT name FROM ' . AOWOW . '.aowow_itemset WHERE itemsetID=?d LIMIT 1', $row['typeID']);
                    break;
                case 5: // Quest
                    $comments[$i]['subject'] = $DB->selectCell('SELECT Title FROM ' . WORLD . '.quest_template WHERE entry=?d LIMIT 1', $row['typeID']);
                    break;
                case 6: // Spell
                    $comments[$i]['subject'] = $DB->selectCell('SELECT spellname_loc' . $_SESSION['locale'] . ' FROM ' . AOWOW . '.aowow_spell WHERE spellID=?d LIMIT 1', $row['typeID']);
                    break;
                case 7: // Zone
                    // TODO
                    break;
                case 8: // Faction
                    $comments[$i]['subject'] = $DB->selectCell('SELECT name_loc' . $_SESSION['locale'] . ' FROM ' . AOWOW . '.aowow_factions WHERE factionID=?d LIMIT 1', $row['typeID']);
                    break;
                default:
                    $comments[$i]['subject'] = $DB->selectCell('SELECT name FROM ' . WORLD . '.' . $types[$row['type']] . '_template WHERE entry=?d LIMIT 1', $row['typeID']);
                    break;
            }
            $comments[$i]['user'] = $rDB->selectCell('SELECT username FROM '.REALMD.'.account WHERE id=?d LIMIT 1', $row['user']);
            if (empty($comments[$i]['user']))
                $comments[$i]['user'] = 'Anonymous';
            $comments[$i]['rating'] = array_sum($DB->selectCol('SELECT rate FROM ' . AOWOW . '.aowow_comments_rates WHERE commentid=?d', $row['id']));
            $comments[$i]['purged'] = ($comments[$i]['rating'] <= -50) ? 1 : 0;
            $comments[$i]['deleted'] = 0;
        }
        $smarty->assign('comments', $comments);
        break;
    default:
        break;
}

global $page;
$page = array(
    'Mapper' => false,
    'Book' => false,
    'Title' => '',
    'tab' => 0,
    'type' => 0,
    'typeid' => 0,
    'path' => '[0, 30]'
);

$smarty->assign('page', $page);
$smarty->display('latest_comments.tpl');
