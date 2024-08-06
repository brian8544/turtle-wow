use crate::modules::data::domain_value::ItemRandomProperty;
use crate::modules::data::{tools::RetrieveItemRandomProperty, Data};
use std::collections::HashMap;

#[test]
fn get_item_random_property() {
    let mut data = Data::default();
    let expansion_id = 1;
    let item_random_property_id = 5;
    let item_random_property = ItemRandomProperty {
        expansion_id,
        id: item_random_property_id,
        localization_id: 23,
        enchant_ids: vec![],
        scaling_coefficients: vec![],
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(item_random_property_id, item_random_property.clone());
    data.item_random_properties.push(hashmap);

    let item_random_property_res = data.get_item_random_property(expansion_id, item_random_property_id);
    assert!(item_random_property_res.is_some());
    assert_eq!(item_random_property_res.unwrap(), item_random_property);
    let no_item_random_property = data.get_item_random_property(0, 0);
    assert!(no_item_random_property.is_none());
}
