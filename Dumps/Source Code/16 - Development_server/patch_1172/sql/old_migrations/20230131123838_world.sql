-- Make non-tameabale. Should not be beast npc 49005.
update creature_template set beast_family = 0, type = 7, type_flags = 0 where entry = 49005;
-- Missing loot tables for Fishing in Gillijim's Isle #2780.
-- Gillijim's Isle general fish loottable.
REPLACE INTO `fishing_loot_template` VALUES (408, 6358, 9.6802, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (408, 10096, 0.1155, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (408, 13443, 0.2889, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (408, 13757, 9.589, 1, 1, 1, 81);
REPLACE INTO `fishing_loot_template` VALUES (408, 13758, 5.4795, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (408, 13759, 12.3288, 1, 1, 1, 82);
REPLACE INTO `fishing_loot_template` VALUES (408, 13760, 16.4384, 1, 1, 1, 81);
REPLACE INTO `fishing_loot_template` VALUES (408, 13889, 0.05, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (408, 13890, 14.3836, 1, 1, 1, 82);
REPLACE INTO `fishing_loot_template` VALUES (408, 13901, 0.1733, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (408, 13903, 0.1155, 1, 1, 1, 0);
-- Gillijim's Isle Fishing pools.
delete from gameobject where position_z between -0.0013 and -0.0011 and id in (180751,180752,180712,180582);
delete from gameobject where position_z between 21.9731 and 21.9733 and id in (180752);
INSERT INTO `gameobject` (`id`, `map`, `position_x`, `position_y`, `position_z`, `orientation`, `rotation0`, `rotation1`, `rotation2`, `rotation3`, `spawntimesecsmin`, `spawntimesecsmax`, `animprogress`, `state`, `spawn_flags`, `visibility_mod`) VALUES
(180751, 0,   -13466, 2862.48, -0.0012, 0.148891, 0, 0, 0.0743769, 0.99723, 300, 300, 100, 1, 0, 0),
(180751, 0, -13502.1, 2875.67, -0.0012, 3.1341, 0, 0, 0.999993, 0.0037455, 300, 300, 100, 1, 0, 0),
(180751, 0, -13563.1, 2862.59, -0.0012, 3.46633, 0, 0, 0.986848, -0.161654, 300, 300, 100, 1, 0, 0),
(180751, 0, -13653.5, 2879.88, -0.0012, 2.36363, 0, 0, 0.925295, 0.379248, 300, 300, 100, 1, 0, 0),
(180751, 0, -13747.6, 2655.57, -0.0012, 4.2649, 0, 0, 0.846376, -0.532586, 300, 300, 100, 1, 0, 0),
(180751, 0, -13871.5, 2555.33, -0.0012, 3.37033, 0, 0, 0.993467, -0.114119, 300, 300, 100, 1, 0, 0),
(180751, 0, -14017.2, 2482.21, -0.0012, 3.70465, 0, 0, 0.960632, -0.277823, 300, 300, 100, 1, 0, 0),
(180751, 0, -14151.5, 2478.65, -0.0012, 3.16892, 0, 0, 0.999907, -0.0136624, 300, 300, 100, 1, 0, 0),
(180751, 0, -14273.5, 2536.37, -0.0012, 2.70658, 0, 0, 0.976438, 0.215796, 300, 300, 100, 1, 0, 0),
(180751, 0, -14310.5, 2632.94, -0.0012, 1.98454, 0, 0, 0.837268, 0.546792, 300, 300, 100, 1, 0, 0),
(180752, 0,   -13881, 3121.78, 21.9732, 2.71164, 0, 0, 0.976981, 0.213326, 300, 300, 100, 1, 0, 0),
(180752, 0, -13888.1, 3012.81, 21.9732, 1.54009, 0, 0, 0.696166, 0.717881, 300, 300, 100, 1, 0, 0),
(180752, 0, -13859.1, 2936.63, 21.9732, 5.11627, 0, 0, 0.550914, -0.834562, 300, 300, 100, 1, 0, 0),
(180752, 0,   -13777, 2877.69, -0.0012, 2.30716, 0, 0, 0.91422, 0.405218, 300, 300, 100, 1, 0, 0),
(180752, 0, -13690.1, 2893.03, -0.0012, 1.64481, 0, 0, 0.732783, 0.680462, 300, 300, 100, 1, 0, 0),
(180752, 0, -13532.2, 2866.84, -0.0012, 1.6592, 0, 0, 0.737662, 0.67517, 300, 300, 100, 1, 0, 0),
(180752, 0, -13342.5, 2796.18, -0.0012, 5.56403, 0, 0, 0.351881, -0.936045, 300, 300, 100, 1, 0, 0),
(180752, 0, -13770.5, 2702.02, -0.0012, 3.12371, 0, 0, 0.99996, 0.00894328, 300, 300, 100, 1, 0, 0),
(180752, 0, -13767.6, 2575.44, -0.0012, 0.67108, 0, 0, 0.329279, 0.944233, 300, 300, 100, 1, 0, 0),
(180752, 0, -14014.7, 2454.68, -0.0012, 3.93484, 0, 0, 0.922371, -0.386306, 300, 300, 100, 1, 0, 0),
(180752, 0, -14099.1, 2476.02, -0.0012, 3.20442, 0, 0, 0.999507, -0.0314077, 300, 300, 100, 1, 0, 0),
(180752, 0, -14251.1,  2526.4, -0.0012, 2.79252, 0, 0, 0.984807, 0.173652, 300, 300, 100, 1, 0, 0),
(180752, 0, -14338.8, 2556.92, -0.0012, 3.53001, 0, 0, 0.981201, -0.192989, 300, 300, 100, 1, 0, 0),
(180712, 0, -14333.8, 2550.36, -0.0012, 6.19853, 0, 0, 0.0423132, -0.999104, 300, 300, 100, 1, 0, 0),
(180712, 0, -14341.8,  2373.6, -0.0012, 6.21772, 0, 0, 0.0327244, -0.999464, 300, 300, 100, 1, 0, 0),
(180712, 0, -14182.5, 1975.75, -0.0012, 5.54097, 0, 0, 0.362648, -0.931926, 300, 300, 100, 1, 0, 0),
(180712, 0, -14069.9, 1966.36, -0.0012, 5.1234, 0, 0, 0.547934, -0.836521, 300, 300, 100, 1, 0, 0),
(180712, 0, -14098.2, 1858.32, -0.0012, 0.237353, 0, 0, 0.118398, 0.992966, 300, 300, 100, 1, 0, 0),
(180712, 0, -14006.2, 2182.08, -0.0012, 1.51677, 0, 0, 0.687749, 0.725948, 300, 300, 100, 1, 0, 0),
(180712, 0, -13675.8, 2140.65, -0.0012, 6.24486, 0, 0, 0.0191597, -0.999816, 300, 300, 100, 1, 0, 0),
(180712, 0, -13562.2, 2216.23, -0.0012, 0.110468, 0, 0, 0.055206, 0.998475, 300, 300, 100, 1, 0, 0),
(180712, 0, -13490.1, 2384.05, -0.0012, 1.0272, 0, 0, 0.491317, 0.870981, 300, 300, 100, 1, 0, 0),
(180712, 0, -13329.4, 2662.12, -0.0012, 2.52425, 0, 0, 0.952739, 0.303791, 300, 300, 100, 1, 0, 0),
(180712, 0, -13343,   2777.51, -0.0012, 0.537196, 0, 0, 0.26538, 0.964144, 300, 300, 100, 1, 0, 0),
(180712, 0, -13614.8, 3171.57, -0.0012, 3.92575, 0, 0, 0.924118, -0.382108, 300, 300, 100, 1, 0, 0),
(180712, 0, -13594.2, 3276.35, -0.0012, 2.95622, 0, 0, 0.995708, 0.0925554, 300, 300, 100, 1, 0, 0),
(180712, 0, -13784.9, 3399.06, -0.0012, 2.68264, 0, 0, 0.973785, 0.22747, 300, 300, 100, 1, 0, 0),
(180712, 0, -13982.2, 3441.41, -0.0012, 2.02509, 0, 0, 0.848182, 0.529705, 300, 300, 100, 1, 0, 0),
(180712, 0, -14131.7, 3593.16, -0.0012, 4.46331, 0, 0, 0.789464, -0.613797, 300, 300, 100, 1, 0, 0),
(180712, 0, -14266.7, 3535.57, -0.0012, 3.96895, 0, 0, 0.915648, -0.401981, 300, 300, 100, 1, 0, 0),
(180582, 0, -14338.5, 2685.24, -0.0012, 1.49113, 0, 0, 0.678388, 0.734704, 300, 300, 100, 1, 0, 0),
(180582, 0, -14275.4, 2563.88, -0.0012, 5.55164, 0, 0, 0.357669, -0.933849, 300, 300, 100, 1, 0, 0),
(180582, 0, -14321.6, 2460.35, -0.0012, 4.51012, 0, 0, 0.774885, -0.632102, 300, 300, 100, 1, 0, 0),
(180582, 0, -14060.7, 1888.91, -0.0012, 1.22193, 0, 0, 0.573657, 0.819096, 300, 300, 100, 1, 0, 0),
(180582, 0, -13841.8, 2143.14, -0.0012, 2.17226, 0, 0, 0.884829, 0.465915, 300, 300, 100, 1, 0, 0),
(180582, 0, -13751.9, 2205.3,  -0.0012, 0.991539, 0, 0, 0.475709, 0.879603, 300, 300, 100, 1, 0, 0),
(180582, 0, -13502.6, 2239.76, -0.0012, 0.329185, 0, 0, 0.16385, 0.986485, 300, 300, 100, 1, 0, 0),
(180582, 0, -13431.1, 2457.06, -0.0012, 0.597965, 0, 0, 0.294548, 0.955637, 300, 300, 100, 1, 0, 0),
(180582, 0, -13382.3, 2604.65, -0.0012, 3.16578, 0, 0, 0.999927, -0.0120937, 300, 300, 100, 1, 0, 0),
(180582, 0, -13334,   2667.88, -0.0012, 0.746753, 0, 0, 0.364761, 0.931101, 300, 300, 100, 1, 0, 0),
(180582, 0, -13431.2, 2870.97, -0.0012, 2.76261, 0, 0, 0.9821, 0.188361, 300, 300, 100, 1, 0, 0),
(180582, 0, -13435.8, 3134.83, -0.0012, 3.40575, 0, 0, 0.99129, -0.131697, 300, 300, 100, 1, 0, 0),
(180582, 0, -13645.3, 3287.63, -0.0012, 2.7194, 0, 0, 0.977802, 0.209531, 300, 300, 100, 1, 0, 0),
(180582, 0, -13929.1, 3529.58, -0.0012, 2.99778, 0, 0, 0.997416, 0.0718431, 300, 300, 100, 1, 0, 0),
(180582, 0, -14175.8, 3424.86, -0.0012, 3.86521, 0, 0, 0.935258, -0.353967, 300, 300, 100, 1, 0, 0),
(180582, 0, -14231.3, 3097.23, -0.0012, 4.79285, 0, 0, 0.678094, -0.734976, 300, 300, 100, 1, 0, 0),
(180582, 0, -14267.1, 2878.17, -0.0012, 4.34648, 0, 0, 0.823952, -0.566659, 300, 300, 100, 1, 0, 0);
-- Lapidis Isle general fish loottable.
REPLACE INTO `fishing_loot_template` VALUES (409, 6358, 9.6802, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (409, 10096, 0.1155, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (409, 13443, 0.2889, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (409, 13757, 9.589, 1, 1, 1, 81);
REPLACE INTO `fishing_loot_template` VALUES (409, 13758, 5.4795, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (409, 13759, 12.3288, 1, 1, 1, 82);
REPLACE INTO `fishing_loot_template` VALUES (409, 13760, 16.4384, 1, 1, 1, 81);
REPLACE INTO `fishing_loot_template` VALUES (409, 13889, 0.05, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (409, 13890, 14.3836, 1, 1, 1, 82);
REPLACE INTO `fishing_loot_template` VALUES (409, 13901, 0.1733, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (409, 13903, 0.1155, 1, 1, 1, 0);
-- Lapidis Isle Fishing pools.
delete from gameobject where position_z between -0.0013 and -0.0011 and id in (180750,180901,180902);
delete from gameobject where position_z between 38.7968 and 38.7970 and id in (180753,180712);
INSERT INTO `gameobject` (`id`, `map`, `position_x`, `position_y`, `position_z`, `orientation`, `rotation0`, `rotation1`, `rotation2`, `rotation3`, `spawntimesecsmin`, `spawntimesecsmax`, `animprogress`, `state`, `spawn_flags`, `visibility_mod`) VALUES
(180750, 0, -12395.4, 2887.78, -0.0012, 0.364442, 0, 0, 0.181214, 0.983444, 300, 300, 100, 1, 0, 0),
(180750, 0, -12302.9, 2785.67, -0.0012, 4.80893, 0, 0, 0.672165, -0.740402, 300, 300, 100, 1, 0, 0),
(180750, 0, -12170.1, 2780.66, -0.0012, 0.364536, 0, 0, 0.181261, 0.983435, 300, 300, 100, 1, 0, 0),
(180750, 0, -12056.5, 2869.51, -0.0012, 0.8452, 0, 0, 0.410133, 0.912026, 300, 300, 100, 1, 0, 0),
(180750, 0, -12028.5, 2998.67, -0.0012, 1.47195, 0, 0, 0.671309, 0.741177, 300, 300, 100, 1, 0, 0),
(180750, 0, -11923  , 3088.63, -0.0012, 1.10595, 0, 0, 0.525222, 0.850965, 300, 300, 100, 1, 0, 0),
(180750, 0, -11849.3, 3067.51, -0.0012, 1.01013, 0, 0, 0.483866, 0.875142, 300, 300, 100, 1, 0, 0),
(180750, 0, -11764  , 3066.58, -0.0012, 5.99191, 0, 0, 0.145121, -0.989414, 300, 300, 100, 1, 0, 0),
(180750, 0, -11544.2,  3104.7, -0.0012, 0.388098, 0, 0, 0.192833, 0.981232, 300, 300, 100, 1, 0, 0),
(180750, 0, -11457.8,  3174.5, -0.0012, 0.71718, 0, 0, 0.350954, 0.936393, 300, 300, 100, 1, 0, 0),
(180750, 0, -11454.4, 3254.35, -0.0012, 1.06354, 0, 0, 0.50706, 0.861911, 300, 300, 100, 1, 0, 0),
(180750, 0, -11411.7, 3383.51, -0.0012, 1.77075, 0, 0, 0.774152, 0.633, 300, 300, 100, 1, 0, 0),
(180750, 0, -11298.1, 3177.03, -0.0012, 2.84753, 0, 0, 0.98921, 0.146503, 300, 300, 100, 1, 0, 0),
(180750, 0, -11296.6, 3070.97, -0.0012, 4.55891, 0, 0, 0.759237, -0.650814, 300, 300, 100, 1, 0, 0),
(180750, 0, -11371.2, 3035.51, -0.0012, 2.55509, 0, 0, 0.957309, 0.289066, 300, 300, 100, 1, 0, 0),
(180750, 0, -11415.9, 3108.98, -0.0012, 1.94012, 0, 0, 0.82492, 0.565249, 300, 300, 100, 1, 0, 0),
(180750, 0, -11749.1, 4119.52, -0.0012, 4.36657, 0, 0, 0.81822, -0.574905, 300, 300, 100, 1, 0, 0),
(180750, 0, -11871.5, 4120.28, -0.0012, 3.56406, 0, 0, 0.977773, -0.209668, 300, 300, 100, 1, 0, 0),
(180750, 0, -12048.1, 4073.19, -0.0012, 4.48298, 0, 0, 0.783391, -0.621529, 300, 300, 100, 1, 0, 0),
(180750, 0,   -12175, 4046.58, -0.0012, 3.5994, 0, 0, 0.973915, -0.226911, 300, 300, 100, 1, 0, 0),
(180750, 0, -12279.4, 4010.63, -0.0012, 3.45637, 0, 0, 0.98764, -0.156741, 300, 300, 100, 1, 0, 0),
(180750, 0, -12357.7, 3937.02, -0.0012, 4.60777, 0, 0, 0.743112, -0.669167, 300, 300, 100, 1, 0, 0),
(180750, 0, -12499.9, 3878.09, -0.0012, 3.68929, 0, 0, 0.962737, -0.270438, 300, 300, 100, 1, 0, 0),
(180750, 0,   -12576,  3843.1, -0.0012, 3.4089, 0, 0, 0.991082, -0.133257, 300, 300, 100, 1, 0, 0),
(180750, 0, -12657.2, 3713.72, -0.0012, 5.06531, 0, 0, 0.571998, -0.820255, 300, 300, 100, 1, 0, 0),
(180750, 0, -12395.4, 2887.78, -0.0012, 0.364442, 0, 0, 0.181214, 0.983444, 300, 300, 100, 1, 0, 0),
(180750, 0, -12712.2, 2836.02, -0.0012, 3.09362, 0, 0, 0.999712, 0.0239853, 300, 300, 100, 1, 0, 0),
(180750, 0, -12730.1, 2956.82, -0.0012, 2.05375, 0, 0, 0.855686, 0.517495, 300, 300, 100, 1, 0, 0),
(180750, 0, -12772.3, 3078.13, -0.0012, 2.86219, 0, 0, 0.990257, 0.139249, 300, 300, 100, 1, 0, 0),
(180750, 0, -12872.9, 3009.19, -0.0012, 4.22642, 0, 0, 0.856464, -0.516206, 300, 300, 100, 1, 0, 0),
(180750, 0, -12975.6, 2900.68, -0.0012, 4.5233, 0, 0, 0.770701, -0.637197, 300, 300, 100, 1, 0, 0),
(180750, 0, -13014.4, 2800.21, -0.0012, 4.69374, 0, 0, 0.713671, -0.700481, 300, 300, 100, 1, 0, 0),
(180750, 0, -12998.7, 2640.63, -0.0012, 5.20974, 0, 0, 0.511321, -0.85939, 300, 300, 100, 1, 0, 0),
(180750, 0,   -12889, 2576.93, -0.0012, 1.93437, 0, 0, 0.823292, 0.567618, 300, 300, 100, 1, 0, 0),
(180902, 0, -12005.6, 3149.55, -0.0012, 1.98245, 0, 0, 0.836697, 0.547666, 300, 300, 100, 1, 0, 0),
(180901, 0, -12004.8, 3136.75, -0.0012, 4.78065, 0, 0, 0.682567, -0.730823, 300, 300, 100, 1, 0, 0),
(180901, 0, -11945.9, 3130.98, -0.0012, 4.93468, 0, 0, 0.624315, -0.781172, 300, 300, 100, 1, 0, 0),
(180901, 0, -12007.4, 3069.77, -0.0012, 3.36746, 0, 0, 0.99363, -0.112692, 300, 300, 100, 1, 0, 0),
(180901, 0, -12053.4, 2960.74, -0.0012, 4.02754, 0, 0, 0.90348, -0.42863, 300, 300, 100, 1, 0, 0),
(180901, 0, -11876.9, 3081.39, -0.0012, 1.3153, 0, 0, 0.611259, 0.79143, 300, 300, 100, 1, 0, 0),
(180901, 0, -11507.8,    3203, -0.0012, 2.15524, 0, 0, 0.880834, 0.473425, 300, 300, 100, 1, 0, 0),
(180901, 0, -11466.9, 3132.73, -0.0012, 4.63186, 0, 0, 0.734996, -0.678071, 300, 300, 100, 1, 0, 0),
(180901, 0, -11576.5, 2881.39, -0.0012, 4.99184, 0, 0, 0.601737, -0.798695, 300, 300, 100, 1, 0, 0),
(180901, 0, -11464.7, 3174.14, -0.0012, 1.19488, 0, 0, 0.562527, 0.826779, 300, 300, 100, 1, 0, 0),
(180902, 0, -11293.6, 3130.79, -0.0012, 4.83782, 0, 0, 0.6614, -0.750033, 300, 300, 100, 1, 0, 0),
(180902, 0, -11426.8, 3369.92, -0.0012, 0.9357, 0, 0, 0.450968, 0.89254, 300, 300, 100, 1, 0, 0),
(180902, 0, -11396.6, 3430.75, -0.0012, 2.12121, 0, 0, 0.872652, 0.488343, 300, 300, 100, 1, 0, 0),
(180902, 0, -11377.5, 3628.66, -0.0012, 1.70364, 0, 0, 0.752481, 0.658614, 300, 300, 100, 1, 0, 0),
(180902, 0, -11823.5, 4128.34, -0.0012, 5.72095, 0, 0, 0.277429, -0.960746, 300, 300, 100, 1, 0, 0),
(180902, 0, -12012.1, 4124.05, -0.0012, 3.11954, 0, 0, 0.999939, 0.0110273, 300, 300, 100, 1, 0, 0),
(180901, 0, -12227.4, 4148.43, -0.0012, 3.08594, 0, 0, 0.999613, 0.0278226, 300, 300, 100, 1, 0, 0),
(180901, 0, -12141.6, 4052.77, -0.0012, 3.37872, 0, 0, 0.99298, -0.118285, 300, 300, 100, 1, 0, 0),
(180902, 0, -12012.9, 4008.87, -0.0012, 5.15459, 0, 0, 0.534824, -0.844963, 300, 300, 100, 1, 0, 0),
(180902, 0, -12234.4, 4011.69, -0.0012, 0.407728, 0, 0, 0.202455, 0.979292, 300, 300, 100, 1, 0, 0),
(180902, 0, -12339.6, 3950.87, -0.0012, 4.24266, 0, 0, 0.852247, -0.52314, 300, 300, 100, 1, 0, 0),
(180902, 0, -12457.3, 3900.06, -0.0012, 3.51791, 0, 0, 0.98235, -0.18705, 300, 300, 100, 1, 0, 0),
(180901, 0, -12542.5, 4090.76, -0.0012, 1.81403, 0, 0, 0.787668, 0.616099, 300, 300, 100, 1, 0, 0),
(180902, 0, -12610.7, 3763.68, -0.0012, 4.61659, 0, 0, 0.740153, -0.672439, 300, 300, 100, 1, 0, 0),
(180901, 0, -12937.7, 3635.23, -0.0012, 2.73032, 0, 0, 0.978932, 0.204188, 300, 300, 100, 1, 0, 0),
(180902, 0, -12718.9, 3542.04, -0.0012, 5.8981, 0, 0, 0.191356, -0.981521, 300, 300, 100, 1, 0, 0),
(180902, 0, -12652.2, 3421.26, -0.0012, 0.651638, 0, 0, 0.320085, 0.947389, 300, 300, 100, 1, 0, 0),
(180902, 0, -12511.2, 3446.92, -0.0012, 1.2324, 0, 0, 0.577936, 0.816082, 300, 300, 100, 1, 0, 0),
(180902, 0, -12283.6, 2829.96, -0.0012, 5.61492, 0, 0, 0.327948, -0.944696, 300, 300, 100, 1, 0, 0),
(180902, 0, -12111.7, 2847.51, -0.0012, 1.67877, 0, 0, 0.744233, 0.66792, 300, 300, 100, 1, 0, 0),
(180902, 0, -11983,    3225.4, -0.0012, 3.44068, 0, 0, 0.988839, -0.148986, 300, 300, 100, 1, 0, 0),
(180753, 0, -12015.5, 3322.51, 38.7969, 2.66794, 0, 0, 0.972087, 0.234621, 300, 300, 100, 1, 0, 0),
(180712, 0, -12179.8, 3450.93, 38.7969, 2.96159, 0, 0, 0.995952, 0.0898819, 300, 300, 100, 1, 0, 0),
(180712, 0, -12213.4, 3459.23, 38.7969, 3.57594, 0, 0, 0.97651, -0.215472, 300, 300, 100, 1, 0, 0),
(180712, 0, -12303.5, 3383.73, 38.7969, 3.86802, 0, 0, 0.934759, -0.355282, 300, 300, 100, 1, 0, 0),
(180712, 0, -12330.3, 3355.55, 38.7969, 3.95992, 0, 0, 0.917455, -0.39784, 300, 300, 100, 1, 0, 0),
(180712, 0, -12413.7, 3300.92, 38.7969, 3.45421, 0, 0, 0.987809, -0.155671, 300, 300, 100, 1, 0, 0),
(180753, 0, -12451.6, 3288.67, 38.7969, 3.45421, 0, 0, 0.987809, -0.155671, 300, 300, 100, 1, 0, 0),
(180712, 0, -12238.7, 3498.95, 38.7969, 1.754, 0, 0, 0.768823, 0.639461, 300, 300, 100, 1, 0, 0),
(180753, 0, -12286.6, 3648.35, 38.7969, 1.86238, 0, 0, 0.802332, 0.596878, 300, 300, 100, 1, 0, 0),
(180712, 0, -12290.6, 3623.39, 38.7969, 3.05322, 0, 0, 0.999024, 0.0441717, 300, 300, 100, 1, 0, 0),
(180712, 0, -12262.8, 3578.93, 38.7969, 2.01605, 0, 0, 0.845781, 0.533531, 300, 300, 100, 1, 0, 0);
-- Missing loot tables for fishing on Tel'Abim #2798.
-- Tel'Abim general fish loottable.
REPLACE INTO `fishing_loot_template` VALUES (5121, 6358, 9.6802, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (5121, 10096, 0.1155, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (5121, 13443, 0.2889, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (5121, 13757, 9.589, 1, 1, 1, 81);
REPLACE INTO `fishing_loot_template` VALUES (5121, 13758, 5.4795, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (5121, 13759, 12.3288, 1, 1, 1, 82);
REPLACE INTO `fishing_loot_template` VALUES (5121, 13760, 16.4384, 1, 1, 1, 81);
REPLACE INTO `fishing_loot_template` VALUES (5121, 13889, 0.05, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (5121, 13890, 14.3836, 1, 1, 1, 82);
REPLACE INTO `fishing_loot_template` VALUES (5121, 13901, 0.1733, 1, 1, 1, 0);
REPLACE INTO `fishing_loot_template` VALUES (5121, 13903, 0.1155, 1, 1, 1, 0);
-- Tel'Abim Fishing pools.
delete from gameobject where position_z between -0.0015 and -0.0013 and id in (180751,180752,180712,180750);
INSERT INTO `gameobject` (`id`, `map`, `position_x`, `position_y`, `position_z`, `orientation`, `rotation0`, `rotation1`, `rotation2`, `rotation3`, `spawntimesecsmin`, `spawntimesecsmax`, `animprogress`, `state`, `spawn_flags`, `visibility_mod`) VALUES
(180751, 1, -8471.03, -6439.94, -0.0014, 3.83658, 0, 0, 0.940229, -0.340542, 300, 300, 100, 1, 0, 0),
(180751, 1, -8730.17, -6423.96, -0.0014, 3.53812, 0, 0, 0.98041, -0.196969, 300, 300, 100, 1, 0, 0),
(180751, 1, -8884.17, -6443.5 , -0.0014, 3.26934, 0, 0, 0.997961, -0.0638313, 300, 300, 100, 1, 0, 0),
(180751, 1, -9149.32, -6596.04, -0.0014, 4.31567, 0, 0, 0.832584, -0.553898, 300, 300, 100, 1, 0, 0),
(180751, 1, -9045.55, -7064.99, -0.0014, 5.30441, 0, 0, 0.470087, -0.88262, 300, 300, 100, 1, 0, 0),
(180751, 1, -8792.39, -7274.61, -0.0014, 5.94757, 0, 0, 0.167024, -0.985953, 300, 300, 100, 1, 0, 0),
(180751, 1, -7961.65, -7138.49, -0.0014, 0.681912, 0, 0, 0.334388, 0.942435, 300, 300, 100, 1, 0, 0),
(180751, 1, -8187.51, -6455.34, -0.0014, 3.27853, 0, 0, 0.997657, -0.0684129, 300, 300, 100, 1, 0, 0),
(180752, 1, -8579.93, -6444.72, -0.0014, 3.33132, 0, 0, 0.995504, -0.0947216, 300, 300, 100, 1, 0, 0),
(180752, 1, -8694.23, -6432.58, -0.0014, 3.70089, 0, 0, 0.961152, -0.27602, 300, 300, 100, 1, 0, 0),
(180752, 1, -8802.57, -6461.48, -0.0014, 1.41146, 0, 0, 0.64859, 0.761138, 300, 300, 100, 1, 0, 0),
(180752, 1, -8869.26, -6443.41, -0.0014, 4.20486, 0, 0, 0.86198, -0.506941, 300, 300, 100, 1, 0, 0),
(180752, 1, -9058.6,  -6488.01, -0.0014, 4.21445, 0, 0, 0.85954, -0.511068, 300, 300, 100, 1, 0, 0),
(180752, 1, -9118.04, -6550.93, -0.0014, 1.85258, 0, 0, 0.799396, 0.600804, 300, 300, 100, 1, 0, 0),
(180752, 1, -9171.95, -6702.25, -0.0014, 4.57923, 0, 0, 0.752585, -0.658495, 300, 300, 100, 1, 0, 0),
(180752, 1, -9108.25, -6896.32, -0.0014, 5.43358, 0, 0, 0.412143, -0.911119, 300, 300, 100, 1, 0, 0),
(180752, 1, -9131.07, -7065.41, -0.0014, 4.44004, 0, 0, 0.796552, -0.60457, 300, 300, 100, 1, 0, 0),
(180752, 1, -9130.14, -7209.61, -0.0014, 5.45278, 0, 0, 0.403376, -0.915034, 300, 300, 100, 1, 0, 0),
(180752, 1, -9000.2,  -7252.66, -0.0014, 0.403111, 0, 0, 0.200193, 0.979756, 300, 300, 100, 1, 0, 0),
(180752, 1, -8847.91, -7162.05, -0.0014, 0.619096, 0, 0, 0.304628, 0.952471, 300, 300, 100, 1, 0, 0),
(180752, 1, -8754.97, -7240.05, -0.0014, 5.61597, 0, 0, 0.327453, -0.944867, 300, 300, 100, 1, 0, 0),
(180712, 1, -8681.32, -7245.1 , -0.0014, 0.676692, 0, 0, 0.331927, 0.943305, 300, 300, 100, 1, 0, 0),
(180712, 1, -8557.36, -7272.15, -0.0014, 0.0143493, 0, 0, 0.00717457, 0.999974, 300, 300, 100, 1, 0, 0),
(180712, 1, -8405.96, -7258.75, -0.0014, 0.249532, 0, 0, 0.124443, 0.992227, 300, 300, 100, 1, 0, 0),
(180712, 1, -8244.91, -7230.7 , -0.0014, 0.172738, 0, 0, 0.0862616, 0.996273, 300, 300, 100, 1, 0, 0),
(180712, 1, -8049.15, -7269.17, -0.0014, 0.297527, 0, 0, 0.148215, 0.988955, 300, 300, 100, 1, 0, 0),
(180712, 1, -7883.86, -7171.26, -0.0014, 0.0239463, 0, 0, 0.0119729, 0.999928, 300, 300, 100, 1, 0, 0),
(180712, 1, -7832.41, -6936.16, -0.0014, 1.53584, 0, 0, 0.69464, 0.719357, 300, 300, 100, 1, 0, 0),
(180712, 1, -7804.69, -6742.52, -0.0014, 1.71343, 0, 0, 0.755695, 0.654924, 300, 300, 100, 1, 0, 0),
(180712, 1, -7771.34, -6547.22, -0.0014, 0.993482, 0, 0, 0.476563, 0.87914, 300, 300, 100, 1, 0, 0),
(180712, 1, -7525.73, -6632.28, -0.0014, 5.4768, 0, 0, 0.392358, -0.919813, 300, 300, 100, 1, 0, 0),
(180712, 1, -7355.57, -6920.1 , -0.0014, 5.29441, 0, 0, 0.474493, -0.880259, 300, 300, 100, 1, 0, 0),
(180712, 1, -8032.21, -6445.7 , -0.0014, 0.517878, 0, 0, 0.256055, 0.966662, 300, 300, 100, 1, 0, 0),
(180712, 1, -7899.03, -6408.55, -0.0014, 6.21551, 0, 0, 0.0338336, -0.999427, 300, 300, 100, 1, 0, 0),
(180750, 1, -7793.96, -6626.38, -0.0014, 0.637865, 0, 0, 0.313553, 0.949571, 300, 300, 100, 1, 0, 0),
(180750, 1, -7778.43, -6490.38, -0.0014, 4.87116, 0, 0, 0.648804, -0.760956, 300, 300, 100, 1, 0, 0),
(180750, 1, -7717.75, -6572.03, -0.0014, 0.239055, 0, 0, 0.119243, 0.992865, 300, 300, 100, 1, 0, 0),
(180750, 1, -7796.06, -6816.38, -0.0014, 5.16874, 0, 0, 0.528831, -0.848727, 300, 300, 100, 1, 0, 0),
(180750, 1, -7803.93, -6965.85, -0.0014, 4.43919, 0, 0, 0.796809, -0.604231, 300, 300, 100, 1, 0, 0),
(180750, 1, -7655.79, -7031.21, -0.0014, 6.04228, 0, 0, 0.120162, -0.992754, 300, 300, 100, 1, 0, 0),
(180750, 1, -7525.49, -6924.71, -0.0014, 0.330253, 0, 0, 0.164377, 0.986398, 300, 300, 100, 1, 0, 0),
(180750, 1, -7845.39, -6994.43, -0.0014, 3.8916, 0, 0, 0.930506, -0.366276, 300, 300, 100, 1, 0, 0),
(180750, 1, -7882.63, -7097.17, -0.0014, 4.55876, 0, 0, 0.759286, -0.650758, 300, 300, 100, 1, 0, 0),
(180750, 1, -7826.39, -7222.75, -0.0014, 6.17624, 0, 0, 0.0534448, -0.998571, 300, 300, 100, 1, 0, 0);


