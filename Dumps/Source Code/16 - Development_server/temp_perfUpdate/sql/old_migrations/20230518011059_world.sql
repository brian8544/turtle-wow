-- fixes for fixes kms
update item_template set name = 'Ansirem\'s Runeweaver', subclass = 9, display_id = 61112 where entry = 61264; -- Ansirem's Runeweaver
update item_template set name = 'Fist of the Forgotten Order', subclass = 5, display_id = 36714 where entry = 61277; -- Cleaver of the Forgotten Order
update item_template set spelltrigger_2 = 1 where entry = 61246; -- Sabatons of the Endless March
update item_template set spellid_1 = 13669 where entry = 61299; -- Shawl of the Castellan
update item_template set required_level = 60 where entry = 61276; -- Hyperchromatic Deflector
update item_template set block = 53 where entry = 61238; -- Scaleshield of Emerald Flight
update item_template set block = 53 where entry = 65103; -- Shell of the Great Sleeper
-- ITS HAPPENING
update item_template set stat_value1 = 18, spellid_3 = 15807, spelltrigger_3 = 1, spellid_2 = 15464 where entry = 12640; -- LIONHEART HELM
-- Cloudkeeper Buff
update item_template set spellcooldown_1 = 600000 where entry = 14554; -- Cloudkeeper Legplates
-- Polearms now req less lvl
update item_template set required_level = 17 where entry = 5200; -- Impaling Harpoon
update item_template set required_level = 16 where entry = 1406; -- Pearl-encrusted Spear
-- Feral AP for lower level items
update item_template set spellid_1 = 45429 where entry = 8345; -- Wolfshead Helm
update item_template set spellid_2 = 45429, spelltrigger_2 = 1 where entry = 18531; -- Unyielding Maul
update item_template set spellid_2 = 45430, spelltrigger_2 = 1 where entry = 18420; -- Bonecrusher
update item_template set spellid_2 = 45430, spelltrigger_2 = 1 where entry = 20696; -- Crystal Spiked Maul
update item_template set spellid_2 = 45432, spelltrigger_2 = 1 where entry = 83440; -- Boneshatter Maul
update item_template set spellid_2 = 45432, spelltrigger_2 = 1 where entry = 22348; -- Doomulus Prime
update item_template set spellid_1 = 45432, spelltrigger_1 = 1 where entry = 19944; -- Nat Pagle's Fish Terminator
update item_template set spellid_2 = 45433, spelltrigger_2 = 1 where entry = 61044; -- Gavel of Aqir Superiority
update item_template set spellid_1 = 45440, spelltrigger_1 = 1 where entry = 19357; -- Herald of Woe
update item_template set spellid_2 = 45448, spelltrigger_2 = 1 where entry = 22988; -- The End of Dreams
update item_template set spellid_2 = 26153, spelltrigger_2 = 1 where entry = 19358; -- Draconic Maul
update item_template set spellid_1 = 45440, spelltrigger_1 = 1 where entry = 20580; -- Hammer of Bestial Fury
update item_template set spellid_2 = 45440, spelltrigger_1 = 2 where entry = 18803; -- Finkle's Lava Dredger

