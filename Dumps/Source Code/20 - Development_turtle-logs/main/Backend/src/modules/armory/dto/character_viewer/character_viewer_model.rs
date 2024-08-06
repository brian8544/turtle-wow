use crate::modules::armory::domain_value::CharacterFacial;

pub struct CharacterViewerModel {
    pub character_facial: CharacterFacial,
    pub model_race: String,
    pub model_gender: String,
    pub model_items: Vec<(u8, u32)>,
}
