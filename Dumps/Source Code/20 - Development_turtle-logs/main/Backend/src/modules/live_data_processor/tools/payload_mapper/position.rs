use crate::modules::live_data_processor::dto::{LiveDataProcessorFailure, Position};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapPosition {
    fn to_position(&self) -> Result<Position, LiveDataProcessorFailure>;
}

impl MapPosition for [u8] {
    fn to_position(&self) -> Result<Position, LiveDataProcessorFailure> {
        if self.len() != 25 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(Position {
            unit: self[0..9].to_unit()?,
            x: byte_reader::read_i32(&self[9..13])?,
            y: byte_reader::read_i32(&self[13..17])?,
            z: byte_reader::read_i32(&self[17..21])?,
            orientation: byte_reader::read_i32(&self[21..25])?,
        })
    }
}
