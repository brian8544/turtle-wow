use crate::modules::account::{
    material::Account,
    tools::{Create, Delete},
};
use str_util::sha3;

use crate::modules::account::tests::helper::get_create_member;
use crate::tests::TestContainer;

#[test]
fn issue_delete() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "password123password123password123");

    let val_pair = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let issue_delete = account.issue_delete(&mut conn, val_pair.member_id);
    assert!(issue_delete.is_ok());
}

#[test]
#[should_panic]
fn issue_delete_nonexistent() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "password123password123password123");

    let val_pair = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let issue_delete = account.issue_delete(&mut conn, val_pair.member_id + 1);
    assert!(issue_delete.is_err());
}

#[test]
fn confirm_delete_wrong_secret() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "password123password123password123");

    let val_pair = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let issue_delete = account.issue_delete(&mut conn, val_pair.member_id);
    assert!(issue_delete.is_ok());

    let confirm_delete = account.confirm_delete(&mut conn, "0");
    assert!(confirm_delete.is_err());
}

#[test]
fn confirm_delete_without_issued_delete() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let confirm_delete = account.confirm_delete(&mut conn, "0");
    assert!(confirm_delete.is_err());
}

#[test]
fn full_delete_process() {
    let container = TestContainer::new(false);
    let (mut conn, _dns, _node) = container.run();

    let account = Account::default();
    let post_obj = get_create_member("abc", "abc@abc.de", "password123password123password123");

    let val_pair = account.create(&mut conn, &post_obj.credentials.mail, &post_obj.nickname, &post_obj.credentials.password).unwrap();
    let issue_delete = account.issue_delete(&mut conn, val_pair.member_id);
    assert!(issue_delete.is_ok());

    let salt;
    {
        let member = account.member.read().unwrap();
        salt = member.get(&val_pair.member_id).unwrap().salt.clone();
    }
    let delete_id = sha3::hash(&[&val_pair.member_id.to_string(), "delete", &salt]);

    let confirm_delete = account.confirm_delete(&mut conn, &delete_id);
    assert!(confirm_delete.is_ok());
}
