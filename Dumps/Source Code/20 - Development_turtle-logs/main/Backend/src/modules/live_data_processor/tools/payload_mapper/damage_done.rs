use crate::modules::live_data_processor::dto::{DamageComponent, DamageDone, LiveDataProcessorFailure};
use crate::modules::live_data_processor::tools::byte_reader;
use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;
use std::ops::Div;

pub trait MapDamageDone {
    fn from_melee_damage(&self) -> Result<DamageDone, LiveDataProcessorFailure>;
    fn from_spell_damage(&self) -> Result<DamageDone, LiveDataProcessorFailure>;
}

impl MapDamageDone for [u8] {
    fn from_melee_damage(&self) -> Result<DamageDone, LiveDataProcessorFailure> {
        let msg_len = self.len();
        if msg_len < 26 || (msg_len - 26) % 13 != 0 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }

        let mut damage_components = Vec::with_capacity(1);
        for i in 0..(msg_len - 26).div(13) {
            let offset = i * 13;
            damage_components.push(DamageComponent {
                school_mask: self[26 + offset],
                damage: byte_reader::read_u32(&self[(27 + offset)..(31 + offset)])?,
                resisted_or_glanced: byte_reader::read_u32(&self[(31 + offset)..(35 + offset)])?,
                absorbed: byte_reader::read_u32(&self[(35 + offset)..(39 + offset)])?,
            });
        }

        Ok(DamageDone {
            attacker: self[0..9].to_unit()?,
            victim: self[9..18].to_unit()?,
            spell_id: None,
            blocked: byte_reader::read_u32(&self[18..22])?,
            hit_mask: byte_reader::read_u32(&self[22..26])?,
            damage_over_time: false,
            damage_components,
        })
    }

    fn from_spell_damage(&self) -> Result<DamageDone, LiveDataProcessorFailure> {
        if self.len() != 44 {
            return Err(LiveDataProcessorFailure::InvalidInput);
        }
        Ok(DamageDone {
            attacker: self[0..9].to_unit()?,
            victim: self[9..18].to_unit()?,
            spell_id: Some(byte_reader::read_u32(&self[18..22])?),
            blocked: byte_reader::read_u32(&self[22..26])?,
            damage_components: vec![DamageComponent {
                school_mask: self[26],
                damage: byte_reader::read_u32(&self[27..31])?,
                resisted_or_glanced: byte_reader::read_u32(&self[31..35])?,
                absorbed: byte_reader::read_u32(&self[35..39])?,
            }],
            damage_over_time: self[39] == 1,
            hit_mask: byte_reader::read_u32(&self[40..44])?,
        })
    }
}
