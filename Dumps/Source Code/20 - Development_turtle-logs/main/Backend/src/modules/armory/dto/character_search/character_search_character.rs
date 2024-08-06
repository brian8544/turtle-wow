#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterSearchCharacterDto {
    pub character_id: u32,
    pub name: String,
    pub hero_class_id: u8,
    pub server_id: u32,
}
