<?php

require_once('includes/allitems.php');
require_once('includes/alllocales.php');

// Available character classes
define("CLASS_WARRIOR", 1);
define("CLASS_PALADIN", 2);
define("CLASS_HUNTER", 4);
define("CLASS_ROGUE", 8);
define("CLASS_PRIEST", 16);
define("CLASS_SHAMAN", 64);
define("CLASS_MAGE", 128);
define("CLASS_WARLOCK", 256);
define("CLASS_DRUID", 1024);

// Character classes
$classes = array(
    1 => LOCALE_WARRIOR,
    2 => LOCALE_PALADIN,
    3 => LOCALE_HUNTER,
    4 => LOCALE_ROGUE,
    5 => LOCALE_PRIEST,
    7 => LOCALE_SHAMAN,
    8 => LOCALE_MAGE,
    9 => LOCALE_WARLOCK,
    11 => LOCALE_DRUID
);

// Available character races
define("RACE_HUMAN", 1);
define("RACE_ORC", 2);
define("RACE_DWARF", 4);
define("RACE_NIGHTELF", 8);
define("RACE_UNDEAD", 16);
define("RACE_TAUREN", 32);
define("RACE_GNOME", 64);
define("RACE_TROLL", 128);

// Object types
global $types;
$types = array(
    1 => 'npc',
    2 => 'object',
    3 => 'item',
    4 => 'itemset',
    5 => 'quest',
    6 => 'spell',
    7 => 'zone',
    8 => 'faction',
    9 => 'talent'
);

// Reputation levels
$reputations = array(
    1 => LOCALE_NEUTRAL,
    3000 => LOCALE_FRIENDLY,
    9000 => LOCALE_HONORED,
    21000 => LOCALE_REVERED,
    42000 => LOCALE_EXALTED
);

function sec_to_time($secs)
{
    $time = array();
    if ($secs >= 3600) {
        $time['h'] = floor($secs / 3600);
        $secs = $secs - $time['h'] * 3600;
    }
    if ($secs >= 60) {
        $time['m'] = floor($secs / 60);
        $secs = $secs - $time['m'] * 60;
    }
    if ($secs > 0)
        $time['s'] = $secs;
    return $time;
}

/**
 *
 * @param int $money
 * @return array $coins
 */
function money2coins($money)
{
    $coins = array();
    if ($money >= 10000) {
        $coins['moneygold'] = floor($money / 10000);
        $money = $money - $coins['moneygold'] * 10000;
    }
    if ($money >= 100) {
        $coins['moneysilver'] = floor($money / 100);
        $money = $money - $coins['moneysilver'] * 100;
    }
    if ($money > 0)
        $coins['moneycopper'] = $money;
    return $coins;
}

function classes($class)
{
    $tmp = '';
    if ($class & CLASS_WARRIOR)
        $tmp = LOCALE_WARRIOR;
    if ($class & CLASS_PALADIN)
        if ($tmp)
            $tmp = $tmp . ', ' . LOCALE_PALADIN; else
            $tmp = LOCALE_PALADIN;
    if ($class & CLASS_HUNTER)
        if ($tmp)
            $tmp = $tmp . ', ' . LOCALE_HUNTER; else
            $tmp = LOCALE_HUNTER;
    if ($class & CLASS_ROGUE)
        if ($tmp)
            $tmp = $tmp . ', ' . LOCALE_ROGUE; else
            $tmp = LOCALE_ROGUE;
    if ($class & CLASS_PRIEST)
        if ($tmp)
            $tmp = $tmp . ', ' . LOCALE_PRIEST; else
            $tmp = LOCALE_PRIEST;
    if ($class & CLASS_SHAMAN)
        if ($tmp)
            $tmp = $tmp . ', ' . LOCALE_SHAMAN; else
            $tmp = LOCALE_SHAMAN;
    if ($class & CLASS_MAGE)
        if ($tmp)
            $tmp = $tmp . ', ' . LOCALE_MAGE; else
            $tmp = LOCALE_MAGE;
    if ($class & CLASS_WARLOCK)
        if ($tmp)
            $tmp = $tmp . ', ' . LOCALE_WARLOCK; else
            $tmp = LOCALE_WARLOCK;
    if ($class & CLASS_DRUID)
        if ($tmp)
            $tmp = $tmp . ', ' . LOCALE_DRUID; else
            $tmp = LOCALE_DRUID;
    if ($tmp == LOCALE_WARRIOR . ', ' . LOCALE_PALADIN . ', ' . LOCALE_HUNTER . ', ' . LOCALE_ROGUE
        . ', ' . LOCALE_PRIEST . ', ' . LOCALE_SHAMAN . ', ' . LOCALE_MAGE . ', ' . LOCALE_WARLOCK . ', ' . LOCALE_DRUID)
        return;
    else
        return $tmp;
}

