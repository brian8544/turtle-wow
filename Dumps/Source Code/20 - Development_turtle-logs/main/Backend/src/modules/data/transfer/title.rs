use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::Title, tools::RetrieveTitle, Data};

#[openapi]
#[get("/title/<id>")]
pub fn get_title(me: State<Data>, id: u16) -> Option<Json<Title>> {
    me.get_title(id).map(Json)
}

#[openapi]
#[get("/title")]
pub fn get_all_titles(me: State<Data>) -> Json<Vec<Title>> {
    Json(me.get_all_titles())
}
