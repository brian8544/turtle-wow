extern crate test;

use test::Bencher;

use crate::util::database::*;

use crate::modules::armory::dto::ArenaTeamDto;
use crate::modules::armory::{
    domain_value::GuildRank,
    dto::{CharacterDto, CharacterFacialDto, CharacterGearDto, CharacterGuildDto, CharacterHistoryDto, CharacterInfoDto, CharacterItemDto, GuildDto},
    tools::SetCharacter,
    Armory,
};
use crate::params;
use crate::tests::TestContainer;
use std::ops::Div;
use std::time::Instant;

/*
 * Goal of this benchmark is to see how many
 * set operations the server can potentially handle
 * incoming from extern servers
 */
#[bench]
fn set_character(b: &mut Bencher) {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    let armory = Armory::default();
    let character_info_dto = CharacterInfoDto {
        gear: CharacterGearDto {
            head: Some(CharacterItemDto {
                item_id: 40329,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            neck: Some(CharacterItemDto {
                item_id: 40069,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            shoulder: Some(CharacterItemDto {
                item_id: 40494,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            back: Some(CharacterItemDto {
                item_id: 40252,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            chest: Some(CharacterItemDto {
                item_id: 40471,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            shirt: None,
            tabard: None,
            wrist: Some(CharacterItemDto {
                item_id: 40186,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            main_hand: Some(CharacterItemDto {
                item_id: 39422,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            off_hand: None,
            ternary_hand: Some(CharacterItemDto {
                item_id: 33509,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            glove: Some(CharacterItemDto {
                item_id: 39557,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            belt: Some(CharacterItemDto {
                item_id: 40694,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            leg: Some(CharacterItemDto {
                item_id: 40493,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            boot: Some(CharacterItemDto {
                item_id: 40748,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            ring1: Some(CharacterItemDto {
                item_id: 40370,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            ring2: Some(CharacterItemDto {
                item_id: 39141,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            trinket1: Some(CharacterItemDto {
                item_id: 37220,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
            trinket2: Some(CharacterItemDto {
                item_id: 44063,
                random_property_id: None,
                enchant_id: None,
                gem_ids: vec![None, None, None, None],
            }),
        },
        hero_class_id: 2,
        level: 20,
        gender: false,
        profession1: None,
        profession2: Some(186),
        talent_specialization: None,
        race_id: 6,
    };
    let character_history_dto = CharacterHistoryDto {
        character_info: character_info_dto,
        character_name: "sdfsdgsdg".to_string(),
        character_title: None,
        profession_skill_points1: Some(35),
        profession_skill_points2: Some(23),
        facial: Some(CharacterFacialDto {
            skin_color: 2,
            face_style: 3,
            hair_style: 2,
            hair_color: 3,
            facial_hair: 2,
        }),
        arena_teams: vec![
            ArenaTeamDto {
                team_id: 22434511,
                name: "Other Fancy Team Name".to_string(),
                team_type: 3,
                team_rating: 1599,
                personal_rating: 1533,
            },
            ArenaTeamDto {
                team_id: 224234511,
                name: "Other Fancy Team Name".to_string(),
                team_type: 5,
                team_rating: 1599,
                personal_rating: 1533,
            },
        ],
        character_guild: Some(CharacterGuildDto {
            guild: GuildDto {
                name: "sgfdfhgdfg".to_string(),
                server_uid: 1232346,
            },
            rank: GuildRank { index: 2, name: "BliBlaBlub".to_string() },
        }),
    };
    let character_dto = CharacterDto {
        server_uid: 12312452,
        character_history: Some(character_history_dto),
    };

    let num_iterations = 1000;
    let mut average_ns = Vec::new();
    let timestamp = time_util::now() * 1000;
    for _i in 0..num_iterations {
        let start = Instant::now();
        let character = armory.set_character(&mut conn, 3, character_dto.clone(), timestamp).unwrap();
        average_ns.push(start.elapsed().as_nanos());

        // Cleanup
        let character_history = character.last_update.unwrap();
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.head.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.neck.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.shoulder.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.back.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.chest.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.wrist.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.main_hand.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.ternary_hand.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.glove.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.belt.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.leg.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.boot.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.ring1.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.ring2.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.trinket1.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_item WHERE id=:id", params!("id" => character_history.character_info.gear.trinket2.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_gear WHERE id=:id", params!("id" => character_history.character_info.gear.id));
        conn.execute_wparams("DELETE FROM armory_character_facial WHERE id=:id", params!("id" => character_history.facial.unwrap().id));
        conn.execute_wparams("DELETE FROM armory_character_info WHERE id=:id", params!("id" => character_history.character_info.id));
        conn.execute_wparams("DELETE FROM armory_character_history WHERE id=:id", params!("id" => character_history.id));
        conn.execute_wparams("DELETE FROM armory_character WHERE id=:id", params!("id" => character_history.character_id));
        conn.execute_wparams("DELETE FROM armory_arena_team WHERE id=:id", params!("id" => character_history.arena_teams[0].id));
        conn.execute_wparams("DELETE FROM armory_arena_team WHERE id=:id", params!("id" => character_history.arena_teams[1].id));
        conn.execute_wparams("DELETE FROM armory_guild WHERE id=:id", params!("id" => character_history.character_guild.unwrap().guild_id));
    }

    let wait_ns = average_ns.iter().sum::<u128>().div(num_iterations) as u64;
    b.iter(|| std::thread::sleep(std::time::Duration::from_nanos(wait_ns)));
}
