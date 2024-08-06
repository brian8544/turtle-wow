#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct UnitInstance {
    pub instance_meta_id: u32,
    pub entered: u64,
    pub map_id: u16,
    pub instance_id: u32,
    pub uploaded_user: u32,
    pub ready_to_zip: bool,
    pub upload_id: u32
}
