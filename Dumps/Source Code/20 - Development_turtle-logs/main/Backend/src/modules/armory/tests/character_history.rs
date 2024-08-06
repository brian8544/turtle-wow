use super::helper::get_character_history;
use crate::modules::armory::dto::{ArmoryFailure, CharacterDto};
use crate::modules::armory::{
    tools::{DeleteCharacterHistory, GetCharacterHistory, SetCharacter, SetCharacterHistory},
    Armory,
};
use crate::tests::TestContainer;
use crate::util::database::{Execute, Select};
use rocket_contrib::databases::mysql::{Row, Value};
use std::{thread, time};

#[test]
fn set_character_history() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    let armory = Armory::default();
    let character_dto = CharacterDto { server_uid: 123124, character_history: None };
    let character_history_dto = get_character_history();
    let timestamp = time_util::now() * 1000;

    let set_character_res = armory.set_character(&mut conn, 3, character_dto.clone(), timestamp);
    assert!(set_character_res.is_ok());

    let set_character = set_character_res.unwrap();
    assert!(set_character.compare_by_value(&character_dto));

    let set_character_history_res = armory.set_character_history(&mut conn, 3, character_history_dto.clone(), set_character.server_uid, timestamp);
    assert!(set_character_history_res.is_ok());

    let set_character_history = set_character_history_res.unwrap();
    assert!(set_character_history.compare_by_value(&character_history_dto));

    let character_history_res = armory.get_character_history(&mut conn, set_character_history.id);
    assert!(character_history_res.is_ok());

    let character_history = character_history_res.unwrap();
    assert!(character_history.deep_eq(&set_character_history));

    // Sleeping 2 seconds in order to cause an timestamp update in the DB
    thread::sleep(time::Duration::from_millis(2000));
    let set_character_history_res2 = armory.set_character_history(&mut conn, 3, character_history_dto, set_character.server_uid, timestamp);
    assert!(set_character_history_res2.is_ok());

    let set_character_history2 = set_character_history_res2.unwrap();
    assert!(set_character_history2.timestamp >= set_character_history.timestamp + 2);

    let character_history_res2 = armory.get_character_history(&mut conn, set_character_history2.id);
    assert!(character_history_res2.is_ok());

    let character_history2 = character_history_res2.unwrap();
    assert!(character_history2.deep_eq(&set_character_history2));

    let delete_character_history = armory.delete_character_history(&mut conn, character_history.id);
    assert!(delete_character_history.is_ok());

    let character_history_res3 = armory.get_character_history(&mut conn, character_history.id);
    assert!(character_history_res3.is_err());
}

#[test]
fn test_set_character_history_character_history_dto_inplausible() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    // Arrange
    let armory = Armory::default();
    let character_dto = CharacterDto { server_uid: 123124, character_history: None };
    let mut character_history_dto = get_character_history();
    let timestamp = time_util::now() * 1000;
    character_history_dto.character_name = String::from("");

    // Act
    let set_character_res = armory.set_character(&mut conn, 3, character_dto, timestamp);
    assert!(set_character_res.is_ok());
    let set_character = set_character_res.unwrap();

    let set_character_history_res = armory.set_character_history(&mut conn, 3, character_history_dto, set_character.server_uid, timestamp);

    // Assert
    assert!(set_character_history_res.is_err());
    assert_eq!(set_character_history_res.err().unwrap(), ArmoryFailure::ImplausibleInput)
}

#[test]
fn test_set_character_history_update_not_successful() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    struct DbMock;
    impl Execute for DbMock {
        fn execute_one(&mut self, _query_str: &str) -> bool {
            unimplemented!()
        }

        fn execute_wparams(&mut self, _query_str: &str, _params: Vec<(String, Value)>) -> bool {
            false
        }

        fn execute_batch_wparams<T: 'static, F: 'static + (Fn(T) -> std::vec::Vec<(std::string::String, Value)>)>(&mut self, _query_str: &str, _params: Vec<T>, _params_process: F) -> bool {
            unimplemented!()
        }
    }
    impl Select for DbMock {
        fn select<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, _query_str: &str, _process_row: F) -> Vec<T> {
            unimplemented!()
        }

        fn select_wparams<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, _query_str: &str, _process_row: F, _params: Vec<(String, Value)>) -> Vec<T> {
            unimplemented!()
        }

        fn select_value<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, _query_str: &str, _process_row: F) -> Option<T> {
            unimplemented!()
        }

        fn select_wparams_value<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, _query_str: &str, _process_row: F, _params: Vec<(String, Value)>) -> Option<T> {
            unimplemented!()
        }
    }

    // Arrange
    let armory = Armory::default();
    let mut db_mock = DbMock {};
    let character_dto = CharacterDto { server_uid: 123124, character_history: None };
    let mut character_history_dto = get_character_history();
    let timestamp = time_util::now() * 1000;
    character_history_dto.character_guild = None;

    // Act + Assert
    let set_character_res = armory.set_character(&mut conn, 3, character_dto, timestamp);
    assert!(set_character_res.is_ok());
    let set_character = set_character_res.unwrap();

    let set_character_history_res = armory.set_character_history(&mut conn, 3, character_history_dto.clone(), set_character.server_uid, timestamp);
    assert!(set_character_history_res.is_ok());
    thread::sleep(time::Duration::from_millis(2000));

    let set_character_history_res = armory.set_character_history(&mut db_mock, 3, character_history_dto, set_character.server_uid, timestamp);

    assert!(set_character_history_res.is_err());
    assert!(match set_character_history_res.err().unwrap() {
        ArmoryFailure::Database(location) => location.contains("set_character_history"),
        _ => false,
    });
}

#[test]
fn test_set_character_history_different_value() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    // Arrange
    let armory = Armory::default();
    let character_dto = CharacterDto { server_uid: 123124, character_history: None };
    let mut character_history_dto = get_character_history();
    let timestamp = time_util::now() * 1000;

    // Act + Assert
    let set_character_res = armory.set_character(&mut conn, 3, character_dto, timestamp);
    assert!(set_character_res.is_ok());
    let set_character = set_character_res.unwrap();

    let set_character_history_res = armory.set_character_history(&mut conn, 3, character_history_dto.clone(), set_character.server_uid, timestamp);
    assert!(set_character_history_res.is_ok());
    character_history_dto.character_guild = None;

    let set_character_history_res = armory.set_character_history(&mut conn, 3, character_history_dto, set_character.server_uid, timestamp);
    assert!(set_character_history_res.is_ok());

    let set_character_history = set_character_history_res.unwrap();
    assert!(set_character_history.character_guild.is_none());
}
