use crate::modules::live_data_processor::dto::{InstanceResetDto, LiveDataProcessorFailure};
use crate::modules::live_data_processor::material::Server;
use crate::params;
use crate::util::database::Execute;

pub trait HandleInstanceReset {
    fn set_instance_resets(&mut self, db_main: &mut impl Execute, instance_resets: Vec<InstanceResetDto>) -> Result<(), LiveDataProcessorFailure>;
}

impl HandleInstanceReset for Server {
    fn set_instance_resets(&mut self, db_main: &mut impl Execute, instance_resets: Vec<InstanceResetDto>) -> Result<(), LiveDataProcessorFailure> {
        if db_main.execute_batch_wparams(
            "INSERT IGNORE INTO armory_instance_resets (`server_id`, `map_id`, `reset_time`, difficulty) VALUES (:server_id, :map_id, :reset_time, :difficulty)",
            instance_resets.clone().into_iter().map(|instance| (self.server_id, instance)).collect(),
            |(server_id, instance)| {
                params! {
                  "server_id" => server_id,
                  "map_id" => instance.map_id,
                  "reset_time" => instance.reset_time,
                  "difficulty" => instance.difficulty
                }
            },
        ) {
            for instance_reset in instance_resets {
                // TODO: Also match on map difficulty?
                if let Some(reset) = self.instance_resets.get_mut(&instance_reset.map_id) {
                    reset.reset_time = instance_reset.reset_time;
                }
            }
            return Ok(());
        }
        Err(LiveDataProcessorFailure::DatabaseFailure(String::from("set_instance_resets")))
    }
}
