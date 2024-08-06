-- Advanced Gemology I
delete from quest_template where entry = 41333;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (0,41333,2,-371,50,50,0,0,'Advanced Gemology I','<The book you are holding in your hands is slim, yet surprisingly heavy. Upon inspecting its pages, you realize most of its contents are beyond your comprehension. Perhaps someone else, a master of this craft could assist you with the tome.>','Bring the book about gemology to an ancient master of that specialization.','<Thegren\'s stony expression appears to turn joyful upon seeing you.>','<Thegren is examining the book with great interest. After a while he nods, places the book on the table and turns to you. Instinctively, you kneel, before feeling the rough texture of his skin. In a surge of knowledge, the instructions of cutting an elaborate ruby gemstone manifest inside your mind.>',41333,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,22500,3750, 0,0,0,0,0,0,0,0, 0,0,0, 70160,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

update item_template set start_quest = 41333 where entry = 56110;
replace into creature_involvedrelation  (id, quest) values (73102, 41333);
update quest_template set requiredskill = 755		 where entry = 41333;
update quest_template set requiredskillvalue = 300	 where entry = 41333;

-- Advanced Gemology II
delete from quest_template where entry = 41334;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (0,41334,2,-371,50,50,0,0,'Advanced Gemology II','<The book you are holding in your hands is slim, yet surprisingly heavy. Upon inspecting its pages, you realize most of its contents are beyond your comprehension. Perhaps someone else, a master of this craft could assist you with the tome.>','Bring the book about gemology to an ancient master of that specialization.','<Thegren\'s stony expression appears to turn joyful upon seeing you.>','<Thegren is examining the book with great interest. After a while he nods, places the book on the table and turns to you. Instinctively, you kneel, before feeling the rough texture of his skin. In a surge of knowledge, the instructions of refining an imperial topaz manifest inside your mind.>',56111,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,22500,3750, 0,0,0,0,0,0,0,0, 0,0,0, 70166,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

update item_template set start_quest = 41334 where entry = 56111;
replace into creature_involvedrelation  (id, quest) values (73102, 41334);
update quest_template set requiredskill = 755		 where entry = 41334;
update quest_template set requiredskillvalue = 300	 where entry = 41334;

-- Advanced Goldsmithing I
delete from quest_template where entry = 41335;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (0,41335,2,-371,50,50,0,0,'Advanced Goldsmithing I','<The book you are holding in your hands is slim, yet surprisingly heavy. Upon inspecting its pages, you realize most of its contents are beyond your comprehension. Perhaps someone else, a master of this craft could assist you with the tome.>','Bring the book about gemology to an ancient master of that specialization.','Oh, $N! A pleasure to see you again. Tell me, has time been treating you well?','A peculiar tome, I have to admit. It bears an ancient sigil, one I am not familiar with. Most interesting... Either way, deciphering this book should pose no hindrance to me. Please, give me a moment and I will share what knowledge I can unlock from its pages.',56109,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,22500,3750, 0,0,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

update item_template set start_quest = 41335 where entry = 56109;
replace into creature_involvedrelation  (id, quest) values (73101, 41335);
update quest_template set nextquestinchain = 41336	 where entry = 41335;
update quest_template set requiredskill = 755		 where entry = 41335;
update quest_template set requiredskillvalue = 300	 where entry = 41335;

-- An Unseen Obstacle
delete from quest_template where entry = 41336;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41335,41336,2,-371,58,50,0,0,'An Unseen Obstacle','Hm, how strange. This sentence here... It is missing a rune, and without it, I cannot decipher this passage. It seems we\'ve come to a halt. Don\'t think I am giving up now, however. Something as simple as a missing rune is nothing I am intimidated by.$B$B<The Artificer grabs a small tool from his table, which appears to be a miniscule staff, and moves it along the sentences inside the book. After a short contemplation, he faces you once more.>$B$BI know where to acquire the lost rune. As this grimoire is magical in nature, so is its scripture. The rune we seek can be replaced with a substitute of similar effect, one we can find in the shadowed hall of Scholomance. A harrowing place, so I heard, but their vile studies offer a solution to our problem. Retrieve a rune with this form from one of their necromantic tutors and return with it to me.','Collect a substitute rune from the Scholomance for The Artificer in Desolace.','Don\'t worry. Runes express their power depending on the context they are used in. It won\'t cause the book to summon any ghastly fiends, friend.','Back in Eldre\'thalas, we studied countless, now long forgotten runes in our arcane sanctums under the order of Queen Azshara. Many of these I have forgotten over time, while others out of shame. Nonetheless, it seems my knowledge from that bygone era allowed us to gain new wisdom - wisdom you may use at your own discretion. Here, listen closely. It is time for a new lesson, pupil.',41386,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,37800,5400, 0,0,0,0,0,0,0,0, 0,0,0, 70211,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values (73101, 41336);
replace into creature_involvedrelation  (id, quest) values (73101, 41336);
update quest_template set type = 81					 where entry = 41336;
update quest_template set requiredskill = 755		 where entry = 41336;
update quest_template set requiredskillvalue = 300	 where entry = 41336;

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41386,7248,'Rune of Ferh',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'',0,4);

REPLACE INTO `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES
(10505, 41386, -100, 0, 1, 1, 0);

-- Advanced Goldsmithing II
delete from quest_template where entry = 41337;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (0,41337,2,-371,50,50,0,0,'Advanced Goldsmithing II','<The book you are holding in your hands is slim, yet surprisingly heavy. Upon inspecting its pages, you realize most of its contents are beyond your comprehension. Perhaps someone else, a master of this craft could assist you with the tome.>','Bring the book about gemology to an ancient master of that specialization.','Oh, $N! A pleasure to see you again. Tell me, has time been treating you well?','A peculiar tome, I have to admit. It bears an ancient sigil, one I am not familiar with. Most interesting... Either way, deciphering this book should pose no hindrance to me. Please, give me a moment and I will share what knowledge I can unlock from its pages.',56108,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,22500,3750, 0,0,0,0,0,0,0,0, 0,0,0, 70177,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

update item_template set start_quest = 41337 where entry = 56108;
replace into creature_involvedrelation  (id, quest) values (73101, 41337);
update quest_template set requiredskill = 755		 where entry = 41337;
update quest_template set requiredskillvalue = 300	 where entry = 41337;