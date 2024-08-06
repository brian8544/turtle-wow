use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct Death {
    pub cause: Option<Unit>,
    pub victim: Unit,
}
