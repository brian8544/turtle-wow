use std::collections::HashMap;
use std::sync::RwLock;

use language::material::Dictionary;

use crate::modules::data::{
    domain_value::{
        DispelType, Enchant, Expansion, Gem, HeroClass, HeroClassTalent, Icon, Item, ItemBonding, ItemClass, ItemDamage, ItemDamageType, ItemEffect, ItemInventoryType, ItemQuality, ItemRandomProperty, ItemRandomPropertyPoints, ItemsetEffect,
        ItemsetName, ItemSheath, ItemSocket, ItemStat, Language, Localization, NPC, PowerType, Profession, Race, Server, Spell, SpellEffect, Stat, StatType, Title,
    },
    language::init::Init as DictionaryInit,
};
use crate::modules::data::domain_value::{Addon, Difficulty, Encounter, EncounterNpc, Map};
use crate::util::database::*;

#[derive(Debug)]
pub struct Data {
    pub dictionary: Dictionary,
    pub expansions: HashMap<u8, Expansion>,
    pub languages: HashMap<u8, Language>,
    pub localization: Vec<HashMap<u32, Localization>>,
    pub races: HashMap<u8, Race>,
    pub professions: HashMap<u16, Profession>,
    pub servers: RwLock<HashMap<u32, Server>>,
    pub hero_classes: HashMap<u8, HeroClass>,
    pub spells: Vec<HashMap<u32, Spell>>,
    pub dispel_types: HashMap<u8, DispelType>,
    pub power_types: HashMap<u8, PowerType>,
    pub stat_types: HashMap<u8, StatType>,
    pub spell_effects: Vec<HashMap<u32, Vec<SpellEffect>>>,
    pub npcs: Vec<HashMap<u32, NPC>>,
    pub icons: HashMap<u16, Icon>,
    pub items: Vec<HashMap<u32, Item>>,
    pub gems: Vec<HashMap<u32, Gem>>,
    pub enchants: Vec<HashMap<u32, Enchant>>,
    pub item_bondings: HashMap<u8, ItemBonding>,
    pub item_classes: HashMap<u8, ItemClass>,
    pub item_damages: Vec<HashMap<u32, Vec<ItemDamage>>>,
    pub item_damage_types: HashMap<u8, ItemDamageType>,
    pub item_effects: Vec<HashMap<u32, Vec<ItemEffect>>>,
    pub item_inventory_types: HashMap<u8, ItemInventoryType>,
    pub item_qualities: HashMap<u8, ItemQuality>,
    pub item_random_properties: Vec<HashMap<i16, ItemRandomProperty>>,
    pub item_sheaths: HashMap<u8, ItemSheath>,
    pub item_sockets: Vec<HashMap<u32, ItemSocket>>,
    pub item_stats: Vec<HashMap<u32, Vec<ItemStat>>>,
    pub itemset_names: Vec<HashMap<u16, ItemsetName>>,
    pub itemset_effects: Vec<HashMap<u16, Vec<ItemsetEffect>>>,
    pub titles: HashMap<u16, Title>,
    pub item_random_property_points: HashMap<u8, Vec<ItemRandomPropertyPoints>>,
    pub maps: HashMap<u16, Map>,
    pub difficulties: HashMap<u8, Difficulty>,
    pub encounters: HashMap<u32, Encounter>,
    pub encounter_npcs: HashMap<u32, EncounterNpc>,
    pub addons: HashMap<u32, Addon>,
}

