use crate::{dto::CheckPlausability, modules::armory::dto::CharacterItemDto};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
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

impl CheckPlausability for CharacterGearDto {
    fn is_plausible(&self) -> bool {
        self.head.is_plausible()
            && self.neck.is_plausible()
            && self.shoulder.is_plausible()
            && self.back.is_plausible()
            && self.chest.is_plausible()
            && self.shirt.is_plausible()
            && self.tabard.is_plausible()
            && self.wrist.is_plausible()
            && self.main_hand.is_plausible()
            && self.off_hand.is_plausible()
            && self.ternary_hand.is_plausible()
            && self.glove.is_plausible()
            && self.belt.is_plausible()
            && self.leg.is_plausible()
            && self.boot.is_plausible()
            && self.ring1.is_plausible()
            && self.ring2.is_plausible()
            && self.trinket1.is_plausible()
            && self.trinket2.is_plausible()
    }
}

impl CheckPlausability for Option<CharacterItemDto> {
    fn is_plausible(&self) -> bool {
        self.is_none() || self.as_ref().unwrap().is_plausible()
    }
}

impl Default for CharacterGearDto {
    fn default() -> Self {
        CharacterGearDto {
            head: None,
            neck: None,
            shoulder: None,
            back: None,
            chest: None,
            shirt: None,
            tabard: None,
            wrist: None,
            main_hand: None,
            off_hand: None,
            ternary_hand: None,
            glove: None,
            belt: None,
            leg: None,
            boot: None,
            ring1: None,
            ring2: None,
            trinket1: None,
            trinket2: None,
        }
    }
}

impl CharacterGearDto {
    pub fn is_naked(&self) -> bool {
        self.head.is_none()
            && self.neck.is_none()
            && self.shoulder.is_none()
            && self.back.is_none()
            && self.chest.is_none()
            && self.shirt.is_none()
            && self.tabard.is_none()
            && self.wrist.is_none()
            && self.main_hand.is_none()
            && self.off_hand.is_none()
            && self.ternary_hand.is_none()
            && self.glove.is_none()
            && self.belt.is_none()
            && self.leg.is_none()
            && self.boot.is_none()
            && self.ring1.is_none()
            && self.ring2.is_none()
            && self.trinket1.is_none()
            && self.trinket2.is_none()
    }
}
