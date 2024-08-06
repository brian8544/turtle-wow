-- Solid chest in 25-30 zone contains items of lvl 5 
-- https://github.com/slowtorta/turtlewow-bug-tracker/issues/2784

DELETE FROM `gameobject_loot_template` WHERE `entry` = 2281;

REPLACE INTO `gameobject_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES 
(2281, 422, 0, 4, 1, 1, 0),
(2281, 783, 0, 2, 1, 1, 0),
(2281, 785, 0, 2, 1, 1, 0),
(2281, 789, 0, 1, 1, 1, 0),
(2281, 790, 0, 1, 1, 1, 0),
(2281, 804, 0.5, 0, 1, 1, 0),
(2281, 857, 0.5, 0, 1, 1, 0),
(2281, 858, 25, 0, 1, 1, 0),
(2281, 929, 25, 0, 1, 1, 0),
(2281, 1205, 0, 4, 1, 1, 0),
(2281, 1206, 0.5, 0, 1, 1, 0),
(2281, 1210, 0.5, 0, 1, 1, 0),
(2281, 1705, 0.5, 0, 1, 1, 0),
(2281, 1746, 0, 3, 1, 1, 0),
(2281, 1747, 0, 3, 1, 1, 0),
(2281, 1748, 0, 3, 1, 1, 0),
(2281, 1749, 0, 3, 1, 1, 0),
(2281, 1750, 0, 3, 1, 1, 0),
(2281, 1751, 0, 3, 1, 1, 0),
(2281, 1752, 0, 3, 1, 1, 0),
(2281, 1753, 0, 3, 1, 1, 0),
(2281, 1772, 0, 3, 1, 1, 0),
(2281, 1774, 0, 3, 1, 1, 0),
(2281, 1775, 0, 3, 1, 1, 0),
(2281, 1776, 0, 3, 1, 1, 0),
(2281, 1777, 0, 3, 1, 1, 0),
(2281, 1778, 0, 3, 1, 1, 0),
(2281, 1795, 0, 3, 1, 1, 0),
(2281, 1796, 0, 3, 1, 1, 0),
(2281, 1797, 0, 3, 1, 1, 0),
(2281, 1798, 0, 3, 1, 1, 0),
(2281, 1799, 0, 3, 1, 1, 0),
(2281, 1800, 0, 3, 1, 1, 0),
(2281, 1801, 0, 3, 1, 1, 0),
(2281, 1802, 0, 3, 1, 1, 0),
(2281, 1818, 0, 3, 1, 1, 0),
(2281, 1819, 0, 3, 1, 1, 0),
(2281, 1820, 0, 3, 1, 1, 0),
(2281, 1821, 0, 3, 1, 1, 0),
(2281, 1822, 0, 3, 1, 1, 0),
(2281, 1823, 0, 3, 1, 1, 0),
(2281, 1824, 0, 3, 1, 1, 0),
(2281, 2219, 0, 3, 1, 1, 0),
(2281, 2220, 0, 3, 1, 1, 0),
(2281, 2318, 0, 2, 1, 1, 0),
(2281, 2319, 0, 2, 1, 1, 0),
(2281, 2450, 0, 2, 1, 1, 0),
(2281, 2452, 0, 2, 1, 1, 0),
(2281, 2453, 0, 2, 1, 1, 0),
(2281, 2455, 25, 0, 1, 1, 0),
(2281, 2592, 0, 2, 1, 1, 0),
(2281, 2765, 0, 3, 1, 1, 0),
(2281, 2770, 0, 2, 1, 1, 0),
(2281, 2771, 0, 2, 1, 1, 0),
(2281, 2775, 0, 2, 1, 1, 0),
(2281, 2782, 0, 3, 1, 1, 0),
(2281, 2783, 0, 3, 1, 1, 0),
(2281, 2836, 0, 2, 1, 1, 0),
(2281, 2842, 0, 2, 1, 1, 0),
(2281, 2991, 0, 1, 1, 1, 0),
(2281, 2996, 0, 2, 1, 1, 0),
(2281, 2997, 0, 2, 1, 1, 0),
(2281, 3057, 0, 1, 1, 1, 0),
(2281, 3058, 0, 1, 1, 1, 0),
(2281, 3066, 0, 1, 1, 1, 0),
(2281, 3193, 0, 1, 1, 1, 0),
(2281, 3198, 0, 1, 1, 1, 0),
(2281, 3199, 0, 1, 1, 1, 0),
(2281, 3355, 0, 2, 1, 1, 0),
(2281, 3356, 0, 2, 1, 1, 0),
(2281, 3378, 0, 3, 1, 1, 0),
(2281, 3379, 0, 3, 1, 1, 0),
(2281, 3385, 25, 0, 1, 1, 0),
(2281, 3577, 0, 2, 1, 1, 0),
(2281, 3740, 0, 1, 1, 1, 0),
(2281, 3770, 0, 4, 1, 1, 0),
(2281, 4350, 0.5, 0, 1, 1, 0),
(2281, 4538, 0, 4, 1, 1, 0),
(2281, 4542, 0, 4, 1, 1, 0),
(2281, 4568, 0, 1, 1, 1, 0),
(2281, 4576, 0, 1, 1, 1, 0),
(2281, 4606, 0, 4, 1, 1, 0),
(2281, 4698, 0, 3, 1, 1, 0),
(2281, 4710, 0, 1, 1, 1, 0),
(2281, 5498, 0.5, 0, 1, 1, 0),
(2281, 5500, 0.5, 0, 1, 1, 0),
(2281, 5575, 0.5, 0, 1, 1, 0),
(2281, 5576, 0.5, 0, 1, 1, 0),
(2281, 5972, 0.5, 0, 1, 1, 0),
(2281, 6381, 0, 1, 1, 1, 0),
(2281, 6565, 0, 1, 1, 1, 0),
(2281, 6568, 0, 1, 1, 1, 0),
(2281, 6573, 0, 1, 1, 1, 0),
(2281, 6582, 0, 1, 1, 1, 0),
(2281, 6583, 0, 1, 1, 1, 0),
(2281, 6584, 0, 1, 1, 1, 0),
(2281, 6586, 0, 1, 1, 1, 0),
(2281, 6588, 0, 3, 1, 1, 0),
(2281, 9805, 0, 1, 1, 1, 0),
(2281, 11038, 0.5, 0, 1, 1, 0),
(2281, 14171, 0, 1, 1, 1, 0),
(2281, 15211, 0, 1, 1, 1, 0),
(2281, 15223, 0, 1, 1, 1, 0),
(2281, 15224, 0, 1, 1, 1, 0),
(2281, 15230, 0, 1, 1, 1, 0),
(2281, 15259, 0, 1, 1, 1, 0),
(2281, 15269, 0, 1, 1, 1, 0);

