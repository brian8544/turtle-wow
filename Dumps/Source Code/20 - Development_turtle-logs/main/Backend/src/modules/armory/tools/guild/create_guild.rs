use crate::params;
use crate::util::database::*;

use crate::modules::armory::{
    dto::{ArmoryFailure, GuildDto},
    material::Guild,
    tools::GetGuild,
    Armory,
};

pub trait CreateGuild {
    fn create_guild(&self, db_main: &mut (impl Select + Execute), server_id: u32, guild: GuildDto) -> Result<Guild, ArmoryFailure>;
}

impl CreateGuild for Armory {
    fn create_guild(&self, db_main: &mut (impl Select + Execute), server_id: u32, guild: GuildDto) -> Result<Guild, ArmoryFailure> {
        // Validation
        if guild.server_uid == 0 {
            return Err(ArmoryFailure::InvalidInput);
        }

        // Check if it already exists, if so return existing one
        if let Some(existing_guild) = self.get_guild_by_uid(server_id, guild.server_uid) {
            return Ok(existing_guild);
        }

        // Else create one
        let mut guilds = self.guilds.write().unwrap();
        if db_main.execute_wparams(
            "INSERT INTO armory_guild (`server_id`, `server_uid`, `guild_name`) VALUES (:server_id, :server_uid, :guild_name)",
            params!(
              "server_id" => server_id,
              "server_uid" => guild.server_uid,
              "guild_name" => guild.name.clone()
            ),
        ) {
            let guild_id = db_main
                .select_wparams_value(
                    "SELECT id FROM armory_guild WHERE server_id=:server_id AND server_uid=:server_uid",
                    |mut row| {
                        let id: u32 = row.take(0).unwrap();
                        id
                    },
                    params!(
                      "server_id" => server_id,
                      "server_uid" => guild.server_uid
                    ),
                )
                .unwrap();

            let new_guild = Guild {
                id: guild_id,
                server_uid: guild.server_uid,
                name: guild.name,
                server_id,
                ranks: Vec::new(),
            };
            guilds.insert(new_guild.id, new_guild.clone());

            return Ok(new_guild);
        }

        Err(ArmoryFailure::Database("create_guild".to_owned()))
    }
}
