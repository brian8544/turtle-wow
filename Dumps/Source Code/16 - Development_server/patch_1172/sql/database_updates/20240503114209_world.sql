-- Leyline Investigation
delete from quest_template where entry = 41313;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (0,41313,2,16,50,44,0,0,'Leyline Investigation','This land is rich in magic. Numerous reasons brought me here for my research, and the many ley lines coursing through the earth are one of them. Potent arcane energies pour out of their flowing streams, luring countless mana hungry denizens of this and other worlds to them. I wish to understand more clearly why exactly this forgotten and cursed landscape is home to such a phenomenon. Curiosity escapes your eyes - do you intend to aid me in my endeavors?$B$BOther matters keep me busy in my tower, so if you\'d go out and acquire some reagents for me, you\'d be rewarded for your efforts. What I need are crystallized formations of ley line energy. My students were able to locate two, to the east and south of here. I suspect the resident blue drakes and the depraved blood elves are our best leads. Begin your search there.','Collect the ley line crystals for Archmage Xylem at his tower in Azshara.','Lake Mennar is a focal point of arcane energy, it is not puzzling to see why the Blue Dragonflight congregates at that location. What exactly the blood elves are doing here eludes me, however.','Those appear positively unnatural. Ley line crystals materialize themselves on rare occasions when fleeting ley essence seeps through the earth, but these... Their formation appears different, almost forced, in a sense. Hm, peculiar...$B$B<Archmage Xylem ponders for a bit, while inspecting the crystals further. Suddenly an epiphany strikes him.>$B$B$N, there are many plausible explanations for this. But to confirm my own theory, I need to conduct some tests first. Will you assist me?',41374,1,41375,1,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,31200,5200, 0,0,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values ( 8379, 41313);
replace into creature_involvedrelation  (id, quest) values ( 8379, 41313);
update quest_template set nextquestinchain = 41314	 where entry = 41313;
update quest_template set requiredskill = 755		 where entry = 41313;
update quest_template set requiredskillvalue = 225	 where entry = 41313;
update quest_template set type = 1					 where entry = 41313;

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41374,1659,'Azure Crystal',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'',0,4),
(41375,6006,'Vermillion Crystal',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'',0,4);

REPLACE INTO `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES
( 193, 41374, -40, 0, 1, 1, 0),
(6129, 41374, -40, 0, 1, 1, 0),
(6131, 41374, -40, 0, 1, 1, 0),
(6130, 41374, -40, 0, 1, 1, 0),
(6199, 41375, -20, 0, 1, 1, 0),
(6198, 41375, -20, 0, 1, 1, 0);

-- A Cause Of Concern
delete from quest_template where entry = 41314;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41313,41314,2,16,50,44,0,0,'A Cause Of Concern','Both of these crystals have the identical integral structure, except the vermillion one - when resonating with a little bit of my own magic...$B$B<Xylem channels a miniscule amount of his power into the red crystal and violent sparks and lightning emit from it.>$B$BListen, here are the facts we are working with: The Blue Dragonflight, for some reason we have yet to discover, collects ley line crystals from Lake Mennar whose growth is somehow artificially accelerated. The resident blood elves also possess these crystals, although in a different, more volatile state. Whether these two circumstances are connected is for us to uncover.$B$BI will continue gauging the stability of these crystals, while you retrieve a valuable relic for me, one we will need to complete our research. A former student of mine foolishly thought taking it out of my tower would go unnoticed. Sanath informed me about her hasty departure to the east near Timbermaw Hold, no doubt using her friendly relations with them to hide herself.','Retrieve Xylem\'s Focus Orb from his suspicious student.','Have you had any luck in recovering what I seek?','Regrettable, and concerning. I have to be even more selective in my choice of apprentices in the future. It is baffling that Tharessa acted so recklessly, I did not expect such behaviour from her. Granted, her eagerness was apparent, yet I assumed and hoped it to be rooted in her pursuit of knowledge, not power. Whoever she worked for, I will see to it they will be brought to justice for their actions.$B$BNonetheless, with the focus orb back in my possession, we will finally get to the bottom of this leyline conundrum.',41376,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,27600,4600, 0,0,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values ( 8379, 41314);
replace into creature_involvedrelation  (id, quest) values ( 8379, 41314);
update quest_template set nextquestinchain = 41315	 where entry = 41314;

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41376,15725,'Xylem\'s Focus Orb',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'',0,4);

REPLACE INTO `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES
(61979, 41376, -100, 0, 1, 1, 0);

