use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::account::{
    dto::Failure,
    material::{APIToken, Account},
    tools::Forgot,
};
use crate::MainDb;

#[openapi]
#[get("/forgot/<id>")]
pub fn receive_confirmation(mut db_main: MainDb, me: State<Account>, id: String) -> Result<Json<APIToken>, Failure> {
    me.recv_forgot_password(&mut *db_main, &id).map(Json)
}

#[openapi]
#[post("/forgot", data = "<mail>", format = "application/json")]
pub fn send_confirmation(mut db_main: MainDb, me: State<Account>, mail: Json<String>) -> Result<(), Failure> {
    me.send_forgot_password(&mut *db_main, &mail)
}
