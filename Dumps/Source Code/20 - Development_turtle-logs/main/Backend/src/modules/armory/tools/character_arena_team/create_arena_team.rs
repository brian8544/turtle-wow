use crate::modules::armory::domain_value::{ArenaTeam, ArenaTeamSizeType};
use crate::modules::armory::dto::{ArenaTeamDto, ArmoryFailure};
use crate::modules::armory::tools::GetArenaTeam;
use crate::modules::armory::Armory;
use crate::params;
use crate::util::database::*;

pub trait CreateArenaTeam {
    fn create_arena_team(&self, db_main: &mut (impl Execute + Select), server_id: u32, arena_team_dto: ArenaTeamDto) -> Result<ArenaTeam, ArmoryFailure>;
}

impl CreateArenaTeam for Armory {
    fn create_arena_team(&self, db_main: &mut (impl Execute + Select), server_id: u32, arena_team_dto: ArenaTeamDto) -> Result<ArenaTeam, ArmoryFailure> {
        if let Some(arena_team) = self.get_arena_team_by_uid(db_main, server_id, arena_team_dto.team_id) {
            return Ok(arena_team);
        }

        let params = params!(
          "server_uid" => arena_team_dto.team_id,
          "server_id" => server_id,
          "team_name" => arena_team_dto.name,
          "size_type" => ArenaTeamSizeType::from_tc_u8(arena_team_dto.team_type).to_u8()
        );

        // It may fail due to the unique constraint if a race condition occurs
        db_main.execute_wparams("INSERT INTO armory_arena_team (`server_uid`, `server_id`, `team_name`, `size_type`) VALUES (:server_uid, :server_id, :team_name, :size_type)", params);
        if let Some(arena_team) = self.get_arena_team_by_uid(db_main, server_id, arena_team_dto.team_id) {
            return Ok(arena_team);
        }

        Err(ArmoryFailure::Database("create_arena_team".to_owned()))
    }
}
