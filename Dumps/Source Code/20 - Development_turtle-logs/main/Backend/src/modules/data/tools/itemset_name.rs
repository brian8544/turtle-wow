use crate::modules::data::{domain_value::ItemsetName, Data};

pub trait RetrieveItemsetName {
    fn get_itemset_name(&self, expansion_id: u8, itemset_id: u16) -> Option<ItemsetName>;
    fn get_itemset_item_ids(&self, expansion_id: u8, itemset_id: u16) -> Option<Vec<u32>>;
}

impl RetrieveItemsetName for Data {
    fn get_itemset_name(&self, expansion_id: u8, itemset_id: u16) -> Option<ItemsetName> {
        if expansion_id == 0 {
            return None;
        }

        self.itemset_names.get(expansion_id as usize - 1).and_then(|map| map.get(&itemset_id).cloned())
    }

    fn get_itemset_item_ids(&self, expansion_id: u8, itemset_id: u16) -> Option<Vec<u32>> {
        if expansion_id == 0 {
            return None;
        }

        self.items
            .get(expansion_id as usize - 1)
            .map(|map| map.iter().filter(|(_, item)| item.itemset.is_some() && *item.itemset.as_ref().unwrap() == itemset_id).map(|(item_id, _)| *item_id).collect())
    }
}
