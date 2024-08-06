use crate::modules::data::{domain_value::Profession, Data};

pub trait RetrieveProfession {
    fn get_profession(&self, id: u16) -> Option<Profession>;
    fn get_all_professions(&self) -> Vec<Profession>;
}

impl RetrieveProfession for Data {
    fn get_profession(&self, id: u16) -> Option<Profession> {
        self.professions.get(&id).cloned()
    }

    fn get_all_professions(&self) -> Vec<Profession> {
        self.professions.iter().map(|(_, profession)| profession.clone()).collect()
    }
}
