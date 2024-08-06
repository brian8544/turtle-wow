use crate::modules::armory::{domain_value::GuildRank, dto::CharacterGuildDto};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterGuild {
    pub guild_id: u32,
    pub rank: GuildRank,
}

impl PartialEq for CharacterGuild {
    fn eq(&self, other: &Self) -> bool {
        self.guild_id == other.guild_id && self.rank == other.rank
    }
}

impl CharacterGuild {
    pub fn compare_by_value(&self, other: &CharacterGuildDto) -> bool {
        self.rank == other.rank
        // Technically we would need to compare the guild as well :/
    }

    pub fn deep_eq(&self, other: &Self) -> bool {
        self.eq(other)
    }
}
