use crate::modules::live_data_processor::dto::{LiveDataProcessorFailure, UnAura};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapUnAura {
    fn to_un_aura(&self) -> Result<UnAura, LiveDataProcessorFailure>;
}

impl MapUnAura for [u8] {
    fn to_un_aura(&self) -> Result<UnAura, LiveDataProcessorFailure> {
        if self.len() != 36 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(UnAura {
            un_aura_caster: self[0..9].to_unit()?,
            target: self[9..18].to_unit()?,
            aura_caster: Some(self[18..27].to_unit()?), // Here we expect a unit
            un_aura_spell_id: byte_reader::read_u32(&self[27..31])?,
            target_spell_id: byte_reader::read_u32(&self[31..35])?,
            un_aura_amount: self[35],
        })
    }
}
