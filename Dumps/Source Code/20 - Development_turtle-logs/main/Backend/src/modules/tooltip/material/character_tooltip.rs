use crate::modules::tooltip::domain_value::{CharacterGuild, CharacterTooltipItem};

#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct CharacterTooltip {
    pub name: String,
    pub server: String,
    pub guild: Option<CharacterGuild>,
    pub faction: bool,
    pub hero_class_id: u8,
    pub expansion_id: u8,
    pub race_id: u8,
    pub gender: bool,
    pub level: u8,
    pub items: Vec<CharacterTooltipItem>,
}
