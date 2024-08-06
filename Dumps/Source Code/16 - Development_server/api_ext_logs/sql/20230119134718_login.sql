-- Add table for banned fingerprints.
DROP TABLE IF EXISTS `fingerprint_banned`;
CREATE TABLE IF NOT EXISTS `fingerprint_banned` (
  `fingerprint` bigint(20) NOT NULL DEFAULT '0' COMMENT 'Fingerprint',
  `bandate` bigint(40) NOT NULL DEFAULT '0',
  `unbandate` bigint(40) NOT NULL DEFAULT '0',
  `bannedby` varchar(50) NOT NULL,
  `banreason` varchar(255) NOT NULL,
  PRIMARY KEY (`fingerprint`,`bandate`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Fingerprint Ban List';
