use crate::modules::data::domain_value::DispelType;
use crate::modules::data::{tools::RetrieveDispelType, Data};

#[test]
fn get_dispel_type() {
    let mut data = Data::default();
    let dispel_type_id = 1;
    let dispel_type = DispelType {
        id: dispel_type_id,
        localization_id: 42,
        color: "abc".to_string(),
    };
    data.dispel_types.insert(dispel_type_id, dispel_type.clone());

    let dispel_type_res = data.get_dispel_type(dispel_type_id);
    assert!(dispel_type_res.is_some());
    let dispel_type_res = dispel_type_res.unwrap();
    assert_eq!(dispel_type_res, dispel_type);
    let no_dispel_type = data.get_dispel_type(0);
    assert!(no_dispel_type.is_none());
}

#[test]
fn get_all_dispel_types() {
    let data = Data::default();
    let dispel_types = data.get_all_dispel_types();
    assert!(dispel_types.is_empty());
}
