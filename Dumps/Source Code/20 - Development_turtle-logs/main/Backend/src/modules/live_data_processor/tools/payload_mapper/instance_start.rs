use crate::modules::live_data_processor::dto::{InstanceStart, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::byte_reader;

pub trait MapInstanceStart {
    fn to_instance_start(&self) -> Result<InstanceStart, LiveDataProcessorFailure>;
}

impl MapInstanceStart for [u8] {
    fn to_instance_start(&self) -> Result<InstanceStart, LiveDataProcessorFailure> {
        if self.len() != 8 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(InstanceStart {
            map_id: byte_reader::read_u32(&self[0..4])?,
            instance_id: byte_reader::read_u32(&self[4..8])?,
        })
    }
}
