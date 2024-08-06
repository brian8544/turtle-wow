use crate::modules::account::material::Member;
use crate::modules::account::{material::Account, tools::GetAccountInformation};

#[test]
fn get_does_not_exist() {
    let account = Account::default();
    let acc_info = account.get(42);
    assert!(acc_info.is_err());
}

#[test]
fn get_exists() {
    let mut account = Account::default();
    let member_id = 1;
    {
        let member = account.member.get_mut().unwrap();
        member.insert(
            member_id,
            Member {
                id: member_id,
                nickname: "abc".to_string(),
                mail: "abc@ab.de".to_string(),
                password: "afsd".to_string(),
                salt: "asdas".to_string(),
                mail_confirmed: false,
                forgot_password: false,
                delete_account: false,
                new_mail: "".to_string(),
                access_rights: 0,
            },
        );
    }

    let acc_info = account.get(member_id);
    assert!(acc_info.is_ok());
}
