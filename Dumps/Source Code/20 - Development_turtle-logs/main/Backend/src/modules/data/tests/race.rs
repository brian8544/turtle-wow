use crate::modules::data::domain_value::Race;
use crate::modules::data::{tools::RetrieveRace, Data};

#[test]
fn get_race() {
    let mut data = Data::default();
    let race_id = 1;
    let race = Race {
        id: race_id,
        localization_id: 3242,
        faction: false,
    };
    data.races.insert(race_id, race.clone());

    let race_res = data.get_race(race_id);
    assert!(race_res.is_some());
    assert_eq!(race_res.unwrap(), race);
    let no_race = data.get_race(0);
    assert!(no_race.is_none());
}

#[test]
fn get_all_races() {
    let data = Data::default();
    let races = data.get_all_races();
    assert!(races.is_empty());
}
