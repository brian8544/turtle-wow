<?php

require_once 'includes/allitems.php';

// Названия аур
$spell_aura_names = array(
    0 => 'None',
    1 => 'Bind Sight',
    2 => 'Mod Possess',
    3 => 'Periodic Damage',
    4 => 'Dummy',
    5 => 'Mod Confuse',
    6 => 'Mod Charm',
    7 => 'Mod Fear',
    8 => 'Periodic Heal',
    9 => 'Mod Attack Speed',
    10 => 'Mod Threat',
    11 => 'Taunt',
    12 => 'Stun',
    13 => 'Mod Damage Done',
    14 => 'Mod Damage Taken',
    15 => 'Damage Shield',
    16 => 'Mod Stealth',
    17 => 'Mod Detect',
    18 => 'Mod Invisibility',
    19 => 'Mod Invisibility Detection',
    20 => 'OBS Mod Intellect',
    21 => 'OBS Mod Spirit',
    22 => 'Mod Resistance',
    23 => 'Periodic Trigger',
    24 => 'Periodic Energize',
    25 => 'Pacify',
    26 => 'Root',
    27 => 'Silence',
    28 => 'Reflect Spells %',
    29 => 'Mod Stat',
    30 => 'Mod Skill',
    31 => 'Mod Speed',
    32 => 'Mod Speed Mounted',
    33 => 'Mod Speed Slow',
    34 => 'Mod Increase Health',
    35 => 'Mod Increase Energy',
    36 => 'Shapeshift',
    37 => 'Immune Effect',
    38 => 'Immune State',
    39 => 'Immune School',
    40 => 'Immune Damage',
    41 => 'Immune Dispel Type',
    42 => 'Proc Trigger Spell',
    43 => 'Proc Trigger Damage',
    44 => 'Track Creatures',
    45 => 'Track Resources',
    46 => 'Mod Parry Skill',
    47 => 'Mod Parry Percent',
    48 => 'Mod Dodge Skill',
    49 => 'Mod Dodge Percent',
    50 => 'Mod Block Skill',
    51 => 'Mod Block Percent',
    52 => 'Mod Crit Percent',
    53 => 'Periodic Leech',
    54 => 'Mod Hit Chance',
    55 => 'Mod Spell Hit Chance',
    56 => 'Transform',
    57 => 'Mod Spell Crit Chance',
    58 => 'Mod Speed Swim',
    59 => 'Mod Creature Dmg Done',
    60 => 'Pacify & Silence',
    61 => 'Mod Scale',
    62 => 'Periodic Health Funnel',
    63 => 'Periodic Mana Funnel',
    64 => 'Periodic Mana Leech',
    65 => 'Haste - Spells',
    66 => 'Feign Death',
    67 => 'Disarm',
    68 => 'Mod Stalked',
    69 => 'School Absorb',
    70 => 'Extra Attacks',
    71 => 'Mod School Spell Crit Chance',
    72 => 'Mod Power Cost',
    73 => 'Mod School Power Cost',
    74 => 'Reflect School Spells %',
    75 => 'Mod Language',
    76 => 'Far Sight',
    77 => 'Immune Mechanic',
    78 => 'Mounted',
    79 => 'Mod Dmg %',
    80 => 'Mod Stat %',
    81 => 'Split Damage',
    82 => 'Water Breathing',
    83 => 'Mod Base Resistance',
    84 => 'Mod Health Regen',
    85 => 'Mod Power Regen',
    86 => 'Create Death Item',
    87 => 'Mod Dmg % Taken',
    88 => 'Mod Health Regen Percent',
    89 => 'Periodic Damage Percent',
    90 => 'Mod Resist Chance',
    91 => 'Mod Detect Range',
    92 => 'Prevent Fleeing',
    93 => 'Mod Uninteractible',
    94 => 'Interrupt Regen',
    95 => 'Ghost',
    96 => 'Spell Magnet',
    97 => 'Mana Shield',
    98 => 'Mod Skill Talent',
    99 => 'Mod Attack Power',
    100 => 'Auras Visible',
    101 => 'Mod Resistance %',
    102 => 'Mod Creature Attack Power',
    103 => 'Mod Total Threat (Fade)',
    104 => 'Water Walk',
    105 => 'Feather Fall',
    106 => 'Hover',
    107 => 'Add Flat Modifier',
    108 => 'Add % Modifier',
    109 => 'Add Class Target Trigger',
    110 => 'Mod Power Regen %',
    111 => 'Add Class Caster Hit Trigger',
    112 => 'Override Class Scripts',
    113 => 'Mod Ranged Dmg Taken',
    114 => 'Mod Ranged % Dmg Taken',
    115 => 'Mod Healing',
    116 => 'Regen During Combat',
    117 => 'Mod Mechanic Resistance',
    118 => 'Mod Healing %',
    119 => 'Share Pet Tracking',
    120 => 'Untrackable',
    121 => 'Empathy (Lore, whatever)',
    122 => 'Mod Offhand Dmg %',
    123 => 'Mod Power Cost %',
    124 => 'Mod Ranged Attack Power',
    125 => 'Mod Melee Dmg Taken',
    126 => 'Mod Melee % Dmg Taken',
    127 => 'Rngd Atk Pwr Attckr Bonus',
    128 => 'Mod Possess Pet',
    129 => 'Mod Speed Always',
    130 => 'Mod Mounted Speed Always',
    131 => 'Mod Creature Ranged Attack Power',
    132 => 'Mod Increase Energy %',
    133 => 'Mod Max Health %',
    134 => 'Mod Interrupted Mana Regen',
    135 => 'Mod Healing Done',
    136 => 'Mod Healing Done %',
    137 => 'Mod Total Stat %',
    138 => 'Haste - Melee',
    139 => 'Force Reaction',
    140 => 'Haste - Ranged',
    141 => 'Haste - Ranged (Ammo Only)',
    142 => 'Mod Base Resistance %',
    143 => 'Mod Resistance Exclusive',
    144 => 'Safe Fall',
    145 => 'Charisma',
    146 => 'Persuaded',
    147 => 'Add Creature Immunity',
    148 => 'Retain Combo Points',
    149 => 'Resist Pushback',
    150 => 'Mod Shield Block %',
    151 => 'Track Stealthed',
    152 => 'Mod Detected Range',
    153 => 'Split Damage Flat',
    154 => 'Stealth Level Modifier',
    155 => 'Mod Water Breathing',
    156 => 'Mod Reputation Gain',
    157 => 'Mod Pet Damage',
);

