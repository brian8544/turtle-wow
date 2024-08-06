use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::account::{
    domain_value::AccountInformation,
    dto::Failure,
    guard::Authenticate,
    material::{APIToken, Account},
    tools::Update,
};
use crate::MainDb;

#[openapi]
#[post("/update/password", format = "application/json", data = "<content>")]
pub fn password(mut db_main: MainDb, me: State<Account>, auth: Authenticate, content: Json<String>) -> Result<Json<APIToken>, Failure> {
    me.change_password(&mut *db_main, &content, auth.0).map(Json)
}

#[openapi]
#[post("/update/nickname", format = "application/json", data = "<content>")]
pub fn nickname(mut db_main: MainDb, me: State<Account>, auth: Authenticate, content: Json<String>) -> Result<Json<AccountInformation>, Failure> {
    me.change_name(&mut *db_main, &content, auth.0).map(Json)
}

#[openapi]
#[post("/update/mail", format = "application/json", data = "<content>")]
pub fn request_mail(me: State<Account>, auth: Authenticate, content: Json<String>) -> Result<Json<bool>, Failure> {
    me.request_change_mail(&content, auth.0).map(Json)
}

#[openapi]
#[get("/update/mail/<id>")]
pub fn confirm_mail(mut db_main: MainDb, me: State<Account>, id: String) -> Result<Json<APIToken>, Failure> {
    me.confirm_change_mail(&mut *db_main, &id).map(Json)
}

#[openapi]
#[post("/update/default_privacy", format = "application/json", data = "<content>")]
pub fn default_privacy(mut db_main: MainDb, me: State<Account>, auth: Authenticate, content: Json<u8>) -> Result<(), Failure> {
    me.update_default_privacy(&mut *db_main, content.into_inner(), auth.0)
}

#[openapi]
#[get("/update/patreons")]
pub fn update_patreons(mut db_main: MainDb, me: State<Account>) -> Result<(), Failure> {
    me.update_petreons(&mut *db_main)
}

#[openapi]
#[post("/update/patreons")]
pub fn update_patreons_post(mut db_main: MainDb, me: State<Account>) -> Result<(), Failure> {
    me.update_petreons(&mut *db_main)
}