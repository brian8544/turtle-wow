/*
 Navicat MySQL Data Transfer

 Source Server         : Development
 Source Server Type    : MySQL
 Source Server Version : 50737
 Source Host           : localhost:3306
 Source Schema         : turtle_chars

 Target Server Type    : MySQL
 Target Server Version : 50737
 File Encoding         : 65001

 Date: 15/07/2022 18:58:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for auction
-- ----------------------------
DROP TABLE IF EXISTS `auction`;
CREATE TABLE `auction`  (
  `id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `houseid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemguid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `item_template` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item Identifier',
  `itemowner` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `buyoutprice` int(11) NOT NULL DEFAULT 0,
  `time` bigint(20) NOT NULL DEFAULT 0,
  `buyguid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `lastbid` int(11) NOT NULL DEFAULT 0,
  `startbid` int(11) NOT NULL DEFAULT 0,
  `deposit` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key_item_guid`(`itemguid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for bounty_quest_targets
-- ----------------------------
DROP TABLE IF EXISTS `bounty_quest_targets`;
CREATE TABLE `bounty_quest_targets`  (
  `id` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `horde_player` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `alliance_player` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for bugreport
-- ----------------------------
DROP TABLE IF EXISTS `bugreport`;
CREATE TABLE `bugreport`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identifier',
  `type` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Debug System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for bugreports
-- ----------------------------
DROP TABLE IF EXISTS `bugreports`;
CREATE TABLE `bugreports`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `playerGuid` int(11) NULL DEFAULT NULL,
  `playerMap` int(11) NULL DEFAULT NULL,
  `playerInstanceId` int(11) NULL DEFAULT NULL,
  `playerX` float NULL DEFAULT NULL,
  `playerY` float NULL DEFAULT NULL,
  `playerZ` float NULL DEFAULT NULL,
  `clientIp` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `reportType` tinyint(4) NULL DEFAULT NULL,
  `reportText` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `serverInformation` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `bugStatus` enum('New','NeedTest','Fixed','Invalid','Duplicate','Confirmed') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'New',
  INDEX `idx_id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for census
-- ----------------------------
DROP TABLE IF EXISTS `census`;
CREATE TABLE `census`  (
  `time` datetime NULL DEFAULT NULL,
  `race` int(11) NULL DEFAULT NULL,
  `onlineCount` int(11) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_action
-- ----------------------------
DROP TABLE IF EXISTS `character_action`;
CREATE TABLE `character_action`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `button` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `action` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `type` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `button`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_armory_stats
-- ----------------------------
DROP TABLE IF EXISTS `character_armory_stats`;
CREATE TABLE `character_armory_stats`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxhealth` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower3` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower4` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower5` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `strength` float NOT NULL DEFAULT 0,
  `agility` float NOT NULL DEFAULT 0,
  `stamina` float NOT NULL DEFAULT 0,
  `intellect` float NOT NULL DEFAULT 0,
  `spirit` float NOT NULL DEFAULT 0,
  `armor` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resHoly` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resFire` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resNature` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resFrost` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resShadow` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resArcane` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `dmgModNormal` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `dmgModHoly` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `dmgModFire` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `dmgModNature` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `dmgModFrost` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `dmgModShadow` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `dmgModArcane` int(10) UNSIGNED NOT NULL DEFAULT 0,
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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_aura
-- ----------------------------
DROP TABLE IF EXISTS `character_aura`;
CREATE TABLE `character_aura`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `caster_guid` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Full Global Unique Identifier',
  `item_guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `spell` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `stackcount` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `remaincharges` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `basepoints0` int(11) NOT NULL DEFAULT 0,
  `basepoints1` int(11) NOT NULL DEFAULT 0,
  `basepoints2` int(11) NOT NULL DEFAULT 0,
  `periodictime0` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `periodictime1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `periodictime2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxduration` int(11) NOT NULL DEFAULT 0,
  `remaintime` int(11) NOT NULL DEFAULT 0,
  `effIndexMask` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `caster_guid`, `item_guid`, `spell`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_aura_suspended
-- ----------------------------
DROP TABLE IF EXISTS `character_aura_suspended`;
CREATE TABLE `character_aura_suspended`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `caster_guid` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Full Global Unique Identifier',
  `item_guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `spell` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `stackcount` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `remaincharges` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `basepoints0` int(11) NOT NULL DEFAULT 0,
  `basepoints1` int(11) NOT NULL DEFAULT 0,
  `basepoints2` int(11) NOT NULL DEFAULT 0,
  `periodictime0` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `periodictime1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `periodictime2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxduration` int(11) NOT NULL DEFAULT 0,
  `remaintime` int(11) NOT NULL DEFAULT 0,
  `effIndexMask` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `caster_guid`, `item_guid`, `spell`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_battleground_data
-- ----------------------------
DROP TABLE IF EXISTS `character_battleground_data`;
CREATE TABLE `character_battleground_data`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `instance_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `team` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `join_x` float NOT NULL DEFAULT 0,
  `join_y` float NOT NULL DEFAULT 0,
  `join_z` float NOT NULL DEFAULT 0,
  `join_o` float NOT NULL DEFAULT 0,
  `join_map` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_bgqueue
-- ----------------------------
DROP TABLE IF EXISTS `character_bgqueue`;
CREATE TABLE `character_bgqueue`  (
  `PlayerGUID` int(11) NOT NULL DEFAULT 0,
  `playerName` varchar(12) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `playerIP` int(11) NOT NULL,
  `BGtype` int(11) NOT NULL,
  `action` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`PlayerGUID`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_deleted_items
-- ----------------------------
DROP TABLE IF EXISTS `character_deleted_items`;
CREATE TABLE `character_deleted_items`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `player_guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `item_entry` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `stack_count` mediumint(8) UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 549 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_duplicate_account
-- ----------------------------
DROP TABLE IF EXISTS `character_duplicate_account`;
CREATE TABLE `character_duplicate_account`  (
  `account` int(11) NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for character_forgotten_skills
-- ----------------------------
DROP TABLE IF EXISTS `character_forgotten_skills`;
CREATE TABLE `character_forgotten_skills`  (
  `guid` int(10) UNSIGNED NOT NULL COMMENT 'Global Unique Identifier',
  `skill` mediumint(8) UNSIGNED NOT NULL,
  `value` mediumint(8) UNSIGNED NOT NULL,
  PRIMARY KEY (`guid`, `skill`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_gifts
-- ----------------------------
DROP TABLE IF EXISTS `character_gifts`;
CREATE TABLE `character_gifts`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `item_guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `entry` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `flags` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`item_guid`) USING BTREE,
  INDEX `idx_guid`(`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for character_homebind
-- ----------------------------
DROP TABLE IF EXISTS `character_homebind`;
CREATE TABLE `character_homebind`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `map` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Map Identifier',
  `zone` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Zone Identifier',
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
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `victimType` tinyint(3) UNSIGNED NOT NULL DEFAULT 4,
  `victim` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Creature / Player Identifier',
  `cp` float NOT NULL DEFAULT 0,
  `date` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `type` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  INDEX `idx_guid`(`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_instance
-- ----------------------------
DROP TABLE IF EXISTS `character_instance`;
CREATE TABLE `character_instance`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `instance` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `permanent` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `instance`) USING BTREE,
  INDEX `idx_instance`(`instance`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for character_inventory
-- ----------------------------
DROP TABLE IF EXISTS `character_inventory`;
CREATE TABLE `character_inventory`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `bag` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `slot` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `item` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item Global Unique Identifier',
  `item_template` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item Identifier',
  PRIMARY KEY (`item`) USING BTREE,
  INDEX `idx_guid`(`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_item_logs
-- ----------------------------
DROP TABLE IF EXISTS `character_item_logs`;
CREATE TABLE `character_item_logs`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `playerLowGuid` int(10) UNSIGNED NOT NULL,
  `itemLowGuid` int(10) UNSIGNED NOT NULL,
  `itemEntry` int(10) UNSIGNED NOT NULL,
  `itemCount` int(10) UNSIGNED NOT NULL,
  `action` int(10) UNSIGNED NOT NULL,
  `timestamp` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `playerLowGuid`(`playerLowGuid`, `itemLowGuid`, `itemEntry`) USING BTREE,
  INDEX `action`(`action`) USING BTREE,
  INDEX `timestamp`(`timestamp`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_pet
-- ----------------------------
DROP TABLE IF EXISTS `character_pet`;
CREATE TABLE `character_pet`  (
  `id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `entry` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `owner` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `modelid` int(10) UNSIGNED NULL DEFAULT 0,
  `CreatedBySpell` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `PetType` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `level` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `exp` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `Reactstate` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `loyaltypoints` int(11) NOT NULL DEFAULT 0,
  `loyalty` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `trainpoint` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Pet',
  `renamed` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `slot` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `curhealth` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `curmana` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `curhappiness` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `savetime` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `resettalents_cost` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resettalents_time` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
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
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `quest` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Quest Identifier',
  `status` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `rewarded` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `explored` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `timer` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `mobcount1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `mobcount2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `mobcount3` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `mobcount4` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemcount1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemcount2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemcount3` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemcount4` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `reward_choice` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `quest`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_reputation
-- ----------------------------
DROP TABLE IF EXISTS `character_reputation`;
CREATE TABLE `character_reputation`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `faction` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `standing` int(11) NOT NULL DEFAULT 0,
  `flags` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `faction`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_skills
-- ----------------------------
DROP TABLE IF EXISTS `character_skills`;
CREATE TABLE `character_skills`  (
  `guid` int(10) UNSIGNED NOT NULL COMMENT 'Global Unique Identifier',
  `skill` mediumint(8) UNSIGNED NOT NULL,
  `value` mediumint(8) UNSIGNED NOT NULL,
  `max` mediumint(8) UNSIGNED NOT NULL,
  PRIMARY KEY (`guid`, `skill`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_skills_copy
-- ----------------------------
DROP TABLE IF EXISTS `character_skills_copy`;
CREATE TABLE `character_skills_copy`  (
  `guid` int(10) UNSIGNED NOT NULL COMMENT 'Global Unique Identifier',
  `skill` mediumint(8) UNSIGNED NOT NULL,
  `value` mediumint(8) UNSIGNED NOT NULL,
  `max` mediumint(8) UNSIGNED NOT NULL,
  PRIMARY KEY (`guid`, `skill`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_social
-- ----------------------------
DROP TABLE IF EXISTS `character_social`;
CREATE TABLE `character_social`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Character Global Unique Identifier',
  `friend` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Friend Global Unique Identifier',
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
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `spell` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Spell Identifier',
  `active` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `disabled` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `spell`) USING BTREE,
  INDEX `idx_spell`(`spell`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_spell_cooldown
-- ----------------------------
DROP TABLE IF EXISTS `character_spell_cooldown`;
CREATE TABLE `character_spell_cooldown`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier, Low part',
  `spell` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Spell Identifier',
  `item` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item Identifier',
  `time` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `catTime` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `spell`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for character_spell_dual_spec
-- ----------------------------
DROP TABLE IF EXISTS `character_spell_dual_spec`;
CREATE TABLE `character_spell_dual_spec`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `spell` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Spell Identifier',
  `spec` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'primary or secondary',
  PRIMARY KEY (`guid`, `spell`, `spec`) USING BTREE,
  INDEX `idx_spell`(`spell`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_stats
-- ----------------------------
DROP TABLE IF EXISTS `character_stats`;
CREATE TABLE `character_stats`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier, Low part',
  `maxhealth` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower3` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower4` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower5` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower6` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxpower7` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `strength` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `agility` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `stamina` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `intellect` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `spirit` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `armor` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resHoly` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resFire` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resNature` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resFrost` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resShadow` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resArcane` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `blockPct` float UNSIGNED NOT NULL DEFAULT 0,
  `dodgePct` float UNSIGNED NOT NULL DEFAULT 0,
  `parryPct` float UNSIGNED NOT NULL DEFAULT 0,
  `critPct` float UNSIGNED NOT NULL DEFAULT 0,
  `rangedCritPct` float UNSIGNED NOT NULL DEFAULT 0,
  `attackPower` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `rangedAttackPower` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for character_ticket
-- ----------------------------
DROP TABLE IF EXISTS `character_ticket`;
CREATE TABLE `character_ticket`  (
  `ticket_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `ticket_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `response_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ticket_lastchange` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ticket_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_titles
-- ----------------------------
DROP TABLE IF EXISTS `character_titles`;
CREATE TABLE `character_titles`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `title` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `active` tinyint(4) NOT NULL DEFAULT 0
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_transmogs
-- ----------------------------
DROP TABLE IF EXISTS `character_transmogs`;
CREATE TABLE `character_transmogs`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemId` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_tutorial
-- ----------------------------
DROP TABLE IF EXISTS `character_tutorial`;
CREATE TABLE `character_tutorial`  (
  `account` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Account Identifier',
  `tut0` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `tut1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `tut2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `tut3` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `tut4` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `tut5` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `tut6` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `tut7` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`account`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3514189 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for character_variables
-- ----------------------------
DROP TABLE IF EXISTS `character_variables`;
CREATE TABLE `character_variables`  (
  `lowGuid` int(10) UNSIGNED NOT NULL,
  `variableType` int(10) UNSIGNED NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`lowGuid`, `variableType`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character_xp_from_log
-- ----------------------------
DROP TABLE IF EXISTS `character_xp_from_log`;
CREATE TABLE `character_xp_from_log`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `type` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `xp` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for characters
-- ----------------------------
DROP TABLE IF EXISTS `characters`;
CREATE TABLE `characters`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `account` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Account Identifier',
  `name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `race` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `class` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `gender` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `level` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `xp` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `money` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `playerBytes` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `playerBytes2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `playerFlags` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `map` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Map Identifier',
  `orientation` float NOT NULL DEFAULT 0,
  `taximask` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `online` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `cinematic` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `totaltime` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `leveltime` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `logout_time` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `is_logout_resting` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `rest_bonus` float NOT NULL DEFAULT 0,
  `resettalents_multiplier` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resettalents_time` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `trans_x` float NOT NULL DEFAULT 0,
  `trans_y` float NOT NULL DEFAULT 0,
  `trans_z` float NOT NULL DEFAULT 0,
  `trans_o` float NOT NULL DEFAULT 0,
  `transguid` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `extra_flags` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `stable_slots` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `at_login` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `zone` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `death_expire_time` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `taxi_path` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `honorRankPoints` float NOT NULL DEFAULT 0,
  `honorHighestRank` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `honorStanding` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `honorLastWeekHK` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `honorLastWeekCP` decimal(11, 1) NOT NULL DEFAULT 0.0,
  `honorStoredHK` int(11) NOT NULL DEFAULT 0,
  `honorStoredDK` int(11) NOT NULL DEFAULT 0,
  `watchedFaction` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `drunk` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `health` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `power1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `power2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `power3` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `power4` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `power5` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `exploredZones` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `equipmentCache` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ammoId` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `actionBars` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `deleteInfos_Account` int(10) UNSIGNED NULL DEFAULT NULL,
  `deleteInfos_Name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `deleteDate` bigint(20) NULL DEFAULT NULL,
  `area` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `world_phase_mask` int(11) NULL DEFAULT 0,
  `customFlags` int(11) NOT NULL DEFAULT 0,
  `city_protector` tinyint(4) NOT NULL DEFAULT 0,
  `regexFilterCount` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `isGMCharacter` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `ignore_titles` tinyint(4) NOT NULL DEFAULT 0,
  `mortality_status` tinyint(4) NOT NULL DEFAULT 0,
  `total_deaths` int(11) NOT NULL DEFAULT 0,
  `xp_gain` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
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
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `player` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Character Global Unique Identifier',
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `orientation` float NOT NULL DEFAULT 0,
  `map` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Map Identifier',
  `time` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `corpse_type` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `instance` int(10) UNSIGNED NOT NULL DEFAULT 0,
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
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `respawntime` bigint(20) NOT NULL DEFAULT 0,
  `instance` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `map` int(10) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `instance`) USING BTREE,
  INDEX `idx_instance`(`instance`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Grid Loading System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for game_event_status
-- ----------------------------
DROP TABLE IF EXISTS `game_event_status`;
CREATE TABLE `game_event_status`  (
  `event` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`event`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Game event system' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for gameobject_respawn
-- ----------------------------
DROP TABLE IF EXISTS `gameobject_respawn`;
CREATE TABLE `gameobject_respawn`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `respawntime` bigint(20) NOT NULL DEFAULT 0,
  `instance` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `map` int(10) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `instance`) USING BTREE,
  INDEX `idx_instance`(`instance`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Grid Loading System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for gm_subsurveys
-- ----------------------------
DROP TABLE IF EXISTS `gm_subsurveys`;
CREATE TABLE `gm_subsurveys`  (
  `surveyId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `subsurveyId` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `rank` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `comment` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`surveyId`, `subsurveyId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for gm_surveys
-- ----------------------------
DROP TABLE IF EXISTS `gm_surveys`;
CREATE TABLE `gm_surveys`  (
  `surveyId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `mainSurvey` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `overallComment` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`surveyId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for gm_tickets
-- ----------------------------
DROP TABLE IF EXISTS `gm_tickets`;
CREATE TABLE `gm_tickets`  (
  `ticketId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier of ticket creator',
  `name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Name of ticket creator',
  `message` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `mapId` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `posX` float NOT NULL DEFAULT 0,
  `posY` float NOT NULL DEFAULT 0,
  `posZ` float NOT NULL DEFAULT 0,
  `lastModifiedTime` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `closedBy` int(11) NOT NULL DEFAULT 0,
  `assignedTo` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'GUID of admin to whom ticket is assigned',
  `comment` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `response` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `completed` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `escalated` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `viewed` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `haveTicket` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `ticketType` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `securityNeeded` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`ticketId`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3677 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Player System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for group_instance
-- ----------------------------
DROP TABLE IF EXISTS `group_instance`;
CREATE TABLE `group_instance`  (
  `leaderGuid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `instance` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `permanent` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`leaderGuid`, `instance`) USING BTREE,
  INDEX `idx_instance`(`instance`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for group_member
-- ----------------------------
DROP TABLE IF EXISTS `group_member`;
CREATE TABLE `group_member`  (
  `groupId` int(10) UNSIGNED NOT NULL,
  `memberGuid` int(10) UNSIGNED NOT NULL,
  `assistant` tinyint(1) UNSIGNED NOT NULL,
  `subgroup` smallint(5) UNSIGNED NOT NULL,
  PRIMARY KEY (`groupId`, `memberGuid`) USING BTREE,
  INDEX `idx_memberGuid`(`memberGuid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Groups' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups`  (
  `groupId` int(10) UNSIGNED NOT NULL,
  `leaderGuid` int(10) UNSIGNED NOT NULL,
  `mainTank` int(10) UNSIGNED NOT NULL,
  `mainAssistant` int(10) UNSIGNED NOT NULL,
  `lootMethod` tinyint(3) UNSIGNED NOT NULL,
  `looterGuid` int(10) UNSIGNED NOT NULL,
  `lootThreshold` tinyint(3) UNSIGNED NOT NULL,
  `icon1` int(10) UNSIGNED NOT NULL,
  `icon2` int(10) UNSIGNED NOT NULL,
  `icon3` int(10) UNSIGNED NOT NULL,
  `icon4` int(10) UNSIGNED NOT NULL,
  `icon5` int(10) UNSIGNED NOT NULL,
  `icon6` int(10) UNSIGNED NOT NULL,
  `icon7` int(10) UNSIGNED NOT NULL,
  `icon8` int(10) UNSIGNED NOT NULL,
  `isRaid` tinyint(1) UNSIGNED NOT NULL,
  PRIMARY KEY (`groupId`) USING BTREE,
  UNIQUE INDEX `key_leaderGuid`(`leaderGuid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Groups' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for guild
-- ----------------------------
DROP TABLE IF EXISTS `guild`;
CREATE TABLE `guild`  (
  `guildid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `leaderguid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `EmblemStyle` int(11) NOT NULL DEFAULT 0,
  `EmblemColor` int(11) NOT NULL DEFAULT 0,
  `BorderStyle` int(11) NOT NULL DEFAULT 0,
  `BorderColor` int(11) NOT NULL DEFAULT 0,
  `BackgroundColor` int(11) NOT NULL DEFAULT 0,
  `info` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `motd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createdate` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`guildid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Guild System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for guild_bank
-- ----------------------------
DROP TABLE IF EXISTS `guild_bank`;
CREATE TABLE `guild_bank`  (
  `guildid` int(11) UNSIGNED NOT NULL,
  `guid` int(11) NOT NULL,
  `tab` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `slot` tinyint(3) UNSIGNED NOT NULL,
  `item_template` int(11) UNSIGNED NOT NULL,
  `creatorGuid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `giftCreatorGuid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `count` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `duration` int(11) NOT NULL DEFAULT 0,
  `charges` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `flags` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `enchantments` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `randomPropertyId` smallint(6) NOT NULL DEFAULT 0,
  `transmogrifyId` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `durability` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `text` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `generated_loot` tinyint(4) NULL DEFAULT 0,
  UNIQUE INDEX `guildidandguid`(`guildid`, `guid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_bank_log
-- ----------------------------
DROP TABLE IF EXISTS `guild_bank_log`;
CREATE TABLE `guild_bank_log`  (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `guildid` int(11) NOT NULL,
  `player` int(11) NOT NULL,
  `action` int(11) NOT NULL,
  `tab` int(11) NOT NULL DEFAULT 1,
  `item` int(11) NOT NULL,
  `randomPropertyId` int(11) NOT NULL DEFAULT 0,
  `enchant` int(11) NOT NULL DEFAULT 0,
  `count` int(11) NOT NULL,
  `stamp` bigint(20) NOT NULL,
  PRIMARY KEY (`log_id`) USING BTREE,
  INDEX `stamp`(`stamp`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_house
-- ----------------------------

DROP TABLE IF EXISTS `guild_house`;
CREATE TABLE `guild_house`  (
  `guild_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Identifier',
  `map_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `orientation` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`guild_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Teleportation coordinates for Guild Housing' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for guild_bank_money
-- ----------------------------
DROP TABLE IF EXISTS `guild_bank_money`;
CREATE TABLE `guild_bank_money`  (
  `guildid` int(11) NOT NULL,
  `money` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`guildid`) USING BTREE,
  UNIQUE INDEX `guildid`(`guildid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for guild_bank_tabs
-- ----------------------------
DROP TABLE IF EXISTS `guild_bank_tabs`;
CREATE TABLE `guild_bank_tabs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guildid` int(11) NOT NULL,
  `tabs` int(11) NOT NULL DEFAULT 0,
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
  `withdrawal1` int(11) NOT NULL DEFAULT 0,
  `withdrawal2` int(11) NOT NULL DEFAULT 0,
  `withdrawal3` int(11) NOT NULL DEFAULT 0,
  `withdrawal4` int(11) NOT NULL DEFAULT 0,
  `withdrawal5` int(11) NOT NULL DEFAULT 0,
  `minrank1` int(11) NOT NULL DEFAULT 0,
  `minrank2` int(11) NOT NULL DEFAULT 0,
  `minrank3` int(11) NOT NULL DEFAULT 0,
  `minrank4` int(11) NOT NULL DEFAULT 0,
  `minrank5` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for guild_eventlog
-- ----------------------------
DROP TABLE IF EXISTS `guild_eventlog`;
CREATE TABLE `guild_eventlog`  (
  `guildid` int(11) NOT NULL COMMENT 'Guild Identificator',
  `LogGuid` int(11) NOT NULL COMMENT 'Log record identificator - auxiliary column',
  `EventType` tinyint(1) NOT NULL COMMENT 'Event type',
  `PlayerGuid1` int(11) NOT NULL COMMENT 'Player 1',
  `PlayerGuid2` int(11) NOT NULL COMMENT 'Player 2',
  `NewRank` tinyint(4) NOT NULL COMMENT 'New rank(in case promotion/demotion)',
  `TimeStamp` bigint(20) NOT NULL COMMENT 'Event UNIX time',
  PRIMARY KEY (`guildid`, `LogGuid`) USING BTREE,
  INDEX `idx_PlayerGuid1`(`PlayerGuid1`) USING BTREE,
  INDEX `idx_PlayerGuid2`(`PlayerGuid2`) USING BTREE,
  INDEX `idx_LogGuid`(`LogGuid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Guild Eventlog' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for guild_member
-- ----------------------------
DROP TABLE IF EXISTS `guild_member`;
CREATE TABLE `guild_member`  (
  `guildid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `rank` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
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
  `guildid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `rid` int(10) UNSIGNED NOT NULL,
  `rname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `rights` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guildid`, `rid`) USING BTREE,
  INDEX `idx_rid`(`rid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Guild System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for hardcore_deaths
-- ----------------------------
DROP TABLE IF EXISTS `hardcore_deaths`;
CREATE TABLE `hardcore_deaths`  (
  `lowGuid` int(10) UNSIGNED NOT NULL,
  `race` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `class` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `level` int(10) UNSIGNED NOT NULL,
  `attackerEntry` int(10) UNSIGNED NOT NULL,
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `mapId` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`lowGuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for instance
-- ----------------------------
DROP TABLE IF EXISTS `instance`;
CREATE TABLE `instance`  (
  `id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `map` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resettime` bigint(20) NOT NULL DEFAULT 0,
  `data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_map`(`map`) USING BTREE,
  INDEX `idx_resettime`(`resettime`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for instance_copy
-- ----------------------------
DROP TABLE IF EXISTS `instance_copy`;
CREATE TABLE `instance_copy`  (
  `id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `map` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resettime` bigint(20) NOT NULL DEFAULT 0,
  `data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_map`(`map`) USING BTREE,
  INDEX `idx_resettime`(`resettime`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for instance_reset
-- ----------------------------
DROP TABLE IF EXISTS `instance_reset`;
CREATE TABLE `instance_reset`  (
  `mapid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `resettime` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`mapid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for item_instance
-- ----------------------------
DROP TABLE IF EXISTS `item_instance`;
CREATE TABLE `item_instance`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemEntry` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `owner_guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `creatorGuid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `giftCreatorGuid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `count` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `duration` int(11) NOT NULL DEFAULT 0,
  `charges` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `flags` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `enchantments` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `randomPropertyId` smallint(6) NOT NULL DEFAULT 0,
  `transmogrifyId` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `durability` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `text` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `generated_loot` tinyint(4) NULL DEFAULT 0,
  PRIMARY KEY (`guid`) USING BTREE,
  INDEX `idx_owner_guid`(`owner_guid`) USING BTREE,
  INDEX `idx_itemEntry`(`itemEntry`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Item System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for item_loot
-- ----------------------------
DROP TABLE IF EXISTS `item_loot`;
CREATE TABLE `item_loot`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `owner_guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `itemid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `amount` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `property` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `itemid`) USING BTREE,
  INDEX `idx_owner_guid`(`owner_guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Item System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for item_text
-- ----------------------------
DROP TABLE IF EXISTS `item_text`;
CREATE TABLE `item_text`  (
  `id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `text` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Item System' ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for logs_movement
-- ----------------------------
DROP TABLE IF EXISTS `logs_movement`;
CREATE TABLE `logs_movement`  (
  `account` int(10) UNSIGNED NOT NULL,
  `guid` int(10) UNSIGNED NOT NULL,
  `posx` float NOT NULL,
  `posy` float NOT NULL,
  `posz` float NOT NULL,
  `map` int(10) UNSIGNED NOT NULL,
  `desyncMs` int(11) NOT NULL,
  `desyncDist` float NOT NULL,
  `cheats` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for logs_warden
-- ----------------------------
DROP TABLE IF EXISTS `logs_warden`;
CREATE TABLE `logs_warden`  (
  `entry` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Log entry ID',
  `check` smallint(5) UNSIGNED NOT NULL COMMENT 'Failed Warden check ID',
  `action` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Action taken (enum WardenActions)',
  `account` int(10) UNSIGNED NOT NULL COMMENT 'Account ID',
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Player GUID',
  `map` int(10) UNSIGNED NULL DEFAULT NULL COMMENT 'Map ID',
  `position_x` float NULL DEFAULT NULL COMMENT 'Player position X',
  `position_y` float NULL DEFAULT NULL COMMENT 'Player position Y',
  `position_z` float NULL DEFAULT NULL COMMENT 'Player position Z',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date of the log entry',
  PRIMARY KEY (`entry`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Warden log of failed checks' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for mail
-- ----------------------------
DROP TABLE IF EXISTS `mail`;
CREATE TABLE `mail`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Identifier',
  `messageType` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `stationery` tinyint(4) NOT NULL DEFAULT 41,
  `mailTemplateId` mediumint(8) UNSIGNED NOT NULL DEFAULT 0,
  `sender` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Character Global Unique Identifier',
  `receiver` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Character Global Unique Identifier',
  `subject` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `itemTextId` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `has_items` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `expire_time` bigint(20) NOT NULL DEFAULT 0,
  `deliver_time` bigint(20) NOT NULL DEFAULT 0,
  `money` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `cod` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `checked` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `isDeleted` tinyint(3) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_receiver`(`receiver`) USING BTREE,
  INDEX `FK_mail_item_text`(`itemTextId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5446622 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Mail System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for mail_items
-- ----------------------------
DROP TABLE IF EXISTS `mail_items`;
CREATE TABLE `mail_items`  (
  `mail_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `item_guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `item_template` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `receiver` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Character Global Unique Identifier',
  PRIMARY KEY (`mail_id`, `item_guid`) USING BTREE,
  INDEX `idx_receiver`(`receiver`) USING BTREE,
  INDEX `idx_item_guid`(`item_guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `Hash` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `AppliedAt` datetime NOT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pet_aura
-- ----------------------------
DROP TABLE IF EXISTS `pet_aura`;
CREATE TABLE `pet_aura`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `caster_guid` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Full Global Unique Identifier',
  `item_guid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `spell` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `stackcount` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `remaincharges` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `basepoints0` int(11) NOT NULL DEFAULT 0,
  `basepoints1` int(11) NOT NULL DEFAULT 0,
  `basepoints2` int(11) NOT NULL DEFAULT 0,
  `periodictime0` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `periodictime1` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `periodictime2` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `maxduration` int(11) NOT NULL DEFAULT 0,
  `remaintime` int(11) NOT NULL DEFAULT 0,
  `effIndexMask` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `caster_guid`, `item_guid`, `spell`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Pet System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pet_spell
-- ----------------------------
DROP TABLE IF EXISTS `pet_spell`;
CREATE TABLE `pet_spell`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier',
  `spell` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Spell Identifier',
  `active` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `spell`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Pet System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pet_spell_cooldown
-- ----------------------------
DROP TABLE IF EXISTS `pet_spell_cooldown`;
CREATE TABLE `pet_spell_cooldown`  (
  `guid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Global Unique Identifier, Low part',
  `spell` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Spell Identifier',
  `time` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`guid`, `spell`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Table structure for petition
-- ----------------------------
DROP TABLE IF EXISTS `petition`;
CREATE TABLE `petition`  (
  `ownerguid` int(10) UNSIGNED NOT NULL,
  `petitionguid` int(10) UNSIGNED NULL DEFAULT 0,
  `charterguid` int(10) UNSIGNED NULL DEFAULT NULL COMMENT 'Charter item GUID',
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
  `ownerguid` int(10) UNSIGNED NOT NULL,
  `petitionguid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `playerguid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `player_account` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`petitionguid`, `playerguid`) USING BTREE,
  INDEX `idx_playerguid`(`playerguid`) USING BTREE,
  INDEX `idx_ownerguid`(`ownerguid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Guild System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for playerbot
-- ----------------------------
DROP TABLE IF EXISTS `playerbot`;
CREATE TABLE `playerbot`  (
  `char_guid` bigint(20) UNSIGNED NOT NULL,
  `chance` int(10) UNSIGNED NOT NULL DEFAULT 10,
  `comment` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `ai` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`char_guid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for saved_variables
-- ----------------------------
DROP TABLE IF EXISTS `saved_variables`;
CREATE TABLE `saved_variables`  (
  `key` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `cleaning_flags` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `lastHonorMaintenanceDay` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `nextHonorMaintenanceDay` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `honorMaintenanceMarker` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Variable Saves' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for store_racechange
-- ----------------------------
DROP TABLE IF EXISTS `store_racechange`;
CREATE TABLE `store_racechange`  (
  `guid` int(10) UNSIGNED NOT NULL,
  `race` tinyint(1) UNSIGNED NOT NULL,
  `gender` tinyint(1) UNSIGNED NOT NULL,
  `playerbytes1` int(10) UNSIGNED NOT NULL,
  `playerbytes2` int(10) UNSIGNED NOT NULL,
  `transaction` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`transaction`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Race change requests from web backend. Playerbytes is from \'characters\' table, is used to copy new character outfit.' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for whisper_targets
-- ----------------------------
DROP TABLE IF EXISTS `whisper_targets`;
CREATE TABLE `whisper_targets`  (
  `account` int(10) UNSIGNED NOT NULL,
  `target_guid` int(10) UNSIGNED NOT NULL,
  `time` int(10) UNSIGNED NOT NULL,
  UNIQUE INDEX `account_target`(`account`, `target_guid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for world
-- ----------------------------
DROP TABLE IF EXISTS `world`;
CREATE TABLE `world`  (
  `map` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`map`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for worldstates
-- ----------------------------
DROP TABLE IF EXISTS `worldstates`;
CREATE TABLE `worldstates`  (
  `entry` int(11) NULL DEFAULT NULL,
  `value` int(11) NULL DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  UNIQUE INDEX `key_entry`(`entry`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE IF EXISTS `guild_house`;
CREATE TABLE `guild_house`  (
  `guild_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Identifier',
  `map_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `position_x` float NOT NULL DEFAULT 0,
  `position_y` float NOT NULL DEFAULT 0,
  `position_z` float NOT NULL DEFAULT 0,
  `orientation` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`guild_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Teleportation coordinates for Guild Housing' ROW_FORMAT = FIXED;

CREATE TABLE IF NOT EXISTS `logs_shellcoin` (
  `time` bigint(20) NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL DEFAULT '0',
  KEY `time` (`time`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `character_destroyed_items`;
CREATE TABLE IF NOT EXISTS `character_destroyed_items` (
  `player_guid` int(10) unsigned NOT NULL,
  `item_entry` mediumint(8) unsigned NOT NULL,
  `stack_count` mediumint(8) unsigned NOT NULL,
  `time` bigint(20) unsigned NOT NULL,
  KEY `player_guid` (`player_guid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='items that players have thrown away';
