use crate::dto::TableFilter;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct RatedArenaSearchFilter {
    pub page: u32,
    pub map_id: TableFilter<u16>,
    pub team1: TableFilter<String>,
    pub team2: TableFilter<String>,
    pub server_id: TableFilter<u32>,
    pub team1_change: TableFilter<i32>,
    pub team2_change: TableFilter<i32>,
    pub start_ts: TableFilter<u64>,
    pub end_ts: TableFilter<u64>,
}
