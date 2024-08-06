#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct BasicSpell {
    pub id: u32,
    pub icon: String,
    pub school: u16,
}
