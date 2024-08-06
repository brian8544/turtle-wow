use crate::modules::data::domain_value::{HeroClass, HeroClassTalent};
use crate::modules::data::{tools::RetrieveHeroClass, Data};

#[test]
fn get_hero_class() {
    let mut data = Data::default();
    let hero_class_id = 1;
    let hero_class = HeroClass {
        id: hero_class_id,
        localization_id: 324,
        color: "dfsf".to_string(),
        talents: [
            HeroClassTalent { icon: 1243, localization_id: 12 },
            HeroClassTalent { icon: 12423, localization_id: 123 },
            HeroClassTalent { icon: 12434, localization_id: 124 },
        ],
    };
    data.hero_classes.insert(hero_class_id, hero_class.clone());

    let hero_class_res = data.get_hero_class(hero_class_id);
    assert!(hero_class_res.is_some());
    assert_eq!(hero_class_res.unwrap(), hero_class);
    let no_hero_class = data.get_hero_class(0);
    assert!(no_hero_class.is_none());
}

#[test]
fn get_all_hero_classs() {
    let data = Data::default();
    let hero_classes = data.get_all_hero_classes();
    assert!(hero_classes.is_empty());
}
