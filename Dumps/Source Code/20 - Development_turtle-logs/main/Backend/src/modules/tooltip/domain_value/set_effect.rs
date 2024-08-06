#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct SetEffect {
    pub threshold: u8,
    pub description: String,
}
