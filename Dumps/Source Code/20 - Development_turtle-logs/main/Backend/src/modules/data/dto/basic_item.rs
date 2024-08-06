#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct BasicItem {
    pub id: u32,
    pub icon: String,
    pub quality: u8,
}
