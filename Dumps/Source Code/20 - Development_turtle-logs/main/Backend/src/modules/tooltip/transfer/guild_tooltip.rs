use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::{
    armory::Armory,
    tooltip::{dto::TooltipFailure, material::GuildTooltip, tools::RetrieveGuildTooltip, Tooltip},
};

#[openapi]
#[get("/guild/<id>")]
pub fn get_guild(me: State<Tooltip>, armory: State<Armory>, id: u32) -> Result<Json<GuildTooltip>, TooltipFailure> {
    me.get_guild(&armory, id).map(Json)
}
