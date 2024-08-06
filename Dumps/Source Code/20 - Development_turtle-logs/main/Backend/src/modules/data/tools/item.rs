use crate::modules::data::{domain_value::Item, Data};

pub trait RetrieveItem {
    fn get_item(&self, expansion_id: u8, item_id: u32) -> Option<Item>;
}

impl RetrieveItem for Data {
    fn get_item(&self, expansion_id: u8, item_id: u32) -> Option<Item> {
        if expansion_id == 0 {
            return None;
        }

        self.items.get(expansion_id as usize - 1).and_then(|map| map.get(&item_id).cloned())
    }
}
