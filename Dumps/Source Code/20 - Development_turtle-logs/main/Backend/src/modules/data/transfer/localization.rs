use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::Localization, tools::RetrieveLocalization, Data};

#[openapi]
#[get("/localization/<language_id>/<localization_id>")]
pub fn get_localization(me: State<Data>, language_id: u8, localization_id: u32) -> Option<Json<Localization>> {
    me.get_localization(language_id, localization_id).map(Json)
}
