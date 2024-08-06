use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::account::{
    dto::{Credentials, Failure},
    material::{APIToken, Account},
    tools::Login,
};
use crate::MainDb;

#[openapi]
#[post("/login", format = "application/json", data = "<params>")]
pub fn login(mut db_main: MainDb, me: State<Account>, params: Json<Credentials>) -> Result<Json<APIToken>, Failure> {
    me.login(&mut *db_main, &params.mail, &params.password).map(Json)
}
