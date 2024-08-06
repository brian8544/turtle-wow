#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemDamage {
    pub id: u32,
    pub expansion_id: u8,
    pub item_id: u32,
    pub dmg_type: Option<u8>,
    pub dmg_min: u16,
    pub dmg_max: u16,
}
