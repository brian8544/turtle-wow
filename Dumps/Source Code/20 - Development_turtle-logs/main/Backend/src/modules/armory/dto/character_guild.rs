use crate::{
    dto::CheckPlausability,
    modules::armory::{domain_value::GuildRank, dto::GuildDto},
};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CharacterGuildDto {
    pub guild: GuildDto,
    pub rank: GuildRank,
}

impl CheckPlausability for CharacterGuildDto {
    fn is_plausible(&self) -> bool {
        self.guild.is_plausible() && self.rank.is_plausible()
    }
}
