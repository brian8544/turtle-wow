#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct ItemDamageType {
    pub id: u8,
    pub localization_id: u32,
}
