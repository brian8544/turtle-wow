#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct InstanceStart {
    pub map_id: u32,
    pub instance_id: u32,
}
