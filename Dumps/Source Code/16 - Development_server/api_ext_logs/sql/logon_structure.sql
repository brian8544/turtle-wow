
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Identifier',
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sha_pass_hash` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `rank` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `sessionkey` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `v` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `s` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `email` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `joindate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tfa_verif` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_ip` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0.0.0.0',
  `last_local_ip` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0.0.0.0',
  `failed_logins` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `locked` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `last_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `online` tinyint(4) NOT NULL DEFAULT 0,
  `expansion` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `mutetime` bigint(40) NOT NULL DEFAULT 0,
  `mutereason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `muteby` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `locale` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `os` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `current_realm` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `banned` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `flags` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `security` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pass_verif` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Web recover password',
  `email_verif` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Email verification',
  `forum_username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `token_key` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `email_keyword` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email_status` int(8) NULL DEFAULT NULL,
  `email_sub` tinyint(3) NOT NULL DEFAULT 1,
  `comments` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `geolock_pin` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_username`(`username`) USING BTREE,
  INDEX `idx_gmlevel`(`rank`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Account System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for account_banned
-- ----------------------------
DROP TABLE IF EXISTS `account_banned`;
CREATE TABLE `account_banned`  (
  `banid` bigint(20) NOT NULL AUTO_INCREMENT,
  `id` bigint(20) NOT NULL DEFAULT 0 COMMENT 'Account id',
  `bandate` bigint(40) NOT NULL DEFAULT 0,
  `unbandate` bigint(40) NOT NULL DEFAULT 0,
  `bannedby` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `banreason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `realm` tinyint(4) NOT NULL DEFAULT 1,
  `gmlevel` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `bandate`) USING BTREE,
  UNIQUE INDEX `banid`(`banid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Ban List' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for account_mailstatus
-- ----------------------------
DROP TABLE IF EXISTS `account_mailstatus`;
CREATE TABLE `account_mailstatus`  (
  `message_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_id` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` int(11) NULL DEFAULT NULL,
  `letterid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_mailstatus_archive
-- ----------------------------
DROP TABLE IF EXISTS `account_mailstatus_archive`;
CREATE TABLE `account_mailstatus_archive`  (
  `message_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_id` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` int(11) NULL DEFAULT NULL,
  `letterid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_twofactor_allowed
-- ----------------------------
DROP TABLE IF EXISTS `account_twofactor_allowed`;
CREATE TABLE `account_twofactor_allowed`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `account_id` int(10) UNSIGNED NULL DEFAULT NULL,
  `expires_at` bigint(20) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for antispam_blacklist
-- ----------------------------
DROP TABLE IF EXISTS `antispam_blacklist`;
CREATE TABLE `antispam_blacklist`  (
  `string` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`string`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for antispam_client
-- ----------------------------
DROP TABLE IF EXISTS `antispam_client`;
CREATE TABLE `antispam_client`  (
  `Regex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Note` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Regex`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for antispam_replacement
-- ----------------------------
DROP TABLE IF EXISTS `antispam_replacement`;
CREATE TABLE `antispam_replacement`  (
  `from` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `to` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`from`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for antispam_unicode_replacement
-- ----------------------------
DROP TABLE IF EXISTS `antispam_unicode_replacement`;
CREATE TABLE `antispam_unicode_replacement`  (
  `from` mediumint(5) UNSIGNED NOT NULL DEFAULT 0,
  `to` mediumint(5) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`from`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config`  (
  `id` int(11) NOT NULL,
  `value` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for geoip
-- ----------------------------
DROP TABLE IF EXISTS `geoip`;
CREATE TABLE `geoip`  (
  `network_start_integer` int(11) NULL DEFAULT NULL,
  `network_last_integer` int(11) NULL DEFAULT NULL,
  `geoname_id` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `registered_country_geoname_id` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `represented_country_geoname_id` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `is_anonymous_proxy` int(11) NULL DEFAULT NULL,
  `is_satellite_provider` int(11) NULL DEFAULT NULL,
  `postal_code` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `latitude` double NULL DEFAULT NULL,
  `longitude` double NULL DEFAULT NULL,
  `accuracy_radius` int(11) NULL DEFAULT NULL,
  INDEX `ip_start`(`network_start_integer`) USING BTREE,
  INDEX `ip_end`(`network_last_integer`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ip_banned
-- ----------------------------
DROP TABLE IF EXISTS `ip_banned`;
CREATE TABLE `ip_banned`  (
  `ip` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0.0.0.0',
  `bandate` int(11) NOT NULL,
  `unbandate` int(11) NOT NULL,
  `bannedby` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '[Console]',
  `banreason` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'no reason',
  PRIMARY KEY (`ip`, `bandate`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Banned IPs' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `Hash` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for realmcharacters
-- ----------------------------
DROP TABLE IF EXISTS `realmcharacters`;
CREATE TABLE `realmcharacters`  (
  `realmid` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `acctid` bigint(20) UNSIGNED NOT NULL,
  `numchars` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`realmid`, `acctid`) USING BTREE,
  INDEX `acctid`(`acctid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Realm Character Tracker' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for realmlist
-- ----------------------------
DROP TABLE IF EXISTS `realmlist`;
CREATE TABLE `realmlist`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `address` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '127.0.0.1',
  `port` int(11) NOT NULL DEFAULT 8085,
  `icon` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `realmflags` tinyint(3) UNSIGNED NOT NULL DEFAULT 2 COMMENT 'Supported masks: 0x1 (invalid, not show in realm list), 0x2 (offline, set by mangosd), 0x4 (show version and build), 0x20 (new players), 0x40 (recommended)',
  `timezone` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `allowedSecurityLevel` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `population` float UNSIGNED NOT NULL DEFAULT 0,
  `realmbuilds` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '5875',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_name`(`name`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Realm System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for shop_coins
-- ----------------------------
DROP TABLE IF EXISTS `shop_coins`;
CREATE TABLE `shop_coins`  (
  `id` int(10) UNSIGNED NOT NULL,
  `coins` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for shop_diff
-- ----------------------------
DROP TABLE IF EXISTS `shop_diff`;
CREATE TABLE `shop_diff`  (
  `guid` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `accountid` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `prev_bonus` int(11) NOT NULL,
  `new_bonus` int(11) NOT NULL,
  `date` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `query` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for statistics_online
-- ----------------------------
DROP TABLE IF EXISTS `statistics_online`;
CREATE TABLE `statistics_online`  (
  `guid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `online` int(8) UNSIGNED NULL DEFAULT 0,
  `online_alli` int(8) NULL DEFAULT 0,
  `online_horde` int(8) NULL DEFAULT 0,
  `connections` int(8) UNSIGNED NULL DEFAULT 0,
  `realm` tinyint(3) UNSIGNED NULL DEFAULT 0,
  `date` int(11) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_fingerprint_usage
-- ----------------------------
DROP TABLE IF EXISTS `system_fingerprint_usage`;
CREATE TABLE `system_fingerprint_usage`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `fingerprint` int(10) UNSIGNED NOT NULL,
  `account` int(10) UNSIGNED NOT NULL,
  `ip` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `realm` int(10) UNSIGNED NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `architecture` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cputype` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `activecpus` int(10) UNSIGNED NULL DEFAULT NULL,
  `totalcpus` int(10) UNSIGNED NULL DEFAULT NULL,
  `pagesize` int(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fingerprint`(`fingerprint`) USING BTREE,
  INDEX `account`(`account`) USING BTREE,
  INDEX `ip`(`ip`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uptime
-- ----------------------------
DROP TABLE IF EXISTS `uptime`;
CREATE TABLE `uptime`  (
  `realmid` int(11) UNSIGNED NOT NULL,
  `starttime` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `startstring` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `uptime` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `onlineplayers` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `maxplayers` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `revision` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Turtle WoW',
  PRIMARY KEY (`realmid`, `starttime`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Uptime system' ROW_FORMAT = DYNAMIC;

/*Table structure for table `gp_history` */

DROP TABLE IF EXISTS `gp_history`;

CREATE TABLE `gp_history` (
  `account_id` int(11) unsigned NOT NULL,
  `code` varchar(256) NOT NULL,
  PRIMARY KEY (`account_id`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `shop_coins_history` */

DROP TABLE IF EXISTS `shop_coins_history`;

CREATE TABLE `shop_coins_history` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int(11) unsigned NOT NULL,
  `points` int(11) NOT NULL,
  `actual_points` int(11) NOT NULL,
  `new_points` int(11) NOT NULL,
  `type` varchar(256) NOT NULL,
  `system` varchar(256) NOT NULL,
  `reference` varchar(256) NOT NULL,
  `date` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

ALTER TABLE `account`
	ADD COLUMN `platform` VARCHAR(4) NOT NULL DEFAULT '' AFTER `os`;


SET FOREIGN_KEY_CHECKS = 1;

-- Apply manually:

/*
CREATE FUNCTION `account_balance_update`(`AccountID` int,`Price` int)
 RETURNS int
BEGIN
    SELECT `coins` INTO @CoinCount FROM `shop_coins` WHERE `id`= AccountID FOR UPDATE;
    IF @CoinCount >= Price THEN
        UPDATE `shop_coins` SET `coins` = `coins` - Price WHERE `id` = AccountID;
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
    RETURN 0;
END;
*/
