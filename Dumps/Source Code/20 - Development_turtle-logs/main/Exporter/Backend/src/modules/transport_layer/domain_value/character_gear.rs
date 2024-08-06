use crate::modules::transport_layer::CharacterItemDto;

#[derive(Debug, Clone, Serialize)]
pub struct CharacterGearDto {
    pub head: Option<CharacterItemDto>,
    pub neck: Option<CharacterItemDto>,
    pub shoulder: Option<CharacterItemDto>,
    pub back: Option<CharacterItemDto>,
    pub chest: Option<CharacterItemDto>,
    pub shirt: Option<CharacterItemDto>,
    pub tabard: Option<CharacterItemDto>,
    pub wrist: Option<CharacterItemDto>,
    pub main_hand: Option<CharacterItemDto>,
    pub off_hand: Option<CharacterItemDto>,
    pub ternary_hand: Option<CharacterItemDto>,
    pub glove: Option<CharacterItemDto>,
    pub belt: Option<CharacterItemDto>,
    pub leg: Option<CharacterItemDto>,
    pub boot: Option<CharacterItemDto>,
    pub ring1: Option<CharacterItemDto>,
    pub ring2: Option<CharacterItemDto>,
    pub trinket1: Option<CharacterItemDto>,
    pub trinket2: Option<CharacterItemDto>,
}
