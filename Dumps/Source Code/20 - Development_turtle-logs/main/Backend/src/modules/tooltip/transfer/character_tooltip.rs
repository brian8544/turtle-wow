use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::{
    armory::Armory,
    data::{guard::Language, Data},
    tooltip::{dto::TooltipFailure, material::CharacterTooltip, tools::RetrieveCharacterTooltip, Tooltip},
};
use crate::MainDb;

#[openapi]
#[get("/character/<id>")]
pub fn get_character(mut db_main: MainDb, me: State<Tooltip>, data: State<Data>, armory: State<Armory>, language: Language, id: u32) -> Result<Json<CharacterTooltip>, TooltipFailure> {
    me.get_character(&mut *db_main, &data, &armory, language.0, id, u64::MAX).map(Json)
}

#[openapi]
#[get("/character/<id>/<timestamp>")]
pub fn get_character_by_ts(mut db_main: MainDb, me: State<Tooltip>, data: State<Data>, armory: State<Armory>, language: Language, id: u32, timestamp: u64) -> Result<Json<CharacterTooltip>, TooltipFailure> {
    me.get_character(&mut *db_main, &data, &armory, language.0, id, timestamp).map(Json)
}
