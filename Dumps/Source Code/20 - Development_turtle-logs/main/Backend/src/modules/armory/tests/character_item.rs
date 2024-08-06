use crate::modules::armory::dto::CharacterItemDto;
use crate::modules::armory::{
    tools::{CreateCharacterItem, GetCharacterItem},
    Armory,
};
use crate::tests::TestContainer;

#[test]
fn character_item() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    let armory = Armory::default();
    let character_item_dto = CharacterItemDto {
        item_id: 19019,
        random_property_id: Some(1023),
        enchant_id: Some(684),
        gem_ids: vec![None, None, None, None],
    };

    let character_item_res = armory.create_character_item(&mut conn, character_item_dto.clone());
    assert!(character_item_res.is_ok());

    let character_item = character_item_res.unwrap();
    assert!(character_item.compare_by_value(&character_item_dto));

    let character_item2_res = armory.get_character_item(&mut conn, character_item.id);
    assert!(character_item2_res.is_ok());

    let character_item2 = character_item2_res.unwrap();
    assert!(character_item2.deep_eq(&character_item));
}
