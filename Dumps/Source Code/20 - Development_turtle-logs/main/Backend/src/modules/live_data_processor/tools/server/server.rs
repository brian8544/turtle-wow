#![allow(clippy::comparison_chain)]

use std::collections::{BTreeSet, VecDeque};

use chrono::{Datelike, NaiveDateTime, Timelike};
use chrono::Duration;

use time_util::now;

use crate::modules::armory::Armory;
use crate::modules::armory::tools::GetArenaTeam;
use crate::modules::data::Data;
use crate::modules::data::tools::RetrieveSpell;
use crate::modules::live_data_processor::{domain_value, dto};
use crate::modules::live_data_processor::domain_value::{AuraApplication, Event, EventParseFailureAction, EventType, hit_mask_from_u32, Mitigation, Position, Power, PowerType, School, school_mask_from_u8, SpellComponent, Unit, UnitInstance};
use crate::modules::live_data_processor::dto::{CombatState, Death, get_damage_components_total, Loot, Summon};
use crate::modules::live_data_processor::dto::{LiveDataProcessorFailure, Message, MessageType};
use crate::modules::live_data_processor::material::Server;
use crate::modules::live_data_processor::tools::MapUnit;
use crate::modules::live_data_processor::tools::server::{try_parse_dispel, try_parse_interrupt, try_parse_spell_steal};
use crate::params;
use crate::util::database::{Execute, Select};

impl Server {
    pub fn parse_events(&mut self, db_main: &mut (impl Select + Execute), armory: &Armory, data: &Data, messages: Vec<Message>, member_id: u32, upload_id: u32) -> Result<(), LiveDataProcessorFailure> {
        println!("Start");
        if messages.is_empty() {
            return Ok(());
        }

        let last_ts = messages.last().unwrap().timestamp;
        for msg in messages {
            self.extract_meta_information(db_main, armory, &msg, member_id, upload_id);
            self.test_for_committable_events(db_main, data, armory, member_id);
            self.cleanup(msg.timestamp);
            self.push_non_committed_event(msg);
        }
        self.test_for_committable_events(db_main, data, armory, member_id);
        self.cleanup(last_ts);
        self.reset_instances(db_main, last_ts);
        self.perform_post_processing(db_main, data);
        println!("Done");
        Ok(())
    }

    fn push_non_committed_event(&mut self, message: Message) {
        if let Some(unit_dto) = message.message_type.extract_subject() {
            let non_committed_events = self.non_committed_events.entry(unit_dto.unit_id).or_insert_with(|| VecDeque::with_capacity(1));
            if self.subject_prepend_mode_set.contains(&unit_dto.unit_id) {
                non_committed_events.push_front(message);
                self.subject_prepend_mode_set.remove(&unit_dto.unit_id);
            } else {
                non_committed_events.push_back(message);
            }
        }
    }

    fn test_for_committable_events(&mut self, db_main: &mut (impl Select + Execute), data: &Data, armory: &Armory, member_id: u32) {
        let mut remove_first_non_committed_event = Vec::new();
        for (subject_id, first_message) in self.non_committed_events.iter().map(|(subject_id, nce)| (*subject_id, nce.front().unwrap().clone())).collect::<Vec<(u64, Message)>>() {
            if let Some(unit_instance_id) = self.unit_instance_id.get(&subject_id).cloned() {
                match self.commit_event(db_main, data, armory, first_message, member_id) {
                    Ok(mut committable_event) => {
                        // For all except Spell we want to only remove the first event
                        remove_first_non_committed_event.push(subject_id);

                        let committed_event_count = self.committed_events_count.entry((unit_instance_id, member_id)).or_insert(1);
                        committable_event.id = *committed_event_count;
                        *committed_event_count += 1;

                        match &committable_event.event {
                            EventType::SpellCast(_spell_cast) => {
                                // if !spell_cast.hit_mask.contains(&domain_value::HitType::Miss) && !spell_cast.hit_mask.contains(&domain_value::HitType::FullResist) {
                                self.recently_committed_spell_cast_and_aura_applications
                                    .entry((unit_instance_id, member_id))
                                    .or_insert_with(|| VecDeque::with_capacity(1))
                                    .push_back(committable_event.clone())
                                // }
                            }
                            EventType::AuraApplication(_) => self
                                .recently_committed_spell_cast_and_aura_applications
                                .entry((unit_instance_id, member_id))
                                .or_insert_with(|| VecDeque::with_capacity(1))
                                .push_back(committable_event.clone()),
                            _ => {}
                        };

                        self.committed_events.entry((unit_instance_id, member_id)).or_insert_with(|| VecDeque::with_capacity(1)).push_back(committable_event);
                    }
                    Err(EventParseFailureAction::DiscardFirst) => {
                        remove_first_non_committed_event.push(subject_id);
                    }
                    Err(EventParseFailureAction::PrependNext) => {
                        self.subject_prepend_mode_set.insert(subject_id);
                    }
                    Err(EventParseFailureAction::Wait) => {}
                };
            } else {
                remove_first_non_committed_event.push(subject_id);
            }
        }

        for subject_id in remove_first_non_committed_event {
            self.non_committed_events.get_mut(&subject_id).expect("subject id should exist").pop_front();
            self.subject_prepend_mode_set.remove(&subject_id);
            if self.non_committed_events.get(&subject_id).expect("subject id should exist").is_empty() {
                self.non_committed_events.remove(&subject_id);
            }
        }
    }

