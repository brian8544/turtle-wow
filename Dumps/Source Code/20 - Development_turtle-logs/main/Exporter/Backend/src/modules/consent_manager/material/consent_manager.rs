use std::collections::BTreeSet;
use std::sync::mpsc::Sender;
use std::sync::{Mutex, RwLock};

use crate::modules::util::Select;

#[derive(Debug)]
pub struct ConsentManager {
    pub character_consent: RwLock<BTreeSet<u32>>,
    pub guild_consent: RwLock<BTreeSet<u32>>,
    pub sender_character_consent: Mutex<Option<Sender<(bool, u32)>>>,
    pub sender_guild_consent: Mutex<Option<Sender<(bool, u32)>>>,
}

impl Default for ConsentManager {
    fn default() -> Self {
        ConsentManager {
            character_consent: RwLock::new(BTreeSet::new()),
            guild_consent: RwLock::new(BTreeSet::new()),
            sender_character_consent: Mutex::new(None),
            sender_guild_consent: Mutex::new(None),
        }
    }
}

impl ConsentManager {
    pub fn init(self, db_lp_consent: &mut impl Select) -> Self {
        {
            let mut character_consent = self.character_consent.write().unwrap();
            let mut guild_consent = self.guild_consent.write().unwrap();
            let s_char_lock = self.sender_character_consent.lock().unwrap();
            let s_char = s_char_lock.as_ref().unwrap();
            let s_guild_lock = self.sender_guild_consent.lock().unwrap();
            let s_guild = s_guild_lock.as_ref().unwrap();

            db_lp_consent
                .select("SELECT character_id FROM character_consent WHERE ISNULL(consent_withdrawn_when)", |mut row| {
                    let character_id: u32 = row.take(0).unwrap();
                    character_id
                })
                .into_iter()
                .for_each(|result| {
                    if !character_consent.contains(&result) {
                        character_consent.insert(result);
                        let _ = s_char.send((false, result));
                    }
                });

            db_lp_consent
                .select("SELECT guild_id FROM guild_consent WHERE ISNULL(consent_withdrawn_when)", |mut row| {
                    let guild_id: u32 = row.take(0).unwrap();
                    guild_id
                })
                .into_iter()
                .for_each(|result| {
                    if !guild_consent.contains(&result) {
                        guild_consent.insert(result);
                        let _ = s_guild.send((false, result));
                    }
                });
        }
        self
    }
}
