use crate::params;
use crate::util::database::*;

use crate::modules::armory::tools::GetCharacterHistory;
use crate::{
    dto::CheckPlausability,
    modules::armory::{
        dto::{ArmoryFailure, CharacterHistoryDto},
        material::CharacterHistory,
        tools::{CreateCharacterHistory, CreateGuild, GetCharacter},
        Armory,
    },
};

pub trait SetCharacterHistory {
    fn set_character_history(&self, db_main: &mut (impl Execute + Select), server_id: u32, update_character_history: CharacterHistoryDto, character_uid: u64, timestamp: u64) -> Result<CharacterHistory, ArmoryFailure>;
}

impl SetCharacterHistory for Armory {
    fn set_character_history(&self, db_main: &mut (impl Execute + Select), server_id: u32, update_character_history: CharacterHistoryDto, character_uid: u64, timestamp: u64) -> Result<CharacterHistory, ArmoryFailure> {
        // Validation
        if !update_character_history.is_plausible() {
            return Err(ArmoryFailure::ImplausibleInput);
        }

        // Check if this character exists
        let character_id_res = self.get_character_id_by_uid(server_id, character_uid);
        if character_id_res.is_none() {
            return Err(ArmoryFailure::InvalidInput);
        }

        let character_id = character_id_res.unwrap();
        let guild_id = update_character_history
            .character_guild
            .as_ref()
            .and_then(|chr_guild_dto| self.create_guild(db_main, server_id, chr_guild_dto.guild.clone()).ok().map(|gld| gld.id));

        {
            // Check whether this is a new entry or just the same as previously
            let mut characters = self.characters.write().unwrap();
            let character = characters.get_mut(&character_id).unwrap();
            if character.last_update.is_some() {
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
                    self.get_character_history(db_main, closest_history_moment.id)?
                };

                if char_history.compare_by_value(&update_character_history)
                    && ((char_history.character_guild.is_none() && guild_id.is_none()) || char_history.character_guild.as_ref().map(|guild| guild.guild_id).filter(|inner_guild_id| guild_id.contains(inner_guild_id)).is_some())
                {
                    if char_history.id == character.last_update.as_ref().unwrap().id {
                        let last_update = character.last_update.as_mut().unwrap();
                        let now = time_util::now();
                        if db_main.execute_wparams(
                            "UPDATE armory_character_history SET `timestamp` = :timestamp WHERE id=:id",
                            params!(
                              "timestamp" => now,
                              "id" => last_update.id
                            ),
                        ) {
                            last_update.timestamp = now.to_owned();
                            return Ok(last_update.clone());
                        }
                        return Err(ArmoryFailure::Database("set_character_history".to_owned()));
                    }
                    return Ok(char_history);
                }
            }
        } // Else create a new history point and assign it to this character
        self.create_character_history(db_main, server_id, update_character_history, character_uid, timestamp)
    }
}
