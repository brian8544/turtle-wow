use reqwest::header::HeaderValue;

use language::{domain_value::Language, tools::Get};
use str_util::{sha3, strformat};
use validator::{
    domain_value::PasswordFailure,
    tools::{valid_mail, valid_nickname, valid_password},
};

use crate::modules::account::{
    domain_value::AccountInformation,
    dto::Failure,
    material::{Account, APIToken},
    tools::{GetAccountInformation, Token},
};
use crate::modules::account::dto::PatreonResponse;
use crate::params;
use crate::util::database::*;
use std::env;

pub trait Update {
    fn change_name(&self, db_main: &mut impl Execute, new_nickname: &str, member_id: u32) -> Result<AccountInformation, Failure>;
    fn change_password(&self, db_main: &mut (impl Execute + Select), new_password: &str, member_id: u32) -> Result<APIToken, Failure>;
    fn update_password(&self, db_main: &mut (impl Execute + Select), new_password: &str, member_id: u32) -> Result<(), Failure>;
    fn request_change_mail(&self, new_mail: &str, member_id: u32) -> Result<bool, Failure>;
    fn confirm_change_mail(&self, db_main: &mut (impl Execute + Select), confirmation_id: &str) -> Result<APIToken, Failure>;
    fn update_default_privacy(&self, db_main: &mut impl Execute, privacy_type: u8, member_id: u32) -> Result<(), Failure>;
    fn update_petreons(&self, db_main: &mut impl Execute) -> Result<(), Failure>;
}

impl Update for Account {
    fn change_name(&self, db_main: &mut impl Execute, new_nickname: &str, member_id: u32) -> Result<AccountInformation, Failure> {
        if !valid_nickname(new_nickname) {
            return Err(Failure::InvalidNickname);
        }

        {
            let mut member = self.member.write().unwrap();
            // Check if the name exists already
            let lower_name = new_nickname.to_lowercase();
            for entry in member.values() {
                if entry.nickname.to_lowercase() == lower_name && entry.id != member_id {
                    return Err(Failure::NicknameIsInUse);
                }
            }

            if db_main.execute_wparams(
                "UPDATE account_member SET nickname=:nickname WHERE id=:id",
                params!(
                  "nickname" => (*new_nickname).to_string(),
                  "id" => member_id
                ),
            ) {
                let entry = member.get_mut(&member_id).unwrap();
                entry.nickname = new_nickname.to_owned();
            } else {
                return Err(Failure::NicknameIsInUse);
            }
        }

        Ok(self.get(member_id).unwrap())
    }

    fn change_password(&self, db_main: &mut (impl Execute + Select), new_password: &str, member_id: u32) -> Result<APIToken, Failure> {
        match valid_password(new_password) {
            Err(PasswordFailure::InvalidCharacters) => return Err(Failure::InvalidPasswordCharacters),
            Err(PasswordFailure::TooFewCharacters) => return Err(Failure::PasswordTooShort),
            Err(PasswordFailure::Pwned(num_pwned)) => return Err(Failure::PwnedPassword(num_pwned)),
            Ok(_) => (),
        };

        self.update_password(db_main, new_password, member_id)
            .and_then(|()| self.create_token(db_main, &self.dictionary.get("general.login", Language::English), member_id, time_util::get_ts_from_now_in_secs(7)))
    }

    fn update_password(&self, db_main: &mut (impl Execute + Select), new_password: &str, member_id: u32) -> Result<(), Failure> {
        let mut member = self.member.write().unwrap();

        let hash: String;
        {
            let entry = member.get(&member_id).unwrap();
            hash = sha3::hash(&[new_password, &entry.salt]);
        }

        if db_main.execute_wparams(
            "UPDATE account_member SET password=:password WHERE id=:id",
            params!(
              "password" => hash.clone(),
              "id" => member_id
            ),
        ) {
            return self.clear_tokens(db_main, member_id).map(|_| {
                let entry = member.get_mut(&member_id).unwrap();
                entry.password = hash;
            });
        }
        Err(Failure::Unknown)
    }

