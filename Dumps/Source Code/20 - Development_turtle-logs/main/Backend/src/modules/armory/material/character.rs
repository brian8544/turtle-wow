use crate::modules::armory::{domain_value::HistoryMoment, dto::CharacterDto, material::CharacterHistory};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Character {
    pub id: u32,
    pub server_id: u32,
    pub server_uid: u64,
    pub last_update: Option<CharacterHistory>,
    pub history_moments: Vec<HistoryMoment>,
}

impl PartialEq for Character {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Character {
    pub fn compare_by_value(&self, other: &CharacterDto) -> bool {
        self.server_uid == other.server_uid
            && ((self.last_update.is_none() && other.character_history.is_none()) || (self.last_update.is_some() && other.character_history.is_some() && self.last_update.as_ref().unwrap().compare_by_value(other.character_history.as_ref().unwrap())))
    }

    pub fn deep_eq(&self, other: &Self) -> bool {
        self.id == other.id
            && self.server_id == other.server_id
            && self.server_uid == other.server_uid
            && ((self.last_update.is_none() && other.last_update.is_none()) || (self.last_update.is_some() && other.last_update.is_some() && self.last_update.as_ref().unwrap().deep_eq(other.last_update.as_ref().unwrap())))
            && self.history_moments == other.history_moments
    }
}
