use rocket::State;
use rocket_contrib::json::Json;

use crate::MainDb;
use crate::modules::account::guard::IsModerator;
use crate::modules::armory::Armory;
use crate::modules::instance::dto::{InstanceFailure, RankingCharacterMeta, RankingResult};
use crate::modules::instance::Instance;
use crate::modules::instance::tools::{create_ranking_export, UnrankAttempt};

#[openapi]
#[get("/ranking/dps")]
pub fn get_instance_ranking_dps(me: State<Instance>, armory: State<Armory>) -> Json<Vec<(u32, Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)>)>> {
    let instance_metas = me.instance_metas.read().unwrap();
    let rankings = me.instance_rankings_dps.read().unwrap();
    Json(create_ranking_export(&instance_metas.1, &rankings.1, &armory, None, None))
}

#[openapi]
#[get("/ranking/dps/by_season/<season>")]
pub fn get_instance_ranking_dps_by_season(me: State<Instance>, armory: State<Armory>, season: u8) -> Json<Vec<(u32, Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)>)>> {
    let instance_metas = me.instance_metas.read().unwrap();
    let rankings = me.instance_rankings_dps.read().unwrap();
    Json(create_ranking_export(&instance_metas.1, &rankings.1, &armory, Some(season), None))
}

#[openapi]
#[get("/ranking/dps/by_server/<server_id>/by_season/<season>")]
pub fn get_instance_ranking_dps_by_server_and_season(me: State<Instance>, armory: State<Armory>, server_id: u32, season: u8) -> Json<Vec<(u32, Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)>)>> {
    let instance_metas = me.instance_metas.read().unwrap();
    let rankings = me.instance_rankings_dps.read().unwrap();
    Json(create_ranking_export(&instance_metas.1, &rankings.1, &armory, Some(season), Some(server_id)))
}

#[openapi]
#[get("/ranking/hps")]
pub fn get_instance_ranking_hps(me: State<Instance>, armory: State<Armory>) -> Json<Vec<(u32, Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)>)>> {
    let instance_metas = me.instance_metas.read().unwrap();
    let rankings = me.instance_rankings_hps.read().unwrap();
    Json(create_ranking_export(&instance_metas.1, &rankings.1, &armory, None, None))
}

#[openapi]
#[get("/ranking/hps/by_season/<season>")]
pub fn get_instance_ranking_hps_by_season(me: State<Instance>, armory: State<Armory>, season: u8) -> Json<Vec<(u32, Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)>)>> {
    let instance_metas = me.instance_metas.read().unwrap();
    let rankings = me.instance_rankings_hps.read().unwrap();
    Json(create_ranking_export(&instance_metas.1, &rankings.1, &armory, Some(season), None))
}

#[openapi]
#[get("/ranking/hps/by_server/<server_id>/by_season/<season>")]
pub fn get_instance_ranking_hps_by_server_and_season(me: State<Instance>, armory: State<Armory>, server_id: u32, season: u8) -> Json<Vec<(u32, Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)>)>> {
    let instance_metas = me.instance_metas.read().unwrap();
    let rankings = me.instance_rankings_hps.read().unwrap();
    Json(create_ranking_export(&instance_metas.1, &rankings.1, &armory, Some(season), Some(server_id)))
}

#[openapi]
#[get("/ranking/tps")]
pub fn get_instance_ranking_tps(me: State<Instance>, armory: State<Armory>) -> Json<Vec<(u32, Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)>)>> {
    let instance_metas = me.instance_metas.read().unwrap();
    let rankings = me.instance_rankings_tps.read().unwrap();
    Json(create_ranking_export(&instance_metas.1, &rankings.1, &armory, None, None))
}

#[openapi]
#[get("/ranking/tps/by_season/<season>")]
pub fn get_instance_ranking_tps_by_season(me: State<Instance>, armory: State<Armory>, season: u8) -> Json<Vec<(u32, Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)>)>> {
    let instance_metas = me.instance_metas.read().unwrap();
    let rankings = me.instance_rankings_tps.read().unwrap();
    Json(create_ranking_export(&instance_metas.1, &rankings.1, &armory, Some(season), None))
}

#[openapi]
#[get("/ranking/tps/by_server/<server_id>/by_season/<season>")]
pub fn get_instance_ranking_tps_by_server_and_season(me: State<Instance>, armory: State<Armory>, server_id: u32, season: u8) -> Json<Vec<(u32, Vec<(u32, RankingCharacterMeta, Vec<RankingResult>)>)>> {
    let instance_metas = me.instance_metas.read().unwrap();
    let rankings = me.instance_rankings_tps.read().unwrap();
    Json(create_ranking_export(&instance_metas.1, &rankings.1, &armory, Some(season), Some(server_id)))
}

#[openapi]
#[delete("/ranking/unrank", data = "<data>")]
pub fn unrank_attempt(mut db_main: MainDb, me: State<Instance>, data: Json<u32>, _auth: IsModerator) -> Result<(), InstanceFailure> {
    me.unrank_attempt(&mut *db_main, data.into_inner())
}