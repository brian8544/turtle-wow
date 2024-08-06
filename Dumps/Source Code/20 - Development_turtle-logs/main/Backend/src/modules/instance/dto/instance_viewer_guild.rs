#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct InstanceViewerGuild {
    pub guild_id: u32,
    pub guild_name: String,
}
