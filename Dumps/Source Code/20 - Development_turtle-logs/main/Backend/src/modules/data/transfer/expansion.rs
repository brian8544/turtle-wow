use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::Expansion, tools::RetrieveExpansion, Data};

#[openapi]
#[get("/expansion/<id>")]
pub fn get_expansion(me: State<Data>, id: u8) -> Option<Json<Expansion>> {
    me.get_expansion(id).map(Json)
}

#[openapi]
#[get("/expansion")]
pub fn get_all_expansions(me: State<Data>) -> Json<Vec<Expansion>> {
    Json(me.get_all_expansions())
}
