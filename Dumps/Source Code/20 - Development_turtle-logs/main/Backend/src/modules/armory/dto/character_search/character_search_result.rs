use crate::modules::armory::dto::{CharacterSearchCharacterDto, SearchGuildDto};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterSearchResult {
    pub guild: Option<SearchGuildDto>,
    pub character: CharacterSearchCharacterDto,
    pub faction: bool,
    pub timestamp: u64,
}
