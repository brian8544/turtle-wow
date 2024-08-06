use crate::modules::armory::domain_value::ArenaTeamSizeType;
use crate::modules::armory::dto::ArenaTeamDto;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ArenaTeam {
    pub id: u32,
    pub server_uid: u64,
    pub server_id: u32,
    pub team_name: String,
    pub size_type: ArenaTeamSizeType,
}

impl PartialEq for ArenaTeam {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl ArenaTeam {
    pub fn compare_by_value(&self, other: &ArenaTeamDto) -> bool {
        self.server_uid == other.team_id && self.team_name == other.name && self.size_type == ArenaTeamSizeType::from_tc_u8(other.team_type)
    }

    pub fn deep_eq(&self, other: &Self) -> bool {
        self.id == other.id && self.server_uid == other.server_uid && self.server_id == other.server_id && self.team_name == other.team_name && self.size_type == other.size_type
    }
}
