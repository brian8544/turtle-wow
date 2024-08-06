use crate::modules::data::Data;
use crate::modules::data::domain_value::Addon;

pub trait RetrieveAddon {
    fn get_addon(&self, id: u32) -> Option<Addon>;
    fn get_all_addons(&self) -> Vec<Addon>;
}

impl RetrieveAddon for Data {
    fn get_addon(&self, id: u32) -> Option<Addon> {
        self.addons.get(&id).cloned()
    }

    fn get_all_addons(&self) -> Vec<Addon> {
        self.addons.iter().map(|(_, addon)| addon.clone()).collect()
    }
}
