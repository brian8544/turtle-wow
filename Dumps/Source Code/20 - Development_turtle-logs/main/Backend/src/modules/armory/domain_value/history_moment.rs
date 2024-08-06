#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct HistoryMoment {
    pub id: u32,
    pub timestamp: u64,
}

impl PartialEq for HistoryMoment {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}
