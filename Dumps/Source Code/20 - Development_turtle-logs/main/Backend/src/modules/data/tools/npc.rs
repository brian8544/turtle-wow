use crate::modules::data::tools::RetrieveLocalization;
use crate::modules::data::{domain_value::NPC, Data};

pub trait RetrieveNPC {
    fn get_npc(&self, expansion_id: u8, npc_id: u32) -> Option<NPC>;
    fn get_npc_by_name(&self, expansion_id: u8, unit_name: &String) -> Option<NPC>;
}

impl RetrieveNPC for Data {
    fn get_npc(&self, expansion_id: u8, npc_id: u32) -> Option<NPC> {
        if expansion_id == 0 {
            return None;
        }

        self.npcs.get(expansion_id as usize - 1).and_then(|map| map.get(&npc_id).cloned())
    }

    fn get_npc_by_name(&self, expansion_id: u8, unit_name: &String) -> Option<NPC> {
        if expansion_id == 0 {
            return None;
        }

        self.npcs
            .get(expansion_id as usize - 1)
            .and_then(|map| map.iter().find(|(_, npc)| self.get_localization(1, npc.localization_id).map(|localization| localization.content).contains(unit_name)))
            .map(|(_, npc)| npc.clone())
    }
}