replace into broadcast_text (entry, Male_Text) values (30179, 'Are you Tharessa? Give me the archmage\'s focus orb and return to the tower.');
replace into npc_text (ID, BroadcastTextID0) values (30179, 30179);

replace into broadcast_text (entry, Male_Text) values (30180, 'That charlatan is a farce, like every mortal sorcerer! The magic of Azeroth belongs to the only ones who are truly able to wield and comprehend it!');
replace into npc_text (ID, BroadcastTextID0) values (30180, 30180);

-- Unveiling The Mystery
delete from quest_template where entry = 41315;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41314,41315,2,16,50,44,0,0,'Unveiling The Mystery','With the focus orb returned, there is but one last thing we must assure ourselves of. Here, take the crystals and the orb and place them on the pedestal in front of my tower. A spell I put on the orb will then react with the ley line crystals and - hopefully - confirm my theory about their nature.$B$BDon\'t be afraid, for I will observe you from within this tower and intervene if necessary. Capable as you are, we shouldn\'t be too worried, but don\'t forget: Caution is a wise man\'s lifeblood.','Conduct the final test and return to Archmage Xylem in Azshara.','The focus orb will ensure the magical energies do not overload the crystals. So do not fear they might explode violently in your immediate vicinity.','Positively outstanding. What we\'ve witnessed proved my suspicions correct: the ley line crystals function as a conduit of energy that, when exposed to concentrated amounts of magic, manifest themselves in arcane monstrosities. If you take a closer look, both crystal remains are identical, meaning the blood elves have altered their own crystal after obtaining it from the Blue Dragonflight - whether they got it by force or cooperation, I am unsure to answer.$B$BThanks to you, my understanding of this land and its inhabitants heightened again. It is concerning, however, to know the Blue Dragonflight is undertaking such suspicious actions. They rarely care for the affairs of mortals, but do not hesitate to halt the abuse of Azeroth\'s magic in an instant. Let us observe and hope for the best outcome for now.$B$BAs for your reward; you are a capable jewelcrafter, correct? Let me show you how to fashion a staff that amplifies the wielder\'s magical abilities, then.',41377,2,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,30000,5000, 0,0,0,0,0,0,0,0, 0,0,0, 70182,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values ( 8379, 41315);
replace into creature_involvedrelation  (id, quest) values ( 8379, 41315);

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41377,2516,'Drained Crystal Remains',12,1,2048,1,-1,-1,1,2,-1,-1,-1,-1,4,'',0,4);

