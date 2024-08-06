use crate::modules::{
    armory::{
        dto::{ArmoryFailure, GuildViewerDto, GuildViewerMemberDto},
        tools::GetGuild,
        Armory,
    },
    data::{tools::RetrieveRace, Data},
};

pub trait GuildViewer {
    fn get_guild_view(&self, guild_id: u32) -> Result<GuildViewerDto, ArmoryFailure>;
    fn get_guild_roster(&self, data: &Data, guild_id: u32) -> Vec<GuildViewerMemberDto>;
}

impl GuildViewer for Armory {
    fn get_guild_view(&self, guild_id: u32) -> Result<GuildViewerDto, ArmoryFailure> {
        let guild = self.get_guild(guild_id).ok_or(ArmoryFailure::InvalidInput)?;
        Ok(GuildViewerDto {
            guild_id,
            guild_name: guild.name,
            ranks: guild.ranks,
            server_id: guild.server_id,
        })
    }

    fn get_guild_roster(&self, data: &Data, guild_id: u32) -> Vec<GuildViewerMemberDto> {
        let characters = self.characters.read().unwrap();
        characters
            .iter()
            .filter(|(_, character)| character.last_update.is_some())
            .filter(|(_, character)| character.last_update.as_ref().unwrap().character_guild.is_some())
            .filter(|(_, character)| character.last_update.as_ref().unwrap().character_guild.as_ref().unwrap().guild_id == guild_id)
            .map(|(character_id, character)| {
                let last_update = character.last_update.as_ref().unwrap();
                let race = data.get_race(last_update.character_info.race_id).unwrap();

                GuildViewerMemberDto {
                    character_id: *character_id,
                    character_name: last_update.character_name.clone(),
                    faction: race.faction,
                    race_id: race.id,
                    hero_class_id: last_update.character_info.hero_class_id,
                    rank_index: last_update.character_guild.as_ref().unwrap().rank.index,
                    last_seen: last_update.timestamp,
                }
            })
            .collect()
    }
}
