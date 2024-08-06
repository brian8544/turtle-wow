use super::get_character_history::get_character_history;
use crate::modules::armory::dto::CharacterDto;

pub fn get_character() -> CharacterDto {
    CharacterDto {
        server_uid: 1231245,
        character_history: Some(get_character_history()),
    }
}
