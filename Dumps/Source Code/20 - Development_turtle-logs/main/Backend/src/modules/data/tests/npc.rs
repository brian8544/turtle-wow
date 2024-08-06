use crate::modules::data::domain_value::NPC;
use crate::modules::data::{tools::RetrieveNPC, Data};
use std::collections::HashMap;

#[test]
fn get_npc() {
    let mut data = Data::default();
    let expansion_id = 1;
    let npc_id = 1;
    let npc = NPC {
        expansion_id,
        id: npc_id,
        localization_id: 2323,
        is_boss: false,
        friend: 1,
        family: 2,
        map_id: None,
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(npc_id, npc.clone());
    data.npcs.push(hashmap);

    let npc_res = data.get_npc(expansion_id, npc_id);
    assert!(npc_res.is_some());
    assert_eq!(npc_res.unwrap(), npc);
    let no_npc = data.get_npc(0, 0);
    assert!(no_npc.is_none());
}
