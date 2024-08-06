use crate::modules::armory::dto::CharacterDto;
use crate::modules::data::Data;
use crate::modules::live_data_processor::dto::{Message, MessageType};
use crate::modules::live_data_processor::material::{ActiveMapVec, Participant};

pub trait CombatLogParser {
    fn parse_cbl_line(&mut self, data: &Data, event_ts: u64, content: &str) -> Option<Vec<MessageType>>;
    fn do_message_post_processing(&mut self, data: &Data, messages: &mut Vec<Message>);
    // Server that need to be created have Id=0!
    fn get_involved_server(&self) -> Option<Vec<(u32, String, String)>>;
    fn get_involved_character_builds(&self) -> Vec<(Option<u32>, u64, CharacterDto)>;
    fn get_participants(&self) -> Vec<Participant>;
    fn get_active_maps(&self) -> ActiveMapVec;
    fn get_npc_appearance_offset(&self, entry: u32) -> Option<i64>;
    fn get_npc_timeout(&self, entry: u32) -> Option<u64>;
    // Source entry causes InCombat=True event for all resulting npc entries with an offset
    fn get_death_implied_npc_combat_state_and_offset(&self, entry: u32) -> Option<Vec<(u32, i64, i64)>>;
    // In combat of source npc implies in combat of resulting npcs
    fn get_in_combat_implied_npc_combat(&self, entry: u32) -> Option<Vec<u32>>;
    fn get_ignore_after_death_ignore_abilities(&self, entry: u32) -> Option<Vec<u32>>;
    fn get_expansion_id(&self) -> u8;
    fn get_server_id(&self) -> Option<u32>;
    fn get_bonus_messages(&self) -> Option<Vec<Message>>;
    fn get_npc_in_combat_offset(&self, entry: u32) -> Option<i64>;
    fn get_ability_caster(&self, ability_id: u32) -> Option<u32>;
}
