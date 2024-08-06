use rocket::State;

use crate::modules::account::{dto::Failure, guard::Authenticate, material::Account, tools::Delete};
use crate::MainDb;

#[openapi]
#[get("/delete/<id>")]
pub fn confirm(mut db_main: MainDb, me: State<Account>, id: String) -> Result<(), Failure> {
    me.confirm_delete(&mut *db_main, &id)
}

#[openapi]
#[delete("/delete")]
pub fn request(mut db_main: MainDb, me: State<Account>, auth: Authenticate) -> Result<(), Failure> {
    me.issue_delete(&mut *db_main, auth.0)
}
