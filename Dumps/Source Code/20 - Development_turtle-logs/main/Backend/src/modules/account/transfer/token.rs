use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::account::{
    dto::{CreateToken, Failure, ProlongToken},
    guard::Authenticate,
    material::{APIToken, Account},
    tools::Token,
};
use crate::MainDb;

#[openapi]
#[post("/token", format = "application/json", data = "<params>")]
pub fn create_token(mut db_main: MainDb, me: State<Account>, auth: Authenticate, params: Json<CreateToken>) -> Result<Json<APIToken>, Failure> {
    me.create_token(&mut *db_main, &params.purpose, auth.0, params.exp_date).map(Json)
}

#[openapi]
#[get("/token")]
pub fn get_tokens(me: State<Account>, auth: Authenticate) -> Result<Json<Vec<APIToken>>, Failure> {
    Ok(Json(me.get_all_token(auth.0)))
}

#[openapi]
#[delete("/token", format = "application/json", data = "<token_id>")]
pub fn delete_token(mut db_main: MainDb, me: State<Account>, auth: Authenticate, token_id: Json<u32>) -> Result<(), Failure> {
    me.delete_token(&mut *db_main, token_id.0, auth.0)
}

#[openapi]
#[post("/token/prolong", format = "application/json", data = "<params>")]
pub fn prolong_token(mut db_main: MainDb, me: State<Account>, auth: Authenticate, params: Json<ProlongToken>) -> Result<Json<APIToken>, Failure> {
    me.prolong_token_by_str(&mut *db_main, params.token.clone(), auth.0, params.days).map(Json)
}