function races($race)
{

    if ($race == (RACE_HUMAN | RACE_ORC | RACE_DWARF | RACE_NIGHTELF | RACE_UNDEAD | RACE_TAUREN | RACE_GNOME | RACE_TROLL) || $race == 0) {
        return array('side' => 3, 'name' => LOCALE_BOTH);
    } elseif ($race == (RACE_ORC | RACE_UNDEAD | RACE_TAUREN | RACE_TROLL)) {
        return array('side' => 2, 'name' => LOCALE_HORDE);
    } elseif ($race == (RACE_HUMAN | RACE_DWARF | RACE_NIGHTELF | RACE_GNOME)) {
        return array('side' => 1, 'name' => LOCALE_ALLIANCE);
    } else {
        $races = array('name' => '', 'side' => 0);
        if ($race & RACE_HUMAN) {
            (($races['side'] == 2) or ($races['side'] == 3)) ? $races['side'] = 3 : $races['side'] = 1;
            if ($races['name'])
                $races['name'] .= ', ';
            $races['name'] .= LOCALE_HUMAN;
        }
        if ($race & RACE_ORC) {
            (($races['side'] == 1) or ($races['side'] == 3)) ? $races['side'] = 3 : $races['side'] = 2;
            if ($races['name'])
                $races['name'] .= ', ';
            $races['name'] .= LOCALE_ORC;
        }
        if ($race & RACE_DWARF) {
            (($races['side'] == 2) or ($races['side'] == 3)) ? $races['side'] = 3 : $races['side'] = 1;
            if ($races['name'])
                $races['name'] .= ', ';
            $races['name'] .= LOCALE_DWARF;
        }
        if ($race & RACE_NIGHTELF) {
            (($races['side'] == 2) or ($races['side'] == 3)) ? $races['side'] = 3 : $races['side'] = 1;
            if ($races['name'])
                $races['name'] .= ', ';
            $races['name'] .= LOCALE_NIGHT_ELF;
        }
        if ($race & RACE_UNDEAD) {
            (($races['side'] == 1) or ($races['side'] == 3)) ? $races['side'] = 3 : $races['side'] = 2;
            if ($races['name'])
                $races['name'] .= ', ';
            $races['name'] .= LOCALE_UNDEAD;
        }
        if ($race & RACE_TAUREN) {
            (($races['side'] == 1) or ($races['side'] == 3)) ? $races['side'] = 3 : $races['side'] = 2;
            if ($races['name'])
                $races['name'] .= ', ';
            $races['name'] .= LOCALE_TAUREN;
        }
        if ($race & RACE_GNOME) {
            (($races['side'] == 2) or ($races['side'] == 3)) ? $races['side'] = 3 : $races['side'] = 1;
            if ($races['name'])
                $races['name'] .= ', ';
            $races['name'] .= LOCALE_GNOME;
        }
        if ($race & RACE_TROLL) {
            (($races['side'] == 1) or ($races['side'] == 3)) ? $races['side'] = 3 : $races['side'] = 2;
            if ($races['name'])
                $races['name'] .= ', ';
            $races['name'] .= LOCALE_TROLL;
        }

        return $races;
    }
}

function sum_subarrays_by_key($tab, $key)
{
    $sum = 0;
    foreach ($tab as $sub_array) {
        $sum += $sub_array[$key];
    }
    return $sum;
}

