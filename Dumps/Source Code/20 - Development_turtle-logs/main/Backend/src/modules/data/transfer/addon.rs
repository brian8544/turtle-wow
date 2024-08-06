use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::Data;
use crate::modules::data::domain_value::Addon;
use crate::modules::data::tools::RetrieveAddon;

#[openapi]
#[get("/addon/<id>")]
pub fn get_addon(me: State<Data>, id: u32) -> Option<Json<Addon>> {
    me.get_addon(id).map(Json)
}

#[openapi]
#[get("/addon")]
pub fn get_all_addons(me: State<Data>) -> Json<Vec<Addon>> {
    Json(me.get_all_addons())
}