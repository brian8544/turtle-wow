-- Delete duplicate Astranaar Sentinel
DELETE FROM `creature` WHERE `guid`=33410;

-- Pathing for Astranaar Sentinel Entry: 6087
SET @NPC := 33413;
UPDATE `creature` SET `position_x`=2645.7234,`position_y`=-442.4761,`position_z`=107.194725 WHERE `guid`=@NPC;
DELETE FROM `creature_movement` WHERE `id`=@NPC;
INSERT INTO `creature_movement` (`id`,`point`,`position_x`,`position_y`,`position_z`,`orientation`,`waittime`,`wander_distance`,`script_id`) VALUES
(@NPC,1,2645.7234,-442.4761,107.194725,100,0,0,0),
(@NPC,2,2658.7644,-434.1358,107.194725,100,0,0,0),
(@NPC,3,2684.7383,-415.6828,107.21438,100,0,0,0),
(@NPC,4,2705.6597,-394.95422,107.214386,100,0,0,0),
(@NPC,5,2721.69,-379.51324,107.214386,100,0,0,0),
(@NPC,6,2736.5925,-365.57443,107.214386,100,0,0,0),
(@NPC,7,2749.4338,-349.57028,107.214386,100,0,0,0),
(@NPC,8,2767.6445,-329.04007,107.21438,100,0,0,0),
(@NPC,9,2782.6555,-312.45688,107.21438,100,0,0,0),
(@NPC,10,2791.0723,-298.3219,107.21438,100,0,0,0),
(@NPC,11,2798.0388,-287.2158,107.21438,100,0,0,0),
(@NPC,12,2805.2146,-274.97836,107.190025,100,0,0,0),
(@NPC,13,2798.0388,-287.2158,107.21438,100,0,0,0),
(@NPC,14,2791.0723,-298.3219,107.21438,100,0,0,0),
(@NPC,15,2782.6555,-312.45688,107.21438,100,0,0,0),
(@NPC,16,2767.6445,-329.04007,107.21438,100,0,0,0),
(@NPC,17,2749.4338,-349.57028,107.214386,100,0,0,0),
(@NPC,18,2736.5925,-365.57443,107.214386,100,0,0,0),
(@NPC,19,2721.69,-379.51324,107.214386,100,0,0,0),
(@NPC,20,2705.6597,-394.95422,107.214386,100,0,0,0),
(@NPC,21,2684.7383,-415.6828,107.21438,100,0,0,0),
(@NPC,22,2658.7644,-434.1358,107.194725,100,0,0,0);
-- .go xyz 2645.7234 -442.4761 107.194725