impl Default for Data {
    fn default() -> Self {
        let dictionary = Dictionary::default();
        Dictionary::init(&dictionary);
        Data {
            dictionary,
            expansions: HashMap::new(),
            languages: HashMap::new(),
            localization: Vec::new(),
            races: HashMap::new(),
            professions: HashMap::new(),
            servers: RwLock::new(HashMap::new()),
            hero_classes: HashMap::new(),
            spells: Vec::new(),
            dispel_types: HashMap::new(),
            power_types: HashMap::new(),
            stat_types: HashMap::new(),
            spell_effects: Vec::new(),
            npcs: Vec::new(),
            icons: HashMap::new(),
            items: Vec::new(),
            gems: Vec::new(),
            enchants: Vec::new(),
            item_bondings: HashMap::new(),
            item_classes: HashMap::new(),
            item_damages: Vec::new(),
            item_damage_types: HashMap::new(),
            item_effects: Vec::new(),
            item_inventory_types: HashMap::new(),
            item_qualities: HashMap::new(),
            item_random_properties: Vec::new(),
            item_sheaths: HashMap::new(),
            item_sockets: Vec::new(),
            item_stats: Vec::new(),
            itemset_names: Vec::new(),
            itemset_effects: Vec::new(),
            titles: HashMap::new(),
            item_random_property_points: HashMap::new(),
            maps: HashMap::new(),
            difficulties: HashMap::new(),
            encounters: HashMap::new(),
            encounter_npcs: HashMap::new(),
            addons: HashMap::new(),
        }
    }
}

impl Data {
    pub fn init(mut self, db_main: &mut impl Select) -> Self {
        self.expansions.init(db_main);
        self.languages.init(db_main);
        self.localization.init(db_main);
        self.races.init(db_main);
        self.professions.init(db_main);
        {
            let mut servers = self.servers.write().unwrap();
            (*servers).init(db_main);
        }
        self.hero_classes.init(db_main);
        self.spells.init(db_main);
        self.dispel_types.init(db_main);
        self.power_types.init(db_main);
        self.stat_types.init(db_main);
        self.spell_effects.init(db_main);
        self.npcs.init(db_main);
        self.icons.init(db_main);
        self.items.init(db_main);
        self.gems.init(db_main);
        self.enchants.init(db_main);
        self.item_bondings.init(db_main);
        self.item_classes.init(db_main);
        self.item_damages.init(db_main);
        self.item_damage_types.init(db_main);
        self.item_effects.init(db_main);
        self.item_inventory_types.init(db_main);
        self.item_qualities.init(db_main);
        self.item_random_properties.init(db_main);
        self.item_sheaths.init(db_main);
        self.item_sockets.init(db_main);
        self.item_stats.init(db_main);
        self.itemset_names.init(db_main);
        self.itemset_effects.init(db_main);
        self.titles.init(db_main);
        self.item_random_property_points.init(db_main);
        self.maps.init(db_main);
        self.difficulties.init(db_main);
        self.encounters.init(db_main);
        self.encounter_npcs.init(db_main);
        self.addons.init(db_main);
        self
    }
}

// Initializer for the collections
pub trait Init {
    fn init(&mut self, db_main: &mut impl Select);
}

impl Init for HashMap<u32, Addon> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_addon", |mut row| Addon {
                id: row.take(0).unwrap(),
                expansion_id: row.take(1).unwrap(),
                addon_name: row.take(2).unwrap(),
                addon_desc: row.take(3).unwrap(),
                url_name: row.take(4).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, Expansion> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_expansion", |mut row| Expansion {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, Language> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_language", |mut row| Language {
                id: row.take(0).unwrap(),
                name: row.take(1).unwrap(),
                short_code: row.take(2).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for Vec<HashMap<u32, Localization>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_language_id = 0;
        db_main
            .select("SELECT * FROM data_localization ORDER BY language_id, id", |mut row| Localization {
                language_id: row.take(0).unwrap(),
                id: row.take(1).unwrap(),
                content: row.take(2).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                if result.language_id != last_language_id {
                    self.push(HashMap::new());
                    last_language_id = result.language_id;
                }
                let localizations = self.get_mut(result.language_id as usize - 1).unwrap();
                localizations.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, Race> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_race", |mut row| Race {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
                faction: row.take(2).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u16, Profession> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_profession", |mut row| Profession {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
                icon: row.take(2).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u32, Server> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_server", |mut row| Server {
                id: row.take(0).unwrap(),
                expansion_id: row.take(1).unwrap(),
                name: row.take(2).unwrap(),
                owner: row.take_opt(3).unwrap().ok(),
                patch: row.take(4).unwrap(),
                retail_id: row.take_opt(5).unwrap().ok(),
                archived: row.take(6).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, HeroClass> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_hero_class", |mut row| HeroClass {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
                color: row.take(2).unwrap(),
                talents: [HeroClassTalent { icon: 0, localization_id: 0 }; 3],
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });

        db_main
            .select("SELECT * FROM data_hero_class_spec", |mut row| {
                let hero_class_id: u8 = row.take(0).unwrap();
                let index: u8 = row.take(1).unwrap();
                let icon: u16 = row.take(2).unwrap();
                let localization_id: u32 = row.take(3).unwrap();
                (hero_class_id, index, icon, localization_id)
            })
            .into_iter()
            .for_each(|result| {
                let hero_class = self.get_mut(&result.0).unwrap();
                hero_class.talents[result.1 as usize] = HeroClassTalent { icon: result.2, localization_id: result.3 };
            });
    }
}

