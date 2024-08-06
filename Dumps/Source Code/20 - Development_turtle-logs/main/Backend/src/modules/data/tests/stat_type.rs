use crate::modules::data::domain_value::StatType;
use crate::modules::data::{tools::RetrieveStatType, Data};

#[test]
fn get_stat_type() {
    let mut data = Data::default();
    let stat_type_id = 1;
    let stat_type = StatType { id: stat_type_id, localization_id: 23423 };
    data.stat_types.insert(stat_type_id, stat_type.clone());

    let stat_type_res = data.get_stat_type(stat_type_id);
    assert!(stat_type_res.is_some());
    assert_eq!(stat_type_res.unwrap(), stat_type);
    let no_stat_type = data.get_stat_type(0);
    assert!(no_stat_type.is_none());
}

#[test]
fn get_all_stat_types() {
    let data = Data::default();
    let stat_types = data.get_all_stat_types();
    assert!(stat_types.is_empty());
}
