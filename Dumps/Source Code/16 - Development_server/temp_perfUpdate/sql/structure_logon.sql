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


/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
