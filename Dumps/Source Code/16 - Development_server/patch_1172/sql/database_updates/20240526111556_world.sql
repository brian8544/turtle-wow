-- Altar of an Ancient Evil
delete from quest_template where entry = 41345;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (0,41345,0,16,58,58,0,0,'Altar of an Ancient Evil','','','The rudimentary altar emits a primal and unsettling aura. The troll lying next to it may be a grim indication of what powers it may hold. Still, it seems one could present some offerings on its rough surface...','The seas rumble and a wave of dread washes over Azshara. Something emerges from the ocean!',56088,1,7070,10,13757,5,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into gameobject_questrelation		(id, quest) values (2020105, 41345);
replace into gameobject_involvedrelation	(id, quest) values (2020105, 41345);
update quest_template set requiredskill = 356		 where entry = 41345;
update quest_template set requiredskillvalue = 300	 where entry = 41345;

replace INTO `gameobject_template` (`entry`, `type`, `displayId`, `name`, `faction`, `flags`, `size`, `data0`, `data1`, `data2`, `data3`, `data4`, `data5`, `data6`, `data7`, `data8`, `data9`, `data10`, `data11`, `data12`, `data13`, `data14`, `data15`, `data16`, `data17`, `data18`, `data19`, `data20`, `data21`, `data22`, `data23`, `mingold`, `maxgold`, `phase_quest_id`, `script_name`) VALUES
(2020105, 2, 402, 'Altar of Cla\'ckora', 0, 32, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'go_altar_of_clackora');

-- A Mossy Mystery
delete from quest_template where entry = 41346;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (0,41346,0,5121,58,58,0,0,'A Mossy Mystery','','','This old chest blends into the interior of the cave almost seamlessly. The letter ‘G\' is engraved atop the lock. Next to it, a tattered book, or rather what is left of it. Quickly glancing over it, you surmise this chest belonged to someone who lived here on the island. The last readable entry says something about getting some fish for today\'s meal.','The chest opens and a wet odor escapes it. Inside you find some rusted trinkets - and a surprisingly immaculate piece of something broken. Picking it up, you feel a sense of danger coming from it. Harrowing.',56087,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0, 56085,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into gameobject_questrelation		(id, quest) values (2020106, 41346);
replace into gameobject_involvedrelation	(id, quest) values (2020106, 41346);
update quest_template set requiredskill = 356		 where entry = 41346;
update quest_template set requiredskillvalue = 300	 where entry = 41346;

replace INTO `gameobject_template` (`entry`, `type`, `displayId`, `name`, `faction`, `flags`, `size`, `data0`, `data1`, `data2`, `data3`, `data4`, `data5`, `data6`, `data7`, `data8`, `data9`, `data10`, `data11`, `data12`, `data13`, `data14`, `data15`, `data16`, `data17`, `data18`, `data19`, `data20`, `data21`, `data22`, `data23`, `mingold`, `maxgold`, `phase_quest_id`, `script_name`) VALUES
(2020106, 2, 402, 'Mosscovered Chest', 0, 32, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '');

replace into `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (15114, 56084, 20, 10, 1, 1, 0);

replace into `fishing_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (5121, 56087, 4, 1, 1, 1, 0);
replace into `fishing_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES (5024, 56086, 4, 1, 1, 1, 0);