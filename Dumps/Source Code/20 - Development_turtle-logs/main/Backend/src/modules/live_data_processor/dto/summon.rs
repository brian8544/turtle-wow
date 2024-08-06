use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct Summon {
    pub owner: Unit,
    pub unit: Unit,
}
