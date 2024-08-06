SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account_data
-- ----------------------------
DROP TABLE IF EXISTS `account_data`;
CREATE TABLE `account_data`  (
  `account` int UNSIGNED NOT NULL DEFAULT 0,
  `type` int UNSIGNED NOT NULL DEFAULT 0,
  `time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `data` longblob NOT NULL,
  PRIMARY KEY (`account`, `type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for auction
-- ----------------------------
DROP TABLE IF EXISTS `auction`;
CREATE TABLE `auction`  (
  `id` int UNSIGNED NOT NULL DEFAULT 0,
  `houseid` int UNSIGNED NOT NULL DEFAULT 0,
  `itemguid` int UNSIGNED NOT NULL DEFAULT 0,
  `item_template` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item Identifier',
  `itemowner` int UNSIGNED NOT NULL DEFAULT 0,
  `buyoutprice` int NOT NULL DEFAULT 0,
  `time` bigint NOT NULL DEFAULT 0,
  `buyguid` int UNSIGNED NOT NULL DEFAULT 0,
  `lastbid` int NOT NULL DEFAULT 0,
  `startbid` int NOT NULL DEFAULT 0,
  `deposit` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key_item_guid`(`itemguid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for bounty_quest_targets
-- ----------------------------
DROP TABLE IF EXISTS `bounty_quest_targets`;
CREATE TABLE `bounty_quest_targets`  (
  `id` int UNSIGNED NOT NULL DEFAULT 1,
  `horde_player` int UNSIGNED NOT NULL DEFAULT 0,
  `alliance_player` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for bugreport
-- ----------------------------
DROP TABLE IF EXISTS `bugreport`;
CREATE TABLE `bugreport`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Identifier',
  `type` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Debug System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for bugreports
-- ----------------------------
DROP TABLE IF EXISTS `bugreports`;
CREATE TABLE `bugreports`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `reportTime` timestamp NULL DEFAULT current_timestamp,
  `playerGuid` int NULL DEFAULT NULL,
  `playerMap` int NULL DEFAULT NULL,
  `playerInstanceId` int NULL DEFAULT NULL,
  `playerX` float NULL DEFAULT NULL,
  `playerY` float NULL DEFAULT NULL,
  `playerZ` float NULL DEFAULT NULL,
  `clientIp` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `reportType` tinyint NULL DEFAULT NULL,
  `reportText` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `serverInformation` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `bugStatus` enum('New','NeedTest','Fixed','Invalid','Duplicate','Confirmed') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'New',
  INDEX `idx_id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for census
-- ----------------------------
DROP TABLE IF EXISTS `census`;
CREATE TABLE `census`  (
  `time` datetime NULL DEFAULT NULL,
  `race` int NULL DEFAULT NULL,
  `onlineCount` int NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_account_data
-- ----------------------------
DROP TABLE IF EXISTS `character_account_data`;
CREATE TABLE `character_account_data`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `type` int UNSIGNED NOT NULL DEFAULT 0,
  `time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `data` longblob NOT NULL,
  PRIMARY KEY (`guid`, `type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_action
-- ----------------------------
DROP TABLE IF EXISTS `character_action`;
CREATE TABLE `character_action`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `button` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `action` int UNSIGNED NOT NULL DEFAULT 0,
  `type` tinyint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `button`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_armory_stats
-- ----------------------------
DROP TABLE IF EXISTS `character_armory_stats`;
CREATE TABLE `character_armory_stats`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `maxhealth` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower1` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower2` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower3` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower4` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower5` int UNSIGNED NOT NULL DEFAULT 0,
  `strength` float NOT NULL DEFAULT 0,
  `agility` float NOT NULL DEFAULT 0,
  `stamina` float NOT NULL DEFAULT 0,
  `intellect` float NOT NULL DEFAULT 0,
  `spirit` float NOT NULL DEFAULT 0,
  `armor` int UNSIGNED NOT NULL DEFAULT 0,
  `resHoly` int UNSIGNED NOT NULL DEFAULT 0,
  `resFire` int UNSIGNED NOT NULL DEFAULT 0,
  `resNature` int UNSIGNED NOT NULL DEFAULT 0,
  `resFrost` int UNSIGNED NOT NULL DEFAULT 0,
  `resShadow` int UNSIGNED NOT NULL DEFAULT 0,
  `resArcane` int UNSIGNED NOT NULL DEFAULT 0,
  `dmgModNormal` int UNSIGNED NOT NULL DEFAULT 0,
  `dmgModHoly` int UNSIGNED NOT NULL DEFAULT 0,
  `dmgModFire` int UNSIGNED NOT NULL DEFAULT 0,
  `dmgModNature` int UNSIGNED NOT NULL DEFAULT 0,
  `dmgModFrost` int UNSIGNED NOT NULL DEFAULT 0,
  `dmgModShadow` int UNSIGNED NOT NULL DEFAULT 0,
  `dmgModArcane` int UNSIGNED NOT NULL DEFAULT 0,
  `blockPct` float NOT NULL DEFAULT 0,
  `dodgePct` float NOT NULL DEFAULT 0,
  `parryPct` float NOT NULL DEFAULT 0,
  `meleeCritPct` float NOT NULL DEFAULT 0,
  `rangedCritPct` float NOT NULL DEFAULT 0,
  `attackPower` float NOT NULL DEFAULT 0,
  `rangedAttackPower` float NOT NULL DEFAULT 0,
  `meleeDamage` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `rangedDamage` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `meleeWeaponSpeed` float NOT NULL DEFAULT 0,
  `rangedWeaponSpeed` float NOT NULL DEFAULT 0,
  `castSpeed` float NOT NULL DEFAULT 0,
  `meleeHit` float NOT NULL DEFAULT 0,
  `rangedHit` float NOT NULL DEFAULT 0,
  `spellHit` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_aura
-- ----------------------------
DROP TABLE IF EXISTS `character_aura`;
CREATE TABLE `character_aura`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `caster_guid` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Full Global Unique Identifier',
  `item_guid` int UNSIGNED NOT NULL DEFAULT 0,
  `spell` int UNSIGNED NOT NULL DEFAULT 0,
  `stackcount` int UNSIGNED NOT NULL DEFAULT 1,
  `remaincharges` int UNSIGNED NOT NULL DEFAULT 0,
  `basepoints0` int NOT NULL DEFAULT 0,
  `basepoints1` int NOT NULL DEFAULT 0,
  `basepoints2` int NOT NULL DEFAULT 0,
  `periodictime0` int UNSIGNED NOT NULL DEFAULT 0,
  `periodictime1` int UNSIGNED NOT NULL DEFAULT 0,
  `periodictime2` int UNSIGNED NOT NULL DEFAULT 0,
  `maxduration` int NOT NULL DEFAULT 0,
  `remaintime` int NOT NULL DEFAULT 0,
  `effIndexMask` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `caster_guid`, `item_guid`, `spell`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_aura_suspended
-- ----------------------------
DROP TABLE IF EXISTS `character_aura_suspended`;
CREATE TABLE `character_aura_suspended`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `caster_guid` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Full Global Unique Identifier',
  `item_guid` int UNSIGNED NOT NULL DEFAULT 0,
  `spell` int UNSIGNED NOT NULL DEFAULT 0,
  `stackcount` int UNSIGNED NOT NULL DEFAULT 1,
  `remaincharges` int UNSIGNED NOT NULL DEFAULT 0,
  `basepoints0` int NOT NULL DEFAULT 0,
  `basepoints1` int NOT NULL DEFAULT 0,
  `basepoints2` int NOT NULL DEFAULT 0,
  `periodictime0` int UNSIGNED NOT NULL DEFAULT 0,
  `periodictime1` int UNSIGNED NOT NULL DEFAULT 0,
  `periodictime2` int UNSIGNED NOT NULL DEFAULT 0,
  `maxduration` int NOT NULL DEFAULT 0,
  `remaintime` int NOT NULL DEFAULT 0,
  `effIndexMask` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `caster_guid`, `item_guid`, `spell`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_battleground_data
-- ----------------------------
DROP TABLE IF EXISTS `character_battleground_data`;
CREATE TABLE `character_battleground_data`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `instance_id` int UNSIGNED NOT NULL DEFAULT 0,
  `team` int UNSIGNED NOT NULL DEFAULT 0,
  `join_x` float NOT NULL DEFAULT 0,
  `join_y` float NOT NULL DEFAULT 0,
  `join_z` float NOT NULL DEFAULT 0,
  `join_o` float NOT NULL DEFAULT 0,
  `join_map` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_bck
-- ----------------------------
DROP TABLE IF EXISTS `character_bck`;
CREATE TABLE `character_bck`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `account` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Account Identifier',
  `name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `race` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `class` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `gender` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `level` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `xp` int UNSIGNED NOT NULL DEFAULT 0,
  `money` int UNSIGNED NOT NULL DEFAULT 0,
  `playerBytes` int UNSIGNED NOT NULL DEFAULT 0,
  `playerBytes2` int UNSIGNED NOT NULL DEFAULT 0,
  `playerFlags` int UNSIGNED NOT NULL DEFAULT 0,
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `map` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Map Identifier',
  `orientation` float NOT NULL DEFAULT 0,
  `taximask` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `online` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `cinematic` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `totaltime` int UNSIGNED NOT NULL DEFAULT 0,
  `leveltime` int UNSIGNED NOT NULL DEFAULT 0,
  `logout_time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `is_logout_resting` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `rest_bonus` float NOT NULL DEFAULT 0,
  `resettalents_multiplier` int UNSIGNED NOT NULL DEFAULT 0,
  `resettalents_time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `trans_x` float NOT NULL DEFAULT 0,
  `trans_y` float NOT NULL DEFAULT 0,
  `trans_z` float NOT NULL DEFAULT 0,
  `trans_o` float NOT NULL DEFAULT 0,
  `transguid` bigint UNSIGNED NOT NULL DEFAULT 0,
  `extra_flags` int UNSIGNED NOT NULL DEFAULT 0,
  `stable_slots` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `at_login` int UNSIGNED NOT NULL DEFAULT 0,
  `zone` int UNSIGNED NOT NULL DEFAULT 0,
  `death_expire_time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `taxi_path` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `honorRankPoints` float NOT NULL DEFAULT 0,
  `honorHighestRank` int UNSIGNED NOT NULL DEFAULT 0,
  `honorStanding` int UNSIGNED NOT NULL DEFAULT 0,
  `honorLastWeekHK` int UNSIGNED NOT NULL DEFAULT 0,
  `honorLastWeekCP` decimal(11, 1) NOT NULL DEFAULT 0.0,
  `honorStoredHK` int NOT NULL DEFAULT 0,
  `honorStoredDK` int NOT NULL DEFAULT 0,
  `watchedFaction` int UNSIGNED NOT NULL DEFAULT 0,
  `drunk` smallint UNSIGNED NOT NULL DEFAULT 0,
  `health` int UNSIGNED NOT NULL DEFAULT 0,
  `power1` int UNSIGNED NOT NULL DEFAULT 0,
  `power2` int UNSIGNED NOT NULL DEFAULT 0,
  `power3` int UNSIGNED NOT NULL DEFAULT 0,
  `power4` int UNSIGNED NOT NULL DEFAULT 0,
  `power5` int UNSIGNED NOT NULL DEFAULT 0,
  `exploredZones` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `equipmentCache` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ammoId` int UNSIGNED NOT NULL DEFAULT 0,
  `actionBars` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `deleteInfos_Account` int UNSIGNED NULL DEFAULT NULL,
  `deleteInfos_Name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `deleteDate` bigint NULL DEFAULT NULL,
  `area` int UNSIGNED NOT NULL DEFAULT 0,
  `world_phase_mask` int NULL DEFAULT 0,
  `customFlags` int NOT NULL DEFAULT 0,
  `city_protector` tinyint NOT NULL DEFAULT 0,
  `regexFilterCount` int UNSIGNED NOT NULL DEFAULT 0,
  `isGMCharacter` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `ignore_titles` tinyint NOT NULL DEFAULT 0,
  `mortality_status` tinyint NOT NULL DEFAULT 0,
  `total_deaths` int NOT NULL DEFAULT 0,
  `xp_gain` tinyint UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`guid`) USING BTREE,
  INDEX `idx_account`(`account`) USING BTREE,
  INDEX `idx_online`(`online`) USING BTREE,
  INDEX `idx_name`(`name`) USING BTREE,
  INDEX `deleteDate`(`deleteDate`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_bgqueue
-- ----------------------------
DROP TABLE IF EXISTS `character_bgqueue`;
CREATE TABLE `character_bgqueue`  (
  `PlayerGUID` int NOT NULL DEFAULT 0,
  `playerName` varchar(12) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `playerIP` int NOT NULL,
  `BGtype` int NOT NULL,
  `action` int NOT NULL,
  `time` int NOT NULL,
  PRIMARY KEY (`PlayerGUID`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_deleted_items
-- ----------------------------
DROP TABLE IF EXISTS `character_deleted_items`;
CREATE TABLE `character_deleted_items`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `player_guid` int UNSIGNED NOT NULL DEFAULT 0,
  `item_entry` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `stack_count` mediumint UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21258 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_destroyed_items
-- ----------------------------
DROP TABLE IF EXISTS `character_destroyed_items`;
CREATE TABLE `character_destroyed_items`  (
  `player_guid` int UNSIGNED NOT NULL,
  `item_entry` mediumint UNSIGNED NOT NULL,
  `stack_count` mediumint UNSIGNED NOT NULL,
  `time` bigint UNSIGNED NOT NULL,
  INDEX `player_guid`(`player_guid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = 'items that players have thrown away' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_duplicate_account
-- ----------------------------
DROP TABLE IF EXISTS `character_duplicate_account`;
CREATE TABLE `character_duplicate_account`  (
  `account` int NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for character_forgotten_skills
-- ----------------------------
DROP TABLE IF EXISTS `character_forgotten_skills`;
CREATE TABLE `character_forgotten_skills`  (
  `guid` int UNSIGNED NOT NULL COMMENT 'Global Unique Identifier',
  `skill` mediumint UNSIGNED NOT NULL,
  `value` mediumint UNSIGNED NOT NULL,
  PRIMARY KEY (`guid`, `skill`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_gifts
-- ----------------------------
DROP TABLE IF EXISTS `character_gifts`;
CREATE TABLE `character_gifts`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `item_guid` int UNSIGNED NOT NULL DEFAULT 0,
  `entry` int UNSIGNED NOT NULL DEFAULT 0,
  `flags` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`item_guid`) USING BTREE,
  INDEX `idx_guid`(`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for character_homebind
-- ----------------------------
DROP TABLE IF EXISTS `character_homebind`;
CREATE TABLE `character_homebind`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `map` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Map Identifier',
  `zone` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Zone Identifier',
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_honor_cp
-- ----------------------------
DROP TABLE IF EXISTS `character_honor_cp`;
CREATE TABLE `character_honor_cp`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `victimType` tinyint UNSIGNED NOT NULL DEFAULT 4,
  `victim` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Creature / Player Identifier',
  `cp` float NOT NULL DEFAULT 0,
  `date` int UNSIGNED NOT NULL DEFAULT 0,
  `type` tinyint UNSIGNED NOT NULL DEFAULT 0,
  INDEX `idx_guid`(`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_instance
-- ----------------------------
DROP TABLE IF EXISTS `character_instance`;
CREATE TABLE `character_instance`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `instance` int UNSIGNED NOT NULL DEFAULT 0,
  `permanent` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `instance`) USING BTREE,
  INDEX `idx_instance`(`instance`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for character_inventory
-- ----------------------------
DROP TABLE IF EXISTS `character_inventory`;
CREATE TABLE `character_inventory`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `bag` int UNSIGNED NOT NULL DEFAULT 0,
  `slot` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `item` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item Global Unique Identifier',
  `item_template` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item Identifier',
  PRIMARY KEY (`item`) USING BTREE,
  INDEX `idx_guid`(`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_item_logs
-- ----------------------------
DROP TABLE IF EXISTS `character_item_logs`;
CREATE TABLE `character_item_logs`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `playerLowGuid` int UNSIGNED NOT NULL,
  `itemLowGuid` int UNSIGNED NOT NULL,
  `itemEntry` int UNSIGNED NOT NULL,
  `itemCount` int UNSIGNED NOT NULL,
  `action` int UNSIGNED NOT NULL,
  `timestamp` bigint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `playerLowGuid`(`playerLowGuid`, `itemLowGuid`, `itemEntry`) USING BTREE,
  INDEX `action`(`action`) USING BTREE,
  INDEX `timestamp`(`timestamp`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12115346 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_pet
-- ----------------------------
DROP TABLE IF EXISTS `character_pet`;
CREATE TABLE `character_pet`  (
  `id` int UNSIGNED NOT NULL DEFAULT 0,
  `entry` int UNSIGNED NOT NULL DEFAULT 0,
  `owner` int UNSIGNED NOT NULL DEFAULT 0,
  `modelid` int UNSIGNED NULL DEFAULT 0,
  `CreatedBySpell` int UNSIGNED NOT NULL DEFAULT 0,
  `PetType` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `level` int UNSIGNED NOT NULL DEFAULT 1,
  `exp` int UNSIGNED NOT NULL DEFAULT 0,
  `Reactstate` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `loyaltypoints` int NOT NULL DEFAULT 0,
  `loyalty` int UNSIGNED NOT NULL DEFAULT 0,
  `trainpoint` int NOT NULL DEFAULT 0,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Pet',
  `renamed` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `slot` int UNSIGNED NOT NULL DEFAULT 0,
  `curhealth` int UNSIGNED NOT NULL DEFAULT 1,
  `curmana` int UNSIGNED NOT NULL DEFAULT 0,
  `curhappiness` int UNSIGNED NOT NULL DEFAULT 0,
  `savetime` bigint UNSIGNED NOT NULL DEFAULT 0,
  `resettalents_cost` int UNSIGNED NOT NULL DEFAULT 0,
  `resettalents_time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `abdata` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `teachspelldata` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_owner`(`owner`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Pet System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_queststatus
-- ----------------------------
DROP TABLE IF EXISTS `character_queststatus`;
CREATE TABLE `character_queststatus`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `quest` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Quest Identifier',
  `status` int UNSIGNED NOT NULL DEFAULT 0,
  `rewarded` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `explored` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `timer` bigint UNSIGNED NOT NULL DEFAULT 0,
  `mobcount1` int UNSIGNED NOT NULL DEFAULT 0,
  `mobcount2` int UNSIGNED NOT NULL DEFAULT 0,
  `mobcount3` int UNSIGNED NOT NULL DEFAULT 0,
  `mobcount4` int UNSIGNED NOT NULL DEFAULT 0,
  `itemcount1` int UNSIGNED NOT NULL DEFAULT 0,
  `itemcount2` int UNSIGNED NOT NULL DEFAULT 0,
  `itemcount3` int UNSIGNED NOT NULL DEFAULT 0,
  `itemcount4` int UNSIGNED NOT NULL DEFAULT 0,
  `reward_choice` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `quest`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_reputation
-- ----------------------------
DROP TABLE IF EXISTS `character_reputation`;
CREATE TABLE `character_reputation`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `faction` int UNSIGNED NOT NULL DEFAULT 0,
  `standing` int NOT NULL DEFAULT 0,
  `flags` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `faction`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_reputation_broken
-- ----------------------------
DROP TABLE IF EXISTS `character_reputation_broken`;
CREATE TABLE `character_reputation_broken`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `faction` int UNSIGNED NOT NULL DEFAULT 0,
  `standing` int NOT NULL DEFAULT 0,
  `flags` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `faction`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_skills
-- ----------------------------
DROP TABLE IF EXISTS `character_skills`;
CREATE TABLE `character_skills`  (
  `guid` int UNSIGNED NOT NULL COMMENT 'Global Unique Identifier',
  `skill` mediumint UNSIGNED NOT NULL,
  `value` mediumint UNSIGNED NOT NULL,
  `max` mediumint UNSIGNED NOT NULL,
  PRIMARY KEY (`guid`, `skill`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_skills_copy
-- ----------------------------
DROP TABLE IF EXISTS `character_skills_copy`;
CREATE TABLE `character_skills_copy`  (
  `guid` int UNSIGNED NOT NULL COMMENT 'Global Unique Identifier',
  `skill` mediumint UNSIGNED NOT NULL,
  `value` mediumint UNSIGNED NOT NULL,
  `max` mediumint UNSIGNED NOT NULL,
  PRIMARY KEY (`guid`, `skill`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_social
-- ----------------------------
DROP TABLE IF EXISTS `character_social`;
CREATE TABLE `character_social`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Character Global Unique Identifier',
  `friend` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Friend Global Unique Identifier',
  `flags` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Friend Flags',
  PRIMARY KEY (`guid`, `friend`, `flags`) USING BTREE,
  INDEX `idx_guid`(`guid`) USING BTREE,
  INDEX `idx_friend`(`friend`) USING BTREE,
  INDEX `idx_guid_flags`(`guid`, `flags`) USING BTREE,
  INDEX `idx_friend_flags`(`friend`, `flags`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_spell
-- ----------------------------
DROP TABLE IF EXISTS `character_spell`;
CREATE TABLE `character_spell`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `spell` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Spell Identifier',
  `active` tinyint UNSIGNED NOT NULL DEFAULT 1,
  `disabled` tinyint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `spell`) USING BTREE,
  INDEX `idx_spell`(`spell`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_spell_cooldown
-- ----------------------------
DROP TABLE IF EXISTS `character_spell_cooldown`;
CREATE TABLE `character_spell_cooldown`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier, Low part',
  `spell` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Spell Identifier',
  `item` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item Identifier',
  `time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `catTime` bigint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `spell`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for character_spell_dual_spec
-- ----------------------------
DROP TABLE IF EXISTS `character_spell_dual_spec`;
CREATE TABLE `character_spell_dual_spec`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `spell` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Spell Identifier',
  `spec` tinyint UNSIGNED NOT NULL DEFAULT 1 COMMENT 'primary or secondary',
  PRIMARY KEY (`guid`, `spell`, `spec`) USING BTREE,
  INDEX `idx_spell`(`spell`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_stats
-- ----------------------------
DROP TABLE IF EXISTS `character_stats`;
CREATE TABLE `character_stats`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier, Low part',
  `maxhealth` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower1` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower2` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower3` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower4` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower5` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower6` int UNSIGNED NOT NULL DEFAULT 0,
  `maxpower7` int UNSIGNED NOT NULL DEFAULT 0,
  `strength` int UNSIGNED NOT NULL DEFAULT 0,
  `agility` int UNSIGNED NOT NULL DEFAULT 0,
  `stamina` int UNSIGNED NOT NULL DEFAULT 0,
  `intellect` int UNSIGNED NOT NULL DEFAULT 0,
  `spirit` int UNSIGNED NOT NULL DEFAULT 0,
  `armor` int UNSIGNED NOT NULL DEFAULT 0,
  `resHoly` int UNSIGNED NOT NULL DEFAULT 0,
  `resFire` int UNSIGNED NOT NULL DEFAULT 0,
  `resNature` int UNSIGNED NOT NULL DEFAULT 0,
  `resFrost` int UNSIGNED NOT NULL DEFAULT 0,
  `resShadow` int UNSIGNED NOT NULL DEFAULT 0,
  `resArcane` int UNSIGNED NOT NULL DEFAULT 0,
  `blockPct` float UNSIGNED NOT NULL DEFAULT 0,
  `dodgePct` float UNSIGNED NOT NULL DEFAULT 0,
  `parryPct` float UNSIGNED NOT NULL DEFAULT 0,
  `critPct` float UNSIGNED NOT NULL DEFAULT 0,
  `rangedCritPct` float UNSIGNED NOT NULL DEFAULT 0,
  `attackPower` int UNSIGNED NOT NULL DEFAULT 0,
  `rangedAttackPower` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for character_ticket
-- ----------------------------
DROP TABLE IF EXISTS `character_ticket`;
CREATE TABLE `character_ticket`  (
  `ticket_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `ticket_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `response_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ticket_lastchange` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ticket_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_titles
-- ----------------------------
DROP TABLE IF EXISTS `character_titles`;
CREATE TABLE `character_titles`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `title` int UNSIGNED NOT NULL DEFAULT 0,
  `active` tinyint NOT NULL DEFAULT 0
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_transmogs
-- ----------------------------
DROP TABLE IF EXISTS `character_transmogs`;
CREATE TABLE `character_transmogs`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `itemId` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `itemId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_tutorial
-- ----------------------------
DROP TABLE IF EXISTS `character_tutorial`;
CREATE TABLE `character_tutorial`  (
  `account` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Account Identifier',
  `tut0` int UNSIGNED NOT NULL DEFAULT 0,
  `tut1` int UNSIGNED NOT NULL DEFAULT 0,
  `tut2` int UNSIGNED NOT NULL DEFAULT 0,
  `tut3` int UNSIGNED NOT NULL DEFAULT 0,
  `tut4` int UNSIGNED NOT NULL DEFAULT 0,
  `tut5` int UNSIGNED NOT NULL DEFAULT 0,
  `tut6` int UNSIGNED NOT NULL DEFAULT 0,
  `tut7` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`account`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3514189 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_variables
-- ----------------------------
DROP TABLE IF EXISTS `character_variables`;
CREATE TABLE `character_variables`  (
  `lowGuid` int UNSIGNED NOT NULL,
  `variableType` int UNSIGNED NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`lowGuid`, `variableType`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_xp_from_log
-- ----------------------------
DROP TABLE IF EXISTS `character_xp_from_log`;
CREATE TABLE `character_xp_from_log`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `type` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `xp` bigint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for characters
-- ----------------------------
DROP TABLE IF EXISTS `characters`;
CREATE TABLE `characters`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `account` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Account Identifier',
  `name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `race` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `class` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `gender` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `level` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `xp` int UNSIGNED NOT NULL DEFAULT 0,
  `money` int UNSIGNED NOT NULL DEFAULT 0,
  `playerBytes` int UNSIGNED NOT NULL DEFAULT 0,
  `playerBytes2` int UNSIGNED NOT NULL DEFAULT 0,
  `playerFlags` int UNSIGNED NOT NULL DEFAULT 0,
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `map` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Map Identifier',
  `orientation` float NOT NULL DEFAULT 0,
  `taximask` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `online` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `cinematic` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `totaltime` int UNSIGNED NOT NULL DEFAULT 0,
  `leveltime` int UNSIGNED NOT NULL DEFAULT 0,
  `logout_time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `is_logout_resting` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `rest_bonus` float NOT NULL DEFAULT 0,
  `resettalents_multiplier` int UNSIGNED NOT NULL DEFAULT 0,
  `resettalents_time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `trans_x` float NOT NULL DEFAULT 0,
  `trans_y` float NOT NULL DEFAULT 0,
  `trans_z` float NOT NULL DEFAULT 0,
  `trans_o` float NOT NULL DEFAULT 0,
  `transguid` bigint UNSIGNED NOT NULL DEFAULT 0,
  `extra_flags` int UNSIGNED NOT NULL DEFAULT 0,
  `stable_slots` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `at_login` int UNSIGNED NOT NULL DEFAULT 0,
  `zone` int UNSIGNED NOT NULL DEFAULT 0,
  `death_expire_time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `taxi_path` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `honorRankPoints` float NOT NULL DEFAULT 0,
  `honorHighestRank` int UNSIGNED NOT NULL DEFAULT 0,
  `honorStanding` int UNSIGNED NOT NULL DEFAULT 0,
  `honorLastWeekHK` int UNSIGNED NOT NULL DEFAULT 0,
  `honorLastWeekCP` decimal(11, 1) NOT NULL DEFAULT 0.0,
  `honorStoredHK` int NOT NULL DEFAULT 0,
  `honorStoredDK` int NOT NULL DEFAULT 0,
  `watchedFaction` int UNSIGNED NOT NULL DEFAULT 0,
  `drunk` smallint UNSIGNED NOT NULL DEFAULT 0,
  `health` int UNSIGNED NOT NULL DEFAULT 0,
  `power1` int UNSIGNED NOT NULL DEFAULT 0,
  `power2` int UNSIGNED NOT NULL DEFAULT 0,
  `power3` int UNSIGNED NOT NULL DEFAULT 0,
  `power4` int UNSIGNED NOT NULL DEFAULT 0,
  `power5` int UNSIGNED NOT NULL DEFAULT 0,
  `exploredZones` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `equipmentCache` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ammoId` int UNSIGNED NOT NULL DEFAULT 0,
  `actionBars` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `deleteInfos_Account` int UNSIGNED NULL DEFAULT NULL,
  `deleteInfos_Name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `deleteDate` bigint NULL DEFAULT NULL,
  `area` int UNSIGNED NOT NULL DEFAULT 0,
  `world_phase_mask` int NULL DEFAULT 0,
  `customFlags` int NOT NULL DEFAULT 0,
  `city_protector` tinyint NOT NULL DEFAULT 0,
  `regexFilterCount` int UNSIGNED NOT NULL DEFAULT 0,
  `isGMCharacter` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `ignore_titles` tinyint NOT NULL DEFAULT 0,
  `mortality_status` tinyint NOT NULL DEFAULT 0,
  `total_deaths` int NOT NULL DEFAULT 0,
  `xp_gain` tinyint UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`guid`) USING BTREE,
  INDEX `idx_account`(`account`) USING BTREE,
  INDEX `idx_online`(`online`) USING BTREE,
  INDEX `idx_name`(`name`) USING BTREE,
  INDEX `deleteDate`(`deleteDate`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for characters_namecleanup2020_2
-- ----------------------------
DROP TABLE IF EXISTS `characters_namecleanup2020_2`;
CREATE TABLE `characters_namecleanup2020_2`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `account` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Account Identifier',
  `name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `race` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `class` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `gender` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `level` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `xp` int UNSIGNED NOT NULL DEFAULT 0,
  `money` int UNSIGNED NOT NULL DEFAULT 0,
  `playerBytes` int UNSIGNED NOT NULL DEFAULT 0,
  `playerBytes2` int UNSIGNED NOT NULL DEFAULT 0,
  `playerFlags` int UNSIGNED NOT NULL DEFAULT 0,
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `map` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Map Identifier',
  `orientation` float NOT NULL DEFAULT 0,
  `taximask` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `online` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `cinematic` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `totaltime` int UNSIGNED NOT NULL DEFAULT 0,
  `leveltime` int UNSIGNED NOT NULL DEFAULT 0,
  `logout_time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `is_logout_resting` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `rest_bonus` float NOT NULL DEFAULT 0,
  `resettalents_multiplier` int UNSIGNED NOT NULL DEFAULT 0,
  `resettalents_time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `trans_x` float NOT NULL DEFAULT 0,
  `trans_y` float NOT NULL DEFAULT 0,
  `trans_z` float NOT NULL DEFAULT 0,
  `trans_o` float NOT NULL DEFAULT 0,
  `transguid` bigint UNSIGNED NOT NULL DEFAULT 0,
  `extra_flags` int UNSIGNED NOT NULL DEFAULT 0,
  `stable_slots` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `at_login` int UNSIGNED NOT NULL DEFAULT 0,
  `zone` int UNSIGNED NOT NULL DEFAULT 0,
  `death_expire_time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `taxi_path` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `honorRankPoints` float NOT NULL DEFAULT 0,
  `honorHighestRank` int UNSIGNED NOT NULL DEFAULT 0,
  `honorStanding` int UNSIGNED NOT NULL DEFAULT 0,
  `honorLastWeekHK` int UNSIGNED NOT NULL DEFAULT 0,
  `honorLastWeekCP` decimal(11, 1) NOT NULL DEFAULT 0.0,
  `honorStoredHK` int NOT NULL DEFAULT 0,
  `honorStoredDK` int NOT NULL DEFAULT 0,
  `watchedFaction` int UNSIGNED NOT NULL DEFAULT 0,
  `drunk` smallint UNSIGNED NOT NULL DEFAULT 0,
  `health` int UNSIGNED NOT NULL DEFAULT 0,
  `power1` int UNSIGNED NOT NULL DEFAULT 0,
  `power2` int UNSIGNED NOT NULL DEFAULT 0,
  `power3` int UNSIGNED NOT NULL DEFAULT 0,
  `power4` int UNSIGNED NOT NULL DEFAULT 0,
  `power5` int UNSIGNED NOT NULL DEFAULT 0,
  `exploredZones` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `equipmentCache` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ammoId` int UNSIGNED NOT NULL DEFAULT 0,
  `actionBars` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `deleteInfos_Account` int UNSIGNED NULL DEFAULT NULL,
  `deleteInfos_Name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `deleteDate` bigint NULL DEFAULT NULL,
  `area` int UNSIGNED NOT NULL DEFAULT 0,
  `world_phase_mask` int NULL DEFAULT 0,
  `customFlags` int NOT NULL DEFAULT 0,
  `city_protector` tinyint NOT NULL DEFAULT 0,
  `regexFilterCount` int UNSIGNED NOT NULL DEFAULT 0,
  `isGMCharacter` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `ignore_titles` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE,
  INDEX `idx_account`(`account`) USING BTREE,
  INDEX `idx_online`(`online`) USING BTREE,
  INDEX `idx_name`(`name`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for corpse
-- ----------------------------
DROP TABLE IF EXISTS `corpse`;
CREATE TABLE `corpse`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `player` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Character Global Unique Identifier',
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `orientation` float NOT NULL DEFAULT 0,
  `map` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Map Identifier',
  `time` bigint UNSIGNED NOT NULL DEFAULT 0,
  `corpse_type` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `instance` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE,
  INDEX `idx_type`(`corpse_type`) USING BTREE,
  INDEX `idx_instance`(`instance`) USING BTREE,
  INDEX `idx_player`(`player`) USING BTREE,
  INDEX `idx_time`(`time`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Death System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for creature_respawn
-- ----------------------------
DROP TABLE IF EXISTS `creature_respawn`;
CREATE TABLE `creature_respawn`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `respawntime` bigint NOT NULL DEFAULT 0,
  `instance` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `map` int UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `instance`) USING BTREE,
  INDEX `idx_instance`(`instance`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Grid Loading System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for game_event_status
-- ----------------------------
DROP TABLE IF EXISTS `game_event_status`;
CREATE TABLE `game_event_status`  (
  `event` smallint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`event`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Game event system' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for gameobject_respawn
-- ----------------------------
DROP TABLE IF EXISTS `gameobject_respawn`;
CREATE TABLE `gameobject_respawn`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `respawntime` bigint NOT NULL DEFAULT 0,
  `instance` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `map` int UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `instance`) USING BTREE,
  INDEX `idx_instance`(`instance`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Grid Loading System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for gm_subsurveys
-- ----------------------------
DROP TABLE IF EXISTS `gm_subsurveys`;
CREATE TABLE `gm_subsurveys`  (
  `surveyId` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `subsurveyId` int UNSIGNED NOT NULL DEFAULT 0,
  `rank` int UNSIGNED NOT NULL DEFAULT 0,
  `comment` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`surveyId`, `subsurveyId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gm_surveys
-- ----------------------------
DROP TABLE IF EXISTS `gm_surveys`;
CREATE TABLE `gm_surveys`  (
  `surveyId` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `mainSurvey` int UNSIGNED NOT NULL DEFAULT 0,
  `overallComment` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`surveyId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gm_tickets
-- ----------------------------
DROP TABLE IF EXISTS `gm_tickets`;
CREATE TABLE `gm_tickets`  (
  `ticketId` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier of ticket creator',
  `name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Name of ticket creator',
  `message` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` int UNSIGNED NOT NULL DEFAULT 0,
  `mapId` smallint UNSIGNED NOT NULL DEFAULT 0,
  `posX` float NOT NULL DEFAULT 0,
  `posY` float NOT NULL DEFAULT 0,
  `posZ` float NOT NULL DEFAULT 0,
  `lastModifiedTime` int UNSIGNED NOT NULL DEFAULT 0,
  `closedBy` int NOT NULL DEFAULT 0,
  `assignedTo` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'GUID of admin to whom ticket is assigned',
  `comment` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `response` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `completed` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `escalated` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `viewed` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `haveTicket` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `ticketType` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `securityNeeded` tinyint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 81990 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for group_instance
-- ----------------------------
DROP TABLE IF EXISTS `group_instance`;
CREATE TABLE `group_instance`  (
  `leaderGuid` int UNSIGNED NOT NULL DEFAULT 0,
  `instance` int UNSIGNED NOT NULL DEFAULT 0,
  `permanent` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`leaderGuid`, `instance`) USING BTREE,
  INDEX `idx_instance`(`instance`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for group_member
-- ----------------------------
DROP TABLE IF EXISTS `group_member`;
CREATE TABLE `group_member`  (
  `groupId` int UNSIGNED NOT NULL,
  `memberGuid` int UNSIGNED NOT NULL,
  `assistant` tinyint(1) UNSIGNED NOT NULL,
  `subgroup` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`groupId`, `memberGuid`) USING BTREE,
  INDEX `idx_memberGuid`(`memberGuid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Groups' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups`  (
  `groupId` int UNSIGNED NOT NULL,
  `leaderGuid` int UNSIGNED NOT NULL,
  `mainTank` int UNSIGNED NOT NULL,
  `mainAssistant` int UNSIGNED NOT NULL,
  `lootMethod` tinyint UNSIGNED NOT NULL,
  `looterGuid` int UNSIGNED NOT NULL,
  `lootThreshold` tinyint UNSIGNED NOT NULL,
  `icon1` int UNSIGNED NOT NULL,
  `icon2` int UNSIGNED NOT NULL,
  `icon3` int UNSIGNED NOT NULL,
  `icon4` int UNSIGNED NOT NULL,
  `icon5` int UNSIGNED NOT NULL,
  `icon6` int UNSIGNED NOT NULL,
  `icon7` int UNSIGNED NOT NULL,
  `icon8` int UNSIGNED NOT NULL,
  `isRaid` tinyint(1) UNSIGNED NOT NULL,
  PRIMARY KEY (`groupId`) USING BTREE,
  UNIQUE INDEX `key_leaderGuid`(`leaderGuid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Groups' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for guild
-- ----------------------------
DROP TABLE IF EXISTS `guild`;
CREATE TABLE `guild`  (
  `guildid` int UNSIGNED NOT NULL DEFAULT 0,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `leaderguid` int UNSIGNED NOT NULL DEFAULT 0,
  `EmblemStyle` int NOT NULL DEFAULT 0,
  `EmblemColor` int NOT NULL DEFAULT 0,
  `BorderStyle` int NOT NULL DEFAULT 0,
  `BorderColor` int NOT NULL DEFAULT 0,
  `BackgroundColor` int NOT NULL DEFAULT 0,
  `info` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `motd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createdate` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`guildid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Guild System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for guild_bank
-- ----------------------------
DROP TABLE IF EXISTS `guild_bank`;
CREATE TABLE `guild_bank`  (
  `guildid` int UNSIGNED NOT NULL,
  `guid` int NOT NULL,
  `isInferno` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `tab` int UNSIGNED NOT NULL DEFAULT 0,
  `slot` tinyint UNSIGNED NOT NULL,
  `item_template` int UNSIGNED NOT NULL,
  `creatorGuid` int UNSIGNED NOT NULL DEFAULT 0,
  `giftCreatorGuid` int UNSIGNED NOT NULL DEFAULT 0,
  `count` int UNSIGNED NOT NULL DEFAULT 0,
  `duration` int NOT NULL DEFAULT 0,
  `charges` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `flags` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `enchantments` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `randomPropertyId` smallint NOT NULL DEFAULT 0,
  `transmogrifyId` int UNSIGNED NOT NULL DEFAULT 0,
  `durability` smallint UNSIGNED NOT NULL DEFAULT 0,
  `text` int UNSIGNED NOT NULL DEFAULT 0,
  `generated_loot` tinyint NULL DEFAULT 0,
  UNIQUE INDEX `guildidandguidandinferno`(`guildid`, `guid`, `isInferno`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_bank_analysis
-- ----------------------------
DROP TABLE IF EXISTS `guild_bank_analysis`;
CREATE TABLE `guild_bank_analysis`  (
  `guildid` int UNSIGNED NOT NULL,
  `guid` int NOT NULL,
  `isInferno` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `tab` int UNSIGNED NOT NULL DEFAULT 0,
  `slot` tinyint UNSIGNED NOT NULL,
  `item_template` int UNSIGNED NOT NULL,
  `creatorGuid` int UNSIGNED NOT NULL DEFAULT 0,
  `giftCreatorGuid` int UNSIGNED NOT NULL DEFAULT 0,
  `count` int UNSIGNED NOT NULL DEFAULT 0,
  `duration` int NOT NULL DEFAULT 0,
  `charges` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `flags` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `enchantments` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `randomPropertyId` smallint NOT NULL DEFAULT 0,
  `transmogrifyId` int UNSIGNED NOT NULL DEFAULT 0,
  `durability` smallint UNSIGNED NOT NULL DEFAULT 0,
  `text` int UNSIGNED NOT NULL DEFAULT 0,
  `generated_loot` tinyint NULL DEFAULT 0,
  UNIQUE INDEX `guildidandguidandinferno`(`guildid`, `guid`, `isInferno`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_bank_log
-- ----------------------------
DROP TABLE IF EXISTS `guild_bank_log`;
CREATE TABLE `guild_bank_log`  (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `isInferno` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `guildid` int NOT NULL,
  `player` int NOT NULL,
  `action` int NOT NULL,
  `tab` int NOT NULL DEFAULT 1,
  `item` int NOT NULL,
  `randomPropertyId` int NOT NULL DEFAULT 0,
  `enchant` int NOT NULL DEFAULT 0,
  `count` int NOT NULL,
  `stamp` bigint NOT NULL,
  PRIMARY KEY (`log_id`) USING BTREE,
  INDEX `stamp`(`stamp`, `isInferno`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 378843 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_bank_money
-- ----------------------------
DROP TABLE IF EXISTS `guild_bank_money`;
CREATE TABLE `guild_bank_money`  (
  `guildid` int NOT NULL,
  `isInferno` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `money` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`guildid`, `isInferno`) USING BTREE,
  UNIQUE INDEX `guildid`(`guildid`, `isInferno`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for guild_bank_tabs
-- ----------------------------
DROP TABLE IF EXISTS `guild_bank_tabs`;
CREATE TABLE `guild_bank_tabs`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `guildid` int NOT NULL,
  `isInferno` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `tabs` int NOT NULL DEFAULT 0,
  `name1` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Tab1',
  `name2` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Tab2',
  `name3` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Tab3',
  `name4` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Tab4',
  `name5` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Tab5',
  `icon1` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'inv_misc_bag_08',
  `icon2` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'inv_misc_bag_05',
  `icon3` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'inv_misc_bag_03',
  `icon4` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'inv_misc_bag_06',
  `icon5` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'inv_misc_bag_02',
  `withdrawal1` int NOT NULL DEFAULT 0,
  `withdrawal2` int NOT NULL DEFAULT 0,
  `withdrawal3` int NOT NULL DEFAULT 0,
  `withdrawal4` int NOT NULL DEFAULT 0,
  `withdrawal5` int NOT NULL DEFAULT 0,
  `minrank1` int NOT NULL DEFAULT 0,
  `minrank2` int NOT NULL DEFAULT 0,
  `minrank3` int NOT NULL DEFAULT 0,
  `minrank4` int NOT NULL DEFAULT 0,
  `minrank5` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 77 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_eventlog
-- ----------------------------
DROP TABLE IF EXISTS `guild_eventlog`;
CREATE TABLE `guild_eventlog`  (
  `guildid` int NOT NULL COMMENT 'Guild Identificator',
  `LogGuid` int NOT NULL COMMENT 'Log record identificator - auxiliary column',
  `EventType` tinyint(1) NOT NULL COMMENT 'Event type',
  `PlayerGuid1` int NOT NULL COMMENT 'Player 1',
  `PlayerGuid2` int NOT NULL COMMENT 'Player 2',
  `NewRank` tinyint NOT NULL COMMENT 'New rank(in case promotion/demotion)',
  `TimeStamp` bigint NOT NULL COMMENT 'Event UNIX time',
  PRIMARY KEY (`guildid`, `LogGuid`) USING BTREE,
  INDEX `idx_PlayerGuid1`(`PlayerGuid1`) USING BTREE,
  INDEX `idx_PlayerGuid2`(`PlayerGuid2`) USING BTREE,
  INDEX `idx_LogGuid`(`LogGuid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Guild Eventlog' ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for guild_house
-- ----------------------------
DROP TABLE IF EXISTS `guild_house`;
CREATE TABLE `guild_house`  (
  `guild_id` mediumint UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Identifier',
  `map_id` smallint UNSIGNED NOT NULL DEFAULT 0,
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `orientation` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`guild_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Teleportation coordinates for Guild Housing' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for guild_member
-- ----------------------------
DROP TABLE IF EXISTS `guild_member`;
CREATE TABLE `guild_member`  (
  `guildid` int UNSIGNED NOT NULL DEFAULT 0,
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `rank` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `pnote` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `offnote` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  UNIQUE INDEX `key_guid`(`guid`) USING BTREE,
  INDEX `idx_guildid`(`guildid`) USING BTREE,
  INDEX `idx_guildid_rank`(`guildid`, `rank`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Guild System' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for guild_rank
-- ----------------------------
DROP TABLE IF EXISTS `guild_rank`;
CREATE TABLE `guild_rank`  (
  `guildid` int UNSIGNED NOT NULL DEFAULT 0,
  `rid` int UNSIGNED NOT NULL,
  `rname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `rights` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guildid`, `rid`) USING BTREE,
  INDEX `idx_rid`(`rid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Guild System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for hardcore_deaths
-- ----------------------------
DROP TABLE IF EXISTS `hardcore_deaths`;
CREATE TABLE `hardcore_deaths`  (
  `lowGuid` int UNSIGNED NOT NULL,
  `race` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `class` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `level` int UNSIGNED NOT NULL,
  `attackerEntry` int UNSIGNED NOT NULL,
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `mapId` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`lowGuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for instance
-- ----------------------------
DROP TABLE IF EXISTS `instance`;
CREATE TABLE `instance`  (
  `id` int UNSIGNED NOT NULL DEFAULT 0,
  `map` int UNSIGNED NOT NULL DEFAULT 0,
  `resettime` bigint NOT NULL DEFAULT 0,
  `data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_map`(`map`) USING BTREE,
  INDEX `idx_resettime`(`resettime`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for instance_reset
-- ----------------------------
DROP TABLE IF EXISTS `instance_reset`;
CREATE TABLE `instance_reset`  (
  `mapid` int UNSIGNED NOT NULL DEFAULT 0,
  `resettime` bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (`mapid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for item_instance
-- ----------------------------
DROP TABLE IF EXISTS `item_instance`;
CREATE TABLE `item_instance`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `itemEntry` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `owner_guid` int UNSIGNED NOT NULL DEFAULT 0,
  `creatorGuid` int UNSIGNED NOT NULL DEFAULT 0,
  `giftCreatorGuid` int UNSIGNED NOT NULL DEFAULT 0,
  `count` int UNSIGNED NOT NULL DEFAULT 1,
  `duration` int NOT NULL DEFAULT 0,
  `charges` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `flags` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `enchantments` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `randomPropertyId` smallint NOT NULL DEFAULT 0,
  `transmogrifyId` int UNSIGNED NOT NULL DEFAULT 0,
  `durability` smallint UNSIGNED NOT NULL DEFAULT 0,
  `text` int UNSIGNED NOT NULL DEFAULT 0,
  `generated_loot` tinyint NULL DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE,
  INDEX `idx_owner_guid`(`owner_guid`) USING BTREE,
  INDEX `idx_itemEntry`(`itemEntry`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Item System' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for item_loot
-- ----------------------------
DROP TABLE IF EXISTS `item_loot`;
CREATE TABLE `item_loot`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `owner_guid` int UNSIGNED NOT NULL DEFAULT 0,
  `itemid` int UNSIGNED NOT NULL DEFAULT 0,
  `amount` int UNSIGNED NOT NULL DEFAULT 0,
  `property` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `itemid`) USING BTREE,
  INDEX `idx_owner_guid`(`owner_guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Item System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for item_text
-- ----------------------------
DROP TABLE IF EXISTS `item_text`;
CREATE TABLE `item_text`  (
  `id` int UNSIGNED NOT NULL DEFAULT 0,
  `text` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Item System' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for logs_anticheat
-- ----------------------------
DROP TABLE IF EXISTS `logs_anticheat`;
CREATE TABLE `logs_anticheat`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL DEFAULT current_timestamp,
  `realm` int UNSIGNED NOT NULL,
  `account` int UNSIGNED NOT NULL,
  `ip` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fingerprint` int UNSIGNED NOT NULL,
  `actionMask` int UNSIGNED NULL DEFAULT NULL,
  `player` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `info` varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account`(`account`) USING BTREE,
  INDEX `ip`(`ip`) USING BTREE,
  INDEX `time`(`time`) USING BTREE,
  INDEX `realm`(`realm`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20416529 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for logs_movement
-- ----------------------------
DROP TABLE IF EXISTS `logs_movement`;
CREATE TABLE `logs_movement`  (
  `account` int UNSIGNED NOT NULL,
  `guid` int UNSIGNED NOT NULL,
  `posx` float NOT NULL,
  `posy` float NOT NULL,
  `posz` float NOT NULL,
  `map` int UNSIGNED NOT NULL,
  `desyncMs` int NOT NULL,
  `desyncDist` float NOT NULL,
  `cheats` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for logs_shellcoin
-- ----------------------------
DROP TABLE IF EXISTS `logs_shellcoin`;
CREATE TABLE `logs_shellcoin`  (
  `time` bigint NOT NULL DEFAULT 0,
  `count` int NOT NULL DEFAULT 0,
  `price` int NOT NULL DEFAULT 0,
  INDEX `time`(`time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for logs_spamdetect
-- ----------------------------
DROP TABLE IF EXISTS `logs_spamdetect`;
CREATE TABLE `logs_spamdetect`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` timestamp NOT NULL DEFAULT current_timestamp,
  `realm` int UNSIGNED NOT NULL,
  `accountId` int NULL DEFAULT 0,
  `fromIP` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fromFingerprint` int UNSIGNED NOT NULL,
  `comment` varchar(8192) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 80904 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for logs_warden
-- ----------------------------
DROP TABLE IF EXISTS `logs_warden`;
CREATE TABLE `logs_warden`  (
  `entry` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Log entry ID',
  `check` smallint UNSIGNED NOT NULL COMMENT 'Failed Warden check ID',
  `action` tinyint UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Action taken (enum WardenActions)',
  `account` int UNSIGNED NOT NULL COMMENT 'Account ID',
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Player GUID',
  `map` int UNSIGNED NULL DEFAULT NULL COMMENT 'Map ID',
  `position_x` float NULL DEFAULT NULL COMMENT 'Player position X',
  `position_y` float NULL DEFAULT NULL COMMENT 'Player position Y',
  `position_z` float NULL DEFAULT NULL COMMENT 'Player position Z',
  `date` timestamp NOT NULL DEFAULT current_timestamp COMMENT 'Date of the log entry',
  PRIMARY KEY (`entry`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Warden log of failed checks' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for mail
-- ----------------------------
DROP TABLE IF EXISTS `mail`;
CREATE TABLE `mail`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Identifier',
  `messageType` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `stationery` tinyint NOT NULL DEFAULT 41,
  `mailTemplateId` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `sender` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Character Global Unique Identifier',
  `receiver` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Character Global Unique Identifier',
  `subject` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `itemTextId` int UNSIGNED NOT NULL DEFAULT 0,
  `has_items` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `expire_time` bigint NOT NULL DEFAULT 0,
  `deliver_time` bigint NOT NULL DEFAULT 0,
  `money` int UNSIGNED NOT NULL DEFAULT 0,
  `cod` int UNSIGNED NOT NULL DEFAULT 0,
  `checked` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `isDeleted` tinyint UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_receiver`(`receiver`) USING BTREE,
  INDEX `FK_mail_item_text`(`itemTextId`) USING BTREE,
  INDEX `expire_time`(`expire_time`) USING BTREE,
  INDEX `isDeleted`(`isDeleted`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 72065900 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Mail System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for mail_items
-- ----------------------------
DROP TABLE IF EXISTS `mail_items`;
CREATE TABLE `mail_items`  (
  `mail_id` int UNSIGNED NOT NULL DEFAULT 0,
  `item_guid` int UNSIGNED NOT NULL DEFAULT 0,
  `item_template` int UNSIGNED NOT NULL DEFAULT 0,
  `receiver` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Character Global Unique Identifier',
  PRIMARY KEY (`mail_id`, `item_guid`) USING BTREE,
  INDEX `idx_receiver`(`receiver`) USING BTREE,
  INDEX `idx_item_guid`(`item_guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `Id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `Hash` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `AppliedAt` datetime NOT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pet_aura
-- ----------------------------
DROP TABLE IF EXISTS `pet_aura`;
CREATE TABLE `pet_aura`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `caster_guid` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Full Global Unique Identifier',
  `item_guid` int UNSIGNED NOT NULL DEFAULT 0,
  `spell` int UNSIGNED NOT NULL DEFAULT 0,
  `stackcount` int UNSIGNED NOT NULL DEFAULT 1,
  `remaincharges` int UNSIGNED NOT NULL DEFAULT 0,
  `basepoints0` int NOT NULL DEFAULT 0,
  `basepoints1` int NOT NULL DEFAULT 0,
  `basepoints2` int NOT NULL DEFAULT 0,
  `periodictime0` int UNSIGNED NOT NULL DEFAULT 0,
  `periodictime1` int UNSIGNED NOT NULL DEFAULT 0,
  `periodictime2` int UNSIGNED NOT NULL DEFAULT 0,
  `maxduration` int NOT NULL DEFAULT 0,
  `remaintime` int NOT NULL DEFAULT 0,
  `effIndexMask` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `caster_guid`, `item_guid`, `spell`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Pet System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pet_spell
-- ----------------------------
DROP TABLE IF EXISTS `pet_spell`;
CREATE TABLE `pet_spell`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `spell` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Spell Identifier',
  `active` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `spell`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Pet System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pet_spell_cooldown
-- ----------------------------
DROP TABLE IF EXISTS `pet_spell_cooldown`;
CREATE TABLE `pet_spell_cooldown`  (
  `guid` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier, Low part',
  `spell` int UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Spell Identifier',
  `time` bigint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `spell`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for petition
-- ----------------------------
DROP TABLE IF EXISTS `petition`;
CREATE TABLE `petition`  (
  `ownerguid` int UNSIGNED NOT NULL,
  `petitionguid` int UNSIGNED NULL DEFAULT 0,
  `charterguid` int UNSIGNED NULL DEFAULT NULL COMMENT 'Charter item GUID',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ownerguid`) USING BTREE,
  UNIQUE INDEX `key_ownerguid_petitionguid`(`ownerguid`, `petitionguid`) USING BTREE,
  UNIQUE INDEX `charterguid`(`charterguid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Guild System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for petition_sign
-- ----------------------------
DROP TABLE IF EXISTS `petition_sign`;
CREATE TABLE `petition_sign`  (
  `ownerguid` int UNSIGNED NOT NULL,
  `petitionguid` int UNSIGNED NOT NULL DEFAULT 0,
  `playerguid` int UNSIGNED NOT NULL DEFAULT 0,
  `player_account` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`petitionguid`, `playerguid`) USING BTREE,
  INDEX `idx_playerguid`(`playerguid`) USING BTREE,
  INDEX `idx_ownerguid`(`ownerguid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Guild System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for playerbot
-- ----------------------------
DROP TABLE IF EXISTS `playerbot`;
CREATE TABLE `playerbot`  (
  `char_guid` bigint UNSIGNED NOT NULL,
  `chance` int UNSIGNED NOT NULL DEFAULT 10,
  `comment` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `ai` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`char_guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for saved_variables
-- ----------------------------
DROP TABLE IF EXISTS `saved_variables`;
CREATE TABLE `saved_variables`  (
  `key` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `cleaning_flags` int UNSIGNED NOT NULL DEFAULT 0,
  `lastHonorMaintenanceDay` int UNSIGNED NOT NULL DEFAULT 0,
  `nextHonorMaintenanceDay` int UNSIGNED NOT NULL DEFAULT 0,
  `honorMaintenanceMarker` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Variable Saves' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for store_racechange
-- ----------------------------
DROP TABLE IF EXISTS `store_racechange`;
CREATE TABLE `store_racechange`  (
  `guid` int UNSIGNED NOT NULL,
  `race` tinyint(1) UNSIGNED NOT NULL,
  `gender` tinyint(1) UNSIGNED NOT NULL,
  `playerbytes1` int UNSIGNED NOT NULL,
  `playerbytes2` int UNSIGNED NOT NULL,
  `transaction` int UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`transaction`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Race change requests from web backend. Playerbytes is from \'characters\' table, is used to copy new character outfit.' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for whisper_targets
-- ----------------------------
DROP TABLE IF EXISTS `whisper_targets`;
CREATE TABLE `whisper_targets`  (
  `account` int UNSIGNED NOT NULL,
  `target_guid` int UNSIGNED NOT NULL,
  `time` int UNSIGNED NOT NULL,
  UNIQUE INDEX `account_target`(`account`, `target_guid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for world
-- ----------------------------
DROP TABLE IF EXISTS `world`;
CREATE TABLE `world`  (
  `map` int UNSIGNED NOT NULL DEFAULT 0,
  `data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`map`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for worldstates
-- ----------------------------
DROP TABLE IF EXISTS `worldstates`;
CREATE TABLE `worldstates`  (
  `entry` int NULL DEFAULT NULL,
  `value` int NULL DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  UNIQUE INDEX `key_entry`(`entry`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE `characters`
	ADD COLUMN `active` TINYINT UNSIGNED NOT NULL DEFAULT '1' AFTER `xp_gain`;

-- ----------------------------
-- Table structure for item_transmogs
-- ----------------------------

DROP TABLE IF EXISTS `item_transmogs`;
CREATE TABLE `item_transmogs`  (
  `ID` int UNSIGNED NOT NULL,
  `ItemID` int UNSIGNED NOT NULL,
  `DisplayID` int UNSIGNED NOT NULL,
  `SourceID` int NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = FIXED;

REPLACE INTO `item_transmogs` VALUES (100001, 12064, 34233, 16921);

DROP TABLE IF EXISTS `variables`;
CREATE TABLE IF NOT EXISTS `variables` (
  `index` int(10) unsigned NOT NULL DEFAULT '0',
  `value` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`index`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;

INSERT INTO `variables` (`index`, `value`) VALUES
(12, 1618618081),
(13, 1618618081),
(10, 139),
(11, 440),
(14, 4),
(15, 0),
(16, 0),
(17, 0),
(18, 0),
(19, 0),
(20, 0),
(21, 0),
(22, 0),
(23, 0),
(30002, 1696509183),
(30054, 1603586531),
(30050, 5),
(30016, 1696369391),
(30017, 0),
(30012, 0),
(30008, 1),
(30020, 0),
(30015, 0),
(30011, 1),
(30019, 0),
(30014, 0),
(30010, 1),
(30018, 0),
(30013, 0),
(30009, 1),
(2318, 30000),
(30032, 100000),
(1251, 100000),
(6450, 100000),
(3575, 14000),
(2447, 12000),
(30027, 4340),
(13935, 2500),
(2319, 27500),
(30028, 13340),
(12359, 12000),
(8836, 10000),
(30033, 100000),
(3820, 5500),
(30026, 4340),
(30029, 13340),
(8544, 41680),
(30024, 15000),
(3576, 5500),
(3860, 9000),
(8170, 15000),
(3530, 41680),
(5095, 2340),
(12210, 5000),
(30030, 5680),
(1, 0),
(0, 0),
(30025, 15000),
(4234, 15000),
(4625, 4760),
(30031, 5680),
(12209, 1680),
(30022, 0),
(30023, 1),
(30021, 1696166609),
(2313, 26),
(2314, 1),
(2317, 200),
(30051, 1603912309),
(30053, 1),
(30052, 1604007207),
(30055, 5),
(2200, 0),
(2204, 0),
(2201, 0),
(2206, 0),
(2203, 0),
(2205, 0),
(2207, 62),
(2202, 0),
(30001, 300),
(30004, 14887),
(30005, 14889),
(30006, 14888),
(30007, 14890);

CREATE TABLE `arena_stats_single` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`arena_id` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`team_id` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`level` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`item_level` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`class` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`race` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`won` TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
	`duration` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`date` DATETIME NOT NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `characters_total_money` (
	`Id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`total_gold` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`time` DATETIME NOT NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`Id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;


