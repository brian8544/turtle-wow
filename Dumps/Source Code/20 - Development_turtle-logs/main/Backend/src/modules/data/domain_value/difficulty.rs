#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Difficulty {
    pub id: u8,
    pub localization_id: u32,
    pub icon: String,
}
