use crate::modules::live_data_processor::dto::{HealDone, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapHealDone {
    fn to_heal_done(&self) -> Result<HealDone, LiveDataProcessorFailure>;
}

impl MapHealDone for [u8] {
    fn to_heal_done(&self) -> Result<HealDone, LiveDataProcessorFailure> {
        if self.len() != 38 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(HealDone {
            caster: self[0..9].to_unit()?,
            target: self[9..18].to_unit()?,
            spell_id: byte_reader::read_u32(&self[18..22])?,
            total_heal: byte_reader::read_u32(&self[22..26])?,
            effective_heal: byte_reader::read_u32(&self[26..30])?,
            absorb: byte_reader::read_u32(&self[30..34])?,
            hit_mask: byte_reader::read_u32(&self[34..38])?,
        })
    }
}
