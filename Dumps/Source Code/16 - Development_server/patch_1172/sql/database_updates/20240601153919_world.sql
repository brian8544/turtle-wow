-- Remove Item IDs 18741, 18742, 18744, 18743, 18745 from NPC IDs 91930, 91924, 91919, 91918, 91915,  91914, 91926, 91932, 91925, 91923, 91922, 91913, 91912, 91911, 91910.
delete from creature_loot_template where item = 18741 and entry in (91930, 91924, 91919, 91918, 91915,  91914, 91926, 91932, 91925, 91923, 91922, 91913, 91912, 91911, 91910);
delete from creature_loot_template where item = 18742 and entry in (91930, 91924, 91919, 91918, 91915,  91914, 91926, 91932, 91925, 91923, 91922, 91913, 91912, 91911, 91910);
delete from creature_loot_template where item = 18743 and entry in (91930, 91924, 91919, 91918, 91915,  91914, 91926, 91932, 91925, 91923, 91922, 91913, 91912, 91911, 91910);
delete from creature_loot_template where item = 18744 and entry in (91930, 91924, 91919, 91918, 91915,  91914, 91926, 91932, 91925, 91923, 91922, 91913, 91912, 91911, 91910);
delete from creature_loot_template where item = 18745 and entry in (91930, 91924, 91919, 91918, 91915,  91914, 91926, 91932, 91925, 91923, 91922, 91913, 91912, 91911, 91910);

-- Make the quest Altar of an Ancient Evil (41345) a repeatable quest!
update quest_template set specialflags = 1 where entry = 41345;

-- Add the book 'Ramblings of Ol\' Gazeno' (display ID 2616) and have it be buyable from Rinwosho the Trader (14921) at Revered reputation of the Zandalar Tribe (faction ID 270)
REPLACE INTO `conditions` (`condition_entry`, `type`, `value1`, `value2`, `value3`, `value4`, `flags`) VALUES (149210, 5, 270, 6, 0, 0, 0);
REPLACE INTO `npc_vendor` (`entry`, `item`, `maxcount`, `incrtime`, `itemflags`, `condition_id`) VALUES (14921, 41400, 0, 0, 0, 149210);
-- Item Ramblings of Ol' Gazeno:
REPLACE INTO `item_template` (`entry`, `class`, `subclass`, `name`, `description`, `display_id`, `quality`, `flags`, `buy_count`, `buy_price`, `sell_price`, `inventory_type`, `allowable_class`, `allowable_race`, `item_level`, `required_level`, `required_skill`, `required_skill_rank`, `required_spell`, `required_honor_rank`, `required_city_rank`, `required_reputation_faction`, `required_reputation_rank`, `max_count`, `stackable`, `container_slots`, `stat_type1`, `stat_value1`, `stat_type2`, `stat_value2`, `stat_type3`, `stat_value3`, `stat_type4`, `stat_value4`, `stat_type5`, `stat_value5`, `stat_type6`, `stat_value6`, `stat_type7`, `stat_value7`, `stat_type8`, `stat_value8`, `stat_type9`, `stat_value9`, `stat_type10`, `stat_value10`, `delay`, `range_mod`, `ammo_type`, `dmg_min1`, `dmg_max1`, `dmg_type1`, `dmg_min2`, `dmg_max2`, `dmg_type2`, `dmg_min3`, `dmg_max3`, `dmg_type3`, `dmg_min4`, `dmg_max4`, `dmg_type4`, `dmg_min5`, `dmg_max5`, `dmg_type5`, `block`, `armor`, `holy_res`, `fire_res`, `nature_res`, `frost_res`, `shadow_res`, `arcane_res`, `spellid_1`, `spelltrigger_1`, `spellcharges_1`, `spellppmrate_1`, `spellcooldown_1`, `spellcategory_1`, `spellcategorycooldown_1`, `spellid_2`, `spelltrigger_2`, `spellcharges_2`, `spellppmrate_2`, `spellcooldown_2`, `spellcategory_2`, `spellcategorycooldown_2`, `spellid_3`, `spelltrigger_3`, `spellcharges_3`, `spellppmrate_3`, `spellcooldown_3`, `spellcategory_3`, `spellcategorycooldown_3`, `spellid_4`, `spelltrigger_4`, `spellcharges_4`, `spellppmrate_4`, `spellcooldown_4`, `spellcategory_4`, `spellcategorycooldown_4`, `spellid_5`, `spelltrigger_5`, `spellcharges_5`, `spellppmrate_5`, `spellcooldown_5`, `spellcategory_5`, `spellcategorycooldown_5`, `bonding`, `page_text`, `page_language`, `page_material`, `start_quest`, `lock_id`, `material`, `sheath`, `random_property`, `set_id`, `max_durability`, `area_bound`, `map_bound`, `duration`, `bag_family`, `disenchant_id`, `food_type`, `min_money_loot`, `max_money_loot`, `wrapped_gift`, `extra_flags`, `other_team_entry`, `script_name`) VALUES
(41400, 15, 0, 'Ramblings of Ol\' Gazeno', '', 2616, 1, 0, 1, 0, 0, 0, -1, -1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0, 0, 0, -1, 0, -1, 0, 0, 0, 0, -1, 0, -1, 0, 0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 1, 50713, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, NULL);
update item_template set required_reputation_rank = 6, required_reputation_faction = 270, buy_price = 50000, sell_price = 12500 where entry = 41400;

