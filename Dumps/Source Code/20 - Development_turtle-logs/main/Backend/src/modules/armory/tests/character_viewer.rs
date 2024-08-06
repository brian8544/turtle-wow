use crate::modules::{
    armory::{
        dto::{CharacterDto, CharacterGearDto, CharacterHistoryDto, CharacterInfoDto, CharacterItemDto},
        tools::{CharacterViewer, SetCharacter},
        Armory,
    },
    data::Data,
};
use crate::tests::TestContainer;

#[test]
fn get_character_viewer() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    let armory = Armory::default();
    let character_info_dto = CharacterInfoDto {
        gear: CharacterGearDto {
            head: None,
            neck: None,
            shoulder: None,
            back: None,
            chest: None,
            shirt: Some(CharacterItemDto {
                item_id: 51,
                random_property_id: Some(-5),
                enchant_id: Some(1999),
                gem_ids: vec![None, None, None, None],
            }),
            tabard: None,
            wrist: None,
            main_hand: None,
            off_hand: None,
            ternary_hand: None,
            glove: None,
            belt: None,
            leg: None,
            boot: None,
            ring1: None,
            ring2: None,
            trinket1: None,
            trinket2: None,
        },
        hero_class_id: 7,
        level: 80,
        gender: false,
        profession1: Some(186),
        profession2: None,
        talent_specialization: None,
        race_id: 4,
    };
    let character_history_dto = CharacterHistoryDto {
        character_info: character_info_dto.to_owned(),
        character_name: "Panssdipetesdfsr".to_string(),
        character_title: None,
        profession_skill_points1: Some(223),
        profession_skill_points2: None,
        facial: None,
        arena_teams: Vec::new(),
        character_guild: None,
    };
    let character_dto = CharacterDto {
        server_uid: 1231223445,
        character_history: Some(character_history_dto.to_owned()),
    };

    let set_character_res = armory.set_character(&mut conn, 3, character_dto, time_util::now() * 1000);
    assert!(set_character_res.is_ok());
    let set_character = set_character_res.unwrap();

    let data = Data::default().init(&mut conn);
    let character_viewer_res = armory.get_character_viewer(&mut conn, &data, 1, set_character.id);
    assert!(character_viewer_res.is_ok());
    let character_viewer = character_viewer_res.unwrap();

    assert_eq!(character_viewer.character_id, set_character.id);
    assert!(character_viewer.gear.shirt.is_some());
    assert_eq!(character_viewer.gear.shirt.as_ref().unwrap().item_id, character_info_dto.gear.shirt.as_ref().unwrap().item_id);
    assert_eq!(character_viewer.name, character_history_dto.character_name);
    assert!(character_viewer.guild.is_none());
    assert!(character_viewer.talent_specialization.is_none());
    assert!(character_viewer.profession1.is_some());
    assert!(character_viewer.profession2.is_none());
    assert_eq!(character_viewer.profession1.as_ref().unwrap().points, *character_history_dto.profession_skill_points1.as_ref().unwrap());
    assert_eq!(character_viewer.hero_class_id, character_info_dto.hero_class_id);
    assert_eq!(character_viewer.level, character_info_dto.level);
    assert_eq!(character_viewer.race_id, character_info_dto.race_id);
    assert_eq!(character_viewer.faction, false);
    assert_eq!(character_viewer.gender, character_info_dto.gender);
    assert_eq!(character_viewer.history_id, set_character.last_update.as_ref().unwrap().id);
    assert_eq!(character_viewer.history.len(), 1);
}

#[test]
fn invalid_character_id() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();
    let data = Data::default().init(&mut conn);
    let armory = Armory::default();
    let result = armory.get_character_viewer(&mut conn, &data, 1, 123456789);
    assert!(result.is_err())
}

#[test]
fn invalid_character_id_by_history_id() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();
    let data = Data::default().init(&mut conn);
    let armory = Armory::default();
    let result = armory.get_character_viewer_by_history_id(&mut conn, &data, 1, 123456789, 123456789);
    assert!(result.is_err())
}
