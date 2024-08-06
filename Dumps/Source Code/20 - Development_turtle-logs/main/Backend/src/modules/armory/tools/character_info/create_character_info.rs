use crate::params;
use crate::util::database::*;

use crate::modules::armory::{
    domain_value::CharacterInfo,
    dto::{ArmoryFailure, CharacterInfoDto},
    tools::{strip_talent_specialization, CreateCharacterGear, GetCharacterInfo},
    Armory,
};

pub trait CreateCharacterInfo {
    fn create_character_info(&self, db_main: &mut (impl Execute + Select), character_info: CharacterInfoDto) -> Result<CharacterInfo, ArmoryFailure>;
}

impl CreateCharacterInfo for Armory {
    fn create_character_info(&self, db_main: &mut (impl Execute + Select), character_info: CharacterInfoDto) -> Result<CharacterInfo, ArmoryFailure> {
        // Return existing one first

        let existing_character_info = self.get_character_info_by_value(db_main, character_info.clone());
        if existing_character_info.is_ok() {
            return existing_character_info;
        }

        // Create the gear needed
        let gear_res = self.create_character_gear(db_main, character_info.gear.to_owned());
        if gear_res.is_err() {
            return Err(gear_res.err().unwrap());
        }
        let gear = gear_res.unwrap();

        let talent_specialization = strip_talent_specialization(&character_info.talent_specialization);

        let params = params!(
          "gear_id" => gear.id,
          "hero_class_id" => character_info.hero_class_id,
          "level" => character_info.level,
          "gender" => character_info.gender,
          "profession1" => character_info.profession1,
          "profession2" => character_info.profession2,
          "talent_specialization" => talent_specialization,
          "race_id" => character_info.race_id
        );

        // It may fail due to the unique constraint if a race condition occurs
        db_main.execute_wparams(
            "INSERT INTO armory_character_info (`gear_id`, `hero_class_id`, `level`, `gender`, `profession1`, `profession2`, `talent_specialization`, `race_id`) VALUES (:gear_id, :hero_class_id, :level, :gender, :profession1, :profession2, \
             :talent_specialization, :race_id)",
            params,
        );
        if let Ok(char_info) = self.get_character_info_by_value(db_main, character_info) {
            return Ok(char_info);
        }
        Err(ArmoryFailure::Database("create_character_info".to_owned()))
    }
}
