use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::instance::dto::SpeedKill;
use crate::modules::instance::Instance;

#[openapi]
#[get("/speed_kill")]
pub fn get_speed_kills(me: State<Instance>) -> Json<Vec<SpeedKill>> {
    let speed_kills = me.speed_kills.read().unwrap();
    Json(speed_kills.clone())
}

#[openapi]
#[get("/speed_kill/by_season/<season>")]
pub fn get_speed_kills_by_season(me: State<Instance>, season: u8) -> Json<Vec<SpeedKill>> {
    let speed_kills = me.speed_kills.read().unwrap();
    Json(speed_kills.iter().filter(|speed_kill| speed_kill.season_index == season).cloned().collect())
}