use crate::modules::armory::domain_value::ArenaTeam;
use crate::modules::armory::dto::{ArenaTeamDto, ArmoryFailure};
use crate::modules::armory::tools::{CreateArenaTeam, GetArenaTeam, UpdateArenaTeam};
use crate::modules::armory::Armory;
use crate::util::database::{Execute, Select};

pub trait SetArenaTeam {
    fn set_arena_team(&self, db_main: &mut (impl Execute + Select), server_id: u32, arena_team_dto: ArenaTeamDto) -> Result<ArenaTeam, ArmoryFailure>;
}

impl SetArenaTeam for Armory {
    fn set_arena_team(&self, db_main: &mut (impl Execute + Select), server_id: u32, arena_team_dto: ArenaTeamDto) -> Result<ArenaTeam, ArmoryFailure> {
        if let Some(arena_team) = self.get_arena_team_by_uid(db_main, server_id, arena_team_dto.team_id) {
            self.update_arena_team_name(db_main, arena_team.id, arena_team_dto.name)?;
            return Ok(arena_team);
        }
        self.create_arena_team(db_main, server_id, arena_team_dto)
    }
}
