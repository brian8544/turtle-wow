use crate::modules::armory::{domain_value::GuildRank, dto::GuildDto};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Guild {
    pub id: u32,
    pub server_id: u32,
    pub server_uid: u64,
    pub name: String,
    pub ranks: Vec<GuildRank>,
}

impl PartialEq for Guild {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Guild {
    pub fn deep_eq(&self, other: &Self) -> bool {
        self.id == other.id && self.server_id == other.server_id && self.server_uid == other.server_uid && self.name == other.name && self.ranks.iter().all(|rank| other.ranks.contains(rank))
    }

    pub fn compare_by_value(&self, other: &GuildDto) -> bool {
        self.server_uid == other.server_uid && self.name == other.name
    }
}
