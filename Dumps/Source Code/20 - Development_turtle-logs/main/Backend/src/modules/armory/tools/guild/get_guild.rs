use crate::modules::armory::{material::Guild, Armory};

pub trait GetGuild {
    fn get_guild_id_by_name(&self, server_id: u32, name: String) -> Option<u32>;
    fn get_guild_by_name(&self, server_id: u32, name: String) -> Option<Guild>;
    fn get_guild_id_by_uid(&self, server_id: u32, uid: u64) -> Option<u32>;
    fn get_guild_by_uid(&self, server_id: u32, uid: u64) -> Option<Guild>;
    fn get_guild(&self, guild_id: u32) -> Option<Guild>;
    fn get_guilds_by_name(&self, guild_name: String) -> Vec<Guild>;
}

impl GetGuild for Armory {
    fn get_guild_id_by_name(&self, server_id: u32, name: String) -> Option<u32> {
        let guilds = self.guilds.read().unwrap();
        guilds.iter().find(|(_, guild)| guild.server_id == server_id && guild.name == name).map(|(id, _)| *id)
    }

    fn get_guild_by_name(&self, server_id: u32, name: String) -> Option<Guild> {
        self.get_guild_id_by_name(server_id, name).and_then(|guild_id| self.get_guild(guild_id))
    }

    fn get_guild_id_by_uid(&self, server_id: u32, uid: u64) -> Option<u32> {
        let guilds = self.guilds.read().unwrap();
        guilds.iter().find(|(_, guild)| guild.server_id == server_id && guild.server_uid == uid).map(|(id, _)| *id)
    }

    fn get_guild_by_uid(&self, server_id: u32, uid: u64) -> Option<Guild> {
        self.get_guild_id_by_uid(server_id, uid).and_then(|guild_id| self.get_guild(guild_id))
    }

    fn get_guild(&self, guild_id: u32) -> Option<Guild> {
        let guilds = self.guilds.read().unwrap();
        guilds.get(&guild_id).cloned()
    }

    fn get_guilds_by_name(&self, guild_name: String) -> Vec<Guild> {
        let guilds = self.guilds.read().unwrap();
        let name = guild_name.to_lowercase();
        guilds.iter().filter(|(_, guild)| guild.name.contains(&name)).map(|(_, guild)| guild.clone()).collect()
    }
}
