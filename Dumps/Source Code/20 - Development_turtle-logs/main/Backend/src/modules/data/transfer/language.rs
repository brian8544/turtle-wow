use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::Language, tools::RetrieveLanguage, Data};

#[openapi]
#[get("/language/<id>")]
pub fn get_language(me: State<Data>, id: u8) -> Option<Json<Language>> {
    me.get_language(id).map(Json)
}

#[openapi]
#[get("/language/by_short_code/<short_code>")]
pub fn get_language_by_short_code(me: State<Data>, short_code: String) -> Option<Json<Language>> {
    me.get_language_by_short_code(short_code).map(Json)
}

#[openapi]
#[get("/language")]
pub fn get_all_languages(me: State<Data>) -> Json<Vec<Language>> {
    Json(me.get_all_languages())
}
