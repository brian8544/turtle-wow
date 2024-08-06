use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::ItemDamage, tools::RetrieveItemDamage, Data};

#[openapi]
#[get("/item_damage/<expansion_id>/<item_id>")]
pub fn get_item_damage(me: State<Data>, expansion_id: u8, item_id: u32) -> Option<Json<Vec<ItemDamage>>> {
    me.get_item_damage(expansion_id, item_id).map(Json)
}
