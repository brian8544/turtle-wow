use crate::modules::data::{domain_value::PowerType, Data};

pub trait RetrievePowerType {
    fn get_power_type(&self, id: u8) -> Option<PowerType>;
    fn get_all_power_types(&self) -> Vec<PowerType>;
}

impl RetrievePowerType for Data {
    fn get_power_type(&self, id: u8) -> Option<PowerType> {
        self.power_types.get(&id).cloned()
    }

    fn get_all_power_types(&self) -> Vec<PowerType> {
        self.power_types.iter().map(|(_, power_type)| power_type.clone()).collect()
    }
}
