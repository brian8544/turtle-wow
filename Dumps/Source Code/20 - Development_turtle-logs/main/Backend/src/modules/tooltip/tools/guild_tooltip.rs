use crate::modules::{
    armory::{tools::GetGuild, Armory},
    tooltip::{dto::TooltipFailure, material::GuildTooltip, Tooltip},
};

pub trait RetrieveGuildTooltip {
    fn get_guild(&self, armory: &Armory, guild_id: u32) -> Result<GuildTooltip, TooltipFailure>;
}

impl RetrieveGuildTooltip for Tooltip {
    fn get_guild(&self, armory: &Armory, guild_id: u32) -> Result<GuildTooltip, TooltipFailure> {
        if guild_id == 0 {
            return Ok(GuildTooltip {
                guild_id,
                guild_name: "Pug Raid".to_string(),
                num_member: 0
            });
        }

        let guild = armory.get_guild(guild_id);
        if guild.is_none() {
            return Err(TooltipFailure::InvalidInput);
        }
        let guild = guild.unwrap();

        let characters = armory.characters.read().unwrap();
        let num_member = characters
            .iter()
            .filter(|(_, character)| character.last_update.is_some())
            .filter(|(_, character)| character.last_update.as_ref().unwrap().character_guild.is_some())
            .filter(|(_, character)| character.last_update.as_ref().unwrap().character_guild.as_ref().unwrap().guild_id == guild_id)
            .count();

        Ok(GuildTooltip { guild_id, guild_name: guild.name, num_member })
    }
}
