use crate::params;
use crate::util::database::*;

use crate::modules::armory::{dto::ArmoryFailure, tools::GetGuild, Armory};

pub trait DeleteGuild {
    fn delete_guild(&self, db_main: &mut impl Execute, id: u32) -> Result<(), ArmoryFailure>;
    fn delete_guild_by_uid(&self, db_main: &mut impl Execute, server_id: u32, uid: u64) -> Result<(), ArmoryFailure>;
}

impl DeleteGuild for Armory {
    fn delete_guild(&self, db_main: &mut impl Execute, id: u32) -> Result<(), ArmoryFailure> {
        let mut guilds = self.guilds.write().unwrap();
        if db_main.execute_wparams(
            "DELETE FROM armory_guild WHERE id=:id",
            params!(
              "id" => id
            ),
        ) {
            return guilds.remove(&id).ok_or_else(|| ArmoryFailure::Database("Invalid guild id o.O".to_owned())).map(|_| ());
        }
        Err(ArmoryFailure::Database("delete_guild".to_owned()))
    }

    fn delete_guild_by_uid(&self, db_main: &mut impl Execute, server_id: u32, uid: u64) -> Result<(), ArmoryFailure> {
        self.get_guild_id_by_uid(server_id, uid).ok_or(ArmoryFailure::InvalidInput).and_then(|id| self.delete_guild(db_main, id))
    }
}
