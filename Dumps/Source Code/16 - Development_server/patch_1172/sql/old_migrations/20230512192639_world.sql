
-- Changes by SHANG
DELETE FROM creature WHERE guid=2575745;
DELETE FROM creature_addon WHERE guid=2575745;
DELETE FROM creature_movement WHERE id=2575745;
DELETE FROM game_event_creature WHERE guid=2575745;
DELETE FROM game_event_creature_data WHERE guid=2575745;
DELETE FROM creature_battleground WHERE guid=2575745;
REPLACE INTO `creature` VALUES (2576995,61319,0,0,0,532,-11125.1,-1936.38,49.3187,5.1188,120,120,0,100,100,0,0,0);
REPLACE INTO `creature_addon` (`guid`, `emote_state`) VALUES (2576995, 233);
REPLACE INTO `creature` VALUES (2576996,61504,0,0,0,1,5497.84,-3798.64,1610.07,1.38348,120,120,0,100,100,0,0,0);
DELETE FROM creature WHERE guid=2576996;
DELETE FROM creature_addon WHERE guid=2576996;
DELETE FROM creature_movement WHERE id=2576996;
DELETE FROM game_event_creature WHERE guid=2576996;
DELETE FROM game_event_creature_data WHERE guid=2576996;
DELETE FROM creature_battleground WHERE guid=2576996;
REPLACE INTO `creature` VALUES (2576997,61505,0,0,0,1,5497.84,-3798.64,1610.07,1.38348,120,120,0,100,100,0,0,0);
DELETE FROM creature WHERE guid=2576997;
DELETE FROM creature_addon WHERE guid=2576997;
DELETE FROM creature_movement WHERE id=2576997;
DELETE FROM game_event_creature WHERE guid=2576997;
DELETE FROM game_event_creature_data WHERE guid=2576997;
DELETE FROM creature_battleground WHERE guid=2576997;
REPLACE INTO `creature` VALUES (2576998,61505,0,0,0,1,5490.82,-3806.36,1610.07,0.0904864,120,120,0,100,100,0,0,0);
REPLACE INTO `gameobject` VALUES ( 5015395, 2010386, 1, 5500.2, -3682.77, 1593.86, 3.11585, 0, 0, 0.999917, 0.0128725, 300, 300, 100, 1, 0, 0);
REPLACE INTO `gameobject` VALUES ( 5015395, 2010386, 1, 5500.2, -3682.77, 1593.66, 3.11585, 0, 0, 0.999917, 0.0128725, 300, 300, 100, 1, 0, 0);
REPLACE INTO `gameobject` VALUES ( 5015396, 2000385, 1, 5497.99, -3684.41, 1593.87, 5.32675, 0, 0, 0.4602, -0.887815, 300, 300, 100, 1, 0, 0);
