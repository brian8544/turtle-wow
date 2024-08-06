use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::ItemQuality, tools::RetrieveItemQuality, Data};

#[openapi]
#[get("/item_quality/<id>")]
pub fn get_item_quality(me: State<Data>, id: u8) -> Option<Json<ItemQuality>> {
    me.get_item_quality(id).map(Json)
}

#[openapi]
#[get("/item_quality")]
pub fn get_all_item_qualities(me: State<Data>) -> Json<Vec<ItemQuality>> {
    Json(me.get_all_item_qualities())
}
