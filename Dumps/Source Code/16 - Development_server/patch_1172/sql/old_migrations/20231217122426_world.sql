-- Ashcovered Letter
delete from quest_template where entry = 41203;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41154,41203,2,-81,2,2,0,0,'Ashcovered Letter','While you were getting your hands dirty, I got this letter from Rustgate Ridge. It\'s from Mayten Boomrifle, he\'s instructing the especially triggerhappy around here. You can get to Rustgate Ridge just to the east of here, up the hill. Follow the road and you\'ll find it. Take the letter and talk to him once you have the time. Hah, what am I saying - as if you\'d ever have time. Now get back to work!','Bring the Ashcovered Letter to Grizzie the Enforcer at Rustgate Ridge just up the hill to the east.','Hey, buddy! Still slogging through the coal pits?','Good to have you here. To be frank, I saw your physique when you came through here on your arrival - and watching you work in the pits showed me how durable you really are. If you need some tips and tricks on how to make life here easier, toss me a few coins. Will be worth your money, I\'ll assure you.',41137,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 41137,1, 0,240,40, 1001,50,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values (61737, 41203);
replace into creature_involvedrelation  (id, quest) values (80104, 41203);
update quest_template set requiredraces = 256		 where entry = 41203;
update quest_template set requiredclasses = 1		 where entry = 41203;

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41137,3022,'Ashcovered Letter',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'50679',0,7);

REPLACE INTO `page_text` (`entry`, `text`, `next_page`) VALUES
(50679, '$n, I\'ve seen how you handle your weapon and I must say - you show potential.$B$BWith a bit of training, we should be able to rough you up into a workable shape! Who knows, maybe you\'ll become a bruiser in the end, or even one of those adventurous types running around all of Azeroth. Whatever it will be, with enough money I can give you a nice headstart for your future career.$B$BGizzie the Enforcer, Warrior Trainer.', 0);

-- Glyphcovered Letter
delete from quest_template where entry = 41204;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41154,41204,2,-161,2,2,0,0,'Glyphcovered Letter','While you were getting your hands dirty, I got this letter from Rustgate Ridge. It\'s from Mayten Boomrifle, he\'s instructing the especially triggerhappy around here. You can get to Rustgate Ridge just to the east of here, up the hill. Follow the road and you\'ll find it. Take the letter and talk to him once you have the time. Hah, what am I saying - as if you\'d ever have time. Now get back to work!','Bring the Glyphcovered Letter to Wizette Icewhistle at Rustgate Ridge just up to the hill to the east.','Well, hello! Fancy seeing you here.','Some say mastering the arcane takes years and years of disciplined studies. Nay I say! The simple tricks are the ones that bring you the most money. Shimmy over with some silver and soon you can get your own steady income by selling conjured water to poor fools that need it!',41138,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 41138,1, 0,240,40, 1001,50,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values (61737, 41204);
replace into creature_involvedrelation  (id, quest) values (80108, 41204);
update quest_template set requiredraces = 256		 where entry = 41204;
update quest_template set requiredclasses = 128		 where entry = 41204;

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41138,3022,'Glyphcovered Letter',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'50680',0,7);

REPLACE INTO `page_text` (`entry`, `text`, `next_page`) VALUES
(50680, '$n, news goes around Rustgate Ridge that some big shot prodigy mage blasts their way through the coalpits.$B$BArcane power is cool and all that, but unrefined abilities won\'t bring you any gold. And it will make us look like amateurs too in turn. Should you ever desire to hone your magical skills to something more profitable, give me a holler up in Rustgate\'s Tower. Don\'t forget to bring some coin, my dear!$B$BWizette Icewhistle, Mage Trainer.', 0);

-- Mudcovered Letter
delete from quest_template where entry = 41205;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41154,41205,2,-261,2,2,0,0,'Mudcovered Letter','While you were getting your hands dirty, I got this letter from Rustgate Ridge. It\'s from Mayten Boomrifle, he\'s instructing the especially triggerhappy around here. You can get to Rustgate Ridge just to the east of here, up the hill. Follow the road and you\'ll find it. Take the letter and talk to him once you have the time. Hah, what am I saying - as if you\'d ever have time. Now get back to work!','Bring the Mudcovered Letter to Mayten Boomrifle at Rustgate Ridge.','Oh! That\'s a nice boomstick you got there.','I see you share my love for guns. They\'re beautiful, aren\'t they? Incredible tool for all sorts of fun activities - besides punching holes in your enemies. I\'m willing to share some nifty shots and such if you are willing to share some of your coin. Giving and taking around here, you know?',41139,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 41139,1, 0,240,40, 1001,50,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values (61737, 41205);
replace into creature_involvedrelation  (id, quest) values (80105, 41205);
update quest_template set requiredraces = 256		 where entry = 41205;
update quest_template set requiredclasses = 4		 where entry = 41205;

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41139,3022,'Mudcovered Letter',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'50681',0,7);

REPLACE INTO `page_text` (`entry`, `text`, `next_page`) VALUES
(50681, '$n, I heard the beautiful BOOMS coming down from the coalpits. Figured it must be you, the others had pitiful booms, quite boring, too.$B$BInterested in learning how to make even bigger booms with different kinds of tricks and shots? I can teach you a few things to help you against the wildlife around here, and who knows, maybe you\'ll have your own pet one day! Just holler at me and I\'ll cover everything you need.$B$BMayten Boomrifle, Hunter Trainer.', 0);

