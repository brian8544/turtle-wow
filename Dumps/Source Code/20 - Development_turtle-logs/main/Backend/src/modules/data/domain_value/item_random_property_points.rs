#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemRandomPropertyPoints {
    pub item_level: u16,
    pub expansion_id: u8,
    pub epic: [u16; 5],
    pub rare: [u16; 5],
    pub good: [u16; 5],
}
