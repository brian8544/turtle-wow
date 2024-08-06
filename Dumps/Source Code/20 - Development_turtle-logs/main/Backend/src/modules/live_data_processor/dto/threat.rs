use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct Threat {
    pub threater: Unit,
    pub threatened: Unit,
    pub spell_id: Option<u32>,
    pub amount: i32,
}
