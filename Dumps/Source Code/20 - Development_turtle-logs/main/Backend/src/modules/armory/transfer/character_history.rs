use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::{
    account::guard::ServerOwner,
    armory::{
        dto::{ArmoryFailure, CharacterHistoryDto},
        material::CharacterHistory,
        tools::{DeleteCharacterHistory, GetCharacterHistory, SetCharacterHistory},
        Armory,
    },
};
use crate::MainDb;

#[openapi]
#[post("/character_history/<character_uid>", format = "application/json", data = "<character_history>")]
pub fn set_character_history(mut db_main: MainDb, me: State<Armory>, owner: ServerOwner, character_history: Json<CharacterHistoryDto>, character_uid: u64) -> Result<(), ArmoryFailure> {
    me.set_character_history(&mut *db_main, owner.0, character_history.into_inner(), character_uid, time_util::now() * 1000).map(|_| ())
}

#[openapi]
#[get("/character_history/<id>")]
pub fn get_character_history(mut db_main: MainDb, me: State<Armory>, id: u32) -> Result<Json<CharacterHistory>, ArmoryFailure> {
    me.get_character_history(&mut *db_main, id).map(Json)
}

#[openapi]
#[delete("/character_history/<id>")]
pub fn delete_character_history(mut db_main: MainDb, me: State<Armory>, id: u32) -> Result<(), ArmoryFailure> {
    me.delete_character_history(&mut *db_main, id)
}