function coord_db2wow($mapid, $x, $y, $global)
{

    $x = intval($x);
    $y = intval($y);

    // Карты
    global $map_images;
    // Подключение к базе
    global $DB;

    $rows = $DB->select("SELECT * FROM " . AOWOW . ".aowow_zones 
    WHERE (mapID=? and x_min<? and x_max>? and y_min<? and y_max>?)",
        $mapid, $x, $x, $y, $y
    );

    foreach ($rows as $numRow => $row) {
        // Сохраяняем имя карты и координаты
        $wow['zone'] = $row['areatableID'];
        $wow['name'] = $row['name_loc' . $_SESSION['locale']];

        // Т.к. в игре координаты начинают отсчёт с левого верхнего угла
        //  а в системе координат сервера с правого нижнего,
        //  делаем соответствующее преобразование.
        $tx = 100 - ($y - $row["y_min"]) / (($row["y_max"] - $row["y_min"]) / 100);
        $ty = 100 - ($x - $row["x_min"]) / (($row["x_max"] - $row["x_min"]) / 100);

        // А если ещё и с цветом совпала - нах цикл, это всё наше :) Оо
        // Если ещё не загружена - загружаем.
        if (!isset($map_images[$wow['zone']])) {
            $mapname = str_replace("\\", "/", getcwd()) . '/images/tmp/' . $row['areatableID'] . '.png';
            if (file_exists($mapname)) {
                $map_images[$wow['zone']] = @ImageCreateFromPNG($mapname);
            } else {
//                echo "<font color=red>....Map $mapname not found (ID=" . $wow['zone'] . ")</font><br>";
            }
        }

        // Если так и не загрузилась... Возможно такой карты ещё просто нету :)
        if ($map_images[$wow['zone']]) {
            if (@ImageColorAt($map_images[$wow['zone']], round($tx * 10), round($ty * 10)) === 0) {
                break;
            }
        }
    }

    if (count($rows) == 0) {
        // Ничего не найдено. Мб инста??

        $mapid = intval($mapid);

        $row = $DB->selectRow("SELECT * 
            FROM " . AOWOW . ".aowow_zones WHERE (mapID=? and x_min=0 and x_max=0 and y_min=0 and y_max=0)", $mapid);
        if ($row) {
            $wow['zone'] = $row['areatableID'];
            $wow['name'] = $row['name_loc' . $_SESSION['locale']];
        } else {
//            echo "<font color=red>....Location for Map with ID=$mapid not found</font><br>";
            return [];
        }
    }

    $wow['x'] = round($tx, 4);
    $wow['y'] = round($ty, 4);

    return $wow;
}

// Преобразование целого массива координат
// Всегда пользовацца только им!
function mass_coord(&$data)
{
    // Карты
    global $map_images;

    // Гуиды для эвента
    $guids = array();
    // Объявляем новый массив с преобразованными данными
    $xdata = array();
    // Перебираем по порядку все координаты, посланные функции
    //  Если таких же координат (уже преобразованных) ещё нет, добавляем в новый массив
    foreach ($data as $ndata) {
        // Если помимо координат есть ещё данные о респауне, преобразуем их к удобочитаемому виду:
        if (isset($ndata['spawntimesecs'])) {
            $coord_db2wow = coord_db2wow($ndata['m'], $ndata['x'], $ndata['y'], false) ?: array();
            $tmp = array_merge($coord_db2wow, array('r' => sec_to_time($ndata['spawntimesecs'])));
        } else {
            $tmp = coord_db2wow($ndata['m'], $ndata['x'], $ndata['y'], false);
        }

        $tmp['t'] = $ndata['type'];
        $xdata[] = $tmp;
    }
    // Освобождаем всю память выделенную под карты
//    if ($map_images)
//        foreach ($map_images as $map_image)
//            imagedestroy($map_image);

    // Возвращаем новый массив
    return $xdata;
}

// Функция информации о фракции
function factioninfo($id)
{
    global $DB;
    $faction['name'] = $DB->selectCell('SELECT name_loc' . $_SESSION['locale'] . ' FROM ' . AOWOW . '.aowow_factions WHERE factionID = ?d LIMIT 1', $id);
    $faction['entry'] = $id;
    return $faction;
}

// Function, that creates loot_table (without references) from lootid
//   $table - table, in which we search
//   $lootid - loot ident
//   $repetition_factor - repetition factor
function loot_table($table, $lootid, $max_percent = 100)
{
    // Все элементы
    global $DB;
    global $loot_groups;
    global $item_cols;
    global $UDWBaseconf;
    $loot = array();
    $groups = array();
    // Мего запрос :)
    $rows = $DB->select('
		SELECT l.ChanceOrQuestChance, l.mincountOrRef, l.maxcount as `d-max`, l.groupid, ?#, i.entry, i.max_count
			{, loc.name_loc?d AS `name_loc`}
		FROM ' . $table . ' l
			LEFT JOIN (' . AOWOW . '.aowow_icons a, ' . WORLD . '.item_template i) ON l.item=i.entry AND a.id=i.display_id 
			{LEFT JOIN (' . WORLD . '.locales_item loc) ON loc.entry=i.entry AND ?d}
		WHERE
			l.entry=?d
		{LIMIT ?d}
		', $item_cols[2], ($_SESSION['locale']) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale']) ? 1 : DBSIMPLE_SKIP, $lootid, ($UDWBaseconf['limit'] != 0) ? $UDWBaseconf['limit'] : DBSIMPLE_SKIP
    );

    // Перебираем
    foreach ($rows as $i => $row) {
        if ($row['mincountOrRef'] > 0) {
            // Не ссылка!
            if ($row['groupid'] > 0) {
                // Групповой лут!
                $groups[$row['groupid']][] = array(
                    'mincount' => $row['mincountOrRef'],
                    'maxcount' => $row['d-max'],
                    'percent' => $row['ChanceOrQuestChance'] * $max_percent / 100,
                    'item' => iteminfo2($row, 0)
                );
                // Общее число элементов группы с равнозначным шансом
                if (!(isset($group_idx[$row['groupid']]['num-equal'])))
                    $group_idx[$row['groupid']]['num-equal'] = 0;
                // Общий шанс дропа для группового лута
                if (!(isset($group_idx[$row['groupid']]['percent'])))
                    $group_idx[$row['groupid']]['percent'] = 0;
                // Если шанс дропа=0, значит это равнозначный лут в группе
                // Иначе, увеличиваем зарезервированный шанс для элементов лута с четко определенным шансом дропа
                if ($row['ChanceOrQuestChance'] == 0)
                    $group_idx[$row['groupid']]['num-equal']++;
                else
                    $group_idx[$row['groupid']]['percent'] += abs($row['ChanceOrQuestChance']);
            } else {
                // old common loot
                $loot[] = array_merge(array(
                    'percent' => ($max_percent != 100) ? $max_percent : $row['ChanceOrQuestChance'],
                    'mincount' => $row['mincountOrRef'],
                    'maxcount' => $row['d-max'],
                    'group' => 0
                ), iteminfo2($row, 0));
            }
        } else {
            // Ссылка!
            // Вот если это ссылка, то ######
            // Наша задача - вызвать эту же функцию, но с предопределенным значением percent и maxcount
            for ($j = 1; $j <= $row['d-max']; $j++)
                $loot = array_merge($loot, loot_table(WORLD . '.reference_loot_template', -$row['mincountOrRef'], $row['ChanceOrQuestChance']));
        }
    }
    // Iterate group loot
    foreach ($groups as $groupid => $group) {
        foreach ($group as $field => $group_item) {
            if (isset($group_item['item']))
                $loot[] = array_merge(array(
                    'mincount' => $group_item['mincount'],
                    'maxcount' => $group_item['maxcount'],
                    'percent' => ($group_item['percent'] == 0) ? (($max_percent - $group_idx[$groupid]['percent']) / $group_idx[$groupid]['num-equal']) : $group_item['percent'],
                    'group' => $loot_groups,
                    'grouppercent' => ($group_idx[$groupid]['num-equal'] > 0) ? $max_percent : $group_idx[$groupid]['percent']
                ), $group_item['item']);
        }
        $loot_groups++;
    }
    return $loot;
}

