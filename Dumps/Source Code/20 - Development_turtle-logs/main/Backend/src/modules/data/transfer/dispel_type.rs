use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::DispelType, tools::RetrieveDispelType, Data};

#[openapi]
#[get("/dispel_type/<id>")]
pub fn get_dispel_type(me: State<Data>, id: u8) -> Option<Json<DispelType>> {
    me.get_dispel_type(id).map(Json)
}

#[openapi]
#[get("/dispel_type")]
pub fn get_all_dispel_types(me: State<Data>) -> Json<Vec<DispelType>> {
    Json(me.get_all_dispel_types())
}
