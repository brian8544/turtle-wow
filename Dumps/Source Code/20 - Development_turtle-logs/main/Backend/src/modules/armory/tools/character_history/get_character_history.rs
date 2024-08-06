use crate::params;
use crate::util::database::*;

use crate::modules::armory::domain_value::{ArenaTeam, ArenaTeamSizeType};
use crate::modules::armory::tools::GetArenaTeam;
use crate::modules::armory::{
    domain_value::CharacterGuild,
    dto::{ArmoryFailure, CharacterHistoryDto},
    material::CharacterHistory,
    tools::{GetCharacter, GetCharacterFacial, GetCharacterInfo, GetGuild},
    Armory,
};

pub trait GetCharacterHistory {
    fn get_character_history(&self, db_main: &mut impl Select, character_history_id: u32) -> Result<CharacterHistory, ArmoryFailure>;
    fn get_character_history_by_value(&self, db_main: &mut impl Select, character_id: u32, character_history_dto: CharacterHistoryDto, timestamp: u64) -> Result<CharacterHistory, ArmoryFailure>;
}

impl GetCharacterHistory for Armory {
    fn get_character_history(&self, db_main: &mut impl Select, character_history_id: u32) -> Result<CharacterHistory, ArmoryFailure> {
        {
            let cache_char_history = self.cache_char_history.read().unwrap();
            if let Some(char_hist) = cache_char_history.get(&character_history_id) {
                return Ok(char_hist.clone());
            }
        }

        let mut result = db_main.select_wparams_value("SELECT * FROM armory_character_history WHERE id=:id", &|row| row, params!("id" => character_history_id));

        if let Some(row) = result.as_mut() {
            let character_info = self.get_character_info(db_main, row.take(2).unwrap())?;
            let arena_teams = vec![
                row.take_opt(10).unwrap().ok().and_then(|team_id| self.get_arena_team_by_id(db_main, team_id)),
                row.take_opt(11).unwrap().ok().and_then(|team_id| self.get_arena_team_by_id(db_main, team_id)),
                row.take_opt(12).unwrap().ok().and_then(|team_id| self.get_arena_team_by_id(db_main, team_id)),
            ]
            .iter()
            .filter(|team| team.is_some())
            .map(|team| team.as_ref().unwrap().clone())
            .collect();
            let char_history = CharacterHistory {
                id: character_history_id,
                character_id: row.take(1).unwrap(),
                character_info,
                character_name: row.take(3).unwrap(),
                character_guild: row.take_opt(4).unwrap().ok().map(|guild_id| {
                    let guild = self.get_guild(guild_id).unwrap();
                    let rank_index: u8 = row.take(5).unwrap();
                    CharacterGuild {
                        guild_id,
                        rank: guild.ranks.iter().find(|rank| rank.index == rank_index).unwrap().to_owned(),
                    }
                }),
                character_title: row.take_opt(6).unwrap().ok(),
                profession_skill_points1: row.take_opt(7).unwrap().ok(),
                profession_skill_points2: row.take_opt(8).unwrap().ok(),
                facial: row.take_opt(9).unwrap().ok().and_then(|facial_id| self.get_character_facial(db_main, facial_id).ok()),
                arena_teams,
                timestamp: row.take(13).unwrap(),
            };

            let mut cache_char_hist = self.cache_char_history.write().unwrap();
            cache_char_hist.insert(character_history_id, char_history.clone());
            return Ok(char_history);
        }
        Err(ArmoryFailure::Database("get_character_history".to_owned()))
    }

