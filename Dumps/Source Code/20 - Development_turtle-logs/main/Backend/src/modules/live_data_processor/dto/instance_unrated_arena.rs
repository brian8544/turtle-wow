#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct InstanceUnratedArena {
    pub map_id: u32,
    pub instance_id: u32,
    pub winner: u8,
}
