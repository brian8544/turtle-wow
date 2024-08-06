use super::helper::get_character;
use crate::modules::armory::{
    tools::{DeleteCharacter, GetCharacter, SetCharacter},
    Armory,
};
use crate::tests::TestContainer;
use std::{thread, time};

#[test]
fn set_character() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    let armory = Armory::default();
    let character_dto = get_character();
    let timestamp = time_util::now() * 1000;

    let set_character_res = armory.set_character(&mut conn, 3, character_dto.clone(), timestamp);
    assert!(set_character_res.is_ok());

    let set_character = set_character_res.unwrap();
    assert!(set_character.compare_by_value(&character_dto));

    let character_res = armory.get_character(set_character.id);
    assert!(character_res.is_some());

    let character = character_res.unwrap();
    assert!(character.deep_eq(&set_character));

    // Sleeping 2 seconds in order to cause an timestamp update in the DB
    thread::sleep(time::Duration::from_secs(2));
    let set_character_res2 = armory.set_character(&mut conn, 3, character_dto, timestamp);
    assert!(set_character_res2.is_ok());

    let set_character2 = set_character_res2.unwrap();
    assert!(set_character2.last_update.as_ref().unwrap().timestamp >= set_character.last_update.as_ref().unwrap().timestamp + 2);

    let character_res2 = armory.get_character(set_character2.id);
    assert!(character_res2.is_some());

    let character2 = character_res2.unwrap();
    assert!(character2.deep_eq(&set_character2));

    // Deleting the character
    let delete_result = armory.delete_character(&mut conn, character.id);
    assert!(delete_result.is_ok());

    // Check if it was actually deleted
    let character_res3 = armory.get_character(character.id);
    assert!(character_res3.is_none());
}
