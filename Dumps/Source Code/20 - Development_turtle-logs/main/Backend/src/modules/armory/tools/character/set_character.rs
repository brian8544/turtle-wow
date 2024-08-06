use crate::util::database::{Execute, Select};
use crate::{
    dto::CheckPlausability,
    modules::armory::{
        dto::{ArmoryFailure, CharacterDto},
        material::Character,
        tools::{CreateCharacter, GetCharacter, SetCharacterHistory},
        Armory,
    },
};

pub trait SetCharacter {
    fn set_character(&self, db_main: &mut (impl Execute + Select), server_id: u32, update_character: CharacterDto, timestamp: u64) -> Result<Character, ArmoryFailure>;
}

impl SetCharacter for Armory {
    fn set_character(&self, db_main: &mut (impl Execute + Select), server_id: u32, update_character: CharacterDto, timestamp: u64) -> Result<Character, ArmoryFailure> {
        // Validation
        if !update_character.is_plausible() {
            return Err(ArmoryFailure::ImplausibleInput);
        }

        // Create the character if necessary
        let character_id_res = self.create_character(db_main, server_id, update_character.server_uid);
        if character_id_res.is_err() {
            return Err(character_id_res.err().unwrap());
        }
        let character_id = character_id_res.unwrap();
        let current_character = self.get_character(character_id).unwrap();

        // Set the character history
        if update_character.character_history.is_some() {
            let character_history_res = self.set_character_history(db_main, server_id, update_character.character_history.unwrap(), update_character.server_uid, timestamp);
            if character_history_res.is_err() {
                return Err(character_history_res.err().unwrap());
            }
            let char_history = character_history_res.unwrap();

            let mut cache = self.cache_char_name_to_id.write().unwrap();
            // Invalidate old entry
            if let Some(history) = current_character.last_update {
                let vec = cache.entry(history.character_name.to_lowercase()).or_insert_with(Vec::new);
                if let Some(index) = vec.iter().position(|char_id| *char_id == character_id) {
                    vec.remove(index);
                }
            }

            // Add new entry
            let vec = cache.entry(char_history.character_name.to_lowercase()).or_insert_with(Vec::new);
            if !vec.contains(&char_history.character_id) {
                vec.push(char_history.character_id);
            }
        }

        self.get_character(character_id).ok_or_else(|| ArmoryFailure::Database("get_character".to_owned()))
    }
}
