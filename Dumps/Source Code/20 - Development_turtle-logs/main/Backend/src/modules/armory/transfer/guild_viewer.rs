use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::armory::dto::GuildViewerMemberDto;
use crate::modules::{
    armory::{
        dto::{ArmoryFailure, GuildViewerDto},
        tools::{GetGuild, GuildViewer},
        Armory,
    },
    data::{tools::RetrieveServer, Data},
};

#[openapi]
#[get("/guild_view/<server_name>/<guild_name>")]
pub fn get_guild_view(me: State<Armory>, data: State<Data>, server_name: String, guild_name: String) -> Result<Json<GuildViewerDto>, ArmoryFailure> {
    data.get_server_by_name(server_name)
        .ok_or(ArmoryFailure::InvalidInput)
        .and_then(|server| me.get_guild_by_name(server.id, guild_name).ok_or(ArmoryFailure::InvalidInput).and_then(|guild| me.get_guild_view(guild.id).map(Json)))
}

#[openapi]
#[get("/guild_roster/<guild_id>")]
pub fn get_guild_roster(me: State<Armory>, data: State<Data>, guild_id: u32) -> Json<Vec<GuildViewerMemberDto>> {
    Json(me.get_guild_roster(&data, guild_id))
}
