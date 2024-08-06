use crate::modules::data::domain_value::ItemsetName;
use crate::modules::data::{tools::RetrieveItemsetName, Data};
use std::collections::HashMap;

#[test]
fn get_itemset_name() {
    let mut data = Data::default();
    let expansion_id = 1;
    let itemset_id = 1;
    let itemset_name = ItemsetName {
        expansion_id,
        id: itemset_id,
        localization_id: 23423,
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(itemset_id, itemset_name.clone());
    data.itemset_names.push(hashmap);

    let itemset_name_res = data.get_itemset_name(expansion_id, itemset_id);
    assert!(itemset_name_res.is_some());
    assert_eq!(itemset_name_res.unwrap(), itemset_name);
    let no_itemset_name = data.get_itemset_name(0, 0);
    assert!(no_itemset_name.is_none());
}
