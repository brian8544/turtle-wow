use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct Power {
    pub unit: Unit,
    pub power_type: u8,
    pub max_power: u32,
    pub current_power: u32,
}
