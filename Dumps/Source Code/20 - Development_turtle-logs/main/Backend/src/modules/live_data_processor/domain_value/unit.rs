use crate::modules::live_data_processor::domain_value::{Creature, Player};

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq)]
pub enum Unit {
    Player(Player),
    Creature(Creature),
}

impl Unit {
    pub fn get_owner_or_self(&self) -> Self {
        if let Unit::Creature(creature) = self {
            if let Some(owner) = &creature.owner {
                return owner.get_owner_or_self();
            }
        }
        self.clone()
    }
}
