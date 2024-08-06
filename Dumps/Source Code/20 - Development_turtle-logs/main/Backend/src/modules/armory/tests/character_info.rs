use super::helper::get_character_info;
use crate::modules::armory::{
    tools::{CreateCharacterInfo, GetCharacterInfo},
    Armory,
};
use crate::tests::TestContainer;

#[test]
fn character_info() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    let armory = Armory::default();
    let character_info_dto = get_character_info();

    let character_info_res = armory.create_character_info(&mut conn, character_info_dto.clone());
    assert!(character_info_res.is_ok());

    let character_info = character_info_res.unwrap();
    assert!(character_info.compare_by_value(&character_info_dto));

    let character_info_res2 = armory.get_character_info(&mut conn, character_info.id);
    assert!(character_info_res2.is_ok());

    let character_info2 = character_info_res2.unwrap();
    assert!(character_info2.deep_eq(&character_info));
}
