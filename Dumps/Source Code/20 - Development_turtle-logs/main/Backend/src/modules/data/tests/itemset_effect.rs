use crate::modules::data::domain_value::ItemsetEffect;
use crate::modules::data::{tools::RetrieveItemsetEffect, Data};
use std::collections::HashMap;

#[test]
fn get_itemset_effects() {
    let mut data = Data::default();
    let expansion_id = 1;
    let itemset_id = 1;
    let itemset_effect = ItemsetEffect {
        id: 134,
        expansion_id,
        itemset_id,
        threshold: 23,
        spell_id: 145,
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(itemset_id, vec![itemset_effect.clone()]);
    data.itemset_effects.push(hashmap);

    let itemset_effects = data.get_itemset_effects(expansion_id, itemset_id);
    assert!(itemset_effects.is_some());
    let itemset_effects_vec = itemset_effects.unwrap();
    assert!(!itemset_effects_vec.is_empty());
    assert_eq!(itemset_effects_vec[0], itemset_effect);
    let no_itemset_effects = data.get_itemset_effects(0, 0);
    assert!(no_itemset_effects.is_none());
}
