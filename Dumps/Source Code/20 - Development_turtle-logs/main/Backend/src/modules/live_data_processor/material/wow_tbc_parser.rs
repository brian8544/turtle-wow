use crate::modules::data::Data;
use crate::modules::live_data_processor::dto::{Message, Unit};
use crate::modules::live_data_processor::material::{ActiveMapMap, CollectActiveMap, Participant};
use std::collections::{BTreeSet, HashMap};

pub struct WoWTBCParser {
    pub server_id: u32,

    pub participants: HashMap<u64, Participant>,
    pub active_map: ActiveMapMap,

    // Hacky
    pub bonus_messages: Vec<Message>,
}

impl WoWTBCParser {
    pub fn new(server_id: u32) -> Self {
        WoWTBCParser {
            server_id,
            participants: Default::default(),
            active_map: Default::default(),
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

    pub fn collect_participant_class(&mut self, unit: &Unit, spell_id: u32) {
        lazy_static! {
            static ref WARRIOR_SPELLS: BTreeSet<u32> = [30335, 30339, 30340, 20647, 29707, 12328, 12723, 44949, 1680, 12721, 34428, 30330, 25242, 30356, 25212, 30022, 30357].iter().cloned().collect();
            static ref PALADIN_SPELLS: BTreeSet<u32> = [27173, 27179, 1042, 10328, 27136, 27155, 27156, 27164, 27162, 27163, 20355, 27157, 27137, 27159, 35395, 31892, 32221, 31893, 31898, 32220]
                .iter()
                .cloned()
                .collect();
            static ref ROGUE_SPELLS: BTreeSet<u32> = [26862, 13877, 22482, 27187, 26867, 26865, 26884].iter().cloned().collect();
            static ref PRIEST_SPELLS: BTreeSet<u32> = [25387, 25375, 25368, 34917, 25213, 10963, 25235].iter().cloned().collect();
            static ref HUNTER_SPELLS: BTreeSet<u32> = [34120, 75, 27021, 27019, 27026].iter().cloned().collect();
            static ref MAGE_SPELLS: BTreeSet<u32> = [30451, 36032, 27072, 27087, 27070, 27082, 33043, 12654, 27074, 27079, 25028, 27086].iter().cloned().collect();
            static ref WARLOCK_SPELLS: BTreeSet<u32> = [27209, 27243, 27285, 30910, 27215, 30546, 29341, 27218, 27223, 30405, 30911].iter().cloned().collect();
            static ref SHAMAN_SPELLS: BTreeSet<u32> = [25449, 37661, 45296, 25442, 45302, 25537, 25457, 25454, 25504, 33750, 32175, 32176, 17364, 10622, 25422, 25423, 25357, 25396, 331, 25420]
                .iter()
                .cloned()
                .collect();
            static ref DRUID_SPELLS: BTreeSet<u32> = [26986, 26988, 27013, 27002, 27008, 33983, 33987, 26982, 26980].iter().cloned().collect();
        }

        if !unit.is_player {
            return;
        }

        if let Some(participant) = self.participants.get_mut(&unit.unit_id) {
            if participant.hero_class_id.is_none() {
                if WARRIOR_SPELLS.contains(&spell_id) {
                    participant.hero_class_id = Some(1);
                } else if PALADIN_SPELLS.contains(&spell_id) {
                    participant.hero_class_id = Some(2);
                } else if HUNTER_SPELLS.contains(&spell_id) {
                    participant.hero_class_id = Some(3);
                } else if ROGUE_SPELLS.contains(&spell_id) {
                    participant.hero_class_id = Some(4);
                } else if PRIEST_SPELLS.contains(&spell_id) {
                    participant.hero_class_id = Some(5);
                } else if SHAMAN_SPELLS.contains(&spell_id) {
                    participant.hero_class_id = Some(7);
                } else if MAGE_SPELLS.contains(&spell_id) {
                    participant.hero_class_id = Some(8);
                } else if WARLOCK_SPELLS.contains(&spell_id) {
                    participant.hero_class_id = Some(9);
                } else if DRUID_SPELLS.contains(&spell_id) {
                    participant.hero_class_id = Some(11);
                }
            }
        }
    }

    pub fn is_owner_binding_pet_ability(&self, spell_id: u32) -> bool {
        lazy_static! {
            static ref ABILITIES: BTreeSet<u32> = [25228, 27046, 43771, 6991, 34953].iter().cloned().collect();
        }
        ABILITIES.contains(&spell_id)
    }

    pub fn collect_active_map(&mut self, data: &Data, unit: &Unit, now: u64) {
        self.active_map.collect(data, unit, 2, now);
    }
}
