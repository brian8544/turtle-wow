#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct GuildTooltip {
    pub guild_id: u32,
    pub guild_name: String,
    pub num_member: usize,
}
