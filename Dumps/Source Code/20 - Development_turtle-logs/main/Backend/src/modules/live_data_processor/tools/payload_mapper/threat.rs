use crate::modules::live_data_processor::dto::{LiveDataProcessorFailure, Threat};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapThreat {
    fn to_threat(&self) -> Result<Threat, LiveDataProcessorFailure>;
}

impl MapThreat for [u8] {
    fn to_threat(&self) -> Result<Threat, LiveDataProcessorFailure> {
        if self.len() != 26 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        let spell_id = byte_reader::read_u32(&self[18..22])?;
        Ok(Threat {
            threater: self[0..9].to_unit()?,
            threatened: self[9..18].to_unit()?,
            spell_id: if spell_id == 0 { None } else { Some(spell_id) },
            amount: byte_reader::read_i32(&self[22..26])?,
        })
    }
}