impl Init for Vec<HashMap<u32, Spell>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        db_main
            .select("SELECT * FROM data_spell ORDER BY expansion_id, id", |mut row| Spell {
                expansion_id: row.take(0).unwrap(),
                id: row.take(1).unwrap(),
                localization_id: row.take(2).unwrap(),
                subtext_localization_id: row.take(3).unwrap(),
                cost: row.take(4).unwrap(),
                cost_in_percent: row.take(5).unwrap(),
                power_type: row.take(6).unwrap(),
                cast_time: row.take(7).unwrap(),
                school_mask: row.take(8).unwrap(),
                dispel_type: row.take(9).unwrap(),
                range_max: row.take(10).unwrap(),
                cooldown: row.take(11).unwrap(),
                duration: row.take(12).unwrap(),
                icon: row.take(13).unwrap(),
                description_localization_id: row.take(14).unwrap(),
                aura_localization_id: row.take(15).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let spells = self.get_mut(result.expansion_id as usize - 1).unwrap();
                spells.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, DispelType> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_spell_dispel_type", |mut row| DispelType {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
                color: row.take(2).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, PowerType> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_spell_power_type", |mut row| PowerType {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
                color: row.take(2).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, StatType> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_stat_type", |mut row| StatType {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for Vec<HashMap<u32, Vec<SpellEffect>>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        let mut last_spell_id = 0;
        db_main
            .select("SELECT * FROM data_spell_effect ORDER BY expansion_id, spell_id, id", |mut row| SpellEffect {
                id: row.take(0).unwrap(),
                expansion_id: row.take(1).unwrap(),
                spell_id: row.take(2).unwrap(),
                points_lower: row.take(3).unwrap(),
                points_upper: row.take(4).unwrap(),
                chain_targets: row.take(5).unwrap(),
                radius: row.take(6).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let expansion_vec = self.get_mut(result.expansion_id as usize - 1).unwrap();
                if result.spell_id != last_spell_id {
                    expansion_vec.insert(result.spell_id, Vec::new());
                    last_spell_id = result.spell_id;
                }
                let spell_effects = expansion_vec.get_mut(&result.spell_id).unwrap();
                spell_effects.push(result);
            });
    }
}

impl Init for Vec<HashMap<u32, NPC>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        db_main
            .select("SELECT * FROM data_npc ORDER BY expansion_id, id", |mut row| NPC {
                expansion_id: row.take(0).unwrap(),
                id: row.take(1).unwrap(),
                localization_id: row.take(2).unwrap(),
                is_boss: row.take(3).unwrap(),
                friend: row.take(4).unwrap(),
                family: row.take(5).unwrap(),
                map_id: row.take_opt(6).unwrap().ok(),
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let npcs = self.get_mut(result.expansion_id as usize - 1).unwrap();
                npcs.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u16, Icon> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_icon ORDER BY id", |mut row| Icon {
                id: row.take(0).unwrap(),
                name: row.take(1).unwrap(),
            })
            .into_iter()
            .for_each(|icon| {
                self.insert(icon.id, icon);
            });
    }
}

