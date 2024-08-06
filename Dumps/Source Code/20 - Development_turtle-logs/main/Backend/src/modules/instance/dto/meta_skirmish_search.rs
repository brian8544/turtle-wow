#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct MetaSkirmishSearch {
    pub map_id: u16,
    pub server_id: u32,
    pub winner: Option<bool>,
    pub start_ts: u64,
    pub end_ts: Option<u64>,
    pub can_delete: bool,
}
