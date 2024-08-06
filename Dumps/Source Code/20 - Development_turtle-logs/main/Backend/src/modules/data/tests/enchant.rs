use crate::modules::data::domain_value::Enchant;
use crate::modules::data::{tools::RetrieveEnchant, Data};
use std::collections::HashMap;

#[test]
fn get_enchant() {
    let mut data = Data::default();
    let expansion_id = 1;
    let enchant_id = 1;
    let enchant = Enchant {
        expansion_id,
        id: enchant_id,
        localization_id: 23,
        stats: vec![],
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(enchant_id, enchant.clone());
    data.enchants.push(hashmap);

    let enchant_res = data.get_enchant(expansion_id, enchant_id);
    assert!(enchant_res.is_some());
    let enchant_res = enchant_res.unwrap();
    assert_eq!(enchant_res, enchant);
    let no_enchant = data.get_enchant(0, 0);
    assert!(no_enchant.is_none());
}
