#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct RankingResult {
    pub instance_meta_id: u32,
    pub attempt_id: u32,
    pub amount: u32,
    pub duration: u64,
    pub difficulty_id: u8,
    pub character_spec: u8,
    pub season_index: u8
}
