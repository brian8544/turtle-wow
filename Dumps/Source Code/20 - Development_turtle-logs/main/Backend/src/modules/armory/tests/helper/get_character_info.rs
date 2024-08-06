use super::get_character_gear::get_character_gear;
use crate::modules::armory::dto::CharacterInfoDto;

pub fn get_character_info() -> CharacterInfoDto {
    CharacterInfoDto {
        gear: get_character_gear(),
        hero_class_id: 7,
        level: 80,
        gender: false,
        profession1: Some(186),
        profession2: Some(182),
        talent_specialization: None,
        race_id: 4,
    }
}
