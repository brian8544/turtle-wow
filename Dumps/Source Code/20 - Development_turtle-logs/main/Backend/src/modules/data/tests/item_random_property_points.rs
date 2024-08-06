use crate::modules::data::domain_value::ItemRandomPropertyPoints;
use crate::modules::data::{tools::RetrieveItemRandomPropertyPoints, Data};

#[test]
fn get_item_random_property_points() {
    let mut data = Data::default();
    let expansion_id = 1;
    let item_level = 1;
    let points = ItemRandomPropertyPoints {
        item_level,
        expansion_id,
        epic: [0, 0, 0, 0, 0],
        rare: [1, 1, 1, 1, 1],
        good: [2, 2, 2, 2, 2],
    };
    data.item_random_property_points.insert(expansion_id, vec![points.clone()]);

    let item_random_property = data.get_item_random_property_points(expansion_id, item_level);
    assert!(item_random_property.is_some());
    assert_eq!(item_random_property.unwrap(), points);
    let no_item_random_property = data.get_item_random_property_points(0, 0);
    assert!(no_item_random_property.is_none());
}
