use crate::modules::armory::domain_value::ArenaTeam;
use crate::modules::armory::{
    domain_value::{CharacterFacial, CharacterGuild, CharacterInfo},
    dto::CharacterHistoryDto,
};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterHistory {
    pub id: u32,
    pub character_id: u32,
    pub character_info: CharacterInfo,
    pub character_name: String,
    pub character_guild: Option<CharacterGuild>,
    pub character_title: Option<u16>,
    pub profession_skill_points1: Option<u16>,
    pub profession_skill_points2: Option<u16>,
    pub facial: Option<CharacterFacial>,
    pub arena_teams: Vec<ArenaTeam>,
    pub timestamp: u64,
}

impl PartialEq for CharacterHistory {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl CharacterHistory {
    pub fn deep_eq(&self, other: &Self) -> bool {
        self.id == other.id
            && self.character_id == other.character_id
            && self.character_info.deep_eq(&other.character_info)
            && self.character_name == other.character_name
            && ((self.character_guild.is_none() && other.character_guild.is_none()) || (self.character_guild.is_some() && other.character_guild.is_some() && self.character_guild.as_ref().unwrap().deep_eq(other.character_guild.as_ref().unwrap())))
            && self.character_title == other.character_title
            && self.profession_skill_points1 == other.profession_skill_points1
            && self.profession_skill_points2 == other.profession_skill_points2
            && ((self.facial.is_none() && other.facial.is_none()) || (self.facial.is_some() && other.facial.is_some() && self.facial.as_ref().unwrap().deep_eq(other.facial.as_ref().unwrap())))
            //&& self.timestamp == other.timestamp
            && self.arena_teams.iter().all(|team| other.arena_teams.contains(team))
    }

    pub fn compare_by_value(&self, other: &CharacterHistoryDto) -> bool {
        self.character_info.compare_by_value(&other.character_info)
            && self.character_name == other.character_name
            && ((self.character_guild.is_none() && other.character_guild.is_none())
                || (self.character_guild.is_some() && other.character_guild.is_some()) && self.character_guild.as_ref().unwrap().compare_by_value(other.character_guild.as_ref().unwrap()))
            && self.character_title == other.character_title
            && self.profession_skill_points1 == other.profession_skill_points1
            && self.profession_skill_points2 == other.profession_skill_points2
            && ((self.facial.is_none() && other.facial.is_none()) || (self.facial.is_some() && other.facial.is_some() && self.facial.as_ref().unwrap().compare_by_value(other.facial.as_ref().unwrap())))
            && self.arena_teams.iter().all(|team| other.arena_teams.iter().any(|other_team| team.compare_by_value(other_team)))
        // Technically we should also compare character_id => character_uid and guild_id => guild_dto
        // But this would require to make a get call
    }
}
