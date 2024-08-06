use crate::modules::armory::domain_value::{ArenaTeam, ArenaTeamSizeType};
use crate::modules::armory::Armory;
use crate::params;
use crate::util::database::*;

pub trait GetArenaTeam {
    fn get_arena_team_by_uid(&self, db_main: &mut impl Select, server_id: u32, team_uid: u64) -> Option<ArenaTeam>;
    fn get_arena_team_by_id(&self, db_main: &mut impl Select, team_id: u32) -> Option<ArenaTeam>;
}

impl GetArenaTeam for Armory {
    fn get_arena_team_by_uid(&self, db_main: &mut impl Select, server_id: u32, team_uid: u64) -> Option<ArenaTeam> {
        let params = params!(
          "server_uid" => team_uid,
          "server_id" => server_id
        );

        db_main.select_wparams_value(
            "SELECT id, team_name, size_type FROM armory_arena_team WHERE server_uid=:server_uid AND server_id=:server_id",
            move |mut row| ArenaTeam {
                id: row.take(0).unwrap(),
                server_uid: team_uid,
                server_id,
                team_name: row.take(1).unwrap(),
                size_type: ArenaTeamSizeType::from_u8(row.take(2).unwrap()),
            },
            params,
        )
    }

    fn get_arena_team_by_id(&self, db_main: &mut impl Select, team_id: u32) -> Option<ArenaTeam> {
        let params = params!(
          "id" => team_id
        );

        db_main.select_wparams_value(
            "SELECT server_uid, server_id, team_name, size_type FROM armory_arena_team WHERE id=:id",
            move |mut row| ArenaTeam {
                id: team_id,
                server_uid: row.take(0).unwrap(),
                server_id: row.take(1).unwrap(),
                team_name: row.take(2).unwrap(),
                size_type: ArenaTeamSizeType::from_u8(row.take(3).unwrap()),
            },
            params,
        )
    }
}
