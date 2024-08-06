-- Respawn Simone the Inconspicuous with correct guid on live server.
DELETE FROM `creature` WHERE `id`=14527;
INSERT INTO `creature` (`guid`, `id`, `id2`, `id3`, `id4`, `map`, `position_x`, `position_y`, `position_z`, `orientation`, `spawntimesecsmin`, `spawntimesecsmax`, `wander_distance`, `health_percent`, `mana_percent`, `movement_type`, `spawn_flags`, `visibility_mod`) VALUES
(24439, 14527, 0, 0, 0, 1, -6972.83, -736.328, -266.453, 4.15786, 10800, 10800, 0, 100, 100, 2, 1, 0);
DELETE FROM `creature_movement` WHERE `id`=24439;
INSERT INTO `creature_movement` (`id`, `point`, `position_x`, `position_y`, `position_z`, `orientation`, `waittime`, `wander_distance`, `script_id`) VALUES 
(24439, 1, -6979.98, -743.922, -265.829, 4.26077, 0, 0, 0),
(24439, 2, -6986.33, -765.548, -268.629, 0, 0, 0, 0),
(24439, 3, -7007.75, -786.31, -273.191, 0, 0, 0, 0),
(24439, 4, -7039.73, -799.7, -270.899, 0, 0, 0, 0),
(24439, 5, -7065.82, -819.616, -270.97, 0, 0, 0, 0),
(24439, 6, -7082.96, -845.941, -272.221, 0, 0, 0, 0),
(24439, 7, -7110.47, -848.818, -272.221, 0, 0, 0, 0),
(24439, 8, -7122.33, -848.446, -272.222, 0, 0, 0, 0),
(24439, 9, -7157.42, -844.413, -270.273, 0, 0, 0, 0),
(24439, 10, -7189.71, -825.359, -266.686, 0, 0, 0, 0),
(24439, 11, -7190.87, -822.46, -266.511, 0, 0, 0, 0),
(24439, 12, -7214, -834.257, -269.773, 0, 0, 0, 0),
(24439, 13, -7229.78, -846.956, -270.665, 0, 0, 0, 0),
(24439, 14, -7233.79, -880.804, -271.939, 0, 0, 0, 0),
(24439, 15, -7278.58, -915.386, -270.422, 0, 0, 0, 0),
(24439, 16, -7321.04, -902.681, -271.296, 0, 0, 0, 0),
(24439, 17, -7352.49, -886.729, -270.25, 0, 0, 0, 0),
(24439, 18, -7386.06, -878.481, -269.358, 0, 0, 0, 0),
(24439, 19, -7447.88, -874.992, -264.068, 0, 0, 0, 0),
(24439, 20, -7495.22, -882.61, -271.447, 0, 0, 0, 0),
(24439, 21, -7557.14, -892.074, -272.703, 0, 0, 0, 0),
(24439, 22, -7574.26, -900.852, -271.85, 0, 0, 0, 0),
(24439, 23, -7578.46, -899.827, -272.033, 0, 5000, 0, 2443923),
(24439, 24, -7607.88, -928.535, -268.21, 0, 0, 0, 0),
(24439, 25, -7658.18, -916.766, -269.852, 0, 0, 0, 0),
(24439, 26, -7684.99, -934.012, -271.072, 0, 0, 0, 0),
(24439, 27, -7719.79, -958.694, -272.064, 0, 0, 0, 0),
(24439, 28, -7771.85, -978.788, -271.637, 0, 0, 0, 0),
(24439, 29, -7786.36, -1007.86, -267.052, 0, 7000, 0, 2443929),
(24439, 30, -7795.43, -1009.01, -266.123, 0, 0, 0, 0),
(24439, 31, -7818.7, -1027.62, -266.675, 0, 0, 0, 0),
(24439, 32, -7862.13, -1037.34, -269.089, 0, 0, 0, 0),
(24439, 33, -7887.01, -1021.86, -271.34, 0, 0, 0, 0),
(24439, 34, -7900.55, -1002.84, -272.512, 0, 0, 0, 0),
(24439, 35, -7903.28, -978.558, -274.716, 0, 0, 0, 0),
(24439, 36, -7910.02, -968.588, -276.354, 0, 0, 0, 0),
(24439, 37, -7925.37, -964.484, -276.319, 0, 0, 0, 0),
(24439, 38, -7934.6, -969.985, -275.442, 0, 8000, 0, 2443938),
(24439, 39, -7939.15, -954.032, -275.842, 0, 0, 0, 0),
(24439, 40, -7950.27, -947.564, -275.907, 0, 0, 0, 0),
(24439, 41, -7958.42, -935.452, -276.212, 0, 0, 0, 0),
(24439, 42, -7983.1, -932.55, -273.851, 0, 0, 0, 0),
(24439, 43, -7997.47, -928.34, -273.793, 0, 0, 0, 0),
(24439, 44, -8019.04, -938.782, -272.221, 0, 0, 0, 0),
(24439, 45, -8028.85, -971.488, -271.261, 0, 0, 0, 0),
(24439, 46, -8030.84, -1000.45, -271.374, 0, 0, 0, 0),
(24439, 47, -8036, -1038.62, -271.474, 0, 0, 0, 0),
(24439, 48, -8042.39, -1068.95, -272.222, 0, 0, 0, 0),
(24439, 49, -8054.66, -1100.93, -271.825, 0, 0, 0, 0),
(24439, 50, -8053.4, -1102.23, -271.742, 0, 12000, 0, 2443950),
(24439, 51, -8062.54, -1119.16, -271.041, 0, 0, 0, 0),
(24439, 52, -8045.9, -1162.09, -270.919, 0, 0, 0, 0),
(24439, 53, -8025.98, -1203.3, -272.089, 0, 0, 0, 0),
(24439, 54, -8020.59, -1243.58, -272.022, 0, 0, 0, 0),
(24439, 55, -8010.59, -1257.98, -272.215, 0, 0, 0, 0),
(24439, 56, -8010.37, -1289.65, -272.194, 0, 0, 0, 0),
(24439, 57, -8004.81, -1296.62, -271.812, 0, 8000, 0, 2443957),
(24439, 58, -8004.67, -1330.88, -274.854, 0, 0, 0, 0),
(24439, 59, -8001.3, -1353.77, -271.815, 0, 0, 0, 0),
(24439, 60, -8006.69, -1384.51, -271.731, 0, 0, 0, 0),
(24439, 61, -8010.4, -1415.69, -272.138, 0, 0, 0, 0),
(24439, 62, -8001.1, -1444.21, -272.197, 0, 0, 0, 0),
(24439, 63, -7982.11, -1450.95, -275.396, 0, 0, 0, 0),
(24439, 64, -7968.19, -1465.38, -274.291, 0, 0, 0, 0),
(24439, 65, -7952.96, -1481.01, -271.309, 0, 8000, 0, 2443965),
(24439, 66, -7939.55, -1462.1, -272.295, 0, 0, 0, 0),
(24439, 67, -7900.54, -1457.18, -271.355, 0, 0, 0, 0),
(24439, 68, -7879.01, -1441.78, -267.834, 0, 0, 0, 0),
(24439, 69, -7856.08, -1437.3, -266.742, 0, 15000, 0, 2443969),
(24439, 70, -7822.61, -1423.62, -268.806, 0, 0, 0, 0),
(24439, 71, -7771.97, -1428.48, -271.985, 0, 0, 0, 0),
(24439, 72, -7738.38, -1425.5, -271.847, 0, 5000, 0, 2443972),
(24439, 73, -7737.92, -1419.43, -271.609, 0, 0, 0, 0),
(24439, 74, -7704.95, -1406.04, -270.244, 0, 6000, 0, 0),
(24439, 75, -7707.36, -1398.38, -269.911, 0, 6000, 0, 0),
(24439, 76, -7705.71, -1389.98, -269.97, 0, 4000, 0, 2443976),
(24439, 77, -7696.06, -1366.52, -269.499, 0, 0, 0, 0),
(24439, 78, -7675.64, -1361.28, -271.427, 0, 0, 0, 0),
(24439, 79, -7653.26, -1351.91, -272.222, 0, 0, 0, 0),
(24439, 80, -7640.88, -1341.16, -272.222, 0, 0, 0, 0),
(24439, 81, -7640.4, -1333.62, -272.222, 0, 0, 0, 0),
(24439, 82, -7663.03, -1293.4, -270.412, 0, 0, 0, 0),
(24439, 83, -7660.47, -1270.11, -269.424, 0, 0, 0, 0),
(24439, 84, -7651.97, -1239.61, -269.038, 0, 0, 0, 0),
(24439, 85, -7636.57, -1206.09, -267.996, 0, 0, 0, 0),
(24439, 86, -7603.82, -1173.9, -271.104, 0, 0, 0, 0),
(24439, 87, -7594.2, -1151.33, -271.111, 0, 7000, 0, 2443987),
(24439, 88, -7584.89, -1142.8, -264.716, 0, 0, 0, 0),
(24439, 89, -7578.08, -1134.77, -264.79, 0, 0, 0, 0),
(24439, 90, -7563.87, -1131.51, -270.459, 0, 0, 0, 0),
(24439, 91, -7537.21, -1119.75, -270.122, 0, 0, 0, 0),
(24439, 92, -7526.06, -1089.67, -271.461, 0, 0, 0, 0),
(24439, 93, -7520.48, -1071.18, -272.03, 0, 0, 0, 0),
(24439, 94, -7515.26, -1040.03, -272.135, 0, 0, 0, 0),
(24439, 95, -7508.13, -1017.25, -271.755, 0, 0, 0, 0),
(24439, 96, -7509.51, -996.527, -271.088, 0, 0, 0, 0),
(24439, 97, -7517.28, -985.543, -271.281, 0, 5000, 0, 2443997),
(24439, 98, -7500.99, -970.028, -270.763, 0, 0, 0, 0),
(24439, 99, -7481.16, -959.979, -272.249, 0, 0, 0, 0),
(24439, 100, -7454.07, -939.171, -272.191, 0, 0, 0, 0),
(24439, 101, -7412.9, -931.682, -270.811, 0, 0, 0, 0),
(24439, 102, -7379.93, -936.533, -272.222, 0, 0, 0, 0),
(24439, 103, -7345.7, -956.728, -270.933, 0, 0, 0, 0),
(24439, 104, -7333.99, -948.52, -268.371, 0, 0, 0, 0),
(24439, 105, -7310.43, -939.388, -271.833, 0, 0, 0, 0),
(24439, 106, -7267.4, -938.557, -271.836, 0, 0, 0, 0),
(24439, 107, -7231, -930.002, -271.768, 0, 0, 0, 0),
(24439, 108, -7184.62, -927.292, -270.622, 0, 0, 0, 0),
(24439, 109, -7150.14, -913.485, -272.026, 0, 0, 0, 0),
(24439, 110, -7128.62, -907.253, -271.708, 0, 0, 0, 0),
(24439, 111, -7113.75, -895.768, -271.054, 0, 0, 0, 0),
(24439, 112, -7072.44, -882.383, -272.209, 0, 0, 0, 0),
(24439, 113, -7046.12, -866.439, -270.495, 0, 0, 0, 0),
(24439, 114, -7009.87, -869.691, -267.973, 0, 0, 0, 0),
(24439, 115, -7002.11, -873.768, -266.38, 0, 4000, 0, 57),
(24439, 116, -6990.21, -869.015, -265.479, 0, 0, 0, 0),
(24439, 117, -6970.35, -839.906, -271.317, 0, 0, 0, 0),
(24439, 118, -6946.48, -800.995, -271.897, 0, 0, 0, 0),
(24439, 119, -6914.38, -775.288, -271.879, 0, 0, 0, 0),
(24439, 120, -6896.42, -732.742, -270.995, 0, 0, 0, 0),
(24439, 121, -6893.06, -697.02, -271.743, 0, 5000, 0, 56),
(24439, 122, -6904.2, -683.851, -271.607, 0, 0, 0, 0),
(24439, 123, -6927.61, -675.444, -269.826, 0, 0, 0, 0),
(24439, 124, -6963.37, -669.245, -269.595, 0, 0, 0, 0),
(24439, 125, -7011.83, -644.824, -272.222, 0, 0, 0, 0),
(24439, 126, -7039, -622.924, -271.75, 0, 0, 0, 0),
(24439, 127, -7074.14, -634.741, -268.952, 0, 14000, 0, 55),
(24439, 128, -7075.28, -660.686, -269.652, 0, 0, 0, 0),
(24439, 129, -7051.23, -692.587, -269.161, 0, 0, 0, 0),
(24439, 130, -7052.55, -696.954, -268.68, 0, 3000, 0, 0),
(24439, 131, -7034.4, -695.438, -268.825, 0, 0, 0, 0),
(24439, 132, -7021.16, -705.646, -267.155, 0, 0, 0, 0),
(24439, 133, -7015.6, -706.177, -267.265, 0, 0, 0, 0),
(24439, 134, -6989.83, -719.188, -267.184, 0, 0, 0, 0);

