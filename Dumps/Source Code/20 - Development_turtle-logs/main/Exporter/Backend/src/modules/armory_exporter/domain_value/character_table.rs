#[derive(Debug, Clone)]
pub struct CharacterTable {
    pub character_id: u32,
    pub name: String,
    pub race_id: u8,
    pub hero_class_id: u8,
    pub gender: u8,
    pub level: u8,
    pub chosen_title: u32,
    pub playerbytes1: u32,
    pub playerbytes2: u32,
}
