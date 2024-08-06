use str_util::sha3;

use crate::modules::account::{
    material::Account,
    tools::{Create, GetAccountInformation},
};

use crate::modules::account::tests::helper::get_create_member;
use crate::tests::TestContainer;

#[test]
fn create_account() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("Sth", "mail@mail.de", "Password123456Password123456Password123456");

    let login = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password);
    assert!(login.is_ok());
}

#[test]
fn mail_twice() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("Sth", "mail@mail.de", "Password123456Password123456Password123456");

    account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    assert!(account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).is_err());
}

#[test]
fn nickname_twice() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("Sth", "mail@mail.de", "Password123456Password123456Password123456");
    let post_obj_two = get_create_member("Sth", "mail2@mail.de", "Password123456Password123456Password123456");

    let _ = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    assert!(account.create(&mut conn, &post_obj_two.credentials.mail, &post_obj_two.nickname, &post_obj_two.credentials.password).is_err());
}

#[test]
fn mail_empty() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("Sth", "", "Password123456Password123456Password123456");

    assert!(account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).is_err());
}

#[test]
fn password_empty() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("Sth", "mail@mail.de", "");

    assert!(account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).is_err());
}

#[test]
fn nickname_empty() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("", "mail@mail.de", "Password123456Password123456Password123456");

    assert!(account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).is_err());
}

#[test]
fn invalid_mail() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("Sth", "mailmailde", "Password123456Password123456Password123456");

    assert!(account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).is_err());
}

#[test]
fn invalid_nickname() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("Sth adasd", "mail@mail.de", "Password123456Password123456Password123456");

    assert!(account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).is_err());
}

#[test]
fn confirm_mail() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("Sth", "mail@mail.de", "Password123456Password123456Password123456");

    let login = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let mail_id;
    {
        let member_guard = account.member.read().unwrap();
        let member = member_guard.get(&login.member_id).unwrap();
        mail_id = sha3::hash(&[&login.member_id.to_string(), "mail", &member.salt]);
    }
    account.confirm(&mut conn, &mail_id);
    let confirmed_information = account.get(login.member_id).unwrap();
    assert!(confirmed_information.mail_confirmed);
}

#[test]
fn init_from_db() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    {
        let account = Account::default();
        let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");
        let _ = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password);
    }
    let account = Account::default();
    let account = account.init(&mut conn);

    assert_eq!(account.member.read().unwrap().len(), 1);
}
