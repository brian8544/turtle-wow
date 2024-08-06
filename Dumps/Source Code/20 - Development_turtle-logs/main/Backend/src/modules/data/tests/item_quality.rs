use crate::modules::data::domain_value::ItemQuality;
use crate::modules::data::{tools::RetrieveItemQuality, Data};

#[test]
fn get_item_quality() {
    let mut data = Data::default();
    let item_quality_id = 1;
    let item_quality = ItemQuality {
        id: item_quality_id,
        localization_id: 22424,
        color: "sfd".to_string(),
    };
    data.item_qualities.insert(item_quality_id, item_quality.clone());

    let item_quality_res = data.get_item_quality(item_quality_id);
    assert!(item_quality_res.is_some());
    assert_eq!(item_quality_res.unwrap(), item_quality);
    let no_item_quality = data.get_item_quality(0);
    assert!(no_item_quality.is_none());
}

#[test]
fn get_all_item_qualities() {
    let data = Data::default();
    let item_qualities = data.get_all_item_qualities();
    assert!(item_qualities.is_empty());
}
