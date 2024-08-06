#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterViewerItemDto {
    pub item_id: u32,
    pub quality: u8,
    pub icon: String,
}
