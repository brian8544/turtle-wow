DELETE FROM character_spell INNER JOIN `characters` ON `characters`.guid = `character_spell`.guid WHERE `characters`.class != 3 AND `character_spell`.spell IN(1515, 883, 2641);


