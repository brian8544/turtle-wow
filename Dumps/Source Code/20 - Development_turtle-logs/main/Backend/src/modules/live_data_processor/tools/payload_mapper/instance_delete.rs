use crate::modules::live_data_processor::dto::LiveDataProcessorFailure;
use crate::modules::live_data_processor::tools::byte_reader;

pub trait MapInstanceDelete {
    fn to_instance_delete(&self) -> Result<u32, LiveDataProcessorFailure>;
}

impl MapInstanceDelete for [u8] {
    fn to_instance_delete(&self) -> Result<u32, LiveDataProcessorFailure> {
        if self.len() != 4 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        byte_reader::read_u32(&self[0..4])
    }
}
