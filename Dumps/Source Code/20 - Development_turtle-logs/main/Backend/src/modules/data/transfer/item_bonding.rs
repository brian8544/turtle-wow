use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::ItemBonding, tools::RetrieveItemBonding, Data};

#[openapi]
#[get("/item_bonding/<id>")]
pub fn get_item_bonding(me: State<Data>, id: u8) -> Option<Json<ItemBonding>> {
    me.get_item_bonding(id).map(Json)
}

#[openapi]
#[get("/item_bonding")]
pub fn get_all_item_bondings(me: State<Data>) -> Json<Vec<ItemBonding>> {
    Json(me.get_all_item_bondings())
}
