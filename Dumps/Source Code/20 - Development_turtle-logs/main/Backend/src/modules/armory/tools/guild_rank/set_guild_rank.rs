use crate::modules::armory::{domain_value::GuildRank, dto::ArmoryFailure, tools::GetGuild, Armory};
use crate::params;
use crate::util::database::*;

pub trait SetGuildRank {
    fn set_guild_rank(&self, db_main: &mut impl Execute, guild_id: u32, guild_rank: GuildRank) -> Result<(), ArmoryFailure>;
}

impl SetGuildRank for Armory {
    fn set_guild_rank(&self, db_main: &mut impl Execute, guild_id: u32, guild_rank: GuildRank) -> Result<(), ArmoryFailure> {
        let existing_guild = self.get_guild(guild_id);
        if existing_guild.is_none() {
            return Err(ArmoryFailure::InvalidInput);
        }
        let existing_guild = existing_guild.unwrap();
        if existing_guild.ranks.contains(&guild_rank) {
            return Ok(()); // Nothing to do
        }

        let mut guilds = self.guilds.write().unwrap();
        if db_main.execute_wparams(
            "REPLACE INTO armory_guild_rank (`guild_id`, `rank_index`, `name`) VALUES (:guild_id, :rank_index, :name)",
            params!(
              "guild_id" => guild_id,
              "rank_index" => guild_rank.index,
              "name" => guild_rank.name.clone()
            ),
        ) {
            let guild = guilds.get_mut(&guild_id).unwrap();
            if let Some(rank) = guild.ranks.iter_mut().find(|rank| rank.index == guild_rank.index) {
                rank.name = guild_rank.name.to_owned();
            } else {
                guild.ranks.push(guild_rank);
            }
            return Ok(());
        }
        Err(ArmoryFailure::Database("set_guild_rank".to_string()))
    }
}