    fn get_character_history_by_value(&self, db_main: &mut impl Select, character_id: u32, character_history_dto: CharacterHistoryDto, timestamp: u64) -> Result<CharacterHistory, ArmoryFailure> {
        let character = self.get_character(character_id).unwrap();
        let guild_id = if character_history_dto.character_guild.is_some() {
            let guild = self.get_guild_by_uid(character.server_id, character_history_dto.character_guild.as_ref().unwrap().guild.server_uid);
            if guild.is_none() {
                return Err(ArmoryFailure::InvalidInput);
            }
            Some(guild.unwrap().id)
        } else {
            None
        };

        let character_info = self.get_character_info_by_value(db_main, character_history_dto.character_info.to_owned())?;

        let facial = character_history_dto.facial.as_ref().and_then(|facial_dto| self.get_character_facial_by_value(db_main, facial_dto.clone()).ok());

        let arena_teams = character_history_dto
            .arena_teams
            .iter()
            .map(|team| self.get_arena_team_by_uid(db_main, character.server_id, team.team_id))
            .filter(|team| team.is_some())
            .map(|team| team.unwrap())
            .collect::<Vec<ArenaTeam>>();
        let arena2 = arena_teams.iter().find(|team| team.size_type == ArenaTeamSizeType::Size2v2).map(|team| team.id);
        let arena3 = arena_teams.iter().find(|team| team.size_type == ArenaTeamSizeType::Size3v3).map(|team| team.id);
        let arena5 = arena_teams.iter().find(|team| team.size_type == ArenaTeamSizeType::Size5v5).map(|team| team.id);

        let params = params!(
          "character_id" => character_id,
          "character_info_id" => character_info.id,
          "character_name" => character_history_dto.character_name.clone(),
          "title" => character_history_dto.character_title,
          "guild_id" => guild_id,
          "guild_rank" => character_history_dto.character_guild.as_ref().map(|chr_guild_dto| chr_guild_dto.rank.index),
          "prof_skill_points1" => character_history_dto.profession_skill_points1,
          "prof_skill_points2" => character_history_dto.profession_skill_points2,
          "facial" => facial.as_ref().map(|chr_facial| chr_facial.id),
          "arena2" => arena2,
          "arena3" => arena3,
          "arena5" => arena5,
          "timestamp" => timestamp / 1000
        );

        let mut result = db_main.select_wparams_value(
            "SELECT id, timestamp FROM armory_character_history WHERE character_id=:character_id AND character_info_id=:character_info_id AND character_name=:character_name AND ((ISNULL(:guild_id) AND ISNULL(guild_id)) OR guild_id = :guild_id) AND \
             ((ISNULL(:guild_rank) AND ISNULL(guild_rank)) OR guild_rank = :guild_rank) AND ((ISNULL(:title) AND ISNULL(title)) OR title = :title) AND ((ISNULL(:prof_skill_points1) AND ISNULL(prof_skill_points1)) OR prof_skill_points1 = \
             :prof_skill_points1) AND ((ISNULL(:prof_skill_points2) AND ISNULL(prof_skill_points2)) OR prof_skill_points2 = :prof_skill_points2) AND ((ISNULL(:facial) AND ISNULL(facial)) OR facial = :facial) AND ((ISNULL(:arena2) AND \
             ISNULL(arena2)) OR arena2 = :arena2) AND ((ISNULL(:arena3) AND ISNULL(arena3)) OR arena3 = :arena3) AND ((ISNULL(:arena5) AND ISNULL(arena5)) OR arena5 = :arena5) AND timestamp >= :timestamp-60 ORDER BY timestamp ASC LIMIT 1",
            &|row| row,
            params,
        );
        if let Some(row) = result.as_mut() {
            return Ok(CharacterHistory {
                id: row.take(0).unwrap(),
                character_id,
                character_info,
                character_name: character_history_dto.character_name.to_owned(),
                character_guild: guild_id.map(|id| CharacterGuild {
                    guild_id: id,
                    rank: character_history_dto.character_guild.as_ref().map(|chr_guild_dto| chr_guild_dto.rank.clone()).unwrap(),
                }),
                character_title: character_history_dto.character_title,
                profession_skill_points1: character_history_dto.profession_skill_points1,
                profession_skill_points2: character_history_dto.profession_skill_points2,
                facial,
                arena_teams,
                timestamp: row.take(1).unwrap(),
            });
        }
        Err(ArmoryFailure::Database("get_character_history_by_value".to_owned()))
    }
}
