use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct HealDone {
    pub caster: Unit,
    pub target: Unit,
    pub spell_id: u32,
    pub total_heal: u32,
    pub effective_heal: u32,
    pub absorb: u32,
    pub hit_mask: u32,
}
