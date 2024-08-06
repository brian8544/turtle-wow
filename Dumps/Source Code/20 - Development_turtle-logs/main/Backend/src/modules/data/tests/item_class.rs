use crate::modules::data::domain_value::ItemClass;
use crate::modules::data::{tools::RetrieveItemClass, Data};

#[test]
fn get_item_class() {
    let mut data = Data::default();
    let item_class_id = 1;
    let item_class = ItemClass {
        id: item_class_id,
        item_class: 23,
        item_sub_class: 1,
        localization_id: 53,
    };
    data.item_classes.insert(item_class_id, item_class.clone());

    let item_class_res = data.get_item_class(item_class_id);
    assert!(item_class_res.is_some());
    assert_eq!(item_class_res.unwrap(), item_class);
    let no_item_class = data.get_item_class(0);
    assert!(no_item_class.is_none());
}

#[test]
fn get_all_item_classes() {
    let data = Data::default();
    let item_classs = data.get_all_item_classes();
    assert!(item_classs.is_empty());
}
