use crate::modules::armory::dto::ArmoryFailure;
use crate::modules::armory::Armory;
use crate::params;
use crate::util::database::*;

pub trait UpdateArenaTeam {
    fn update_arena_team_name(&self, db_main: &mut impl Execute, team_id: u32, new_name: String) -> Result<(), ArmoryFailure>;
}

impl UpdateArenaTeam for Armory {
    fn update_arena_team_name(&self, db_main: &mut impl Execute, team_id: u32, new_name: String) -> Result<(), ArmoryFailure> {
        if new_name.trim().is_empty() {
            return Err(ArmoryFailure::InvalidInput);
        }

        let params = params!(
          "team_id" => team_id,
          "team_name" => new_name
        );

        db_main.execute_wparams("UPDATE armory_arena_team SET team_name=:team_name WHERE id=:team_id", params);
        Ok(())
    }
}
