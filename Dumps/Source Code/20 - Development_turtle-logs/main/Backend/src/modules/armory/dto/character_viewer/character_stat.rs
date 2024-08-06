#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterStat {
    pub stat_type: String,
    pub stat_value: u16,
}
