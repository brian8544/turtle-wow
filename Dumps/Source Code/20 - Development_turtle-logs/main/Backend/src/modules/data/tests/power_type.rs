use crate::modules::data::domain_value::PowerType;
use crate::modules::data::{tools::RetrievePowerType, Data};

#[test]
fn get_power_type() {
    let mut data = Data::default();
    let power_type_id = 1;
    let power_type = PowerType {
        id: power_type_id,
        localization_id: 213,
        color: "sdfs".to_string(),
    };
    data.power_types.insert(power_type_id, power_type.clone());

    let power_type_res = data.get_power_type(power_type_id);
    assert!(power_type_res.is_some());
    assert_eq!(power_type_res.unwrap(), power_type);
    let no_power_type = data.get_power_type(0);
    assert!(no_power_type.is_none());
}

#[test]
fn get_all_power_types() {
    let data = Data::default();
    let power_types = data.get_all_power_types();
    assert!(power_types.is_empty());
}
