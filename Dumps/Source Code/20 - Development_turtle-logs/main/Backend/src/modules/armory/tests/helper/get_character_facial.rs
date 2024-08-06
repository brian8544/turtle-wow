use crate::modules::armory::dto::CharacterFacialDto;

pub fn get_character_facial() -> CharacterFacialDto {
    CharacterFacialDto {
        skin_color: 3,
        face_style: 4,
        hair_style: 3,
        hair_color: 4,
        facial_hair: 3,
    }
}
