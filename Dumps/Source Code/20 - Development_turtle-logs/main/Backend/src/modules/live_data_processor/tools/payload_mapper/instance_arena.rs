use crate::modules::live_data_processor::dto::{InstanceArena, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::byte_reader;

pub trait MapInstanceArena {
    fn to_instance_arena(&self) -> Result<InstanceArena, LiveDataProcessorFailure>;
}

impl MapInstanceArena for [u8] {
    fn to_instance_arena(&self) -> Result<InstanceArena, LiveDataProcessorFailure> {
        if self.len() != 33 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(InstanceArena {
            map_id: byte_reader::read_u32(&self[0..4])?,
            instance_id: byte_reader::read_u32(&self[4..8])?,
            winner: self[8],
            team_id1: byte_reader::read_u64(&self[9..17])?,
            team_id2: byte_reader::read_u64(&self[17..25])?,
            team_change1: byte_reader::read_i32(&self[25..29])?,
            team_change2: byte_reader::read_i32(&self[29..33])?,
        })
    }
}
