use crate::modules::data::{domain_value::ItemDamage, Data};

pub trait RetrieveItemDamage {
    fn get_item_damage(&self, expansion_id: u8, item_id: u32) -> Option<Vec<ItemDamage>>;
}

impl RetrieveItemDamage for Data {
    fn get_item_damage(&self, expansion_id: u8, item_id: u32) -> Option<Vec<ItemDamage>> {
        if expansion_id == 0 {
            return None;
        }

        self.item_damages.get(expansion_id as usize - 1).and_then(|map| map.get(&item_id).cloned())
    }
}
