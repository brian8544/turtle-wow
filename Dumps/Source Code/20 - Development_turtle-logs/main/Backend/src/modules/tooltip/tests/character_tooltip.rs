use crate::modules::{
    armory::{
        domain_value::GuildRank,
        dto::{CharacterDto, CharacterGearDto, CharacterGuildDto, CharacterHistoryDto, CharacterInfoDto, CharacterItemDto, GuildDto},
        tools::SetCharacter,
        Armory,
    },
    data::{tools::RetrieveServer, Data},
    tooltip::{tools::RetrieveCharacterTooltip, Tooltip},
};
use crate::tests::TestContainer;

#[test]
fn character_tooltip() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    let tooltip = Tooltip::default();
    let data = Data::default().init(&mut conn);
    let armory = Armory::default();

    let character_info_dto = CharacterInfoDto {
        gear: CharacterGearDto {
            head: None,
            neck: None,
            shoulder: None,
            back: None,
            chest: None,
            shirt: None,
            tabard: None,
            wrist: None,
            main_hand: Some(CharacterItemDto {
                item_id: 17,
                random_property_id: None,
                enchant_id: Some(266),
                gem_ids: vec![None, Some(23094), Some(23094), None],
            }),
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
        hero_class_id: 2,
        level: 24,
        gender: false,
        profession1: Some(171),
        profession2: None,
        talent_specialization: None,
        race_id: 4,
    };
    let character_history_dto = CharacterHistoryDto {
        character_info: character_info_dto.to_owned(),
        character_name: "sdgsdfsd".to_string(),
        character_title: None,
        profession_skill_points1: Some(320),
        profession_skill_points2: None,
        facial: None,
        arena_teams: Vec::new(),
        character_guild: Some(CharacterGuildDto {
            guild: GuildDto {
                server_uid: 324234234,
                name: "Testadsdfsfdsf".to_string(),
            },
            rank: GuildRank { index: 4, name: "Test123sdfsd".to_string() },
        }),
    };
    let character_dto = CharacterDto {
        server_uid: 433356,
        character_history: Some(character_history_dto.to_owned()),
    };

    let server = data.get_server(3).unwrap();

    let character_res = armory.set_character(&mut conn, 3, character_dto, time_util::now() * 1000);
    assert!(character_res.is_ok());
    let character = character_res.unwrap();

    let tooltip_res = tooltip.get_character(&mut conn, &data, &armory, 1, character.id, time_util::now() * 1000 - 1000);
    assert!(tooltip_res.is_ok());
    let tooltip = tooltip_res.unwrap();

    assert_eq!(tooltip.name, character_history_dto.character_name);
    assert_eq!(tooltip.server, server.name);
    assert!(tooltip.guild.is_some());
    assert_eq!(tooltip.guild.as_ref().unwrap().name, character_history_dto.character_guild.as_ref().unwrap().guild.name);
    assert_eq!(tooltip.guild.as_ref().unwrap().rank, character_history_dto.character_guild.as_ref().unwrap().rank.name);
    assert_eq!(tooltip.gender, character_info_dto.gender);
    assert_eq!(tooltip.race_id, character_info_dto.race_id);
    assert_eq!(tooltip.faction, false);
    assert_eq!(tooltip.hero_class_id, character_info_dto.hero_class_id);
    assert_eq!(tooltip.expansion_id, server.expansion_id);
}
