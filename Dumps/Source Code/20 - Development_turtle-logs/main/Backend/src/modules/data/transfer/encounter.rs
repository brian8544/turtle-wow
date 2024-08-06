use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::domain_value::Localized;
use crate::modules::data::guard::Language;
use crate::modules::data::tools::RetrieveLocalization;
use crate::modules::data::{domain_value::Encounter, tools::RetrieveEncounter, Data};

#[openapi]
#[get("/encounter/<id>")]
pub fn get_encounter(me: State<Data>, id: u32) -> Option<Json<Encounter>> {
    me.get_encounter(id).map(Json)
}

#[openapi]
#[get("/encounter")]
pub fn get_all_encounters(me: State<Data>) -> Json<Vec<Encounter>> {
    Json(me.get_all_encounters())
}

#[openapi]
#[get("/encounter/localized")]
pub fn get_all_encounters_localized(me: State<Data>, language: Language) -> Json<Vec<Localized<Encounter>>> {
    Json(
        me.get_all_encounters()
            .into_iter()
            .map(|encounter| Localized {
                localization: me.get_localization(language.0, encounter.localization_id).unwrap().content,
                base: encounter,
            })
            .collect(),
    )
}
