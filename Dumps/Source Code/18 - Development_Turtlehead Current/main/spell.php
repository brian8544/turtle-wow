<?php

global $smarty;
global $conf_file;
global $podrazdel;
global $item_cols;
global $quest_cols;

require_once('includes/allspells.php');
require_once('includes/allnpcs.php');
require_once('includes/allquests.php');
require_once('includes/allcomments.php');

$smarty->config_load($conf_file, 'spell');

// номер спелла;
$id = $podrazdel;

if (!$spell = load_cache(13, intval($id))) {
    unset($spell);

    // БД
    global $DB;
    // Таблица спеллов
    global $allspells;
    // Таблица вещей
    global $allitems;

    global $npc_cols;

    // Данные об спелле:
    $row = $DB->selectRow('
		SELECT s.*, i.iconname
		FROM ' . AOWOW . '.aowow_spell s, ' . AOWOW . '.aowow_spellicons i
		WHERE
			s.spellID=?
			AND i.id = s.spellicon
		', $id
    );


    if ($row) {
        $spell = array();
        // Номер спелла
        $spell['entry'] = $row['spellID'];
        // Имя спелла
        $spell['name'] = $row['spellname_loc' . $_SESSION['locale']];
        // Иконка спелла
        //$spell['icon'] = $row['iconname'];
        // Затраты маны на сспелл
        if ($row['manacost'])
            $spell['manacost'] = $row['manacost'];
        elseif ($row['manacostpercent'])
            $spell['manacost'] = $row['manacostpercent'] . '% ' . $smarty->get_config_vars('of_base');
        // Уровень спелла
        $spell['level'] = $row['levelspell'];
        // Дальность
        $RangeRow = $DB->selectRow('SELECT rangeMin, rangeMax, name_loc' . $_SESSION['locale'] . ' from ' . AOWOW . '.aowow_spellrange where rangeID=? limit 1', $row['rangeID']);
        $spell['range'] = '';
        if (($RangeRow['rangeMin'] != $RangeRow['rangeMax']) and ($RangeRow['rangeMin'] != 0))
            $spell['range'] = $RangeRow['rangeMin'] . '-';
        $spell['range'] .= $RangeRow['rangeMax'];
        $spell['rangename'] = $RangeRow['name_loc' . $_SESSION['locale']];
        // Время каста
        $casttime = $DB->selectCell('SELECT base from ' . AOWOW . '.aowow_spellcasttimes where id=? limit 1', $row['spellcasttimesID']);
        if ($casttime > 0)
            $spell['casttime'] = ($casttime / 1000) . ' ' . $smarty->get_config_vars('seconds');
        else if ($row['ChannelInterruptFlags'])
            $spell['casttime'] = 'Channeled';
        else
            $spell['casttime'] = 'Instant';
        // Cooldown
        if ($row['cooldown'] > 0)
            $spell['cooldown'] = $row['cooldown'] / 1000;

        if ($row['categoryCooldown'] > 0)
            $spell['categoryCooldown'] = $row['categoryCooldown'] / 1000;
        // Время действия спелла
        $duration = $DB->selectCell('SELECT durationBase FROM ' . AOWOW . '.aowow_spellduration WHERE durationID=?d LIMIT 1', $row['durationID']);
        if ($duration > 0)
            $spell['duration'] = ($duration / 1000) . ' ' . $smarty->get_config_vars('seconds');
        else
            $spell['duration'] = '<span class="q0">n/a</span>';
        // Школа спелла
        $spell['school'] = $DB->selectCell('SELECT name_loc' . $_SESSION['locale'] . ' FROM ' . AOWOW . '.aowow_resistances WHERE id=?d LIMIT 1', $row['resistancesID']);
        // Тип диспела
        if ($row['dispeltypeID'])
            $spell['dispel'] = $DB->selectCell('SELECT name_loc' . $_SESSION['locale'] . ' FROM ' . AOWOW . '.aowow_spelldispeltype WHERE id=?d LIMIT 1', $row['dispeltypeID']);
        // Механика спелла
        if ($row['mechanicID'])
            $spell['mechanic'] = $DB->selectCell('SELECT name_loc' . $_SESSION['locale'] . ' FROM ' . AOWOW . '.aowow_spellmechanic WHERE id=?d LIMIT 1', $row['mechanicID']);

        // Информация о спелле
        $spell['info'] = allspellsinfo2($row, 2);

        // Инструменты
        $spell['tools'] = array();
        $i = 0;
        for ($j = 1; $j <= 2; $j++) {
            if ($row['tool' . $j]) {
                $spell['tools'][$i] = array();
                // Имя инструмента
                $tool_row = $DB->selectRow('SELECT ?#, `quality` FROM ' . WORLD . '.item_template, ' . AOWOW . '.aowow_icons 
                WHERE entry=?d AND id=display_id LIMIT 1', $item_cols[0], $row['tool' . $j]);
                $spell['tools'][$i]['name'] = $tool_row['name'];
                $spell['tools'][$i]['quality'] = $tool_row['quality'];
                // ID инструмента
                $spell['tools'][$i]['entry'] = $row['tool' . $j];
                // Добавляем инструмент в таблицу вещей
                allitemsinfo2($tool_row, 0);
                $i++;
            }
        }


        // Реагенты
        $spell['reagents'] = array();
        $i = 0;
        for ($j = 1; $j <= 8; $j++) {
            if ($row['reagent' . $j]) {
                $spell['reagents'][$i] = array();
                // Имя реагента
                $reagentrow = $DB->selectRow('
					SELECT c.?#, name
					{ ,l.name_loc?d as `name_loc` }
					FROM ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template c
					{ LEFT JOIN (' . WORLD . '.locales_item l) ON l.entry=c.entry AND ? }
					WHERE
						c.entry=?d
						AND id=display_id
					LIMIT 1
					', $item_cols[0], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $row['reagent' . $j]
                );
                $spell['reagents'][$i]['name'] = !empty($reagentrow['name_loc']) ? $reagentrow['name_loc'] : $reagentrow['name'];
                $spell['reagents'][$i]['quality'] = $reagentrow['quality'];
                // ID реагента
                $spell['reagents'][$i]['entry'] = $row['reagent' . $j];
                // Количество реагентов
                $spell['reagents'][$i]['count'] = $row['reagentcount' . $j];
                // Добавляем реагент в таблицу вещей
                allitemsinfo2($reagentrow, 0);
                $i++;
            }
        }

        // Перебираем все эффекты:
        $i = 0;
        $spell['effect'] = array();
        // Btt - Buff TollTip
        if ($row['buff'])
            $spell['btt'] = spell_buff_render($row);
        for ($j = 1; $j <= 3; $j++) {
            if ($row['effect' . $j . 'id'] > 0) {
                // Название эффекта
                $spell['effect'][$i]['name'] = $spell_effect_names[$row['effect' . $j . 'id']];
                $spell['effect'][$i]['id'] = $row['effect' . $j . 'id'];
                // Доп информация в имени
                if ($row['effect' . $j . 'MiscValue']) {
                    switch ($row['effect' . $j . 'id']) {
                        // effect object creation, create information about him
                        case 50: // "Summon Object"				// 103 spells, OK
                        case 76: // "Summon Object (Wild)"		// 173 spells, OK
                            //case 86: // "Activate Object"			// 175 spells; wrong GOs, tiny ID; skipping
                        case 104:
                        { // "Summon Object (slot 1)"	// 24 spells - traps, OK
                            //case 105: // "Summon Object (slot 2)"	// 2 spells: 22996, 23005; wrong GOs; skipping
                            //case 106: // "Summon Object (slot 3)"	// 0 spells; skipping
                            //case 107: // "Summon Object (slot 4)"	// 0 spells; skipping
                            $spell['effect'][$i]['object'] = array();
                            $spell['effect'][$i]['object']['entry'] = $row['effect' . $j . 'MiscValue'];
                            $spell['effect'][$i]['object']['name'] = $DB->selectCell("SELECT name FROM " . WORLD . ".gameobject_template WHERE entry=? LIMIT 1",
                                    $spell['effect'][$i]['object']['entry']) . ' (' . $spell['effect'][$i]['object']['entry'] . ')';
                            break;
                        }
                        // скиллы
                        case 118:
                        {// "Require Skill"
                            $spell['effect'][$i]['name'] .= ' (' . $DB->selectCell('SELECT name_loc0 FROM ' . AOWOW . '.aowow_skill WHERE skillID=? LIMIT 1', $row['effect' . $j . 'MiscValue']) . ')';
                            break;
                        }
                        // ауры
                        case 6:
                        {
                            break;
                        }
                        // тотемы
                        case 75: // "Summon Totem"
                        case 87: // "Summon Totem (slot 1)"
                        case 88: // "Summon Totem (slot 2)"
                        case 89: // "Summon Totem (slot 3)"
                        case 90:
                        { // "Summon Totem (slot 4)"
                            $spell['effect'][$i]['name'] .= ' (<a href="?npc=' . $row['effect' . $j . 'MiscValue'] . '">' . $row['effect' . $j . 'MiscValue'] . '</a>)';
                            break;
                        }
                        default:
                        {
                            $spell['effect'][$i]['name'] .= ' (' . $row['effect' . $j . 'MiscValue'] . ')';
                        }
                    }
                }
                // Если просто урон школой - добавляем подпись школы
                if ($row['effect' . $j . 'id'] == 2 && $spell['school'])
                    $spell['effect'][$i]['name'] .= ' (' . $spell['school'] . ')';
                // Радиус действия эффекта
                if ($row['effect' . $j . 'radius'])
                    $spell['effect'][$i]['radius'] = $DB->selectCell("SELECT radiusbase from " . AOWOW . ".aowow_spellradius where radiusID=? limit 1", $row['effect' . $j . 'radius']);
                // Значение спелла (урон)
                if ($row['effect' . $j . 'BasePoints'] && !$row['effect' . $j . 'itemtype'])
                    $spell['effect'][$i]['value'] = $row['effect' . $j . 'BasePoints'] + 1;
                // Интервал действия спелла
                if ($row['effect' . $j . 'Amplitude'] > 0)
                    $spell['effect'][$i]['interval'] = $row['effect' . $j . 'Amplitude'] / 1000;
                // Название ауры:
                if ($row['effect' . $j . 'Aura'] > 0 && isset($spell_aura_names[$row['effect' . $j . 'Aura']]))
                    switch ($row['effect' . $j . 'Aura']) {
                        case 78: // "Mounted" - приписываем ссылку на нпс
                        case 56:
                        { // "Transform"
                            $spell['effect'][$i]['name'] .= ': ' . $spell_aura_names[$row['effect' . $j . 'Aura']] . ' (<a href="?npc=' . $row['effect' . $j . 'MiscValue'] . '">' . $row['effect' . $j . 'MiscValue'] . '</a>)';
                            break;
                        }
                        default:
                        {
                            $spell['effect'][$i]['name'] .= ' #' . $row['effect'.$j.'Aura'] . ': ' . $spell_aura_names[$row['effect' . $j . 'Aura']];
                            if ($row['effect' . $j . 'MiscValue'] > 0)
                                $spell['effect'][$i]['name'] .= ' (' . $row['effect' . $j . 'MiscValue'] . ')';
                        }
                    }
                elseif ($row['effect' . $j . 'Aura'] > 0)
                    $spell['effect'][$i]['name'] .= ': Unknown_Aura(' . $row['effect' . $j . 'Aura'] . ')';
                // Создает вещь:
                if (($row['effect' . $j . 'id'] == 24)) {
                    $spell['effect'][$i]['item'] = array();
                    $spell['effect'][$i]['item']['entry'] = $row['effect' . $j . 'itemtype'];
                    $tmpRow = $DB->selectRow('
							SELECT c.?#, name
							{ ,l.name_loc?d as `name_loc` }
							FROM ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template c
							{ LEFT JOIN (' . WORLD . '.locales_item l) ON l.entry=c.entry AND ? }
							WHERE
								c.entry=?d
								AND id=display_id
							LIMIT 1
						', $item_cols[0], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $spell['effect'][$i]['item']['entry']
                    );
                    $spell['effect'][$i]['item']['name'] = $tmpRow['name'];
                    $spell['effect'][$i]['item']['quality'] = $tmpRow['quality'];
                    $spell['effect'][$i]['item']['count'] = $row['effect' . $j . 'BasePoints'] + 1;
                    // Иконка итема, если спелл создает этот итем
                    if (!isset($spell['icon']))
                        $spell['icon'] = trim($tmpRow['iconname'], "\r");
                    allitemsinfo2($tmpRow, 0);
                }
                // Создает спелл
                if ($row['effect' . $j . 'triggerspell'] > 0) {
                    $spell['effect'][$i]['spell'] = array();
                    $spell['effect'][$i]['spell']['entry'] = $row['effect' . $j . 'triggerspell'];
                    $spell['effect'][$i]['spell']['name'] = $DB->selectCell('SELECT spellname_loc' . $_SESSION['locale'] . ' FROM ' . AOWOW . '.aowow_spell WHERE spellID=?d LIMIT 1', $spell['effect'][$i]['spell']['entry']);
                    allspellsinfo($spell['effect'][$i]['spell']['entry']);
                }
                $i++;
            }
        }

        if (!isset($spell['icon']))
            $spell['icon'] = trim($row['iconname'], "\r");

        // Спеллы с таким же названием
        $seealso = $DB->select('
			SELECT s.*, i.iconname
			FROM ' . AOWOW . '.aowow_spell s, ' . AOWOW . '.aowow_spellicons i
			WHERE
				s.spellname_loc' . $_SESSION['locale'] . ' = ?
				AND s.spellID <> ?d
				AND (
							(s.effect1id=?d AND s.effect1id!=0)
							OR (s.effect2id=?d AND s.effect2id!=0)
							OR (s.effect3id=?d AND s.effect3id!=0)
						)
				AND i.id=s.spellicon
			', $spell['name'], $spell['entry'], $row['effect1id'], $row['effect2id'], $row['effect3id']
        );
        if ($seealso) {
            $spell['seealso'] = array();
            foreach ($seealso as $i => $row)
                $spell['seealso'][] = spellinfo2($row);
            unset($seealso);
        }

        $spell['taughtbynpc'] = array();
        // Список тренеров, обучающих нужному спеллу
        $taughtbytrainers = $DB->select('
			SELECT ?#, c.entry
			{ , name_loc?d AS name_loc, subname_loc' . $_SESSION['locale'] . ' AS subname_loc }
			FROM ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
			{ LEFT JOIN (' . WORLD . '.locales_creature l) ON c.entry = l.entry AND ? }
			WHERE
				c.entry IN (SELECT entry FROM ' . WORLD . '.npc_trainer WHERE spell=?d)
            GROUP BY c.entry
			', $npc_cols[0], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $spell['entry']
        );


        //AND factiontemplateID=FactionAlliance
        if ($taughtbytrainers) {
            foreach ($taughtbytrainers as $i => $npcrow)
                $spell['taughtbynpc'][] = creatureinfo2($npcrow);
            unset($taughtbytrainers);
        }


        $spell['taughtbyitem'] = array();
        $taughtbyitem = $DB->select('
			SELECT ?#, c.entry
			{ , name_loc?d AS name_loc }
			FROM ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template c
			{ LEFT JOIN (' . WORLD . '.locales_item l) ON c.entry = l.entry AND ? }
			WHERE
				((spellid_2=?d)
				AND (spelltrigger_2=6))
				AND id=display_id
				GROUP BY c.entry
			', $item_cols[2], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $spell['entry']//, $spell['entry'], $spell['entry'], $spell['entry'], $spell['entry']
        );
        if ($taughtbyitem) {
            foreach ($taughtbyitem as $i => $itemrow)
                $spell['taughtbyitem'][] = iteminfo2($itemrow, 0);
            unset($taughtbyitem);
        }

        // Список спеллов, обучающих этому спеллу:
        $taughtbyspells = $DB->selectCol('
			SELECT spellID
			FROM ' . AOWOW . '.aowow_spell
			WHERE
				(effect1triggerspell=?d AND (effect1id=57 OR effect1id=36))
				OR (effect2triggerspell=?d AND (effect2id=57 OR effect2id=36))
				OR (effect3triggerspell=?d AND (effect3id=57 OR effect3id=36))
			', $spell['entry'], $spell['entry'], $spell['entry']
        );


        if ($taughtbyspells) {
            // Список петов, кастующих спелл, обучающий нужному спеллу
            $taughtbypets = $DB->select('
				SELECT ?#, c.entry
				{ , name_loc?d AS name_loc, subname_loc' . $_SESSION['locale'] . ' AS subname_loc }
				FROM ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
				{ LEFT JOIN (' . WORLD . '.locales_creature l) ON c.entry = l.entry AND ? }
				WHERE
					c.entry IN (SELECT entry FROM ' . WORLD . '.petcreateinfo_spell WHERE (Spell1 IN (?a)) OR (Spell2 IN (?a)) OR (Spell3 IN (?a)) OR (Spell4 IN (?a)))
					GROUP BY c.entry
				', $npc_cols[0], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $taughtbyspells, $taughtbyspells, $taughtbyspells, $taughtbyspells
            );
            //AND factiontemplateID=FactionAlliance
            // Перебираем этих петов
            if ($taughtbypets) {
                foreach ($taughtbypets as $i => $petrow)
                    $spell['taughtbynpc'][] = creatureinfo2($petrow);
                unset($taughtbypets);
            }

            $taughtbyquest = $DB->select('
				SELECT c.?#
				{ , Title_loc?d AS Title_loc }
				, entry as id
				FROM ' . WORLD . '.quest_template c
				{ LEFT JOIN (' . WORLD . '.locales_quest l) ON c.entry = l.entry AND ? }
				WHERE
					RewSpell IN (?a) OR RewSpellCast IN (?a)
				', $quest_cols[2], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $taughtbyspells, $taughtbyspells
            );
            if ($taughtbyquest) {
                $spell['taughtbyquest'] = array();
                foreach ($taughtbyquest as $i => $questrow)
                    $spell['taughtbyquest'][] = GetQuestInfo($questrow, 0xFFFFFF);
                unset($taughtbyquest);
            }

            $taughtbytrainers = $DB->select('
				SELECT ?#, c.entry
				{ , name_loc?d AS name_loc, subname_loc' . $_SESSION['locale'] . ' AS subname_loc }
				FROM ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
				{ LEFT JOIN (' . WORLD . '.locales_creature l) ON c.entry = l.entry AND ? }
				WHERE
					c.entry IN (SELECT entry FROM ' . WORLD . '.npc_trainer WHERE spell in (?a))
					GROUP BY c.entry
				', $npc_cols[0], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $taughtbyspells
            );
            //AND factiontemplateID=FactionAlliance
            if ($taughtbytrainers) {
                foreach ($taughtbytrainers as $i => $npcrow)
                    $spell['taughtbynpc'][] = creatureinfo2($npcrow);
                unset($taughtbytrainers);
            }

            $taughtbyitem = $DB->select('
				SELECT ?#, c.entry
				{ , name_loc?d AS name_loc }
				FROM ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template c
				{ LEFT JOIN (' . WORLD . '.locales_item l) ON c.entry = l.entry AND ? }
				WHERE
					((spellid_1 IN (?a))
					OR (spellid_2 IN (?a))
					OR (spellid_3 IN (?a))
					OR (spellid_4 IN (?a))
					OR (spellid_5 IN (?a)))
					AND id=display_id
				', $item_cols[2], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $taughtbyspells, $taughtbyspells, $taughtbyspells, $taughtbyspells, $taughtbyspells
            );
            if ($taughtbyitem) {
                foreach ($taughtbyitem as $i => $itemrow)
                    $spell['taughtbyitem'][] = iteminfo2($itemrow, 0);
                unset($taughtbyitem);
            }
        }


        // Используется NPC:
        $usedbynpc = false;
//        $usedbynpc = $DB->select('
//			SELECT ?#, c.entry
//			{ , name_loc?d AS name_loc, subname_loc' . $_SESSION['locale'] . ' AS subname_loc }
//			FROM ' . AOWOW . '.aowow_factiontemplate, ' . WORLD . '.creature_template c
//			{ LEFT JOIN (' . WORLD . '.locales_creature l) ON c.entry = l.entry AND ? }
//
//			', $npc_cols[0], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $spell['entry'], $spell['entry'], $spell['entry'], $spell['entry']
//        );

        //WHERE
        //				factiontemplateID=FactionAlliance
        if ($usedbynpc) {
            $spell['usedbynpc'] = array();
            foreach ($usedbynpc as $i => $row)
                $spell['usedbynpc'][] = creatureinfo2($row);
            unset($usedbynpc);
        }


        // used by item
        $usedbyitem = $DB->select('
			SELECT ?#, c.entry
			{ , name_loc?d AS name_loc }
			FROM ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template c
			{ LEFT JOIN (' . WORLD . '.locales_item l) ON c.entry = l.entry AND ? }
			WHERE
				(spellid_1=?d OR (spellid_2=?d AND spelltrigger_2!=6) OR spellid_3=?d OR spellid_4=?d OR spellid_5=?d)
				AND id=display_id
			', $item_cols[2], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $spell['entry'], $spell['entry'], $spell['entry'], $spell['entry'], $spell['entry']
        );
        if ($usedbyitem) {
            $spell['usedbyitem'] = array();
            foreach ($usedbyitem as $i => $row)
                $spell['usedbyitem'][] = iteminfo2($row, 0);
            unset($usedbyitem);
        }

        // item sets
        $usedbyitemset = $DB->select('
			SELECT *
			FROM ' . AOWOW . '.aowow_itemset
			WHERE spell1=?d or spell2=?d or spell3=?d or spell4=?d or spell5=?d or spell6=?d or spell7=?d or spell8=?d
			', $spell['entry'], $spell['entry'], $spell['entry'], $spell['entry'], $spell['entry'], $spell['entry'], $spell['entry'], $spell['entry']
        );
        if ($usedbyitemset) {
            $spell['usedbyitemset'] = array();
            foreach ($usedbyitemset as $i => $row)
                $spell['usedbyitemset'][] = itemsetinfo2($row);
            unset($usedbyitemset);
        }

        // spell reward
        $questreward = $DB->select('
			SELECT c.?#
			{ , Title_loc?d AS Title_loc }
			,entry as id
			FROM ' . WORLD . '.quest_template c
			{ LEFT JOIN (' . WORLD . '.locales_quest l) ON c.entry = l.entry AND ? }
			WHERE
				RewSpell=?d
				OR RewSpellCast=?d
			', $quest_cols[2], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $spell['entry'], $spell['entry']
        );
        if ($questreward) {
            $spell['questreward'] = array();
            foreach ($questreward as $i => $row)
                $spell['questreward'][] = GetQuestInfo($row, 0xFFFFFF);
            unset($questreward);
        }

        // empty checks
        if (!($spell['taughtbyitem']))
            unset($spell['taughtbyitem']);
        if (!($spell['taughtbynpc']))
            unset($spell['taughtbynpc']);

        $smarty->assign('spell', $spell);
        save_cache(13, $spell['spellID'], $spell);
    }
}


global $page;
$page = array(
    'Mapper' => false,
    'Book' => false,
    'Title' => $spell['name'] . ' - ' . $smarty->get_config_vars('Spells'),
    'tab' => 0,
    'type' => 6,
    'typeid' => $spell['entry'],
    'path' => '[0,1]'
);
$smarty->assign('page', $page);

// Комментарии
$smarty->assign('comments', getcomments($page['type'], $page['typeid']));


// Количество MySQL запросов
$smarty->assign('mysql', $DB->getStatistics());
if (count($allspells) >= 0)
    $smarty->assign('allspells', $allspells);
if (isset($allitems) && count($allitems) >= 0)
    $smarty->assign('allitems', $allitems);

$smarty->display('spell.tpl');
