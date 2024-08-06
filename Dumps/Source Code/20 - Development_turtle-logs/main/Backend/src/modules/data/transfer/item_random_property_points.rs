use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::ItemRandomPropertyPoints, tools::RetrieveItemRandomPropertyPoints, Data};

#[openapi]
#[get("/item_random_property_points/<expansion_id>/<item_level>")]
pub fn get_item_random_property_points(me: State<Data>, expansion_id: u8, item_level: u16) -> Option<Json<ItemRandomPropertyPoints>> {
    me.get_item_random_property_points(expansion_id, item_level).map(Json)
}