impl Init for Vec<HashMap<u32, Item>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut item_x_display_info = HashMap::new();
        db_main
            .select("SELECT item_id, display_info_id, inventory_type FROM data_item_display_info", |mut row| {
                (row.take::<u32, usize>(0).unwrap(), row.take::<u32, usize>(1).unwrap(), row.take::<u8, usize>(2).unwrap())
            })
            .into_iter()
            .for_each(|(item_id, display_info_id, inventory_type)| {
                item_x_display_info.insert(item_id, (display_info_id, inventory_type));
            });

        let mut last_expansion_id = 0;
        db_main
            .select("SELECT * FROM data_item ORDER BY expansion_id, id", |mut row| Item {
                expansion_id: row.take(0).unwrap(),
                id: row.take(1).unwrap(),
                localization_id: row.take(2).unwrap(),
                icon: row.take(3).unwrap(),
                quality: row.take(4).unwrap(),
                inventory_type: row.take(5).unwrap(),
                class_id: row.take(6).unwrap(),
                required_level: row.take_opt(7).unwrap().ok(),
                bonding: row.take_opt(8).unwrap().ok(),
                sheath: row.take_opt(9).unwrap().ok(),
                itemset: row.take_opt(10).unwrap().ok(),
                max_durability: row.take_opt(11).unwrap().ok(),
                item_level: row.take_opt(12).unwrap().ok(),
                delay: row.take_opt(13).unwrap().ok(),
                display_info: None,
            })
            .into_iter()
            .for_each(|mut result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let items = self.get_mut(result.expansion_id as usize - 1).unwrap();
                result.display_info = item_x_display_info.get(&result.id).cloned();
                items.insert(result.id, result);
            });
    }
}

impl Init for Vec<HashMap<u32, Gem>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        db_main
            .select("SELECT * FROM data_gem ORDER BY expansion_id, item_id", |mut row| Gem {
                expansion_id: row.take(0).unwrap(),
                item_id: row.take(1).unwrap(),
                enchant_id: row.take(2).unwrap(),
                flag: row.take(3).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let gems = self.get_mut(result.expansion_id as usize - 2).unwrap();
                gems.insert(result.item_id, result);
            });
    }
}

impl Init for Vec<HashMap<u32, Enchant>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        db_main
            .select("SELECT * FROM data_enchant ORDER BY expansion_id, id", |mut row| {
                let mut stats = Vec::new();
                for i in (3..8).step_by(2) {
                    let stat_type = row.take_opt(i).unwrap().ok();
                    let stat_value = row.take_opt(i + 1).unwrap().ok();
                    if stat_type.is_none() {
                        break;
                    }
                    stats.push(Stat {
                        stat_type: stat_type.unwrap(),
                        stat_value: stat_value.unwrap(),
                    });
                }
                Enchant {
                    expansion_id: row.take(0).unwrap(),
                    id: row.take(1).unwrap(),
                    localization_id: row.take(2).unwrap(),
                    stats,
                }
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let enchants = self.get_mut(result.expansion_id as usize - 1).unwrap();
                enchants.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, ItemBonding> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_item_bonding", |mut row| ItemBonding {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, ItemClass> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_item_class", |mut row| ItemClass {
                id: row.take(0).unwrap(),
                item_class: row.take(1).unwrap(),
                item_sub_class: row.take(2).unwrap(),
                localization_id: row.take(3).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for Vec<HashMap<u32, Vec<ItemDamage>>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        let mut last_item_id = 0;
        db_main
            .select("SELECT * FROM data_item_dmg ORDER BY expansion_id, item_id, id", |mut row| ItemDamage {
                id: row.take(0).unwrap(),
                expansion_id: row.take(1).unwrap(),
                item_id: row.take(2).unwrap(),
                dmg_type: row.take_opt(3).unwrap().ok(),
                dmg_min: row.take(4).unwrap(),
                dmg_max: row.take(5).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let item_damage_map = self.get_mut(result.expansion_id as usize - 1).unwrap();
                if result.item_id != last_item_id {
                    item_damage_map.insert(result.item_id, Vec::new());
                    last_item_id = result.item_id;
                }
                let item_damages = item_damage_map.get_mut(&result.item_id).unwrap();
                item_damages.push(result);
            });
    }
}

impl Init for HashMap<u8, ItemDamageType> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_item_dmg_type", |mut row| ItemDamageType {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for Vec<HashMap<u32, Vec<ItemEffect>>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        let mut last_item_id = 0;
        db_main
            .select("SELECT id, expansion_id, item_id, spell_id FROM data_item_effect ORDER BY expansion_id, item_id, id", |mut row| ItemEffect {
                id: row.take(0).unwrap(),
                expansion_id: row.take(1).unwrap(),
                item_id: row.take(2).unwrap(),
                spell_id: row.take(3).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let item_effect_map = self.get_mut(result.expansion_id as usize - 1).unwrap();
                if result.item_id != last_item_id {
                    item_effect_map.insert(result.item_id, Vec::new());
                    last_item_id = result.item_id;
                }
                let item_effects = item_effect_map.get_mut(&result.item_id).unwrap();
                item_effects.push(result);
            });
    }
}

