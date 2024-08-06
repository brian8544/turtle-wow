use crate::modules::data::{domain_value::HeroClass, Data};

pub trait RetrieveHeroClass {
    fn get_hero_class(&self, id: u8) -> Option<HeroClass>;
    fn get_all_hero_classes(&self) -> Vec<HeroClass>;
}

impl RetrieveHeroClass for Data {
    fn get_hero_class(&self, id: u8) -> Option<HeroClass> {
        self.hero_classes.get(&id).cloned()
    }

    fn get_all_hero_classes(&self) -> Vec<HeroClass> {
        self.hero_classes.iter().map(|(_, hero_class)| hero_class.clone()).collect()
    }
}
