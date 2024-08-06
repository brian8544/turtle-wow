use crate::modules::{
    armory::{
        domain_value::{CharacterGear, CharacterItem},
        dto::CharacterStat,
    },
    data::{
        tools::{
            RetrieveEnchant, RetrieveGem, RetrieveItem, RetrieveItemEffect, RetrieveItemRandomProperty, RetrieveItemRandomPropertyPoints, RetrieveItemSocket, RetrieveItemStat, RetrieveItemsetEffect, RetrieveItemsetName, RetrieveLocalization,
            RetrieveStatType, SpellDescription,
        },
        Data, Stat,
    },
};

pub fn get_character_stats(data: &Data, language_id: u8, expansion_id: u8, gear: &CharacterGear) -> Vec<CharacterStat> {
    let mut acc = get_item_stats(data, expansion_id, &gear.head, 0);
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.neck, 2));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.shoulder, 1));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.back, 2));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.chest, 0));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.tabard, 0));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.shirt, 0));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.wrist, 2));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.main_hand, 3));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.off_hand, 3));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.ternary_hand, 4));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.glove, 1));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.belt, 1));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.leg, 0));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.boot, 1));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.ring1, 2));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.ring2, 2));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.trinket1, 1));
    merge_character_stat_vec(&mut acc, get_item_stats(data, expansion_id, &gear.trinket2, 1));

    // Stats from set bonus
    let gear_to_vec_item_ids = gear_to_item_id_vec(&gear);
    let mut considered_set_item_ids: Vec<u32> = Vec::new();
    for item_id in gear_to_vec_item_ids {
        if considered_set_item_ids.iter().any(|&id| id == item_id) {
            continue;
        }
        if let Some(item) = data.get_item(expansion_id, item_id) {
            if let Some(itemset_id) = item.itemset {
                let mut itemset_item_ids = data.get_itemset_item_ids(expansion_id, itemset_id).unwrap();
                considered_set_item_ids.append(&mut itemset_item_ids);
                data.get_itemset_effects(expansion_id, itemset_id)
                    .unwrap()
                    .iter()
                    .for_each(|item_effect| merge_character_stat_vec(&mut acc, data.parse_stats(expansion_id, item_effect.spell_id)))
            }
        }
    }

    acc.sort_by(|left, right| left.stat_type.cmp(&right.stat_type));
    acc.iter()
        .map(|stat| CharacterStat {
            stat_type: data.get_localization(language_id, data.get_stat_type(stat.stat_type).unwrap().localization_id).unwrap().content,
            stat_value: stat.stat_value,
        })
        .collect()
}

