#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Encounter {
    pub id: u32,
    pub localization_id: u32,
    pub map_id: u16,
    pub retail_id: Option<u32>,
}
