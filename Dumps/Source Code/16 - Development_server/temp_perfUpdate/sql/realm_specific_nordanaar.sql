UPDATE `quest_cast_objective` SET `spell_id` = 21343, `player_guid` = 688152, `player_class` = 0, `objective_text` = 'Throw snowball at Akalix' WHERE `entry` = 50321 AND `idx` = 0;
UPDATE `quest_cast_objective` SET `spell_id` = 21343, `player_guid` = 605121, `player_class` = 0, `objective_text` = 'Throw snowball at Shockwarden' WHERE `entry` = 50321 AND `idx` = 1;
UPDATE `quest_cast_objective` SET `spell_id` = 21343, `player_guid` = 346800, `player_class` = 0, `objective_text` = 'Throw snowball at Dated' WHERE `entry` = 50321 AND `idx` = 2;
UPDATE `quest_cast_objective` SET `spell_id` = 21343, `player_guid` = 391543, `player_class` = 0, `objective_text` = 'Throw snowball at Vrograg' WHERE `entry` = 50321 AND `idx` = 3;

DELETE FROM `quest_cast_objective` WHERE `player_guid` = 346800;
UPDATE `quest_template` SET `ReqCreatureOrGOId3` = 0, `ReqCreatureOrGOCount3` = 0 WHERE `entry` = 50321;

