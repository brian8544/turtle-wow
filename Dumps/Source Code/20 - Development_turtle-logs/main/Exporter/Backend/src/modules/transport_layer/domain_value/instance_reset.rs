#[derive(Debug, Clone, Serialize)]
pub struct InstanceReset {
    pub map_id: u16,
    pub difficulty: u8,
    pub reset_time: u64,
}
