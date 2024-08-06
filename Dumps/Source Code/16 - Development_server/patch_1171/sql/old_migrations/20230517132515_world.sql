
-- Changes by DRAGUNOVI
REPLACE INTO `creature` VALUES (2577155,61518,0,0,0,0,-13878.1,3552.42,0.594936,4.97091,120,120,0,100,100,0,0,0);
REPLACE INTO `creature` VALUES (2577156,92939,0,0,0,0,-13872.6,3551.25,0.736531,2.72546,120,120,0,100,100,0,0,0);
DELETE FROM creature WHERE guid=2577156;
DELETE FROM creature_addon WHERE guid=2577156;
DELETE FROM creature_movement WHERE id=2577156;
DELETE FROM game_event_creature WHERE guid=2577156;
DELETE FROM game_event_creature_data WHERE guid=2577156;
DELETE FROM creature_battleground WHERE guid=2577156;
UPDATE `creature` SET `position_x` = -13805.695312, `position_y` = 3549.249756, `position_z` = 0.662193, `orientation` = 2.598434 WHERE `guid` = 2577155;
REPLACE INTO `creature` VALUES (2577155,61518,0,0,0,0,-13805.7,3549.25,0.662193,2.59843,300,300,0,100,100,0,0,0);
DELETE FROM creature_movement WHERE id=2577155;
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577155,1, -13805.695312,3549.249756,0.662193, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577155,2, -13862.855469,3566.149658,3.651983, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577155,3, -13939.987305,3581.805908,1.635642, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577155,4, -14036.615234,3561.058838,5.750637, 100);
DELETE FROM creature WHERE guid=2577155;
DELETE FROM creature_addon WHERE guid=2577155;
DELETE FROM creature_movement WHERE id=2577155;
DELETE FROM game_event_creature WHERE guid=2577155;
DELETE FROM game_event_creature_data WHERE guid=2577155;
DELETE FROM creature_battleground WHERE guid=2577155;
REPLACE INTO `creature` VALUES (2577157,61518,0,0,0,0,-13953,3575.21,1.73438,4.70957,120,120,0,100,100,0,0,0);
UPDATE `creature` SET `position_x` = -13953.011719, `position_y` = 3581.966553, `position_z` = 1.944334, `orientation` = 4.709572 WHERE `guid` = 2577157;
REPLACE INTO `creature` VALUES (2577157,61518,0,0,0,0,-13953,3581.97,1.94433,4.70957,300,300,0,100,100,0,0,0);
DELETE FROM creature_movement WHERE id=2577157;
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577157,1, -13953.011719,3581.966553,1.944334, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577157,2, -13888.590820,3574.653564,1.711782, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577157,3, -13814.875000,3550.889893,0.538204, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577157,4, -13866.851562,3571.792725,4.137506, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577157,5, -13952.673828,3580.958252,1.926329, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577157,6, -14012.828125,3561.946045,3.918641, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577157,7, -14049.572266,3560.645020,6.037330, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577157,8, -14114.654297,3572.844238,1.510013, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577157,9, -14047.299805,3560.641846,6.159867, 100);
REPLACE INTO `creature` VALUES (2577157,61518,0,0,0,0,-13953,3581.97,1.94433,4.70957,300,300,0,100,100,2,0,0);
REPLACE INTO `creature` VALUES (2577158,61516,0,0,0,0,-13944.6,2377.14,2.44583,2.80879,120,120,0,100,100,0,0,0);
REPLACE INTO `creature` VALUES (2577159,61517,0,0,0,0,-11592.6,3680.19,99.1296,0.896613,120,120,0,100,100,0,0,0);
REPLACE INTO `creature` VALUES (2577160,61515,0,0,0,0,-11452.4,3320.14,-4.89496,3.97954,120,120,0,100,100,0,0,0);
UPDATE `creature_template` set `scale` = 1.200000 where entry = 61515;
UPDATE `creature_template` set `scale` = 1.300000 where entry = 61515;
REPLACE INTO `creature` VALUES (2577160,61515,0,0,0,0,-11452.4,3320.14,-4.89496,3.97954,300,300,0,100,100,0,0,0);
DELETE FROM creature_movement WHERE id=2577160;
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577160,1, -11452.438477,3320.140869,-4.894962, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577160,2, -11414.493164,3349.966064,-4.948748, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577160,3, -11421.916016,3392.095947,-5.136005, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577160,4, -11507.969727,3387.614990,-6.925094, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577160,5, -11542.225586,3376.483643,-7.209269, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577160,6, -11520.881836,3339.057861,-6.580705, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577160,7, -11568.482422,3262.658447,-5.823500, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577160,8, -11540.057617,3229.192139,-7.135079, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577160,9, -11513.694336,3272.680176,-6.511656, 100);
INSERT INTO creature_movement (id,point,position_x,position_y,position_z,orientation) VALUES (2577160,10, -11522.138672,3306.485840,-5.898055, 100);
REPLACE INTO `creature` VALUES (2577160,61515,0,0,0,0,-11452.4,3320.14,-4.89496,3.97954,300,300,0,100,100,2,0,0);

