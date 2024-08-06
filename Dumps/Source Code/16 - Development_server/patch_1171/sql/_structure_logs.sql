DROP TABLE IF EXISTS `character_loot`;
CREATE TABLE `character_loot` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`date_time` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	`receiver_name` VARCHAR(20) NOT NULL COLLATE 'utf8_unicode_520_ci',
	`receiver_guid` INT(11) UNSIGNED NOT NULL DEFAULT '0',
	`receiver_account_id` INT(11) UNSIGNED NOT NULL DEFAULT '0',
	`receiver_ip` VARCHAR(16) NOT NULL DEFAULT '0.0.0.0' COLLATE 'utf8mb4_general_ci',
	`source_type` ENUM('Creature','GameObject','Item') NOT NULL COLLATE 'utf8_unicode_520_ci',
	`source_guid` INT(11) UNSIGNED NOT NULL DEFAULT '0',
	`source_entry` INT(11) UNSIGNED NOT NULL DEFAULT '0',
	`money` INT(11) UNSIGNED NOT NULL DEFAULT '0',
	`item_entry` INT(11) UNSIGNED NOT NULL DEFAULT '0',
	`item_count` INT(11) UNSIGNED NOT NULL DEFAULT '0',
	`loot_type` ENUM('Kill','Roll','Profession','Container') NOT NULL COLLATE 'utf8_unicode_520_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `receiver_guid` (`receiver_guid`) USING BTREE,
	INDEX `source_entry` (`source_entry`) USING BTREE,
	INDEX `item_entry` (`item_entry`) USING BTREE,
	FULLTEXT INDEX `receiver_name` (`receiver_name`)
)
COLLATE='utf8_unicode_520_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;

