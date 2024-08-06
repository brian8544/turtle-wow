use crate::modules::transport_layer::tools::ReceiveConsent;
use crate::modules::{CharacterDto, InstanceReset, TransportLayer};
use reqwest::blocking::multipart;
use reqwest::header::{HeaderValue, CONTENT_TYPE};
use std::env;
use std::time::Instant;

pub trait Relay {
    fn relay(&mut self);
    fn gave_consent(&self, character_id: u32) -> bool;
    fn send_character_dto(&self, character_dto: CharacterDto);
    fn send_package(&self, package: Vec<Vec<u8>>);
    fn send_instance_resets(&self, instance_resets: Vec<InstanceReset>);
}

impl Relay for TransportLayer {
    fn relay(&mut self) {
        let package_size: usize = 10;
        let package_timeout = 30;
        let mut now = Instant::now();

        let mut current_package = Vec::new();
        current_package.reserve(package_size);
        loop {
            // Receive new consent decisions
            self.receive_character_consent();
            self.receive_guild_consent();

            // Relay Character DTOs
            let receiver = self.receiver_character.as_ref().unwrap();
            if let Ok((character_id, character_dto)) = receiver.try_recv() {
                if !self.gave_consent(character_id) {
                    println!("{} ({}) has not given consent, skipping!", character_dto.character_history.unwrap().character_name, character_dto.server_uid);
                    continue;
                }
                self.send_character_dto(character_dto);
            }

            // Relay meta data
            let receiver = self.receiver_meta_data_instance_reset.as_ref().unwrap();
            if let Ok(instance_resets) = receiver.try_recv() {
                self.send_instance_resets(instance_resets);
            }

            // Relay server plugin messages
            let receiver = self.receiver_server_message.as_ref().unwrap();
            if let Ok((character_ids, msg)) = receiver.try_recv() {
                if character_ids.iter().any(|id| !self.gave_consent(*id)) {
                    println!("At least one character did not give consent");
                    continue;
                }

                current_package.push(msg);
                if !current_package.is_empty() && (current_package.len() >= package_size || now.elapsed().as_secs() >= package_timeout) {
                    self.send_package(current_package);
                    current_package = Vec::new();
                    current_package.reserve(package_size);
                    now = Instant::now();
                }
            }
        }
    }

    fn gave_consent(&self, character_id: u32) -> bool {
        lazy_static! {
            static ref OPT_IN_MODE: bool = env::var("OPT_IN_MODE").unwrap().parse::<bool>().unwrap();
        }

        // Assume its a non player
        if character_id == 0 {
            return true;
        }
        if *OPT_IN_MODE {
            self.character_consent.contains(&character_id)
        } else {
            !self.character_consent.contains(&character_id)
        }
    }

    fn send_character_dto(&self, character_dto: CharacterDto) {
        lazy_static! {
            static ref API_TOKEN: String = env::var("LP_API_TOKEN").unwrap();
            static ref URL_SET_CHARACTER: String = env::var("URL_SET_CHARACTER").unwrap();
        }

        let response = self
            .client
            .post(URL_SET_CHARACTER.as_str())
            .header("X-Authorization", HeaderValue::from_str(API_TOKEN.as_str()).unwrap())
            .header(CONTENT_TYPE, HeaderValue::from_static("application/json"))
            .body(serde_json::to_string(&character_dto).unwrap())
            .send();
        println!("Response okay => {:?} for {} ({})", response.is_ok(), character_dto.character_history.unwrap().character_name, character_dto.server_uid);
    }

    fn send_package(&self, mut package: Vec<Vec<u8>>) {
        lazy_static! {
            static ref API_TOKEN: String = env::var("LP_API_TOKEN").unwrap();
            static ref URL_SERVER_PACKAGE: String = env::var("URL_SERVER_PACKAGE").unwrap();
        }

        let form = multipart::Form::new().part(
            "payload",
            multipart::Part::bytes(package.iter_mut().fold(Vec::new(), |mut acc, item| {
                acc.append(item);
                acc
            })),
        );

        let _ = self.client.post(URL_SERVER_PACKAGE.as_str()).header("X-Authorization", HeaderValue::from_str(API_TOKEN.as_str()).unwrap()).multipart(form).send();
    }

    fn send_instance_resets(&self, instance_resets: Vec<InstanceReset>) {
        lazy_static! {
            static ref API_TOKEN: String = env::var("LP_API_TOKEN").unwrap();
            static ref URL_META_DATA_INSTANCE_RESET: String = env::var("URL_META_DATA_INSTANCE_RESET").unwrap();
        }

        let _ = self
            .client
            .post(URL_META_DATA_INSTANCE_RESET.as_str())
            .header("X-Authorization", HeaderValue::from_str(API_TOKEN.as_str()).unwrap())
            .header(CONTENT_TYPE, HeaderValue::from_static("application/json"))
            .body(serde_json::to_string(&instance_resets).unwrap())
            .send();
    }
}
