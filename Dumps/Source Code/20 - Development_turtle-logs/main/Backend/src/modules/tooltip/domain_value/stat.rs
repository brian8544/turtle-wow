#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct Stat {
    pub value: u16,
    pub name: String,
}

impl PartialEq for Stat {
    fn eq(&self, other: &Self) -> bool {
        self.value == other.value && self.name == other.name
    }
}