    fn request_change_mail(&self, new_mail: &str, member_id: u32) -> Result<bool, Failure> {
        if !valid_mail(new_mail) {
            return Err(Failure::InvalidMail);
        }

        let mut requires_mail_confirmation = self.requires_mail_confirmation.write().unwrap();
        let mut member = self.member.write().unwrap();

        // Check if the mail exists already
        let lower_mail = new_mail.to_lowercase();
        for entry in member.values() {
            if (entry.mail == lower_mail || entry.new_mail == lower_mail) && entry.id != member_id {
                return Err(Failure::MailIsInUse);
            }
        }

        let entry = member.get_mut(&member_id).unwrap();
        // If the mail has not been confirmed yet then it can be changed without
        // confirmation, because the user could have had a typo
        if !entry.mail_confirmed {
            entry.mail = lower_mail;
            return Ok(true);
        }

        let confirmation_id = sha3::hash(&[&member_id.to_string(), "new_mail", &entry.salt]);
        entry.new_mail = lower_mail;
        requires_mail_confirmation.insert(confirmation_id.clone(), member_id);
        let mail_content = strformat::fmt(self.dictionary.get("update.mail.text", Language::English), &[&confirmation_id]);
        if !mail::send(&entry.mail, &entry.nickname, self.dictionary.get("update.mail.subject", Language::English), mail_content, cfg!(test)) {
            return Err(Failure::MailSend);
        }
        Ok(false)
    }

    fn confirm_change_mail(&self, db_main: &mut (impl Execute + Select), confirmation_id: &str) -> Result<APIToken, Failure> {
        let requires_mail_confirmation = self.requires_mail_confirmation.read().unwrap();
        match requires_mail_confirmation.get(confirmation_id) {
            Some(member_id) => {
                {
                    let mut member = self.member.write().unwrap();
                    let member_entry = member.get_mut(member_id).unwrap();
                    let lower_mail = member_entry.new_mail.clone();
                    if self.clear_tokens(db_main, *member_id).is_ok()
                        && db_main.execute_wparams(
                        "UPDATE account_member SET mail=:mail WHERE id=:id",
                        params!(
                              "mail" => lower_mail.clone(),
                              "id" => member_id
                            ),
                    )
                    {
                        member_entry.mail = lower_mail;
                        member_entry.new_mail = String::new();
                    } else {
                        return Err(Failure::Unknown);
                    }
                }
                self.create_token(db_main, &self.dictionary.get("general.login", Language::English), *member_id, time_util::get_ts_from_now_in_secs(7))
            }
            None => Err(Failure::Unknown),
        }
    }

    fn update_default_privacy(&self, db_main: &mut impl Execute, privacy_type: u8, member_id: u32) -> Result<(), Failure> {
        let mut member = self.member.write().unwrap();

        if db_main.execute_wparams(
            "UPDATE account_member SET default_privacy_type=:privacy_type WHERE id=:id",
            params!(
              "privacy_type" => privacy_type,
              "id" => member_id
            ),
        ) {
            member.get_mut(&member_id).unwrap().default_privacy_type = privacy_type;
            return Ok(());
        }
        Err(Failure::Unknown)
    }

    fn update_petreons(&self, db_main: &mut impl Execute) -> Result<(), Failure> {
        let api_token: String = env::var("PATREON_TOKEN").unwrap();
        let api_url = "https://www.patreon.com/api/oauth2/v2/campaigns/6892914/members?include=currently_entitled_tiers&fields%5Bmember%5D=email";
        let client = reqwest::blocking::Client::new();
        let resp = client.get(api_url)
            .header("authorization", HeaderValue::from_str(&("Bearer ".to_owned() + &api_token)).unwrap())
            .send().and_then(|resp| resp.json::<PatreonResponse>()).map_err(|_| Failure::Unknown)?;

        let mut members = self.member.write().unwrap();
        for patreon_member in resp.data {
            let found_member = members.iter_mut().find(|(_, member)| member.mail.to_lowercase() == patreon_member.attributes.email.to_lowercase());
            if let Some(member) = found_member {
                for tier in patreon_member.relationships.currently_entitled_tiers.data {
                    if tier.id.contains("7262039") || tier.id.contains("7262085") {
                        member.1.access_rights |= 2;
                        member.1.access_rights |= 4;
                    }
                }
                db_main.execute_wparams("UPDATE `account_member` SET access_rights=:access_rights WHERE id=:member_id", params!("access_rights" => member.1.access_rights, "member_id" => member.0));
            } else {
                println!("Could not find Patreon: {}", patreon_member.attributes.email);
            }
        }

        Ok(())
    }
}
