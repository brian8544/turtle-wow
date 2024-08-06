#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Profession {
    pub id: u16,
    pub localization_id: u32,
    pub icon: u16,
}
