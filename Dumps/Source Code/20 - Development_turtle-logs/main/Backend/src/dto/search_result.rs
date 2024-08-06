#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct SearchResult<T> {
    pub result: Vec<T>,
    pub num_items: usize,
}
