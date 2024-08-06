use crate::modules::instance::dto::SearchArenaTeam;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct MetaRatedArenaSearch {
    pub map_id: u16,
    pub team1: SearchArenaTeam,
    pub team2: SearchArenaTeam,
    pub winner: Option<bool>,
    pub server_id: u32,
    pub team1_change: i32,
    pub team2_change: i32,
    pub start_ts: u64,
    pub end_ts: Option<u64>,
    pub can_delete: bool,
}