-- more items
replace into item_template (entry, name, description, class, subclass, material, quality, display_id, bonding, required_level, max_count, allowable_class, allowable_race, buy_price, sell_price, inventory_type, sheath, flags, extra_flags, buy_count, stackable, container_slots, dmg_min1, dmg_max1, delay, dmg_type1, ammo_type, max_durability, armor, block, bag_family, item_level, range_mod, disenchant_id, holy_res, fire_res, nature_res, frost_res, shadow_res, arcane_res, stat_type1, stat_value1, stat_type2, stat_value2, stat_type3, stat_value3, random_property, required_reputation_faction, required_reputation_rank) values (61449, 'Searhide Bracers', '', 4, 2, 8, 3, 66445, 1, 60, 0, -1, -1, 78565, 19641, 6, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 35, 106, 0, 0, 68, 0, 49, 0, 0, 0, 0, 0, 0, 3, 11, 4, 10, 7, 11, 0, 0, 0);
replace into item_template (entry, name, description, class, subclass, material, quality, display_id, bonding, required_level, max_count, allowable_class, allowable_race, buy_price, sell_price, inventory_type, sheath, flags, extra_flags, buy_count, stackable, container_slots, dmg_min1, dmg_max1, delay, dmg_type1, ammo_type, max_durability, armor, block, bag_family, item_level, range_mod, disenchant_id, holy_res, fire_res, nature_res, frost_res, shadow_res, arcane_res, spellid_1, spelltrigger_1, spellcharges_1, spellppmrate_1, spellcooldown_1, spellcategory_1, spellcategorycooldown_1, spellid_2, spelltrigger_2, spellcharges_2, spellppmrate_2, spellcooldown_2, spellcategory_2, spellcategorycooldown_2, random_property, required_reputation_faction, required_reputation_rank) values (61450, 'The Mind\'s Key', 'An unlocked mind opens many other doors.', 4, 0, 1, 3, 22185, 1, 60, 1, -1, -1, 295511, 73877, 12, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 68, 0, 49, 0, 0, 0, 0, 0, 0, 23727, 1, 0, 0, -1, 0, -1, 18049, 1, 0, 0, -1, 0, -1, 0, 0, 0);
replace into item_template (entry, name, description, class, subclass, material, quality, display_id, bonding, required_level, max_count, allowable_class, allowable_race, buy_price, sell_price, inventory_type, sheath, flags, extra_flags, buy_count, stackable, container_slots, dmg_min1, dmg_max1, delay, dmg_type1, ammo_type, max_durability, armor, block, bag_family, item_level, range_mod, disenchant_id, holy_res, fire_res, nature_res, frost_res, shadow_res, arcane_res, spellid_1, spelltrigger_1, spellcharges_1, spellppmrate_1, spellcooldown_1, spellcategory_1, spellcategorycooldown_1, spellid_2, spelltrigger_2, spellcharges_2, spellppmrate_2, spellcooldown_2, spellcategory_2, spellcategorycooldown_2, random_property, required_reputation_faction, required_reputation_rank) values (61451, 'Sliver of Hope', '', 4, 0, 1, 3, 26771, 1, 60, 1, -1, -1, 295893, 73973, 12, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 68, 0, 49, 0, 0, 0, 0, 0, 0, 17371, 1, 0, 0, -1, 0, -1, 21364, 1, 0, 0, -1, 0, -1, 0, 0, 0);
replace into item_template (entry, name, description, class, subclass, material, quality, display_id, bonding, required_level, max_count, allowable_class, allowable_race, buy_price, sell_price, inventory_type, sheath, flags, extra_flags, buy_count, stackable, container_slots, dmg_min1, dmg_max1, delay, dmg_type1, ammo_type, max_durability, armor, block, bag_family, item_level, range_mod, disenchant_id, holy_res, fire_res, nature_res, frost_res, shadow_res, arcane_res, spellid_1, spelltrigger_1, spellcharges_1, spellppmrate_1, spellcooldown_1, spellcategory_1, spellcategorycooldown_1, spellid_2, spelltrigger_2, spellcharges_2, spellppmrate_2, spellcooldown_2, spellcategory_2, spellcategorycooldown_2, random_property, required_reputation_faction, required_reputation_rank) values (61452, 'Skycleaver', '', 2, 0, 1, 3, 40035, 1, 60, 1, -1, -1, 298763, 74690, 13, 3, 0, 0, 1, 1, 0, 71, 135, 2300, 0, 0, 90, 0, 0, 0, 68, 0, 49, 0, 0, 0, 0, 0, 0, 7597, 1, 0, 0, -1, 0, -1, 13679, 1, 0, 0, 0, 0, 0, 0, 0, 0);
replace into item_template (entry, name, description, class, subclass, material, quality, display_id, bonding, required_level, max_count, allowable_class, allowable_race, buy_price, sell_price, inventory_type, sheath, flags, extra_flags, buy_count, stackable, container_slots, dmg_min1, dmg_max1, delay, dmg_type1, ammo_type, max_durability, armor, block, bag_family, item_level, range_mod, disenchant_id, holy_res, fire_res, nature_res, frost_res, shadow_res, arcane_res, stat_type1, stat_value1, stat_type2, stat_value2, spellid_1, spelltrigger_1, spellcharges_1, spellppmrate_1, spellcooldown_1, spellcategory_1, spellcategorycooldown_1, random_property, required_reputation_faction, required_reputation_rank) values (61453, 'Anastarian\'s Legacy', '', 2, 7, 1, 4, 36958, 1, 60, 1, -1, -1, 461116, 115279, 13, 3, 0, 0, 1, 1, 0, 57, 104, 1500, 0, 0, 105, 0, 0, 0, 72, 0, 65, 0, 0, 0, 0, 0, 0, 3, 16, 7, 16, 7524, 1, 0, 0, -1, 0, -1, 0, 0, 0);
replace into item_template (entry, name, description, class, subclass, material, quality, display_id, bonding, required_level, max_count, allowable_class, allowable_race, buy_price, sell_price, inventory_type, sheath, flags, extra_flags, buy_count, stackable, container_slots, dmg_min1, dmg_max1, delay, dmg_type1, ammo_type, max_durability, armor, block, bag_family, item_level, range_mod, disenchant_id, holy_res, fire_res, nature_res, frost_res, shadow_res, arcane_res, stat_type1, stat_value1, stat_type2, stat_value2, spellid_1, spelltrigger_1, spellcharges_1, spellppmrate_1, spellcooldown_1, spellcategory_1, spellcategorycooldown_1, spellid_2, spelltrigger_2, spellcharges_2, spellppmrate_2, spellcooldown_2, spellcategory_2, spellcategorycooldown_2, random_property, required_reputation_faction, required_reputation_rank) values (61454, 'Rod of Resuscitation', 'Add Extra Healing spell to spellid_3 when added: Bonus Healing: If your target is below 50% health, your direct healing spells will cause your target to be healed for an additional 80 to 100 health.', 2, 10, 1, 4, 37195, 1, 60, 0, -1, -1, 591515, 147878, 17, 1, 0, 0, 1, 1, 0, 151, 246, 3400, 0, 0, 120, 0, 0, 0, 72, 0, 65, 0, 0, 0, 0, 0, 0, 5, 25, 7, 25, 18046, 1, 0, 0, -1, 0, -1, 21632, 1, 0, 0, -1, 0, -1, 0, 0, 0);
replace into item_template (entry, name, description, class, subclass, material, quality, display_id, bonding, required_level, max_count, allowable_class, allowable_race, buy_price, sell_price, inventory_type, sheath, flags, extra_flags, buy_count, stackable, container_slots, dmg_min1, dmg_max1, delay, dmg_type1, ammo_type, max_durability, armor, block, bag_family, item_level, range_mod, disenchant_id, holy_res, fire_res, nature_res, frost_res, shadow_res, arcane_res, random_property, required_reputation_faction, required_reputation_rank) values (61455, 'Idol of the Emerald Rot', 'Add to spellid_1 when added: 20% per combo point to deal 90-140 Nature damage when using a finisher move.', 4, 8, 1, 4, 31150, 1, 60, 0, -1, -1, 171611, 42902, 28, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 0, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0);



