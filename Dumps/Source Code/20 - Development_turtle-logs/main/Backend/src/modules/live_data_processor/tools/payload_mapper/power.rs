use crate::modules::live_data_processor::dto::{LiveDataProcessorFailure, Power};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapPower {
    fn to_power(&self) -> Result<Power, LiveDataProcessorFailure>;
}

impl MapPower for [u8] {
    fn to_power(&self) -> Result<Power, LiveDataProcessorFailure> {
        if self.len() != 18 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(Power {
            unit: self[0..9].to_unit()?,
            power_type: self[9],
            max_power: byte_reader::read_u32(&self[10..14])?,
            current_power: byte_reader::read_u32(&self[14..18])?,
        })
    }
}
