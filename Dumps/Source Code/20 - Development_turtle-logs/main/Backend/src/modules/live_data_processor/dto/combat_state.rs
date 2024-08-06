use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct CombatState {
    pub unit: Unit,
    pub in_combat: bool,
}
