use crate::modules::live_data_processor::domain_value::PowerType;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Power {
    pub power_type: PowerType,
    pub max_power: u32,
    pub current_power: u32,
}
