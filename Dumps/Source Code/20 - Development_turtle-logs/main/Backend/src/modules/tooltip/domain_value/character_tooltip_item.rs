#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct CharacterTooltipItem {
    pub name: String,
    pub quality: u8,
}
