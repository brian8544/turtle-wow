use crate::modules::TransportLayer;

pub trait ReceiveConsent {
    fn receive_character_consent(&mut self);
    fn receive_guild_consent(&mut self);
}

impl ReceiveConsent for TransportLayer {
    fn receive_character_consent(&mut self) {
        let receiver = self.receiver_character_consent.as_ref().unwrap();
        while let Ok(result) = receiver.try_recv() {
            match result {
                (false, character_id) => self.character_consent.insert(character_id),
                (true, character_id) => self.character_consent.remove(&character_id),
            };
        }
    }

    fn receive_guild_consent(&mut self) {
        let receiver = self.receiver_guild_consent.as_ref().unwrap();
        while let Ok(result) = receiver.try_recv() {
            match result {
                (false, guild_id) => self.guild_consent.insert(guild_id),
                (true, guild_id) => self.guild_consent.remove(&guild_id),
            };
        }
    }
}
