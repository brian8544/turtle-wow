-- Fix item DisplayID ~Torta
UPDATE item_template SET display_id = 50161 WHERE entry = 65007;

-- Added loot to Hateforge mobs ~Shang
REPLACE INTO creature_loot_template VALUES
( 60717, 84010, 0.085, 1, 0, 1, 0),
( 60718, 84010, 0.085, 1, 0, 1, 0),
( 60719, 84010, 0.085, 1, 0, 1, 0),
( 60720, 84010, 0.085, 1, 0, 1, 0),
( 60721, 84010, 0.085, 1, 0, 1, 0),
( 60722, 84010, 0.085, 1, 0, 1, 0),
( 60723, 84010, 0.085, 1, 0, 1, 0),
( 60724, 84010, 0.085, 1, 0, 1, 0),
( 60725, 84010, 0.085, 1, 0, 1, 0),
( 60717, 84011, 0.085, 2, 0, 1, 0),
( 60718, 84011, 0.085, 2, 0, 1, 0),
( 60719, 84011, 0.085, 2, 0, 1, 0),
( 60720, 84011, 0.085, 2, 0, 1, 0),
( 60721, 84011, 0.085, 2, 0, 1, 0),
( 60722, 84011, 0.085, 2, 0, 1, 0),
( 60723, 84011, 0.085, 2, 0, 1, 0),
( 60724, 84011, 0.085, 2, 0, 1, 0),
( 60725, 84011, 0.085, 2, 0, 1, 0),
( 60717, 84012, 0.0025, 3, 0, 1, 0),
( 60718, 84012, 0.0025, 3, 0, 1, 0),
( 60719, 84012, 0.0025, 3, 0, 1, 0),
( 60720, 84012, 0.0025, 3, 0, 1, 0),
( 60721, 84012, 0.0025, 3, 0, 1, 0),
( 60722, 84012, 0.0025, 3, 0, 1, 0),
( 60723, 84012, 0.0025, 3, 0, 1, 0),
( 60724, 84012, 0.0025, 3, 0, 1, 0),
( 60725, 84012, 0.0025, 3, 0, 1, 0),
( 60717, 84013, 0.085, 4, 0, 1, 0),
( 60718, 84013, 0.085, 4, 0, 1, 0),
( 60719, 84013, 0.085, 4, 0, 1, 0),
( 60720, 84013, 0.085, 4, 0, 1, 0),
( 60721, 84013, 0.085, 4, 0, 1, 0),
( 60722, 84013, 0.085, 4, 0, 1, 0),
( 60723, 84013, 0.085, 4, 0, 1, 0),
( 60724, 84013, 0.085, 4, 0, 1, 0),
( 60725, 84013, 0.085, 4, 0, 1, 0),
( 60717, 84014, 0.085, 5, 0, 1, 0),
( 60718, 84014, 0.085, 5, 0, 1, 0),
( 60719, 84014, 0.085, 5, 0, 1, 0),
( 60720, 84014, 0.085, 5, 0, 1, 0),
( 60721, 84014, 0.085, 5, 0, 1, 0),
( 60722, 84014, 0.085, 5, 0, 1, 0),
( 60723, 84014, 0.085, 5, 0, 1, 0),
( 60724, 84014, 0.085, 5, 0, 1, 0),
( 60725, 84014, 0.085, 5, 0, 1, 0),
( 60717, 84015, 0.085, 6, 0, 1, 0),
( 60718, 84015, 0.085, 6, 0, 1, 0),
( 60719, 84015, 0.085, 6, 0, 1, 0),
( 60720, 84015, 0.085, 6, 0, 1, 0),
( 60721, 84015, 0.085, 6, 0, 1, 0),
( 60722, 84015, 0.085, 6, 0, 1, 0),
( 60723, 84015, 0.085, 6, 0, 1, 0),
( 60724, 84015, 0.085, 6, 0, 1, 0),
( 60725, 84015, 0.085, 6, 0, 1, 0);
-- 84011, 84013, 84014, 84015