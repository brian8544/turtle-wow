use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::{
    armory::Armory,
    data::{guard::Language, Data},
    tooltip::{dto::TooltipFailure, material::ItemTooltip, tools::RetrieveItemTooltip, Tooltip},
};
use crate::MainDb;

#[openapi]
#[get("/item/<expansion_id>/<id>")]
pub fn get_item(me: State<Tooltip>, data: State<Data>, language: Language, expansion_id: u8, id: u32) -> Result<Json<ItemTooltip>, TooltipFailure> {
    me.get_item(&data, language.0, expansion_id, id).map(Json)
}

#[openapi]
#[get("/item/armory/<character_history_id>/<item_id>")]
pub fn get_character_item(mut db_main: MainDb, me: State<Tooltip>, data: State<Data>, armory: State<Armory>, language: Language, character_history_id: u32, item_id: u32) -> Result<Json<ItemTooltip>, TooltipFailure> {
    me.get_character_item(&mut *db_main, &data, &armory, language.0, item_id, character_history_id).map(Json)
}
