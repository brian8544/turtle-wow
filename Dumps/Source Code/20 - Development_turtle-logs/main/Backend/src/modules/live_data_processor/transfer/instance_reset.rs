use crate::modules::account::guard::ServerOwner;
use crate::modules::live_data_processor::dto::{InstanceResetDto, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::server::HandleInstanceReset;
use crate::modules::live_data_processor::LiveDataProcessor;
use crate::MainDb;
use rocket::State;
use rocket_contrib::json::Json;

#[openapi]
#[post("/instance_reset", format = "application/json", data = "<instance_resets>")]
pub fn set_instance_resets(mut db_main: MainDb, me: State<LiveDataProcessor>, owner: ServerOwner, instance_resets: Json<Vec<InstanceResetDto>>) -> Result<(), LiveDataProcessorFailure> {
    let servers = me.servers.read().unwrap();
    if let Some(server) = servers.get(&owner.0) {
        let mut server = server.write().unwrap();
        return server.set_instance_resets(&mut *db_main, instance_resets.into_inner());
    }
    Err(LiveDataProcessorFailure::InvalidInput)
}
