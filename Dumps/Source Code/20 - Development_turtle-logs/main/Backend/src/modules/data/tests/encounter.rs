use crate::modules::data::domain_value::Encounter;
use crate::modules::data::{tools::RetrieveEncounter, Data};

#[test]
fn get_encounter() {
    let mut data = Data::default();
    let encounter_id = 1;
    let encounter = Encounter {
        id: encounter_id,
        localization_id: 422,
        map_id: 32,
        retail_id: None,
    };
    data.encounters.insert(encounter_id, encounter.clone());

    let encounter_res = data.get_encounter(encounter_id);
    assert!(encounter_res.is_some());
    assert_eq!(encounter_res.unwrap(), encounter);
    let no_encounter = data.get_encounter(0);
    assert!(no_encounter.is_none());
}

#[test]
fn get_all_encounters() {
    let data = Data::default();
    let encounters = data.get_all_encounters();
    assert!(encounters.is_empty());
}
