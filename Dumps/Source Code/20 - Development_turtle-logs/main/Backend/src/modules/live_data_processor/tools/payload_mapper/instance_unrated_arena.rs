use crate::modules::live_data_processor::dto::{InstanceUnratedArena, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::byte_reader;

pub trait MapInstanceUnratedArena {
    fn to_instance_unrated_arena(&self) -> Result<InstanceUnratedArena, LiveDataProcessorFailure>;
}

impl MapInstanceUnratedArena for [u8] {
    fn to_instance_unrated_arena(&self) -> Result<InstanceUnratedArena, LiveDataProcessorFailure> {
        if self.len() != 9 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(InstanceUnratedArena {
            map_id: byte_reader::read_u32(&self[0..4])?,
            instance_id: byte_reader::read_u32(&self[4..8])?,
            winner: self[8],
        })
    }
}
