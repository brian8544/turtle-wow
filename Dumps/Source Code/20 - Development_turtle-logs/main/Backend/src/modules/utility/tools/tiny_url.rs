use crate::modules::utility::domain_value::TinyUrl;
use crate::modules::utility::dto::UtilityFailure;
use crate::modules::utility::Utility;
use crate::params;
use crate::util::database::{Execute, Select};

pub trait RetrieveTinyUrl {
    fn get_tiny_url(&self, db_main: &mut impl Select, id: u32) -> Result<TinyUrl, UtilityFailure>;
    fn get_tiny_url_id_by_payload(&self, db_main: &mut impl Select, payload: &String) -> Result<u32, UtilityFailure>;
    fn set_tiny_url(&self, db_main: &mut (impl Select + Execute), payload: String) -> Result<u32, UtilityFailure>;
}

impl RetrieveTinyUrl for Utility {
    fn get_tiny_url(&self, db_main: &mut impl Select, id: u32) -> Result<TinyUrl, UtilityFailure> {
        db_main
            .select_wparams_value(
                "SELECT id, url_payload FROM utility_tiny_url WHERE id=:id",
                |mut row| TinyUrl {
                    id: row.take(0).unwrap(),
                    url_payload: row.take(1).unwrap(),
                },
                params!("id" => id),
            )
            .ok_or(UtilityFailure::InvalidInput)
    }

    fn get_tiny_url_id_by_payload(&self, db_main: &mut impl Select, payload: &String) -> Result<u32, UtilityFailure> {
        db_main
            .select_wparams_value(
                "SELECT id FROM utility_tiny_url WHERE url_payload=:url_payload",
                |mut row| row.take::<u32, usize>(0).unwrap(),
                params!("url_payload" => payload.clone()),
            )
            .ok_or(UtilityFailure::InvalidInput)
    }

    fn set_tiny_url(&self, db_main: &mut (impl Select + Execute), payload: String) -> Result<u32, UtilityFailure> {
        if let Ok(tiny_url_id) = self.get_tiny_url_id_by_payload(db_main, &payload) {
            return Ok(tiny_url_id);
        }

        if db_main.execute_wparams("INSERT INTO utility_tiny_url (`url_payload`) VALUES (:url_payload)", params!("url_payload" => payload.clone())) {
            return self.get_tiny_url_id_by_payload(db_main, &payload);
        }
        Err(UtilityFailure::InvalidInput)
    }
}
