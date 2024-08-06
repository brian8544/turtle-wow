#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemInventoryType {
    pub id: u8,
    pub localization_id: u32,
}
