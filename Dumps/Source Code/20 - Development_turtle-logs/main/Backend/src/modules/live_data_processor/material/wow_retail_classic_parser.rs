use crate::modules::data::Data;
use crate::modules::live_data_processor::dto::Unit;
use crate::modules::live_data_processor::material::{ActiveMapMap, CollectActiveMap, Participant};
use std::collections::{BTreeSet, HashMap};

pub struct WoWRetailClassicParser {
    pub participants: HashMap<u64, Participant>,
    pub active_map: ActiveMapMap,
}

impl WoWRetailClassicParser {
    pub fn new() -> Self {
        WoWRetailClassicParser {
            participants: Default::default(),
            active_map: Default::default(),
        }
    }

    pub fn collect_participant(&mut self, unit: &Unit, guid: &str, name: &str, now: u64) {
        if let Some(participants) = self.participants.get_mut(&unit.unit_id) {
            participants.add_participation_point(now);
        } else if unit.is_player {
            let guid_parts = guid.split('-').collect::<Vec<&str>>();
            // Is that hex or decimal?
            if let Ok(server_id) = u32::from_str_radix(guid_parts[1], 16) {
                let names = name.split('-').collect::<Vec<&str>>();
                let mut participant = Participant::new(unit.unit_id, unit.is_player, names[0].replace("\"", ""), now);
                participant.server = Some((server_id, names[1].replace("\"", "")));
                self.participants.insert(unit.unit_id, participant);
            }
        } else {
            self.participants.insert(unit.unit_id, Participant::new(unit.unit_id, unit.is_player, name.replace("\"", ""), now));
        }
    }

    pub fn collect_participant_class(&mut self, unit: &Unit, spell_id: u32) {
        lazy_static! {
            static ref WARRIOR_SPELLS: BTreeSet<u32> = [25286, 23894, 20647, 1680, 12721, 20569, 7373, 21553, 11585,].iter().cloned().collect();
            static ref PALADIN_SPELLS: BTreeSet<u32> = [].iter().cloned().collect();
            static ref ROGUE_SPELLS: BTreeSet<u32> = [25300, 13877, 22482, 11300, 11337, 11290, 11269, 1769].iter().cloned().collect();
            static ref PRIEST_SPELLS: BTreeSet<u32> = [6063, 6064, 10917, 25316, 25314].iter().cloned().collect();
            static ref HUNTER_SPELLS: BTreeSet<u32> = [75, 20904, 25294].iter().cloned().collect();
            static ref MAGE_SPELLS: BTreeSet<u32> = [25306, 12654, 10207, 10202, 10199, 13021, 10161, 10181, 10187, 10230].iter().cloned().collect();
            static ref WARLOCK_SPELLS: BTreeSet<u32> = [25307, 25311, 18871, 11682].iter().cloned().collect();
            static ref SHAMAN_SPELLS: BTreeSet<u32> = [15208, 10605, 403, 10392, 26363, 1064, 10622, 10623, 10448, 939, 10395, 10468, 25357].iter().cloned().collect();
            static ref DRUID_SPELLS: BTreeSet<u32> = [9881, 9908, 25299, 5187, 5188, 25297, 9858, 25298, 2912, 9912].iter().cloned().collect();
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

    pub fn collect_active_map(&mut self, data: &Data, unit: &Unit, now: u64) {
        self.active_map.collect(data, unit, 1, now);
    }
}