function loot($table, $lootid)
{
    global $loot_groups;
    $loot_groups = 1;
    $loot = loot_table($table, $lootid);

    return $loot;
}

// Кто дропает
function drop($table, $item)
{
    global $DB;
    global $UDWBaseconf;
    $rows = $DB->select('
		SELECT l.ChanceOrQuestChance, l.mincountOrRef, l.maxcount, l.entry
		FROM ' . $table . ' l
		WHERE
			l.item=?
		{LIMIT ?d}
		', $item, ($UDWBaseconf['limit'] != 0) ? $UDWBaseconf['limit'] : DBSIMPLE_SKIP
    );
    $drop = array();
    foreach ($rows as $i => $row) {
        if ($row['mincountOrRef'] > 0) {
            $num = $row['entry'];
            $drop[$num] = array();
            $drop[$num]['percent'] = abs($row['ChanceOrQuestChance']);
            $drop[$num]['mincount'] = $row['mincountOrRef'];
            $drop[$num]['maxcount'] = $row['maxcount'];

            // We are looking for loot, which refers to this loot
            $refrows = $DB->select('SELECT entry FROM ' . $table . ' WHERE mincountOrRef=? LIMIT 200', -$num);
            foreach ($refrows as $j => $refrow) {
                $num2 = $refrow['entry'];
                $drop[$num2] = array();
                $drop[$num2]['percent'] = abs($row['ChanceOrQuestChance']);
                $drop[$num2]['mincount'] = $row['mincountOrRef'];
                $drop[$num2]['maxcount'] = $row['maxcount'];
            }
        }
    }
    return $drop;
}

