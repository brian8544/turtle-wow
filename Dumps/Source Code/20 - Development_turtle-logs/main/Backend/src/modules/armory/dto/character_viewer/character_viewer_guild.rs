#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterViewerGuildDto {
    pub guild_id: u32,
    pub name: String,
    pub rank: String,
}
