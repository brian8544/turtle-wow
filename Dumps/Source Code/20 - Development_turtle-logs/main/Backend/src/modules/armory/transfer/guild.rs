use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::{
    account::guard::ServerOwner,
    armory::{
        dto::{ArmoryFailure, GuildDto},
        material::Guild,
        tools::{CreateGuild, DeleteGuild, GetGuild, UpdateGuild},
        Armory,
    },
};
use crate::MainDb;

#[openapi]
#[get("/guild/<id>")]
pub fn get_guild(me: State<Armory>, id: u32) -> Result<Json<Guild>, ArmoryFailure> {
    me.get_guild(id).map(Json).ok_or(ArmoryFailure::InvalidInput)
}

#[openapi]
#[get("/guild/by_name/<guild_name>")]
pub fn get_guilds_by_name(me: State<Armory>, guild_name: String) -> Json<Vec<Guild>> {
    Json(me.get_guilds_by_name(guild_name))
}

#[openapi]
#[post("/guild", format = "application/json", data = "<guild>")]
pub fn create_guild(mut db_main: MainDb, me: State<Armory>, owner: ServerOwner, guild: Json<GuildDto>) -> Result<(), ArmoryFailure> {
    me.create_guild(&mut *db_main, owner.0, guild.into_inner()).map(|_| ())
}

#[openapi]
#[post("/guild/<uid>", format = "application/json", data = "<guild_name>")]
pub fn update_guild_name(mut db_main: MainDb, me: State<Armory>, owner: ServerOwner, uid: u64, guild_name: Json<String>) -> Result<(), ArmoryFailure> {
    me.update_guild_name(&mut *db_main, owner.0, uid, guild_name.into_inner()).map(|_| ())
}

#[openapi]
#[delete("/guild/<id>")]
pub fn delete_guild(mut db_main: MainDb, me: State<Armory>, _owner: ServerOwner, id: u32) -> Result<(), ArmoryFailure> {
    me.delete_guild(&mut *db_main, id)
}

#[openapi]
#[delete("/guild/by_uid/<uid>")]
pub fn delete_guild_by_uid(mut db_main: MainDb, me: State<Armory>, owner: ServerOwner, uid: u64) -> Result<(), ArmoryFailure> {
    me.delete_guild_by_uid(&mut *db_main, owner.0, uid)
}
