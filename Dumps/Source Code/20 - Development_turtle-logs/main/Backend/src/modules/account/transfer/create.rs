use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::account::{
    dto::{CreateMember, Failure},
    guard::Authenticate,
    material::{APIToken, Account},
    tools::Create,
};
use crate::MainDb;

#[openapi]
#[post("/create", format = "application/json", data = "<params>")]
pub fn create(mut db_main: MainDb, me: State<Account>, params: Json<CreateMember>) -> Result<Json<APIToken>, Failure> {
    me.create(&mut *db_main, &params.credentials.mail, &params.nickname, &params.credentials.password).map(Json)
}

#[openapi]
#[get("/create/<id>")]
pub fn confirm(mut db_main: MainDb, me: State<Account>, id: String) -> Result<(), Failure> {
    if me.confirm(&mut *db_main, &id) {
        return Ok(());
    }
    Err(Failure::Unknown)
}

#[openapi]
#[post("/create/resend")]
pub fn resend_confirm(me: State<Account>, auth: Authenticate) -> Result<(), Failure> {
    if me.send_confirmation(auth.0) {
        return Ok(());
    }
    Err(Failure::Unknown)
}
