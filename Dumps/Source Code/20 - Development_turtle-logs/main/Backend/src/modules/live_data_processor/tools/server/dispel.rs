use crate::modules::armory::Armory;
use crate::modules::live_data_processor::domain_value::{Event, EventParseFailureAction, EventType, Unit};
use crate::modules::live_data_processor::dto::UnAura;
use crate::modules::live_data_processor::tools::MapUnit;
use crate::util::database::{Execute, Select};
use std::collections::{HashMap, VecDeque};

pub fn try_parse_dispel(
    db_main: &mut (impl Select + Execute), dispel: &UnAura, recently_committed_spell_cast_and_aura_applications: &VecDeque<Event>, armory: &Armory, server_id: u32, summons: &HashMap<u64, Unit>, cache_unit: &mut HashMap<u64, Unit>,
) -> Result<(Event, Event), EventParseFailureAction> {
    let un_aura_caster = dispel.un_aura_caster.to_unit_add_implicit(cache_unit, db_main, armory, server_id, summons).map_err(|_| EventParseFailureAction::DiscardFirst)?;
    let target = dispel.target.to_unit_add_implicit(&mut HashMap::new(), db_main, armory, server_id, summons).map_err(|_| EventParseFailureAction::DiscardFirst)?;

    let mut un_aura_event = None;
    let mut aura_application_event = None;

    for i in (0..recently_committed_spell_cast_and_aura_applications.len()).rev() {
        let event: &Event = recently_committed_spell_cast_and_aura_applications.get(i).unwrap();

        if un_aura_event.is_some() && aura_application_event.is_some() {
            break;
        }

        match &event.event {
            // I wonder if all hot dispel casts have the same spell id as the hot in the end
            EventType::SpellCast(spell_cast) => {
                if un_aura_event.is_some() {
                    continue;
                }

                if let Some(victim) = &spell_cast.victim {
                    if victim == &target && event.subject == un_aura_caster && dispel.un_aura_spell_id == spell_cast.spell_id {
                        un_aura_event = Some(event.clone());
                    }
                }
            },
            EventType::AuraApplication(aura_application) => {
                // TODO: How much did the aura app change?
                if event.subject == target && aura_application.spell_id == dispel.target_spell_id {
                    if aura_application_event.is_some() {
                        continue;
                    }

                    aura_application_event = Some(event.clone());
                } else if aura_application.caster == un_aura_caster && event.subject == target && aura_application.spell_id == dispel.un_aura_spell_id {
                    if un_aura_event.is_some() {
                        continue;
                    }

                    un_aura_event = Some(event.clone());
                }
            },
            _ => continue,
        };
    }

    if let Some(un_aura_event) = un_aura_event {
        if let Some(aura_app_event) = aura_application_event {
            return Ok((un_aura_event, aura_app_event));
        }
    }
    Err(EventParseFailureAction::PrependNext)
}
