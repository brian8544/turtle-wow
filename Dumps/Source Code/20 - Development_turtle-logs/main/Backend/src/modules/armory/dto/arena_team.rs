use crate::dto::CheckPlausability;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ArenaTeamDto {
    pub team_id: u64,
    pub name: String,
    pub team_type: u8,
    pub team_rating: u16,
    pub personal_rating: u16,
}

impl CheckPlausability for ArenaTeamDto {
    fn is_plausible(&self) -> bool {
        !self.name.is_empty() &&
      (self.team_type == 2 || self.team_type == 3 || self.team_type == 5) && // TODO: Verify these!
      self.team_rating <= 5000 &&
      self.personal_rating <= 5000
    }
}
