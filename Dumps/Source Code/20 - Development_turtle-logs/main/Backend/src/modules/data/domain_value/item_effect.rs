#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemEffect {
    pub id: u32,
    pub expansion_id: u8,
    pub item_id: u32,
    pub spell_id: u32,
}
