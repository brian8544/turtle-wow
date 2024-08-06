use crate::modules::data::domain_value::ItemSheath;
use crate::modules::data::{tools::RetrieveItemSheath, Data};

#[test]
fn get_item_sheath() {
    let mut data = Data::default();
    let item_sheath_id = 1;
    let item_sheath = ItemSheath { id: item_sheath_id, localization_id: 2242 };
    data.item_sheaths.insert(item_sheath_id, item_sheath.clone());

    let item_sheath_res = data.get_item_sheath(item_sheath_id);
    assert!(item_sheath_res.is_some());
    assert_eq!(item_sheath_res.unwrap(), item_sheath);
    let no_item_sheath = data.get_item_sheath(0);
    assert!(no_item_sheath.is_none());
}

#[test]
fn get_all_item_sheaths() {
    let data = Data::default();
    let item_sheaths = data.get_all_item_sheaths();
    assert!(item_sheaths.is_empty());
}
