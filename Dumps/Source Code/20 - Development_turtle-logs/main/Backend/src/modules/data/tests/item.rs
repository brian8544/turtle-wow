use crate::modules::data::domain_value::Item;
use crate::modules::data::{tools::RetrieveItem, Data};
use std::collections::HashMap;

#[test]
fn get_item() {
    let mut data = Data::default();
    let expansion_id = 1;
    let item_id = 25;
    let item = Item {
        expansion_id,
        id: item_id,
        localization_id: 0,
        icon: 0,
        quality: 0,
        inventory_type: None,
        class_id: 0,
        required_level: None,
        bonding: None,
        sheath: None,
        itemset: None,
        max_durability: None,
        item_level: None,
        delay: None,
        display_info: None,
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(item_id, item.clone());
    data.items.push(hashmap);

    let item_res = data.get_item(expansion_id, item_id);
    assert!(item_res.is_some());
    assert_eq!(item_res.unwrap(), item);
    let no_item = data.get_item(0, 0);
    assert!(no_item.is_none());
}
