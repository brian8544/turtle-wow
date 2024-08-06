use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::Icon, tools::RetrieveIcon, Data};

#[openapi]
#[get("/icon/<id>")]
pub fn get_icon(me: State<Data>, id: u16) -> Option<Json<Icon>> {
    me.get_icon(id).map(Json)
}
