DELETE FROM `script_texts` WHERE `entry` IN (-1999906, -1999907, -1999908, -1999909, -1999910, -1000293, -1000294, -1000295,
                                            -1000296, -1000297, -1000101, -1000102, -1000103, -1000104, -1000105, -1000582,
                                            -1000583, -1000584, -1000585, -1000586, -1000587, -1000588, -1000847, -1000848,
                                            -1000849, -1999902, -1999903, -1999904, -1999905, -1999915, -1700000, -1700001,
                                            -1700002, -1700003, -1700004, -1700005, -1700006, -1700007, -1700008, -1700009,
                                            -1700010, -1700011, -1700012, -1700013, -1700014, -1700015, -1700016, -1700017,
                                            -1780227, -1780228, -1780229, -1000993, -1000994, -1084001, -1084002, -1084003,
                                            -1084004, -1084005, -1084006, -1084007, -1084008, -1084009, -1000561, -1000562,
                                            -1000563, -1000564, -1000565, -1000571, -1000572, -1000573, -1000574, -1000403,
                                            -1000404, -1000405, -1000406, -1000407, -1000408, -1000409, -1900118, -1900119,
                                            -1900120, -1900121, -1900122, -1900123, -1900124, -1900125, -1900126, -1900127,
                                            -1900128, -1900129, -1900130, -1900131, -1900132, -1900133, -1900134, -1900135,
                                            -1900136, -1900137, -1900138, -1900139, -1900140, -1900141, -1900142, -1900143,
                                            -1900144, -1900145, -1900146, -1900147, -1900148, -1900149, -1900150, -1900151,
                                            -1900152, -1900153, -1900154, -1900155, -1900156, -1900157, -1900158, -1900159,
                                            -1500000, -1500001, -1500002, -1500003, -1500004, -1500005, -1500006, -1500007);

UPDATE `broadcast_text` SET `chat_type` = 1 WHERE `entry` IN (10474, 4613, 3934, 3936, 9648, 9712, 9713, 9714, 9715, 9728, 9655,
                                                              7368, 7366, 7369, 7407, 7358, 7343, 7346, 7344, 7227, 7355, 7357,
                                                              7471, 7400, 277, 278, 89, 90, 91, 92, 93, 276);
UPDATE `broadcast_text` SET `chat_type` = 6, `emote_id1` = 22 WHERE `entry` = 10537;
UPDATE `broadcast_text` SET `emote_id1` = 1 WHERE `entry` IN (1403, 7403);
UPDATE `broadcast_text` SET `emote_id1` = 5 WHERE `entry` IN (1404, 89, 90, 91, 92, 93);
UPDATE `broadcast_text` SET `emote_id1` = 25 WHERE `entry` IN (1402, 6107, 6118);
UPDATE `broadcast_text` SET `emote_id1` = 22 WHERE `entry` = 7397;
UPDATE `broadcast_text` SET `emote_id1` = 11 WHERE `entry` = 7398;
UPDATE `broadcast_text` SET `sound_id` = 8593 WHERE `entry` = 277;


