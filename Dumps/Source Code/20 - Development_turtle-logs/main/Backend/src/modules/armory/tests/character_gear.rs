use super::helper::get_character_gear;
use crate::modules::armory::{
    tools::{CreateCharacterGear, GetCharacterGear},
    Armory,
};
use crate::tests::TestContainer;
use crate::util::database::MockSelect;

#[test]
fn character_gear() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    let armory = Armory::default();
    let character_gear_dto = get_character_gear();

    let character_gear_res = armory.create_character_gear(&mut conn, character_gear_dto.clone());
    assert!(character_gear_res.is_ok());

    let character_gear = character_gear_res.unwrap();
    assert!(character_gear.compare_by_value(&character_gear_dto));

    let character_gear_res2 = armory.get_character_gear(&mut conn, character_gear.id);
    assert!(character_gear_res2.is_ok());

    let character_gear2 = character_gear_res2.unwrap();
    assert!(character_gear2.deep_eq(&character_gear));
}

#[test]
fn test_get_character_gear_character_err() {
    let mut mock = MockSelect::new();
    mock.expect_select_wparams_value::<crate::mysql::Row>().return_const(None);

    let armory = Armory::default();
    let character_gear = armory.get_character_gear(&mut mock, 42);
    assert!(character_gear.is_err());
}
