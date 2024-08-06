use std::{collections::HashMap, sync::RwLock};

use crate::modules::armory::{
    domain_value::{CharacterFacial, CharacterGear, CharacterGuild, CharacterInfo, CharacterItem, GuildRank, HistoryMoment},
    material::{Character, CharacterHistory, Guild},
};
use crate::modules::armory::domain_value::{ArenaTeam, ArenaTeamSizeType};
use crate::params;
use crate::util::database::*;

#[derive(Debug)]
pub struct Armory {
    pub characters: RwLock<HashMap<u32, Character>>,
    pub guilds: RwLock<HashMap<u32, Guild>>,

    // Caches
    // TODO: Evict them at some point!
    pub cache_char_history: RwLock<HashMap<u32, CharacterHistory>>,
    pub cache_char_name_to_id: RwLock<HashMap<String, Vec<u32>>>,
}

impl Default for Armory {
    fn default() -> Self {
        Armory {
            characters: RwLock::new(HashMap::new()),
            guilds: RwLock::new(HashMap::new()),
            cache_char_history: RwLock::new(HashMap::new()),
            cache_char_name_to_id: RwLock::new(HashMap::new()),
        }
    }
}

impl Armory {
    pub fn init(self, db_main: &mut impl Select) -> Self {
        self.characters.write().unwrap().init(db_main);
        self.guilds.write().unwrap().init(db_main);
        {
            let chars = self.characters.read().unwrap();
            let mut cache = self.cache_char_name_to_id.write().unwrap();
            for (char_id, character) in chars.iter().filter(|(_, character)| character.last_update.is_some()) {
                let vec = cache.entry(character.last_update.as_ref().unwrap().character_name.clone().to_lowercase()).or_insert_with(Vec::new);
                if !vec.contains(char_id) {
                    vec.push(*char_id);
                }
            }
        }

        self
    }

    pub fn update(&self, db_main: &mut impl Select) {
        self.characters.write().unwrap().init(db_main);
        self.guilds.write().unwrap().init(db_main);
    }
}

trait Init {
    fn init(&mut self, db: &mut impl Select);
}

