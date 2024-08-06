use crate::modules::data::domain_value::Difficulty;
use crate::modules::data::Data;

pub trait RetrieveDifficulty {
    fn get_difficulty(&self, id: u8) -> Option<Difficulty>;
    fn get_all_difficulties(&self) -> Vec<Difficulty>;
}

impl RetrieveDifficulty for Data {
    fn get_difficulty(&self, id: u8) -> Option<Difficulty> {
        self.difficulties.get(&id).cloned()
    }

    fn get_all_difficulties(&self) -> Vec<Difficulty> {
        self.difficulties.iter().map(|(_, difficulty)| difficulty.clone()).collect()
    }
}
