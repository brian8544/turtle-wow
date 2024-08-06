use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::account::{domain_value::AccountInformation, dto::Failure, guard::Authenticate, material::Account, tools::GetAccountInformation};

#[openapi]
#[get("/get")]
pub fn get_account_information(me: State<Account>, auth: Authenticate) -> Result<Json<AccountInformation>, Failure> {
    me.get(auth.0).map(Json)
}
