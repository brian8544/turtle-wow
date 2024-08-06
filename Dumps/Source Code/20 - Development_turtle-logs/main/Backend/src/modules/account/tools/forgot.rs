use crate::params;
use crate::util::database::*;
use language::{domain_value::Language, tools::Get};
use str_util::{random, sha3, strformat};
use validator::tools::valid_mail;

use crate::modules::account::{
    dto::Failure,
    material::{APIToken, Account},
    tools::{Token, Update},
};

pub trait Forgot {
    fn send_forgot_password(&self, db_main: &mut impl Execute, mail: &str) -> Result<(), Failure>;
    fn recv_forgot_password(&self, db_main: &mut (impl Execute + Select), forgot_id: &str) -> Result<APIToken, Failure>;
}

impl Forgot for Account {
    fn send_forgot_password(&self, db_main: &mut impl Execute, mail: &str) -> Result<(), Failure> {
        if !valid_mail(mail) {
            return Err(Failure::InvalidMail);
        }

        let mut requires_mail_confirmation = self.requires_mail_confirmation.write().unwrap();
        let mut member = self.member.write().unwrap();

        let mut member_id = None;
        {
            let lower_mail = mail.to_lowercase();
            for member_entry in member.values() {
                if member_entry.mail == lower_mail {
                    member_id = Some(member_entry.id);
                    break;
                }
            }
        }

        if member_id.is_none() {
            return Ok(()); // Don't leak information about existence
        }

        let unwrapped_member_id = member_id.unwrap();
        if db_main.execute_wparams("UPDATE account_member SET forgot_password=1 WHERE id=:id", params!("id" => unwrapped_member_id)) {
            let entry = member.get_mut(&unwrapped_member_id).unwrap();
            let forgot_id = sha3::hash(&[&unwrapped_member_id.to_string(), "forgot", &entry.salt]);

            entry.forgot_password = true;
            requires_mail_confirmation.insert(forgot_id.clone(), unwrapped_member_id);

            // Only send a mail if we really set up the internal structures properly
            if !mail::send(
                &entry.mail,
                &entry.nickname,
                self.dictionary.get("forgot.confirmation.subject", Language::English),
                strformat::fmt(self.dictionary.get("forgot.confirmation.text", Language::English), &[&forgot_id]),
                cfg!(test),
            ) {
                return Err(Failure::MailSend);
            }

            return Ok(());
        }
        Err(Failure::Unknown)
    }

    fn recv_forgot_password(&self, db_main: &mut (impl Execute + Select), forgot_id: &str) -> Result<APIToken, Failure> {
        let user_id;
        {
            let requires_mail_confirmation = self.requires_mail_confirmation.read().unwrap();
            match requires_mail_confirmation.get(forgot_id) {
                Some(member_id) => {
                    user_id = *member_id;
                    let mut member = self.member.write().unwrap();
                    if db_main.execute_wparams(
                        "UPDATE account_member SET forgot_password=0 WHERE id=:id",
                        params!(
                          "id" => *member_id
                        ),
                    ) {
                        let entry = member.get_mut(member_id).unwrap();
                        entry.forgot_password = false;
                    } else {
                        return Err(Failure::Unknown);
                    }
                },
                None => return Err(Failure::ForgotNotIssued),
            }
        }

        let user_pass = random::alphanumeric(32);
        self.update_password(db_main, &user_pass, user_id).and_then(|()| {
            // Scoping because of the create_token function
            {
                let member = self.member.read().unwrap();
                let entry = member.get(&user_id).unwrap();
                if !mail::send(
                    &entry.mail,
                    &entry.nickname,
                    self.dictionary.get("forgot.information.subject", Language::English),
                    strformat::fmt(self.dictionary.get("forgot.information.text", Language::English), &[&user_pass]),
                    cfg!(test),
                ) {
                    return Err(Failure::MailSend);
                }
            }

            {
                let mut requires_mail_confirmation = self.requires_mail_confirmation.write().unwrap();
                requires_mail_confirmation.remove(forgot_id);
            }
            self.create_token(db_main, &self.dictionary.get("general.login", Language::English), user_id, time_util::get_ts_from_now_in_secs(7))
        })
    }
}
