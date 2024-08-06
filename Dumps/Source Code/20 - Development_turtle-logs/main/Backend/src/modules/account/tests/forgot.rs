use str_util::sha3;

use crate::modules::account::tests::helper::get_create_member;
use crate::modules::account::{
    material::Account,
    tools::{Create, Forgot},
};
use crate::tests::TestContainer;

#[test]
fn send_forget_password_user_does_not_exist() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    assert!(account.send_forgot_password(&mut conn, "test@mail.de").is_ok());
}

#[test]
fn send_forget_password_invalid_mail() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    assert!(account.send_forgot_password(&mut conn, "test").is_err());
}

#[test]
fn send_forgot_password_user_exists_and_receive() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "Password123456Password123456Password123456");

    let val_pair = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    assert!(account.send_forgot_password(&mut conn, "abc@abc.de").is_ok());

    let salt;
    {
        let member = account.member.read().unwrap();
        salt = member.get(&val_pair.member_id).unwrap().salt.clone();
    }
    let forgot_id = sha3::hash(&[&val_pair.member_id.to_string(), "forgot", &salt]);
    let receive_forgot = account.recv_forgot_password(&mut conn, &forgot_id);
    assert!(receive_forgot.is_ok());
}

#[test]
fn recv_forgot_password_invalid_id() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    assert!(account.recv_forgot_password(&mut conn, "bla").is_err());
}
