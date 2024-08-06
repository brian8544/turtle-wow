use crate::dto::TableFilter;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct BattlegroundSearchFilter {
    pub page: u32,
    pub map_id: TableFilter<u16>,
    pub server_id: TableFilter<u32>,
    pub score_alliance: TableFilter<u32>,
    pub score_horde: TableFilter<u32>,
    pub start_ts: TableFilter<u64>,
    pub end_ts: TableFilter<u64>,
}