    fn cleanup(&mut self, current_timestamp: u64) {
        for subject_id in self
            .non_committed_events
            .iter()
            .filter(|(_subject_id, event)| event.front().expect("Should be initialized with at least one element").timestamp + 100 < current_timestamp)
            .map(|(subject_id, _event)| *subject_id)
            .collect::<Vec<u64>>()
        {
            // TODO: Why do I find more events if this offset is low?
            // TODO: WTF am I doing here?
            self.non_committed_events.remove(&subject_id);
        }

        // Keep these events up to 90 seconds
        for (_instance_id, events) in self.recently_committed_spell_cast_and_aura_applications.iter_mut() {
            loop {
                let mut remove = false;
                if let Some(front) = events.front() {
                    remove = front.timestamp + 5000 < current_timestamp; // TODO: Currently we dont do live processing, hence this window can be smaller
                }
                if remove {
                    events.pop_front();
                } else {
                    break;
                }
            }
        }
    }

    // So based on the next event for the current users in the system
    // we are going to decide whether or not to commit it.
    fn commit_event(&mut self, db_main: &mut (impl Select + Execute), data: &Data, armory: &Armory, first_message: Message, member_id: u32) -> Result<Event, EventParseFailureAction> {
        match first_message.message_type {
            // Events that are just of size 1
            MessageType::CombatState(CombatState { unit: unit_dto, in_combat }) => {
                let subject = unit_dto.to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons).map_err(|_| EventParseFailureAction::DiscardFirst);
                Ok(Event::new(first_message.message_count, first_message.timestamp, subject?, EventType::CombatState { in_combat }))
            }
            MessageType::Loot(Loot { unit: unit_dto, item_id, count }) => Ok(Event::new(
                first_message.message_count,
                first_message.timestamp,
                unit_dto
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?,
                EventType::Loot { item_id, amount: count },
            )),
            MessageType::Position(position) => Ok(Event::new(
                first_message.message_count,
                first_message.timestamp,
                position
                    .unit
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?,
                EventType::Position(Position {
                    x: position.x,
                    y: position.y,
                    z: position.z,
                    orientation: position.orientation,
                }),
            )),
            MessageType::Power(power) => Ok(Event::new(
                first_message.message_count,
                first_message.timestamp,
                power
                    .unit
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?,
                EventType::Power(Power {
                    power_type: PowerType::from_u8(power.power_type).ok_or(EventParseFailureAction::DiscardFirst)?,
                    max_power: power.max_power,
                    current_power: power.current_power,
                }),
            )),
            MessageType::AuraApplication(aura_application) => Ok(Event::new(
                first_message.message_count,
                first_message.timestamp,
                aura_application
                    .target
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?,
                EventType::AuraApplication(AuraApplication {
                    caster: aura_application
                        .caster
                        .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                        .map_err(|_| EventParseFailureAction::DiscardFirst)?,
                    stack_amount: aura_application.stack_amount,
                    spell_id: aura_application.spell_id,
                    school_mask: data
                        .get_spell(self.expansion_id, aura_application.spell_id)
                        .map(|spell| school_mask_from_u8(spell.school_mask as u8))
                        .unwrap_or_else(|| vec![School::Physical]),
                }),
            )),
            MessageType::Death(Death { cause, victim }) => Ok(Event::new(
                first_message.message_count,
                first_message.timestamp,
                victim.to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons).map_err(|_| EventParseFailureAction::DiscardFirst)?,
                EventType::Death {
                    murder: cause.as_ref().and_then(|cause| cause.to_unit_add_implicit(&mut self.cache_unit, db_main, &armory, self.server_id, &self.summons).ok()),
                },
            )),
            MessageType::Event(event_dto) => {
                if event_dto.event_type == 0 {
                    if let Ok(creature @ domain_value::Unit::Creature(_)) = event_dto.unit.to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons) {
                        // TODO: Is the creature really the unit that we want to return here?
                        return Ok(Event::new(first_message.message_count, first_message.timestamp, creature, EventType::ThreatWipe));
                    }
                }
                Err(EventParseFailureAction::DiscardFirst)
            }
            MessageType::Summon(summon) => {
                let summoner = summon
                    .owner
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                let summoned = summon
                    .unit
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                Ok(Event::new(first_message.message_count, first_message.timestamp, summoner, EventType::Summon { summoned }))
            }
            MessageType::SpellCast(spell_cast) => {
                let subject = spell_cast
                    .caster
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                Ok(Event::new(
                    first_message.message_count,
                    first_message.timestamp,
                    subject,
                    EventType::SpellCast(domain_value::SpellCast {
                        victim: spell_cast.target.as_ref().and_then(|victim| victim.to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons).ok()),
                        hit_mask: hit_mask_from_u32(spell_cast.hit_mask),
                        spell_id: spell_cast.spell_id,
                        school_mask: data
                            .get_spell(self.expansion_id, spell_cast.spell_id)
                            .map(|spell| school_mask_from_u8(spell.school_mask as u8))
                            .unwrap_or_else(|| vec![School::Physical]),
                    }),
                ))
            }
            MessageType::MeleeDamage(melee_damage) => {
                let subject = melee_damage
                    .attacker
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                let victim = melee_damage
                    .victim
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                let total_damage = get_damage_components_total(&melee_damage.damage_components) as f64;
                Ok(Event::new(
                    first_message.message_count,
                    first_message.timestamp,
                    subject,
                    EventType::MeleeDamage(domain_value::Damage {
                        components: melee_damage
                            .damage_components
                            .iter()
                            .map(|dmg_comp| SpellComponent {
                                school_mask: school_mask_from_u8(dmg_comp.school_mask),
                                amount: dmg_comp.damage,
                                mitigation: {
                                    let mut mitigation = Vec::with_capacity(3);
                                    let weighted_blocked_amount = ((melee_damage.blocked as f64) * ((dmg_comp.damage as f64) / total_damage)) as u32;
                                    if weighted_blocked_amount > 0 {
                                        mitigation.push(Mitigation::Block(weighted_blocked_amount));
                                    }
                                    if dmg_comp.absorbed > 0 {
                                        mitigation.push(Mitigation::Absorb(dmg_comp.absorbed));
                                    }
                                    if dmg_comp.resisted_or_glanced > 0 {
                                        mitigation.push(Mitigation::Glance(dmg_comp.resisted_or_glanced));
                                    }
                                    mitigation
                                },
                            })
                            .collect(),
                        victim,
                        hit_mask: hit_mask_from_u32(melee_damage.hit_mask),
                    }),
                ))
            }
            MessageType::SpellDamage(spell_damage) => {
                let subject = spell_damage
                    .attacker
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                let victim = spell_damage
                    .victim
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                let spell_cause = self.find_matching_spell_cause(
                    spell_damage.spell_id.unwrap(),
                    spell_damage.attacker.unit_id,
                    &subject,
                    &victim,
                    first_message.message_count,
                    Some(spell_damage.damage_over_time),
                    member_id,
                )?;

                let total_damage = get_damage_components_total(&spell_damage.damage_components) as f64;
                Ok(Event::new(
                    first_message.message_count,
                    first_message.timestamp,
                    subject,
                    EventType::SpellDamage {
                        spell_cause: Box::new(spell_cause),
                        damage: domain_value::Damage {
                            components: spell_damage
                                .damage_components
                                .iter()
                                .map(|dmg_comp| SpellComponent {
                                    school_mask: school_mask_from_u8(dmg_comp.school_mask),
                                    amount: dmg_comp.damage,
                                    mitigation: {
                                        let mut mitigation = Vec::with_capacity(3);
                                        let weighted_blocked_amount = ((spell_damage.blocked as f64) * ((dmg_comp.damage as f64) / total_damage)) as u32;
                                        if weighted_blocked_amount > 0 {
                                            mitigation.push(Mitigation::Block(weighted_blocked_amount));
                                        }
                                        if dmg_comp.absorbed > 0 {
                                            mitigation.push(Mitigation::Absorb(dmg_comp.absorbed));
                                        }
                                        if dmg_comp.resisted_or_glanced > 0 {
                                            mitigation.push(Mitigation::Resist(dmg_comp.resisted_or_glanced));
                                        }
                                        mitigation
                                    },
                                })
                                .collect(),
                            victim,
                            hit_mask: hit_mask_from_u32(spell_damage.hit_mask),
                        },
                    },
                ))
            }
            MessageType::Heal(heal_done) => {
                let subject = heal_done
                    .caster
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                let target = heal_done
                    .target
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                let spell_cause = self.find_matching_spell_cause(heal_done.spell_id, heal_done.caster.unit_id, &subject, &target, first_message.message_count, None, member_id)?;
                Ok(Event::new(
                    first_message.message_count,
                    first_message.timestamp,
                    subject,
                    EventType::Heal {
                        spell_cause: Box::new(spell_cause),
                        heal: domain_value::Heal {
                            total: heal_done.total_heal,
                            effective: heal_done.effective_heal,
                            mitigation: if heal_done.absorb > 0 { vec![Mitigation::Absorb(heal_done.absorb)] } else { Vec::new() },
                            target,
                            hit_mask: hit_mask_from_u32(heal_done.hit_mask),
                        },
                    },
                ))
            }
            // A SpellCast, Damage done and heal done can cause threat
            // Note: That the threatened unit can be a third unit in the case of a beneficial spell
            MessageType::Threat(threat) => {
                let subject = threat
                    .threater
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                let threatened = threat
                    .threatened
                    .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                    .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                let cause_event = self.find_matching_threat_cause(threat.spell_id, threat.threater.unit_id, &subject, &threatened, member_id)?;
                Ok(Event::new(
                    first_message.message_count,
                    first_message.timestamp,
                    subject,
                    EventType::Threat {
                        cause_event: Box::new(cause_event),
                        threat: domain_value::Threat { threatened, amount: threat.amount },
                    },
                ))
            }
            // Find Event that caused this interrupt, else wait or discard
            MessageType::Interrupt(interrupt) => {
                // If we dont find any committable events for this interrupt, we need to discard
                if let Some(unit_instance_id) = self.unit_instance_id.get(&interrupt.target.unit_id) {
                    if let Some(committed_events) = self.recently_committed_spell_cast_and_aura_applications.get(&(*unit_instance_id, member_id)) {
                        let subject = interrupt
                            .target
                            .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                            .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                        return match try_parse_interrupt(committed_events, &subject) {
                            Ok(cause_event) => Ok(Event::new(
                                first_message.message_count,
                                first_message.timestamp,
                                subject,
                                EventType::Interrupt {
                                    cause_event: Box::new(cause_event),
                                    interrupted_spell_id: interrupt.interrupted_spell_id,
                                },
                            )),
                            Err(err) => Err(err),
                        };
                    }
                }
                Err(EventParseFailureAction::PrependNext)
            }
            // Find Event that caused this dispel, else wait or discard
            MessageType::Dispel(dispel) => {
                // If we dont find any committable events for this interrupt, we need to discard
                if let Some(unit_instance_id) = self.unit_instance_id.get(&dispel.un_aura_caster.unit_id) {
                    if let Some(committed_events) = self.recently_committed_spell_cast_and_aura_applications.get(&(*unit_instance_id, member_id)) {
                        let subject = dispel
                            .un_aura_caster
                            .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                            .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                        return match try_parse_dispel(db_main, &dispel, committed_events, armory, self.server_id, &self.summons, &mut self.cache_unit) {
                            Ok((cause_event, target_event)) => Ok(Event::new(
                                first_message.message_count,
                                first_message.timestamp,
                                subject,
                                EventType::Dispel {
                                    cause_event: Box::new(cause_event),
                                    target_event: Box::new(target_event),
                                },
                            )),
                            Err(err) => Err(err),
                        };
                    }
                }
                Err(EventParseFailureAction::PrependNext)
            }
            // Find Event that caused this spell steal, else wait or discard
            MessageType::SpellSteal(spell_steal) => {
                // If we dont find any committable events for this interrupt, we need to discard
                if let Some(unit_instance_id) = self.unit_instance_id.get(&spell_steal.un_aura_caster.unit_id) {
                    if let Some(committed_events) = self.recently_committed_spell_cast_and_aura_applications.get(&(*unit_instance_id, member_id)) {
                        let subject = spell_steal
                            .un_aura_caster
                            .to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons)
                            .map_err(|_| EventParseFailureAction::DiscardFirst)?;
                        return match try_parse_spell_steal(db_main, &spell_steal, committed_events, first_message.timestamp, armory, self.server_id, &self.summons, &mut self.cache_unit) {
                            Ok((cause_event, target_event)) => Ok(Event::new(
                                first_message.message_count,
                                first_message.timestamp,
                                subject,
                                EventType::SpellSteal {
                                    cause_event: Box::new(cause_event),
                                    target_event: Box::new(target_event),
                                },
                            )),
                            Err(err) => Err(err),
                        };
                    }
                }
                Err(EventParseFailureAction::PrependNext)
            }
            _ => Err(EventParseFailureAction::DiscardFirst),
        }
    }

    fn extract_meta_information(&mut self, db_main: &mut (impl Select + Execute), armory: &Armory, message: &Message, member_id: u32, upload_id: u32) {
        match &message.message_type {
            MessageType::Summon(Summon { owner, unit }) => {
                let summoner = owner.to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons);
                if let Ok(summoner_unit) = summoner {
                    self.summons.insert(unit.unit_id, summoner_unit);
                }
            }
            MessageType::InstanceMap(dto::InstanceMap { map_id, instance_id, map_difficulty, unit }) => {
                if unit.unit_id == 1 && !unit.is_player {
                    return;
                }

                // These are raids
                if let 249 | 309 | 409 | 469 | 509 | 531 | 532 | 533 | 534 | 544 | 548 | 550 | 564 | 565 | 568 | 580 | 603 | 615 | 616 | 624 | 631 | 649 | 724 = *map_id {
                    if let Some(instance_meta_id) = self.create_instance_meta(db_main, message.timestamp, *instance_id, *map_id, member_id, upload_id) {
                        // Vanilla does usually not set difficulty for raids correctly
                        // Nor does TBC
                        let map_difficulty = match *map_id {
                            // Onyxias Liar is an instance in WotLK and Vanilla
                            249 => {
                                if self.expansion_id > 2 {
                                    *map_difficulty
                                } else {
                                    9
                                }
                            }
                            409 | 469 => 9,                               // 40 man
                            309 | 509 | 531 => 148,                       // 20 man
                            532 | 568 => 3,                               // 10 man
                            534 | 544 | 548 | 550 | 564 | 580 | 565 => 4, // 25 man
                            533 => {
                                if *map_difficulty == 3 || *map_difficulty == 4 {
                                    *map_difficulty
                                } else {
                                    9
                                }
                            } // Naxx
                            _ => *map_difficulty,
                        };

                        db_main.execute_wparams(
                            "INSERT INTO instance_raid (`instance_meta_id`, `map_difficulty`) VALUES (:instance_meta_id, :map_difficulty)",
                            params!("instance_meta_id" => instance_meta_id, "map_difficulty" => map_difficulty),
                        );
                    }

                    self.unit_instance_id.insert(unit.unit_id, *instance_id);
                    self.unit_instance_id.insert(0, *instance_id);
                } else {
                    self.unit_instance_id.remove(&unit.unit_id);
                }

                // Insert participants
                if let Some(UnitInstance { instance_meta_id, .. }) = self.active_instances.get(&(*instance_id, member_id)) {
                    if !self.instance_participants.contains_key(instance_meta_id) {
                        self.instance_participants.insert(*instance_meta_id, BTreeSet::new());
                    }
                    if let Ok(domain_value::Unit::Player(player)) = unit.to_unit_add_implicit(&mut self.cache_unit, db_main, armory, self.server_id, &self.summons) {
                        let participants = self.instance_participants.get_mut(instance_meta_id).unwrap();
                        if !participants.contains(&player.character_id)
                            && db_main.execute_wparams(
                            "INSERT INTO instance_participants (`instance_meta_id`, `character_id`) VALUES (:instance_meta_id, :character_id)",
                            params!("instance_meta_id" => instance_meta_id, "character_id" => player.character_id),
                        )
                        {
                            participants.insert(player.character_id);
                        }
                    }
                }
            }
            MessageType::InstancePvPStartUnratedArena(dto::InstanceStart { map_id, instance_id }) => {
                if let Some(instance_meta_id) = self.create_instance_meta(db_main, message.timestamp, *instance_id, *map_id, member_id, upload_id) {
                    db_main.execute_wparams("INSERT INTO instance_skirmish (`instance_meta_id`) VALUES (:instance_meta_id)", params!("instance_meta_id" => instance_meta_id));
                }
            }
            MessageType::InstancePvPStartRatedArena(dto::InstanceStartRatedArena { map_id, instance_id, team_id1, team_id2 }) => {
                if let Some(instance_meta_id) = self.create_instance_meta(db_main, message.timestamp, *instance_id, *map_id, member_id, upload_id) {
                    if let Some(team1) = armory.get_arena_team_by_uid(db_main, self.server_id, *team_id1) {
                        if let Some(team2) = armory.get_arena_team_by_uid(db_main, self.server_id, *team_id2) {
                            db_main.execute_wparams(
                                "INSERT INTO instance_rated_arena (`instance_meta_id`, `team_id1`, `team_id2`) VALUES (:instance_meta_id, :team_id1, :team_id2)",
                                params!(
                                "instance_meta_id" => instance_meta_id,
                                "team_id1" => team1.id,
                                "team_id2" => team2.id
                                ),
                            );
                        }
                    }
                }
            }
            MessageType::InstancePvPStartBattleground(dto::InstanceStart { map_id, instance_id }) => {
                if let Some(instance_meta_id) = self.create_instance_meta(db_main, message.timestamp, *instance_id, *map_id, member_id, upload_id) {
                    db_main.execute_wparams("INSERT INTO instance_battleground (`instance_meta_id`) VALUES (:instance_meta_id)", params!("instance_meta_id" => instance_meta_id));
                }
            }
            MessageType::InstancePvPEndBattleground(dto::InstanceBattleground {
                                                        instance_id,
                                                        winner,
                                                        score_alliance,
                                                        score_horde,
                                                        ..
                                                    }) => {
                if let Some(UnitInstance { instance_meta_id, .. }) = self.active_instances.get(&(*instance_id, member_id)).cloned() {
                    self.finalize_instance_meta(db_main, message.timestamp, instance_meta_id);
                    db_main.execute_wparams(
                        "UPDATE instance_battleground SET `winner`=:winner, `score_alliance`=:score_alliance, `score_horde`=:score_horde WHERE instance_meta_id=:instance_meta_id",
                        params!(
                            "instance_meta_id" => instance_meta_id,
                            "winner" => *winner,
                            "score_alliance" => *score_alliance,
                            "score_horde" => *score_horde
                        ),
                    );
                }
            }
            MessageType::InstancePvPEndRatedArena(dto::InstanceArena {
                                                      instance_id,
                                                      winner,
                                                      team_change1,
                                                      team_change2,
                                                      ..
                                                  }) => {
                if let Some(UnitInstance { instance_meta_id, .. }) = self.active_instances.get(&(*instance_id, member_id)).cloned() {
                    self.finalize_instance_meta(db_main, message.timestamp, instance_meta_id);
                    db_main.execute_wparams(
                        "UPDATE instance_rated_arena SET `winner`=:winner, `team_change1`=:team_change1, `team_change2`=:team_change2 WHERE instance_meta_id=:instance_meta_id",
                        params!(
                            "instance_meta_id" => instance_meta_id,
                            "winner" => *winner,
                            "team_change1" => *team_change1,
                            "team_change2" => *team_change2
                        ),
                    );
                }
            }
            MessageType::InstancePvPEndUnratedArena(dto::InstanceUnratedArena { instance_id, winner, .. }) => {
                if let Some(UnitInstance { instance_meta_id, .. }) = self.active_instances.get(&(*instance_id, member_id)).cloned() {
                    self.finalize_instance_meta(db_main, message.timestamp, instance_meta_id);
                    db_main.execute_wparams(
                        "UPDATE instance_skirmish `winner`=:winner WHERE instance_meta_id=:instance_meta_id",
                        params!(
                            "instance_meta_id" => instance_meta_id,
                            "winner" => *winner
                        ),
                    );
                }
            }
            MessageType::InstanceDelete { instance_id } => {
                if let Some(UnitInstance { instance_meta_id, .. }) = self.active_instances.get(&(*instance_id, member_id)).cloned() {
                    self.finalize_instance_meta(db_main, message.timestamp, instance_meta_id);
                }
            }
            _ => {}
        }
    }

    fn create_instance_meta(&mut self, db_main: &mut (impl Execute + Select), start_ts: u64, instance_id: u32, map_id: u32, member_id: u32, upload_id: u32) -> Option<u32> {
        if !self.active_instances.contains_key(&(instance_id, member_id)) {
            let default_privacy_type = db_main.select_wparams_value("SELECT default_privacy_type FROM `account_member` WHERE id=:member_id",
                                                                    |mut row| row.take::<u8, usize>(0), params!("member_id" => member_id)).unwrap();

            // Maybe sanity check, if active instance already exists, before?
            if db_main.execute_wparams(
                "INSERT INTO instance_meta (`server_id`, `start_ts`, `instance_id`, `map_id`, `upload_id`, `privacy_type`) VALUES (:server_id, :start_ts, :instance_id, :map_id, :upload_id, :privacy_type)",
                params!(
                "server_id" => self.server_id,
                "start_ts" => start_ts,
                "instance_id" => instance_id,
                "map_id" => map_id as u16,
                "upload_id" => upload_id,
                "privacy_type" => default_privacy_type
                ),
            ) {
                let instance_meta_id = db_main
                    .select_wparams_value(
                        "SELECT id FROM instance_meta WHERE server_id=:server_id AND instance_id=:instance_id AND map_id=:map_id AND upload_id=:upload_id AND expired IS NULL",
                        |mut row| row.take::<u32, usize>(0).unwrap(),
                        params!(
                        "server_id" => self.server_id,
                        "instance_id" => instance_id,
                        "map_id" => map_id as u16,
                        "upload_id" => upload_id
                        ),
                    )
                    .expect("Should exist and DB shouldn't have gone away");

                self.active_instances.insert(
                    (instance_id, member_id),
                    UnitInstance {
                        instance_meta_id,
                        entered: start_ts,
                        map_id: map_id as u16,
                        instance_id,
                        uploaded_user: member_id,
                        ready_to_zip: false,
                        upload_id,
                    },
                );

                return Some(instance_meta_id);
            }
        }
        None
    }

    fn finalize_instance_meta(&mut self, db_main: &mut impl Execute, end_ts: u64, instance_meta_id: u32) {
        if db_main.execute_wparams(
            "UPDATE instance_meta SET end_ts=IF(end_ts IS NULL, :end_ts, end_ts), expired=:end_ts WHERE id=:instance_meta_id",
            params!(
                "end_ts" => end_ts,
                "instance_meta_id" => instance_meta_id
            ),
        ) {
            if let Some((_, active_instance)) = self.active_instances.iter_mut().find(|(_, instance)| instance.instance_meta_id == instance_meta_id) {
                active_instance.ready_to_zip = true;
            }
        }
    }

    pub fn reset_instances(&mut self, db_main: &mut impl Execute, current_ts: u64) {
        for (_, instance_meta_id) in self
            .active_instances
            .iter()
            .filter(|(_, active_instance)| {
                if let Some(instance_reset) = self.instance_resets.get(&active_instance.map_id) {
                    active_instance.entered < instance_reset.reset_time - 7 * 24 * 60 * 60 * 1000
                } else {
                    // By default we assume wednesday reset 6 AM
                    let mut reset_time = NaiveDateTime::from_timestamp(now() as i64, 0);
                    let day_from_mon = reset_time.weekday().num_days_from_monday();
                    if day_from_mon < 2 {
                        reset_time = reset_time.checked_add_signed(Duration::days(day_from_mon as i64)).unwrap();
                    } else if day_from_mon > 2 {
                        reset_time = reset_time.checked_add_signed(Duration::days((9 - day_from_mon) as i64)).unwrap();
                    }
                    reset_time = reset_time.checked_sub_signed(Duration::days(7)).unwrap();
                    let reset_time = reset_time.with_hour(6).expect("Should be valid").timestamp_millis() as u64;
                    active_instance.entered < reset_time
                }
            })
            .map(|(instance_id, unit_instance)| (*instance_id, unit_instance.instance_meta_id))
            .collect::<Vec<((u32, u32), u32)>>()
        {
            self.finalize_instance_meta(db_main, current_ts, instance_meta_id);
        }
    }

    fn find_matching_spell_cause(&self, spell_id: u32, subject_unit_id: u64, subject: &Unit, victim: &Unit, _message_count: u64, is_dot: Option<bool>, member_id: u32) -> Result<Event, EventParseFailureAction> {
        if let Some(unit_instance_id) = self.unit_instance_id.get(&subject_unit_id) {
            if let Some(committed_events) = self.recently_committed_spell_cast_and_aura_applications.get(&(*unit_instance_id, member_id)) {
                if let Some(event_index) = committed_events.iter().rposition(|event| match &event.event {
                    EventType::SpellCast(spell_cast) => {
                        (is_dot.is_none() || is_dot.contains(&false)) && spell_cast.spell_id == spell_id && event.subject == *subject && (spell_cast.victim.is_none() || spell_cast.victim.contains(subject) || spell_cast.victim.contains(victim))
                    }
                    EventType::AuraApplication(aura_application) => (is_dot.is_none() || is_dot.contains(&true)) && aura_application.spell_id == spell_id && event.subject == *victim && aura_application.caster == *subject,
                    _ => false,
                }) {
                    return Ok(committed_events.get(event_index).unwrap().clone());
                }
            }
        }
        Err(EventParseFailureAction::PrependNext)
    }

    // If the spell_id is some, then it must be a SpellCast, SpellDamage or Heal Done
    // Else its a melee_damage event and the threatened must be the victim
    fn find_matching_threat_cause(&self, spell_id: Option<u32>, subject_unit_id: u64, subject: &Unit, threatened: &Unit, member_id: u32) -> Result<Event, EventParseFailureAction> {
        if let Some(unit_instance_id) = self.unit_instance_id.get(&subject_unit_id) {
            if let Some(committed_events) = self.committed_events.get(&(*unit_instance_id, member_id)) {
                if let Some(event_index) = committed_events.iter().rposition(|event| {
                    if let Some(threatening_spell_id) = spell_id {
                        return event.subject == *subject
                            && match &event.event {
                            EventType::SpellCast(domain_value::SpellCast { spell_id, .. }) => *spell_id == threatening_spell_id,
                            EventType::SpellDamage {
                                spell_cause: box Event { id: spell_cause_id, .. },
                                ..
                            }
                            | EventType::Heal {
                                spell_cause: box Event { id: spell_cause_id, .. },
                                ..
                            } => {
                                if let Some(Event { event: EventType::SpellCast(spell_cast), .. }) = committed_events.iter().find(|inner_event| inner_event.id == *spell_cause_id) {
                                    spell_cast.spell_id == threatening_spell_id
                                } else {
                                    false
                                }
                            }
                            _ => false,
                        };
                    } else if let EventType::MeleeDamage(melee_damage) = &event.event {
                        return melee_damage.victim == *threatened && event.subject == *subject;
                    }
                    false
                }) {
                    return Ok(committed_events.get(event_index).unwrap().clone());
                }
            }
        }
        Err(EventParseFailureAction::PrependNext)
    }
}
