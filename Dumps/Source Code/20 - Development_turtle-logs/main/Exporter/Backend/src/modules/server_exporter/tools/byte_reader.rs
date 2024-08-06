use byteorder::{LittleEndian, ReadBytesExt};
use std::io::Cursor;

pub fn read_u16(number: &[u8]) -> u16 {
    let mut rdr = Cursor::new(number);
    rdr.read_u16::<LittleEndian>().unwrap()
}

pub fn read_u32(number: &[u8]) -> u32 {
    let mut rdr = Cursor::new(number);
    rdr.read_u32::<LittleEndian>().unwrap()
}

pub fn read_u64(number: &[u8]) -> u64 {
    let mut rdr = Cursor::new(number);
    rdr.read_u64::<LittleEndian>().unwrap()
}

pub fn read_i16(number: &[u8]) -> i16 {
    let mut rdr = Cursor::new(number);
    rdr.read_i16::<LittleEndian>().unwrap()
}

pub fn read_i32(number: &[u8]) -> i32 {
    let mut rdr = Cursor::new(number);
    rdr.read_i32::<LittleEndian>().unwrap()
}

pub fn read_i64(number: &[u8]) -> i64 {
    let mut rdr = Cursor::new(number);
    rdr.read_i64::<LittleEndian>().unwrap()
}
