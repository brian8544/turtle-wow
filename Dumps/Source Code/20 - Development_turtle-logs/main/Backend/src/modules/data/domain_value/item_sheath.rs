#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemSheath {
    pub id: u8,
    pub localization_id: u32,
}