REPLACE INTO `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES
(61980, 41377, -100, 0, 1, 1, 0),
(61981, 41377, -100, 0, 1, 1, 0);

replace INTO `gameobject_template` (`entry`, `type`, `displayId`, `name`, `faction`, `flags`, `size`, `data0`, `data1`, `data2`, `data3`, `data4`, `data5`, `data6`, `data7`, `data8`, `data9`, `data10`, `data11`, `data12`, `data13`, `data14`, `data15`, `data16`, `data17`, `data18`, `data19`, `data20`, `data21`, `data22`, `data23`, `mingold`, `maxgold`, `phase_quest_id`, `script_name`) VALUES
(2020099, 2, 22835, 'Resonating Pedestal', 0, 32, 1.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'go_resonating_pedestal');

replace into broadcast_text (entry, Male_Text) values (30181, 'The pedestal gives off an alluring aura.');
replace into npc_text (ID, BroadcastTextID0) values (30181, 30181);

replace into broadcast_text (entry, Male_Text) values (30182, 'Place the crystals and orb on the pedestal.');
replace into npc_text (ID, BroadcastTextID0) values (30182, 30182);

-- Advanced Jewelcrafting XI: Hard as Diamonds
delete from quest_template where entry = 41316;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (0,41316,2,-371,50,50,0,0,'Advanced Jewelcrafting XI: Hard as Diamonds','<The book has been binded once more, and its formerly empty cover fills magically with a title - Advanced Jewelcrafting XI: Hard as Diamonds. Trying to open it, you feel intense searing pain. A fiery rune appears on the lock sealing the volume. Perhaps a master in jewelcrafting can assist you in deciphering its secrets.>','Bring the book to someone proficient in jewelcrafting.','Oh, a familiar face. Returning for some more training?','This book...! I\'ve heard about it! It\'s the last one in a series of masterfully crafted designs and plans for the most elaborate jewelry one can imagine! This one in particular addresses intricate guides to create extremely powerful trinkets with the diamonds of Azeroth.$B$BNow there is only one question: how do we open this damn thing?',56099,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 56099,1, 0,22500,3750, 0,0,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_involvedrelation  (id, quest) values (61913, 41316);
update quest_template set nextquestinchain = 41317	 where entry = 41316;
update quest_template set requiredskill = 755		 where entry = 41316;
update quest_template set requiredskillvalue = 300	 where entry = 41316;

update item_template set start_quest = 41316 where entry = 56099;

-- The Rune of Blaz
delete from quest_template where entry = 41317;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41316,41317,2,-371,60,50,0,0,'The Rune of Blaz','I\'ve been researching this legendary encyclopedia of jewelcrafting most of my life. It is rumored they are remnants of an ancient society, the progenitors of the human race we know today. Archeologists are finding more and more of their ruins - they are called the Azotha. So far only five of their tomes have been found, with eleven rumored to exist. An acquaintance of mine, equally as ancient, actually opened one - and told me of it. He said the books are sealed using elemental runes, the ancient words uttered by the elementals of Azeroth. I\'ve been looking into them ever since and the fiery rune on this lock here appears to be the Rune of Blaz.$B$BWe need a fragment of an elemental that has attuned itself to that rune. I hear the deepest caverns of the Blackrock Mountain, the Molten Core, are filled with blazing elementals. I believe we have the highest chance to find what we need there.','Obtain a fragment on an elemental attuned to the Rune of Blaz from the Molten Core for Fanzy Sparkspring in Steamwheedle Port.','Seriously, I cannot wait to get my hands on the sweet, sweet plans inside of this book!','Ouch, that thing is hot! Must\'ve been real tough to get, luckily you\'re on the tougher side of life, eh? Now then, let\'s not wait any longer and crack this beauty open!$B$B<Fanzy moves the shard over the heavy lock and with a sizzling heat emanating from it, it cracks open, before falling into the sands. Enthusiastically, Fanzy immediately starts flipping throught the tome.>$B$BEmpty. Empty. Empty. Empty! Everything is empty except two pages! I can\'t believe this! Is this some kind of sick joke?!',41378,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,54250,7750, 0,0,0,0,0,0,0,0, 0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values (61913, 41317);
replace into creature_involvedrelation  (id, quest) values (61913, 41317);
update quest_template set nextquestinchain = 41318	 where entry = 41317;
update quest_template set type = 62					 where entry = 41317;

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41378,6555,'Glimmering Shard',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'',0,4);

REPLACE INTO `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES
(12057, 41378, -100, 0, 1, 1, 0);

-- Mastercrafted Diamond Crown
delete from quest_template where entry = 41318;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41317,41318,2,-371,60,50,0,0,'Mastercrafted Diamond Crown','Okay, we got to roll with the punches. Let\'s work with this page first and see what\'s written here... ‘To illuminate the scripture, present to me the hearts of earth and fire. Extracted heat will unveil the knowledge that you seek.” These Azotha sure love their riddles. I can only guess, but I believe this is a similar situation to what we had before. We can only unlock this grimoire\'s secret if we have the appropriate materials present.$B$BHearts of earth and fire... this must surely mean the fiery and lava cores of powerful elememals. Extracted heat... perhaps the essence of fire? Yes, this must be it!$B$B$N, you know what to do. I\'ll be waiting here for you to bring the needed materials and try to wrap my head around this ‘extraordinary\' book.','Deliver the materials to Fanzy Sparkspring in Steamwheedle Port.','Don\'t underestimate my gnomish intellect. I\'ll crack the code in no time!','You got the stuff? Great, now then, how about we test this theory of ours?$B$B<Fanzy opens the page of the book and holds it high above her head. When brought near the empty page, the cores and essences liquify and transfer themselves to the parchment - ultimately forming sentences, completing the instruction for this piece of jewelry.>$B$BWOW! Now that was absolutely amazing. Scrap what I said about this book, this is pretty nifty, I have to admit. Incredible, come here, let us scour this page together, we wouldn\'t have come this far without your dedication!',17011,8,17010,8,7078,20,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,34500,5750, 0,0,0,0,0,0,0,0, 0,0,0, 70175,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values (61913, 41318);
replace into creature_involvedrelation  (id, quest) values (61913, 41318);

