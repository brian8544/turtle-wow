use crate::modules::live_data_processor::domain_value::{SchoolMask, Unit};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct AuraApplication {
    pub caster: Unit,
    pub stack_amount: u32,
    pub spell_id: u32,
    pub school_mask: SchoolMask,
}
