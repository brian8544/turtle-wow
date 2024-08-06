#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct SearchGuildDto {
    pub guild_id: u32,
    pub name: String,
}