impl Init for HashMap<u32, Character> {
    fn init(&mut self, db: &mut impl Select) {
        let max_character_id = self.iter().max_by(|left, right| left.0.cmp(&right.0)).map(|(id, _)| *id).unwrap_or(0);
        let max_history_moment_id = self.iter().max_by(|left, right| {
            let max_left = left.1.history_moments.iter().max_by(|i_left, i_right| i_left.id.cmp(&i_right.id)).map(|hm| hm.id).unwrap_or(0);
            let max_right = right.1.history_moments.iter().max_by(|i_left, i_right| i_left.id.cmp(&i_right.id)).map(|hm| hm.id).unwrap_or(0);
            max_left.cmp(&max_right)
        }).map(|(_, char)| char.last_update.as_ref().unwrap().id).unwrap_or(0);

        // Loading the character itself
        db.select_wparams("SELECT * FROM armory_character A WHERE A.id > :character_id", |mut row| Character {
            id: row.take(0).unwrap(),
            server_id: row.take(1).unwrap(),
            server_uid: row.take(2).unwrap(),
            last_update: None,
            history_moments: Vec::new(),
        }, params!("character_id" => max_character_id))
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });

        // Loading the history_ids
        db.select_wparams("SELECT A.id, A.timestamp, A.character_id FROM armory_character_history A WHERE A.id > :char_history_id ORDER BY A.id", |mut row| {
            let id: u32 = row.take(0).unwrap();
            let timestamp: u64 = row.take(1).unwrap();
            let character_id: u32 = row.take(2).unwrap();
            (id, timestamp, character_id)
        }, params!("char_history_id" => max_history_moment_id))
            .into_iter()
            .for_each(|result| {
                if self.contains_key(&result.2) {
                    self.get_mut(&result.2).unwrap().history_moments.push(HistoryMoment { id: result.0, timestamp: result.1 });
                }
            });

        // Load the actual newest character history data
        db.select_wparams(
            "SELECT ach.*, agr.name AS guild_rank_name, acf.*, aci.*, ag.id, ai1.*, ai2.*, ai3.*, ai4.*, ai5.*, ai6.*, ai7.*, ai8.*, ai9.*, ai10.*, ai11.*, ai12.*, ai13.*, ai14.*, ai15.*, ai16.*, ai17.*, ai18.*, ai19.*, aat1.*, aat2.*, aat3.* FROM \
             armory_character_history ach JOIN (SELECT MAX(id) id FROM armory_character_history GROUP BY character_id) ach_max ON ach.id = ach_max.id LEFT JOIN armory_character_facial acf ON acf.id = ach.facial JOIN armory_character_info aci ON \
             ach.character_info_id = aci.id JOIN armory_gear ag ON aci.gear_id = ag.id LEFT JOIN armory_item ai1 ON ag.head = ai1.id LEFT JOIN armory_item ai2 ON ag.neck = ai2.id LEFT JOIN armory_item ai3 ON ag.shoulder = ai3.id LEFT JOIN \
             armory_item ai4 ON ag.back = ai4.id LEFT JOIN armory_item ai5 ON ag.chest = ai5.id LEFT JOIN armory_item ai6 ON ag.shirt = ai6.id LEFT JOIN armory_item ai7 ON ag.tabard = ai7.id LEFT JOIN armory_item ai8 ON ag.wrist = ai8.id LEFT JOIN \
             armory_item ai9 ON ag.main_hand = ai9.id LEFT JOIN armory_item ai10 ON ag.off_hand = ai10.id LEFT JOIN armory_item ai11 ON ag.ternary_hand = ai11.id LEFT JOIN armory_item ai12 ON ag.glove = ai12.id LEFT JOIN armory_item ai13 ON \
             ag.belt = ai13.id LEFT JOIN armory_item ai14 ON ag.leg = ai14.id LEFT JOIN armory_item ai15 ON ag.boot = ai15.id LEFT JOIN armory_item ai16 ON ag.ring1 = ai16.id LEFT JOIN armory_item ai17 ON ag.ring2 = ai17.id LEFT JOIN armory_item \
             ai18 ON ag.trinket1 = ai18.id LEFT JOIN armory_item ai19 ON ag.trinket2 = ai19.id LEFT JOIN armory_guild_rank agr ON agr.guild_id = ach.guild_id AND agr.rank_index = ach.guild_rank LEFT JOIN armory_arena_team aat1 ON aat1.id = \
             ach.arena2 LEFT JOIN armory_arena_team aat2 ON aat2.id = ach.arena3 LEFT JOIN armory_arena_team aat3 ON aat3.id = ach.arena5 WHERE ach.id > :char_history_id",
            |mut row| {
                let mut gear_slots: Vec<Option<CharacterItem>> = Vec::new();
                for i in (31..183).step_by(8) {
                    let id = row.take_opt(i).unwrap().ok();
                    if id.is_none() {
                        gear_slots.push(None);
                        continue;
                    }

                    gear_slots.push(Some(CharacterItem {
                        id: id.unwrap(),
                        item_id: row.take(i + 1).unwrap(),
                        random_property_id: row.take_opt(i + 2).unwrap().ok(),
                        enchant_id: row.take_opt(i + 3).unwrap().ok(),
                        gem_ids: vec![row.take_opt(i + 4).unwrap().ok(), row.take_opt(i + 5).unwrap().ok(), row.take_opt(i + 6).unwrap().ok(), row.take_opt(i + 7).unwrap().ok()],
                    }));
                }

                let arena_teams = vec![
                    row.take_opt(10).unwrap().ok().map(|team_id| ArenaTeam {
                        id: team_id,
                        server_uid: row.take(184).unwrap(),
                        server_id: row.take(185).unwrap(),
                        team_name: row.take(186).unwrap(),
                        size_type: ArenaTeamSizeType::from_u8(row.take(187).unwrap()),
                    }),
                    row.take_opt(11).unwrap().ok().map(|team_id| ArenaTeam {
                        id: team_id,
                        server_uid: row.take(189).unwrap(),
                        server_id: row.take(190).unwrap(),
                        team_name: row.take(191).unwrap(),
                        size_type: ArenaTeamSizeType::from_u8(row.take(192).unwrap()),
                    }),
                    row.take_opt(12).unwrap().ok().map(|team_id| ArenaTeam {
                        id: team_id,
                        server_uid: row.take(194).unwrap(),
                        server_id: row.take(195).unwrap(),
                        team_name: row.take(196).unwrap(),
                        size_type: ArenaTeamSizeType::from_u8(row.take(197).unwrap()),
                    }),
                ]
                    .into_iter()
                    .filter(Option::is_some)
                    .map(Option::unwrap)
                    .collect();

                CharacterHistory {
                    id: row.take(0).unwrap(),
                    character_id: row.take(1).unwrap(),
                    character_name: row.take(3).unwrap(),
                    character_guild: row.take_opt(4).unwrap().ok().map(|guild_id| CharacterGuild {
                        guild_id,
                        rank: GuildRank {
                            index: row.take(5).unwrap(),
                            name: row.take(14).unwrap(),
                        },
                    }),
                    character_title: row.take_opt(6).unwrap().ok(),
                    profession_skill_points1: row.take_opt(7).unwrap().ok(),
                    profession_skill_points2: row.take_opt(8).unwrap().ok(),
                    arena_teams,
                    timestamp: row.take(13).unwrap(),
                    facial: row.take_opt(15).unwrap().ok().map(|facial_id: u32| CharacterFacial {
                        id: facial_id,
                        skin_color: row.take(16).unwrap(),
                        face_style: row.take(17).unwrap(),
                        hair_style: row.take(18).unwrap(),
                        hair_color: row.take(19).unwrap(),
                        facial_hair: row.take(20).unwrap(),
                    }),
                    character_info: CharacterInfo {
                        id: row.take(21).unwrap(),
                        hero_class_id: row.take(23).unwrap(),
                        level: row.take(24).unwrap(),
                        gender: row.take(25).unwrap(),
                        profession1: row.take_opt(26).unwrap().ok(),
                        profession2: row.take_opt(27).unwrap().ok(),
                        talent_specialization: row.take_opt(28).unwrap().ok(),
                        race_id: row.take(29).unwrap(),
                        gear: CharacterGear {
                            id: row.take(30).unwrap(),
                            trinket2: gear_slots.pop().unwrap(),
                            trinket1: gear_slots.pop().unwrap(),
                            ring2: gear_slots.pop().unwrap(),
                            ring1: gear_slots.pop().unwrap(),
                            boot: gear_slots.pop().unwrap(),
                            leg: gear_slots.pop().unwrap(),
                            belt: gear_slots.pop().unwrap(),
                            glove: gear_slots.pop().unwrap(),
                            ternary_hand: gear_slots.pop().unwrap(),
                            off_hand: gear_slots.pop().unwrap(),
                            main_hand: gear_slots.pop().unwrap(),
                            wrist: gear_slots.pop().unwrap(),
                            tabard: gear_slots.pop().unwrap(),
                            shirt: gear_slots.pop().unwrap(),
                            chest: gear_slots.pop().unwrap(),
                            back: gear_slots.pop().unwrap(),
                            shoulder: gear_slots.pop().unwrap(),
                            neck: gear_slots.pop().unwrap(),
                            head: gear_slots.pop().unwrap(),
                        },
                    },
                }
            }, params!("char_history_id" => max_history_moment_id),
        )
            .into_iter()
            .for_each(|result| {
                // TOCTOU currently here
                if self.contains_key(&result.character_id) {
                    let character = self.get_mut(&result.character_id).unwrap();
                    character.last_update = Some(result);
                }
            });
    }
}

