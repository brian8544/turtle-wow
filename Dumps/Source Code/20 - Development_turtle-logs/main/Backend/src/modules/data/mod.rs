pub use self::{domain_value::Stat, material::Data};

#[cfg(test)]
mod tests;

pub(crate) mod domain_value;
mod dto;
mod language;
mod material;

pub mod guard;
pub mod tools;
pub mod transfer;
