#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct BasicCharacter {
    pub id: u32,
    pub server_id: u32,
    pub hero_class_id: Option<u8>,
    pub race_id: Option<u8>,
    pub spec_id: Option<u8>,
    pub name: Option<String>,
}