// позиция
function position($id, $type)
{
    global $smarty, $exdata, $zonedata, $DB;

    $data = $DB->select('SELECT guid, map AS m, position_x AS x, position_y AS y, spawntimesecsmin, {movement_type AS ?#, }"0" AS `type` FROM ' . WORLD . '.' . $type . ' WHERE id = ?d GROUP BY ROUND(x,-2), ROUND(y,-2) ORDER BY x,y', ($type == 'gameobject' ? DBSIMPLE_SKIP : 'mt'), $id);

    if ($id == '11583') { //nefarian
        return ['zone' => '[2677]'];
    }

    if ($type <> 'gameobject') {
        $wpWalkingCreaturesGuids = array();
        foreach ($data as $spawnid => $spawn) {
            if ($spawn['mt'] == 2)
                $wpWalkingCreaturesGuids[] = $spawn['guid'];
        }
        if ($wpWalkingCreaturesGuids) {
            $wps = $DB->select('SELECT c.map AS m, m.position_x AS x, m.position_y AS y, "3" AS `type` FROM ' . WORLD . '.creature_movement m, ' . WORLD . '.creature c WHERE m.id = c.guid AND m.id IN (?a) GROUP BY ROUND(x,-2), ROUND(y,-2) ORDER BY x,y', $wpWalkingCreaturesGuids);
            $data = array_merge($data, $wps);
        }
    }

    if (count($data) > 0) {
        $map = $data[0]['m'];
        $data = mass_coord($data);

        if (!isset($data[0]['zone'])) {
            $m_data = $DB->select("SELECT *
            FROM map_template
            WHERE entry = ?", $map)[0];
            $data = [
                [
                    'zone' => $map,
                    'name' => $m_data['map_name'],
                    't' => '0'
                ]
            ];
        }

        // Сортируем массив. Зачем???
        if ($data)
            sort($data);

        // Во временную переменную tmp заносим номер локации
        $j = 0;
        $tmp = $data[$j]['zone'];
        // Номер массива
        $n = 0;
        $k = 0;
        $real_count = 0;

        $zonedata[$n] = array();
        $zonedata[$n]['zone'] = $data[$j]['zone'];
        $zonedata[$n]['name'] = $data[$j]['name'];

        for ($j = 0; $j < count($data); $j++) {
            // Если изменился номер карты, то начинаем новый массив
            if ($tmp != $data[$j]['zone']) {
                // Количество объектов на зоне
                $zonedata[$n]['count'] = $k;
                $n++;
                $exdata[$n] = array();
                $zonedata[$n] = array();
                $tmp = $data[$j]['zone'];
                // Заносим номер зоны в список зон
                $zonedata[$n]['zone'] = $data[$j]['zone'];
                // TODO: Заносим название зоны в список зон
                $zonedata[$n]['name'] = $data[$j]['name'];
                $k = 0;
                $real_count = 0;
            }
            $exdata[$n][$k] = array();
            $exdata[$n][$k] = $data[$j];
            $k++;

            if ($data[$j]['t'] <> 3) // Waypoint
                $real_count++;
        }

        // Количество объектов на зоне
        $zonedata[$n]['count'] = $real_count;

        // Сортировка массивов по количеству объектов на зоне.
        for ($i = 0; $i <= $n; $i++) {
            for ($j = $i; $j <= $n; $j++) {
                if ($zonedata[$j]['count'] > $zonedata[$i]['count']) {
                    unset($tmp);
                    $tmp = $zonedata[$i];
                    $zonedata[$i] = $zonedata[$j];
                    $zonedata[$j] = $tmp;
                    unset($tmp);
                    $tmp = $exdata[$i];
                    $exdata[$i] = $exdata[$j];
                    $exdata[$j] = $tmp;
                }
            }
        }

        $smarty->assign('zonedata', $zonedata);
        $smarty->assign('exdata', $exdata);
    }

    return $zonedata;
}
