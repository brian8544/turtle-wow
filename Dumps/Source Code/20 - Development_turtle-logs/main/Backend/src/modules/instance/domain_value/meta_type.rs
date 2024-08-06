use crate::modules::armory::domain_value::ArenaTeam;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub enum MetaType {
    Raid {
        map_difficulty: u8,
    },
    RatedArena {
        winner: Option<bool>,
        team1: ArenaTeam,
        team2: ArenaTeam,
        team1_change: i32,
        team2_change: i32,
    },
    Skirmish {
        winner: Option<bool>,
    },
    Battleground {
        winner: Option<bool>,
        score_alliance: u32,
        score_horde: u32,
    },
}

impl MetaType {
    pub fn to_u8(&self) -> u8 {
        match self {
            MetaType::Raid { .. } => 0,
            MetaType::RatedArena { .. } => 1,
            MetaType::Skirmish { .. } => 2,
            MetaType::Battleground { .. } => 3,
        }
    }
}
