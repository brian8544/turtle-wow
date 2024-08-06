use crate::dto::Failure;
use crate::modules::consent_manager::tools::broadcast::BroadcastConsent;
use crate::modules::util::Execute;
use crate::modules::ConsentManager;
use crate::params;

pub trait CharacterConsent {
    fn has_given_consent(&self, character_id: u32) -> bool;
    fn give_consent(&self, db_lp_consent: &mut impl Execute, character_id: u32) -> Result<(), Failure>;
    fn withdraw_consent(&self, db_lp_consent: &mut impl Execute, character_id: u32) -> Result<(), Failure>;
}

impl CharacterConsent for ConsentManager {
    fn has_given_consent(&self, character_id: u32) -> bool {
        lazy_static! {
            static ref OPT_IN_MODE: bool = std::env::var("OPT_IN_MODE").unwrap().parse::<bool>().unwrap();
        }

        let character_consent = self.character_consent.read().unwrap();
        if !*OPT_IN_MODE {
            return !character_consent.contains(&character_id);
        }
        character_consent.contains(&character_id)
    }

    fn give_consent(&self, db_lp_consent: &mut impl Execute, character_id: u32) -> Result<(), Failure> {
        lazy_static! {
            static ref OPT_IN_MODE: bool = std::env::var("OPT_IN_MODE").unwrap().parse::<bool>().unwrap();
        }
        if *OPT_IN_MODE {
            if self.has_given_consent(character_id) {
                return Err(Failure::ConsentAlreadyGiven);
            }
        } else {
            if !self.has_given_consent(character_id) {
                return Err(Failure::NoConsentGivenYet);
            }
        }

        let mut character_consent = self.character_consent.write().unwrap();
        if db_lp_consent.execute_wparams(
            "INSERT INTO character_consent (`character_id`) VALUES (:character_id)",
            params!(
              "character_id" => character_id
            ),
        ) {
            character_consent.insert(character_id);
            self.broadcast_character(false, character_id);
            return Ok(());
        }
        Err(Failure::Database)
    }

    fn withdraw_consent(&self, db_lp_consent: &mut impl Execute, character_id: u32) -> Result<(), Failure> {
        lazy_static! {
            static ref OPT_IN_MODE: bool = std::env::var("OPT_IN_MODE").unwrap().parse::<bool>().unwrap();
        }
        if *OPT_IN_MODE {
            if !self.has_given_consent(character_id) {
                return Err(Failure::NoConsentGivenYet);
            }
        } else {
            if self.has_given_consent(character_id) {
                return Err(Failure::ConsentAlreadyGiven);
            }
        }

        let mut character_consent = self.character_consent.write().unwrap();
        if db_lp_consent.execute_wparams(
            "UPDATE character_consent SET consent_withdrawn_when = UNIX_TIMESTAMP() WHERE id = (SELECT MIN(id) FROM character_consent WHERE ISNULL(consent_withdrawn_when) AND character_id=:character_id)",
            params!(
              "character_id" => character_id
            ),
        ) {
            character_consent.remove(&character_id);
            self.broadcast_character(true, character_id);
            return Ok(());
        }
        Err(Failure::Database)
    }
}
