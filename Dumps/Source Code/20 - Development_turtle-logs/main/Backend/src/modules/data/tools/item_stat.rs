use crate::modules::data::{domain_value::ItemStat, Data};

pub trait RetrieveItemStat {
    fn get_item_stats(&self, expansion_id: u8, item_id: u32) -> Option<Vec<ItemStat>>;
}

impl RetrieveItemStat for Data {
    fn get_item_stats(&self, expansion_id: u8, item_id: u32) -> Option<Vec<ItemStat>> {
        if expansion_id == 0 {
            return None;
        }

        self.item_stats.get(expansion_id as usize - 1).and_then(|map| map.get(&item_id).cloned())
    }
}
