use crate::modules::data::{domain_value::DispelType, Data};

pub trait RetrieveDispelType {
    fn get_dispel_type(&self, id: u8) -> Option<DispelType>;
    fn get_all_dispel_types(&self) -> Vec<DispelType>;
}

impl RetrieveDispelType for Data {
    fn get_dispel_type(&self, id: u8) -> Option<DispelType> {
        self.dispel_types.get(&id).cloned()
    }

    fn get_all_dispel_types(&self) -> Vec<DispelType> {
        self.dispel_types.iter().map(|(_, dispel_type)| dispel_type.clone()).collect()
    }
}
