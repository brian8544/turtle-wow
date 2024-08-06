#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Localization {
    pub id: u32,
    pub language_id: u8,
    pub content: String,
}
