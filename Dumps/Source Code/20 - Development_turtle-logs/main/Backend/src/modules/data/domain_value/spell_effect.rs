#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct SpellEffect {
    pub id: u32,
    pub expansion_id: u8,
    pub spell_id: u32,
    pub points_lower: i32,
    pub points_upper: i32,
    pub chain_targets: u16,
    pub radius: u32,
}
