use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct Interrupt {
    pub target: Unit,
    pub interrupted_spell_id: u32,
}
