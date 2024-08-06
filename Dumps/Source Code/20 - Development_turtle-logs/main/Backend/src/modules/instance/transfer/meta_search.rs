use crate::dto::SearchResult;
use crate::modules::account::guard::CurrentUser;
use crate::modules::armory::Armory;
use crate::modules::data::Data;
use crate::modules::instance::dto::{BattlegroundSearchFilter, MetaBattlegroundSearch, MetaRaidSearch, MetaRatedArenaSearch, MetaSkirmishSearch, RaidSearchFilter, RatedArenaSearchFilter, SkirmishSearchFilter};
use crate::modules::instance::tools::MetaSearch;
use crate::modules::instance::Instance;
use crate::MainDb;
use rocket::State;
use rocket_contrib::json::Json;

#[openapi]
#[post("/meta_search/raids", format = "application/json", data = "<filter>")]
pub fn export_raids(mut db_main: MainDb, me: State<Instance>, armory: State<Armory>, data: State<Data>, current_user: CurrentUser, filter: Json<RaidSearchFilter>) -> Json<SearchResult<MetaRaidSearch>> {
    Json(me.search_meta_raids(&mut *db_main, &armory, &data, current_user.0, filter.into_inner()))
}

#[openapi]
#[post("/meta_search/raids/by_member_id", format = "application/json", data = "<filter>")]
pub fn export_raids_by_member_id(mut db_main: MainDb, me: State<Instance>, armory: State<Armory>, data: State<Data>, current_user: CurrentUser, filter: Json<RaidSearchFilter>) -> Json<SearchResult<MetaRaidSearch>> {
    Json(me.search_meta_raids_by_member(&mut *db_main, &armory, &data, current_user.0, filter.into_inner()))
}

#[openapi]
#[post("/meta_search/raids/by_character_id", format = "application/json", data = "<filter>")]
pub fn export_raids_by_character_id(mut db_main: MainDb, me: State<Instance>, armory: State<Armory>, data: State<Data>, filter: Json<(u32, RaidSearchFilter)>) -> Json<SearchResult<MetaRaidSearch>> {
    Json(me.search_meta_raids_by_character(&mut *db_main, &armory, &data, (*filter).0, (*filter).1.clone()))
}

#[openapi]
#[post("/meta_search/rated_arena", format = "application/json", data = "<filter>")]
pub fn export_rated_arenas(me: State<Instance>, current_user: CurrentUser, filter: Json<RatedArenaSearchFilter>) -> Json<SearchResult<MetaRatedArenaSearch>> {
    Json(me.search_meta_rated_arenas(current_user.0, filter.into_inner()))
}

#[openapi]
#[post("/meta_search/skirmishes", format = "application/json", data = "<filter>")]
pub fn export_skirmishes(me: State<Instance>, current_user: CurrentUser, filter: Json<SkirmishSearchFilter>) -> Json<SearchResult<MetaSkirmishSearch>> {
    Json(me.search_meta_skirmishes(current_user.0, filter.into_inner()))
}

#[openapi]
#[post("/meta_search/battlegrounds", format = "application/json", data = "<filter>")]
pub fn export_battlegrounds(me: State<Instance>, current_user: CurrentUser, filter: Json<BattlegroundSearchFilter>) -> Json<SearchResult<MetaBattlegroundSearch>> {
    Json(me.search_meta_battlegrounds(current_user.0, filter.into_inner()))
}
