#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct InstanceArena {
    pub map_id: u32,
    pub instance_id: u32,
    pub winner: u8,
    pub team_id1: u64,
    pub team_id2: u64,
    pub team_change1: i32,
    pub team_change2: i32,
}
