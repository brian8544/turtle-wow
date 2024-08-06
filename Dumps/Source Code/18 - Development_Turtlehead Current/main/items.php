<?php

global $smarty;
global $conf_file;

// Необходима функция iteminfo
require_once('includes/allitems.php');

$smarty->config_load($conf_file, 'items');

// Разделяем из запроса класс и подкласс вещей
point_delim($podrazdel, $class, $subclass, $inventory_type);
// x, armor, cloth, chest

global $DB;
global $allitems;
global $items;
global $hide_cow_stuff;

// ghetto
$ex = explode('.', $podrazdel);
if (isset($ex[0]))
    $class = $ex[0];
if (isset($ex[1]))
    $subclass = $ex[1];
if (isset($ex[2]))
    $inventory_type = $ex[2];

$cache_str = (!isset($class) ? 'x' : intval($class)) . '_' . (!isset($subclass) ? 'x' : intval($subclass))
    . '_' . (!isset($inventory_type) ? 'x' : intval($inventory_type));

// extra item filters
$stat = [-1, 0, 0, 0];
$value = [-1, 0, 0, 0];

$other_stat = [-1, 0, 0, 0];
$other_value = [-1, 0, 0, 0];

$item_level_min = 0;
$item_level_max = 0;

$req_level_min = 0;
$req_level_max = 0;

$extra_filtering = '';

if (isset($_REQUEST['item_level_min']) && is_numeric($_REQUEST['item_level_min']) && $_REQUEST['item_level_min'] != 0) {
    $extra_filtering .= ' AND item_level >= ' . $_REQUEST['item_level_min'];
    $item_level_min = $_REQUEST['item_level_min'];
}
if (isset($_REQUEST['item_level_max']) && is_numeric($_REQUEST['item_level_max']) && $_REQUEST['item_level_max'] != 0) {
    $extra_filtering .= ' AND item_level <= ' . $_REQUEST['item_level_max'];
    $item_level_max = $_REQUEST['item_level_max'];
}


if (isset($_REQUEST['req_level_min']) && is_numeric($_REQUEST['req_level_min']) && $_REQUEST['req_level_min'] != 0) {
    $extra_filtering .= ' AND required_level >= ' . $_REQUEST['req_level_min'];
    $req_level_min = $_REQUEST['req_level_min'];
}

if (isset($_REQUEST['req_level_max']) && is_numeric($_REQUEST['req_level_max']) && $_REQUEST['req_level_max'] != 0) {
    $extra_filtering .= ' AND required_level <= ' . $_REQUEST['req_level_max'];
    $req_level_max = $_REQUEST['req_level_max'];
}


for ($i = 1; $i <= 3; $i++) {
    if (isset($_REQUEST['stat_' . $i]) && isset($_REQUEST['value_' . $i])) {

        $stat[$i] = $_REQUEST['stat_' . $i];
        $value[$i] = $_REQUEST['value_' . $i];

        // check for right stats
        if (in_array($stat[$i], [3, 4, 5, 6, 7])) {

            // check for right values
            if (filter_var($value[$i], FILTER_VALIDATE_INT) && $value[$i] !== 0) {

                $extra_filtering .= ' AND ';
                $extra_filtering .= ' ( ';

                for ($j = 1; $j <= 10; $j++)
                    $extra_filtering .= ' (stat_type' . $j . ' = ' . $stat[$i] . ' AND stat_value' . $j . ' >= ' . $value[$i] . ') OR ';

                $extra_filtering = rtrim($extra_filtering, ' OR ');

                $extra_filtering .= ' ) ';

            }

        }

    }
}

$quality_min = 0;

if (isset($_REQUEST['item_quality_min']) && (in_array($_REQUEST['item_quality_min'], [0, 1, 2, 3, 4, 5, 6]))) {
    $extra_filtering .= ' AND quality >= ' . $_REQUEST['item_quality_min'];
    $quality_min = $_REQUEST['item_quality_min'];
}

