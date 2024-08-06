use crate::modules::armory::dto::CharacterViewerItemDto;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterViewerGearDto {
    pub gear_id: u32,
    pub head: Option<CharacterViewerItemDto>,
    pub neck: Option<CharacterViewerItemDto>,
    pub shoulder: Option<CharacterViewerItemDto>,
    pub back: Option<CharacterViewerItemDto>,
    pub chest: Option<CharacterViewerItemDto>,
    pub shirt: Option<CharacterViewerItemDto>,
    pub tabard: Option<CharacterViewerItemDto>,
    pub wrist: Option<CharacterViewerItemDto>,
    pub main_hand: Option<CharacterViewerItemDto>,
    pub off_hand: Option<CharacterViewerItemDto>,
    pub ternary_hand: Option<CharacterViewerItemDto>,
    pub glove: Option<CharacterViewerItemDto>,
    pub belt: Option<CharacterViewerItemDto>,
    pub leg: Option<CharacterViewerItemDto>,
    pub boot: Option<CharacterViewerItemDto>,
    pub ring1: Option<CharacterViewerItemDto>,
    pub ring2: Option<CharacterViewerItemDto>,
    pub trinket1: Option<CharacterViewerItemDto>,
    pub trinket2: Option<CharacterViewerItemDto>,
}
