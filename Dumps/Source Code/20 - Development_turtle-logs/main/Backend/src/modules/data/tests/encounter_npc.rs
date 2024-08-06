use crate::modules::data::domain_value::EncounterNpc;
use crate::modules::data::{tools::RetrieveEncounterNpc, Data};

#[test]
fn get_encounter_npc() {
    let mut data = Data::default();
    let encounter_npc_id = 1;
    let encounter_npc = EncounterNpc {
        encounter_id: 42,
        npc_id: encounter_npc_id,
        requires_death: true,
        can_start_encounter: true,
        is_pivot: true,
        health_treshold: Some(2),
    };
    data.encounter_npcs.insert(encounter_npc_id, encounter_npc.clone());

    let encounter_npc_res = data.get_encounter_npc(encounter_npc_id);
    assert!(encounter_npc_res.is_some());
    assert_eq!(encounter_npc_res.unwrap(), encounter_npc);
    let no_encounter_npc = data.get_encounter_npc(0);
    assert!(no_encounter_npc.is_none());
}

#[test]
fn get_all_encounter_npcs() {
    let data = Data::default();
    let encounter_npcs = data.get_all_encounter_npcs();
    assert!(encounter_npcs.is_empty());
}
