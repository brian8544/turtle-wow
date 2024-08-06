#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Title {
    pub id: u16,
    pub localization_id: u32,
}
