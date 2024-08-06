#[derive(Debug, Clone, Serialize, JsonSchema, PartialEq)]
pub struct Server {
    pub id: u32,
    pub expansion_id: u8,
    pub name: String,
    pub owner: Option<u32>,
    pub patch: String,
    pub retail_id: Option<u32>,
    pub archived: bool
}
