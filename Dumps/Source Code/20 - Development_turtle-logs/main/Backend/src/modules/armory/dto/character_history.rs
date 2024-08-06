use crate::modules::armory::dto::ArenaTeamDto;
use crate::{
    dto::CheckPlausability,
    modules::armory::dto::{CharacterFacialDto, CharacterGuildDto, CharacterInfoDto},
};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterHistoryDto {
    pub character_info: CharacterInfoDto,
    pub character_name: String,
    pub character_guild: Option<CharacterGuildDto>,
    pub character_title: Option<u16>,
    pub profession_skill_points1: Option<u16>,
    pub profession_skill_points2: Option<u16>,
    pub facial: Option<CharacterFacialDto>,
    pub arena_teams: Vec<ArenaTeamDto>,
}

impl CheckPlausability for CharacterHistoryDto {
    fn is_plausible(&self) -> bool {
        self.character_info.is_plausible()
            && !self.character_name.is_empty()
            && (self.character_guild.is_none() || self.character_guild.as_ref().unwrap().is_plausible())
            && !self.character_title.contains(&0)
            && !self.profession_skill_points1.contains(&0)
            && !self.profession_skill_points2.contains(&0)
            && (self.facial.is_none() || self.facial.as_ref().unwrap().is_plausible())
            && self.arena_teams.iter().all(|team| team.is_plausible())
    }
}
