use crate::params;
use crate::util::database::*;

use crate::modules::armory::{dto::ArmoryFailure, tools::GetGuild, Armory};

pub trait UpdateGuild {
    fn update_guild_name(&self, db_main: &mut impl Execute, server_id: u32, uid: u64, guild_name: String) -> Result<(), ArmoryFailure>;
}

impl UpdateGuild for Armory {
    fn update_guild_name(&self, db_main: &mut impl Execute, server_id: u32, uid: u64, guild_name: String) -> Result<(), ArmoryFailure> {
        let guild_id = self.get_guild_id_by_uid(server_id, uid).unwrap();
        let mut guilds = self.guilds.write().unwrap();
        if db_main.execute_wparams(
            "UPDATE armory_guild SET guild_name=:guild_name WHERE server_id=:server_id AND server_uid=:server_uid",
            params!(
              "server_id" => server_id,
              "server_uid" => uid,
              "guild_name" => guild_name.clone()
            ),
        ) {
            let mut guild = guilds.get_mut(&guild_id).unwrap();
            guild.name = guild_name;
            return Ok(());
        }
        Err(ArmoryFailure::InvalidInput)
    }
}
