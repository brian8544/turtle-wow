use crate::modules::live_data_processor::dto::{InstanceMap, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapInstanceMap {
    fn to_instance_map(&self) -> Result<InstanceMap, LiveDataProcessorFailure>;
}

impl MapInstanceMap for [u8] {
    fn to_instance_map(&self) -> Result<InstanceMap, LiveDataProcessorFailure> {
        if self.len() != 18 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(InstanceMap {
            map_id: byte_reader::read_u32(&self[0..4])?,
            instance_id: byte_reader::read_u32(&self[4..8])?,
            map_difficulty: self[8],
            unit: self[9..18].to_unit()?,
        })
    }
}
