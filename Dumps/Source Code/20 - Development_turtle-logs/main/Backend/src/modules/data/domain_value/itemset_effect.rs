#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemsetEffect {
    pub id: u32,
    pub expansion_id: u8,
    pub itemset_id: u16,
    pub threshold: u8,
    pub spell_id: u32,
}
