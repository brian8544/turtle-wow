use crate::modules::data::domain_value::ItemEffect;
use crate::modules::data::{tools::RetrieveItemEffect, Data};
use std::collections::HashMap;

#[test]
fn get_item_effect() {
    let mut data = Data::default();
    let expansion_id = 1;
    let item_id = 117;
    let item_effect = ItemEffect {
        id: 2342,
        expansion_id,
        item_id,
        spell_id: 1234,
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(item_id, vec![item_effect.clone()]);
    data.item_effects.push(hashmap);

    let item_effect_res = data.get_item_effect(expansion_id, item_id);
    assert!(item_effect_res.is_some());
    let unpacked_item_effect_vec = item_effect_res.unwrap();
    assert!(!unpacked_item_effect_vec.is_empty());
    assert_eq!(unpacked_item_effect_vec[0], item_effect);
    let no_item_effect = data.get_item_effect(0, 0);
    assert!(no_item_effect.is_none());
}
