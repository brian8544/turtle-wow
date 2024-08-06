use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct AuraApplication {
    pub caster: Unit,
    pub target: Unit,
    pub spell_id: u32,
    pub stack_amount: u32,
    pub delta: i8,
}
