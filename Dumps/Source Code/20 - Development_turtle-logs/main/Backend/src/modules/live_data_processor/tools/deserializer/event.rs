use crate::modules::live_data_processor::domain_value::{hit_mask_to_u32, hit_mask_to_u32_vec, school_mask_to_u8, Damage, EventType, HitType, Unit};
use crate::modules::live_data_processor::tools::{EventTypeDeserializer, LiveDataDeserializer};
use crate::modules::live_data_processor::Event;
use std::collections::HashSet;

impl LiveDataDeserializer for Event {
    fn deserialize(&self) -> String {
        format!("[{},{},{}]", self.id, self.timestamp, self.event.deserialize(&self.subject))
    }
}

impl EventTypeDeserializer for EventType {
    fn deserialize(&self, subject: &Unit) -> String {
        match self {
            EventType::SpellCast(spell_cast) => {
                if let Some(victim) = &spell_cast.victim {
                    return format!(
                        "{},{},{},{},{}",
                        subject.deserialize(),
                        victim.deserialize(),
                        spell_cast.spell_id,
                        hit_mask_to_u32_vec(spell_cast.hit_mask.clone()),
                        school_mask_to_u8(spell_cast.school_mask.clone())
                    );
                }
                format!(
                    "{},null,{},{},{}",
                    subject.deserialize(),
                    spell_cast.spell_id,
                    hit_mask_to_u32_vec(spell_cast.hit_mask.clone()),
                    school_mask_to_u8(spell_cast.school_mask.clone())
                )
            },
            EventType::Death { murder } => {
                if let Some(murder) = murder {
                    return format!("{},{}", subject.deserialize(), murder.deserialize());
                }
                subject.deserialize()
            },
            EventType::CombatState { in_combat } => format!("{},{}", subject.deserialize(), in_combat),
            EventType::Loot { item_id, amount } => format!("{},{},{}", subject.deserialize(), item_id, amount),
            EventType::Position(position) => format!("{},{},{},{},{}", subject.deserialize(), position.x, position.y, position.z, position.orientation),
            EventType::Power(power) => format!("{},{},{},{}", subject.deserialize(), power.current_power, power.max_power, power.power_type.clone() as u8),
            EventType::AuraApplication(aura_app) => format!(
                "{},{},{},{},{}",
                subject.deserialize(),
                aura_app.caster.deserialize(),
                aura_app.spell_id,
                aura_app.stack_amount,
                school_mask_to_u8(aura_app.school_mask.clone())
            ),
            EventType::Interrupt { cause_event, interrupted_spell_id } => match &cause_event.event {
                EventType::SpellCast(spell_cast) => format!("{},{},{},{},{}", cause_event.id, cause_event.subject.deserialize(), subject.deserialize(), spell_cast.spell_id, interrupted_spell_id),
                EventType::AuraApplication(aura_app) => format!("{},{},{},{},{}", cause_event.id, aura_app.caster.deserialize(), subject.deserialize(), aura_app.spell_id, interrupted_spell_id),
                _ => unreachable!(),
            },
            EventType::SpellSteal { cause_event, target_event } => {
                if let EventType::SpellCast(spell_cast) = &cause_event.event {
                    if let EventType::AuraApplication(aura_app) = &target_event.event {
                        return format!(
                            "{},{},{},{},{},{}",
                            cause_event.id,
                            target_event.id,
                            cause_event.subject.deserialize(),
                            target_event.subject.deserialize(),
                            spell_cast.spell_id,
                            aura_app.spell_id
                        );
                    }
                    unreachable!()
                }
                unreachable!()
            },
            EventType::Dispel { cause_event, target_event } => match &cause_event.event {
                EventType::SpellCast(spell_cast) => {
                    if let EventType::AuraApplication(aura_app) = &target_event.event {
                        return format!(
                            "{},{},{},{},{},{}",
                            cause_event.id,
                            target_event.id,
                            cause_event.subject.deserialize(),
                            target_event.subject.deserialize(),
                            spell_cast.spell_id,
                            aura_app.spell_id
                        );
                    }
                    unreachable!()
                },
                EventType::AuraApplication(aura_app) => {
                    if let EventType::AuraApplication(inner_aura_app) = &target_event.event {
                        return format!(
                            "{},{},{},{},{},{}",
                            cause_event.id,
                            target_event.id,
                            aura_app.caster.deserialize(),
                            target_event.subject.deserialize(),
                            aura_app.spell_id,
                            inner_aura_app.spell_id
                        );
                    }
                    unreachable!()
                },
                _ => unreachable!(),
            },
            EventType::ThreatWipe => subject.deserialize(),
            EventType::Summon { summoned } => format!("{},{}", subject.deserialize(), summoned.deserialize()),
            EventType::MeleeDamage(damage) => format!("{},{},{},{}", subject.deserialize(), damage.victim.deserialize(), hit_mask_to_u32_vec(damage.hit_mask.clone()), damage.components.deserialize()),
            EventType::SpellDamage { spell_cause, damage } => match &spell_cause.event {
                EventType::SpellCast(spell_cast) => {
                    let mut hit_mask = HashSet::new();
                    damage.hit_mask.iter().for_each(|hit_type| {
                        hit_mask.insert(hit_type.clone());
                    });
                    spell_cast.hit_mask.iter().for_each(|hit_type| {
                        hit_mask.insert(hit_type.clone());
                    });
                    if hit_mask.contains(&HitType::Hit) && hit_mask.contains(&HitType::Crit) {
                        hit_mask.remove(&HitType::Hit);
                    }

                    format!(
                        "{},{},{},{},{},{}",
                        spell_cause.id,
                        spell_cause.subject.deserialize(),
                        damage.victim.deserialize(),
                        spell_cast.spell_id,
                        hit_mask_to_u32(hit_mask),
                        damage.components.deserialize()
                    )
                },
                EventType::AuraApplication(aura_app) => format!(
                    "{},{},{},{},{},{}",
                    spell_cause.id,
                    aura_app.caster.deserialize(),
                    damage.victim.deserialize(),
                    aura_app.spell_id,
                    hit_mask_to_u32_vec(damage.hit_mask.clone()),
                    damage.components.deserialize()
                ),
                _ => unreachable!(),
            },
            // TODO: Only emit absorb
            EventType::Heal { spell_cause, heal } => match &spell_cause.event {
                EventType::SpellCast(spell_cast) => {
                    let mut hit_mask = HashSet::new();
                    heal.hit_mask.iter().for_each(|hit_type| {
                        hit_mask.insert(hit_type.clone());
                    });
                    spell_cast.hit_mask.iter().for_each(|hit_type| {
                        hit_mask.insert(hit_type.clone());
                    });
                    if hit_mask.contains(&HitType::Hit) && hit_mask.contains(&HitType::Crit) {
                        hit_mask.remove(&HitType::Hit);
                    }

                    format!(
                        "{},{},{},{},{},{},{},{},{}",
                        spell_cause.id,
                        spell_cause.subject.deserialize(),
                        heal.target.deserialize(),
                        spell_cast.spell_id,
                        hit_mask_to_u32(hit_mask),
                        school_mask_to_u8(spell_cast.school_mask.clone()),
                        heal.total,
                        heal.effective,
                        heal.mitigation.deserialize()
                    )
                },
                EventType::AuraApplication(aura_app) => format!(
                    "{},{},{},{},{},{},{},{},{}",
                    spell_cause.id,
                    aura_app.caster.deserialize(),
                    heal.target.deserialize(),
                    aura_app.spell_id,
                    hit_mask_to_u32_vec(heal.hit_mask.clone()),
                    school_mask_to_u8(aura_app.school_mask.clone()),
                    heal.total,
                    heal.effective,
                    heal.mitigation.deserialize()
                ),
                _ => unreachable!(),
            },
            EventType::Threat { cause_event, threat } => {
                let (spell_id, hit_mask, school_mask) = match &cause_event.event {
                    EventType::SpellCast(spell_cast) => (spell_cast.spell_id, hit_mask_to_u32_vec(spell_cast.hit_mask.clone()), school_mask_to_u8(spell_cast.school_mask.clone())),
                    EventType::SpellDamage { spell_cause, .. } | EventType::Heal { spell_cause, .. } => match &spell_cause.event {
                        EventType::SpellCast(spell_cast) => (spell_cast.spell_id, hit_mask_to_u32_vec(spell_cast.hit_mask.clone()), school_mask_to_u8(spell_cast.school_mask.clone())),
                        EventType::AuraApplication(aura_app) => (aura_app.spell_id, HitType::Hit as u32, school_mask_to_u8(aura_app.school_mask.clone())),
                        _ => unreachable!(),
                    },
                    EventType::MeleeDamage(Damage { hit_mask, components, .. }) => {
                        let schools = components.iter().fold(Vec::new(), |mut acc, component| {
                            acc.append(&mut component.school_mask.clone());
                            acc
                        });
                        (0, hit_mask_to_u32_vec(hit_mask.clone()), school_mask_to_u8(schools))
                    },
                    _ => unreachable!(),
                };
                format!("{},{},{},{},{},{},{}", cause_event.id, subject.deserialize(), threat.threatened.deserialize(), spell_id, hit_mask, school_mask, threat.amount)
            },
            EventType::PlaceHolder => "?!?".to_owned(),
        }
    }
}
