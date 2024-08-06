use byteorder::{LittleEndian, WriteBytesExt};

pub fn write_u8(original: &mut [u8], number: u8) {
    original[0] = number;
}

pub fn write_u16(original: &mut [u8], number: u16) {
    let mut res = Vec::new();
    res.write_u16::<LittleEndian>(number).unwrap();
    original.clone_from_slice(&res[..2]);
}

pub fn write_u32(original: &mut [u8], number: u32) {
    let mut res = Vec::new();
    res.write_u32::<LittleEndian>(number).unwrap();
    original.clone_from_slice(&res[..4]);
}

pub fn write_u64(original: &mut [u8], number: u64) {
    let mut res = Vec::new();
    res.write_u64::<LittleEndian>(number).unwrap();
    original.clone_from_slice(&res[..8]);
}
