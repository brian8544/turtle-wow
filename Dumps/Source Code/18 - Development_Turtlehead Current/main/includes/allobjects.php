<?php

// Types of Game Objects
define("GAMEOBJECT_TYPE_DOOR", 0);
define("GAMEOBJECT_TYPE_BUTTON", 1);
define("GAMEOBJECT_TYPE_QUESTGIVER", 2);
define("GAMEOBJECT_TYPE_CHEST", 3);
define("GAMEOBJECT_TYPE_BINDER", 4);
define("GAMEOBJECT_TYPE_GENERIC", 5);
define("GAMEOBJECT_TYPE_TRAP", 6);
define("GAMEOBJECT_TYPE_CHAIR", 7);
define("GAMEOBJECT_TYPE_SPELL_FOCUS", 8);
define("GAMEOBJECT_TYPE_TEXT", 9);
define("GAMEOBJECT_TYPE_GOOBER", 10);
define("GAMEOBJECT_TYPE_TRANSPORT", 11);
define("GAMEOBJECT_TYPE_AREADAMAGE", 12);
define("GAMEOBJECT_TYPE_CAMERA", 13);
define("GAMEOBJECT_TYPE_MAP_OBJECT", 14);
define("GAMEOBJECT_TYPE_MO_TRANSPORT", 15);
define("GAMEOBJECT_TYPE_DUEL_ARBITER", 16);
define("GAMEOBJECT_TYPE_FISHINGNODE", 17);
define("GAMEOBJECT_TYPE_RITUAL", 18);
define("GAMEOBJECT_TYPE_MAILBOX", 19);
define("GAMEOBJECT_TYPE_AUCTIONHOUSE", 20);
define("GAMEOBJECT_TYPE_GUARDPOST", 21);
define("GAMEOBJECT_TYPE_SPELLCASTER", 22);
define("GAMEOBJECT_TYPE_MEETINGSTONE", 23);
define("GAMEOBJECT_TYPE_FLAGSTAND", 24);
define("GAMEOBJECT_TYPE_FISHINGHOLE", 25);
define("GAMEOBJECT_TYPE_FLAGDROP", 26);
define("GAMEOBJECT_TYPE_MINI_GAME", 27);
define("GAMEOBJECT_TYPE_LOTTERY_KIOSK", 28);
define("GAMEOBJECT_TYPE_CAPTURE_POINT", 29);
define("GAMEOBJECT_TYPE_AURA_GENERATOR", 30);

// Column LockProperties in Lock.dbc
define("LOCK_PROPERTIES_FOOTLOCK", 1);
define("LOCK_PROPERTIES_HERBALISM", 2);
define("LOCK_PROPERTIES_MINING", 3);

// objectinfo required columns
$object_cols[0] = array('entry', 'name', 'type');
$object_cols[1] = array('entry', 'name', 'type', 'data0', 'data1', 'data7');

// Функция информации об объекте
function objectinfo($id, $level = 0)
{
    global $DB;
    global $object_cols;
    $row = $DB->selectRow('
			SELECT g.?#
				{, l.name_loc?d AS `name_loc`} , displayId
			FROM ' . WORLD . '.gameobject_template g
				{LEFT JOIN (' . WORLD . '.locales_gameobject l) ON l.entry=g.entry AND ?d}
			WHERE g.entry = ?d
			LIMIT 1
		', $object_cols[$level], ($_SESSION['locale'] > 0) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale'] > 0) ? 1 : DBSIMPLE_SKIP, $id
    );
    return objectinfo2($row, $level);
}

