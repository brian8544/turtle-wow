use crate::modules::data::Data;
use crate::modules::live_data_processor::dto::{Message, Unit};
use crate::modules::live_data_processor::material::{ActiveMapMap, CollectActiveMap, Participant};
use std::collections::HashMap;

pub struct WoWVanillaParser {
    pub server_id: u32,

    pub participants: HashMap<u64, Participant>,
    pub active_map: ActiveMapMap,
    pub pet_owner: HashMap<u64, u64>,

    pub cache_unit: HashMap<String, Unit>,
    pub cache_spell_id: HashMap<String, Option<u32>>,

    // Hacky
    pub bonus_messages: Vec<Message>,
}

impl WoWVanillaParser {
    pub fn new(server_id: u32) -> Self {
        WoWVanillaParser {
            server_id,
            participants: Default::default(),
            active_map: Default::default(),
            pet_owner: Default::default(),
            cache_unit: Default::default(),
            cache_spell_id: Default::default(),
            bonus_messages: Default::default(),
        }
    }

    pub fn collect_participant(&mut self, unit: &Unit, name: &str, now: u64) {
        if let Some(participants) = self.participants.get_mut(&unit.unit_id) {
            participants.add_participation_point(now);
        } else {
            self.participants.insert(unit.unit_id, Participant::new(unit.unit_id, unit.is_player, name.replace("\"", ""), now));
        }
    }

    pub fn collect_active_map(&mut self, data: &Data, unit: &Unit, now: u64) {
        self.active_map.collect(data, unit, 1, now);
    }
}
