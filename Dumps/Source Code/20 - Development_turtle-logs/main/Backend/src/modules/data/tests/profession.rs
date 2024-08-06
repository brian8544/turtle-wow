use crate::modules::data::domain_value::Profession;
use crate::modules::data::{tools::RetrieveProfession, Data};

#[test]
fn get_profession() {
    let mut data = Data::default();
    let profession_id = 182;
    let profession = Profession {
        id: profession_id,
        localization_id: 24423,
        icon: 12,
    };
    data.professions.insert(profession_id, profession.clone());

    let profession_res = data.get_profession(profession_id);
    assert!(profession_res.is_some());
    assert_eq!(profession_res.unwrap(), profession);
    let no_profession = data.get_profession(0);
    assert!(no_profession.is_none());
}

#[test]
fn get_all_professions() {
    let data = Data::default();
    let professions = data.get_all_professions();
    assert!(professions.is_empty());
}
