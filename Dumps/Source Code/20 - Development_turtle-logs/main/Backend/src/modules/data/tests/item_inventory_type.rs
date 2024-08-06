use crate::modules::data::domain_value::ItemInventoryType;
use crate::modules::data::{tools::RetrieveItemInventoryType, Data};

#[test]
fn get_item_inventory_type() {
    let mut data = Data::default();
    let item_inventory_type_id = 1;
    let item_inventory_type = ItemInventoryType {
        id: item_inventory_type_id,
        localization_id: 4224,
    };
    data.item_inventory_types.insert(item_inventory_type_id, item_inventory_type.clone());

    let item_inventory_type_res = data.get_item_inventory_type(item_inventory_type_id);
    assert!(item_inventory_type_res.is_some());
    assert_eq!(item_inventory_type_res.unwrap(), item_inventory_type);
    let no_item_inventory_type = data.get_item_inventory_type(0);
    assert!(no_item_inventory_type.is_none());
}

#[test]
fn get_all_item_inventory_types() {
    let data = Data::default();
    let item_inventory_types = data.get_all_item_inventory_types();
    assert!(item_inventory_types.is_empty());
}
