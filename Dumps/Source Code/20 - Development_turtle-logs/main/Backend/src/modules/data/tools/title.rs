use crate::modules::data::{domain_value::Title, Data};

pub trait RetrieveTitle {
    fn get_title(&self, id: u16) -> Option<Title>;
    fn get_all_titles(&self) -> Vec<Title>;
}

impl RetrieveTitle for Data {
    fn get_title(&self, id: u16) -> Option<Title> {
        self.titles.get(&id).cloned()
    }

    fn get_all_titles(&self) -> Vec<Title> {
        self.titles.iter().map(|(_, title)| title.clone()).collect()
    }
}
