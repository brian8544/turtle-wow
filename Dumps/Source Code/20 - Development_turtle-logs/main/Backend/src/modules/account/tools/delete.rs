use crate::params;
use crate::util::database::*;
use language::{domain_value::Language, tools::Get};
use str_util::{sha3, strformat};

use crate::modules::account::{dto::Failure, material::Account};

pub trait Delete {
    fn issue_delete(&self, db_main: &mut impl Execute, member_id: u32) -> Result<(), Failure>;
    fn confirm_delete(&self, db_main: &mut impl Execute, delete_id: &str) -> Result<(), Failure>;
}

impl Delete for Account {
    fn issue_delete(&self, db_main: &mut impl Execute, member_id: u32) -> Result<(), Failure> {
        let mut requires_mail_confirmation = self.requires_mail_confirmation.write().unwrap();
        let mut member = self.member.write().unwrap();
        if db_main.execute_wparams("UPDATE account_member SET delete_account=1 WHERE id=:id", params!("id" => member_id)) {
            let entry = member.get_mut(&member_id).unwrap();
            entry.delete_account = true;

            let delete_id = sha3::hash(&[&member_id.to_string(), "delete", &entry.salt]);
            requires_mail_confirmation.insert(delete_id.clone(), member_id);

            // Send a confirmation mail to the member now
            if !mail::send(
                &entry.mail,
                &entry.nickname,
                self.dictionary.get("delete.confirmation.subject", Language::English),
                strformat::fmt(self.dictionary.get("delete.confirmation.text", Language::English), &[&delete_id]),
                cfg!(test),
            ) {
                return Err(Failure::MailSend);
            }
        } else {
            return Err(Failure::Unknown);
        }
        Ok(())
    }

    fn confirm_delete(&self, db_main: &mut impl Execute, delete_id: &str) -> Result<(), Failure> {
        let mut requires_mail_confirmation = self.requires_mail_confirmation.write().unwrap();
        let mut api_token_to_member_id = self.api_token_to_member_id.write().unwrap();
        let mut api_token = self.api_tokens.write().unwrap();
        let mut member = self.member.write().unwrap();

        let delete_confirmation_res = requires_mail_confirmation.get(delete_id);
        if delete_confirmation_res.is_none() {
            return Err(Failure::DeleteNotIssued);
        }

        // Due to foreign key constraints, other tables depending on the member_id will also be deleted
        let member_id = *delete_confirmation_res.unwrap();
        if db_main.execute_wparams(
            "DELETE FROM account_member WHERE id = :id",
            params!(
              "id" => member_id
            ),
        ) {
            {
                // Remove all other fields that somehow point to this member_id
                let member_entry = member.get(&member_id).unwrap();

                // Deleting all possible confirmation mail ids
                if !member_entry.mail_confirmed {
                    requires_mail_confirmation.remove(&sha3::hash(&[&member_entry.id.to_string(), "mail", &member_entry.salt]));
                }
                if member_entry.forgot_password {
                    requires_mail_confirmation.remove(&sha3::hash(&[&member_entry.id.to_string(), "forgot", &member_entry.salt]));
                }
                if member_entry.delete_account {
                    requires_mail_confirmation.remove(&sha3::hash(&[&member_entry.id.to_string(), "delete", &member_entry.salt]));
                }
                if !member_entry.new_mail.is_empty() {
                    requires_mail_confirmation.remove(&sha3::hash(&[&member_entry.id.to_string(), "new_mail", &member_entry.salt]));
                }
                requires_mail_confirmation.remove(delete_id);

                // Taking care of api_tokens
                for api_token in api_token.get(&member_id).unwrap() {
                    api_token_to_member_id.remove(&api_token.token.as_ref().unwrap().clone());
                }
                api_token.get_mut(&member_id).unwrap().clear();
                api_token.remove(&member_id);
            }

            member.remove(&member_id);
        } else {
            return Err(Failure::Unknown);
        }
        Ok(())
    }
}
