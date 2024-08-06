use crate::dto::CheckPlausability;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct GuildRank {
    pub index: u8,
    pub name: String,
}

impl PartialEq for GuildRank {
    fn eq(&self, other: &Self) -> bool {
        self.index == other.index && self.name == other.name
    }
}

impl CheckPlausability for GuildRank {
    fn is_plausible(&self) -> bool {
        self.index <= 10 && !self.name.is_empty()
    }
}
