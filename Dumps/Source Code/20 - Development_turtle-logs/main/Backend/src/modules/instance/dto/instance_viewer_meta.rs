use crate::modules::instance::dto::InstanceViewerGuild;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct InstanceViewerMeta {
    pub instance_meta_id: u32,
    pub guild: Option<InstanceViewerGuild>,
    pub server_id: u32,
    pub expansion_id: u8,
    pub map_id: u16,
    pub map_difficulty: Option<u8>,
    pub start_ts: u64,
    pub end_ts: Option<u64>,
    pub expired: Option<u64>,
    pub upload_id: u32,
}
