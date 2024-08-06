use crate::{dto::CheckPlausability, modules::armory::dto::CharacterHistoryDto};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterDto {
    pub server_uid: u64,
    pub character_history: Option<CharacterHistoryDto>,
}

impl CheckPlausability for CharacterDto {
    fn is_plausible(&self) -> bool {
        self.server_uid > 0 && (self.character_history.is_none() || self.character_history.as_ref().unwrap().is_plausible())
    }
}
