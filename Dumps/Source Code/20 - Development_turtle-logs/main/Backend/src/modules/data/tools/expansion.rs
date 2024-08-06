use crate::modules::data::{domain_value::Expansion, Data};

pub trait RetrieveExpansion {
    fn get_expansion(&self, id: u8) -> Option<Expansion>;
    fn get_all_expansions(&self) -> Vec<Expansion>;
}

impl RetrieveExpansion for Data {
    fn get_expansion(&self, id: u8) -> Option<Expansion> {
        self.expansions.get(&id).cloned()
    }

    fn get_all_expansions(&self) -> Vec<Expansion> {
        self.expansions.iter().map(|(_, expansion)| expansion.clone()).collect()
    }
}