// Функция информации об объекте
//  $Row - ссылка на ассоциативный массив из базы
function objectinfo2(&$Row, $level = 0)
{
    global $DB;
    // Номер объекта
    $object['entry'] = $Row['entry'];
    $object['displayId'] = $Row['displayId'];
    // Название объекта
    $object['name'] = !empty($Row['name_loc']) ? $Row['name_loc'] : $Row['name'];
    // Тип объекта
    $object['type'] = $Row['type'];
    if ($level > 0) {
        // В зависимости от типа объекта, заполняем поля:
        switch ($object['type']):
            case GAMEOBJECT_TYPE_DOOR:
                /*
                 * data0: startOpen (Boolean flag)
                 * data1: open (LockId from Lock.dbc)
                 * data2: autoClose (long unknown flag)
                 * data3: noDamageImmune (Boolean flag)
                 * data4: openTextID (Unknown Text ID)
                 * data5: closeTextID (Unknown Text ID)
                 */
                $object['lockid'] = $Row['data1'];
                break;
            case GAMEOBJECT_TYPE_BUTTON:
                /*
                 * data0: startOpen (State)
                 * data1: open (LockId from Lock.dbc)
                 * data2: autoClose (long unknown flag)
                 * data3: linkedTrap (gameobject_template.entry (Spawned GO type 6))
                 * data4: noDamageImmune (Boolean flag)
                 * data5: large? (Boolean flag)
                 * data6: openTextID (Unknown Text ID)
                 * data7: closeTextID (Unknown Text ID)
                 * data8: losOK (Boolean flag)
                 */
                $object['lockid'] = $Row['data1'];
                break;
            case GAMEOBJECT_TYPE_QUESTGIVER:
                /*
                 * data0: open (LockId from Lock.dbc)
                 * data1: questList (unknown ID)
                 * data2: pageMaterial (PageTextMaterial.dbc)
                 * data3: gossipID (unknown ID)
                 * data4: customAnim (unknown value from 1 to 4)
                 * data5: noDamageImmune (Boolean flag)
                 * data6: openTextID (Unknown Text ID)
                 * data7: losOK (Boolean flag)
                 * data8: allowMounted (Boolean flag)
                 * data9: large? (Boolean flag)
                 */
                $object['lockid'] = $Row['data0'];
                break;
            case GAMEOBJECT_TYPE_CHEST:
                /*
                 * data0: open (LockId from Lock.dbc)
                 * data1: chestLoot (gameobject_loot_template.entry) *This field is obtained from WDB data and is not to be changed*
                 * data2: chestRestockTime (time in seconds)
                 * data3: consumable (State: Boolean flag)
                 * data4: minRestock (Min successful loot attempts for Mining, Herbalism etc)
                 * data5: maxRestock (Max successful loot attempts for Mining, Herbalism etc)
                 * data6: lootedEvent (unknown ID)
                 * data7: linkedTrap (gameobject_template.entry (Spawned GO type 6))
                 * data8: questID (quest_template.entry of completed quest)
                 * data9: level (minimal level required to open this gameobject)
                 * data10: losOK (Boolean flag)
                 * data11: leaveLoot (Boolean flag)
                 * data12: notInCombat (Boolean flag)
                 * data13: log loot (Boolean flag)
                 * data14: openTextID (Unknown ID)
                 * data15: use group loot rules (Boolean flag)
                 */
                $object['lockid'] = $Row['data0'];
                $object['lootid'] = $Row['data1'];
                break;
            case GAMEOBJECT_TYPE_BINDER:
                /* 	Object type not used */
                break;
            case GAMEOBJECT_TYPE_GENERIC:
                /*
                 * data0: floatingTooltip (Boolean flag)
                 * data1: highlight (Boolean flag)
                 * data2: serverOnly? (Always 0)
                 * data3: large? (Boolean flag)
                 * data4: floatOnWater (Boolean flag)
                 * data5: questID (Required active quest_template.entry to work)
                 */
                break;
            case GAMEOBJECT_TYPE_TRAP:
                /*
                 * data0: open (LockId from Lock.dbc)
                 * data1: level (npc equivalent level for casted spell)
                 * data2: radius (Distance)
                 * data3: spell (Spell Id from spell.dbc)
                 * data4: charges (0 or 1)
                 * data5: cooldown (time in seconds)
                 * data6:  ? (unknown flag)
                 * data7: startDelay? (time in seconds)
                 * data8: serverOnly? (always 0)
                 * data9: stealthed (Boolean flag)
                 * data10: large? (Boolean flag)
                 * data11: stealthAffected (Boolean flag)
                 * data12: openTextID (Unknown ID)
                 */
                $object['lockid'] = $Row['data0'];
                break;
            case GAMEOBJECT_TYPE_CHAIR:
                /*
                 * data0: chairslots (number of players that can sit down on it)
                 * data1: chairorientation? (number of usable side?)
                 */
                break;
            case GAMEOBJECT_TYPE_SPELL_FOCUS:
                /*
                 * data0: spellFocusType (from SpellFocusObject.dbc)
                 * data1: radius (Distance)
                 * data2: linkedTrap (gameobject_template.entry (Spawned GO type 6))
                 */
                break;
            case GAMEOBJECT_TYPE_TEXT:
                /*
                 * data0: pageID (page_text.entry)
                 * data1: language (from Languages.dbc)
                 * data2: pageMaterial (PageTextMaterial.dbc)
                 */
                $object['pageid'] = $Row['data0'];
                break;
            case GAMEOBJECT_TYPE_GOOBER:
                /*
                 * data0: open (LockId from Lock.dbc)
                 * data1: questID (Required active quest_template.entry to work)
                 * data2: eventID (Unknown Event ID)
                 * data3:  ? (unknown flag)
                 * data4: customAnim (unknown)
                 * data5: consumable (Boolean flag controling if gameobject will despawn or not)
                 * data6: cooldown (time is seconds)
                 * data7: pageID (page_text.entry)
                 * data8: language (from Languages.dbc)
                 * data9: pageMaterial (PageTextMaterial.dbc)
                 * data10: spell (Spell Id from spell.dbc)
                 * data11: noDamageImmune (Boolean flag)
                 * data12: linkedTrap (gameobject_template.entry (Spawned GO type 6))
                 * data13: large? (Boolean flag)
                 * data14: openTextID (Unknown ID)
                 * data15: closeTextID (Unknown ID)
                 * data16: losOK (Boolean flag)
                 */
                $object['lockid'] = $Row['data0'];
                $object['pageid'] = $Row['data7'];
                break;
            case GAMEOBJECT_TYPE_TRANSPORT:
                /* No data data used, all are always 0 */
                break;
            case GAMEOBJECT_TYPE_AREADAMAGE:
                /* Object type not used */
                break;
            case GAMEOBJECT_TYPE_CAMERA:
                /*
                 * data0: open (LockId from Lock.dbc)
                 * data1: camera (Cinematic entry from CinematicCamera.dbc)
                 */
                $object['lockid'] = $Row['data0'];
                break;
            case GAMEOBJECT_TYPE_MAP_OBJECT:
                /* No data data used, all are always 0 */
                break;
            case GAMEOBJECT_TYPE_MO_TRANSPORT:
                /*
                 * data0: taxiPathID (Id from TaxiPath.dbc)
                 * data1: moveSpeed
                 * data2: accelRate
                 */
                break;
            case GAMEOBJECT_TYPE_DUEL_ARBITER:
                /* 	Only one Gameobject with this type (21680) and no data data */
                break;
            case GAMEOBJECT_TYPE_FISHINGNODE:
                /* 	Only one Gameobject with this type (35591) and no data data */
                break;
            case GAMEOBJECT_TYPE_RITUAL:
                /*
                 * data0: casters?
                 * data1: spell (Spell Id from spell.dbc)
                 * data2: animSpell (Spell Id from spell.dbc)
                 * data3: ritualPersistent (Boolean flag)
                 * data4: casterTargetSpell (Spell Id from spell.dbc)
                 * data5: casterTargetSpellTargets (Boolean flag)
                 * data6: castersGrouped (Boolean flag)
                 */
                break;
            case GAMEOBJECT_TYPE_MAILBOX:
                /* No data data used, all are always 0 */
                break;
            case GAMEOBJECT_TYPE_AUCTIONHOUSE:
                /* data0: actionHouseID (From AuctionHouse.dbc ?) */
                break;
            case GAMEOBJECT_TYPE_GUARDPOST:
                /* 	Object type not used */
                break;
            case GAMEOBJECT_TYPE_SPELLCASTER:
                /*
                 * data0: spell (Spell Id from spell.dbc)
                 * data1: charges
                 * data2: partyOnly (Boolean flag, need to be in group to use it)
                 */
                break;
            case GAMEOBJECT_TYPE_MEETINGSTONE:
                /*
                 * data0: minLevel
                 * data1: maxLevel
                 * data2: areaID (From AreaTable.dbc)
                 */
                break;
            case GAMEOBJECT_TYPE_FLAGSTAND:
                /*
                 * data0: open (LockId from Lock.dbc)
                 * data1: pickupSpell (Spell Id from spell.dbc)
                 * data2: radius (distance)
                 * data3: returnAura (Spell Id from spell.dbc)
                 * data4: returnSpell (Spell Id from spell.dbc)
                 * data5: noDamageImmune (Boolean flag)
                 * data6:  ?
                 * data7: losOK (Boolean flag)
                 */
                $object['lockid'] = $Row['data0'];
                break;
            case GAMEOBJECT_TYPE_FISHINGHOLE:
                /*
                 * data0: radius (distance)
                 * data1: chestLoot (gameobject_loot_template.entry)
                 * data2: minRestock
                 * data3: maxRestock
                 */
                $object['lootid'] = $Row['data1'];
                break;
            case GAMEOBJECT_TYPE_FLAGDROP:
                /*
                 * data0: open (LockId from Lock.dbc)
                 * data1: eventID (Unknown Event ID)
                 * data2: pickupSpell (Spell Id from spell.dbc)
                 * data3: noDamageImmune (Boolean flag)
                 */
                $object['lockid'] = $Row['data0'];
                break;
            case GAMEOBJECT_TYPE_MINI_GAME:
                /* 	Object type not used
                  Reused in core for CUSTOM_TELEPORT
                 * data0: areatrigger_teleport.id
                 */
                break;
            case GAMEOBJECT_TYPE_LOTTERY_KIOSK:
                /* 	Object type not used */
                break;
            case GAMEOBJECT_TYPE_CAPTURE_POINT:
                /*
                 * data0: radius (Distance)
                 * data1: spell (Unknown ID, not a spell id in dbc file, maybe server only side spell)
                 * data2: worldState1
                 * data3: worldstate2
                 * data4: winEventID1 (Unknown Event ID)
                 * data5: winEventID2 (Unknown Event ID)
                 * data6: contestedEventID1 (Unknown Event ID)
                 * data7: contestedEventID2 (Unknown Event ID)
                 * data8: progressEventID1 (Unknown Event ID)
                 * data9: progressEventID2 (Unknown Event ID)
                 * data10: neutralEventID1 (Unknown Event ID)
                 * data11: neutralEventID2 (Unknown Event ID)
                 * data12: neutralPercent
                 * data13: worldstate3
                 * data14: minSuperiority
                 * data15: maxSuperiority
                 * data16: minTime (in seconds)
                 * data17: maxTime (in seconds)
                 * data18: large? (Boolean flag)
                 */
                break;
            case GAMEOBJECT_TYPE_AURA_GENERATOR:
                /*
                 * data0: startOpen (Boolean flag)
                 * data1: radius (Distance)
                 * data2: auraID1 (Spell Id from spell.dbc)
                 * data3: conditionID1 (Unknown ID)
                 */
                break;
        endswitch;
        // Тип объекта и требуемый уровень скилла, и какого скилла
        if ($object['lockid']) {
            $lock_row = $DB->selectRow('
				SELECT *
				FROM ' . AOWOW . '.aowow_lock
				WHERE lockID=?d
				LIMIT 1
				', $object['lockid']
            );
            if ($lock_row) {
                for ($j = 1; $j <= 5; $j++) {
                    switch ($lock_row['type' . $j]):
                        case 0:
                            // Не замок
                            break;
                        case 1:
                            // Ключ
                            $object['key'] = array();
                            $object['key'] = $DB->selectRow('SELECT entry as id, name, quality FROM ' . WORLD . '.item_template WHERE entry=?d LIMIT 1', $lock_row['lockproperties' . $j]);
                            break;
                        case 2:
                            // Скилл
                            switch ($lock_row['lockproperties' . $j]):
                                case LOCK_PROPERTIES_FOOTLOCK:
                                    // Сундук
                                    $object['type'] = -5;
                                    $object['lockpicking'] = $lock_row['requiredskill' . $j];
                                    break;
                                case LOCK_PROPERTIES_HERBALISM:
                                    // Трава
                                    $object['type'] = -3;
                                    $object['herbalism'] = $lock_row['requiredskill' . $j];
                                    break;
                                case LOCK_PROPERTIES_MINING:
                                    // Руда
                                    $object['type'] = -4;
                                    $object['mining'] = $lock_row['requiredskill' . $j];
                                    break;
                            endswitch;
                    endswitch;
                }
            }
        }
        // Текст страниц
        if ($object['pageid']) {
            while ($object['pageid'] > 0) {
                $row = $DB->selectRow('
						SELECT text, next_page
							{, text_loc?d}
						FROM ' . WORLD . '.page_text p
							{LEFT JOIN (' . WORLD . '.locales_page_text l) ON l.entry = p.entry AND ?}
						WHERE
							p.entry = ?d
						LIMIT 1
					', $_SESSION['locale'] ? $_SESSION['locale'] : DBSIMPLE_SKIP, $_SESSION['locale'] ? 1 : DBSIMPLE_SKIP, $object['pageid']
                );
                /*
                  if($_SESSION['locale']>0)
                  $text = QuestReplaceStr($DB->selectCell('SELECT Text_loc?d FROM ?_locales_page_text WHERE entry = ?d LIMIT 1', $_SESSION['locale'], $object['pageid']));
                  if($text)
                  $next_page = $DB->selectCell('SELECT next_page FROM ?_page_text WHERE entry = ?d LIMIT 1', $object['pageid']);
                  else
                  list($text, $next_page) = $DB->selectRow('SELECT text AS \'0\', next_page AS \'1\' FROM ?_page_text WHERE entry = ?d LIMIT 1', $object['pageid']);
                 */
                $row['text'] = QuestReplaceStr(!empty($row['text_loc']) ? $row['text_loc'] : $row['text']);
                if (empty($row['text']))
                    break;
                $object['pagetext'][] = $row['text'];
                $object['pageid'] = $row['next_page'];
            }
        }
        // Лут...
        if (isset($object['lootid'])) {
            $object['drop'] = array();
            if (!($object['drop'] = loot(WORLD . '.gameobject_loot_template', $object['lootid'])))
                unset($object['drop']);
        }
    }
    return $object;
}
