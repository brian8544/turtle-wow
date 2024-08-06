use crate::modules::data::{domain_value::ItemSheath, Data};

pub trait RetrieveItemSheath {
    fn get_item_sheath(&self, id: u8) -> Option<ItemSheath>;
    fn get_all_item_sheaths(&self) -> Vec<ItemSheath>;
}

impl RetrieveItemSheath for Data {
    fn get_item_sheath(&self, id: u8) -> Option<ItemSheath> {
        self.item_sheaths.get(&id).cloned()
    }

    fn get_all_item_sheaths(&self) -> Vec<ItemSheath> {
        self.item_sheaths.iter().map(|(_, item_sheath)| item_sheath.clone()).collect()
    }
}
