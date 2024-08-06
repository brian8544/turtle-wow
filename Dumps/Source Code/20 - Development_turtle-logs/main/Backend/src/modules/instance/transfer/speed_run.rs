use crate::modules::instance::dto::SpeedRun;
use crate::modules::instance::Instance;
use rocket::State;
use rocket_contrib::json::Json;

#[openapi]
#[get("/speed_run")]
pub fn get_speed_runs(me: State<Instance>) -> Json<Vec<SpeedRun>> {
    let speed_runs = me.speed_runs.read().unwrap();
    Json(speed_runs.clone())
}

#[openapi]
#[get("/speed_run/by_season/<season>")]
pub fn get_speed_runs_by_season(me: State<Instance>, season: u8) -> Json<Vec<SpeedRun>> {
    let speed_runs = me.speed_runs.read().unwrap();
    Json(speed_runs.iter().filter(|speed_run| speed_run.season_index == season).cloned().collect())
}