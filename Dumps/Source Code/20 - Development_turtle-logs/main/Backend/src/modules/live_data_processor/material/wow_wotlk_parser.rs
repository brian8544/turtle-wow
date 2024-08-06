use crate::modules::data::Data;
use crate::modules::live_data_processor::dto::{Message, Unit};
use crate::modules::live_data_processor::material::{ActiveMapMap, CollectActiveMap, Participant};
use std::collections::{BTreeSet, HashMap};

pub struct WoWWOTLKParser {
    pub server_id: u32,

    pub participants: HashMap<u64, Participant>,
    pub active_map: ActiveMapMap,

    // Hacky
    pub bonus_messages: Vec<Message>,
}

impl WoWWOTLKParser {
    pub fn new(server_id: u32) -> Self {
        WoWWOTLKParser {
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
            static ref WARRIOR_SPELLS: BTreeSet<u32> = [47450, 57755, 23881, 23880, 23885, 12721, 12721, 1680, 44949, 46916, 50783, 47488, 47498, 57823, 46968, 47520, 7384, 20647, 47502]
                .iter()
                .cloned()
                .collect();
            static ref PALADIN_SPELLS: BTreeSet<u32> =
                [53739, 20167, 20424, 20375, 53736, 20165, 20166, 20271, 53733, 20186, 68066, 54158, 20185, 54153, 20267, 20467, 53408, 48819, 53385, 54172, 35395, 53742, 61411, 61840, 53595, 48801, 48952, 48827, 61411, 48782, 54968]
                    .iter()
                    .cloned()
                    .collect();
            static ref ROGUE_SPELLS: BTreeSet<u32> = [57965, 57993, 57970, 48665, 48664, 48666, 51723, 52874, 48676, 48691].iter().cloned().collect();
            static ref PRIEST_SPELLS: BTreeSet<u32> = [52985, 56160, 48071, 33110, 48156, 58381, 48160, 48300, 48127, 48125, 63675, 75999, 53022, 53023, 48072, 48068, 64844].iter().cloned().collect();
            static ref HUNTER_SPELLS: BTreeSet<u32> = [53352, 60053, 75, 49052, 61006, 49001, 63672, 49050, 58433, 58434, 49065, 49048].iter().cloned().collect();
            static ref MAGE_SPELLS: BTreeSet<u32> = [42897, 36032, 42845, 42939, 42940, 42937, 42938, 59638, 55802, 55807, 59637, 57984, 122, 57761, 54096, 42833, 42926, 42931, 42891, 59638]
                .iter()
                .cloned()
                .collect();
            static ref WARLOCK_SPELLS: BTreeSet<u32> = [47813, 47809, 47855, 47843, 47864, 59164, 47210, 47836, 47834, 47825, 47811, 47838, 47867, 50590].iter().cloned().collect();
            static ref SHAMAN_SPELLS: BTreeSet<u32> = [10444, 61654, 49238, 49271, 54531, 58735, 60103, 49233, 49279, 49281, 32175, 32176, 17364, 25504, 49231, 55459, 49276].iter().cloned().collect();
            static ref DRUID_SPELLS: BTreeSet<u32> = [48441, 53251, 48443, 50464, 48461, 48465, 53201, 53195, 53190, 48463, 48468, 48572, 49800, 48574, 48577, 48566, 62078, 48480, 48562, 48564]
                .iter()
                .cloned()
                .collect();
            static ref DEATH_KNIGHT_SPELLS: BTreeSet<u32> = [55268, 66962, 51425, 66974, 51411, 55095, 55078, 51460, 52212, 49938, 49909, 49921, 66992, 47632, 50526, 55095, 61696, 49930, 66979]
                .iter()
                .cloned()
                .collect();
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
                } else if DEATH_KNIGHT_SPELLS.contains(&spell_id) {
                    participant.hero_class_id = Some(6);
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
            static ref ABILITIES: BTreeSet<u32> = [25228, 27046, 43771, 6991, 48990, 43771, 54181, 52858, 53434].iter().cloned().collect();
        }
        ABILITIES.contains(&spell_id)
    }

    pub fn collect_active_map(&mut self, data: &Data, unit: &Unit, now: u64) {
        self.active_map.collect(data, unit, 3, now);
    }
}
