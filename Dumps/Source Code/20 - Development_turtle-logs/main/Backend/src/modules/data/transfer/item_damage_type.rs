use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::ItemDamageType, tools::RetrieveItemDamageType, Data};

#[openapi]
#[get("/item_damage_type/<id>")]
pub fn get_item_damage_type(me: State<Data>, id: u8) -> Option<Json<ItemDamageType>> {
    me.get_item_damage_type(id).map(Json)
}

#[openapi]
#[get("/item_damage_type")]
pub fn get_all_item_damage_types(me: State<Data>) -> Json<Vec<ItemDamageType>> {
    Json(me.get_all_item_damage_types())
}
