use str_util::sha3;

use crate::modules::account::tests::helper::get_create_member;
use crate::modules::account::{
    material::Account,
    tools::{Create, GetAccountInformation, Update},
};
use crate::tests::TestContainer;

#[test]
fn change_name() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let changed_name = account.change_name(&mut conn, "SomeUsername", api_token.member_id);
    assert!(changed_name.is_ok());
    assert_eq!(changed_name.unwrap().nickname, "SomeUsername".to_string());
}

#[test]
fn change_name_empty_content() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let changed_name = account.change_name(&mut conn, "", api_token.member_id);
    assert!(changed_name.is_err());
}

#[test]
fn change_name_invalid_content() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let changed_name = account.change_name(&mut conn, "ihsdfoiosdf ihsdfoiosdf", api_token.member_id);
    assert!(changed_name.is_err());
}

#[test]
fn change_name_name_taken() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");
    let post_obj_two = get_create_member("abcd", "abc2@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let _ = account.create(&mut conn, &post_obj_two.credentials.mail, &post_obj_two.nickname, &post_obj_two.credentials.password).unwrap();
    let changed_name = account.change_name(&mut conn, &post_obj_two.nickname, api_token.member_id);
    assert!(changed_name.is_err());
}

#[test]
fn change_password_empty_content() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let changed_password = account.change_password(&mut conn, "", api_token.member_id);
    assert!(changed_password.is_err());
}

#[test]
fn change_password() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let changed_password = account.change_password(&mut conn, "SomeWeirdPassword", api_token.member_id);
    assert!(changed_password.is_ok());
    let new_api_token = changed_password.unwrap();
    assert_ne!(new_api_token.token, api_token.token);
    assert_ne!(new_api_token.id, api_token.id);
    assert_eq!(new_api_token.member_id, api_token.member_id);
}

#[test]
fn change_mail_empty_content() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let changed_mail = account.request_change_mail("", api_token.member_id);
    assert!(changed_mail.is_err());
}

#[test]
fn change_mail_invalid_content() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let changed_mail = account.request_change_mail("asiudfuhisduifs", api_token.member_id);
    assert!(changed_mail.is_err());
}

#[test]
fn change_mail_mail_taken() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");
    let post_obj_two = get_create_member("abc2", "abc2@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let _ = account.create(&mut conn, &post_obj_two.credentials.mail, &post_obj_two.nickname, &post_obj_two.credentials.password).unwrap();
    let changed_mail = account.request_change_mail(&post_obj_two.credentials.mail, api_token.member_id);
    assert!(changed_mail.is_err());
}

#[test]
fn change_mail() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();

    let salt;
    {
        let mut member = account.member.write().unwrap();
        let mut member_entry = member.get_mut(&api_token.member_id).unwrap();
        member_entry.mail_confirmed = true;
        salt = member_entry.salt.clone();
    }

    let request_change_mail = account.request_change_mail("xdssdfsdfg2@bla.de", api_token.member_id);
    assert!(request_change_mail.is_ok());
    let confirm_id = sha3::hash(&[&api_token.member_id.to_string(), "new_mail", &salt]);
    let changed_mail = account.confirm_change_mail(&mut conn, &confirm_id);
    assert!(changed_mail.is_ok());

    let new_api_token = changed_mail.unwrap();
    assert_ne!(new_api_token.token, api_token.token);
    assert_ne!(new_api_token.id, api_token.id);
    assert_eq!(new_api_token.member_id, api_token.member_id);
}

#[test]
fn confirm_change_without_issued_change() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();

    let request_change_mail = account.confirm_change_mail(&mut conn, "0");
    assert!(request_change_mail.is_err());
}

#[test]
fn change_of_unconfirmed_mail() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");

    let api_token = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();

    let request_change_mail = account.request_change_mail("xyz@xyz.de", api_token.member_id);
    assert!(request_change_mail.is_ok());
    assert_eq!(account.get(api_token.member_id).unwrap().mail, "xyz@xyz.de");
}
