use super::get_character_facial::get_character_facial;
use super::get_character_info::get_character_info;
use crate::modules::armory::domain_value::GuildRank;
use crate::modules::armory::dto::{ArenaTeamDto, CharacterGuildDto, CharacterHistoryDto, GuildDto};

pub fn get_character_history() -> CharacterHistoryDto {
    CharacterHistoryDto {
        character_info: get_character_info(),
        character_name: "Pansipeter".to_string(),
        character_title: Some(23),
        profession_skill_points1: None,
        profession_skill_points2: Some(423),
        facial: Some(get_character_facial()),
        arena_teams: vec![ArenaTeamDto {
            team_id: 24345,
            name: "Some Fancy Team Name".to_string(),
            team_type: 2,
            team_rating: 1599,
            personal_rating: 1533,
        }],
        character_guild: Some(CharacterGuildDto {
            guild: GuildDto {
                name: "GuildSample".to_string(),
                server_uid: 12346,
            },
            rank: GuildRank { index: 2, name: "Officer".to_string() },
        }),
    }
}
