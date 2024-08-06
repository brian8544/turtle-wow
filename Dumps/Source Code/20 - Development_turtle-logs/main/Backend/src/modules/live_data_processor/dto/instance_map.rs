use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct InstanceMap {
    pub map_id: u32,
    pub instance_id: u32,
    pub map_difficulty: u8,
    pub unit: Unit,
}
