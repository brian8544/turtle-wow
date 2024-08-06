SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Identifier',
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sha_pass_hash` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `rank` int UNSIGNED NOT NULL DEFAULT 0,
  `sessionkey` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `v` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `s` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `email` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `joindate` timestamp NOT NULL DEFAULT current_timestamp,
  `tfa_verif` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_ip` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0.0.0.0',
  `last_local_ip` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0.0.0.0',
  `failed_logins` int UNSIGNED NOT NULL DEFAULT 0,
  `locked` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `last_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `online` tinyint NOT NULL DEFAULT 0,
  `expansion` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `mutetime` bigint NOT NULL DEFAULT 0,
  `mutereason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `muteby` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `locale` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `os` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `platform` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `current_realm` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `banned` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `flags` int UNSIGNED NOT NULL DEFAULT 0,
  `security` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pass_verif` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Web recover password',
  `email_verif` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Email verification',
  `forum_username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `token_key` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `email_keyword` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email_status` int NULL DEFAULT NULL,
  `email_letterid` int NULL DEFAULT 0,
  `email_sub` tinyint NOT NULL DEFAULT 1,
  `server` tinyint NOT NULL DEFAULT 0,
  `comments` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `geolock_pin` int NULL DEFAULT 0,
  `queue_skip` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_username`(`username`) USING BTREE,
  INDEX `idx_gmlevel`(`rank`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 389145 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Account System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for account_banned
-- ----------------------------
DROP TABLE IF EXISTS `account_banned`;
CREATE TABLE `account_banned`  (
  `banid` bigint NOT NULL AUTO_INCREMENT,
  `id` bigint NOT NULL DEFAULT 0 COMMENT 'Account id',
  `bandate` bigint NOT NULL DEFAULT 0,
  `unbandate` bigint NOT NULL DEFAULT 0,
  `bannedby` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `banreason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `active` tinyint NOT NULL DEFAULT 1,
  `realm` tinyint NOT NULL DEFAULT 1,
  `gmlevel` tinyint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `bandate`) USING BTREE,
  UNIQUE INDEX `banid`(`banid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4225607 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Ban List' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for account_banned_withautobancrap
-- ----------------------------
DROP TABLE IF EXISTS `account_banned_withautobancrap`;
CREATE TABLE `account_banned_withautobancrap`  (
  `banid` bigint NOT NULL AUTO_INCREMENT,
  `id` bigint NOT NULL DEFAULT 0 COMMENT 'Account id',
  `bandate` bigint NOT NULL DEFAULT 0,
  `unbandate` bigint NOT NULL DEFAULT 0,
  `bannedby` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `banreason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `active` tinyint NOT NULL DEFAULT 1,
  `realm` tinyint NOT NULL DEFAULT 1,
  `gmlevel` tinyint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `bandate`) USING BTREE,
  UNIQUE INDEX `banid`(`banid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4215051 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Ban List' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for account_copy_060621
-- ----------------------------
DROP TABLE IF EXISTS `account_copy_060621`;
CREATE TABLE `account_copy_060621`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Identifier',
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sha_pass_hash` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gmlevel` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `sessionkey` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `v` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `s` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `email` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `joindate` timestamp NOT NULL DEFAULT current_timestamp,
  `tfa_verif` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_ip` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0.0.0.0',
  `last_local_ip` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0.0.0.0',
  `failed_logins` int UNSIGNED NOT NULL DEFAULT 0,
  `locked` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `last_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `online` tinyint NOT NULL DEFAULT 0,
  `expansion` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `mutetime` bigint NOT NULL DEFAULT 0,
  `mutereason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `muteby` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `locale` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `os` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `current_realm` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `banned` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `flags` int UNSIGNED NOT NULL DEFAULT 0,
  `security` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pass_verif` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Web recover password',
  `email_verif` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Email verification',
  `forum_username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `token_key` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `email_keyword` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email_status` int NULL DEFAULT NULL,
  `email_sub` tinyint NOT NULL DEFAULT 1,
  `server` tinyint NOT NULL DEFAULT 0,
  `comments` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `geolock_pin` int NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_username`(`username`) USING BTREE,
  INDEX `idx_gmlevel`(`gmlevel`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54548 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Account System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for account_ip_logins
-- ----------------------------
DROP TABLE IF EXISTS `account_ip_logins`;
CREATE TABLE `account_ip_logins`  (
  `account_id` int UNSIGNED NOT NULL,
  `account_ip` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0.0.0.0',
  `login_count` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`account_id`, `account_ip`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_mailstatus_deprecated
-- ----------------------------
DROP TABLE IF EXISTS `account_mailstatus_deprecated`;
CREATE TABLE `account_mailstatus_deprecated`  (
  `message_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_id` int UNSIGNED NOT NULL DEFAULT 0,
  `email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` int NULL DEFAULT NULL,
  `letterid` int NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 180160 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_mailstatus_deprecated_archive
-- ----------------------------
DROP TABLE IF EXISTS `account_mailstatus_deprecated_archive`;
CREATE TABLE `account_mailstatus_deprecated_archive`  (
  `message_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_id` int UNSIGNED NOT NULL DEFAULT 0,
  `email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` int NULL DEFAULT NULL,
  `letterid` int NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 151402 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for account_muted
-- ----------------------------
DROP TABLE IF EXISTS `account_muted`;
CREATE TABLE `account_muted`  (
  `muteid` bigint NOT NULL AUTO_INCREMENT,
  `id` bigint NOT NULL DEFAULT 0 COMMENT 'Account id',
  `mutedate` bigint NOT NULL DEFAULT 0,
  `unmutedate` bigint NOT NULL DEFAULT 0,
  `mutedby` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mutereason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`, `mutedate`) USING BTREE,
  UNIQUE INDEX `banid`(`muteid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2011 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Mute History' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for account_twofactor_allowed
-- ----------------------------
DROP TABLE IF EXISTS `account_twofactor_allowed`;
CREATE TABLE `account_twofactor_allowed`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `account_id` int UNSIGNED NULL DEFAULT NULL,
  `expires_at` bigint UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 753 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for antispam_blacklist
-- ----------------------------
DROP TABLE IF EXISTS `antispam_blacklist`;
CREATE TABLE `antispam_blacklist`  (
  `word` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `regex` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`word`) USING BTREE
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
-- Table structure for antispam_scores
-- ----------------------------
DROP TABLE IF EXISTS `antispam_scores`;
CREATE TABLE `antispam_scores`  (
  `word` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `score` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `type` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`word`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for antispam_unicode
-- ----------------------------
DROP TABLE IF EXISTS `antispam_unicode`;
CREATE TABLE `antispam_unicode`  (
  `from` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `to` mediumint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`from`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for antispam_unicode_replacement
-- ----------------------------
DROP TABLE IF EXISTS `antispam_unicode_replacement`;
CREATE TABLE `antispam_unicode_replacement`  (
  `from` mediumint UNSIGNED NOT NULL DEFAULT 0,
  `to` mediumint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`from`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config`  (
  `id` int NOT NULL,
  `value` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `comment` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for fingerprint_autoban
-- ----------------------------
DROP TABLE IF EXISTS `fingerprint_autoban`;
CREATE TABLE `fingerprint_autoban`  (
  `fingerprint` bigint NOT NULL DEFAULT 0 COMMENT 'Account id',
  `banreason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Unknown',
  PRIMARY KEY (`fingerprint`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Fingerprint Ban List' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for fingerprint_banned
-- ----------------------------
DROP TABLE IF EXISTS `fingerprint_banned`;
CREATE TABLE `fingerprint_banned`  (
  `fingerprint` bigint NOT NULL DEFAULT 0 COMMENT 'Account id',
  `bandate` bigint NOT NULL DEFAULT 0,
  `unbandate` bigint NOT NULL DEFAULT 0,
  `bannedby` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `banreason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`fingerprint`, `bandate`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Fingerprint Ban List' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for geoip
-- ----------------------------
DROP TABLE IF EXISTS `geoip`;
CREATE TABLE `geoip`  (
  `network_start_integer` int NULL DEFAULT NULL,
  `network_last_integer` int NULL DEFAULT NULL,
  `geoname_id` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `registered_country_geoname_id` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `represented_country_geoname_id` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `is_anonymous_proxy` int NULL DEFAULT NULL,
  `is_satellite_provider` int NULL DEFAULT NULL,
  `postal_code` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `latitude` double NULL DEFAULT NULL,
  `longitude` double NULL DEFAULT NULL,
  `accuracy_radius` int NULL DEFAULT NULL,
  INDEX `ip_start`(`network_start_integer`) USING BTREE,
  INDEX `ip_end`(`network_last_integer`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gp_history
-- ----------------------------
DROP TABLE IF EXISTS `gp_history`;
CREATE TABLE `gp_history`  (
  `account_id` int UNSIGNED NOT NULL,
  `code` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`account_id`, `code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hwprint_marks
-- ----------------------------
DROP TABLE IF EXISTS `hwprint_marks`;
CREATE TABLE `hwprint_marks`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `extendedPrint` bigint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ip_banned
-- ----------------------------
DROP TABLE IF EXISTS `ip_banned`;
CREATE TABLE `ip_banned`  (
  `ip` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0.0.0.0',
  `bandate` int NOT NULL,
  `unbandate` int NOT NULL,
  `bannedby` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '[Console]',
  `banreason` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'no reason',
  PRIMARY KEY (`ip`, `bandate`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Banned IPs' ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for rbac_account_permissions
-- ----------------------------
DROP TABLE IF EXISTS `rbac_account_permissions`;
CREATE TABLE `rbac_account_permissions`  (
  `account_id` int NOT NULL,
  `permission_id` int NOT NULL,
  `granted` tinyint UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`account_id`, `permission_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for rbac_command_permissions
-- ----------------------------
DROP TABLE IF EXISTS `rbac_command_permissions`;
CREATE TABLE `rbac_command_permissions`  (
  `command` varchar(128) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `permission_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`command`, `permission_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for rbac_permissions
-- ----------------------------
DROP TABLE IF EXISTS `rbac_permissions`;
CREATE TABLE `rbac_permissions`  (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for realmcharacters
-- ----------------------------
DROP TABLE IF EXISTS `realmcharacters`;
CREATE TABLE `realmcharacters`  (
  `realmid` int UNSIGNED NOT NULL DEFAULT 0,
  `acctid` bigint UNSIGNED NOT NULL,
  `numchars` tinyint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`realmid`, `acctid`) USING BTREE,
  INDEX `acctid`(`acctid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Realm Character Tracker' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for realmlist
-- ----------------------------
DROP TABLE IF EXISTS `realmlist`;
CREATE TABLE `realmlist`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `address` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '127.0.0.1',
  `port` int NOT NULL DEFAULT 8085,
  `icon` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `realmflags` tinyint UNSIGNED NOT NULL DEFAULT 2 COMMENT 'Supported masks: 0x1 (invalid, not show in realm list), 0x2 (offline, set by mangosd), 0x4 (show version and build), 0x20 (new players), 0x40 (recommended)',
  `timezone` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `allowedSecurityLevel` tinyint UNSIGNED NOT NULL DEFAULT 0,
  `population` float UNSIGNED NOT NULL DEFAULT 0,
  `realmbuilds` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '5875',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_name`(`name`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Realm System' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for shop_coins
-- ----------------------------
DROP TABLE IF EXISTS `shop_coins`;
CREATE TABLE `shop_coins`  (
  `id` int UNSIGNED NOT NULL,
  `coins` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for shop_coins_history
-- ----------------------------
DROP TABLE IF EXISTS `shop_coins_history`;
CREATE TABLE `shop_coins_history`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_id` int UNSIGNED NOT NULL,
  `points` int NOT NULL,
  `actual_points` int NOT NULL,
  `new_points` int NOT NULL,
  `type` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `system` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `reference` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16643 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for shop_diff
-- ----------------------------
DROP TABLE IF EXISTS `shop_diff`;
CREATE TABLE `shop_diff`  (
  `guid` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `accountid` int UNSIGNED NOT NULL DEFAULT 0,
  `prev_bonus` int NOT NULL,
  `new_bonus` int NOT NULL,
  `date` int UNSIGNED NOT NULL DEFAULT 0,
  `query` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 824805 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for shop_logs
-- ----------------------------
DROP TABLE IF EXISTS `shop_logs`;
CREATE TABLE `shop_logs`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` timestamp NOT NULL DEFAULT current_timestamp,
  `guid` int UNSIGNED NOT NULL DEFAULT 0,
  `account` int UNSIGNED NOT NULL DEFAULT 0,
  `item` int UNSIGNED NOT NULL DEFAULT 0,
  `price` int UNSIGNED NOT NULL DEFAULT 0,
  `refunded` tinyint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account`(`account`) USING BTREE,
  INDEX `time`(`time`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 148122 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

ALTER TABLE `shop_logs`
	ADD COLUMN `realm_id` INT UNSIGNED NOT NULL DEFAULT '0' AFTER `refunded`;

-- ----------------------------
-- Table structure for statistics_online
-- ----------------------------
DROP TABLE IF EXISTS `statistics_online`;
CREATE TABLE `statistics_online`  (
  `guid` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `online` int UNSIGNED NULL DEFAULT 0,
  `online_alli` int UNSIGNED NULL DEFAULT 0,
  `online_horde` int UNSIGNED NULL DEFAULT 0,
  `connections` int UNSIGNED NULL DEFAULT 0,
  `realm` tinyint UNSIGNED NULL DEFAULT 0,
  `date` int UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 251561 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for statistics_online_old
-- ----------------------------
DROP TABLE IF EXISTS `statistics_online_old`;
CREATE TABLE `statistics_online_old`  (
  `guid` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `online` int UNSIGNED NULL DEFAULT 0,
  `online_alli` int NULL DEFAULT 0,
  `online_horde` int NULL DEFAULT 0,
  `connections` int UNSIGNED NULL DEFAULT 0,
  `realm` tinyint UNSIGNED NULL DEFAULT 0,
  `date` int UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`guid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 201668 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_fingerprint_usage
-- ----------------------------
DROP TABLE IF EXISTS `system_fingerprint_usage`;
CREATE TABLE `system_fingerprint_usage`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `fingerprint` int UNSIGNED NOT NULL,
  `account` int UNSIGNED NOT NULL,
  `ip` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `realm` int UNSIGNED NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp,
  `architecture` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cputype` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `activecpus` int UNSIGNED NULL DEFAULT NULL,
  `totalcpus` int UNSIGNED NULL DEFAULT NULL,
  `pagesize` int UNSIGNED NULL DEFAULT NULL,
  `timezoneBias` int UNSIGNED NOT NULL,
  `largepageMinimum` int UNSIGNED NOT NULL,
  `suiteMask` int UNSIGNED NOT NULL,
  `mitigationPolicies` int UNSIGNED NOT NULL,
  `numberPhysicalPages` int UNSIGNED NOT NULL,
  `sharedDataFlags` int UNSIGNED NOT NULL,
  `testRestInstruction` bigint UNSIGNED NOT NULL,
  `qpcFrequency` bigint NOT NULL,
  `qpcSystemTimeIncrement` bigint UNSIGNED NOT NULL,
  `unparkedProcessorCount` int UNSIGNED NOT NULL,
  `enclaveFeatureMask` int UNSIGNED NOT NULL,
  `qpcData` int UNSIGNED NOT NULL,
  `timeZoneId` int UNSIGNED NOT NULL,
  `osVersion` enum('None','WinXP','Win7','Win8','Vista','Win10Up','<Unknown>') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '<Unknown>',
  `extendedHash` bigint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fingerprint`(`fingerprint`) USING BTREE,
  INDEX `account`(`account`) USING BTREE,
  INDEX `ip`(`ip`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12866396 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_fingerprint_usage_archive
-- ----------------------------
DROP TABLE IF EXISTS `system_fingerprint_usage_archive`;
CREATE TABLE `system_fingerprint_usage_archive`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `fingerprint` int UNSIGNED NOT NULL,
  `account` int UNSIGNED NOT NULL,
  `ip` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `realm` int UNSIGNED NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp,
  `architecture` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cputype` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `activecpus` int UNSIGNED NULL DEFAULT NULL,
  `totalcpus` int UNSIGNED NULL DEFAULT NULL,
  `pagesize` int UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fingerprint`(`fingerprint`) USING BTREE,
  INDEX `account`(`account`) USING BTREE,
  INDEX `ip`(`ip`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 122489 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uptime
-- ----------------------------
DROP TABLE IF EXISTS `uptime`;
CREATE TABLE `uptime`  (
  `realmid` int UNSIGNED NOT NULL,
  `starttime` bigint UNSIGNED NOT NULL DEFAULT 0,
  `startstring` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `uptime` bigint UNSIGNED NOT NULL DEFAULT 0,
  `onlineplayers` smallint UNSIGNED NOT NULL DEFAULT 0,
  `maxplayers` smallint UNSIGNED NOT NULL DEFAULT 0,
  `revision` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Turtle WoW',
  PRIMARY KEY (`realmid`, `starttime`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'Uptime system' ROW_FORMAT = DYNAMIC;

ALTER TABLE `uptime`
	ADD COLUMN `queue` SMALLINT(5) UNSIGNED NOT NULL DEFAULT '0' AFTER `maxplayers`,
	ADD COLUMN `maxqueue` SMALLINT(5) UNSIGNED NOT NULL DEFAULT '0' AFTER `queue`;

-- ----------------------------
-- Function structure for account_balance_update
-- ----------------------------
DROP FUNCTION IF EXISTS `account_balance_update`;
delimiter ;;
CREATE FUNCTION `account_balance_update`(`AccountID` int,`Price` int)
 RETURNS int(11)
BEGIN
    SELECT `coins` INTO @CoinCount FROM `shop_coins` WHERE `id`= AccountID FOR UPDATE;
    IF @CoinCount >= Price THEN
        UPDATE `shop_coins` SET `coins` = `coins` - Price WHERE `id` = AccountID;
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
	  RETURN 0;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table shop_coins
-- ----------------------------
DROP TRIGGER IF EXISTS `shop_insert`;
delimiter ;;
CREATE TRIGGER `shop_insert` AFTER INSERT ON `shop_coins` FOR EACH ROW BEGIN
INSERT INTO `shop_diff` (prev_bonus, new_bonus, accountid, date, query) VALUES (0, NEW.coins, NEW.id, UNIX_TIMESTAMP(now()), "INSERT");
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table shop_coins
-- ----------------------------
DROP TRIGGER IF EXISTS `shop_update`;
delimiter ;;
CREATE TRIGGER `shop_update` AFTER UPDATE ON `shop_coins` FOR EACH ROW BEGIN
IF OLD.coins != NEW.coins THEN  
INSERT INTO `shop_diff` (prev_bonus, new_bonus, accountid, date, query) VALUES (OLD.coins, NEW.coins, NEW.id, UNIX_TIMESTAMP(now()), "UPDATE");
END IF;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table shop_coins
-- ----------------------------
DROP TRIGGER IF EXISTS `shop_delete`;
delimiter ;;
CREATE TRIGGER `shop_delete` AFTER DELETE ON `shop_coins` FOR EACH ROW BEGIN
INSERT INTO `shop_diff` (prev_bonus, new_bonus, accountid, date, query) VALUES (OLD.coins, 0, OLD.id, UNIX_TIMESTAMP(now()), "DELETE");
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE `account`
	ADD COLUMN `active` TINYINT(3) UNSIGNED NOT NULL DEFAULT '1' AFTER `queue_skip`;

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table turtle_server_auth.character_transfers
CREATE TABLE IF NOT EXISTS `character_transfers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL DEFAULT '',
  `source_realm_id` int(11) NOT NULL,
  `source_account_id` bigint(20) unsigned NOT NULL,
  `source_character_guid` bigint(20) unsigned NOT NULL,
  `data` longtext DEFAULT NULL,
  `target_realm_id` int(11) NOT NULL,
  `target_account_id` bigint(20) unsigned DEFAULT NULL,
  `status` enum('pending','in_progress','transferred','failed') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table turtle_server_auth.character_transfers: ~0 rows (approximately)
DELETE FROM `character_transfers`;

CREATE TABLE `pending_commands` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'auto incrementing identifier for the row',
	`realm_id` INT UNSIGNED NULL COMMENT 'id of the realm that should run the command',
	`command` VARCHAR(250) NOT NULL DEFAULT '' COMMENT 'full comand with parameters',
	`run_at_time` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT 'unixtime',
	PRIMARY KEY (`id`)
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB
;

-- Dumping structure for table turtle_realmd.world_config
DROP TABLE IF EXISTS `world_config`;
CREATE TABLE IF NOT EXISTS `world_config` (
  `realm_id` int(11) unsigned NOT NULL,
  `compression` int(10) unsigned NOT NULL DEFAULT '0',
  `login_queue_grace_period_secs` int(10) unsigned NOT NULL DEFAULT '0',
  `character_screen_max_idle_time` int(10) unsigned NOT NULL DEFAULT '0',
  `player_hard_limit` int(10) unsigned NOT NULL DEFAULT '0',
  `antiflood_sanction` int(10) unsigned NOT NULL DEFAULT '0',
  `packet_bcast_threads` int(10) unsigned NOT NULL DEFAULT '0',
  `packet_bcast_frequency` int(10) unsigned NOT NULL DEFAULT '0',
  `mailspam_expire_secs` int(10) unsigned NOT NULL DEFAULT '0',
  `mailspam_max_mails` int(10) unsigned NOT NULL DEFAULT '0',
  `mailspam_level` int(10) unsigned NOT NULL DEFAULT '0',
  `mailspam_account_level` int(10) unsigned NOT NULL DEFAULT '0',
  `mailspam_money` int(10) unsigned NOT NULL DEFAULT '0',
  `empty_maps_update_time` int(10) unsigned NOT NULL DEFAULT '0',
  `cod_force_tag_max_level` int(10) unsigned NOT NULL DEFAULT '0',
  `pub_chans_mute_vanish_level` int(10) unsigned NOT NULL DEFAULT '0',
  `gmtickets_admin_security` int(10) unsigned NOT NULL DEFAULT '0',
  `gmtickets_minlevel` int(10) unsigned NOT NULL DEFAULT '0',
  `battleground_queues_count` int(10) unsigned NOT NULL DEFAULT '0',
  `corpses_update_minutes` int(10) unsigned NOT NULL DEFAULT '0',
  `bones_expire_minutes` int(10) unsigned NOT NULL DEFAULT '0',
  `async_tasks_threads_count` int(10) unsigned NOT NULL DEFAULT '0',
  `av_min_players_in_queue` int(10) unsigned NOT NULL DEFAULT '0',
  `av_initial_max_players` int(10) unsigned NOT NULL DEFAULT '0',
  `inactive_players_skip_updates` int(10) unsigned NOT NULL DEFAULT '0',
  `item_instantsave_quality` int(10) unsigned NOT NULL DEFAULT '0',
  `item_rareloot_quality` int(10) unsigned NOT NULL DEFAULT '0',
  `whisp_diff_zone_min_level` int(10) unsigned NOT NULL DEFAULT '0',
  `channel_invite_min_level` int(10) unsigned NOT NULL DEFAULT '0',
  `world_chan_min_level` int(10) unsigned NOT NULL DEFAULT '0',
  `world_chan_cd` int(10) unsigned NOT NULL DEFAULT '0',
  `world_chan_cd_max_level` int(10) unsigned NOT NULL DEFAULT '0',
  `world_chan_cd_scaling` int(10) unsigned NOT NULL DEFAULT '0',
  `world_chan_cd_use_account_max_level` int(10) unsigned NOT NULL DEFAULT '0',
  `say_emote_min_level` int(10) unsigned NOT NULL DEFAULT '0',
  `say_min_level` int(10) unsigned NOT NULL DEFAULT '0',
  `yell_min_level` int(10) unsigned NOT NULL DEFAULT '0',
  `yellrange_min` int(10) unsigned NOT NULL DEFAULT '0',
  `whisper_targets_max` int(10) unsigned NOT NULL DEFAULT '0',
  `whisper_targets_bypass_level` int(10) unsigned NOT NULL DEFAULT '0',
  `whisper_targets_decay` int(10) unsigned NOT NULL DEFAULT '0',
  `yellrange_linearscale_maxlevel` int(10) unsigned NOT NULL DEFAULT '0',
  `yellrange_quadraticscale_maxlevel` int(10) unsigned NOT NULL DEFAULT '0',
  `dyn_respawn_players_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `dyn_respawn_players_leveldiff` int(10) unsigned NOT NULL DEFAULT '0',
  `dyn_respawn_min_respawn_time` int(10) unsigned NOT NULL DEFAULT '0',
  `dyn_respawn_min_respawn_time_elite` int(10) unsigned NOT NULL DEFAULT '0',
  `dyn_respawn_min_respawn_time_indoors` int(10) unsigned NOT NULL DEFAULT '0',
  `dyn_respawn_affect_respawn_time_below` int(10) unsigned NOT NULL DEFAULT '0',
  `dyn_respawn_affect_level_below` int(10) unsigned NOT NULL DEFAULT '0',
  `mtcells_threads` int(10) unsigned NOT NULL DEFAULT '0',
  `mtcells_safedistance` int(10) unsigned NOT NULL DEFAULT '0',
  `mapupdate_instanced_update_threads` int(10) unsigned NOT NULL DEFAULT '0',
  `mapupdate_update_packets_diff` int(10) unsigned NOT NULL DEFAULT '0',
  `mapupdate_update_players_diff` int(10) unsigned NOT NULL DEFAULT '0',
  `mapupdate_update_cells_diff` int(10) unsigned NOT NULL DEFAULT '0',
  `log_money_trades_treshold` int(10) unsigned NOT NULL DEFAULT '0',
  `relocation_vmap_check_timer` int(10) unsigned NOT NULL DEFAULT '0',
  `mapupdate_tick_lower_visibility_distance` int(10) unsigned NOT NULL DEFAULT '0',
  `mapupdate_tick_increase_visibility_distance` int(10) unsigned NOT NULL DEFAULT '0',
  `mapupdate_min_visibility_distance` int(10) unsigned NOT NULL DEFAULT '0',
  `mapupdate_tick_lower_grid_activation_distance` int(10) unsigned NOT NULL DEFAULT '0',
  `mapupdate_tick_increase_grid_activation_distance` int(10) unsigned NOT NULL DEFAULT '0',
  `pbcast_diff_lower_visibility_distance` int(10) unsigned NOT NULL DEFAULT '0',
  `mapupdate_min_grid_activation_distance` int(10) unsigned NOT NULL DEFAULT '0',
  `continents_motionupdate_threads` int(10) unsigned NOT NULL DEFAULT '0',
  `perflog_slow_world_update` int(10) unsigned NOT NULL DEFAULT '0',
  `perflog_slow_map_update` int(10) unsigned NOT NULL DEFAULT '0',
  `perflog_slow_mapsystem_update` int(10) unsigned NOT NULL DEFAULT '0',
  `perflog_slow_sessions_update` int(10) unsigned NOT NULL DEFAULT '0',
  `perflog_slow_unique_session_update` int(10) unsigned NOT NULL DEFAULT '0',
  `perflog_slow_async_queries` int(10) unsigned NOT NULL DEFAULT '0',
  `perflog_slow_packet` int(10) unsigned NOT NULL DEFAULT '0',
  `perflog_slow_map_packets` int(10) unsigned NOT NULL DEFAULT '0',
  `perflog_slow_packet_bcast` int(10) unsigned NOT NULL DEFAULT '0',
  `async_queries_tick_timeout` int(10) unsigned NOT NULL DEFAULT '0',
  `login_per_tick` int(10) unsigned NOT NULL DEFAULT '0',
  `anticrash_rearm_timer` int(10) unsigned NOT NULL DEFAULT '0',
  `anticrash_options` int(10) unsigned NOT NULL DEFAULT '0',
  `max_points_per_mvt_packet` int(10) unsigned NOT NULL DEFAULT '0',
  `debuff_limit` int(10) unsigned NOT NULL DEFAULT '0',
  `spells_ccdelay` int(10) unsigned NOT NULL DEFAULT '0',
  `pet_default_loyalty` int(10) unsigned NOT NULL DEFAULT '0',
  `map_objectsupdate_threads` int(10) unsigned NOT NULL DEFAULT '0',
  `map_objectsupdate_timeout` int(10) unsigned NOT NULL DEFAULT '0',
  `map_visibilityupdate_threads` int(10) unsigned NOT NULL DEFAULT '0',
  `map_visibilityupdate_timeout` int(10) unsigned NOT NULL DEFAULT '0',
  `interval_save` int(10) unsigned NOT NULL DEFAULT '0',
  `interval_gridclean` int(10) unsigned NOT NULL DEFAULT '0',
  `interval_mapupdate` int(10) unsigned NOT NULL DEFAULT '0',
  `interval_changeweather` int(10) unsigned NOT NULL DEFAULT '0',
  `port_world` int(10) unsigned NOT NULL DEFAULT '0',
  `game_type` int(10) unsigned NOT NULL DEFAULT '0',
  `realm_zone` int(10) unsigned NOT NULL DEFAULT '0',
  `strict_player_names` int(10) unsigned NOT NULL DEFAULT '0',
  `strict_charter_names` int(10) unsigned NOT NULL DEFAULT '0',
  `strict_pet_names` int(10) unsigned NOT NULL DEFAULT '0',
  `min_player_name` int(10) unsigned NOT NULL DEFAULT '0',
  `min_charter_name` int(10) unsigned NOT NULL DEFAULT '0',
  `min_pet_name` int(10) unsigned NOT NULL DEFAULT '0',
  `characters_creating_disabled` int(10) unsigned NOT NULL DEFAULT '0',
  `characters_per_account` int(10) unsigned NOT NULL DEFAULT '0',
  `characters_per_realm` int(10) unsigned NOT NULL DEFAULT '0',
  `skip_cinematics` int(10) unsigned NOT NULL DEFAULT '0',
  `max_player_level` int(10) unsigned NOT NULL DEFAULT '0',
  `start_player_level` int(10) unsigned NOT NULL DEFAULT '0',
  `start_player_money` int(10) unsigned NOT NULL DEFAULT '0',
  `max_honor_points` int(10) unsigned NOT NULL DEFAULT '0',
  `start_honor_points` int(10) unsigned NOT NULL DEFAULT '0',
  `min_honor_kills` int(10) unsigned NOT NULL DEFAULT '0',
  `instance_reset_time_hour` int(10) unsigned NOT NULL DEFAULT '0',
  `instance_unload_delay` int(10) unsigned NOT NULL DEFAULT '0',
  `max_spell_casts_in_chain` int(10) unsigned NOT NULL DEFAULT '0',
  `max_primary_trade_skill` int(10) unsigned NOT NULL DEFAULT '0',
  `min_petition_signs` int(10) unsigned NOT NULL DEFAULT '0',
  `gm_login_state` int(10) unsigned NOT NULL DEFAULT '0',
  `gm_visible_state` int(10) unsigned NOT NULL DEFAULT '0',
  `gm_accept_tickets` int(10) unsigned NOT NULL DEFAULT '0',
  `gm_chat` int(10) unsigned NOT NULL DEFAULT '0',
  `gm_wispering_to` int(10) unsigned NOT NULL DEFAULT '0',
  `gm_level_in_gm_list` int(10) unsigned NOT NULL DEFAULT '0',
  `gm_level_in_who_list` int(10) unsigned NOT NULL DEFAULT '0',
  `start_gm_level` int(10) unsigned NOT NULL DEFAULT '0',
  `group_visibility` int(10) unsigned NOT NULL DEFAULT '0',
  `mail_delivery_delay` int(10) unsigned NOT NULL DEFAULT '0',
  `mass_mailer_send_per_tick` int(10) unsigned NOT NULL DEFAULT '0',
  `mail_max_per_hour` int(10) unsigned NOT NULL DEFAULT '0',
  `uptime_update` int(10) unsigned NOT NULL DEFAULT '0',
  `auction_deposit_min` int(10) unsigned NOT NULL DEFAULT '0',
  `skill_chance_orange` int(10) unsigned NOT NULL DEFAULT '0',
  `skill_chance_yellow` int(10) unsigned NOT NULL DEFAULT '0',
  `skill_chance_green` int(10) unsigned NOT NULL DEFAULT '0',
  `skill_chance_grey` int(10) unsigned NOT NULL DEFAULT '0',
  `skill_chance_mining_steps` int(10) unsigned NOT NULL DEFAULT '0',
  `skill_chance_skinning_steps` int(10) unsigned NOT NULL DEFAULT '0',
  `skill_gain_crafting` int(10) unsigned NOT NULL DEFAULT '0',
  `skill_gain_defense` int(10) unsigned NOT NULL DEFAULT '0',
  `skill_gain_gathering` int(10) unsigned NOT NULL DEFAULT '0',
  `skill_gain_weapon` int(10) unsigned NOT NULL DEFAULT '0',
  `max_overspeed_pings` int(10) unsigned NOT NULL DEFAULT '0',
  `chatflood_message_count` int(10) unsigned NOT NULL DEFAULT '0',
  `chatflood_message_delay` int(10) unsigned NOT NULL DEFAULT '0',
  `chatflood_mute_time` int(10) unsigned NOT NULL DEFAULT '0',
  `creature_family_assistance_delay` int(10) unsigned NOT NULL DEFAULT '0',
  `creature_family_flee_delay` int(10) unsigned NOT NULL DEFAULT '0',
  `world_boss_level_diff` int(10) unsigned NOT NULL DEFAULT '0',
  `chat_strict_link_checking_severity` int(10) unsigned NOT NULL DEFAULT '0',
  `chat_strict_link_checking_kick` int(10) unsigned NOT NULL DEFAULT '0',
  `corpse_decay_normal` int(10) unsigned NOT NULL DEFAULT '0',
  `corpse_decay_rare` int(10) unsigned NOT NULL DEFAULT '0',
  `corpse_decay_elite` int(10) unsigned NOT NULL DEFAULT '0',
  `corpse_decay_rareelite` int(10) unsigned NOT NULL DEFAULT '0',
  `corpse_decay_worldboss` int(10) unsigned NOT NULL DEFAULT '0',
  `instant_logout` int(10) unsigned NOT NULL DEFAULT '0',
  `battleground_invitation_type` int(10) unsigned NOT NULL DEFAULT '0',
  `battleground_premade_queue_group_min_size` int(10) unsigned NOT NULL DEFAULT '0',
  `battleground_premature_finish_timer` int(10) unsigned NOT NULL DEFAULT '0',
  `battleground_premade_group_wait_for_match` int(10) unsigned NOT NULL DEFAULT '0',
  `battleground_queue_announcer_join` int(10) unsigned NOT NULL DEFAULT '0',
  `group_offline_leader_delay` int(10) unsigned NOT NULL DEFAULT '0',
  `guild_event_log_count` int(10) unsigned NOT NULL DEFAULT '0',
  `mirrortimer_fatigue_max` int(10) unsigned NOT NULL DEFAULT '0',
  `mirrortimer_breath_max` int(10) unsigned NOT NULL DEFAULT '0',
  `mirrortimer_environmental_max` int(10) unsigned NOT NULL DEFAULT '0',
  `environmental_damage_min` int(10) unsigned NOT NULL DEFAULT '0',
  `environmental_damage_max` int(10) unsigned NOT NULL DEFAULT '0',
  `min_level_stat_save` int(10) unsigned NOT NULL DEFAULT '0',
  `maintenance_day` int(10) unsigned NOT NULL DEFAULT '0',
  `chardelete_keep_days` int(10) unsigned NOT NULL DEFAULT '0',
  `chardelete_method` int(10) unsigned NOT NULL DEFAULT '0',
  `chardelete_min_level` int(10) unsigned NOT NULL DEFAULT '0',
  `guid_reserve_size_creature` int(10) unsigned NOT NULL DEFAULT '0',
  `guid_reserve_size_gameobject` int(10) unsigned NOT NULL DEFAULT '0',
  `respec_base_cost` int(10) unsigned NOT NULL DEFAULT '0',
  `respec_multiplicative_cost` int(10) unsigned NOT NULL DEFAULT '0',
  `respec_min_multiplier` int(10) unsigned NOT NULL DEFAULT '0',
  `respec_max_multiplier` int(10) unsigned NOT NULL DEFAULT '0',
  `battleground_group_limit` int(10) unsigned NOT NULL DEFAULT '0',
  `creature_summon_limit` int(10) unsigned NOT NULL DEFAULT '0',
  `war_effort_autocomplete_period` int(10) unsigned NOT NULL DEFAULT '0',
  `account_concurrent_auction_limit` int(10) unsigned NOT NULL DEFAULT '0',
  `banlist_reload_timer` int(10) unsigned NOT NULL DEFAULT '0',
  `autobroadcast_interval` int(10) unsigned NOT NULL DEFAULT '0',
  `transmog_req_item` int(10) unsigned NOT NULL DEFAULT '0',
  `transmog_req_item_count` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_ban_duration` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_reverse_time_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_reverse_time_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_null_time_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_null_time_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_skipped_heartbeats_threshold_tick` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_skipped_heartbeats_threshold_total` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_skipped_heartbeats_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_time_desync_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_time_desync_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_num_desyncs_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_num_desyncs_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_overspeed_distance_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_overspeed_distance_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_overspeed_jump_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_overspeed_jump_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_jump_speed_change_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_jump_speed_change_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_multi_jump_threshold_tick` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_multi_jump_threshold_total` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_multi_jump_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_wall_climb_threshold_tick` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_wall_climb_threshold_total` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_wall_climb_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_unreachable_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_unreachable_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fly_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fly_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_no_fall_time_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_no_fall_time_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_teleport_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_teleport_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_tele_to_transport_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_tele_to_transport_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fake_transport_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fake_transport_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_water_walk_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_water_walk_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_slow_fall_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_slow_fall_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_hover_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_hover_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fixed_z_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fixed_z_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_root_move_threshold_tick` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_root_move_threshold_total` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_root_move_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_self_root_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_self_root_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_wrong_ack_data_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_wrong_ack_data_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_pending_ack_delay_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_pending_ack_delay_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_explore_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_explore_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_explore_high_level_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_explore_high_level_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_forbidden_area_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_forbidden_area_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `movement_change_ack_time` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_warden_client_response_delay` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_warden_client_check_holdoff` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_warden_default_penalty` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_warden_client_ban_duration` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_warden_num_mem_checks` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_warden_num_other_checks` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_warden_db_loglevel` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_max_restriction_level` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_original_normalize_mask` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_fully_normalize_mask` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_score_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_mutetime` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_chat_mask` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_detect_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_repeat_count` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_update_timer` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_message_block_size` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_frequency_time` int(10) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_frequency_count` int(10) unsigned NOT NULL DEFAULT '0',
  `bg_sv_spark_max_count` int(10) unsigned NOT NULL DEFAULT '0',
  `item_log_restore_quality` int(10) unsigned NOT NULL DEFAULT '0',
  `chat_min_level` int(10) unsigned NOT NULL DEFAULT '0',
  `auto_commit_minutes` int(10) unsigned NOT NULL DEFAULT '0',
  `account_data_last_login_days` int(10) unsigned NOT NULL DEFAULT '0',
  `password_change_reward_item` int(10) unsigned NOT NULL DEFAULT '0',
  `max_age_show_warning` int(10) unsigned NOT NULL DEFAULT '0',
  `high_level_character` int(10) unsigned NOT NULL DEFAULT '0',
  `account_trusted_ip_percentage` int(10) unsigned NOT NULL DEFAULT '0',
  `analysis_no_fingerprint_match_weight` int(10) unsigned NOT NULL DEFAULT '0',
  `analysis_no_extended_data_match_weight` int(10) unsigned NOT NULL DEFAULT '0',
  `analysis_no_cpu_data_weight` int(10) unsigned NOT NULL DEFAULT '0',
  `analysis_no_cpu_data_match_weight` int(10) unsigned NOT NULL DEFAULT '0',
  `analysis_no_extended_data_weight` int(10) unsigned NOT NULL DEFAULT '0',
  `analysis_warning_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `auto_restart_max_server_uptime` int(10) unsigned NOT NULL DEFAULT '0',
  `auto_restart_hour_min` int(10) unsigned NOT NULL DEFAULT '0',
  `auto_restart_hour_max` int(10) unsigned NOT NULL DEFAULT '0',
  `diff_hc_protection` int(10) unsigned NOT NULL DEFAULT '0',
  `login_region_queue_level_threshold` int(10) unsigned NOT NULL DEFAULT '0',
  `priority_queue_priority_per_tick` int(10) unsigned NOT NULL DEFAULT '0',
  `priority_queue_donator_settings` int(10) unsigned NOT NULL DEFAULT '0',
  `priority_queue_donator_priority` int(10) unsigned NOT NULL DEFAULT '0',
  `priority_queue_western_priority` int(10) unsigned NOT NULL DEFAULT '0',
  `priority_queue_high_level_char` int(10) unsigned NOT NULL DEFAULT '0',
  `priority_queue_high_level_char_priority` int(10) unsigned NOT NULL DEFAULT '0',
  `priority_queue_priority_per_account_day` int(10) unsigned NOT NULL DEFAULT '0',
  `priority_queue_priority_reduction_multibox` int(10) unsigned NOT NULL DEFAULT '0',
  `max_percentage_pop_non_regional` int(10) unsigned NOT NULL DEFAULT '0',
  `max_percentage_pop_regional` int(10) unsigned NOT NULL DEFAULT '0',
  `auto_pdump_min_char_level` int(10) unsigned NOT NULL DEFAULT '0',
  `auto_pdump_delete_after_days` int(10) unsigned NOT NULL DEFAULT '0',
  `content_phase` int(10) unsigned NOT NULL DEFAULT '0',
  `shop_refund_window` int(10) unsigned NOT NULL DEFAULT '0',
  `performance_report_interval` int(10) unsigned NOT NULL DEFAULT '0',
  `max_gold_transferred` int(10) unsigned NOT NULL DEFAULT '0',
  `max_item_stack_transferred` int(10) unsigned NOT NULL DEFAULT '0',
  `death_sickness_level` int(11) NOT NULL DEFAULT '0',
  `quest_low_level_hide_diff` int(11) NOT NULL DEFAULT '0',
  `quest_high_level_hide_diff` int(11) NOT NULL DEFAULT '0',
  `ac_anticheat_max_allowed_desync` int(11) NOT NULL DEFAULT '0',
  `rate_health` float NOT NULL DEFAULT '0',
  `max_creature_attack_radius` float NOT NULL DEFAULT '0',
  `max_players_stealth_detect_range` float NOT NULL DEFAULT '0',
  `dyn_respawn_check_range` float NOT NULL DEFAULT '0',
  `dyn_respawn_percent_per_player` float NOT NULL DEFAULT '0',
  `dyn_respawn_max_reduction_rate` float NOT NULL DEFAULT '0',
  `rate_power_mana` float NOT NULL DEFAULT '0',
  `rate_power_rage_income` float NOT NULL DEFAULT '0',
  `rate_power_rage_loss` float NOT NULL DEFAULT '0',
  `rate_power_focus` float NOT NULL DEFAULT '0',
  `rate_power_energy` float NOT NULL DEFAULT '0',
  `rate_skill_discovery` float NOT NULL DEFAULT '0',
  `rate_drop_item_poor` float NOT NULL DEFAULT '0',
  `rate_drop_item_normal` float NOT NULL DEFAULT '0',
  `rate_drop_item_uncommon` float NOT NULL DEFAULT '0',
  `rate_drop_item_rare` float NOT NULL DEFAULT '0',
  `rate_drop_item_epic` float NOT NULL DEFAULT '0',
  `rate_drop_item_legendary` float NOT NULL DEFAULT '0',
  `rate_drop_item_artifact` float NOT NULL DEFAULT '0',
  `rate_drop_item_referenced` float NOT NULL DEFAULT '0',
  `rate_drop_money` float NOT NULL DEFAULT '0',
  `rate_xp_kill` float NOT NULL DEFAULT '0',
  `rate_xp_kill_elite` float NOT NULL DEFAULT '0',
  `rate_xp_quest` float NOT NULL DEFAULT '0',
  `rate_xp_explore` float NOT NULL DEFAULT '0',
  `rate_reputation_gain` float NOT NULL DEFAULT '0',
  `rate_reputation_lowlevel_kill` float NOT NULL DEFAULT '0',
  `rate_reputation_lowlevel_quest` float NOT NULL DEFAULT '0',
  `rate_creature_normal_hp` float NOT NULL DEFAULT '0',
  `rate_creature_elite_elite_hp` float NOT NULL DEFAULT '0',
  `rate_creature_elite_rareelite_hp` float NOT NULL DEFAULT '0',
  `rate_creature_elite_worldboss_hp` float NOT NULL DEFAULT '0',
  `rate_creature_elite_rare_hp` float NOT NULL DEFAULT '0',
  `rate_creature_normal_damage` float NOT NULL DEFAULT '0',
  `rate_creature_elite_elite_damage` float NOT NULL DEFAULT '0',
  `rate_creature_elite_rareelite_damage` float NOT NULL DEFAULT '0',
  `rate_creature_elite_worldboss_damage` float NOT NULL DEFAULT '0',
  `rate_creature_elite_rare_damage` float NOT NULL DEFAULT '0',
  `rate_creature_normal_spelldamage` float NOT NULL DEFAULT '0',
  `rate_creature_elite_elite_spelldamage` float NOT NULL DEFAULT '0',
  `rate_creature_elite_rareelite_spelldamage` float NOT NULL DEFAULT '0',
  `rate_creature_elite_worldboss_spelldamage` float NOT NULL DEFAULT '0',
  `rate_creature_elite_rare_spelldamage` float NOT NULL DEFAULT '0',
  `rate_creature_aggro` float NOT NULL DEFAULT '0',
  `rate_rest_ingame` float NOT NULL DEFAULT '0',
  `rate_rest_offline_in_tavern_or_city` float NOT NULL DEFAULT '0',
  `rate_rest_offline_in_wilderness` float NOT NULL DEFAULT '0',
  `rate_damage_fall` float NOT NULL DEFAULT '0',
  `rate_auction_time` float NOT NULL DEFAULT '0',
  `rate_auction_deposit` float NOT NULL DEFAULT '0',
  `rate_auction_cut` float NOT NULL DEFAULT '0',
  `rate_honor` float NOT NULL DEFAULT '0',
  `rate_mining_amount` float NOT NULL DEFAULT '0',
  `rate_mining_next` float NOT NULL DEFAULT '0',
  `rate_talent` float NOT NULL DEFAULT '0',
  `rate_loyalty` float NOT NULL DEFAULT '0',
  `rate_corpse_decay_looted` float NOT NULL DEFAULT '0',
  `rate_instance_reset_time` float NOT NULL DEFAULT '0',
  `rate_target_pos_recalculation_range` float NOT NULL DEFAULT '0',
  `rate_durability_loss_damage` float NOT NULL DEFAULT '0',
  `rate_durability_loss_parry` float NOT NULL DEFAULT '0',
  `rate_durability_loss_absorb` float NOT NULL DEFAULT '0',
  `rate_durability_loss_block` float NOT NULL DEFAULT '0',
  `listen_range_say` float NOT NULL DEFAULT '0',
  `listen_range_yell` float NOT NULL DEFAULT '0',
  `listen_range_textemote` float NOT NULL DEFAULT '0',
  `creature_family_flee_assistance_radius` float NOT NULL DEFAULT '0',
  `creature_family_assistance_radius` float NOT NULL DEFAULT '0',
  `group_xp_distance` float NOT NULL DEFAULT '0',
  `threat_radius` float NOT NULL DEFAULT '0',
  `ghost_run_speed_world` float NOT NULL DEFAULT '0',
  `ghost_run_speed_bg` float NOT NULL DEFAULT '0',
  `rate_war_effort_resource` float NOT NULL DEFAULT '0',
  `transmog_req_money_rate` float NOT NULL DEFAULT '0',
  `ac_movement_cheat_teleport_distance` float NOT NULL DEFAULT '0',
  `ac_movement_cheat_wall_climb_angle` float NOT NULL DEFAULT '0',
  `battleground_reputation_rate_av` float NOT NULL DEFAULT '0',
  `battleground_reputation_rate_ws` float NOT NULL DEFAULT '0',
  `battleground_reputation_rate_ab` float NOT NULL DEFAULT '0',
  `battleground_reputation_rate_sv` float NOT NULL DEFAULT '0',
  `battleground_honor_rate_av` float NOT NULL DEFAULT '0',
  `battleground_honor_rate_ws` float NOT NULL DEFAULT '0',
  `battleground_honor_rate_ab` float NOT NULL DEFAULT '0',
  `battleground_honor_rate_sv` float NOT NULL DEFAULT '0',
  `suspicious_movementspeed_report_threshold` float NOT NULL DEFAULT '0',
  `max_faction_imbalance` float NOT NULL DEFAULT '0',
  `open_world_honor_multiplier` float NOT NULL DEFAULT '0',
  `grid_unload` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `object_health_value_show` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `gms_allow_public_channels` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `gmtickets_enable` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `tag_in_battlegrounds` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `continents_instanciate` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `gm_join_opposite_faction_channels` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `gm_allow_trades` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `die_command_credit` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `terrain_preload_continents` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `terrain_preload_instances` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `cleanup_terrain` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `outdoorpvp_ep_enable` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `outdoorpvp_si_enable` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `mmap_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `player_commands` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `save_respawn_time_immediately` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `allow_two_side_accounts` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `allow_two_side_interaction_chat` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `allow_two_side_interaction_channel` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `allow_two_side_interaction_group` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `allow_two_side_interaction_guild` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `allow_two_side_interaction_trade` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `allow_two_side_interaction_auction` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `allow_two_side_interaction_mail` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `allow_two_side_who_list` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `allow_two_side_add_friend` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `instance_ignore_level` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `instance_ignore_raid` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `cast_unstuck` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `gm_log_trade` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `gm_lower_security` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `always_max_skill_for_level` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `weather` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `event_announce` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `quest_ignore_raid` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `detect_pos_collision` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `restricted_lfg_channel` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `silently_gm_join_to_channel` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `strict_latin_in_general_channels` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `chat_fake_message_preventing` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `addon_channel` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `corpse_empty_loot_show` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `death_corpse_reclaim_delay_pvp` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `death_corpse_reclaim_delay_pve` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `death_bones_world` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `death_bones_bg` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `all_taxi_paths` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `skill_fail_loot_fishing` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `skill_fail_gain_fishing` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `skill_fail_possible_fishingpool` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `battleground_cast_deserter` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `battleground_queue_announcer_start` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `kick_player_on_bad_packet` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `pet_los` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `stats_save_only_on_logout` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `clean_character_db` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `vmap_indoor_check` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `pet_unsummon_at_mount` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `enable_dk` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `enable_movement_extrapolation_player` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `enable_movement_extrapolation_pet` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `whisper_restriction` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `mailspam_item` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `accurate_pvp_equip_requirements` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `accurate_pvp_purchase_requirements` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `accurate_pvp_timeline` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `accurate_pvp_rewards` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `battleground_randomize` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `enable_crossfaction_battlegrounds` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `enable_gear_rating_queue` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `send_loot_roll_upon_reconnect` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `accurate_pets` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `accurate_spell_effects` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `accurate_pve_events` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `accurate_lfg` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `no_respec_price_decay` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `no_quest_xp_to_gold` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `auto_honor_restart` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `restore_deleted_items` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `unlinked_auction_houses` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `prevent_item_datamining` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `transmog_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `static_object_los` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `dual_spec` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `hardcore_disable_duel` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_players_only` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_notify_cheaters` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_log_data` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_reverse_time_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_null_time_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_skipped_heartbeats_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_time_desync_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_num_desyncs_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_speed_hack_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_overspeed_distance_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_overspeed_jump_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_overspeed_jump_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_jump_speed_change_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_jump_speed_change_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_multi_jump_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_multi_jump_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_wall_climb_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_wall_climb_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_unreachable_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fly_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fly_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_no_fall_time_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_no_fall_time_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_teleport_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_teleport_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_tele_to_transport_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_tele_to_transport_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fake_transport_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_water_walk_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_water_walk_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_slow_fall_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_slow_fall_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_hover_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_hover_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fixed_z_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_fixed_z_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_root_move_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_root_move_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_self_root_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_self_root_reject` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_wrong_ack_data_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_pending_ack_delay_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_explore_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_explore_high_level_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_movement_cheat_forbidden_area_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_warden_win_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_warden_osx_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_warden_players_only` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_ban_enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ac_antispam_merge_all_whispers` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `visibility_force_active_objects` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ptr` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `gm_start_on_gm_island` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `item_log_restore_quest_items` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `enforced_english` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `sea_network` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `backup_character_inventory` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `analysis_stop_on_correct_extended_data` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `analysis_do_shared_data_detailed_report` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `analysis_allow_relaxed_ip` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `analysis_log_discord_summary` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `analysis_ping_on_warning` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `analysis_automatic_punihsment` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `suspicious_enable` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `suspicious_movement_enable` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `suspicious_fishing_enable` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `suspicious_npc_killed_enable` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `login_region_queue` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `enable_priority_queue` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `priority_queue_enable_western_priority` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `enable_dynamic_visibilities` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `priority_queue_enable_ip_penalty` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `load_locales` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `enable_faction_balance` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `block_all_hanzi` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `holiday_event` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `performance_enable` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`realm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `hwprint_autobans`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `extendedPrint` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- add new config option by jamey
ALTER TABLE `world_config`
    ADD COLUMN `dynamic_scaling_pop` INT(10) UNSIGNED NOT NULL DEFAULT '0' AFTER `max_item_stack_transferred`;

UPDATE world_config SET group_visibility = 1;





