use crate::modules::armory::domain_value::InventoryType;
use crate::modules::armory::{
    domain_value::CharacterItem,
    dto::{CharacterGearDto, CharacterItemDto},
};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterGear {
    pub id: u32,
    pub head: Option<CharacterItem>,
    pub neck: Option<CharacterItem>,
    pub shoulder: Option<CharacterItem>,
    pub back: Option<CharacterItem>,
    pub chest: Option<CharacterItem>,
    pub shirt: Option<CharacterItem>,
    pub tabard: Option<CharacterItem>,
    pub wrist: Option<CharacterItem>,
    pub main_hand: Option<CharacterItem>,
    pub off_hand: Option<CharacterItem>,
    pub ternary_hand: Option<CharacterItem>,
    pub glove: Option<CharacterItem>,
    pub belt: Option<CharacterItem>,
    pub leg: Option<CharacterItem>,
    pub boot: Option<CharacterItem>,
    pub ring1: Option<CharacterItem>,
    pub ring2: Option<CharacterItem>,
    pub trinket1: Option<CharacterItem>,
    pub trinket2: Option<CharacterItem>,
}

pub struct CharacterGearIterator {
    pub inventory_type: InventoryType,
    pub character_gear: CharacterGear,
}

impl CharacterGear {
    pub fn first_iter(&self) -> CharacterGearIterator {
        CharacterGearIterator {
            inventory_type: InventoryType::Head,
            character_gear: self.clone(),
        }
    }
}

impl Iterator for CharacterGearIterator {
    type Item = (InventoryType, CharacterItem);

    fn next(&mut self) -> Option<Self::Item> {
        self.inventory_type = InventoryType::from_u8(self.inventory_type as u8 + 1);
        if self.inventory_type == InventoryType::FirstBag {
            return None;
        }

        let result = match &self.inventory_type {
            InventoryType::Head => self.character_gear.head.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Neck => self.character_gear.neck.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Shoulder => self.character_gear.shoulder.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Back => self.character_gear.back.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Chest => self.character_gear.chest.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Shirt => self.character_gear.shirt.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Tabard => self.character_gear.tabard.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Wrist => self.character_gear.wrist.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::MainHand => self.character_gear.main_hand.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::OffHand => self.character_gear.off_hand.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Ranged => self.character_gear.ternary_hand.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Hands => self.character_gear.glove.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Waist => self.character_gear.belt.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Legs => self.character_gear.leg.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Feet => self.character_gear.boot.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Finger1 => self.character_gear.ring1.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Finger2 => self.character_gear.ring2.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Trinket1 => self.character_gear.trinket1.as_ref().map(|item| (self.inventory_type, item.clone())),
            InventoryType::Trinket2 => self.character_gear.trinket2.as_ref().map(|item| (self.inventory_type, item.clone())),
            _ => None,
        };

        if result.is_none() {
            return self.next();
        }
        result
    }
}

impl PartialEq for CharacterGear {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl CharacterGear {
    pub fn deep_eq(&self, other: &Self) -> bool {
        self.id == other.id
            && self.head.is_eq(&other.head)
            && self.neck.is_eq(&other.neck)
            && self.shoulder.is_eq(&other.shoulder)
            && self.back.is_eq(&other.back)
            && self.chest.is_eq(&other.chest)
            && self.shirt.is_eq(&other.shirt)
            && self.tabard.is_eq(&other.tabard)
            && self.wrist.is_eq(&other.wrist)
            && self.main_hand.is_eq(&other.main_hand)
            && self.off_hand.is_eq(&other.off_hand)
            && self.ternary_hand.is_eq(&other.ternary_hand)
            && self.glove.is_eq(&other.glove)
            && self.belt.is_eq(&other.belt)
            && self.leg.is_eq(&other.leg)
            && self.boot.is_eq(&other.boot)
            && self.ring1.is_eq(&other.ring1)
            && self.ring2.is_eq(&other.ring2)
            && self.trinket1.is_eq(&other.trinket1)
            && self.trinket2.is_eq(&other.trinket2)
    }

    pub fn compare_by_value(&self, other: &CharacterGearDto) -> bool {
        self.head.is_eq_by_value(&other.head)
            && self.neck.is_eq_by_value(&other.neck)
            && self.shoulder.is_eq_by_value(&other.shoulder)
            && self.back.is_eq_by_value(&other.back)
            && self.chest.is_eq_by_value(&other.chest)
            && self.shirt.is_eq_by_value(&other.shirt)
            && self.tabard.is_eq_by_value(&other.tabard)
            && self.wrist.is_eq_by_value(&other.wrist)
            && self.main_hand.is_eq_by_value(&other.main_hand)
            && self.off_hand.is_eq_by_value(&other.off_hand)
            && self.ternary_hand.is_eq_by_value(&other.ternary_hand)
            && self.glove.is_eq_by_value(&other.glove)
            && self.belt.is_eq_by_value(&other.belt)
            && self.leg.is_eq_by_value(&other.leg)
            && self.boot.is_eq_by_value(&other.boot)
            && self.ring1.is_eq_by_value(&other.ring1)
            && self.ring2.is_eq_by_value(&other.ring2)
            && self.trinket1.is_eq_by_value(&other.trinket1)
            && self.trinket2.is_eq_by_value(&other.trinket2)
    }
}

trait EqByValue {
    fn is_eq_by_value(&self, other: &Option<CharacterItemDto>) -> bool;
    fn is_eq(&self, other: &Option<CharacterItem>) -> bool;
}

impl EqByValue for Option<CharacterItem> {
    fn is_eq_by_value(&self, other: &Option<CharacterItemDto>) -> bool {
        (self.is_some() && other.is_some() && self.as_ref().unwrap().compare_by_value(other.as_ref().unwrap())) || (self.is_none() && other.is_none())
    }

    fn is_eq(&self, other: &Option<CharacterItem>) -> bool {
        (self.is_none() && other.is_none()) || (self.is_some() && other.is_some() && self.as_ref().unwrap().deep_eq(other.as_ref().unwrap()))
    }
}
