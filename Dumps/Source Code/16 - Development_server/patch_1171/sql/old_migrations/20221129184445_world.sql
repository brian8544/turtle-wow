
-- Changes by WILLBERG
DELETE FROM creature WHERE guid=2573794;
DELETE FROM creature_addon WHERE guid=2573794;
DELETE FROM creature_movement WHERE id=2573794;
DELETE FROM game_event_creature WHERE guid=2573794;
DELETE FROM game_event_creature_data WHERE guid=2573794;
DELETE FROM creature_battleground WHERE guid=2573794;

-- Changes by SHANG
REPLACE INTO `gameobject` VALUES ( 5012029, 2010967, 230, 901.501, -122.323, -49.7412, 4.32629, 0, 0, 0.829632, -0.55831, 300, 300, 100, 1, 0, 0);
REPLACE INTO `gameobject` VALUES ( 5012030, 2010968, 1, -9027.34, -7207.33, 10.0336, 1.95519, 0, 0, 0.829155, 0.559018, 300, 300, 100, 1, 0, 0);
REPLACE INTO `gameobject` VALUES ( 5012031, 2010969, 1, -9033.21, -7196.01, 9.41812, 3.28639, 0, 0, 0.99738, -0.0723344, 300, 300, 100, 1, 0, 0);
REPLACE INTO `creature` VALUES (2573795,61138,0,0,0,1,16227.3,16285.7,31.4304,1.45607,120,120,0,100,100,0,0,0);
DELETE FROM creature WHERE guid=2573795;
DELETE FROM creature_addon WHERE guid=2573795;
DELETE FROM creature_movement WHERE id=2573795;
DELETE FROM game_event_creature WHERE guid=2573795;
DELETE FROM game_event_creature_data WHERE guid=2573795;
DELETE FROM creature_battleground WHERE guid=2573795;
REPLACE INTO `creature` VALUES (2573796,61138,0,0,0,1,16223.8,16276,20.921,4.53482,120,120,0,100,100,0,0,0);
