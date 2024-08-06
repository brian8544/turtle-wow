use crate::modules::data::{domain_value::ItemBonding, Data};

pub trait RetrieveItemBonding {
    fn get_item_bonding(&self, id: u8) -> Option<ItemBonding>;
    fn get_all_item_bondings(&self) -> Vec<ItemBonding>;
}

impl RetrieveItemBonding for Data {
    fn get_item_bonding(&self, id: u8) -> Option<ItemBonding> {
        self.item_bondings.get(&id).cloned()
    }

    fn get_all_item_bondings(&self) -> Vec<ItemBonding> {
        self.item_bondings.iter().map(|(_, item_bonding)| item_bonding.clone()).collect()
    }
}
