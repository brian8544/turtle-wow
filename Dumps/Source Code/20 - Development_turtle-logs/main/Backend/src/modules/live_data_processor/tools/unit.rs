use crate::modules::armory::tools::{CreateCharacter, GetCharacter};
use crate::modules::armory::Armory;
use crate::modules::live_data_processor::domain_value;
use crate::modules::live_data_processor::domain_value::Unit;
use crate::modules::live_data_processor::dto;
use crate::modules::live_data_processor::dto::LiveDataProcessorFailure;
use crate::modules::live_data_processor::tools::GUID;
use crate::util::database::{Execute, Select};
use std::collections::HashMap;

pub trait MapUnit {
    fn to_unit_add_implicit(&self, cache_unit: &mut HashMap<u64, domain_value::Unit>, db_main: &mut (impl Execute + Select), armory: &Armory, server_id: u32, summons: &HashMap<u64, Unit>) -> Result<domain_value::Unit, LiveDataProcessorFailure>;
}

impl MapUnit for dto::Unit {
    fn to_unit_add_implicit(&self, cache_unit: &mut HashMap<u64, domain_value::Unit>, db_main: &mut (impl Execute + Select), armory: &Armory, server_id: u32, summons: &HashMap<u64, Unit>) -> Result<domain_value::Unit, LiveDataProcessorFailure> {
        if self.is_player {
            if cache_unit.contains_key(&self.unit_id) {
                return Ok(cache_unit.get(&self.unit_id).unwrap().clone());
            }

            let mut character = armory.get_character_by_uid(server_id, self.unit_id);
            if character.is_none() {
                character = armory.create_character(db_main, server_id, self.unit_id).ok().and_then(|character_id| armory.get_character(character_id));
            }
            let character = character.ok_or(LiveDataProcessorFailure::InvalidInput)?;
            let unit = domain_value::Unit::Player(domain_value::Player {
                character_id: character.id,
                /* server_uid: self.unit_id,
                 * character: Some(character), */
            });
            cache_unit.insert(self.unit_id, unit.clone());
            Ok(unit)
        } else {
            // Dont cache, because an owner could be found at a later time
            let unit = domain_value::Unit::Creature(domain_value::Creature {
                creature_id: self.unit_id,
                entry: self.unit_id.get_entry().ok_or(LiveDataProcessorFailure::InvalidInput)?,
                owner: summons.get(&self.unit_id).cloned().map(Box::new),
            });
            Ok(unit)
        }
    }
}
