
-- Changes by MEFLOR
REPLACE INTO `creature` VALUES (2583548,50054,0,0,0,1,16271.5,16247.1,25.1013,4.07146,120,120,0,100,100,0,0,0);

-- Changes by DRAGU
REPLACE INTO `creature` VALUES (2583549,62008,0,0,0,1,9935.92,2514.37,1317.87,5.77278,120,120,0,100,100,0,0,0);
REPLACE INTO `gameobject` VALUES ( 5019626, 2007326, 1, 9937.29, 2516.06, 1317.52, 5.6935, 0, 0, 0.290588, -0.956848, 300, 300, 100, 1, 0, 0);
DELETE FROM gameobject WHERE guid = '5019626';
DELETE FROM game_event_gameobject WHERE guid = '5019626';
DELETE FROM gameobject_battleground WHERE guid = '5019626';
REPLACE INTO `gameobject` VALUES ( 5019627, 2007326, 1, 9936.73, 2515.91, 1317.62, 5.6935, 0, 0, 0.290588, -0.956848, 300, 300, 100, 1, 0, 0);
REPLACE INTO `creature` VALUES (2583550,62009,0,0,0,0,-4835.97,666.674,384.86,5.33288,120,120,0,100,100,0,0,0);
REPLACE INTO `gameobject` VALUES ( 5019628, 2007326, 0, -4837.23, 665.411, 384.86, 5.33288, 0, 0, 0.457476, -0.889222, 300, 300, 100, 1, 0, 0);
REPLACE INTO `creature` VALUES (2583551,62010,0,0,0,1,-1255.6,34.735,128.187,3.28675,120,120,0,100,100,0,0,0);
REPLACE INTO `gameobject` VALUES ( 5019629, 2007326, 1, -1255.86, 36.9183, 128.187, 3.24201, 0, 0, 0.99874, -0.0501878, 300, 300, 100, 1, 0, 0);
REPLACE INTO `creature` VALUES (2583552,62011,0,0,0,0,-4904.93,-993.354,503.94,5.41574,120,120,0,100,100,0,0,0);
REPLACE INTO `gameobject` VALUES ( 5019630, 2007326, 0, -4906.3, -994.884, 503.94, 5.62779, 0, 0, 0.321863, -0.946786, 300, 300, 100, 1, 0, 0);
REPLACE INTO `creature` VALUES (2583553,62012,0,0,0,0,1606.7,246.937,-52.1527,3.64062,120,120,0,100,100,0,0,0);
REPLACE INTO `gameobject` VALUES ( 5019631, 2007326, 0, 1605.68, 249.004, -52.15, 3.68381, 0, 0, 0.963474, -0.267801, 300, 300, 100, 1, 0, 0);
UPDATE `creature` SET `position_x` = 1606.192871, `position_y` = 247.223740, `position_z` = -52.151447, `orientation` = 3.609193 WHERE `guid` = 2583553;
UPDATE `creature` SET `position_x` = 1606.312012, `position_y` = 247.335434, `position_z` = -52.151306, `orientation` = 3.661283 WHERE `guid` = 2583553;

-- Changes by SHANG
DELETE FROM creature WHERE guid=2583019;
DELETE FROM creature_addon WHERE guid=2583019;
DELETE FROM creature_movement WHERE id=2583019;
DELETE FROM game_event_creature WHERE guid=2583019;
DELETE FROM game_event_creature_data WHERE guid=2583019;
DELETE FROM creature_battleground WHERE guid=2583019;
DELETE FROM creature WHERE guid=2583021;
DELETE FROM creature_addon WHERE guid=2583021;
DELETE FROM creature_movement WHERE id=2583021;
DELETE FROM game_event_creature WHERE guid=2583021;
DELETE FROM game_event_creature_data WHERE guid=2583021;
DELETE FROM creature_battleground WHERE guid=2583021;
DELETE FROM creature WHERE guid=2583025;
DELETE FROM creature_addon WHERE guid=2583025;
DELETE FROM creature_movement WHERE id=2583025;
DELETE FROM game_event_creature WHERE guid=2583025;
DELETE FROM game_event_creature_data WHERE guid=2583025;
DELETE FROM creature_battleground WHERE guid=2583025;

-- Changes by DRAGU
DELETE FROM creature WHERE guid=2582967;
DELETE FROM creature_addon WHERE guid=2582967;
DELETE FROM creature_movement WHERE id=2582967;
DELETE FROM game_event_creature WHERE guid=2582967;
DELETE FROM game_event_creature_data WHERE guid=2582967;
DELETE FROM creature_battleground WHERE guid=2582967;

-- Changes by GHEOR
REPLACE INTO `creature` VALUES (2583554,80945,0,0,0,451,15705.3,16554,48.6109,2.73931,120,120,0,100,100,0,0,0);
