use crate::modules::live_data_processor::dto::{CombatState, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapCombatState {
    fn to_combat_state(&self) -> Result<CombatState, LiveDataProcessorFailure>;
}

impl MapCombatState for [u8] {
    fn to_combat_state(&self) -> Result<CombatState, LiveDataProcessorFailure> {
        if self.len() != 10 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(CombatState {
            unit: self[0..9].to_unit()?,
            in_combat: self[9] == 1,
        })
    }
}