REPLACE INTO `page_text` (`entry`, `text`, `next_page`) VALUES
(50713, 'De waves do be whisperin\' to me. Ever since we be sailin\' from Zuldazar, my mind be restless. He calls for me. To have me return de idol, mon. Lure him out o\' de depths again. De idol must be restored.', 50714),
(50714, 'Our journey be over soon, we be settling on Yojamba Isle in Stranglethorn. De Loa Hakkar, Bloodgod and Faceless One, be disrupting de balance and threatens all trolls. Rastakhan be sending us here, to purge de remaining Atal\'ai from de face of Azeroth.', 50715),
(50715, 'I be knowing where to find de top and bottom pieces of the great Cla\'ckora\'s idol. He who be divine, de great Abyss Loa! His reverence be showering me once I be offerin\' him sacrifices worthy of his presence! I be ascending as his avatar and become more powerful than even de Prophet Zul!', 50716),
(50716, 'Tomorrow we be bringin\' de first prisoner to questionin\'. I volunteered, be I hopin\' he knows about Kelem\'bo and I be gettin\' information out o\' him.', 50717),
(50717, 'He be knowing! He be knowing! Kelem\'bo had been fleein\' to Zul\'gurub, but he be eaten by de hydra Gahz\'ranka as punishment for his cowardice!', 50718),
(50718, 'Kelem\'bo, Mizunta, Ghante. Now me be knowing all locations of de idol pieces. Foolish trolls, incurrin\' the wrath of de Abyssal Pincer and thinkin\' they be safe from his mighty claws. I be gettin\' Kelem\'bo\'s piece when de chaos at Zul\'gurub is gone, but for de others...', 50719),
(50719, 'Mizunta fled high north, wantin\' do hide by de Drakkari. Pathetic, de depths be whisperin\': she be dead on an icy island, not reachin\' her goal. Ghante went to Farraki, became respected among their chieftain. He be settling on an island east of Tanaris, de idol piece must be there.', 50720),
(50720, 'I be feeling it! De loa\'s power calls for me, its lure is pullin\' me to de depths, where I  be findin\' his idol. Oh, Cla\'ckora, I be buildin\' an altar worthy of you, almighty loa, just like you showed me! On da coast of de land named after de accursed queen! Your brilliance be shining brighter than she ever did! Even greater than de arrogant king Rastakhan!!!', 0);