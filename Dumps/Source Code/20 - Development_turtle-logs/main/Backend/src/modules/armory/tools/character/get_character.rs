use crate::modules::armory::dto::BasicCharacter;
use crate::modules::armory::material::CharacterHistory;
use crate::modules::armory::tools::GetCharacterHistory;
use crate::modules::armory::util::talent_tree::get_talent_tree;
use crate::modules::armory::{material::Character, Armory};
use crate::util::database::Select;

pub trait GetCharacter {
    fn get_character_id_by_uid(&self, server_id: u32, uid: u64) -> Option<u32>;
    fn get_character_by_uid(&self, server_id: u32, uid: u64) -> Option<Character>;
    fn get_character(&self, character_id: u32) -> Option<Character>;
    fn get_basic_character(&self, db_main: &mut impl Select, character_id: u32, timestamp: u64) -> Option<BasicCharacter>;
    fn get_characters_by_name(&self, character_name: String) -> Vec<Character>;
    fn get_character_by_name(&self, server_id: u32, character_name: String) -> Option<Character>;
    fn get_character_moment(&self, db_main: &mut impl Select, character_id: u32, timestamp: u64) -> Option<CharacterHistory>;
}

impl GetCharacter for Armory {
    fn get_character_id_by_uid(&self, server_id: u32, uid: u64) -> Option<u32> {
        let characters = self.characters.read().unwrap();
        characters.iter().find(|(_, character)| character.server_id == server_id && character.server_uid == uid).map(|(id, _)| *id)
    }

    fn get_character_by_uid(&self, server_id: u32, uid: u64) -> Option<Character> {
        self.get_character_id_by_uid(server_id, uid).and_then(|character_id| self.get_character(character_id))
    }

    fn get_character(&self, character_id: u32) -> Option<Character> {
        let characters = self.characters.read().unwrap();
        characters.get(&character_id).cloned()
    }

    fn get_basic_character(&self, db_main: &mut impl Select, character_id: u32, timestamp: u64) -> Option<BasicCharacter> {
        let character = self.get_character(character_id)?;
        let char_history = self.get_character_moment(db_main, character_id, timestamp)?;
        Some(BasicCharacter {
            id: character_id,
            server_id: character.server_id,
            hero_class_id: Some(char_history.character_info.hero_class_id),
            race_id: Some(char_history.character_info.race_id),
            spec_id: char_history.character_info.talent_specialization.as_ref().map(|talents| get_talent_tree(&talents) + 1),
            name: Some(char_history.character_name),
        })
    }

    fn get_characters_by_name(&self, character_name: String) -> Vec<Character> {
        let characters = self.characters.read().unwrap();
        let cache = self.cache_char_name_to_id.read().unwrap();
        cache.get(&character_name.to_lowercase())
            .map(|char_ids| {
                char_ids.iter().fold(Vec::new(), |mut acc, id| {
                    if let Some(character) = characters.get(id) {
                        if character.last_update.is_some() {
                            acc.push(character.clone());
                        }
                    }
                    acc
                })
            })
            .unwrap_or_else(Vec::new)
    }

    fn get_character_by_name(&self, server_id: u32, character_name: String) -> Option<Character> {
        self.get_characters_by_name(character_name.clone())
            .iter()
            .find(|character| character.server_id == server_id && character.last_update.as_ref().unwrap().character_name.to_lowercase() == character_name.to_lowercase())
            .cloned()
    }

    fn get_character_moment(&self, db_main: &mut impl Select, character_id: u32, timestamp: u64) -> Option<CharacterHistory> {
        let character = self.get_character(character_id)?;
        #[allow(clippy::question_mark)]
        if character.last_update.is_none() {
            return None;
        }

        let timestamp = timestamp / 1000;
        let mut closest_history_moment = character.history_moments.first().unwrap();
        for moment in character.history_moments.iter() {
            if (timestamp as i64 - moment.timestamp as i64).abs() < (timestamp as i64 - closest_history_moment.timestamp as i64).abs() {
                closest_history_moment = moment;
            }
        }

        let char_history = if closest_history_moment.id == character.last_update.as_ref().unwrap().id {
            character.last_update.clone().unwrap()
        } else {
            self.get_character_history(db_main, closest_history_moment.id).ok()?
        };

        Some(char_history)
    }
}
