use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::ItemsetName, tools::RetrieveItemsetName, Data};

#[openapi]
#[get("/itemset_name/<expansion_id>/<itemset_id>")]
pub fn get_itemset_name(me: State<Data>, expansion_id: u8, itemset_id: u16) -> Option<Json<ItemsetName>> {
    me.get_itemset_name(expansion_id, itemset_id).map(Json)
}

#[openapi]
#[get("/itemset_ids/<expansion_id>/<itemset_id>")]
pub fn get_itemset_item_ids(me: State<Data>, expansion_id: u8, itemset_id: u16) -> Option<Json<Vec<u32>>> {
    me.get_itemset_item_ids(expansion_id, itemset_id).map(Json)
}
