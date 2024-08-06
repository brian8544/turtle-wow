use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{
    domain_value::{Localized, Race},
    guard::Language,
    tools::{RetrieveLocalization, RetrieveRace},
    Data,
};

#[openapi]
#[get("/race/<id>")]
pub fn get_race(me: State<Data>, id: u8) -> Option<Json<Race>> {
    me.get_race(id).map(Json)
}

#[openapi]
#[get("/race")]
pub fn get_all_races(me: State<Data>) -> Json<Vec<Race>> {
    Json(me.get_all_races())
}

#[openapi]
#[get("/race/localized/<id>")]
pub fn get_race_localized(me: State<Data>, language: Language, id: u8) -> Option<Json<Localized<Race>>> {
    me.get_race(id).map(|race| {
        Json(Localized {
            localization: me.get_localization(language.0, race.localization_id).unwrap().content,
            base: race,
        })
    })
}

#[openapi]
#[get("/race/localized")]
pub fn get_all_races_localized(me: State<Data>, language: Language) -> Json<Vec<Localized<Race>>> {
    Json(
        me.get_all_races()
            .iter()
            .map(|race| Localized {
                localization: me.get_localization(language.0, race.localization_id).unwrap().content,
                base: race.to_owned(),
            })
            .collect(),
    )
}