-- Pathing for Astranaar Sentinel Entry: 6087
SET @NPC := 33470;
UPDATE `creature` SET `movement_type`=2 WHERE `guid`=@NPC;
INSERT INTO `creature_movement` (`id`,`point`,`position_x`,`position_y`,`position_z`,`orientation`,`waittime`,`wander_distance`,`script_id`) VALUES
(@NPC,1,2823.7024,-296.85733,107.84359,100,0,0,0),
(@NPC,2,2821.8506,-289.82333,107.53719,100,0,0,0),
(@NPC,3,2817.993,-286.45898,107.315025,100,0,0,0),
(@NPC,4,2810.1743,-283.33398,107.315025,100,0,0,0),
(@NPC,5,2803.291,-282.6996,107.190025,100,0,0,0),
(@NPC,6,2799.5122,-287.38785,107.21438,100,0,0,0),
(@NPC,7,2796.3928,-291.52942,107.21438,100,0,0,0),
(@NPC,8,2793.6445,-296.2667,107.21438,100,0,0,0),
(@NPC,9,2791.0938,-302.96487,107.21438,100,0,0,0),
(@NPC,10,2785.3215,-313.17014,107.21438,100,0,0,0),
(@NPC,11,2780.1306,-321.05685,107.1426,100,0,0,0),
(@NPC,12,2774.8816,-327.74765,107.21438,100,0,0,0),
(@NPC,13,2769.8115,-333.0998,107.21438,100,0,0,0),
(@NPC,14,2763.125,-339.6059,107.214386,100,0,0,0),
(@NPC,15,2760.0176,-346.51062,107.339386,100,0,0,0),
(@NPC,16,2761.8682,-355.02643,108.214386,100,0,0,0),
(@NPC,17,2767.5347,-367.2466,108.80243,100,0,0,0),
(@NPC,18,2771.2917,-377.81268,107.758606,100,0,0,0),
(@NPC,19,2771.5457,-383.1066,108.13666,100,0,0,0),
(@NPC,20,2768.631,-389.2321,108.996765,100,0,0,0),
(@NPC,21,2765.227,-397.44858,111.38155,100,0,0,0),
(@NPC,22,2757.5203,-414.58624,111.50181,100,0,0,0),
(@NPC,23,2750.6567,-433.05362,111.50181,100,0,0,0),
(@NPC,24,2749.1055,-440.9328,111.50181,100,0,0,0),
(@NPC,25,2746.1392,-450.5363,111.30181,100,0,0,0),
(@NPC,26,2738.044,-463.1001,108.16593,100,0,0,0),
(@NPC,27,2729.2544,-469.0395,107.79058,100,0,0,0),
(@NPC,28,2718.493,-471.28397,108.55401,100,0,0,0),
(@NPC,29,2711.4038,-471.69873,108.91924,100,0,0,0),
(@NPC,30,2702.9114,-467.1467,108.803764,100,0,0,0),
(@NPC,31,2702.2424,-460.72217,108.797646,100,0,0,0),
(@NPC,32,2702.4402,-447.1789,108.52177,100,0,0,0),
(@NPC,33,2698.6252,-433.9829,108.45462,100,0,0,0),
(@NPC,34,2689.544,-420.3718,107.47146,100,0,0,0),
(@NPC,35,2678.1943,-408.132,107.14358,100,0,0,0),
(@NPC,36,2668.6748,-399.03287,108.292854,100,0,0,0),
(@NPC,37,2659.2148,-394.34335,108.46484,100,0,0,0),
(@NPC,38,2646.2434,-387.60773,105.83447,100,0,0,0),
(@NPC,39,2655.3237,-392.3471,108.075806,100,0,0,0),
(@NPC,40,2658.9094,-394.25815,108.49133,100,0,0,0),
(@NPC,41,2666.898,-398.4877,108.34632,100,0,0,0),
(@NPC,42,2674.0522,-404.0911,107.515526,100,0,0,0),
(@NPC,43,2678.0898,-408.00937,107.15603,100,0,0,0),
(@NPC,44,2691.4788,-413.30206,107.21438,100,0,0,0),
(@NPC,45,2699.847,-404.61526,107.21438,100,0,0,0),
(@NPC,46,2707.3774,-396.97864,107.214386,100,0,0,0),
(@NPC,47,2716.3293,-389.54385,107.214386,100,0,0,0),
(@NPC,48,2723.576,-382.50485,107.214386,100,0,0,0),
(@NPC,49,2730.319,-376.26825,107.214386,100,0,0,0),
(@NPC,50,2737.1714,-367.54065,107.214386,100,0,0,0),
(@NPC,51,2744.9607,-359.17148,107.214386,100,0,0,0),
(@NPC,52,2755.6228,-347.09854,107.214386,100,0,0,0),
(@NPC,53,2763.2327,-338.7212,107.214386,100,0,0,0),
(@NPC,54,2772.483,-330.12537,107.21438,100,0,0,0),
(@NPC,55,2782.3674,-319.08865,107.21438,100,0,0,0),
(@NPC,56,2793.6628,-309.5094,108.095116,100,0,0,0),
(@NPC,57,2796.8376,-308.63672,108.38404,100,0,0,0),
(@NPC,58,2809.383,-307.43652,109.23097,100,0,0,0),
(@NPC,59,2816.944,-306.3248,108.84589,100,0,0,0),
(@NPC,60,2822.346,-302.97867,108.20392,100,0,0,0);
-- .go xyz 2823.7024 -296.85733 107.84359