for ($i = 1; $i <= 3; $i++) {

    if (isset($_REQUEST['other_stat_' . $i]) && isset($_REQUEST['other_value_' . $i])) {

        $other_stat[$i] = $_REQUEST['other_stat_' . $i];
        $other_value[$i] = $_REQUEST['other_value_' . $i];

        if (in_array($other_stat[$i], [1, 2, 3, 33, 4, 5, 6, 66, 67, 7, 8, 9,
            10, 11, 12, 13, 14,144, 145, 15, 16, 17, 18, 19, 20])) {

            // check for right values
            if (filter_var($other_value[$i], FILTER_VALIDATE_INT) && $other_value[$i] !== 0) {

                $spell_id = 69696969;

                // melee hit
                if ($other_stat[$i] == 1) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Increased Hit Chance " . $other_value[$i] . "'");

                    if (count($spells) == 1)
                        $spell_id = $spells[0]['entry'];

                    $extra_filtering .= ' AND ';
                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' = ' . $spell_id . ' OR ';


                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';

                }

                // spell hit - Increased Spell Hit Chance 1
                if ($other_stat[$i] == 2) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Increased Spell Hit Chance " . $other_value[$i] . "'");

                    if (count($spells) == 1)
                        $spell_id = $spells[0]['entry'];

                    $extra_filtering .= ' AND ';
                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' = ' . $spell_id . ' OR ';


                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';

                }

                // melee crit - Increased Critical 1
                if ($other_stat[$i] == 3) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Increased Critical " . $other_value[$i] . "'
                    AND description = 'Improves your chance to get a critical strike by \$s1%.'");

                    if (count($spells) == 1)
                        $spell_id = $spells[0]['entry'];

                    $extra_filtering .= ' AND ';
                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' = ' . $spell_id . ' OR ';


                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }


                // ranged crit - Increased Critical 1
                if ($other_stat[$i] == 33) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Increased Critical " . $other_value[$i] . "' AND
                    description = 'Improves your chance to get a critical strike with missile weapons by \$s1%.'");

                    if (count($spells) == 1)
                        $spell_id = $spells[0]['entry'];

                    $extra_filtering .= ' AND ';
                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' = ' . $spell_id . ' OR ';


                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }


                // spell crit - Increased Critical Spell
                if ($other_stat[$i] == 4) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Increased Critical Spell' AND
                    effectBasePoints1 = '" . ($other_value[$i] - 1) . "'");

                    if (count($spells) == 1)
                        $spell_id = $spells[0]['entry'];

                    $extra_filtering .= ' AND ';
                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' = ' . $spell_id . ' OR ';


                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // parry - Increased Parry 1
                if ($other_stat[$i] == 5) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Increased Parry " . $other_value[$i] . "'");

                    if (count($spells) == 1)
                        $spell_id = $spells[0]['entry'];

                    $extra_filtering .= ' AND ';
                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' = ' . $spell_id . ' OR ';


                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // dodge - Increased Dodge 1
                if ($other_stat[$i] == 6) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Increased Dodge " . $other_value[$i] . "'");

                    if (count($spells) == 1)
                        $spell_id = $spells[0]['entry'];

                    $extra_filtering .= ' AND ';
                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' = ' . $spell_id . ' OR ';


                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // block - Increased Block 1
                if ($other_stat[$i] == 66) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Increased Block " . $other_value[$i] . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }


                        $extra_filtering .= ' AND ';
                        $extra_filtering .= ' ( ';

                        for ($j = 1; $j <= 5; $j++)
                            $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';


                        $extra_filtering = rtrim($extra_filtering, ' OR ');

                        $extra_filtering .= ' ) ';

                }

                // block value
                if ($other_stat[$i] == 67) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Increases the block value of your shield by \$s1.' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // defense
                if ($other_stat[$i] == 7) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Increased Defense' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // armor pen
                if ($other_stat[$i] == 8) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Your attacks ignore \$s1 of the target\'s armor.' AND
                    effectBasePoints1 <='" . (-$other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // spell pen
                if ($other_stat[$i] == 9) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name LIKE 'Increased Spell Penetration %' AND
                    effectBasePoints1 <= '" . (-$other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // spell power
                if ($other_stat[$i] == 10) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Increases damage and healing done by magical spells and effects by up to \$s1.' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // arcane spell power
                if ($other_stat[$i] == 11) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Increases damage done by Arcane spells and effects by up to \$s1.' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // holy spell power
                if ($other_stat[$i] == 12) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Increases damage done by Holy spells and effects by up to \$s1.' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // nature spell power
                if ($other_stat[$i] == 13) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Increases damage done by Nature spells and effects by up to \$s1.' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // Shadow spell power
                if ($other_stat[$i] == 14) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Increases damage done by Shadow spells and effects by up to \$s1.' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // Fire spell power
                if ($other_stat[$i] == 144) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Increases damage done by Fire spells and effects by up to \$s1.' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // Frost spell power
                if ($other_stat[$i] == 144) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Increases damage done by Frost spells and effects by up to \$s1.' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // healing power
                if ($other_stat[$i] == 15) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Increases healing done by spells and effects by up to \$s1.' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // mp5
                if ($other_stat[$i] == 16) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Increased Mana Regen' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // hp5
                if ($other_stat[$i] == 17) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name = 'Vitality' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // ap
                if ($other_stat[$i] == 18) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name LIKE 'Attack Power %' AND
                    name NOT LIKE 'Attack Power Ranged %' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // rap
                if ($other_stat[$i] == 19) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE name LIKE 'Attack Power Ranged %' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }

                // attack speed
                if ($other_stat[$i] == 20) {
                    // get spell id
                    $spells = $DB->select("
                    SELECT entry
                    FROM " . WORLD . ".spell_template
                    WHERE description = 'Increases your attack and casting speed by \$s1%.' AND
                    effectBasePoints1 >= '" . ($other_value[$i] - 1) . "'");

                    $spell_ids_concat = $spell_id;

                    if (count($spells) > 0) {
                        $spell_ids = [];
                        foreach ($spells as $spell)
                            $spell_ids[] = $spell['entry'];
                        $spell_ids_concat = implode(',', $spell_ids);
                    }

                    $extra_filtering .= ' AND ';

                    $extra_filtering .= ' ( ';

                    for ($j = 1; $j <= 5; $j++)
                        $extra_filtering .= ' spellid_' . $j . ' IN (' . $spell_ids_concat . ') OR ';

                    $extra_filtering = rtrim($extra_filtering, ' OR ');

                    $extra_filtering .= ' ) ';
                }


            }

        }

    }

}

