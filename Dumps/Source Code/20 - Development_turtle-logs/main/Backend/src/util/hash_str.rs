use rustc_hash::FxHasher;
use std::hash::{Hash, Hasher};

pub fn hash_str(input: &str) -> u64 {
    let mut hasher = FxHasher::default();
    input.hash(&mut hasher);
    hasher.finish()
}
