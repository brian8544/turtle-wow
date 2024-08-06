use crate::util::database::*;

use crate::modules::armory::{dto::ArmoryFailure, tools::GetCharacter, Armory};
use crate::params;

pub trait DeleteCharacter {
    fn delete_character(&self, db_main: &mut impl Execute, id: u32) -> Result<(), ArmoryFailure>;
    fn delete_character_by_uid(&self, db_main: &mut impl Execute, server_id: u32, uid: u64) -> Result<(), ArmoryFailure>;
}

impl DeleteCharacter for Armory {
    fn delete_character(&self, db_main: &mut impl Execute, id: u32) -> Result<(), ArmoryFailure> {
        let mut characters = self.characters.write().unwrap();
        if db_main.execute_wparams(
            "DELETE FROM armory_character WHERE id=:id",
            params!(
              "id" => id
            ),
        ) {
            {
                let current_character = characters.get(&id).unwrap();
                if let Some(history) = &current_character.last_update {
                    let mut cache = self.cache_char_name_to_id.write().unwrap();
                    let vec = cache.get_mut(&history.character_name.to_lowercase()).unwrap();
                    if let Some(index) = vec.iter().position(|char_id| *char_id == id) {
                        vec.remove(index);
                    }
                }
            }
            return characters.remove(&id).ok_or(ArmoryFailure::InvalidInput).map(|_| ());
        }
        Err(ArmoryFailure::Database("delete_character".to_owned()))
    }

    fn delete_character_by_uid(&self, db_main: &mut impl Execute, server_id: u32, uid: u64) -> Result<(), ArmoryFailure> {
        self.get_character_id_by_uid(server_id, uid).ok_or(ArmoryFailure::InvalidInput).and_then(|id| self.delete_character(db_main, id))
    }
}
