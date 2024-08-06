#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemSocket {
    pub expansion_id: u8,
    pub item_id: u32,
    pub bonus: u32,
    pub slots: Vec<u8>,
}
