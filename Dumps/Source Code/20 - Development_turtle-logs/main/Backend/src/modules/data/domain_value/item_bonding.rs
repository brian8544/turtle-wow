#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemBonding {
    pub id: u8,
    pub localization_id: u32,
}
