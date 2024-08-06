use crate::modules::account::tests::helper::get_create_member;
use crate::modules::account::{material::Account, tools::Create, tools::Login};
use crate::tests::TestContainer;

// User exists login is tested when creating an account
#[test]
fn login_user_does_not_exist() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let login = account.login(&mut conn, "NothingLol", "NotSecret");
    assert!(login.is_err());
}

#[test]
fn login_wrong_password() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let _ = get_create_member("abc", "abc@abc.de", "password123password123password123");
    let login = account.login(&mut conn, "abc@abc.de", "wrong!");
    assert!(login.is_err());
}

#[test]
fn login_two_users() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj_a = get_create_member("abc", "abc@abc.de", "password123password123password123");
    account.create(&mut conn, &post_obj_a.credentials.mail, &post_obj_a.nickname, &post_obj_a.credentials.password).unwrap();
    let post_obj_x = get_create_member("xyz", "xyz@xyz.de", "password123password123password123");
    account.create(&mut conn, &post_obj_x.credentials.mail, &post_obj_x.nickname, &post_obj_x.credentials.password).unwrap();
    let login_a = account.login(&mut conn, "abc@abc.de", "password123password123password123");
    assert!(login_a.is_ok());
    let login_x = account.login(&mut conn, "xyz@xyz.de", "password123password123password123");
    assert!(login_x.is_ok());
}
