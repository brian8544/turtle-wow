use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::ItemRandomProperty, tools::RetrieveItemRandomProperty, Data};

#[openapi]
#[get("/item_random_property/<expansion_id>/<random_property_id>")]
pub fn get_item_random_property(me: State<Data>, expansion_id: u8, random_property_id: i16) -> Option<Json<ItemRandomProperty>> {
    me.get_item_random_property(expansion_id, random_property_id).map(Json)
}
