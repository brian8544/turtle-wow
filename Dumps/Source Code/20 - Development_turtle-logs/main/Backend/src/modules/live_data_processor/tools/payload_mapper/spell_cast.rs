use crate::modules::live_data_processor::dto::{LiveDataProcessorFailure, SpellCast, Unit};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

pub trait MapSpellCast {
    fn to_spell_cast(&self) -> Result<SpellCast, LiveDataProcessorFailure>;
}

impl MapSpellCast for [u8] {
    fn to_spell_cast(&self) -> Result<SpellCast, LiveDataProcessorFailure> {
        if self.len() != 26 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        let target_id: Unit = self[9..18].to_unit()?;
        Ok(SpellCast {
            caster: self[0..9].to_unit()?,
            target: if let Unit { is_player: _, unit_id: 0 } = target_id { None } else { Some(target_id) },
            spell_id: byte_reader::read_u32(&self[18..22])?,
            hit_mask: byte_reader::read_u32(&self[22..26])?,
        })
    }
}
