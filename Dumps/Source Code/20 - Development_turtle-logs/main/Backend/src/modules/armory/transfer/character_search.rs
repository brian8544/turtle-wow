use rocket::State;
use rocket_contrib::json::Json;

use crate::{
    dto::SearchResult,
    modules::{
        armory::{
            dto::{CharacterSearchFilter, CharacterSearchResult},
            tools::PerformCharacterSearch,
            Armory,
        },
        data::Data,
    },
};

#[openapi]
#[post("/character_search", format = "application/json", data = "<filter>")]
pub fn get_character_search_result(me: State<Armory>, data: State<Data>, filter: Json<CharacterSearchFilter>) -> Json<SearchResult<CharacterSearchResult>> {
    Json(me.get_character_search_result(&data, filter.into_inner()))
}
