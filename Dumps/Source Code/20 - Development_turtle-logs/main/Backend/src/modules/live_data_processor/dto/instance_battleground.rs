#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct InstanceBattleground {
    pub map_id: u32,
    pub instance_id: u32,
    pub winner: u8,
    pub score_alliance: u32,
    pub score_horde: u32,
}
