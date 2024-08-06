use crate::modules::ConsentManager;

pub trait BroadcastConsent {
    fn broadcast_character(&self, delete: bool, character_id: u32);
    fn broadcast_guild(&self, delete: bool, guild_id: u32);
}

impl BroadcastConsent for ConsentManager {
    fn broadcast_character(&self, delete: bool, character_id: u32) {
        let sender_lock = self.sender_character_consent.lock().unwrap();
        let sender = sender_lock.as_ref().unwrap();
        let _ = sender.send((delete, character_id));
    }

    fn broadcast_guild(&self, delete: bool, guild_id: u32) {
        let sender_lock = self.sender_guild_consent.lock().unwrap();
        let sender = sender_lock.as_ref().unwrap();
        let _ = sender.send((delete, guild_id));
    }
}
