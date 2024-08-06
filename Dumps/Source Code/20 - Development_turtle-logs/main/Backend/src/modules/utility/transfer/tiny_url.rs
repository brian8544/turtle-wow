use crate::modules::utility::domain_value::TinyUrl;
use crate::modules::utility::dto::UtilityFailure;
use crate::modules::utility::tools::RetrieveTinyUrl;
use crate::modules::utility::Utility;
use crate::rocket_impl::from_data_string::RawString;
use crate::MainDb;
use rocket::State;
use rocket_contrib::json::Json;

#[openapi]
#[get("/tiny_url/<id>")]
pub fn get_tiny_url(mut db_main: MainDb, me: State<Utility>, id: u32) -> Result<Json<TinyUrl>, UtilityFailure> {
    me.get_tiny_url(&mut *db_main, id).map(Json)
}

#[openapi(skip)]
#[post("/tiny_url", data = "<url_payload>")]
pub fn set_tiny_url(mut db_main: MainDb, me: State<Utility>, url_payload: RawString) -> Result<Json<u32>, UtilityFailure> {
    me.set_tiny_url(&mut *db_main, url_payload.content).map(Json)
}
