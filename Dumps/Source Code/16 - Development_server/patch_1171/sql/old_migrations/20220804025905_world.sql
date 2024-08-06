-- Add missing Bubbly Fissure spawns.
SET @GUID = 21121;
INSERT INTO `gameobject` (`guid`, `id`, `map`, `position_x`, `position_y`, `position_z`, `orientation`, `rotation0`, `rotation1`, `rotation2`, `rotation3`, `spawntimesecsmin`, `spawntimesecsmax`, `animprogress`, `state`) VALUES
(@GUID+1, 177524, 0, -10168.7, 2389.03, -139.214, 0.453785, 0, 0, 0.224951, 0.97437, 900, 900, 100, 1),
(@GUID+2, 177524, 1, -2131.99, 3370.51, -68.7632, 0, 0, 0, 0, 1, 900, 900, 100, 1),
(@GUID+3, 177524, 1, -1985.92, 3374.38, -80.1733, 0, 0, 0, 0, 1, 900, 900, 100, 1),
(@GUID+4, 177524, 1, -1944, 3222.99, -69.3751, 4.08407, 0, 0, -0.891006, 0.453991, 900, 900, 100, 1),
(@GUID+5, 177524, 1, -1876.68, 3378.85, -70.1771, 0, 0, 0, 0, 1, 900, 900, 100, 1),
(@GUID+6, 177524, 1, -1829.4, 3280.41, -68.2534, 1.58825, 0, 0, 0.71325, 0.70091, 900, 900, 100, 1),
(@GUID+7, 180057, 1, -1040.2, -2078.98, 50.5769, 3.13277, -0.13007, 0.0567751, 0.989808, 0.0117644, 900, 900, 100, 1),
(@GUID+8, 177524, 1, -711.781, 3090.01, -31.6782, 5.09636, 0, 0, -0.559193, 0.829038, 900, 900, 100, 1),
(@GUID+9, 177524, 1, -588.114, 2858.04, -38.5369, 0.628317, 0, 0, 0.309016, 0.951057, 900, 900, 100, 1),
(@GUID+10, 177524, 1, -498.033, 2739.48, -30.6666, 5.53269, 0, 0, -0.366501, 0.930418, 900, 900, 100, 1),
(@GUID+11, 177524, 1, -147.745, 2589.38, -48.1679, 5.58505, 0, 0, -0.34202, 0.939693, 900, 900, 100, 1),
(@GUID+12, 177524, 1, -76.6455, 2685.81, -99.1043, 1.88495, 0, 0, 0.809016, 0.587786, 900, 900, 100, 1),
(@GUID+13, 177524, 1, -22.3517, 2831.51, -34.2596, 5.48033, 0, 0, -0.390731, 0.920505, 900, 900, 100, 1),
(@GUID+14, 177524, 1, 55.2842, 2842.69, -83.0677, 2.53072, 0, 0, 0.953716, 0.300708, 900, 900, 100, 1),
(@GUID+15, 177524, 1, 78.8569, 2616.05, -83.6589, 4.95674, 0, 0, -0.615661, 0.788011, 900, 900, 100, 1),
(@GUID+16, 177524, 1, 161.034, 2742.56, -71.4729, 3.57793, 0, 0, -0.976295, 0.216442, 900, 900, 100, 1),
(@GUID+17, 177524, 0, 840.744, 2208.33, -136.858, 3.4034, 0, 0, -0.991445, 0.130528, 900, 900, 100, 1),
(@GUID+18, 177524, 1, 7675.39, -2659.36, 406.346, 1.01229, 0, 0, 0.484809, 0.87462, 900, 900, 100, 1),
(@GUID+19, 177524, 1, 7697.36, -2569.16, 400.31, 5.51524, 0, 0, -0.374606, 0.927184, 900, 900, 100, 1);
DELETE FROM `gameobject` WHERE `guid` = 3996085; -- Custom Entry
