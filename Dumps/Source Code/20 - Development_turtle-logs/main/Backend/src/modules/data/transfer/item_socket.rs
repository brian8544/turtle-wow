use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::ItemSocket, tools::RetrieveItemSocket, Data};

#[openapi]
#[get("/item_socket/<expansion_id>/<item_id>")]
pub fn get_item_socket(me: State<Data>, expansion_id: u8, item_id: u32) -> Option<Json<ItemSocket>> {
    me.get_item_socket(expansion_id, item_id).map(Json)
}
