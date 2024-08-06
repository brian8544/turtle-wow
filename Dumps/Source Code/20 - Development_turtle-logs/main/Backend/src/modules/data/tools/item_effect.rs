use crate::modules::data::{domain_value::ItemEffect, Data};

pub trait RetrieveItemEffect {
    fn get_item_effect(&self, expansion_id: u8, item_id: u32) -> Option<Vec<ItemEffect>>;
}

impl RetrieveItemEffect for Data {
    fn get_item_effect(&self, expansion_id: u8, item_id: u32) -> Option<Vec<ItemEffect>> {
        if expansion_id == 0 {
            return None;
        }

        self.item_effects.get(expansion_id as usize - 1).and_then(|map| map.get(&item_id).cloned())
    }
}
