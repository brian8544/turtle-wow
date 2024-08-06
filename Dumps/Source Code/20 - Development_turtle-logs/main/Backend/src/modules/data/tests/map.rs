use crate::modules::data::domain_value::Map;
use crate::modules::data::{tools::RetrieveMap, Data};

#[test]
fn get_map() {
    let mut data = Data::default();
    let map_id = 1;
    let map = Map {
        id: map_id,
        localization_id: 3242,
        map_type: 1,
        icon: "".to_string(),
    };
    data.maps.insert(map_id, map.clone());

    let map_res = data.get_map(map_id);
    assert!(map_res.is_some());
    assert_eq!(map_res.unwrap(), map);
    let no_map = data.get_map(0);
    assert!(no_map.is_none());
}

#[test]
fn get_all_maps() {
    let data = Data::default();
    let maps = data.get_all_maps();
    assert!(maps.is_empty());
}
