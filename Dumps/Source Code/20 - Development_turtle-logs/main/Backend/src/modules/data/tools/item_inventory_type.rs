use crate::modules::data::{domain_value::ItemInventoryType, Data};

pub trait RetrieveItemInventoryType {
    fn get_item_inventory_type(&self, id: u8) -> Option<ItemInventoryType>;
    fn get_all_item_inventory_types(&self) -> Vec<ItemInventoryType>;
}

impl RetrieveItemInventoryType for Data {
    fn get_item_inventory_type(&self, id: u8) -> Option<ItemInventoryType> {
        self.item_inventory_types.get(&id).cloned()
    }

    fn get_all_item_inventory_types(&self) -> Vec<ItemInventoryType> {
        self.item_inventory_types.iter().map(|(_, item_inventory_type)| item_inventory_type.clone()).collect()
    }
}
