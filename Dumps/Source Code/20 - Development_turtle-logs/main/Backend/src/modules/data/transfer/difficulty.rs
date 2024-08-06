use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{
    domain_value::{Difficulty, Localized},
    guard::Language,
    tools::{RetrieveDifficulty, RetrieveLocalization},
    Data,
};

#[openapi]
#[get("/difficulty/<id>")]
pub fn get_difficulty(me: State<Data>, id: u8) -> Option<Json<Difficulty>> {
    me.get_difficulty(id).map(Json)
}

#[openapi]
#[get("/difficulty")]
pub fn get_all_difficulties(me: State<Data>) -> Json<Vec<Difficulty>> {
    Json(me.get_all_difficulties())
}

#[openapi]
#[get("/difficulty/localized/<id>")]
pub fn get_difficulty_localized(me: State<Data>, language: Language, id: u8) -> Option<Json<Localized<Difficulty>>> {
    me.get_difficulty(id).map(|difficulty| {
        Json(Localized {
            localization: me.get_localization(language.0, difficulty.localization_id).unwrap().content,
            base: difficulty,
        })
    })
}

#[openapi]
#[get("/difficulty/localized")]
pub fn get_all_difficulties_localized(me: State<Data>, language: Language) -> Json<Vec<Localized<Difficulty>>> {
    Json(
        me.get_all_difficulties()
            .iter()
            .map(|difficulty| Localized {
                localization: me.get_localization(language.0, difficulty.localization_id).unwrap().content,
                base: difficulty.to_owned(),
            })
            .collect(),
    )
}
