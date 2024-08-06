#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Addon {
    pub id: u32,
    pub expansion_id: u8,
    pub addon_name: String,
    pub addon_desc: String,
    pub url_name: String
}