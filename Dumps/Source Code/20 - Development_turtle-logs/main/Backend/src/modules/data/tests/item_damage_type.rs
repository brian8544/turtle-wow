use crate::modules::data::domain_value::ItemDamageType;
use crate::modules::data::{tools::RetrieveItemDamageType, Data};

#[test]
fn get_item_damage_type() {
    let mut data = Data::default();
    let item_damage_type_id = 1;
    let item_damage_type = ItemDamageType {
        id: item_damage_type_id,
        localization_id: 5353,
    };
    data.item_damage_types.insert(item_damage_type_id, item_damage_type.clone());

    let item_damage_type_res = data.get_item_damage_type(item_damage_type_id);
    assert!(item_damage_type_res.is_some());
    assert_eq!(item_damage_type_res.unwrap(), item_damage_type);
    let no_item_damage_type = data.get_item_damage_type(0);
    assert!(no_item_damage_type.is_none());
}

#[test]
fn get_all_item_damage_types() {
    let data = Data::default();
    let item_damage_types = data.get_all_item_damage_types();
    assert!(item_damage_types.is_empty());
}
