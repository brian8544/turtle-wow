use reqwest::blocking::Client;
use std::collections::BTreeSet;
use std::sync::mpsc::Receiver;

use crate::modules::{CharacterDto, InstanceReset};

#[derive(Debug)]
pub struct TransportLayer {
    pub client: Client,
    pub character_consent: BTreeSet<u32>,
    pub guild_consent: BTreeSet<u32>,

    pub receiver_character: Option<Receiver<(u32, CharacterDto)>>,
    pub receiver_character_consent: Option<Receiver<(bool, u32)>>,
    pub receiver_guild_consent: Option<Receiver<(bool, u32)>>,
    pub receiver_server_message: Option<Receiver<(Vec<u32>, Vec<u8>)>>,
    pub receiver_meta_data_instance_reset: Option<Receiver<Vec<InstanceReset>>>,
}

impl Default for TransportLayer {
    fn default() -> Self {
        TransportLayer {
            client: Client::new(),
            character_consent: BTreeSet::new(),
            guild_consent: BTreeSet::new(),

            receiver_character: None,
            receiver_character_consent: None,
            receiver_guild_consent: None,
            receiver_server_message: None,
            receiver_meta_data_instance_reset: None,
        }
    }
}

impl TransportLayer {
    pub fn init(self) -> Self {
        self
    }
}
