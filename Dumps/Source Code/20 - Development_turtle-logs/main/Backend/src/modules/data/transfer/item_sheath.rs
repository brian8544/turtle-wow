use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::ItemSheath, tools::RetrieveItemSheath, Data};

#[openapi]
#[get("/item_sheath/<id>")]
pub fn get_item_sheath(me: State<Data>, id: u8) -> Option<Json<ItemSheath>> {
    me.get_item_sheath(id).map(Json)
}

#[openapi]
#[get("/item_sheath")]
pub fn get_all_item_sheaths(me: State<Data>) -> Json<Vec<ItemSheath>> {
    Json(me.get_all_item_sheaths())
}
