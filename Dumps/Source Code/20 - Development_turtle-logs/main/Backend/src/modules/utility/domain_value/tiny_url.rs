#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct TinyUrl {
    pub id: u32,
    pub url_payload: String,
}
