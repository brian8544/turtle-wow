use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::domain_value::Localized;
use crate::modules::data::guard::Language;
use crate::modules::data::tools::RetrieveLocalization;
use crate::modules::data::{domain_value::NPC, tools::RetrieveNPC, Data};

#[openapi]
#[get("/npc/<expansion_id>/<npc_id>")]
pub fn get_npc(me: State<Data>, expansion_id: u8, npc_id: u32) -> Option<Json<NPC>> {
    me.get_npc(expansion_id, npc_id).map(Json)
}

#[openapi]
#[get("/npc/localized/<expansion_id>/<npc_id>")]
pub fn get_npc_localized(me: State<Data>, language: Language, expansion_id: u8, npc_id: u32) -> Option<Json<Localized<NPC>>> {
    me.get_npc(expansion_id, npc_id).map(|npc| {
        Json(Localized {
            localization: me.get_localization(language.0, npc.localization_id).unwrap().content,
            base: npc,
        })
    })
}

#[derive(Deserialize)]
pub struct GetNpcs {
    pub expansion_id: u8,
    pub npc_ids: Vec<u32>,
}

#[openapi(skip)]
#[post("/npcs/localized", format = "application/json", data = "<data>")]
pub fn get_npcs_localized(me: State<Data>, language: Language, data: Json<GetNpcs>) -> Json<Vec<Localized<NPC>>> {
    Json(
        data.npc_ids
            .iter()
            .map(|npc_id| {
                me.get_npc(data.expansion_id, *npc_id).map(|npc| Localized {
                    localization: me.get_localization(language.0, npc.localization_id).unwrap().content,
                    base: npc,
                })
            })
            .filter(Option::is_some)
            .map(Option::unwrap)
            .collect::<Vec<Localized<NPC>>>(),
    )
}
