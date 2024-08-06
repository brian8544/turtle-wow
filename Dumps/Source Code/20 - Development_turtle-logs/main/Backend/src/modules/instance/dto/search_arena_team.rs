#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct SearchArenaTeam {
    pub team_id: u32,
    pub name: String,
}
