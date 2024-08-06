use crate::modules::data::{domain_value::Icon, Data};

pub trait RetrieveIcon {
    fn get_icon(&self, id: u16) -> Option<Icon>;
}

impl RetrieveIcon for Data {
    fn get_icon(&self, id: u16) -> Option<Icon> {
        self.icons.get(&id).cloned()
    }
}
