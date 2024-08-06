use crate::modules::transport_layer::{ArenaTeam, CharacterFacialDto, CharacterGuildDto, CharacterInfoDto};

#[derive(Debug, Clone, Serialize)]
pub struct CharacterHistoryDto {
    pub character_info: CharacterInfoDto,
    pub character_name: String,
    pub character_guild: Option<CharacterGuildDto>,
    pub character_title: Option<u16>,
    pub profession_skill_points1: Option<u16>,
    pub profession_skill_points2: Option<u16>,
    pub facial: Option<CharacterFacialDto>,
    pub arena_teams: Vec<ArenaTeam>,
}
