use crate::modules::data::{domain_value::ItemSocket, Data};

pub trait RetrieveItemSocket {
    fn get_item_socket(&self, expansion_id: u8, item_id: u32) -> Option<ItemSocket>;
}

impl RetrieveItemSocket for Data {
    fn get_item_socket(&self, expansion_id: u8, item_id: u32) -> Option<ItemSocket> {
        if expansion_id < 2 {
            return None;
        }

        self.item_sockets.get(expansion_id as usize - 2).and_then(|map| map.get(&item_id).cloned())
    }
}
