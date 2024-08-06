use crate::modules::live_data_processor::dto::{InstanceStartRatedArena, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::byte_reader;

pub trait MapInstanceStartRatedArena {
    fn to_instance_start_rated_arena(&self) -> Result<InstanceStartRatedArena, LiveDataProcessorFailure>;
}

impl MapInstanceStartRatedArena for [u8] {
    fn to_instance_start_rated_arena(&self) -> Result<InstanceStartRatedArena, LiveDataProcessorFailure> {
        if self.len() != 24 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(InstanceStartRatedArena {
            map_id: byte_reader::read_u32(&self[0..4])?,
            instance_id: byte_reader::read_u32(&self[4..8])?,
            team_id1: byte_reader::read_u64(&self[8..16])?,
            team_id2: byte_reader::read_u64(&self[16..24])?,
        })
    }
}
