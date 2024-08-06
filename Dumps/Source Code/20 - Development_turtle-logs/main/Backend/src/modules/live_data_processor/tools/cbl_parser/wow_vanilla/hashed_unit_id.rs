use crate::modules::data::tools::RetrieveNPC;
use crate::modules::data::Data;
use crate::util::hash_str::hash_str;

pub fn get_hashed_player_unit_id(unit_name: &str) -> u64 {
    hash_str(unit_name) & 0x0000FFFFFFFFFFFF
}

pub fn get_npc_unit_id(data: &Data, unit_name: &str) -> Option<u64> {
    data.get_npc_by_name(1, &unit_name.to_string()).map(|npc| 0xF130000000000000 + (npc.id as u64).rotate_left(24))
}
