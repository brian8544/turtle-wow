-- https://turtle-wow.org/bug-report?id=6407 Forlorn summit scourgestones dropping correctly now.
update creature_loot_template set condition_id = 17 where item = 12840 and entry in (61766,61767,61769);
-- https://turtle-wow.org/bug-report?id=7341 NPCs Wavecrest Siren, Wavecrest Tidefinder ,Spitefin Wavecreaper ,Spitefin Tidehunter have money loot now.
update creature_template set gold_min = 126, gold_max = 170 where entry = 61131;
update creature_template set gold_min = 126, gold_max = 170 where entry = 61130;
update creature_template set gold_min = 126, gold_max = 170 where entry = 61087;
update creature_template set gold_min = 126, gold_max = 170 where entry = 61086;
update creature_template set gold_min = 126, gold_max = 170 where entry = 61085;
update creature_template set gold_min = 126, gold_max = 170 where entry = 61083;
-- https://turtle-wow.org/bug-report?id=6989 New loot table for NPC Leprous Worker has been added.
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4412, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 70188, 0.02, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4593, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4606, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 5578, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6211, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6344, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 70155, 0.02, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4409, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4348, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4347, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4346, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4345, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4297, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4296, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6348, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6375, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6390, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 70152, 0.02, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 70143, 0.02, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 70142, 0.02, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 70117, 0.02, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 70111, 0.02, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 70110, 0.02, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 11039, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 11038, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 10424, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 7364, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 7363, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 7360, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 7092, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 7091, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6716, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6454, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4293, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4292, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2835, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2996, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2449, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2450, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2881, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2453, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2771, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2455, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2601, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2409, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2883, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2997, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 3612, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 785, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 3393, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 3608, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 422, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 3394, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 30014, 0.025, 0, -30014, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 30012, 0.025, 0, -30012, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 30010, 0.025, 0, -30010, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 30023, 0.025, 0, -30023, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 10405, 0.031, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 5576, 0.031, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 5575, 0.031, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4694, 0.031, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 11081, 0.04, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4410, 0.04, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4350, 0.04, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4349, 0.04, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4538, 0.04, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4542, 0.04, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6347, 0.04, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 858, 0.04, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 30013, 0.05, 0, -30013, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 14170, 0.06, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6044, 0.06, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 10316, 0.06, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 804, 0.0621, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 5972, 0.08, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2700, 0.08, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4294, 0.08, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6391, 0.1, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6579, 0.1241, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 857, 0.1551, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6566, 0.1862, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 55249, 0.2172, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 6588, 0.2792, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 1478, 0.3, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 1712, 0.36, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 954, 0.42, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 1705, 0.4344, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 3012, 0.56, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 1210, 0.76, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 30022, 1, 0, -30022, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 30009, 1, 0, -30009, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 30011, 1, 0, -30011, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 3385, 1.0239, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 929, 1.3962, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 1206, 1.8, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 4306, 1.8616, 0, 1, 3, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 1445, 2.265, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 1205, 2.8545, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 3770, 4.8712, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 30008, 5, 0, -30008, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2589, 7.8809, 0, 2, 5, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (61027, 2592, 23.5185, 0, 2, 4, 0);
-- https://turtle-wow.org/bug-report?id=5610 Item Nightsaber Fang doesn't drop from NPC Crimson Lynx now.
update creature_template set loot_id = 80250 where entry = 80250;
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 765, 0.18, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 766, 0.3, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 767, 0.24, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 768, 0.12, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 774, 2.44, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 785, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 805, 0.25, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 818, 0.72, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 828, 0.25, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 2406, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 2407, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 2408, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 2447, 0.2, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 2449, 0.14, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 2452, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 2553, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 2555, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 2598, 0.2, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 3189, 0.28, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 3190, 0.28, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 3609, 0.2, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 3610, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 4408, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 4496, 0.25, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 4560, 0.12, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 4563, 0.12, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 4565, 0.12, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 4813, 22.9104, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 4814, 73.0866, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 5503, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 5571, 0.25, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 5572, 0.25, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 6271, 0.04, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 6342, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 7288, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 7971, 0.02, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 8177, 0.3, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 8179, 0.08, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 8181, 0.12, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 8182, 0.3, 0, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 30019, 0.5, 0, -30019, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 50298, 0.2, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 56021, 0.02, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 56022, 0.2, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 70141, 0.02, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 70150, 0.2, 5, 1, 1, 0);
replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (80250, 81094, 0.36, 5, 1, 1, 0);