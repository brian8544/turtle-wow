use crate::modules::data::domain_value::ItemDamage;
use crate::modules::data::{tools::RetrieveItemDamage, Data};
use std::collections::HashMap;

#[test]
fn get_item_damage() {
    let mut data = Data::default();
    let expansion_id = 1;
    let item_id = 25;
    let item_damage = ItemDamage {
        id: 432,
        expansion_id,
        item_id,
        dmg_type: None,
        dmg_min: 12,
        dmg_max: 234,
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(item_id, vec![item_damage.clone()]);
    data.item_damages.push(hashmap);

    let item_damage_res_vec = data.get_item_damage(expansion_id, item_id);
    assert!(item_damage_res_vec.is_some());
    let item_damage_res_vec = item_damage_res_vec.unwrap();
    assert!(!item_damage_res_vec.is_empty());
    assert_eq!(item_damage_res_vec[0], item_damage);
    let no_item_damage = data.get_item_damage(0, 0);
    assert!(no_item_damage.is_none());
}
