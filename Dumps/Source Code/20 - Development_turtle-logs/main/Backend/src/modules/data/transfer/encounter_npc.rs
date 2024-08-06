use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::{domain_value::EncounterNpc, tools::RetrieveEncounterNpc, Data};

#[openapi]
#[get("/encounter_npc/<id>")]
pub fn get_encounter_npc(me: State<Data>, id: u32) -> Option<Json<EncounterNpc>> {
    me.get_encounter_npc(id).map(Json)
}

#[openapi]
#[get("/encounter_npc")]
pub fn get_all_encounter_npcs(me: State<Data>) -> Json<Vec<EncounterNpc>> {
    Json(me.get_all_encounter_npcs())
}
