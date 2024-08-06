#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct InstanceResetDto {
    pub map_id: u16,
    pub difficulty: u8,
    pub reset_time: u64,
}
