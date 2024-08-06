use crate::modules::live_data_processor::domain_value::{Event, EventParseFailureAction, EventType, Unit};
use std::collections::{BTreeSet, VecDeque};

/// There are indirect interrupts, e.g. stuns. These are parsed via AuraApplication
/// There are direct interrupts. These are parsed via SpellCast
///
/// There are indirect interrupts due to moving, but for this we need to reorder events. We don't consider this an interrupt for now, maybe later
/// Generally these are also out of order
pub fn try_parse_interrupt(recently_committed_spell_cast_and_aura_applications: &VecDeque<Event>, subject: &Unit) -> Result<Event, EventParseFailureAction> {
    for i in (0..recently_committed_spell_cast_and_aura_applications.len()).rev() {
        let event: &Event = recently_committed_spell_cast_and_aura_applications.get(i).unwrap();
        match &event.event {
            EventType::SpellCast(spell_cast) => {
                if spell_cast.victim.contains(subject) && (spell_is_direct_interrupt(spell_cast.spell_id) || spell_is_indirect_interrupt(spell_cast.spell_id)) {
                    return Ok(event.clone());
                }
            },
            EventType::AuraApplication(aura_application) => {
                if event.subject == *subject && spell_is_indirect_interrupt(aura_application.spell_id) {
                    return Ok(event.clone());
                }
            },
            _ => continue,
        };
    }
    Err(EventParseFailureAction::PrependNext)
}

// "Kick", "Pummel", "Shield Bash", "Counterspell", "Earth Shock",  "Silence", "Spell Lock", "Wind Shear", "Mind Freeze"
pub fn spell_is_direct_interrupt(spell_id: u32) -> bool {
    lazy_static! {
        static ref DIRECT_INTERRUPTS: BTreeSet<u32> = [
            42, // UNKNOWN
            72, 1053, 1671, 1672, 1675, 1676, 1677, 1766, 1767, 1768, 1769, 1770, 1771, 1772, 1773, 1774, 1775, 2139, 3466, 3467, 3576, 6552, 6553, 6554, 6555, 6556, 6726, 8042, 8043, 8044, 8045, 8046, 8047, 8048, 8049, 8988, 10412, 10413, 10414,
            10415, 10416, 10417, 11972, 11978, 12528, 12555, 13281, 13491, 13728, 15122, 15487, 15501, 15610, 15614, 15615, 18278, 18327, 19639, 19640, 19715, 20537, 20788, 22666, 22885, 23114, 23207, 24685, 25025, 25454, 26069, 26090, 26194, 27559,
            27613, 27814, 29443, 29560, 29586, 29704, 29943, 29961, 30225, 30460, 31402, 31596, 31999, 32105, 33424, 33871, 34802, 35178, 36033, 36470, 36988, 37160, 37470, 38233, 38313, 38491, 38625, 38768, 38913, 41180, 41197, 41395, 43305, 43518,
            45356, 47071, 47081, 49230, 49231, 51610, 53394, 54093, 54511, 56506, 56777, 57783, 58953, 59344, 60011, 61668, 65542, 65790, 65973, 67235, 68100, 68101, 68102, 70964, 72194, 72196, 19244, 19647, 19648, 19650, 20433, 20434, 24259, 30849,
            67519, 57994, 47528, 53550
        ]
        .iter()
        .cloned()
        .collect();
    }
    DIRECT_INTERRUPTS.contains(&spell_id)
}

// Used Spells: "Gouge", "Death Coil", "Kidney Shot", "Cheap Shot", "Scatter Shot", "Improved Concussive Shot", "Wyvern Sting",
// "Intimidation", "Charge Stun",  "Intercept Stun", "Concussive Blow", "Feral Charge", "Feral Charge Effect",
// "Bash", "Pounce", "Impact", "Repentance", "Hammer of Justice",  "Pyroclasm", "Blackout", "Tidal Charm", "Reckless Charge", "Arcane Torrent"
pub fn spell_is_indirect_interrupt(spell_id: u32) -> bool {
    lazy_static! {
        static ref INDIRECT_INTERRUPTS: BTreeSet<u32> = [
            42, // UNKNOWN
            408, 835, 853, 1572, 1776, 1777, 1780, 1781, 1833, 1838, 1988, 5211, 5212, 5584, 5588, 5589, 5590, 5591, 6409, 6735, 6789, 6798, 6799, 7093, 7922, 8629, 8630, 8643, 8644, 8983, 8984, 9005, 9006, 9823, 9825, 9827, 9828, 10308, 10309,
            11103, 11285, 11286, 11287, 11288, 12355, 12357, 12358, 12359, 12360, 12540, 13005, 13327, 13579, 14902, 15268, 15269, 15323, 15324, 15325, 15326, 16979, 17925, 17926, 18073, 18093, 18096, 18161, 18162, 19386, 19407, 19410, 19412, 19413,
            19414, 19415, 19503, 19577, 19675, 20066, 20253, 20614, 20615, 20940, 20941, 22641, 22646, 22915, 23601, 24131, 24132, 24133, 24134, 24135, 24335, 24336, 24394, 24465, 24698, 25273, 25274, 25515, 26180, 26233, 26748, 27006, 27068, 27069,
            27223, 27615, 28412, 28445, 28456, 29425, 29511, 30153, 30195, 30197, 30500, 30621, 30741, 30832, 30986, 31819, 31843, 32416, 32709, 32779, 32864, 33130, 34243, 34437, 34940, 35954, 36732, 36862, 37369, 37506, 38065, 38764, 38863, 39077,
            39435, 39449, 39661, 41070, 41186, 41389, 41468, 43356, 43612, 44142, 44415, 45334, 46025, 46283, 46681, 47541, 47632, 47633, 47859, 47860, 49009, 49010, 49011, 49012, 49377, 49616, 49803, 49892, 49893, 49894, 49895, 50668, 50733, 52375,
            52376, 53769, 54272, 55077, 55209, 55210, 55320, 56362, 57094, 58861, 59134, 60949, 61184, 62900, 62901, 62902, 62903, 62904, 63243, 63244, 63245, 64343, 64399, 65820, 65877, 65878, 65929, 66007, 66008, 66019, 66613, 66863, 66940, 66941,
            67929, 67930, 67931, 68139, 68140, 68141, 70495, 71490, 72335, 28730
        ]
        .iter()
        .cloned()
        .collect();
    }
    INDIRECT_INTERRUPTS.contains(&spell_id)
}
