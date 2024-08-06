use crate::modules::live_data_processor::dto::{AuraApplication, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapAuraApplication {
    fn to_aura_application(&self) -> Result<AuraApplication, LiveDataProcessorFailure>;
}

impl MapAuraApplication for [u8] {
    fn to_aura_application(&self) -> Result<AuraApplication, LiveDataProcessorFailure> {
        if self.len() != 27 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(AuraApplication {
            caster: self[0..9].to_unit()?,
            target: self[9..18].to_unit()?,
            spell_id: byte_reader::read_u32(&self[18..22]).unwrap(),
            stack_amount: byte_reader::read_u32(&self[22..26]).unwrap(),
            delta: self[26] as i8,
        })
    }
}
