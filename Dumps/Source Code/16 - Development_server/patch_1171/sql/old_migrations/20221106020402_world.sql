DELETE FROM `spell_chain` WHERE `spell_id` = 45553;

-- Fixes https://github.com/slowtorta/turtlewow-bug-tracker/issues/2403

UPDATE `item_template` SET `spellcharges_1` = -1 WHERE `entry` = 83503;

-- Fixes https://github.com/slowtorta/turtlewow-bug-tracker/issues/1998

DELETE FROM gameobject WHERE id = 175606;
INSERT INTO gameobject (guid, id, map, position_x, position_y, position_z, orientation, rotation0, rotation1, rotation2, rotation3, spawntimesecsmin, spawntimesecsmax, animprogress, state) VALUES
(22031,175606,229,-100.23,-529.537,-5.77381,0.436332,0,0,-0.216439,0.976296,250,250,0,1),
(22032,175606,229,-100.325,-523.847,10.7029,2.11185,0,0,0.870356,0.492423,250,250,0,1),
(22033,175606,229,-101.886,-521.985,-7.84199,0.0349063,0,0,-0.0174523,0.999848,250,250,0,1),
(29194,175606,229,-102.465,-575.651,9.90089,2.47837,0,0,0.945519,0.325567,250,250,0,1),
(29204,175606,229,-112.21,-569.506,10.1992,2.18166,0,0,0.88701,0.461749,250,250,0,1),
(29659,175606,229,-125.229,-576.664,13.7726,0.296705,0,0,-0.147809,0.989016,250,250,0,1),
(29805,175606,229,-126.746,-514.164,-12.147,3.10665,0,0,0.999847,0.0174704,250,250,0,1),
(31986,175606,229,-129.514,-441.7,24.4328,0.977383,0,0,0.469471,0.882948,250,250,0,1),
(31987,175606,229,-131.57,-439.602,22.8934,1.13446,0,0,-0.537298,0.843393,250,250,0,1),
(35461,175606,229,-131.805,-526.784,6.55651,2.28638,0,0,-0.909961,0.414694,250,250,0,1),
(35475,175606,229,-132.261,-474.848,9.82244,2.82743,0,0,-0.987688,0.156436,250,250,0,1),
(35789,175606,229,-132.404,-514.961,-15.9374,1.79769,0,0,-0.782608,0.622514,250,250,0,1),
(35791,175606,229,-138.894,-439.497,24.8088,1.76278,0,0,0.771624,0.636079,250,250,0,1),
(35796,175606,229,-139.153,-434.738,23.1123,2.74016,0,0,-0.979924,0.199371,250,250,0,1),
(35835,175606,229,-144.505,-441.603,23.1016,0.331611,0,0,0.165047,0.986286,250,250,0,1),
(35836,175606,229,-146.907,-441.463,22.4744,0.802851,0,0,-0.390731,0.920505,250,250,0,1),
(35837,175606,229,-147.881,-448.549,20.0911,1.32645,0,0,0.615661,0.788011,250,250,0,1),
(35838,175606,229,-150.104,-470.008,16.2278,1.76278,0,0,0.771624,0.636079,250,250,0,1),
(35839,175606,229,-153.788,-515.227,-15.9504,0.95993,0,0,-0.461748,0.887011,250,250,0,1),
(35840,175606,229,-154.378,-552.234,9.91885,2.05949,0,0,-0.857168,0.515037,250,250,0,1),
(35841,175606,229,-154.592,-525.219,8.16182,2.04204,0,0,0.852641,0.522496,250,250,0,1),
(35842,175606,229,-154.77,-541.317,9.02217,0.104719,0,0,-0.0523356,0.99863,250,250,0,1),
(35843,175606,229,-154.889,-570.339,10.0172,2.47837,0,0,0.945519,0.325567,250,250,0,1),
(35844,175606,229,-120.877,-523.056,11.1618,1.17555,0,0,0.554509,0.832178,250,250,0,1);

