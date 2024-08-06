#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct CharacterGuild {
    pub name: String,
    pub rank: String,
}
