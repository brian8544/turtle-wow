use crate::modules::transport_layer::{GuildDto, GuildRank};

#[derive(Debug, Clone, Serialize)]
pub struct CharacterGuildDto {
    pub guild: GuildDto,
    pub rank: GuildRank,
}
