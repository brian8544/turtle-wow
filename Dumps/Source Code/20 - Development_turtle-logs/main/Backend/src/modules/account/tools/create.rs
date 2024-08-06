use crate::params;
use crate::util::database::*;
use language::{domain_value::Language, tools::Get};
use str_util::{random, sha3, strformat};
use validator::{
    domain_value::PasswordFailure,
    tools::{valid_mail, valid_nickname, valid_password},
};

use crate::modules::account::{
    dto::Failure,
    material::{APIToken, Account, Member},
    tools::Token,
};

pub trait Create {
    fn create(&self, db_main: &mut (impl Select + Execute), mail: &str, nickname: &str, password: &str) -> Result<APIToken, Failure>;
    fn send_confirmation(&self, member_id: u32) -> bool;
    fn confirm(&self, db_main: &mut impl Execute, id: &str) -> bool;
}

impl Create for Account {
    fn create(&self, db_main: &mut (impl Select + Execute), mail: &str, nickname: &str, password: &str) -> Result<APIToken, Failure> {
        if !valid_mail(mail) {
            return Err(Failure::InvalidMail);
        }

        if !valid_nickname(nickname) {
            return Err(Failure::InvalidNickname);
        }

        match valid_password(password) {
            Err(PasswordFailure::InvalidCharacters) => return Err(Failure::InvalidPasswordCharacters),
            Err(PasswordFailure::TooFewCharacters) => return Err(Failure::PasswordTooShort),
            Err(PasswordFailure::Pwned(num_pwned)) => return Err(Failure::PwnedPassword(num_pwned)),
            Ok(_) => (),
        };

        // The following part needs to be transactional
        let member_id: u32;
        {
            let mut member = self.member.write().unwrap();
            let lower_mail = mail.to_lowercase();
            let lower_nickname = nickname.to_lowercase();
            for entry in member.values() {
                if entry.mail == lower_mail || entry.new_mail == lower_mail {
                    return Err(Failure::MailIsInUse);
                } else if entry.nickname.to_lowercase() == lower_nickname {
                    return Err(Failure::NicknameIsInUse);
                }
            }

            let salt: String = random::alphanumeric(16);
            let pass: String = sha3::hash(&[password, &salt]);

            if db_main.execute_wparams(
                "INSERT IGNORE INTO account_member (`mail`, `password`, `nickname`, `salt`, `joined`) VALUES (:mail, :pass, :nickname, :salt, UNIX_TIMESTAMP())",
                params!(
                "nickname" => (*nickname).to_string(),
                "mail" => lower_mail.clone(),
                "pass" => pass.clone(),
                "salt" => salt.clone()
                ),
            ) {
                member_id = db_main
                    .select_wparams_value(
                        "SELECT id FROM account_member WHERE mail = :mail",
                        |mut row| row.take(0).unwrap(),
                        params!(
                          "mail" => lower_mail.clone()
                        ),
                    )
                    .unwrap();
                member.insert(
                    member_id,
                    Member {
                        id: member_id,
                        nickname: nickname.to_owned(),
                        mail: lower_mail,
                        password: pass,
                        salt,
                        mail_confirmed: false,
                        forgot_password: false,
                        delete_account: false,
                        new_mail: String::new(),
                        access_rights: 0,
                        default_privacy_type: 0
                    },
                );
            } else {
                return Err(Failure::Unknown);
            }
        }

        self.send_confirmation(member_id);
        self.create_token(db_main, &self.dictionary.get("general.login", Language::English), member_id, time_util::get_ts_from_now_in_secs(7))
    }

    fn send_confirmation(&self, member_id: u32) -> bool {
        // Sub-optimal code but this follows the convention to always lock in the same order
        let mut requires_mail_confirmation = self.requires_mail_confirmation.write().unwrap();

        let member = self.member.read().unwrap();
        let entry = member.get(&member_id).unwrap();
        let mail_id = sha3::hash(&[&member_id.to_string(), "mail", &entry.salt]);
        let mail_content = strformat::fmt(self.dictionary.get("create.confirmation.text", Language::English), &[&mail_id]);

        if !entry.mail_confirmed {
            if !requires_mail_confirmation.contains_key(&mail_id) {
                requires_mail_confirmation.insert(mail_id, member_id);
            }
            return mail::send(&entry.mail, &entry.nickname, self.dictionary.get("create.confirmation.subject", Language::English), mail_content, cfg!(test));
        }
        false
    }

    fn confirm(&self, db_main: &mut impl Execute, id: &str) -> bool {
        let mut requires_mail_confirmation = self.requires_mail_confirmation.write().unwrap();
        let mut member = self.member.write().unwrap();
        let confirm_id_res = requires_mail_confirmation.get(id);

        if confirm_id_res.is_none() {
            return false;
        }

        let member_id = *confirm_id_res.unwrap();
        if db_main.execute_wparams(
            "UPDATE account_member SET mail_confirmed=1 WHERE id=:id",
            params!(
              "id" => member_id
            ),
        ) {
            let entry = member.get_mut(&member_id).unwrap();
            entry.mail_confirmed = true;
            requires_mail_confirmation.remove(id);
            return true;
        }
        false
    }
}
