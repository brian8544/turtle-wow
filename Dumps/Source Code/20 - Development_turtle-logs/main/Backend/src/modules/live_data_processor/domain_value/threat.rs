use crate::modules::live_data_processor::domain_value::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Threat {
    pub threatened: Unit,
    pub amount: i32,
}