// Названия эффектов спеллов
$spell_effect_names = array(
    0 => 'None',
    1 => 'Instakill',
    2 => 'School Damage',
    3 => 'Dummy',
    4 => 'Portal Teleport',
    5 => 'Teleport Units',
    6 => 'Apply Aura',
    7 => 'Environmental Damage',
    8 => 'Power Drain',
    9 => 'Health Leech',
    10 => 'Heal',
    11 => 'Bind',
    12 => 'Portal',
    13 => 'Ritual Base',
    14 => 'Ritual Specialize',
    15 => 'Ritual Activate Portal',
    16 => 'Quest Complete',
    17 => 'Weapon Damage + (noschool)',
    18 => 'Resurrect',
    19 => 'Extra Attacks',
    20 => 'Dodge',
    21 => 'Evade',
    22 => 'Parry',
    23 => 'Block',
    24 => 'Create Item',
    25 => 'Weapon',
    26 => 'Defense',
    27 => 'Persistent Area Aura',
    28 => 'Summon',
    29 => 'Leap',
    30 => 'Energize',
    31 => 'Weapon % Dmg',
    32 => 'Trigger Missile',
    33 => 'Open Lock',
    35 => 'Apply Area Aura',
    36 => 'Learn Spell',
    37 => 'Spell Defense',
    38 => 'Dispel',
    39 => 'Language',
    40 => 'Dual Wield',
    41 => 'Summon Wild',
    42 => 'Summon Guardian',
    44 => 'Skill Step',
    46 => 'Spawn',
    47 => 'Spell Cast UI',
    48 => 'Stealth',
    49 => 'Detect',
    50 => 'Summon Object',
    51 => 'Force Critical Hit',
    52 => 'Guarantee Hit',
    53 => 'Enchant Item Permanent',
    54 => 'Enchant Item Temporary',
    55 => 'Tame Creature',
    56 => 'Summon Pet',
    57 => 'Learn Pet Spell',
    58 => 'Weapon Damage +',
    59 => 'Open Lock (Item)',
    60 => 'Proficiency',
    61 => 'Send Event',
    62 => 'Power Burn',
    63 => 'Threat',
    64 => 'Trigger Spell',
    65 => 'Health Funnel',
    66 => 'Power Funnel',
    67 => 'Heal Max Health',
    68 => 'Interrupt Cast',
    69 => 'Distract',
    70 => 'Pull',
    71 => 'Pickpocket',
    72 => 'Add Farsight',
    73 => 'Summon Possessed',
    74 => 'Summon Totem',
    75 => 'Heal Mechanical',
    76 => 'Summon Object (Wild)',
    77 => 'Script Effect',
    78 => 'Attack',
    79 => 'Sanctuary',
    80 => 'Add Combo Points',
    81 => 'Create House',
    82 => 'Bind Sight',
    83 => 'Duel',
    84 => 'Stuck',
    85 => 'Summon Player',
    86 => 'Activate Object',
    87 => 'Summon Totem (slot 1)',
    88 => 'Summon Totem (slot 2)',
    89 => 'Summon Totem (slot 3)',
    90 => 'Summon Totem (slot 4)',
    91 => 'Threat (All)',
    92 => 'Enchant Held Item',
    93 => 'Summon Phantasm',
    94 => 'Self Resurrect',
    95 => 'Skinning',
    96 => 'Charge',
    97 => 'Summon Critter',
    98 => 'Knock Back',
    99 => 'Disenchant',
    100 => 'Inebriate',
    101 => 'Feed Pet',
    102 => 'Dismiss Pet',
    103 => 'Reputation',
    104 => 'Summon Object (slot 1)',
    105 => 'Summon Object (slot 2)',
    106 => 'Summon Object (slot 3)',
    107 => 'Summon Object (slot 4)',
    108 => 'Dispel Mechanic',
    109 => 'Summon Dead Pet',
    110 => 'Destroy All Totems',
    111 => 'Durability Damage',
    112 => 'Summon Demon',
    113 => 'Resurrect (Flat)',
    114 => 'Attack Me'
);