impl Init for HashMap<u8, ItemInventoryType> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_item_inventory_type", |mut row| ItemInventoryType {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, ItemQuality> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_item_quality", |mut row| ItemQuality {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
                color: row.take(2).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for Vec<HashMap<i16, ItemRandomProperty>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        db_main
            .select("SELECT * FROM data_item_random_property ORDER BY expansion_id, id", |mut row| {
                let mut enchant_ids = Vec::new();
                for i in 3..8 {
                    if let Ok(enchant_id) = row.take_opt(i).unwrap() {
                        enchant_ids.push(enchant_id);
                    }
                }
                let mut scaling_coefficients = Vec::new();
                for i in 8..13 {
                    if let Ok(coefficient) = row.take_opt(i).unwrap() {
                        scaling_coefficients.push(coefficient);
                    }
                }
                ItemRandomProperty {
                    expansion_id: row.take(0).unwrap(),
                    id: row.take(1).unwrap(),
                    localization_id: row.take(2).unwrap(),
                    enchant_ids,
                    scaling_coefficients,
                }
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let item_random_properties = self.get_mut(result.expansion_id as usize - 1).unwrap();
                item_random_properties.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, ItemSheath> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_item_sheath", |mut row| ItemSheath {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for Vec<HashMap<u32, ItemSocket>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        db_main
            .select("SELECT * FROM data_item_socket ORDER BY expansion_id, item_id", |mut row| {
                let mut slots = Vec::new();
                for i in 3..6 {
                    if let Ok(slot) = row.take_opt(i).unwrap() {
                        slots.push(slot);
                    }
                }
                ItemSocket {
                    expansion_id: row.take(0).unwrap(),
                    item_id: row.take(1).unwrap(),
                    bonus: row.take(2).unwrap(),
                    slots,
                }
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let item_sockets = self.get_mut(result.expansion_id as usize - 2).unwrap();
                item_sockets.insert(result.item_id, result);
            });
    }
}

impl Init for Vec<HashMap<u32, Vec<ItemStat>>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        let mut last_item_id = 0;
        db_main
            .select(
                "SELECT * FROM data_item_stat WHERE stat_type IN (1,2,3,4,5,6,27,28,29,30,31) OR stat_type = 34 OR (expansion_id > 1 AND stat_type IN (7,8,37,22,23,24,10,11,12,42,38,39,40,41)) OR (expansion_id>2 AND stat_type IN (9,13,21,43)) \
                 ORDER BY expansion_id, item_id",
                |mut row| ItemStat {
                    id: row.take(0).unwrap(),
                    expansion_id: row.take(1).unwrap(),
                    item_id: row.take(2).unwrap(),
                    stat: Stat {
                        stat_type: row.take(3).unwrap(),
                        stat_value: row.take(4).unwrap(),
                    },
                },
            )
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let expansion_vec = self.get_mut(result.expansion_id as usize - 1).unwrap();
                if result.item_id != last_item_id {
                    expansion_vec.insert(result.item_id, Vec::new());
                    last_item_id = result.item_id;
                }
                let item_stats = expansion_vec.get_mut(&result.item_id).unwrap();
                item_stats.push(result);
            });
    }
}

