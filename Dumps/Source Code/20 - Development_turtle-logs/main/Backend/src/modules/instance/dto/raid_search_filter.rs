use crate::dto::TableFilter;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct RaidSearchFilter {
    pub page: u32,
    pub map_id: TableFilter<u16>,
    pub map_difficulty: TableFilter<u8>,
    pub guild: TableFilter<String>,
    pub server_id: TableFilter<u32>,
    pub start_ts: TableFilter<u64>,
    pub end_ts: TableFilter<u64>,
    pub privacy: TableFilter<u8>,
}
