#![allow(clippy::type_complexity)]

use crate::modules::live_data_processor::material::interval_bucket::UniqueBucketId;

#[derive(Debug, Clone)]
pub struct Participant {
    pub id: u64,
    pub is_player: bool,
    pub name: String,
    pub hero_class_id: Option<u8>,
    pub gender_id: Option<bool>,
    pub race_id: Option<u8>,
    pub guild_args: Option<(String, String, u8)>,
    pub talents: Option<String>,
    pub server: Option<(u32, String)>,
    pub gear_setups: Option<Vec<(u64, Vec<Option<(u32, Option<u32>, Option<Vec<Option<u32>>>)>>)>>,
    pub active_intervals: Vec<(u64, u64)>,
    available_effective_heal: u32,

    // Technical
    pub last_seen: u64,
}

impl Participant {
    pub fn new(id: u64, is_player: bool, name: String, last_seen: u64) -> Self {
        Participant {
            id,
            is_player,
            hero_class_id: None,
            gender_id: None,
            race_id: None,
            name,
            server: None,
            gear_setups: None,
            active_intervals: vec![(last_seen, last_seen)],
            last_seen,
            guild_args: None,
            available_effective_heal: 0,
            talents: None,
        }
    }

    // Assumes that now > last_seen
    pub fn add_participation_point(&mut self, now: u64) {
        static PARTICIPATION_TIMEOUT: u64 = 5 * 60000;
        if now > self.last_seen {
            if now - self.last_seen <= PARTICIPATION_TIMEOUT {
                self.active_intervals.last_mut().unwrap().1 = now;
            } else {
                self.active_intervals.last_mut().unwrap().1 = self.last_seen + 30000;
                self.active_intervals.push((now, now));
            }
            self.last_seen = now;
        }
    }

    pub fn attribute_damage(&mut self, damage: u32) {
        self.available_effective_heal += damage;
    }

    pub fn attribute_heal(&mut self, heal: u32) -> u32 {
        let effective_heal;
        if heal > self.available_effective_heal {
            effective_heal = self.available_effective_heal;
            self.available_effective_heal = 0;
        } else {
            self.available_effective_heal -= heal;
            effective_heal = heal;
        }
        effective_heal
    }
}

impl UniqueBucketId for Participant {
    fn get_unique_bucket_id(&self) -> u64 {
        self.id
    }
}
