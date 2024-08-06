use crate::modules::armory::{
    domain_value::CharacterFacial,
    dto::{ArmoryFailure, CharacterFacialDto},
    Armory,
};
use crate::params;
use crate::util::database::*;

pub trait GetCharacterFacial {
    fn get_character_facial(&self, db_main: &mut impl Select, facial_id: u32) -> Result<CharacterFacial, ArmoryFailure>;
    fn get_character_facial_by_value(&self, db_main: &mut impl Select, character_facial_dto: CharacterFacialDto) -> Result<CharacterFacial, ArmoryFailure>;
}

impl GetCharacterFacial for Armory {
    fn get_character_facial(&self, db_main: &mut impl Select, facial_id: u32) -> Result<CharacterFacial, ArmoryFailure> {
        let params = params!(
          "id" => facial_id
        );
        db_main
            .select_wparams_value(
                "SELECT * FROM armory_character_facial WHERE id=:id",
                |mut row| {
                    Ok(CharacterFacial {
                        id: row.take(0).unwrap(),
                        skin_color: row.take(1).unwrap(),
                        face_style: row.take(2).unwrap(),
                        hair_style: row.take(3).unwrap(),
                        hair_color: row.take(4).unwrap(),
                        facial_hair: row.take(5).unwrap(),
                    })
                },
                params,
            )
            .unwrap_or_else(|| Err(ArmoryFailure::Database("get_character_facial".to_owned())))
    }

    fn get_character_facial_by_value(&self, db_main: &mut impl Select, character_facial_dto: CharacterFacialDto) -> Result<CharacterFacial, ArmoryFailure> {
        let params = params!(
          "skin_color" => character_facial_dto.skin_color,
          "face_style" => character_facial_dto.face_style,
          "hair_style" => character_facial_dto.hair_style,
          "hair_color" => character_facial_dto.hair_color,
          "facial_hair" => character_facial_dto.facial_hair
        );
        db_main
            .select_wparams_value(
                "SELECT * FROM armory_character_facial WHERE skin_color=:skin_color AND face_style=:face_style AND hair_style=:hair_style AND hair_color=:hair_color AND facial_hair=:facial_hair",
                |mut row| {
                    Ok(CharacterFacial {
                        id: row.take(0).unwrap(),
                        skin_color: row.take(1).unwrap(),
                        face_style: row.take(2).unwrap(),
                        hair_style: row.take(3).unwrap(),
                        hair_color: row.take(4).unwrap(),
                        facial_hair: row.take(5).unwrap(),
                    })
                },
                params,
            )
            .unwrap_or_else(|| Err(ArmoryFailure::Database("get_character_facial_by_value".to_owned())))
    }
}
