use crate::modules::data::domain_value::ItemBonding;
use crate::modules::data::{tools::RetrieveItemBonding, Data};

#[test]
fn get_item_bonding() {
    let mut data = Data::default();
    let item_bonding_id = 1;
    let item_bonding = ItemBonding { id: item_bonding_id, localization_id: 2425 };
    data.item_bondings.insert(item_bonding_id, item_bonding.clone());

    let item_bonding_res = data.get_item_bonding(item_bonding_id);
    assert!(item_bonding_res.is_some());
    assert_eq!(item_bonding_res.unwrap(), item_bonding);
    let no_item_bonding = data.get_item_bonding(0);
    assert!(no_item_bonding.is_none());
}

#[test]
fn get_all_item_bondings() {
    let data = Data::default();
    let item_bondings = data.get_all_item_bondings();
    assert!(item_bondings.is_empty());
}
