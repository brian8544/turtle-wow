use crate::{
    dto::SelectOption,
    modules::armory::dto::{CharacterStat, CharacterViewerGearDto, CharacterViewerGuildDto, CharacterViewerProfessionDto, CharacterViewerTalentsDto},
};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterViewerDto {
    pub history_id: u32,
    pub character_id: u32,
    pub gender: bool,
    pub faction: bool,
    pub race_id: u8,
    pub hero_class_id: u8,
    pub level: u8,
    pub name: String,
    pub server_id: u32,
    pub server_name: String,
    pub stats: Vec<CharacterStat>,
    pub guild: Option<CharacterViewerGuildDto>,
    pub history: Vec<SelectOption<u32>>,
    pub gear: CharacterViewerGearDto,
    pub profession1: Option<CharacterViewerProfessionDto>,
    pub profession2: Option<CharacterViewerProfessionDto>,
    pub talent_specialization: Option<CharacterViewerTalentsDto>,
}
