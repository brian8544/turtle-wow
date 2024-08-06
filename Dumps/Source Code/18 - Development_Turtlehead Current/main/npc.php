<?php

require_once('includes/allspells.php');
require_once('includes/allquests.php');
require_once('includes/allnpcs.php');
require_once('includes/allcomments.php');

global $smarty;
global $conf_file;
global $podrazdel;

$smarty->config_load($conf_file, 'npc');

global $DB;
global $spell_cols;
global $npc_cols;
global $item_cols;
global $hide_cow_stuff;

//page title
$id = $podrazdel;

// cow 91799
if ($id == 91799 && $hide_cow_stuff)
    $id = rand(1, 91798);

if (!$npc = load_cache(1, intval($id))) {
    unset($npc);
    // npcs
    $npc = array();
    $npc_cols[1] = array('subname', 'npc_flags', 'level_min', 'level_max', 'type', 'rank', 'health_min', 'health_max', 'equipment_id',
        'mana_min', 'mana_max', 'gold_min', 'gold_max', 'loot_id', /*'spell1', 'spell2', 'spell3', 'spell4',*/
        'faction', 'dmg_min', 'dmg_max', 'attack_power', 'dmg_multiplier', 'armor', 'holy_res', 'fire_res', 'nature_res', 'frost_res', 'shadow_res', 'arcane_res');
    $row = $DB->selectRow('
		SELECT
			?#, c.entry, c.name, A, H, dmg_min as mindmg, dmg_max as maxdmg,
			health_min as minhealth, health_max as maxhealth,
			spell_id1 as spell0,
			spell_id2 as spell1,
			spell_id3 as spell2,
			spell_id4 as spell3, display_id1,
			{
				l.name_loc' . $_SESSION['locale'] . ' as `name_loc`,
				l.subname_loc' . $_SESSION['locale'] . ' as `subname_loc`,
				?,
			}
			f.name_loc' . $_SESSION['locale'] . ' as `faction-name`, ft.factionID as `factionID`, wf.name1, c.faction as real_faction_id
		FROM ' . AOWOW . '.aowow_factiontemplate ft, ' . AOWOW . '.aowow_factions f, ' . WORLD . '.creature_template c
		LEFT JOIN ' . WORLD . '.faction_template ff on ff.id = c.faction
		LEFT JOIN ' . WORLD . '.faction wf on wf.id = ff.faction_id
		{
			LEFT JOIN (' . WORLD . '.locales_creature l)
			ON l.entry=c.entry AND ?
		}
		WHERE
			c.entry=?
			AND ft.factiontemplateID = c.faction
			AND ft.factionID = f.factionID
		LIMIT 1
			', $npc_cols[1], ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $id
    );

    if ($row) {

        $npc = $row;
        $npc['name'] = $row['name_loc'] ? $row['name_loc'] : $row['name'];
        $npc['subname'] = $row['subname_loc'] ? $row['subname_loc'] : $row['subname'];
        if ($npc['rank'] == 3) {
            $npc['minlevel'] = '??';
            $npc['maxlevel'] = '??';
        }
        $npc['mindmg'] = ($row['mindmg'] /* + $row['attackpower'] */) * $row['dmg_multiplier'];
        $npc['maxdmg'] = ($row['maxdmg'] /* + $row['attackpower'] */) * $row['dmg_multiplier'];

        $toDiv = array('minhealth', 'maxmana', 'minmana', 'maxhealth', 'armor', 'mindmg', 'maxdmg');
        // Разделяем на тысячи (ххххххххх => ххх,ххх,ххх)
        foreach ($toDiv as $element) {
            $current = array();
            $length = strlen($npc[$element]);
            if ($length <= 3)
                continue;
            $cell1 = $length % 3 > 0 ? $length % 3 : 3;
            $cell = $cell1;
            for ($i = 0; $i < $length / 3; $i++) {
                $pos = $i > 0 ? $cell1 + ($i > 1 ? ($i - 1) * 3 : 0) : 0;
                $current[] = substr($npc[$element], $pos, $cell);
                $cell = 3;
            }
            $npc[$element] = implode(',', $current);
        }

        $npc['rank'] = $smarty->get_config_vars('rank' . $npc['rank']);
        // FactionAlliance = FactionHorde
        $npc['faction_num'] = $row['factionID'];
//        $npc['faction'] = $row['faction-name'];
        $npc['faction'] = $row['name1'];
        $npc['real_faction_id'] = $row['real_faction_id'];
        // Деньги
        $money = ($row['gold_min'] + $row['gold_max']) / 2;
        $npc['moneygold'] = floor($money / 10000);
        $npc['moneysilver'] = floor(($money - ($npc['moneygold'] * 10000)) / 100);
        $npc['moneycopper'] = floor($money - ($npc['moneygold'] * 10000) - ($npc['moneysilver'] * 100));
        // Дроп
        $lootid = $row['loot_id'];


        // Используемые спеллы
        $npc['ablities'] = array();
        $tmp = array();
        for ($j = 0; $j <= 4; ++$j) {
            if ($row['spell' . $j] && !in_array($row['spell' . $j], $tmp)) {
                $tmp[] = $row['spell' . $j];
                if ($data = spellinfo($row['spell' . $j])) {
                    if ($data['name'])
                        $npc['abilities'][] = $data;
                }
            }
        }

        for ($j = 1; $j < 3; $j++) {
            $tmp2 = $DB->select('
				SELECT target_param?d
				FROM ' . WORLD . '.creature_ai_scripts
				WHERE
					id=?d
				', $j, $npc['entry'], $j
            );
            //AND action?d_type=11
            if ($tmp2)
                foreach ($tmp2 as $i => $tmp3)
                    if (!in_array($tmp2[$i]['action' . $j . '_param1'], $tmp)) {
                        $tmp[] = $tmp2[$i]['action' . $j . '_param1'];
                        if ($data = spellinfo($tmp2[$i]['action' . $j . '_param1'])) {
                            if ($data['name'])
                                $npc['abilities'][] = $data;
                        }
                    }
        }
        if (!$npc['ablities'])
            unset($npc['ablities']);
    }

    // Обучает:
    // Если это пет со способностью:
    $row = $DB->selectRow('
		SELECT Spell1, Spell2, Spell3, Spell4
		FROM ' . WORLD . '.petcreateinfo_spell
		WHERE
			entry=?d
		', $npc['entry']
    );
    if ($row) {
        $npc['teaches'] = array();
        for ($j = 1; $j <= 4; $j++)
            if ($row['Spell' . $j])
                for ($k = 1; $k <= 3; $k++) {
                    $spellrow = $DB->selectRow('
						SELECT ?#, spellID
						FROM ' . AOWOW . '.aowow_spell, ' . AOWOW . '.aowow_spellicons
						WHERE
							spellID=(SELECT effect' . $k . 'triggerspell FROM ' . AOWOW . '.aowow_spell WHERE spellID=?d AND (effect' . $k . 'id IN (36,57)))
							AND id=spellicon
						LIMIT 1
						', $spell_cols[2], $row['Spell' . $j]
                    );
                    if ($spellrow) {
                        $num = count($npc['teaches']);
                        $npc['teaches'][$num] = array();
                        $npc['teaches'][$num] = spellinfo2($spellrow);
                    }
                }
    }
    unset($row);

    $teachspells = $DB->select('
		SELECT ?#, spellID
		FROM ' . WORLD . '.npc_trainer, ' . AOWOW . '.aowow_spell, ' . AOWOW . '.aowow_spellicons
		WHERE
			entry=?d
			AND spellID=Spell
			AND id=spellicon
		', $spell_cols[2], $npc['entry']
    );
    if ($teachspells) {
        if (!(isset($npc['teaches'])))
            $npc['teaches'] = array();
        foreach ($teachspells as $teachspell) {
            $num = count($npc['teaches']);
            $npc['teaches'][$num] = array();
            $npc['teaches'][$num] = spellinfo2($teachspell);
        }
    }
    unset($teachspells);

    // sells
    $rows_s = $DB->select('
		SELECT ?#, i.entry, i.max_count, n.`maxcount` as `drop-maxcount`
			{, l.name_loc?d AS `name_loc`}
		FROM ' . WORLD . '.npc_vendor n, ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template i
			{LEFT JOIN (' . WORLD . '.locales_item l) ON l.entry=i.entry AND ?d}
		WHERE
			n.entry=?
			AND i.entry=n.item
			AND id=i.display_id
		', $item_cols[2], ($_SESSION['locale']) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale']) ? 1 : DBSIMPLE_SKIP, $id
    );
    if ($rows_s) {
        $npc['sells'] = array();
        foreach ($rows_s as $numRow => $row) {
            $npc['sells'][$numRow] = array();
            $npc['sells'][$numRow] = iteminfo2($row);
            $npc['sells'][$numRow]['maxcount'] = $row['drop-maxcount'];
            $npc['sells'][$numRow]['cost'] = array();
            /* if ($row['ExtendedCost']) [NOTE] overwrite with honor points? 
              {
              $extcost = $DB->selectRow('SELECT * FROM ?_aowow_item_extended_cost WHERE extendedcostID=?d LIMIT 1', $row['ExtendedCost']);
              if ($extcost['reqhonorpoints']>0)
              $npc['sells'][$numRow]['cost']['honor'] = (($npc['A']==1)? 1: -1) * $extcost['reqhonorpoints'];
              if ($extcost['reqarenapoints']>0)
              $npc['sells'][$numRow]['cost']['arena'] = $extcost['reqarenapoints'];
              $npc['sells'][$numRow]['cost']['items'] = array();
              for ($j=1;$j<=5;$j++)
              if (($extcost['reqitem'.$j]>0) and ($extcost['reqitemcount'.$j]>0))
              {
              allitemsinfo($extcost['reqitem'.$j], 0);
              $npc['sells'][$numRow]['cost']['items'][] = array('item' => $extcost['reqitem'.$j], 'count' => $extcost['reqitemcount'.$j]);
              }
              } */
            if ($row['buy_price'] > 0)
                $npc['sells'][$numRow]['cost']['money'] = $row['buy_price'];
        }
        unset($row);
        unset($numRow);
        unset($extcost);
    }
    unset($rows_s);

    // drop
    if (!($npc['drop'] = loot(WORLD . '.creature_loot_template', $lootid)))
        unset($npc['drop']);

    if ($id == 2442 && $hide_cow_stuff)
        unset($npc['drop']);

    // leather
    if (!($npc['skinning'] = loot(WORLD . '.skinning_loot_template', $lootid)))
        unset($npc['skinning']);

    // pickpocketing
    if (!($npc['pickpocketing'] = loot(WORLD . '.pickpocketing_loot_template', $lootid)))
        unset($npc['pickpocketing']);

    // begin quest
    $quest_cols[2] = array('id', 'Title', 'QuestLevel', 'MinLevel', 'RequiredRaces', 'RewChoiceItemId1', 'RewChoiceItemId2', 'RewChoiceItemId3', 'RewChoiceItemId4', 'RewChoiceItemId5', 'RewChoiceItemId6', 'RewChoiceItemCount1', 'RewChoiceItemCount2', 'RewChoiceItemCount3', 'RewChoiceItemCount4', 'RewChoiceItemCount5', 'RewChoiceItemCount6', 'RewItemId1', 'RewItemId2', 'RewItemId3', 'RewItemId4', 'RewItemCount1', 'RewItemCount2', 'RewItemCount3', 'RewItemCount4', 'RewMoneyMaxLevel', 'RewOrReqMoney', 'Type', 'ZoneOrSort', 'QuestFlags');
    $rows_qs = $DB->select('
		SELECT c.?# ,q.entry as id
		FROM ' . WORLD . '.creature_questrelation c, ' . WORLD . '.quest_template q
		WHERE
			c.id=?
			AND q.entry=c.quest
		', $quest_cols[2], $id
    );

    if ($rows_qs) {
        $npc['starts'] = array();
        foreach ($rows_qs as $numRow => $row) {
            $npc['starts'][] = GetQuestInfo($row, 0xFFFFFF);
        }
    }
    unset($rows_qs);

    // finish quest
    $rows_qe = $DB->select('
		SELECT c.?# ,q.entry as id
		FROM ' . WORLD . '.creature_involvedrelation c, ' . WORLD . '.quest_template q
		WHERE
			c.id=?
			AND q.entry=c.quest
		', $quest_cols[2], $id
    );
    if ($rows_qe) {
        $npc['ends'] = array();
        foreach ($rows_qe as $numRow => $row) {
            $npc['ends'][] = GetQuestInfo($row, 0xFFFFFF);
        }
    }
    unset($rows_qe);

    if ($id == 91798 && $hide_cow_stuff)
        unset($npc['ends']);

    // required for quest
    $quest_cols_temp_2 = array('entry', 'Title', 'QuestLevel', 'MinLevel', 'RequiredRaces', 'RewChoiceItemId1', 'RewChoiceItemId2', 'RewChoiceItemId3', 'RewChoiceItemId4', 'RewChoiceItemId5', 'RewChoiceItemId6', 'RewChoiceItemCount1', 'RewChoiceItemCount2', 'RewChoiceItemCount3', 'RewChoiceItemCount4', 'RewChoiceItemCount5', 'RewChoiceItemCount6', 'RewItemId1', 'RewItemId2', 'RewItemId3', 'RewItemId4', 'RewItemCount1', 'RewItemCount2', 'RewItemCount3', 'RewItemCount4', 'RewMoneyMaxLevel', 'RewOrReqMoney', 'Type', 'ZoneOrSort', 'QuestFlags');
    $rows_qo = $DB->select('
		SELECT ?# , entry as id
		FROM ' . WORLD . '.quest_template
		WHERE
			(ReqCreatureOrGOId1=?
			OR ReqCreatureOrGOId2=?
			OR ReqCreatureOrGOId3=?
			OR ReqCreatureOrGOId4=?)
		', $quest_cols_temp_2, $id, $id, $id, $id
    );
    if ($rows_qo) {
        $npc['objectiveof'] = array();
        foreach ($rows_qo as $numRow => $row) {
            $npc['objectiveof'][] = GetQuestInfo($row, 0xFFFFFF);
        }
    }
    unset($rows_qo);

    // Положения созданий божих:
    position($npc['entry'], 'creature');
    save_cache(1, $npc['entry'], $npc);
}


global $page;
$page = array(
    'Mapper' => true,
    'Book' => false,
    'Title' => $npc['name'] . ' - ' . $smarty->get_config_vars('NPCs'),
    'tab' => 0,
    'type' => 1,
    'typeid' => $npc['entry'],
    'path' => '[0,4,' . $npc['type'] . ']'
);

$smarty->assign('page', $page);

// Комментарии
$smarty->assign('comments', getcomments($page['type'], $page['typeid']));

// Если хоть одна информация о вещи найдена - передаём массив с информацией о вещях шаблонизатору
if (isset($allitems))
    $smarty->assign('allitems', $allitems);
if (isset($allspells))
    $smarty->assign('allspells', $allspells);

$smarty->assign('npc', $npc);

// Количество MySQL запросов
$smarty->assign('mysql', $DB->getStatistics());

// Запускаем шаблонизатор
$smarty->display('npc.tpl');
