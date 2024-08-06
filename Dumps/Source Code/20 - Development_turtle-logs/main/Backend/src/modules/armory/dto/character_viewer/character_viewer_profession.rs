#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterViewerProfessionDto {
    pub icon: String,
    pub name: String,
    pub points: u16,
    pub point_max: u16,
}
