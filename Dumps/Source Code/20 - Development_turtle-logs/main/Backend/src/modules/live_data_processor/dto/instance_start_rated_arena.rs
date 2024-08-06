#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct InstanceStartRatedArena {
    pub map_id: u32,
    pub instance_id: u32,
    pub team_id1: u64,
    pub team_id2: u64,
}
