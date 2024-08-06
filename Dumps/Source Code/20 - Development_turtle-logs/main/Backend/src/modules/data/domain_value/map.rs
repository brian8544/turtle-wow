#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Map {
    pub id: u16,
    pub localization_id: u32,
    pub icon: String,
    pub map_type: u8,
}
