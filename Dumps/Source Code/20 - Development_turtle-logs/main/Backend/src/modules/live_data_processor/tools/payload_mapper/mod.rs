pub use self::message_type::MapMessageType;

#[cfg(test)]
pub mod aura_application;
#[cfg(test)]
pub mod combat_state;
#[cfg(test)]
pub mod damage_done;
#[cfg(test)]
pub mod death;
#[cfg(test)]
pub mod event;
#[cfg(test)]
pub mod heal_done;
#[cfg(test)]
pub mod instance_arena;
#[cfg(test)]
pub mod instance_battleground;
#[cfg(test)]
pub mod instance_delete;
#[cfg(test)]
pub mod instance_map;
#[cfg(test)]
pub mod instance_start;
#[cfg(test)]
pub mod instance_start_rated_arena;
#[cfg(test)]
pub mod instance_unrated_arena;
#[cfg(test)]
pub mod interrupt;
#[cfg(test)]
pub mod loot;
#[cfg(test)]
pub mod message_type;
#[cfg(test)]
pub mod position;
#[cfg(test)]
pub mod power;
#[cfg(test)]
pub mod spell_cast;
#[cfg(test)]
pub mod summon;
#[cfg(test)]
pub mod threat;
#[cfg(test)]
pub mod un_aura;
#[cfg(test)]
pub mod unit;

#[cfg(not(test))]
mod aura_application;
#[cfg(not(test))]
mod combat_state;
#[cfg(not(test))]
mod damage_done;
#[cfg(not(test))]
mod death;
#[cfg(not(test))]
mod event;
#[cfg(not(test))]
mod heal_done;
#[cfg(not(test))]
mod instance_arena;
#[cfg(not(test))]
mod instance_battleground;
#[cfg(not(test))]
mod instance_delete;
#[cfg(not(test))]
mod instance_map;
#[cfg(not(test))]
mod instance_start;
#[cfg(not(test))]
mod instance_start_rated_arena;
#[cfg(not(test))]
mod instance_unrated_arena;
#[cfg(not(test))]
mod interrupt;
#[cfg(not(test))]
mod loot;
#[cfg(not(test))]
mod message_type;
#[cfg(not(test))]
mod position;
#[cfg(not(test))]
mod power;
#[cfg(not(test))]
mod spell_cast;
#[cfg(not(test))]
mod summon;
#[cfg(not(test))]
mod threat;
#[cfg(not(test))]
mod un_aura;
#[cfg(not(test))]
mod unit;
