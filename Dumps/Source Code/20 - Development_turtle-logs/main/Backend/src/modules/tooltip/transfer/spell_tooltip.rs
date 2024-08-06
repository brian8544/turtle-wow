use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::{
    data::{guard::Language, Data},
    tooltip::{dto::TooltipFailure, material::SpellTooltip, tools::RetrieveSpellTooltip, Tooltip},
};

#[openapi]
#[get("/spell/<expansion_id>/<id>")]
pub fn get_spell(me: State<Tooltip>, data: State<Data>, language: Language, expansion_id: u8, id: u32) -> Result<Json<SpellTooltip>, TooltipFailure> {
    me.get_spell(&data, language.0, expansion_id, id).map(Json)
}
