#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct RankingCharacterMeta {
    pub server_id: u32,
    pub hero_class_id: u8,
    pub name: String,
}
