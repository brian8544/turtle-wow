
-- Changes by JOE
REPLACE INTO `gameobject` VALUES ( 5018386, 2020091, 329, 3566.79, -2931.88, 125.001, 1.3497, 0, 0, 0.624782, 0.780799, 300, 300, 100, 1, 0, 0);
DELETE FROM gameobject WHERE guid = '5018386';
DELETE FROM game_event_gameobject WHERE guid = '5018386';
DELETE FROM gameobject_battleground WHERE guid = '5018386';
REPLACE INTO `gameobject` VALUES ( 5018387, 2020091, 329, 3566.99, -2931.2, 125.001, 2.16573, 0, 0, 0.883305, 0.468798, 300, 300, 100, 1, 0, 0);
UPDATE `gameobject` SET `spawntimesecsmin`=604800, `spawntimesecsmax`=604800 WHERE `guid`=5018387;
REPLACE INTO `gameobject` VALUES ( 5018388, 2020092, 229, -127.631, -475.417, 24.5252, 3.12, 0, 0, 0.999942, 0.0107972, 300, 300, 100, 1, 0, 0);
UPDATE `gameobject` SET `spawntimesecsmin`=604800, `spawntimesecsmax`=604800 WHERE `guid`=5018388;
REPLACE INTO `gameobject` VALUES ( 5018388, 2020092, 229, -127.631, -475.417, 24.5252, 1, 0, 0, 0.479426, 0.877583, 604800, 604800, 100, 1, 0, 0);
REPLACE INTO `gameobject` VALUES ( 5018388, 2020092, 229, -127.631, -475.417, 24.5252, 2, 0, 0, 0.841471, 0.540302, 604800, 604800, 100, 1, 0, 0);
REPLACE INTO `gameobject` VALUES ( 5018388, 2020092, 229, -127.631, -475.417, 24.5252, 0, 0, 0, 0, 1, 604800, 604800, 100, 1, 0, 0);
