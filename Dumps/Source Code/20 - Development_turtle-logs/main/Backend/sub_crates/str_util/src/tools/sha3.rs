use sha::{Digest, Sha3_512};

pub fn hash(input: &[&str]) -> String {
    let mut hasher = Sha3_512::new();
    hasher.update(input.concat());
    format!("{:x}", hasher.finalize())
}
