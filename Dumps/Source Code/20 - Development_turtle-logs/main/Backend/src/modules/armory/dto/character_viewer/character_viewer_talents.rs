#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterViewerTalentsDto {
    pub icon: String,
    pub name: String,
    pub description: String,
}
