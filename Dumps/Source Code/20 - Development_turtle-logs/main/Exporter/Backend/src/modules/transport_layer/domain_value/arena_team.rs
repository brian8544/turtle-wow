#[derive(Debug, Clone, Serialize)]
pub struct ArenaTeam {
    pub team_id: u64,
    pub name: String,
    pub team_type: u8,
    pub team_rating: u16,
    pub personal_rating: u16,
}
