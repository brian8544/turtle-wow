use crate::modules::data::domain_value::Gem;
use crate::modules::data::{tools::RetrieveGem, Data};
use std::collections::HashMap;

#[test]
fn get_gem() {
    let mut data = Data::default();
    let expansion_id = 2;
    let item_id = 22459;
    let gem = Gem {
        expansion_id,
        item_id,
        enchant_id: 232,
        flag: 1,
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(item_id, gem.clone());
    data.gems.push(hashmap);

    let gem_res = data.get_gem(expansion_id, item_id);
    assert!(gem_res.is_some());
    let gem_res = gem_res.unwrap();
    assert_eq!(gem_res, gem);
    let no_gem = data.get_gem(0, 0);
    assert!(no_gem.is_none());
}
