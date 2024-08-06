use super::get_character_item::get_character_item;
use crate::modules::armory::dto::CharacterGearDto;

pub fn get_character_gear() -> CharacterGearDto {
    CharacterGearDto {
        head: Some(get_character_item(44408)),
        neck: Some(get_character_item(40427)),
        shoulder: Some(get_character_item(39310)),
        back: Some(get_character_item(39415)),
        chest: Some(get_character_item(40526)),
        shirt: None,
        tabard: None,
        wrist: Some(get_character_item(41907)),
        main_hand: Some(get_character_item(39271)),
        off_hand: Some(get_character_item(40698)),
        ternary_hand: Some(get_character_item(37038)),
        glove: Some(get_character_item(39192)),
        belt: Some(get_character_item(39735)),
        leg: Some(get_character_item(37189)),
        boot: Some(get_character_item(39723)),
        ring1: Some(get_character_item(42110)),
        ring2: Some(get_character_item(37232)),
        trinket1: Some(get_character_item(40682)),
        trinket2: Some(get_character_item(37873)),
    }
}