$spell_cols[0] = array('spellID', 'iconname', 'effect1itemtype', 'effect1Aura');
$spell_cols[1] = array('spellID', 'iconname', 'durationID', 'tooltip_loc' . $_SESSION['locale'], 'spellname_loc' . $_SESSION['locale'], 'rank_loc' . $_SESSION['locale'], 'rangeID', 'manacost', 'manacostpercent', 'spellcasttimesID', 'cooldown', 'tool1', 'tool2', 'reagent1', 'reagent2', 'reagent3', 'reagent4', 'reagent5', 'reagent6', 'reagent7', 'reagent8', 'effect1BasePoints', 'effect2BasePoints', 'effect3BasePoints', 'effect1Amplitude', 'effect2Amplitude', 'effect3Amplitude', 'effect1DieSides', 'effect2DieSides', 'effect3DieSides', 'effect1ChainTarget', 'effect2ChainTarget', 'effect3ChainTarget', 'reagentcount1', 'reagentcount2', 'reagentcount3', 'reagentcount4', 'reagentcount5', 'reagentcount6', 'reagentcount7', 'reagentcount8', 'effect1radius', 'effect2radius', 'effect3radius', 'effect1MiscValue', 'effect2MiscValue', 'effect3MiscValue', 'ChannelInterruptFlags', 'procChance', 'procCharges', 'effect_1_proc_chance', 'effect_2_proc_chance', 'effect_3_proc_chance', 'effect1itemtype', 'effect1Aura', 'spellTargets', 'dmg_multiplier1');
$spell_cols[2] = array('spellname_loc' . $_SESSION['locale'], 'rank_loc' . $_SESSION['locale'], 'levelspell', 'resistancesID', 'effect1itemtype', 'effect2itemtype', 'effect3itemtype', 'effect1BasePoints', 'effect2BasePoints', 'effect3BasePoints', 'reagent1', 'reagent2', 'reagent3', 'reagent4', 'reagent5', 'reagent6', 'reagent7', 'reagent8', 'reagentcount1', 'reagentcount2', 'reagentcount3', 'reagentcount4', 'reagentcount5', 'reagentcount6', 'reagentcount7', 'reagentcount8', 'iconname', 'effect1Aura', 'effect2Aura', 'effect3Aura');

