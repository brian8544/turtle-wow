use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::Gem, tools::RetrieveGem, Data};

#[openapi]
#[get("/gem/<expansion_id>/<gem_id>")]
pub fn get_gem(me: State<Data>, expansion_id: u8, gem_id: u32) -> Option<Json<Gem>> {
    me.get_gem(expansion_id, gem_id).map(Json)
}
