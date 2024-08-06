use rustc_hash::FxHasher;
use std::env;
use std::hash::{Hash, Hasher};

pub fn salt_u8_u64(id: u8) -> u64 {
    salt_u64(id.to_string())
}

pub fn salt_u16_u64(id: u16) -> u64 {
    salt_u64(id.to_string())
}

pub fn salt_u32_u64(id: u32) -> u64 {
    salt_u64(id.to_string())
}

pub fn salt_u64_u64(id: u64) -> u64 {
    salt_u64(id.to_string())
}

fn salt_u64(input: String) -> u64 {
    lazy_static! {
        static ref SALT: String = env::var("UID_SALT").unwrap();
    }
    let mut hasher = FxHasher::default();
    (input + &SALT).hash(&mut hasher);
    hasher.finish()
}
