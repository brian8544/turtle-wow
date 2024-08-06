use crate::modules::data::domain_value::Difficulty;
use crate::modules::data::{tools::RetrieveDifficulty, Data};

#[test]
fn get_difficulty() {
    let mut data = Data::default();
    let difficulty_id = 1;
    let difficulty = Difficulty {
        id: difficulty_id,
        localization_id: 3242,
        icon: "".to_string(),
    };
    data.difficulties.insert(difficulty_id, difficulty.clone());

    let difficulty_res = data.get_difficulty(difficulty_id);
    assert!(difficulty_res.is_some());
    assert_eq!(difficulty_res.unwrap(), difficulty);
    let no_difficulty = data.get_difficulty(0);
    assert!(no_difficulty.is_none());
}

#[test]
fn get_all_difficulties() {
    let data = Data::default();
    let difficulties = data.get_all_difficulties();
    assert!(difficulties.is_empty());
}
