#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Player {
    pub character_id: u32,
}

impl PartialEq for Player {
    fn eq(&self, other: &Self) -> bool {
        self.character_id == other.character_id
    }
}
