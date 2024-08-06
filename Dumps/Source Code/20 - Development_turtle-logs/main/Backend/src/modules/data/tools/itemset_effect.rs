use crate::modules::data::{domain_value::ItemsetEffect, Data};

pub trait RetrieveItemsetEffect {
    fn get_itemset_effects(&self, expansion_id: u8, itemset_id: u16) -> Option<Vec<ItemsetEffect>>;
}

impl RetrieveItemsetEffect for Data {
    fn get_itemset_effects(&self, expansion_id: u8, itemset_id: u16) -> Option<Vec<ItemsetEffect>> {
        if expansion_id == 0 {
            return None;
        }

        self.itemset_effects.get(expansion_id as usize - 1).and_then(|map| map.get(&itemset_id).cloned())
    }
}
