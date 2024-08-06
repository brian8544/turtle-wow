use crate::modules::armory::dto::CharacterItemDto;

pub fn get_character_item(item_id: u32) -> CharacterItemDto {
    CharacterItemDto {
        item_id,
        random_property_id: None,
        enchant_id: None,
        gem_ids: vec![None, None, None, None],
    }
}
