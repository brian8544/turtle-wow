<?php

require_once('includes/game.php');
require_once('includes/allspells.php');
require_once('includes/allquests.php');
require_once('includes/allitems.php');
require_once('includes/allnpcs.php');
require_once('includes/allobjects.php');
require_once('includes/allcomments.php');

global $smarty;
global $conf_file;
global $podrazdel;
global $npc_cols;

// Загружаем файл перевода для smarty
$smarty->config_load($conf_file, 'item');

global $hide_cow_stuff;

$id = $podrazdel;

$cow_items = [60486, 51261, 60485, 60491, 60487, 60488, 60489, 60490, 60149,60150];

if (in_array($id, $cow_items) && $hide_cow_stuff)
    $id = rand(1, 50000);

if (!$item = load_cache(5, $id)) {
    unset($item);

    global $DB;

    global $allitems;
    global $allspells;

    global $item_cols;
    global $spell_cols;

    // Информация о вещи...
    $item = iteminfo($podrazdel, 1);

    // Поиск мобов с которых эта вещь лутится
    $drops_cr = drop(WORLD . '.creature_loot_template', $item['entry']);

    if ($drops_cr) {
        $item['droppedby'] = array();
        foreach ($drops_cr as $lootid => $drop) {
            $rows = $DB->select('
				SELECT c.?#, c.entry, A, H
				{
					, l.name_loc?d as `name_loc`
					, l.subname_loc' . $_SESSION['locale'] . ' as `subname_loc`
				}
				FROM ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
				{ LEFT JOIN (' . WORLD . '.locales_creature l) ON l.entry=c.entry AND ? }
				WHERE
					loot_id=?d 
					AND factiontemplateID=faction
					group by c.entry
				', $npc_cols[0], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $lootid
            );

//            AND factiontemplateID=FactionAlliance
            foreach ($rows as $numRow => $row)
                $item['droppedby'][] = array_merge(creatureinfo2($row), $drop);

        }
        unset($rows);
        unset($lootid);
        unset($drop);
    }
    unset($drops_cr);

    $drops_rf = drop(WORLD . '.reference_loot_template', $item['entry']);

    if ($drops_rf) {
        foreach ($drops_rf as $refid => $drop) {
            $lrows = $DB->select('SELECT entry,ChanceOrQuestChance FROM ' . WORLD . '.creature_loot_template WHERE mincountOrRef = -?d', $refid);
            foreach ($lrows as $numRow => $lrow) {

                $loot = loot(WORLD . '.creature_loot_template', $lrow['entry']);

                foreach ($loot as $info => $value) {
                    if ($value['entry'] == $item['entry'])
                        $drop['percent'] = $value['percent'];
                }

                $rows = $DB->select('
					SELECT c.?#, c.entry
					{
						, l.name_loc?d as `name_loc`
						, l.subname_loc' . $_SESSION['locale'] . ' as `subname_loc`
					}
					FROM ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
					{ LEFT JOIN (' . WORLD . '.locales_creature l) ON l.entry=c.entry AND ? }
					WHERE
                        c.loot_id = ?d
                        and factiontemplateID = faction
						group by c.entry
					', $npc_cols[0], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $lrow['entry']
                );

                //AND factiontemplateID=FactionAlliance
                foreach ($rows as $numRow2 => $row)
                    $item['droppedby'][] = array_merge(creatureinfo2($row), $drop);
            }
        }
        unset($rows);
        unset($refid);
        unset($drop);
    }
    unset($drops_rf);

    // Поиск объектов, из которых лутится эта вещь
    $drops_go = drop('' . WORLD . '.gameobject_loot_template', $item['entry']);
    if ($drops_go) {
        $item['containedinobject'] = array();
        $item['minedfromobject'] = array();
        $item['gatheredfromobject'] = array();
        foreach ($drops_go as $lootid => $drop) {
            // Сундуки
            $rows = $DB->select('
				SELECT g.entry, g.name, g.type, a.lockproperties1
				FROM ' . WORLD . '.gameobject_template g, ' . AOWOW . '.aowow_lock a
				WHERE
					g.data1=?d
					AND g.type=?d
					AND a.lockID=g.data0
				', $lootid, GAMEOBJECT_TYPE_CHEST, LOCK_PROPERTIES_HERBALISM, LOCK_PROPERTIES_MINING
            );
            foreach ($rows as $numRow => $row) {
                if ($row['lockproperties1'] == LOCK_PROPERTIES_MINING) {
                    // Залежи руды
                    $item['minedfromobject'][] = array_merge(objectinfo2($row), $drop);
                } elseif ($row['lockproperties1'] == LOCK_PROPERTIES_HERBALISM) {
                    // Собирается с трав
                    $item['gatheredfromobject'][] = array_merge(objectinfo2($row), $drop);
                } else {
                    // Сундуки
                    $item['containedinobject'][] = array_merge(objectinfo2($row), $drop);
                }
            }
        }

        if (!($item['containedinobject']))
            unset($item['containedinobject']);
        if (!($item['minedfromobject']))
            unset($item['minedfromobject']);
        if (!($item['gatheredfromobject']))
            unset($item['gatheredfromobject']);

        unset($rows);
    }
    unset($drops_go);

    // Search Vender that sell this thing
    $rows_soldby = $DB->select('
		SELECT ?#, c.entry, v.maxcount AS stock, A, H
		{
			, l.name_loc?d as `name_loc`
			, l.subname_loc' . $_SESSION['locale'] . ' as `subname_loc`
		}
		FROM ' . WORLD . '.npc_vendor v, ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
		{ LEFT JOIN (' . WORLD . '.locales_creature l) ON l.entry=c.entry AND ? }
		WHERE
			v.item=?d
			AND c.entry=v.entry
			AND factiontemplateID = faction
		GROUP BY c.entry	
		ORDER BY 1 DESC, 2 DESC
		', $npc_cols['0'], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $item['entry']
    );

    //AND
    if ($rows_soldby) {
        $item['soldby'] = array();
        foreach ($rows_soldby as $numRow => $row) {
            $item['soldby'][$numRow] = array();
            $item['soldby'][$numRow] = creatureinfo2($row);
            $item['soldby'][$numRow]['stock'] = ($row['stock'] == 0) ? -1 : $row['stock'];
            /* [NOTE] implement for honor cost
              if ($row['ExtendedCost'])
              {
              $item['soldby'][$numRow]['cost'] = array();
              $extcost = $DB->selectRow('SELECT * FROM ' . WORLD . '.aowow_item_extended_cost WHERE extendedcostID=?d LIMIT 1', $row['ExtendedCost']);
              if ($extcost['reqhonorpoints']>0)
              $item['soldby'][$numRow]['cost']['honor'] = (($row['A']==1)? 1: -1) * $extcost['reqhonorpoints'];
              if ($extcost['reqarenapoints']>0)
              $item['soldby'][$numRow]['cost']['arena'] = $extcost['reqarenapoints'];
              $item['soldby'][$numRow]['cost']['items'] = array();
              for ($j=1;$j<=5;$j++)
              if (($extcost['reqitem'.$j]>0) and ($extcost['reqitemcount'.$j]>0))
              {
              allitemsinfo($extcost['reqitem'.$j], 0);
              $item['soldby'][$numRow]['cost']['items'][] = array('item' => $extcost['reqitem'.$j], 'count' => $extcost['reqitemcount'.$j]);
              }
              } else { */
            $item['soldby'][$numRow]['cost']['money'] = $item['buy_price'];
            //}
        }
        unset($extcost);
        unset($numRow);
        unset($row);
    }
    unset($rows_soldby);

    // Search for quests that require this item to complete
    $quest_cols_temp_2 = array('entry', 'Title', 'QuestLevel', 'MinLevel', 'RequiredRaces', 'RewChoiceItemId1', 'RewChoiceItemId2', 'RewChoiceItemId3', 'RewChoiceItemId4', 'RewChoiceItemId5', 'RewChoiceItemId6', 'RewChoiceItemCount1', 'RewChoiceItemCount2', 'RewChoiceItemCount3', 'RewChoiceItemCount4', 'RewChoiceItemCount5', 'RewChoiceItemCount6', 'RewItemId1', 'RewItemId2', 'RewItemId3', 'RewItemId4', 'RewItemCount1', 'RewItemCount2', 'RewItemCount3', 'RewItemCount4', 'RewMoneyMaxLevel', 'RewOrReqMoney', 'Type', 'ZoneOrSort', 'QuestFlags');
    $rows_qr = $DB->select('
		SELECT ?# , entry as id
		FROM ' . WORLD . '.quest_template
		WHERE
			ReqItemId1=?d
			OR ReqItemId2=?d
			OR ReqItemId3=?d
			OR ReqItemId4=?d
		', $quest_cols_temp_2, $item['entry'], $item['entry'], $item['entry'], $item['entry']
    );
    if ($rows_qr) {
        $item['objectiveof'] = array();
        foreach ($rows_qr as $numRow => $row)
            $item['objectiveof'][] = GetQuestInfo($row, 0xFFFFFF);
    }
    unset($rows_qr);

    if (($id == 9359 or $id == 13009) && $hide_cow_stuff) {
        unset($item['objectiveof']);
    }

    // Finding quests that reward this item
    $quest_cols_temp_2 = array('entry', 'Title', 'QuestLevel', 'MinLevel', 'RequiredRaces', 'RewChoiceItemId1', 'RewChoiceItemId2', 'RewChoiceItemId3', 'RewChoiceItemId4', 'RewChoiceItemId5', 'RewChoiceItemId6', 'RewChoiceItemCount1', 'RewChoiceItemCount2', 'RewChoiceItemCount3', 'RewChoiceItemCount4', 'RewChoiceItemCount5', 'RewChoiceItemCount6', 'RewItemId1', 'RewItemId2', 'RewItemId3', 'RewItemId4', 'RewItemCount1', 'RewItemCount2', 'RewItemCount3', 'RewItemCount4', 'RewMoneyMaxLevel', 'RewOrReqMoney', 'Type', 'ZoneOrSort', 'QuestFlags');
    $rows_qrw = $DB->select('
		SELECT ?#, entry as id
		FROM ' . WORLD . '.quest_template
		WHERE
			RewItemId1=?d
			OR RewItemId2=?d
			OR RewItemId3=?d
			OR RewItemId4=?d
			OR RewChoiceItemId1=?d
			OR RewChoiceItemId2=?d
			OR RewChoiceItemId3=?d
			OR RewChoiceItemId4=?d
			OR RewChoiceItemId5=?d
			OR RewChoiceItemId6=?d
		', $quest_cols_temp_2, $item['entry'], $item['entry'], $item['entry'], $item['entry'], $item['entry'], $item['entry'], $item['entry'], $item['entry'], $item['entry'], $item['entry']
    );
    if ($rows_qrw) {
        $item['rewardof'] = array();
        foreach ($rows_qrw as $numRow => $row)
            $item['rewardof'][] = GetQuestInfo($row, 0xFFFFFF);
    }
    unset($rows_qrw);

    // Finding the things that these things are in
    $drops_cii = drop('' . WORLD . '.item_loot_template', $item['entry']);
    if ($drops_cii) {
        $item['containedinitem'] = array();
        foreach ($drops_cii as $lootid => $drop) {
            $rows = $DB->select('
				SELECT c.?#, c.entry, max_count
				{ , l.name_loc?d AS `name_loc`} , display_id, allowable_race
				FROM ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template c
				{ LEFT JOIN (' . WORLD . '.locales_item l) ON l.entry=c.entry AND ? }
				WHERE
					c.entry=?d
					AND id=display_id
				', $item_cols[2], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $lootid
            );
            foreach ($rows as $numRow => $row)
                $item['containedinitem'][] = array_merge(iteminfo2($row, 0), $drop);
        }
        unset($drops_cii);
        unset($rows);
        unset($lootid);
        unset($drop);
    }

    // What things are contained in this thing
    if (!($item['contains'] = loot('' . WORLD . '.item_loot_template', $item['entry'])))
        unset($item['contains']);

    // Search for creatures from which a thing is stolen
    $drops_pp = drop('' . WORLD . '.pickpocketing_loot_template', $item['entry']);
    if ($drops_pp) {
        $item['pickpocketingloot'] = array();
        foreach ($drops_pp as $lootid => $drop) {
            $rows = $DB->select('
				SELECT c.?#, c.entry
				{
					, l.name_loc?d as `name_loc`
					, l.subname_loc' . $_SESSION['locale'] . ' as `subname_loc`
				}
				FROM ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
				{ LEFT JOIN (' . WORLD . '.locales_creature l) ON l.entry=c.entry AND ? }
				WHERE
					pickpocket_loot_id=?d
                group by c.entry
				', $npc_cols[0], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $lootid
            );
            //AND factiontemplateID=FactionAlliance
            foreach ($rows as $numRow => $row)
                $item['pickpocketingloot'][] = array_merge(creatureinfo2($row), $drop);
        }
        unset($rows);
        unset($lootid);
        unset($drop);
    }
    unset($drops_pp);

    // skinning
    $drops_sk = drop( WORLD . '.skinning_loot_template', $item['entry']);
    if ($drops_sk) {
        $item['skinnedfrom'] = array();
        foreach ($drops_sk as $lootid => $drop) {
            $rows = $DB->select('
				SELECT c.?#, c.entry
				{
					, l.name_loc?d as `name_loc`
					, l.subname_loc' . $_SESSION['locale'] . ' as `subname_loc`
				}
				FROM ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
				{ LEFT JOIN (' . WORLD . '.locales_creature l) ON l.entry=c.entry AND ? }
				WHERE
					skinning_loot_id=?d
				group by c.entry	
				', $npc_cols[0], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $lootid
            );
            //AND factiontemplateID=FactionAlliance
            foreach ($rows as $numRow => $row)
                $item['skinnedfrom'][] = array_merge(creatureinfo2($row), $drop);
        }
        unset($rows);
        unset($lootid);
        unset($drop);
    }
    unset($drops_sk);

    // DE
    if (!($item['disenchanting'] = loot(WORLD . '.disenchant_loot_template', $item['DisenchantID'])))
        unset($item['disenchanting']);

    // DE
    $drops_de = drop(WORLD . '.disenchant_loot_template', $item['entry']);
    if ($drops_de) {
        $item['disenchantedfrom'] = array();
        $item_cols[2] = array('name', 'quality', 'iconname', 'inventory_type', 'item_level', 'required_level', 'class',
            'subclass', 'stackable', 'buy_price', 'armor', 'dmg_type1', 'dmg_min1', 'dmg_max1', 'delay',
            'dmg_type2', 'dmg_min2', 'dmg_max2', 'dmg_type3', 'dmg_min3', 'dmg_max3', 'dmg_type4', 'dmg_min4',
            'dmg_max4', 'dmg_type5', 'dmg_min5', 'dmg_max5', 'container_slots');
        foreach ($drops_de as $lootid => $drop) {
            $rows = $DB->select('
				SELECT c.?#, c.entry, max_count, max_count as maxcount
				{
					, l.name_loc?d as `name_loc`
				} , display_id, allowable_race
				FROM ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template c
				{ LEFT JOIN (' . WORLD . '.locales_item l) ON l.entry=c.entry AND ? }
				WHERE
					disenchant_id = ?d
					AND id=display_id
				', $item_cols[2], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $lootid
            );
            foreach ($rows as $numRow => $row)
                $item['disenchantedfrom'][] = array_merge(iteminfo2($row, 0), $drop);
        }
        unset($rows);
        unset($lootid);
        unset($drop);
    }
    unset($drops_de);

    // Search for bags in which this thing can be put
    if ($item['BagFamily'] == 256) {
        // Если это ключ
        $item['key'] = true;
    } elseif ($item['bag_family'] > 0 and $item['container_slots'] == 0) {
        $rows_cpi = $DB->select('
			SELECT c.?#, c.entry, max_count
			{
				, l.name_loc?d as `name_loc`
			}, display_id, allowable_race
			FROM ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template c
			{ LEFT JOIN (' . WORLD . '.locales_item l) ON l.entry=c.entry AND ? }
			WHERE
				bag_family=?d
				AND container_slots>0
				AND id=display_id
			', $item_cols[2], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $item['BagFamily']
        );
        if ($rows_cpi) {
            $item['canbeplacedin'] = array();
            foreach ($rows_cpi as $numRow => $row)
                $item['canbeplacedin'][] = iteminfo2($row, 0);
        }
        unset($rows_cpi);
    }

    // Reagent for ...
    $rows_r = $DB->select('
		SELECT ?#, spellID
		FROM ' . AOWOW . '.aowow_spell s, ' . AOWOW . '.aowow_spellicons i
		WHERE
			(( reagent1=?d
			OR reagent2=?d
			OR reagent3=?d
			OR reagent4=?d
			OR reagent5=?d
			OR reagent6=?d
			OR reagent7=?d
			OR reagent8=?d
			) AND ( i.id=s.spellicon))
		', $spell_cols[2], $item['entry'], $item['entry'], $item['entry'], $item['entry'], $item['entry'], $item['entry'], $item['entry'], $item['entry']
    );
    if ($rows_r) {
        $item['reagentfor'] = array();
        $quality = 1;
        foreach ($rows_r as $numRow => $row) {
            $item['reagentfor'][$numRow] = array();
            $item['reagentfor'][$numRow]['entry'] = $row['spellID'];
            $item['reagentfor'][$numRow]['name'] = $row['spellname_loc' . $_SESSION['locale']];
            $item['reagentfor'][$numRow]['school'] = $row['resistancesID'];
            $item['reagentfor'][$numRow]['level'] = $row['levelspell'];
            $item['reagentfor'][$numRow]['quality'] = '@';
            for ($j = 1; $j <= 8; $j++)
                if ($row['reagent' . $j]) {
                    $item['reagentfor'][$numRow]['reagents'][]['entry'] = $row['reagent' . $j];
                    $item['reagentfor'][$numRow]['reagents'][count($item['reagentfor'][$numRow]['reagents']) - 1]['count'] = $row['reagentcount' . $j];
                    allitemsinfo($row['reagent' . $j], 0);
                }
            for ($j = 1; $j <= 3; $j++)
                if ($row['effect' . $j . 'itemtype']) {
                    $item['reagentfor'][$numRow]['creates'][]['entry'] = $row['effect' . $j . 'itemtype'];
                    $item['reagentfor'][$numRow]['creates'][count($item['reagentfor'][$numRow]['creates']) - 1]['count'] = 1 + $row['effect' . $j . 'BasePoints'];
                    allitemsinfo($row['effect' . $j . 'itemtype'], 0);
                    @$item['reagentfor'][$numRow]['quality'] = 6 - $allitems[$row['effect' . $j . 'itemtype']]['quality'];
                }
            // Добавляем в таблицу спеллов
            allspellsinfo2($row);
        }
        unset($quality);
    }
    unset($rows_r);

    // Created from ...
    $rows_cf = $DB->select('
		SELECT ?#, s.spellID
		FROM ' . AOWOW . '.aowow_spell s, ' . AOWOW . '.aowow_spellicons i
		WHERE
			((s.effect1itemtype=?d
			OR s.effect2itemtype=?d
			OR s.effect3itemtype=?)
			AND (i.id = s.spellicon))
		', $spell_cols[2], $item['entry'], $item['entry'], $item['entry']
    );
    if ($rows_cf) {
        $item['createdfrom'] = array();
        foreach ($rows_cf as $numRow => $row) {
            $skillrow = $DB->selectRow('
				SELECT skillID, min_value, max_value
				FROM ' . AOWOW . '.aowow_skill_line_ability
				WHERE spellID=?d
				LIMIT 1', $row['spellID']
            );
            $merged = array_merge($row, $skillrow);
            $item['createdfrom'][] = spellinfo2($merged);
        }
        unset($skillrow);
    }
    unset($rows_cf);

    // fished from
    $drops_fi = drop(WORLD . '.fishing_loot_template', $item['entry']);
    if ($drops_fi) {
        $item['fishedin'] = array();
        foreach ($drops_fi as $lootid => $drop) {
            // Обычные локации
            $row = $DB->selectRow('
				SELECT name_loc' . $_SESSION['locale'] . ' AS name, areatableID as id
				FROM ' . AOWOW . '.aowow_zones
				WHERE
					areatableID=?d
					AND (x_min!=0 AND x_max!=0 AND y_min!=0 AND y_max!=0)
				LIMIT 1
				', $lootid
            );
            if ($row) {
                $item['fishedin'][] = array_merge($row, $drop);
            } else {
                // Инсты
                $row = $DB->selectRow('
					SELECT name_loc' . $_SESSION['locale'] . ' AS name, mapID as id
					FROM ' . AOWOW . '.aowow_zones
					WHERE
						areatableID=?d
					LIMIT 1
					', $lootid
                );
                if ($row)
                    $item['fishedin'][] = array_merge($row, $drop);
            }
        }
        unset($row);
        unset($num);
    }
    unset($drops_fi);

    save_cache(5, $item['entry'], $item);
}

global $page;
$page = array(
    'Mapper' => false,
    'Book' => false,
    'Title' => $item['name'] . ' - ' . $smarty->get_config_vars('Items'),
    'tab' => 0,
    'type' => 3,
    'typeid' => $item['entry'],
    'path' => '[0,0,' . $item['classs'] . ',' . $item['subclass'] . ']',
);
$smarty->assign('page', $page);

$item['name'] = str_replace("'", "\'", $item['name']);

// Комментарии
$smarty->assign('comments', getcomments($page['type'], $page['typeid']));

// Количество MySQL запросов
$smarty->assign('mysql', $DB->getStatistics());
if (isset($allitems))
    $smarty->assign('allitems', $allitems);
if (isset($allspells))
    $smarty->assign('allspells', $allspells);
$smarty->assign('item', $item);
$smarty->display('item.tpl');
