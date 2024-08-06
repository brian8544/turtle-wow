use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::ItemStat, tools::RetrieveItemStat, Data};

#[openapi]
#[get("/item_stat/<expansion_id>/<item_id>")]
pub fn get_item_stats(me: State<Data>, expansion_id: u8, item_id: u32) -> Option<Json<Vec<ItemStat>>> {
    me.get_item_stats(expansion_id, item_id).map(Json)
}
