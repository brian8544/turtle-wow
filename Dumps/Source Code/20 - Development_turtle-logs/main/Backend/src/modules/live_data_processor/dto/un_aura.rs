use crate::modules::live_data_processor::dto::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub struct UnAura {
    pub un_aura_caster: Unit,
    pub target: Unit,
    pub aura_caster: Option<Unit>, // TODO: Unused?
    pub un_aura_spell_id: u32,
    pub target_spell_id: u32,
    pub un_aura_amount: u8,
}
