use language::{domain_value::Language, tools::Get};
use str_util::sha3;

use crate::modules::account::{
    dto::Failure,
    material::{APIToken, Account},
    tools::Token,
};
use crate::util::database::{Execute, Select};

pub trait Login {
    fn login(&self, db_main: &mut (impl Execute + Select), mail: &str, password: &str) -> Result<APIToken, Failure>;
    fn validate_credentials(&self, mail: &str, password: &str) -> Result<u32, Failure>;
}

impl Login for Account {
    fn login(&self, db_main: &mut (impl Execute + Select), mail: &str, password: &str) -> Result<APIToken, Failure> {
        self.validate_credentials(mail, password)
            .and_then(|member_id| self.create_token(db_main, &self.dictionary.get("general.login", Language::English), member_id, time_util::get_ts_from_now_in_secs(7)))
    }

    fn validate_credentials(&self, mail: &str, password: &str) -> Result<u32, Failure> {
        let lower_mail = mail.to_lowercase();
        for entry in self.member.read().unwrap().values() {
            if entry.mail != lower_mail {
                continue;
            }
            if entry.password != sha3::hash(&[&password, &entry.salt]) {
                break;
            } // Password is wrong
            return Ok(entry.id);
        }
        Err(Failure::InvalidCredentials)
    }
}
