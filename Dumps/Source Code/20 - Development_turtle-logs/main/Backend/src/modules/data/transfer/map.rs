use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{
    domain_value::{Localized, Map},
    guard::Language,
    tools::{RetrieveLocalization, RetrieveMap},
    Data,
};

#[openapi]
#[get("/map/<id>")]
pub fn get_map(me: State<Data>, id: u16) -> Option<Json<Map>> {
    me.get_map(id).map(Json)
}

#[openapi]
#[get("/map")]
pub fn get_all_maps(me: State<Data>) -> Json<Vec<Map>> {
    Json(me.get_all_maps())
}

#[openapi]
#[get("/map/by_type/<map_type>")]
pub fn get_all_maps_by_type(me: State<Data>, map_type: u8) -> Json<Vec<Map>> {
    Json(me.get_all_maps().into_iter().filter(|map| map.map_type == map_type).collect())
}

#[openapi]
#[get("/map/localized/<id>")]
pub fn get_map_localized(me: State<Data>, language: Language, id: u16) -> Option<Json<Localized<Map>>> {
    me.get_map(id).map(|map| {
        Json(Localized {
            localization: me.get_localization(language.0, map.localization_id).unwrap().content,
            base: map,
        })
    })
}

#[openapi]
#[get("/map/localized")]
pub fn get_all_maps_localized(me: State<Data>, language: Language) -> Json<Vec<Localized<Map>>> {
    Json(
        me.get_all_maps()
            .into_iter()
            .map(|map| Localized {
                localization: me.get_localization(language.0, map.localization_id).unwrap().content,
                base: map,
            })
            .collect(),
    )
}

#[openapi]
#[get("/map/localized/by_type/<map_type>")]
pub fn get_all_maps_localized_by_type(me: State<Data>, language: Language, map_type: u8) -> Json<Vec<Localized<Map>>> {
    Json(
        me.get_all_maps()
            .into_iter()
            .filter(|map| map.map_type == map_type)
            .map(|map| Localized {
                localization: me.get_localization(language.0, map.localization_id).unwrap().content,
                base: map,
            })
            .collect(),
    )
}