function spell_duration($base) {
    return round($base / 1000) . ' sec';
}

function spell_desc($spellid, $type='tooltip') {
    global $DB;
    global $spell_cols;
    $spellRow = $DB->selectRow('
		SELECT ?#
		FROM ' . AOWOW . '.aowow_spell, ' . AOWOW . '.aowow_spellicons
		WHERE
			spellID=?
			AND id=spellicon
		LIMIT 1
		', $spell_cols[1], $spellid
    );
    return spell_desc2($spellRow, $type);
}

function spell_desc2($spellRow, $type='tooltip') {
    global $DB;

//	$spellRow = $DB->selectRow('SELECT s.*, i.iconname FROM ' . AOWOW . '.aowow_spell s, ' . AOWOW . '.aowow_spellicons i WHERE s.spellID=? AND i.id=s.spellicon LIMIT 1', $spellID);

    allspellsinfo2($spellRow);

    if (!IsSet($spellRow['duration_base']))
        $lastduration = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spellduration WHERE durationID=? LIMIT 1', $spellRow['durationID']);

    $signs = array('+', '-', '/', '*', '%', '^');

    $data = $spellRow[$type . '_loc' . $_SESSION['locale']];

    if ((!$data) and $type = 'tooltip')
        return '_empty_';

    $pos = 0;
    $str = '';
    while (false !== ($npos = strpos($data, '$', $pos))) {
        if ($npos != $pos)
            $str .= substr($data, $pos, $npos - $pos);
        $pos = $npos + 1;

        if ('$' == substr($data, $pos, 1)) {
            $str .= '$';
            $pos++;
            continue;
        }

        if (!preg_match('/^((([+\-\/*])(\d+);)?(\d*)(?:([lg].*?:.*?);|(\w\d*)))/', substr($data, $pos), $result))
            continue;

        if (empty($exprData[0]))
            $exprData[0] = 1;

        $op = $result[3];
        $oparg = $result[4];
        $lookup = $result[5];
        $var = $result[6] ? $result[6] : $result[7];
        $pos += strlen($result[0]);

        if (!$var)
            continue;

        $exprType = strtolower(substr($var, 0, 1));
        $exprData = explode(':', substr($var, 1));
        switch ($exprType) {
            case 'r':
                if (!IsSet($spellRow['rangeMax']))
                    $spellRow = array_merge($spellRow, $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spellrange WHERE rangeID=? LIMIT 1', $spellRow['rangeID']));

                $base = $spellRow['rangeMax'];

                if ($op && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= $base;
                break;
            case 'z':
                $str .= '&lt;Home&gt;';
                break;
            case 'c':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                $base = $spell['effect' . $exprData[0] . 'BasePoints'] + 1;

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }

                $str .= $base;
                $lastvalue = $base;
                break;
            case 's':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                if (!$exprData[0])
                    $exprData[0] = 1;
                @$base = $spell['effect' . $exprData[0] . 'BasePoints'] + 1;

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }

                @$str .= abs($base) . ($spell['effect' . $exprData[0] . 'DieSides'] > 1 ? ' to ' . abs(($base + $spell['effect' . $exprData[0] . 'DieSides'])) : '');
                $lastvalue = $base;
                break;
            case 'o':
                if ($lookup > 0) {
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                    $lastduration = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spellduration WHERE durationID=? LIMIT 1', $spell['durationID']);
                }
                else
                    $spell = $spellRow;

                if (!$exprData[0])
                    $exprData[0] = 1;
                $base = $spell['effect' . $exprData[0] . 'BasePoints'] + 1;

                if ($spell['effect' . $exprData[0] . 'Amplitude'] <= 0)
                    $spell['effect' . $exprData[0] . 'Amplitude'] = 5000;

                $str .= (($lastduration['durationBase'] / $spell['effect' . $exprData[0] . 'Amplitude']) * abs($base) . ($spell['effect' . $exprData[0] . 'DieSides'] > 1 ? '-' . abs(($base + $spell['effect' . $exprData[0] . 'DieSides'])) : ''));
                break;
            case 't':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                if (!$exprData[0])
                    $exprData[0] = 1;
                $base = $spell['effect' . $exprData[0] . 'Amplitude'] / 1000;

                // TODO!!
                if ($base == 0)
                    $base = 1;
                // !!TODO

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= abs($base);
                $lastvalue = $base;
                break;
            case 'm':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                // TODO!!
                if (!$exprData[0])
                    $exprData[0] = 1;

                $base = $spell['effect' . $exprData[0] . 'BasePoints'] + 1;

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= abs($base);
                $lastvalue = $base;
                break;
            case 'x':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                $base = $spell['effect' . $exprData[0] . 'ChainTarget'];

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= abs($base);
                $lastvalue = $base;
                break;
            case 'q':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                if (!($exprData[0]))
                    $exprData[0] = 1;
                $base = $spell['effect' . $exprData[0] . 'MiscValue'];

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= abs($base);
                $lastvalue = $base;
                break;
            case 'a':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                $exprData[0] = 1; // TODO
                $radius = $DB->selectCell('SELECT radiusBase FROM ' . AOWOW . '.aowow_spellradius WHERE radiusID=? LIMIT 1', $spell['effect' . $exprData[0] . 'radius']);
                $base = $radius;

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= abs($base);
                break;
            case 'h':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                $base = $spell['procChance'];

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= abs($base);
                break;
            case 'f':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                $base = $spell['dmg_multiplier' . $exprData[0]];

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= abs($base);
                break;
            case 'n':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                $base = $spell['procCharges'];

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= abs($base);
                break;
            case 'd':
                if ($lookup > 0) {
                    $spell = $DB->selectRow('SELECT durationBase FROM ' . AOWOW . '.aowow_spell a, ' . AOWOW . '.aowow_spellduration b WHERE a.durationID = b.durationID AND a.spellID=? LIMIT 1', $lookup);
                    @$base = ($spell['durationBase'] > 0 ? $spell['durationBase'] + 1 : 0);
                }
                else
                    $base = ($lastduration['durationBase'] > 0 ? $lastduration['durationBase'] + 1 : 0);

                if ($op && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= spell_duration($base);
                break;
            case 'i':
                $base = $spellRow['spellTargets'];

                if ($op && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= $base;
                break;
            case 'e':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                $base = $spell['effect_' . $exprData[0] . '_proc_value'];

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }

                $str .= $base;
                $lastvalue = $base;
                break;
            case 'v':
                $base = $spell['affected_target_level'];

                if ($op && $oparg > 0 && $base > 0) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= $base;
                break;
            case 'u':
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=?d LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

//				$base = $spell['effect_'.$exprData[0].'_misc_value'];
                if (isset($spell['effect' . $exprData[0] . 'MiscValue']))
                    $base = $spell['effect' . $exprData[0] . 'MiscValue'];

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= abs($base);
                $lastvalue = $base;
                break;
            case 'b': // only used at one spell (14179) should be 20, column 110/111/112?)
                if ($lookup > 0)
                    $spell = $DB->selectRow('SELECT * FROM ' . AOWOW . '.aowow_spell WHERE spellID=? LIMIT 1', $lookup);
                else
                    $spell = $spellRow;

                $base = $spell['effect_' . $exprData[0] . '_proc_chance'];

                if (in_array($op, $signs) && is_numeric($oparg) && is_numeric($base)) {
                    $equation = $base . $op . $oparg;
                    eval('$base = $equation;');
                }
                $str .= abs($base);
                $lastvalue = $base;
                break;
            case 'l':
                if ($lastvalue > 1)
                    $str .= $exprData[1];
                else
                    $str .= $exprData[0];
                break;
            case 'g':
                $str .= $exprData[0];
                break;
            default:
                $str .= "[{$var} ($op::$oparg::$lookup::$exprData[0])]";
        }
    }
    $str .= substr($data, $pos);

    $str = @preg_replace_callback("|\{([^\}]+)\}|", create_function('$matches', 'return eval("return abs(".$matches[1].");");'), $str);

    return($str);
}

function render_spell_tooltip(&$row) {
    // БД
    global $DB;

    // Время каста
    if ($row['spellcasttimesID'] > 1)
        $casttime = ($DB->selectCell('SELECT base FROM ' . AOWOW . '.aowow_spellcasttimes WHERE id=? LIMIT 1', $row['spellcasttimesID'])) / 1000;
    // Дальность действия
    $range = $DB->selectCell('SELECT rangeMax FROM ' . AOWOW . '.aowow_spellrange WHERE rangeID=? LIMIT 1', $row['rangeID']);

    // Реагенты
    $reagents = array();
    $i = 0;
    for ($j = 1; $j <= 8; $j++) {
        if ($row['reagent' . $j]) {
            $reagents[$i] = array();
            // Имя реагента
            $reagents[$i]['name'] = $DB->selectCell("SELECT name FROM " . WORLD . ".item_template WHERE entry=? LIMIT 1", $row['reagent' . $j]);
            // Количество реагентов
            $reagents[$i]['count'] = $row['reagentcount' . $j];
            $i++;
        }
    }

    // Инструменты
    $tools = array();
    $i = 0;
    for ($j = 1; $j <= 2; $j++) {
        if ($row['tool' . $j]) {
            $tools[$i] = array();
            // Имя инструмента
            $tools[$i]['name'] = $DB->selectCell("SELECT name FROM " . WORLD . ".item_template  WHERE entry=? LIMIT 1", $row["tool" . $j]);
            $i++;
        }
    }

    // До подсказка о спелле
    $desc = spell_desc2($row);

    $x = '';
    $x .= '<table><tr><td>';

    if ($row['rank_loc' . $_SESSION['locale']])
        $x .= '<table width="100%"><tr><td>';

    $x .= '<b>' . $row['spellname_loc' . $_SESSION['locale']] . '</b><br />';

    if ($row['rank_loc' . $_SESSION['locale']])
        $x .= '</td><th><b class="q0">' . $row['rank_loc' . $_SESSION['locale']] . '</b></th></tr></table>';

    if (($range) and (($row['manacost'] > 0) or ($row['manacostpercent'] > 0)))
        $x .= '<table width="100%"><tr><td>';

    if ($row['manacost'] > 0)
        $x .= $row['manacost'] . ' mana<br />';

    if ($row['manacostpercent'] > 0)
        $x .= $row['manacostpercent'] . "% of base mana<br />";

    if (($range) and (($row['manacost'] > 0) or ($row['manacostpercent'] > 0)))
        $x .= '</td><th>';

    if ($range)
        $x .= $range . ' yd range<br />';

    if (($range) and (($row['manacost'] > 0) or ($row['manacostpercent'] > 0)))
        $x .= '</th></tr></table>';

    if ((($row['ChannelInterruptFlags']) or (isset($casttime)) or ($row['spellcasttimesID'] == 1)) and ($row['cooldown']))
        $x .= '<table width="100%"><tr><td>';

    if ($row['ChannelInterruptFlags'])
        $x .= 'Channeled';
    elseif (isset($casttime))
        $x .= $casttime . ' sec cast';
    elseif ($row['spellcasttimesID'] == 1)
        $x .= 'Instant';

    if ((($row['ChannelInterruptFlags']) or (isset($casttime)) or ($row['spellcasttimesID'] == 1)) and ($row['cooldown']))
        $x .= '</td><th>';

    if ($row['cooldown'])
        $x.= ($row['cooldown'] / 1000) . ' sec cooldown';

    if ((($row['ChannelInterruptFlags']) or (isset($casttime)) or ($row['spellcasttimesID'] == 1)) and ($row['cooldown']))
        $x .= '</th></tr></table>';

    $x .= '</td></tr></table>';

    if ($reagents) {
        $x .= '<table><tr><td>';
        $x .= 'Reagents: ';
        foreach ($reagents as $i => $reagent) {
            $x .= $reagent['name'];
            if ($reagent['count'] > 1)
                $x .= ' (' . $reagents[$i]['count'] . ')';
            if (!($i >= (count($reagents) - 1)))
                $x .= ', ';
            else
                $x .= '<br>';
        }
        $x .= '</td></tr></table>';
    }

    if ($tools) {
        $x .= '<table><tr><td>';
        $x .= 'Tools: ';
        foreach ($tools as $i => $tool) {
            $x .= $tool['name'];
            if (!($i >= (count($tools) - 1)))
                $x .= ', ';
            else
                $x .= '<br>';
        }
        $x .= '</td></tr></table>';
    }

    if (($desc) and ($desc != '_empty_'))
        $x .= '<table><tr><td><span class="q">' . $desc . '</span></td></tr></table>';

    return $x;
}

function allspellsinfo2(&$row, $level=0) {

    global $DB;

    if (!($row['spellID']))
        return;
    global $allspells;
    $num = $row['spellID'];
    if (isset($allitems[$num]))
        return $allitems[$num];

    // Номер спелла
    $allspells[$num]['entry'] = $row['spellID'];

    // Имя иконки спелла
    if (($row['effect1itemtype']) and (!($row['effect1Aura']))) {
        if (IsSet($allitems[$row['effect1itemtype']]['icon']))
            $allspells[$num]['icon'] = trim($allitems[$row['effect1itemtype']]['icon'], "\r");
        else
            $allspells[$num]['icon'] = trim($DB->selectCell('SELECT iconname FROM ' . AOWOW . '.aowow_icons WHERE id=(SELECT display_id FROM ' . WORLD . '.item_template WHERE entry=?d LIMIT 1) LIMIT 1', $row['effect1itemtype']) , "\r");
    } else {
        $allspells[$num]['icon'] = trim($row['iconname'], "\r");
    }

    // Тултип спелла
    if ($level > 0) {
        $spellNameKey = 'spellname' . '_loc' . $_SESSION['locale'];
        $allspells[$num]['name'] = $row[$spellNameKey] ;
        $allspells[$num]['info'] = render_spell_tooltip($row);
    }

    if ($level == 1)
        return $allspells[$num];
    elseif ($level == 2)
        return $allspells[$num]['info'];
    else
        return;
}

function spell_buff_render($row) {
    global $DB;

    $x = '<table><tr>';

    // Имя баффа
    $x .= '<td><b class="q">' . $row['spellname'] . '</b></td>';

    // Тип диспела
    if ($row['dispeltypeID']) {
        $dispel = $DB->selectCell('SELECT name_loc' . $_SESSION['locale'] . ' FROM ' . AOWOW . '.aowow_spelldispeltype WHERE id=? LIMIT 1', $row['dispeltypeID']);
        $x .= '<th><b class="q">' . $dispel . '</b></th>';
    }

    $x .= '</tr></table>';

    // Подсказка для баффа
    $x .= '<table><tr><td>';

    $x .= spell_desc2($row, 'buff') . '<br>';

    // Длительность баффа
    $duration = $DB->selectCell("SELECT durationBase FROM ' . AOWOW . '.aowow_spellduration WHERE durationID=? LIMIT 1", $row['durationID']);
    if ($duration > 0)
        $x .= '<span class="q">' . ($duration / 1000) . ' seconds remaining</span>';

    $x .= '</td></tr></table>';

    return $x;
}

function allspellsinfo($id, $level=0) {
    global $DB;
    global $allspells;
    global $spell_cols;
    if (isset($allitems[$id]))
        return $allitems[$id];
    $row = $DB->selectRow('
		SELECT ?#
		FROM ' . AOWOW . '.aowow_spell s, ' . AOWOW . '.aowow_spellicons i
		WHERE
			s.spellID=?
			AND i.id = s.spellicon
		LIMIT 1
		', $spell_cols[$level], $id
    );

    if ($row)
        return allspellsinfo2($row, $level);
    else
        return;
}

// Подробная информация о спеле
function spellinfo($id) {
    global $DB;
    $row = $DB->selectRow('
		SELECT s.*, i.iconname
		FROM ' . AOWOW . '.aowow_spell s, ' . AOWOW . '.aowow_spellicons i
		WHERE
			s.spellID=?
			AND i.id = s.spellicon
		LIMIT 1
		', $id
    );
    return spellinfo2($row);
}

function spellinfo2(&$row) {
    global $DB;
    global $item_cols;

    if ($row) {
        $spell = array();
        $spell['entry'] = $row['spellID'];
        $spell['quality'] = '@';
        $spell['name'] = $row['spellname_loc' . $_SESSION['locale']];
        $spell['rank'] = $row['rank_loc' . $_SESSION['locale']];
        $spell['level'] = $row['levelspell'];
        $spell['school'] = $row['resistancesID'];
        // TODO: Что за cat?
        $spell['cat'] = 0;
        // Скилл
//		if(!(isset($row['skillID'])))
//		$skillrow = list($row['skillID'],$row['req_skill_value'],$row['min_value'],$row['max_value']);//$DB->selectRow('SELECT skillID, req_skill_value, min_value, max_value  FROM ' . AOWOW . '.aowow_skill_line_ability WHERE spellID=?d LIMIT 1', $spell['entry']);
        if (isset($row['skillID'])) {
//			if($skillrow['req_skill_value'] != 1)
//				$spell['learnedat'] = $skillrow['req_skill_value'];
            // TODO: На каком уровне скилла можно обучиться спеллу (поле learnedat)
            if ($row['min_value'] and $row['max_value']) {
                $spell['colors'] = array();
                $spell['colors'][0] = '';
                $spell['colors'][1] = $row['min_value'];
                $spell['colors'][2] = floor(($row['max_value'] + $row['min_value']) / 2);
                $spell['colors'][3] = $row['max_value'];
            }
            $spell['skill'] = $row['skillID'];
        }

        // Реагенты
        $spell['reagents'] = array();
        $i = 0;
        global $allitems;
        for ($j = 1; $j <= 8; $j++) {
            if ($row['reagent' . $j]) {
                $spell['reagents'][$i] = array();
                // ID реагента
                $spell['reagents'][$i]['entry'] = $row['reagent' . $j];
                // Доп данные о реагенте
                // Если данных для этой вещи ещё нет:
                allitemsinfo($spell['reagents'][$i]['entry'], 0);
                // Количество реагентов
                $spell['reagents'][$i]['count'] = $row['reagentcount' . $j];
                $i++;
            }
        }

        // Создает вещь:
        $i = 0;
        for ($j = 1; $j <= 3; $j++)
            if (isset($row['effect' . $j . 'id']) && $row['effect' . $j . 'id'] == 24) {
                $spell['creates'][$i] = array();
                $spell['creates'][$i]['entry'] = $row['effect' . $j . 'itemtype'];
                $spell['creates'][$i]['count'] = $row['effect' . $j . 'BasePoints'] + 1;
                if (!(isset($allitems[$spell['creates'][$i]['entry']]))) {
                    $createrow = $DB->selectRow('
						SELECT ?#
						FROM ' . WORLD . '.item_template, ' . AOWOW . '.aowow_icons
						WHERE
							entry=?d
							AND id=display_id
						LIMIT 1', $item_cols[0], $spell['creates'][$i]['entry']
                    );
                    allitemsinfo2($createrow, 0);
                }
                if (!(isset($allitems[$spell['creates'][$i]['entry']]))) {
                    // Если так и не существует - нет соответствующей записи в таблице вещей
                    $spell['quality'] = 6;
                } else {
                    $spell['quality'] = 6 - $allitems[$spell['creates'][$i]['entry']]['quality'];
                }
                $i++;
            }

        allspellsinfo2($row, 0);

        return $spell;
    } else {
        return;
    }
}
