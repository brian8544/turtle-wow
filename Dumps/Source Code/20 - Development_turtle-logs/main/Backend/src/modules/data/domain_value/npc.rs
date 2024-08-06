#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct NPC {
    pub expansion_id: u8,
    pub id: u32,
    pub localization_id: u32,
    pub is_boss: bool,
    pub friend: u8,
    pub family: u8,
    pub map_id: Option<u16>,
}
