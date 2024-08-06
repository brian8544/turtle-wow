use crate::modules::live_data_processor::domain_value::{Creature, Player, Unit};
use crate::modules::live_data_processor::tools::LiveDataDeserializer;

impl LiveDataDeserializer for Player {
    fn deserialize(&self) -> String {
        format!("[1,{}]", self.character_id)
    }
}

impl LiveDataDeserializer for Creature {
    fn deserialize(&self) -> String {
        if let Some(owner) = &self.owner {
            return format!("[0,{},{},{}]", self.creature_id, self.entry, owner.deserialize());
        }
        format!("[0,{},{}]", self.creature_id, self.entry)
    }
}

impl LiveDataDeserializer for Unit {
    fn deserialize(&self) -> String {
        match self {
            Unit::Player(player) => player.deserialize(),
            Unit::Creature(creature) => creature.deserialize(),
        }
    }
}
