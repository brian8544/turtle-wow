use crate::modules::live_data_processor::domain_value::Unit;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Creature {
    pub creature_id: u64,
    pub entry: u32,
    pub owner: Option<Box<Unit>>,
}

impl PartialEq for Creature {
    fn eq(&self, other: &Self) -> bool {
        self.creature_id == other.creature_id
    }
}
