use crate::params;
use crate::util::database::*;

use crate::modules::armory::{dto::ArmoryFailure, tools::GetCharacterHistory, Armory};

pub trait DeleteCharacterHistory {
    fn delete_character_history(&self, db_main: &mut (impl Execute + Select), character_history_id: u32) -> Result<(), ArmoryFailure>;
}

impl DeleteCharacterHistory for Armory {
    fn delete_character_history(&self, db_main: &mut (impl Execute + Select), character_history_id: u32) -> Result<(), ArmoryFailure> {
        let character_history_res = self.get_character_history(db_main, character_history_id);
        if character_history_res.is_err() {
            return Err(ArmoryFailure::InvalidInput);
        }
        let character_history = character_history_res.unwrap();

        let mut characters = self.characters.write().unwrap();
        if db_main.execute_wparams(
            "DELETE FROM armory_character_history WHERE id=:id",
            params!(
              "id" => character_history_id
            ),
        ) {
            {
                let mut cache_char_history = self.cache_char_history.write().unwrap();
                cache_char_history.remove(&character_history_id);
            }

            let mut character = characters.get_mut(&character_history.character_id).unwrap();
            let (hm_index, _) = character.history_moments.iter().enumerate().find(|(_index, history_moment)| history_moment.id == character_history_id).unwrap();
            character.history_moments.remove(hm_index);
            if character.last_update.contains(&character_history) {
                if let Some(last_id) = character.history_moments.last() {
                    character.last_update = self.get_character_history(db_main, last_id.id).ok();
                }
            }
            return Ok(());
        }
        Err(ArmoryFailure::Database("delete_character_history".to_owned()))
    }
}
