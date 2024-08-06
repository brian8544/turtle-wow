use crate::modules::live_data_processor::dto::{LiveDataProcessorFailure, Loot};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapLoot {
    fn to_loot(&self) -> Result<Loot, LiveDataProcessorFailure>;
}

impl MapLoot for [u8] {
    fn to_loot(&self) -> Result<Loot, LiveDataProcessorFailure> {
        if self.len() != 17 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(Loot {
            unit: self[0..9].to_unit()?,
            item_id: byte_reader::read_u32(&self[9..13])?,
            count: byte_reader::read_u32(&self[13..17])?,
        })
    }
}
