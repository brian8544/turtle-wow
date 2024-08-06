use crate::modules::data::{domain_value::ItemRandomPropertyPoints, Data};

pub trait RetrieveItemRandomPropertyPoints {
    fn get_item_random_property_points(&self, expansion_id: u8, item_level: u16) -> Option<ItemRandomPropertyPoints>;
}

impl RetrieveItemRandomPropertyPoints for Data {
    fn get_item_random_property_points(&self, expansion_id: u8, item_level: u16) -> Option<ItemRandomPropertyPoints> {
        if item_level == 0 || item_level > 300 {
            return None;
        }

        self.item_random_property_points.get(&expansion_id).map(|vec| vec.get(item_level as usize - 1).unwrap().clone())
    }
}