fn get_item_stats(data: &Data, expansion_id: u8, item: &Option<CharacterItem>, suffix_index: u8) -> Vec<Stat> {
    let mut stats = Vec::new();
    if item.is_none() {
        return stats;
    }
    let item = item.as_ref().unwrap();

    // Item stats from the template
    if let Some(item_stats) = data.get_item_stats(expansion_id, item.item_id) {
        item_stats.iter().for_each(|item_stat| {
            stats.push(item_stat.stat.to_owned());
        });
    }

    if let Some(item_effect_vec) = data.get_item_effect(expansion_id, item.item_id) {
        item_effect_vec.iter().for_each(|item_effect| merge_character_stat_vec(&mut stats, data.parse_stats(expansion_id, item_effect.spell_id)));
    }

    // Stats from enchantments
    if let Some(enchant_id) = item.enchant_id {
        let enchant = data.get_enchant(expansion_id, enchant_id).unwrap();
        merge_character_stat_vec(&mut stats, enchant.stats);
    }

    // Stats from gems
    let mut socket_bonus = true;
    let item_socket = data.get_item_socket(expansion_id, item.item_id);
    for i in 0..item.gem_ids.len() {
        if let Some(gem_id) = item.gem_ids[i] {
            let gem_item = data.get_gem(expansion_id, gem_id).unwrap();
            let enchant = data.get_enchant(expansion_id, gem_item.enchant_id).unwrap();
            merge_character_stat_vec(&mut stats, enchant.stats);
            if let Some(socket_info) = item_socket.as_ref() {
                if i < socket_info.slots.len() {
                    socket_bonus = socket_bonus && socket_info.slots[i] == socket_info.slots[i] & gem_item.flag;
                }
            }
        } else if let Some(socket_info) = item_socket.as_ref() {
            if i < socket_info.slots.len() {
                socket_bonus = false;
            }
        }
    }
    if let Some(socket_info) = item_socket.as_ref() {
        if socket_bonus {
            let enchant = data.get_enchant(expansion_id, socket_info.bonus).unwrap();
            merge_character_stat_vec(&mut stats, enchant.stats);
        }
    }

    // Random item property
    if let Some(random_property_id) = item.random_property_id {
        if random_property_id > 0 {
            let random_stats = data.get_item_random_property(expansion_id, random_property_id).unwrap();
            for enchant_id in random_stats.enchant_ids {
                let enchant = data.get_enchant(expansion_id, enchant_id).unwrap();
                merge_character_stat_vec(&mut stats, enchant.stats);
            }
        } else {
            let random_stats = data.get_item_random_property(expansion_id, random_property_id).unwrap();
            let data_item = data.get_item(expansion_id, item.item_id).unwrap();
            let property_points = data_item.item_level.and_then(|level| data.get_item_random_property_points(expansion_id, level));
            let mut enchant_stats = Vec::new();

            for i in 0..random_stats.enchant_ids.len() {
                let enchant_id = random_stats.enchant_ids[i];
                let enchant = data.get_enchant(expansion_id, enchant_id).unwrap();
                let localization = data.get_localization(1, enchant.localization_id).unwrap().content.to_lowercase();

                // Note: Duplicate code here with item_tooltip
                let coefficient_value = random_stats.scaling_coefficients[i];
                let scaling_factor;
                if data_item.quality == 3 {
                    scaling_factor = property_points.as_ref().unwrap().good[suffix_index as usize];
                } else if data_item.quality == 4 {
                    scaling_factor = property_points.as_ref().unwrap().rare[suffix_index as usize];
                } else if data_item.quality == 5 {
                    scaling_factor = property_points.as_ref().unwrap().epic[suffix_index as usize];
                } else {
                    scaling_factor = 0;
                }
                let stat_value = ((coefficient_value * scaling_factor as u32) as f64 / 10000.0).floor() as u16;

                // Manual parsing for now, lets see if we need it somewhere else soon
                if localization.contains("strength") {
                    enchant_stats.push(Stat { stat_type: 27, stat_value });
                } else if localization.contains("agility") {
                    enchant_stats.push(Stat { stat_type: 28, stat_value });
                } else if localization.contains("stamina") {
                    enchant_stats.push(Stat { stat_type: 29, stat_value });
                } else if localization.contains("intellect") {
                    enchant_stats.push(Stat { stat_type: 30, stat_value });
                } else if localization.contains("spirit") {
                    enchant_stats.push(Stat { stat_type: 31, stat_value });
                } else if localization.contains("block") {
                    enchant_stats.push(Stat { stat_type: 12, stat_value });
                } else if localization.contains("spell critical strike") {
                    enchant_stats.push(Stat { stat_type: 24, stat_value });
                } else if localization.contains("critical strike") {
                    enchant_stats.push(Stat { stat_type: 8, stat_value });
                } else if localization.contains("attack power") {
                    enchant_stats.push(Stat { stat_type: 9, stat_value });
                } else if localization.contains("defense") {
                    enchant_stats.push(Stat { stat_type: 22, stat_value });
                } else if localization.contains("spell damage and healing") {
                    enchant_stats.push(Stat { stat_type: 13, stat_value });
                    enchant_stats.push(Stat { stat_type: 14, stat_value });
                } else if localization.contains("mana") {
                    enchant_stats.push(Stat { stat_type: 21, stat_value });
                } else if localization.contains("health") {
                    enchant_stats.push(Stat { stat_type: 43, stat_value });
                } else if localization.contains("healing") {
                    enchant_stats.push(Stat { stat_type: 14, stat_value });
                } else if localization.contains("spell hit") {
                    enchant_stats.push(Stat { stat_type: 23, stat_value });
                } else if localization.contains("hit") {
                    enchant_stats.push(Stat { stat_type: 8, stat_value });
                } else if localization.contains("resist") {
                    if localization.contains("holy") {
                        enchant_stats.push(Stat { stat_type: 1, stat_value });
                    } else if localization.contains("fire") {
                        enchant_stats.push(Stat { stat_type: 2, stat_value });
                    } else if localization.contains("nature") {
                        enchant_stats.push(Stat { stat_type: 3, stat_value });
                    } else if localization.contains("frost") {
                        enchant_stats.push(Stat { stat_type: 4, stat_value });
                    } else if localization.contains("shadow") {
                        enchant_stats.push(Stat { stat_type: 5, stat_value });
                    } else if localization.contains("arcane") {
                        enchant_stats.push(Stat { stat_type: 6, stat_value });
                    }
                } else if localization.contains("wrath") {
                    if localization.contains("holy") {
                        enchant_stats.push(Stat { stat_type: 15, stat_value });
                    } else if localization.contains("fire") {
                        enchant_stats.push(Stat { stat_type: 16, stat_value });
                    } else if localization.contains("nature") {
                        enchant_stats.push(Stat { stat_type: 17, stat_value });
                    } else if localization.contains("frost") {
                        enchant_stats.push(Stat { stat_type: 18, stat_value });
                    } else if localization.contains("shadow") {
                        enchant_stats.push(Stat { stat_type: 19, stat_value });
                    } else if localization.contains("arcane") {
                        enchant_stats.push(Stat { stat_type: 20, stat_value });
                    }
                }
            }
            merge_character_stat_vec(&mut stats, enchant_stats);
        }
    }

    stats
}

fn merge_character_stat_vec(acc: &mut Vec<Stat>, input: Vec<Stat>) {
    for stat in input {
        let acc_stat = acc.iter_mut().find(|inner_stat| inner_stat.stat_type == stat.stat_type);
        if let Some(acc_stat_val) = acc_stat {
            acc_stat_val.stat_value += stat.stat_value;
        } else {
            acc.push(stat);
        }
    }
}

fn gear_to_item_id_vec(gear: &CharacterGear) -> Vec<u32> {
    let mut item_ids = Vec::new();
    if let Some(item) = &gear.head {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.neck {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.shoulder {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.back {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.chest {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.tabard {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.shirt {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.wrist {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.main_hand {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.off_hand {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.ternary_hand {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.glove {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.belt {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.leg {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.boot {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.ring1 {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.ring2 {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.trinket1 {
        item_ids.push(item.item_id)
    }
    if let Some(item) = &gear.trinket2 {
        item_ids.push(item.item_id)
    }
    item_ids
}
