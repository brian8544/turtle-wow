#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Language {
    pub id: u8,
    pub name: String,
    pub short_code: String,
}