-- Black Letter
delete from quest_template where entry = 41206;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41154,41206,2,-162,2,2,0,0,'Black Letter','While you were getting your hands dirty, I got this letter from Rustgate Ridge. It\'s from Mayten Boomrifle, he\'s instructing the especially triggerhappy around here. You can get to Rustgate Ridge just to the east of here, up the hill. Follow the road and you\'ll find it. Take the letter and talk to him once you have the time. Hah, what am I saying - as if you\'d ever have time. Now get back to work!','Bring the Black Letter to Leyli Quicktongue at Rustgate Ridge.','Psst, no need to make unnecessary noise.','What\'s one main goal in life? Helping the innocent? Achieving peace and ending tragedies? Pah, ridiculous! One\'s life goal should be prosperity! Riches! Cold hard gold! Pass some of that money over and you\'ll learn how to alleviate the rich in no time.',41140,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 41140,1, 0,240,40, 1001,50,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values (61737, 41206);
replace into creature_involvedrelation  (id, quest) values (80106, 41206);
update quest_template set requiredraces = 256		 where entry = 41206;
update quest_template set requiredclasses = 8		 where entry = 41206;

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41140,3022,'Mudcovered Letter',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'50682',0,7);

REPLACE INTO `page_text` (`entry`, `text`, `next_page`) VALUES
(50682, '$n, rumours spread of a particularly agile goblin doing menial tasks in the coalpits. If you ask me, you\'re destined for more.$B$BA rogue has many abilities that suit us goblins - our subtlety, nimble fingers and general willingness to overlook morals are perfect requisites. If you are interested in catching a few new tricks on how to get money, then I\'ll be happy to oblige - with the right payment, ofcourse.$B$BLeyli Quicktongue, Rogue Trainer.', 0);

-- Singed Letter
delete from quest_template where entry = 41207;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41154,41207,2,-61,2,2,0,0,'Singed Letter','While you were getting your hands dirty, I got this letter from Rustgate Ridge. It\'s from Mayten Boomrifle, he\'s instructing the especially triggerhappy around here. You can get to Rustgate Ridge just to the east of here, up the hill. Follow the road and you\'ll find it. Take the letter and talk to him once you have the time. Hah, what am I saying - as if you\'d ever have time. Now get back to work!','Bring the Singed Letter to Amri Demondeal at Rustgate Ridge.','Hehehe, hello, fellow initiate!','I see the gleam in your eyes, eager for some more powerful spells? Ofcourse you are, the powerful are automatically the most rich around here. Just look at Rustgate and his tower. Living proof! Toss me some coin and I will help you on your journey to whatever you wish to be.',41141,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 41141,1, 0,240,40, 1001,50,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values (61737, 41207);
replace into creature_involvedrelation  (id, quest) values (80107, 41207);
update quest_template set requiredraces = 256		 where entry = 41207;
update quest_template set requiredclasses = 256		 where entry = 41207;

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41141,3022,'Singed Letter',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'50683',0,7);

REPLACE INTO `page_text` (`entry`, `text`, `next_page`) VALUES
(50683, '$n, the shadows have a certain allure, don\'t they? I\'ve seen you flinging bolts left and right and you seem to be a promising individual!$B$BIn this world, the unassuming are the ones with the most advantages. Use that, and power and gold will be in your lap faster than you can blink. Show me how eager you are to learn more about what a warlock is capable of by paying me and in turn I\'ll instruct you in the arts of demonology.$B$BAmri Demondeal, Warlock Trainer.', 0);

-- A Lesson To Take To Heart
delete from quest_template where entry = 41208;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (0,41208,2,-61,2,2,0,0,'A Lesson To Take To Heart','Oh hey, coming back I see? Ready to learn more? Your progress is astounding, and I\'d reckon you might be capable of your first summoning spell. However, before I teach you, care to do me a favor? You help me, I help you. Easy concept, really.$B$BDown south along the bay are makrura, some more hostile than the others. Not many know, but their hearts possess great strengths for how simple they are. The more aggressive they are, the more potency their hearts offer.$B$BBring me six of their beating hearts and you will soon be able to summon your own personal minion.','Return with 6 Beating Makrura Hearts to Amri Demondeal at Rustgate Ridge.','Be quick, they don\'t beat for long!','Oho! You can literally feel and hear their energy. $n, I am keeping my promise. Listen well, and execute properly. Even summoning an imp can be difficult at first. You\'ll get the hang of it in no time, I am sure.',41142,6,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,1440,240, 1001,100,0,0,0,0,0,0, 688,7763,1, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values (80107, 41208);
replace into creature_involvedrelation  (id, quest) values (80107, 41208);
update quest_template set requiredraces = 256		 where entry = 41208;
update quest_template set requiredclasses = 256		 where entry = 41208;

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41142,3422,'Beating Makrura Heart',12,1,2048,1,-1,-1,1,6,-1,-1,-1,-1,4,'',0,3);

replace into creature_loot_template values
(61679,41142,-60,0,1,1,0),
(61678,41142,-40,0,1,1,0);