impl Init for Vec<HashMap<u16, ItemsetName>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        db_main
            .select("SELECT * FROM data_itemset_name ORDER BY expansion_id, id", |mut row| ItemsetName {
                expansion_id: row.take(0).unwrap(),
                id: row.take(1).unwrap(),
                localization_id: row.take(2).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let itemset_names = self.get_mut(result.expansion_id as usize - 1).unwrap();
                itemset_names.insert(result.id, result);
            });
    }
}

impl Init for Vec<HashMap<u16, Vec<ItemsetEffect>>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut last_expansion_id = 0;
        let mut last_itemset_id = 0;
        db_main
            .select("SELECT * FROM data_itemset_effect ORDER BY expansion_id, itemset_id, id", |mut row| ItemsetEffect {
                id: row.take(0).unwrap(),
                expansion_id: row.take(1).unwrap(),
                itemset_id: row.take(2).unwrap(),
                threshold: row.take(3).unwrap(),
                spell_id: row.take(4).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                if result.expansion_id != last_expansion_id {
                    self.push(HashMap::new());
                    last_expansion_id = result.expansion_id;
                }
                let expansion_vec = self.get_mut(result.expansion_id as usize - 1).unwrap();
                if result.itemset_id != last_itemset_id {
                    expansion_vec.insert(result.itemset_id, Vec::new());
                    last_itemset_id = result.itemset_id;
                }
                let itemset_effects = expansion_vec.get_mut(&result.itemset_id).unwrap();
                itemset_effects.push(result);
            });
    }
}

impl Init for HashMap<u16, Title> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_title", |mut row| Title {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, Vec<ItemRandomPropertyPoints>> {
    fn init(&mut self, db_main: &mut impl Select) {
        let mut current_vec = Vec::new();
        db_main
            .select("SELECT * FROM data_item_random_property_points ORDER BY expansion_id, item_level", |mut row| ItemRandomPropertyPoints {
                item_level: row.take(0).unwrap(),
                expansion_id: row.take(1).unwrap(),
                epic: [row.take(2).unwrap(), row.take(3).unwrap(), row.take(4).unwrap(), row.take(5).unwrap(), row.take(6).unwrap()],
                rare: [row.take(7).unwrap(), row.take(8).unwrap(), row.take(9).unwrap(), row.take(10).unwrap(), row.take(11).unwrap()],
                good: [row.take(12).unwrap(), row.take(13).unwrap(), row.take(14).unwrap(), row.take(15).unwrap(), row.take(16).unwrap()],
            })
            .into_iter()
            .for_each(|result| {
                if result.item_level == 300 {
                    current_vec.push(result.clone());
                    self.insert(result.expansion_id, current_vec.to_owned());
                    current_vec = Vec::new();
                } else {
                    current_vec.push(result);
                }
            });
    }
}

impl Init for HashMap<u16, Map> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_map", |mut row| Map {
                id: row.take(0).unwrap(),
                map_type: row.take(1).unwrap(),
                localization_id: row.take(2).unwrap(),
                icon: row.take(3).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u8, Difficulty> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_difficulty", |mut row| Difficulty {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
                icon: row.take(2).unwrap(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u32, Encounter> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_encounter", |mut row| Encounter {
                id: row.take(0).unwrap(),
                localization_id: row.take(1).unwrap(),
                map_id: row.take(2).unwrap(),
                retail_id: row.take_opt(3).unwrap().ok(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });
    }
}

impl Init for HashMap<u32, EncounterNpc> {
    fn init(&mut self, db_main: &mut impl Select) {
        db_main
            .select("SELECT * FROM data_encounter_npcs", |mut row| EncounterNpc {
                encounter_id: row.take(0).unwrap(),
                npc_id: row.take(1).unwrap(),
                requires_death: row.take(2).unwrap(),
                can_start_encounter: row.take(3).unwrap(),
                is_pivot: row.take(4).unwrap(),
                health_treshold: row.take_opt(5).unwrap().ok(),
            })
            .into_iter()
            .for_each(|result| {
                self.insert(result.npc_id, result);
            });
    }
}
