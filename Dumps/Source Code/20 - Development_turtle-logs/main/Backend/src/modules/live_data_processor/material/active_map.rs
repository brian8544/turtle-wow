use std::collections::HashMap;

use crate::modules::data::Data;
use crate::modules::data::tools::RetrieveNPC;
use crate::modules::live_data_processor::dto::Unit;
use crate::modules::live_data_processor::material::{IntervalBucket, Participant};
use crate::modules::live_data_processor::tools::GUID;

pub type ActiveMapMap = HashMap<u16, ActiveMap>;
pub type ActiveMapVec = Vec<ActiveMap>;

#[derive(Clone)]
pub struct ActiveMap {
    pub map_id: u16,
    pub intervals: Vec<(u64, u64)>,
    pub active_difficulty: HashMap<u8, Vec<(u64, u64)>>,
}

impl ActiveMap {
    pub fn new(map_id: u16, now: u64) -> Self {
        ActiveMap {
            map_id,
            intervals: vec![(now, now)],
            active_difficulty: HashMap::with_capacity(1),
        }
    }

    pub fn add_point(&mut self, now: u64) {
        static ACTIVE_MAP_TIMEOUT: u64 = 120000;
        let last_entry = self.intervals.last_mut().unwrap();
        if now - last_entry.1 <= ACTIVE_MAP_TIMEOUT {
            last_entry.1 = now;
        } else {
            self.intervals.push((now, now));
        }
    }
}

pub trait CollectActiveMap {
    fn collect(&mut self, data: &Data, unit: &Unit, expansion_id: u8, now: u64);
}

impl CollectActiveMap for ActiveMapMap {
    fn collect(&mut self, data: &Data, unit: &Unit, expansion_id: u8, now: u64) {
        if let Some(entry) = unit.unit_id.get_entry() {
            if let Some(npc) = data.get_npc(expansion_id, entry) {
                if let Some(map_id) = npc.map_id {
                    let intervals = self.entry(map_id).or_insert_with(|| ActiveMap::new(map_id, now));
                    intervals.add_point(now);
                }
            }
        }
    }
}

pub trait RetrieveActiveMap {
    fn get_current_active_map(&self, suggested_instances: &Vec<(u64, u16, u8)>, player_participants: &IntervalBucket<Participant>, expansion_id: u8, current_timestamp: u64) -> Option<(u16, Option<u8>)>;
}

impl RetrieveActiveMap for ActiveMapVec {
    fn get_current_active_map(&self, suggested_instances: &Vec<(u64, u16, u8)>, player_participants: &IntervalBucket<Participant>, expansion_id: u8, current_timestamp: u64) -> Option<(u16, Option<u8>)> {
        let mut chosen_map = None;
        for active_map in self.iter() {
            for (start, end) in active_map.intervals.iter() {
                if *start - 5000 <= current_timestamp && *end + 5000 >= current_timestamp {
                    chosen_map = Some(active_map);
                    break;
                }
            }
        }

        chosen_map.and_then(|map| {
            if expansion_id < 3 {
                return Some((map.map_id, None));
            }

            for (ts, map_id, difficulty) in suggested_instances.iter().rev() {
                if *ts <= current_timestamp && *map_id == map.map_id {
                    return Some((map.map_id, Some(*difficulty)));
                }
            }

            for (ts, map_id, difficulty) in suggested_instances.iter() {
                if *ts >= current_timestamp && *map_id == map.map_id {
                    return Some((map.map_id, Some(*difficulty)));
                }
            }

            let mut difficulty_id = None;
            for (pot_diff_id, intervals) in map.active_difficulty.iter() {
                for (start, end) in intervals.iter() {
                    if *start - 1000 <= current_timestamp && *end + 1000 >= current_timestamp {
                        difficulty_id = Some(*pot_diff_id);
                        break;
                    }
                }
            }

            if difficulty_id.is_none() {
                if player_participants.find_unique_ids_within_range(current_timestamp as i64 - 40000, current_timestamp as i64 + 40000).len() >= 13 {
                    difficulty_id = Some(4);
                } else {
                    difficulty_id = Some(3);
                }
            }

            difficulty_id.map(|difficulty_id| (map.map_id, Some(difficulty_id)))
        })
    }
}