//echo "<div style='width: 50%'>" . $extra_filtering . "</div>";

$items = load_cache(7, $cache_str);

if ((!$items) || isset($_REQUEST['filters'])) {
    unset($items);
    // Составляем запрос к БД, выполняющий поиск по заданным классу и подклассу

    global $item_cols;

    if ($podrazdel == -500) {
        $rows = $DB->select('
		SELECT ?#, i.entry, max_count
			{, l.name_loc?d AS `name_loc`}
		FROM ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template i
			{LEFT JOIN (' . WORLD . '.locales_item l) ON l.entry=i.entry AND ?d}
		WHERE
			id=display_id AND i.entry >= 50000 and i.name not like "DEPRECATED%"
			ORDER BY quality DESC, name
			LIMIT 500
		', $item_cols[2], ($_SESSION['locale']) ? $_SESSION['locale'] : DBSIMPLE_SKIP, ($_SESSION['locale']) ? 1 : DBSIMPLE_SKIP
        );

    } else {

        $rows = $DB->select('
		    SELECT ?#, i.entry, max_count
			{, l.name_loc?d AS `name_loc`}
		    FROM ' . AOWOW . '.aowow_icons, ' . WORLD . '.item_template i
			{LEFT JOIN (' . WORLD . '.locales_item l) ON l.entry=i.entry AND ?d}
		    WHERE
			id=display_id
			{ AND class=? }
			{ AND subclass=? }
			{ AND inventory_type=? }
			' . $extra_filtering . '
			ORDER BY quality DESC, name
			LIMIT 500
            ', $item_cols[2],
            ($_SESSION['locale']) ? $_SESSION['locale'] : DBSIMPLE_SKIP,
            ($_SESSION['locale']) ? 1 : DBSIMPLE_SKIP,
            ($class != '') ? $class : DBSIMPLE_SKIP,
            ($subclass != '') ? $subclass : DBSIMPLE_SKIP,
            ($inventory_type != '') ? $inventory_type : DBSIMPLE_SKIP
        );


    }

    $i = 0;
    $items = array();
    foreach ($rows as $numRow => $row) {

        if ($hide_cow_stuff) {
            if (!in_array($row['entry'], [60486, 51261, 60485, 60491, 60487, 60488, 60489, 60490, 60149, 60150])) {
                $items[$i] = array();
                $items[$i] = iteminfo2($row);
                $i++;
            }
        } else {
            $items[$i] = array();
            $items[$i] = iteminfo2($row);
            $i++;
        }


    }

    if (!isset($_REQUEST['filters']))
        save_cache(7, $cache_str, $items);
}

global $page;
$page = array(
    'Mapper' => false,
    'Book' => false,
    'Title' => $smarty->get_config_vars('Items'),
    'tab' => 0,
    'type' => 0,
    'typeid' => 0,
    'path' => "[0, 0, " . $class . ", " . $subclass . ", " . $inventory_type . "]",
    'filters' => [
        'shown' => isset($_REQUEST['filters']) && $_REQUEST['filters'] === 'on',
        'item_level' => [$item_level_min, $item_level_max],
        'req_level' => [$req_level_min, $req_level_max],
        'quality_min' => $quality_min,
        'stats' => [[],
            [$stat[1], $value[1]],
            [$stat[2], $value[2]],
            [$stat[3], $value[3]]
        ],
        'other_stats' => [[],
            [$other_stat[1], $other_value[1]],
            [$other_stat[2], $other_value[2]],
            [$other_stat[3], $other_value[3]]
        ]
    ]
);

$smarty->assign('page', $page);

// Статистика выполнения mysql запросов
$smarty->assign('mysql', $DB->getStatistics());
// Если хоть одна информация о вещи найдена - передаём массив с информацией о вещях шаблонизатору


if ($allitems === null)
    $allitems = [];
if ($items === null)
    $items = [];

if (count($allitems) >= 0)
    $smarty->assign('allitems', $allitems);
if (count($items) >= 0)
    $smarty->assign('items', $items);
// Загружаем страницу
$smarty->display('items.tpl');
