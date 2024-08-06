use crate::modules::live_data_processor::dto::{Interrupt, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapInterrupt {
    fn to_interrupt(&self) -> Result<Interrupt, LiveDataProcessorFailure>;
}

impl MapInterrupt for [u8] {
    fn to_interrupt(&self) -> Result<Interrupt, LiveDataProcessorFailure> {
        if self.len() != 13 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(Interrupt {
            target: self[0..9].to_unit()?,
            interrupted_spell_id: byte_reader::read_u32(&self[9..13])?,
        })
    }
}
