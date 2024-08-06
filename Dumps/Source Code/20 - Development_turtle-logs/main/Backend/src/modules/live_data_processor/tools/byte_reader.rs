use crate::modules::live_data_processor::dto::LiveDataProcessorFailure;
use byteorder::{LittleEndian, ReadBytesExt};
use std::io::Cursor;

pub fn read_u16(number: &[u8]) -> Result<u16, LiveDataProcessorFailure> {
    let mut rdr = Cursor::new(number);
    rdr.read_u16::<LittleEndian>().or(Err(LiveDataProcessorFailure::InvalidInput))
}

pub fn read_u32(number: &[u8]) -> Result<u32, LiveDataProcessorFailure> {
    let mut rdr = Cursor::new(number);
    rdr.read_u32::<LittleEndian>().or(Err(LiveDataProcessorFailure::InvalidInput))
}

pub fn read_u64(number: &[u8]) -> Result<u64, LiveDataProcessorFailure> {
    let mut rdr = Cursor::new(number);
    rdr.read_u64::<LittleEndian>().or(Err(LiveDataProcessorFailure::InvalidInput))
}

pub fn read_i16(number: &[u8]) -> Result<i16, LiveDataProcessorFailure> {
    let mut rdr = Cursor::new(number);
    rdr.read_i16::<LittleEndian>().or(Err(LiveDataProcessorFailure::InvalidInput))
}

pub fn read_i32(number: &[u8]) -> Result<i32, LiveDataProcessorFailure> {
    let mut rdr = Cursor::new(number);
    rdr.read_i32::<LittleEndian>().or(Err(LiveDataProcessorFailure::InvalidInput))
}

pub fn read_i64(number: &[u8]) -> Result<i64, LiveDataProcessorFailure> {
    let mut rdr = Cursor::new(number);
    rdr.read_i64::<LittleEndian>().or(Err(LiveDataProcessorFailure::InvalidInput))
}
