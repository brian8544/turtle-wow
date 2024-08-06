use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct SpellCast {
    pub caster: Unit,
    pub target: Option<Unit>,
    pub spell_id: u32,
    pub hit_mask: u32,
}