-- Changes by SHANG
REPLACE INTO `creature` VALUES (2577161,61515,0,0,0,1,5270.7,-3683.95,1593.44,0.431235,120,120,0,100,100,0,0,0);
DELETE FROM creature WHERE guid=2577161;
DELETE FROM creature_addon WHERE guid=2577161;
DELETE FROM creature_movement WHERE id=2577161;
DELETE FROM game_event_creature WHERE guid=2577161;
DELETE FROM game_event_creature_data WHERE guid=2577161;
DELETE FROM creature_battleground WHERE guid=2577161;
REPLACE INTO `creature` VALUES (2577162,61516,0,0,0,1,5270.7,-3683.95,1593.44,0.431235,120,120,0,100,100,0,0,0);
DELETE FROM creature WHERE guid=2577162;
DELETE FROM creature_addon WHERE guid=2577162;
DELETE FROM creature_movement WHERE id=2577162;
DELETE FROM game_event_creature WHERE guid=2577162;
DELETE FROM game_event_creature_data WHERE guid=2577162;
DELETE FROM creature_battleground WHERE guid=2577162;
REPLACE INTO `creature` VALUES (2577163,61518,0,0,0,1,5270.7,-3683.95,1593.44,0.431235,120,120,0,100,100,0,0,0);
DELETE FROM creature WHERE guid=2577163;
DELETE FROM creature_addon WHERE guid=2577163;
DELETE FROM creature_movement WHERE id=2577163;
DELETE FROM game_event_creature WHERE guid=2577163;
DELETE FROM game_event_creature_data WHERE guid=2577163;
DELETE FROM creature_battleground WHERE guid=2577163;
REPLACE INTO `creature` VALUES (2577164,61512,0,0,0,1,5374.67,-3689.13,1593.44,5.89682,120,120,0,100,100,0,0,0);
REPLACE INTO `creature` VALUES (2577165,61513,0,0,0,1,5375.84,-3687.58,1593.44,5.15541,120,120,0,100,100,0,0,0);
REPLACE INTO `creature` VALUES (2577166,61514,0,0,0,1,5377.21,-3686.67,1593.44,5.15541,120,120,0,100,100,0,0,0);
DELETE FROM creature WHERE guid=2577166;
DELETE FROM creature_addon WHERE guid=2577166;
DELETE FROM creature_movement WHERE id=2577166;
DELETE FROM game_event_creature WHERE guid=2577166;
DELETE FROM game_event_creature_data WHERE guid=2577166;
DELETE FROM creature_battleground WHERE guid=2577166;
DELETE FROM creature WHERE guid=2577165;
DELETE FROM creature_addon WHERE guid=2577165;
DELETE FROM creature_movement WHERE id=2577165;
DELETE FROM game_event_creature WHERE guid=2577165;
DELETE FROM game_event_creature_data WHERE guid=2577165;
DELETE FROM creature_battleground WHERE guid=2577165;
DELETE FROM creature WHERE guid=2577164;
DELETE FROM creature_addon WHERE guid=2577164;
DELETE FROM creature_movement WHERE id=2577164;
DELETE FROM game_event_creature WHERE guid=2577164;
DELETE FROM game_event_creature_data WHERE guid=2577164;
DELETE FROM creature_battleground WHERE guid=2577164;
REPLACE INTO `creature` VALUES (2577167,61512,0,0,0,1,5497.27,-3799.99,1651.04,5.01168,120,120,0,100,100,0,0,0);

-- Changes by DRAGUNOVI
REPLACE INTO `game_tele` (`id`, `position_x`, `position_y`, `position_z`, `orientation`, `map`, `name`) VALUES (889,2739.849609,3006.867432,25.808846,0.465857,807,'emeraldsanctumproper');