-- Mastercrafted Diamond Bangles
delete from quest_template where entry = 41319;
replace into quest_template (prevquestid, entry, method, zoneorsort, questlevel, minlevel, questflags, specialflags, title, details, objectives, requestitemstext, offerrewardtext, reqitemid1, reqitemcount1, reqitemid2, reqitemcount2, reqitemid3, reqitemcount3, reqitemid4, reqitemcount4, reqcreatureorgoid1, reqcreatureorgocount1, reqcreatureorgoid2, reqcreatureorgocount2, reqcreatureorgoid3, reqcreatureorgocount3, reqcreatureorgoid4, reqcreatureorgocount4, srcitemid, srcitemcount, reworreqmoney, RewMoneyMaxLevel, rewxp, rewrepfaction1, rewrepvalue1,  rewrepfaction2, rewrepvalue2, rewrepfaction3, rewrepvalue3, rewrepfaction4, rewrepvalue4, rewspell, rewspellcast, completeemote, rewitemid1, rewitemcount1, rewitemid2, rewitemcount2, rewitemid3, rewitemcount3, rewitemid4, rewitemcount4, rewchoiceitemid1, rewchoiceitemcount1, rewchoiceitemid2, rewchoiceitemcount2, rewchoiceitemid3, rewchoiceitemcount3, rewchoiceitemid4, rewchoiceitemcount4,requiredminrepfaction,requiredminrepvalue,objectivetext1) values (41317,41319,2,-371,60,50,0,0,'Mastercrafted Diamond Bangles','The more I read - or rather DON\'T read - the more I believe all the mystery about these tomes was just a ploy by some sniveling goblin trying to make a quick buck. Two measly pages have something written on it, and on this one is even just one sentence! ‘Channel the sun through crystallized blood.\' What is that even supposed to... Wait! I got an epiphany!$B$B<Fanzy is rummaging through her belongings and pulls out a blueprint.>$B$BThese are the plans for a jewelry lens I never came to create. It\'s designed to bundle light into a highly potent ray used to carve into metal. It requires very specific ingredients - which is where you come into play. The \'crystallized blood\' must mean the highly elusive Blood of the Mountain, found deep within the Blackrock. I also need a framing for the lenses, Fineous Darkvire in the Blackrock Depths is known to possess a lens durable to even the strongest heat of the mountain. Bring me both and I can tinker a tool to decipher the page with!','Fanzy Sparkspring at Steamwheedle Port requires Blood of the Mountain and the Dark Iron Prospecting Lens from Fineous Darkvire for creation.','The lenses I originally envisioned for this amplifier were not cut out to withstand the intense heat. But with the blood of the mountain and the dark iron casing, we might have a good chance at succeeding.','Excellent work. Just getting your hands on one of these gems is a feat in itself, I can\'t imagine how much effort you poured into getting three! Okay, hand all the things over, I\'m in the mood to create a MASTERPIECE!$B$B<Fanzy snatches the materials and hastily moves her tiny hands. After a few minutes, she holds the delicate lens into the sunlight, directly in front of the empty page. Surprisingly, instead of burning it, the focused beam of light creates elaborate sentences on the formerly clear paper.>$B$BEUREKA! A complete success! Time to harvest the fruits of our labor! Come here, let\'s read together!',11382,3,41379,1,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0, 0,34500,5750, 0,0,0,0,0,0,0,0, 0,0,0, 70223,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,'');

replace into creature_questrelation		(id, quest) values (61913, 41319);
replace into creature_involvedrelation  (id, quest) values (61913, 41319);

replace into item_template (entry, display_id, name, class, quality, flags, buy_count, allowable_class, allowable_race, item_level, stackable, spellcooldown_1, spellcategorycooldown_1, spellcooldown_2, spellcategorycooldown_2, bonding, description, page_text, material) values
(41379,7268,'Dark Iron Prospecting Lens',12,1,2048,1,-1,-1,1,1,-1,-1,-1,-1,4,'',0,3);

REPLACE INTO `creature_loot_template` (`entry`, `item`, `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `maxcount`, `condition_id`) VALUES
(9056, 41379, -100, 0, 1, 1, 0);
