#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct InstancePrivacy {
    pub instance_meta_id: u32,
    pub privacy_option: u8,
    pub privacy_group: u32,
}