use std::collections::{BTreeSet, HashMap, VecDeque};

#[derive(Debug, Clone)]
pub struct Attempt {
    pub encounter_id: u32,
    pub hard_mode_encounter_id: Option<u32>,
    pub hard_mode_found_buffs: BTreeSet<u32>,
    pub hard_mode_npcs_died: BTreeSet<u32>,

    pub start_ts: u64,
    pub end_ts: u64,
    pub pivot_creature: Option<u64>,
    pub encounter_has_pivot: bool,
    pub pivot_is_finished: bool,
    pub creatures_required_to_die: BTreeSet<u64>,
    pub creatures_in_combat: BTreeSet<u64>,
    pub infight_player: BTreeSet<u32>,
    pub infight_vehicle: BTreeSet<u64>,
    pub pivot_instant_debuff_removes: VecDeque<u64>,
    pub ranking_damage: HashMap<u32, u32>,
    pub ranking_heal: HashMap<u32, u32>,
    pub ranking_threat: HashMap<u32, i32>,
}

impl Attempt {
    pub fn new(encounter_id: u32, start_ts: u64, encounter_has_pivot: bool) -> Self {
        Attempt {
            encounter_id,
            start_ts,
            end_ts: 0,
            pivot_creature: None,
            creatures_required_to_die: BTreeSet::new(),
            creatures_in_combat: BTreeSet::new(),
            infight_player: BTreeSet::new(),
            infight_vehicle: BTreeSet::new(),
            pivot_instant_debuff_removes: VecDeque::new(),
            ranking_damage: HashMap::new(),
            ranking_heal: HashMap::new(),
            ranking_threat: HashMap::new(),
            encounter_has_pivot,
            pivot_is_finished: false,
            hard_mode_encounter_id: None,
            hard_mode_found_buffs: BTreeSet::new(),
            hard_mode_npcs_died: BTreeSet::new(),
        }
    }
}