impl Init for HashMap<u32, Guild> {
    fn init(&mut self, db: &mut impl Select) {
        let max_guild_id = self.iter().max_by(|left, right| left.0.cmp(&right.0)).map(|(id, _)| *id).unwrap_or(0);
        db.select_wparams("SELECT * FROM armory_guild A WHERE A.id > :guild_id", |mut row| Guild {
            id: row.take(0).unwrap(),
            server_uid: row.take(1).unwrap(),
            server_id: row.take(2).unwrap(),
            name: row.take(3).unwrap(),
            ranks: Vec::new(),
        }, params!("guild_id" => max_guild_id))
            .into_iter()
            .for_each(|result| {
                self.insert(result.id, result);
            });

        for (_, guild) in self.iter_mut() {
            guild.ranks.clear();
        }

        db.select("SELECT * FROM armory_guild_rank A ORDER BY A.guild_id, A.rank_index", |mut row| {
            let guild_id: u32 = row.take(0).unwrap();

            (
                guild_id,
                GuildRank {
                    index: row.take(1).unwrap(),
                    name: row.take(2).unwrap(),
                },
            )
        })
            .into_iter()
            .for_each(|(guild_id, guild_rank)| {
                if self.contains_key(&guild_id) {
                    let guild = self.get_mut(&guild_id).unwrap();
                    guild.ranks.push(guild_rank);
                }
            });
    }
}
