<?php

require_once('includes/game.php');

// Для списка creatureinfo()
$npc_cols[0] = array('name', 'subname', 'level_min', 'level_max', 'type', 'rank', 'faction');
$npc_cols[1] = array('subname', 'level_min', 'level_max', 'type', 'rank', 'health_min', 'health_max', 'mana_min', 'mana_max', 'gold_min', 'gold_max', 'loot_id', /*'spell1', 'spell2', 'spell3', 'spell4',*/ 'faction', 'dmg_min', 'dmg_max', 'attack_power', 'dmg_multiplier', 'armor');

// Функция информации о создании
function creatureinfo2(&$Row, $onlyText = false) {

    // Номер создания
    $creature['entry'] = $Row['entry'];
    // Имя создания
    $creature['name'] = !empty($Row['name_loc']) ? $Row['name_loc'] : $Row['name'];
    // Подимя создания
    $creature['subname'] = !empty($Row['subname_loc']) ? $Row['subname_loc'] : $Row['subname'];
    // Min/Max уровни
    $creature['level_min'] = $Row['level_min'];
    $creature['level_max'] = $Row['level_max'];

    $creature['location'] = "[".intval(position($creature['entry'], 'creature')[0]['zone'], $onlyText)."]";

    $creature['react'] = ($Row['A']) . ',' . ($Row['H']);
    $creature['type'] = $Row['type'];
    $creature['tag'] = str_normalize($Row['subname']);
    $creature['classification'] = $Row['rank'];

    return $creature;
}

// Функция информации о создании

function creatureinfo($id) {
    global $DB;
    global $npc_cols;
    $row = $DB->selectRow('
		SELECT ?#, c.entry
		{
			, l.name_loc' . $_SESSION['locale'] . ' as `name_loc`
			, l.subname_loc' . $_SESSION['locale'] . ' as `subname_loc`
			, ?
		}
		FROM ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
		{
			LEFT JOIN (' . WORLD . '.locales_creature l)
			ON l.entry=c.entry AND ?
		}
		WHERE
			c.entry=?d
		LIMIT 1
		', $npc_cols[0], ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $id
    );
//    AND factiontemplateID=FactionAlliance
    return creatureinfo2($row);
}
