use std::collections::HashMap;

use chrono::NaiveDateTime;
use regex::Regex;

use crate::modules::armory::domain_value::GuildRank;
use crate::modules::armory::dto::{CharacterDto, CharacterGearDto, CharacterGuildDto, CharacterHistoryDto, CharacterInfoDto, CharacterItemDto, GuildDto};
use crate::modules::data::Data;
use crate::modules::data::tools::{RetrieveMap, RetrieveNPC};
use crate::modules::live_data_processor::domain_value::{HitType, School};
use crate::modules::live_data_processor::dto::{AuraApplication, DamageComponent, DamageDone, Death, HealDone, InstanceMap, Interrupt, Loot, Message, MessageType, SpellCast, Summon, UnAura, Unit};
use crate::modules::live_data_processor::material::{ActiveMapVec, Participant, WoWVanillaParser};
use crate::modules::live_data_processor::tools::cbl_parser::CombatLogParser;
use crate::modules::live_data_processor::tools::cbl_parser::wow_vanilla::hashed_unit_id::get_hashed_player_unit_id;
use crate::modules::live_data_processor::tools::cbl_parser::wow_vanilla::parse_spell_args::parse_spell_args;
use crate::modules::live_data_processor::tools::cbl_parser::wow_vanilla::parse_trailer::parse_trailer;
use crate::modules::live_data_processor::tools::cbl_parser::wow_vanilla::parse_unit::parse_unit;
use crate::modules::live_data_processor::tools::GUID;
use crate::modules::armory::tools::strip_talent_specialization;

/*

COMBATHITCRITOTHEROTHER = "%s crits %s for %d.";
COMBATHITCRITSCHOOLOTHEROTHER = "%s crits %s for %d %s damage.";
COMBATHITOTHEROTHER = "%s hits %s for %d.";
COMBATHITSCHOOLOTHEROTHER = "%s hits %s for %d %s damage.";
DAMAGESHIELDOTHEROTHER = "%s reflects %d %s damage to %s.";
HEALEDCRITOTHEROTHER = "%s's %s critically heals %s for %d.";
HEALEDOTHEROTHER = "%s's %s heals %s for %d.";
PERIODICAURADAMAGEOTHEROTHER = "%s suffers %d %s damage from %s's %s.";
PERIODICAURAHEALOTHEROTHER = "%s gains %d health from %s's %s.";
SPELLLOGCRITOTHEROTHER = "%s's %s crits %s for %d.";
SPELLLOGCRITSCHOOLOTHEROTHER = "%s's %s crits %s for %d %s damage.";
SPELLLOGOTHEROTHER = "%s's %s hits %s for %d.";
SPELLLOGSCHOOLOTHEROTHER = "%s's %s hits %s for %d %s damage.";
SPELLSPLITDAMAGEOTHEROTHER = "%s's %s causes %s %d damage."
AURAAPPLICATIONADDEDOTHERHARMFUL = "%s is afflicted by %s (%d).";
AURAAPPLICATIONADDEDOTHERHELPFUL = "%s gains %s (%d).";
AURAREMOVEDOTHER = "%s fades from %s.";
AURADISPELOTHER = "%s's %s is removed.";
AURASTOLENOTHEROTHER = "%s steals %s's %s.";
MISSEDOTHEROTHER = "%s misses %s.";
SPELLMISSOTHEROTHER = "%s's %s missed %s.";
VSBLOCKOTHEROTHER = "%s attacks. %s blocks.";
SPELLBLOCKEDOTHEROTHER = "%s's %s was blocked by %s.";
VSPARRYOTHEROTHER = "%s attacks. %s parries.";
SPELLPARRIEDOTHEROTHER = "%s's %s was parried by %s.";
SPELLINTERRUPTOTHEROTHER = "%s interrupts %s's %s.";
SPELLEVADEDOTHEROTHER = "%s's %s was evaded by %s.";
VSEVADEOTHEROTHER = "%s attacks. %s evades.";
VSABSORBOTHEROTHER = "%s attacks. %s absorbs all the damage.";
SPELLLOGABSORBOTHERSELF = player_name.." absorbs %s's %s."
SPELLLOGABSORBOTHEROTHER = "%s's %s is absorbed by %s.";
VSDODGEOTHEROTHER = "%s attacks. %s dodges.";
SPELLDODGEDOTHEROTHER = "%s's %s was dodged by %s.";
VSRESISTOTHEROTHER = "%s attacks. %s resists all the damage.";
SPELLRESISTOTHEROTHER = "%s's %s was resisted by %s.";
PROCRESISTOTHEROTHER = "%s resists %s's %s.";
SPELLREFLECTOTHEROTHER = "%s's %s is reflected back by %s.";
VSDEFLECTOTHEROTHER = "%s attacks. %s deflects.";
SPELLDEFLECTEDOTHEROTHER = "%s's %s was deflected by %s.";
VSIMMUNEOTHEROTHER = "%s attacks but %s is immune.";
SPELLIMMUNEOTHEROTHER = "%s's %s fails. %s is immune.";
UNITDIESOTHER = "%s dies.";
UNITDESTROYEDOTHER = "%s is destroyed.";
PARTYKILLOTHER = "%s is slain by %s!";
INSTAKILLOTHER = "%s is killed by %s.";
SPELLCASTGOOTHER = "%s casts %s.";
SIMPLECASTOTHEROTHER = "%s casts %s on %s.";
SPELLPERFORMGOOTHER = "%s performs %s.";
SPELLPERFORMGOOTHERTARGETTED = "%s performs %s on %s.";


// ?
SPELLPOWERDRAINOTHEROTHER
SPELLPOWERLEECHOTHEROTHER
VSENVIRONMENTALDAMAGE_DROWNING_OTHER
VSENVIRONMENTALDAMAGE_FALLING_OTHER
VSENVIRONMENTALDAMAGE_FATIGUE_OTHER
VSENVIRONMENTALDAMAGE_FIRE_OTHER
VSENVIRONMENTALDAMAGE_LAVA_OTHER
VSENVIRONMENTALDAMAGE_SLIME_OTHER
SPELLCASTOTHERSTART
SPELLPERFORMOTHERSTART

// Not supported yet
SPELLEXTRAATTACKSOTHER
SPELLEXTRAATTACKSOTHER_SINGULAR
SPELLHAPPINESSDRAINOTHER
POWERGAINOTHEROTHER

 */

impl CombatLogParser for WoWVanillaParser {
    fn parse_cbl_line(&mut self, data: &Data, event_ts: u64, content: &str) -> Option<Vec<MessageType>> {
        lazy_static! {
            static ref RE_DAMAGE_HIT_OR_CRIT: Regex = Regex::new(r"(.+[^\s]) (cr|h)its (.+[^\s]) for (\d+)\.\s?(.*)").unwrap();
            static ref RE_DAMAGE_HIT_OR_CRIT_SCHOOL: Regex = Regex::new(r"(.+[^\s]) (cr|h)its (.+[^\s]) for (\d+) ([a-zA-Z]+) damage\.\s?(.*)").unwrap();
            static ref RE_DAMAGE_MISS: Regex = Regex::new(r"(.+[^\s]) misses (.+[^\s])\.").unwrap();
            static ref RE_DAMAGE_BLOCK_PARRY_EVADE_DODGE_DEFLECT: Regex = Regex::new(r"(.+[^\s]) attacks\. (.+[^\s]) (blocks|parries|evades|dodges|deflects)\.").unwrap();
            static ref RE_DAMAGE_ABSORB_RESIST: Regex = Regex::new(r"(.+[^\s]) attacks\. (.+[^\s]) (absorbs|resists) all the damage\.").unwrap();
            static ref RE_DAMAGE_IMMUNE: Regex = Regex::new(r"(.+[^\s]) attacks but (.+[^\s]) is immune\.").unwrap();

            static ref RE_DAMAGE_SPELL_HIT_OR_CRIT: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) (cr|h)its (.+[^\s]) for (\d+)\.\s?(.*)").unwrap();
            static ref RE_DAMAGE_SPELL_HIT_OR_CRIT_SCHOOL: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) (cr|h)its (.+[^\s]) for (\d+) ([a-zA-Z]+) damage\.\s?(.*)").unwrap();
            static ref RE_DAMAGE_PERIODIC: Regex = Regex::new(r"(.+[^\s]) suffers (\d+) ([a-zA-Z]+) damage from (.+[^\s])\s's (.+[^\s])\.\s?(.*)").unwrap();
            static ref RE_DAMAGE_SPELL_SPLIT: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) causes (.+[^\s]) (\d+) damage\.\s?(.*)").unwrap();
            static ref RE_DAMAGE_SPELL_MISS: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) misse(s|d) (.+[^\s])\.").unwrap();
            static ref RE_DAMAGE_SPELL_BLOCK_PARRY_EVADE_DODGE_RESIST_DEFLECT: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) was (blocked|parried|evaded|dodged|resisted|deflected) by (.+[^\s])\.").unwrap();
            static ref RE_DAMAGE_SPELL_ABSORB: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) is absorbed by (.+[^\s])\.").unwrap();
            static ref RE_DAMAGE_SPELL_ABSORB_SELF: Regex = Regex::new(r"(.+[^\s]) absorbs (.+[^\s])\s's (.+[^\s])\.").unwrap();
            static ref RE_DAMAGE_REFLECT: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) is reflected back by (.+[^\s])\.").unwrap();
            static ref RE_DAMAGE_PROC_RESIST: Regex = Regex::new(r"(.+[^\s]) resists (.+[^\s])\s's (.+[^\s])\.").unwrap();
            static ref RE_DAMAGE_SPELL_IMMUNE: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) fails\. (.+[^\s]) is immune\.").unwrap();
            static ref RE_SPELL_CAST_ATTEMPT: Regex = Regex::new(r"(.+[^\s]) begins to cast (.+[^\s])\.").unwrap();

            static ref RE_DAMAGE_SHIELD: Regex = Regex::new(r"(.+[^\s]) reflects (\d+) ([a-zA-Z]+) damage to (.+[^\s])\.").unwrap(); // Ability?

            static ref RE_HEAL_HIT: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) heals (.+[^\s]) for (\d+)\.").unwrap();
            static ref RE_HEAL_CRIT: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) critically heals (.+[^\s]) for (\d+)\.").unwrap();
            static ref RE_GAIN: Regex = Regex::new(r"(.+[^\s]) gains (\d+) (Health|health|Mana|Rage|Energy|Happiness|Focus) from (.+[^\s])\s's (.+[^\s])\.").unwrap();

            // Somehow track the owner?
            static ref RE_AURA_GAIN_HARMFUL_HELPFUL: Regex = Regex::new(r"(.+[^\s]) (is afflicted by|gains) (.+[^\s]) \((\d+)\)\.").unwrap();
            static ref RE_AURA_FADE: Regex = Regex::new(r"(.+[^\s]) fades from (.+[^\s])\.").unwrap();

            // Find dispeller
            static ref RE_AURA_DISPEL: Regex = Regex::new(r"(.+[^\s])\s's (.+[^\s]) is removed\.").unwrap();
            static ref RE_AURA_INTERRUPT: Regex = Regex::new(r"(.+[^\s]) interrupts (.+[^\s])\s's (.+[^\s])\.").unwrap();

            static ref RE_SPELL_CAST_PERFORM_DURABILITY: Regex = Regex::new(r"(.+[^\s]) (casts|performs) (.+[^\s]) on (.+[^\s]): (.+)\.").unwrap();
            static ref RE_SPELL_CAST_PERFORM: Regex = Regex::new(r"(.+[^\s]) (casts|performs) (.+[^\s]) on (.+[^\s])\.").unwrap();
            static ref RE_SPELL_CAST_PERFORM_UNKNOWN: Regex = Regex::new(r"(.+[^\s]) (casts|performs) (.+[^\s])\.").unwrap();

            static ref RE_UNIT_DIE_DESTROYED: Regex = Regex::new(r"(.+[^\s]) (dies|is destroyed)\.").unwrap();
            static ref RE_UNIT_SLAY: Regex = Regex::new(r"(.+[^\s]) is slain by (.+[^\s])(!|\.)").unwrap();

            static ref RE_ZONE_INFO: Regex = Regex::new(r"ZONE_INFO: ([^&]+)&(.+[^\s])\&(\d+)").unwrap();
            static ref RE_LOOT: Regex = Regex::new(r"LOOT: ([^&]+)&(.+[^\s]) receives loot: \|c([a-zA-Z0-9]+)\|Hitem:(\d+):(\d+):(\d+):(\d+)\|h\[([a-zA-Z0-9\s']+)\]\|h\|rx(\d+)\.").unwrap();

            // Bugs?
            static ref RE_BUG_DAMAGE_SPELL_HIT_OR_CRIT: Regex = Regex::new(r"(.+[^\s])\s's (cr|h)its (.+[^\s]) for (\d+)\.\s?(.*)").unwrap();
        }

        if RE_BUG_DAMAGE_SPELL_HIT_OR_CRIT.captures(&content).is_some() {
            return None;
        }

        if let Some(captures) = RE_SPELL_CAST_ATTEMPT.captures(&content) {
            let caster = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;

            return Some(vec![MessageType::SpellCastAttempt(SpellCast {
                caster,
                target: None,
                spell_id,
                hit_mask: HitType::Hit as u32,
            })]);
        }

        if let Some(captures) = RE_GAIN.captures(&content) {
            if !captures.get(3)?.as_str().contains("ealth") {
                return None;
            }

            let target = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let amount = u32::from_str_radix(captures.get(2)?.as_str(), 10).ok()?;
            let caster = parse_unit(&mut self.cache_unit, data, captures.get(4)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(5)?.as_str())?;
            self.collect_participant(&caster, captures.get(4)?.as_str(), event_ts);
            self.collect_participant(&target, captures.get(1)?.as_str(), event_ts);
            self.collect_active_map(data, &caster, event_ts);
            self.collect_active_map(data, &target, event_ts);
            let effective_heal = self.participants.get_mut(&target.unit_id).unwrap().attribute_heal(amount);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: caster.clone(),
                    target: Some(target.clone()),
                    spell_id,
                    hit_mask: HitType::Hit as u32,
                }),
                MessageType::Heal(HealDone {
                    caster,
                    target,
                    spell_id,
                    total_heal: amount,
                    effective_heal,
                    absorb: 0,
                    hit_mask: HitType::Hit as u32,
                }),
            ]);
        }

        /*
         * Spell Damage
         */
        if let Some(captures) = RE_DAMAGE_SPELL_HIT_OR_CRIT.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            let mut hit_mask = if captures.get(3)?.as_str() == "cr" { HitType::Crit as u32 } else { HitType::Hit as u32 };
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(4)?.as_str())?;
            let damage = u32::from_str_radix(captures.get(5)?.as_str(), 10).ok()?;
            let trailer = parse_trailer(captures.get(6)?.as_str());
            trailer.iter().for_each(|(_, hit_type)| hit_mask |= hit_type.clone() as u32);
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(4)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);
            self.participants.get_mut(&victim.unit_id).unwrap().attribute_damage(damage);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask,
                    blocked: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialBlock).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                    damage_over_time: false,
                    damage_components: vec![DamageComponent {
                        school_mask: School::Physical as u8,
                        damage,
                        resisted_or_glanced: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialResist).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                        absorbed: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialAbsorb).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                    }],
                }),
            ]);
        }

        if let Some(captures) = RE_DAMAGE_SPELL_HIT_OR_CRIT_SCHOOL.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            let mut hit_mask = if captures.get(3)?.as_str() == "cr" { HitType::Crit as u32 } else { HitType::Hit as u32 };
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(4)?.as_str())?;
            let damage = u32::from_str_radix(captures.get(5)?.as_str(), 10).ok()?;
            let school = match captures.get(6)?.as_str() {
                "Physical" => School::Physical,
                "Arcane" => School::Arcane,
                "Fire" => School::Fire,
                "Frost" => School::Frost,
                "Shadow" => School::Shadow,
                "Nature" => School::Nature,
                "Holy" => School::Holy,
                _ => unreachable!(),
            };
            let trailer = parse_trailer(captures.get(7)?.as_str());
            trailer.iter().for_each(|(_, hit_type)| hit_mask |= hit_type.clone() as u32);
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(4)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);
            self.participants.get_mut(&victim.unit_id).unwrap().attribute_damage(damage);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask,
                    blocked: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialBlock).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                    damage_over_time: false,
                    damage_components: vec![DamageComponent {
                        school_mask: school as u8,
                        damage,
                        resisted_or_glanced: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialResist).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                        absorbed: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialAbsorb).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                    }],
                }),
            ]);
        }

        if let Some(captures) = RE_DAMAGE_PERIODIC.captures(&content) {
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let damage = u32::from_str_radix(captures.get(2)?.as_str(), 10).ok()?;
            let school = match captures.get(3)?.as_str() {
                "Physical" => School::Physical,
                "Arcane" => School::Arcane,
                "Fire" => School::Fire,
                "Frost" => School::Frost,
                "Shadow" => School::Shadow,
                "Nature" => School::Nature,
                "Holy" => School::Holy,
                _ => unreachable!(),
            };
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(4)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(5)?.as_str())?;

            let mut hit_mask = HitType::Hit as u32;
            let trailer = parse_trailer(captures.get(6)?.as_str());
            trailer.iter().for_each(|(_, hit_type)| hit_mask |= hit_type.clone() as u32);
            self.collect_participant(&victim, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&attacker, captures.get(4)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);
            self.participants.get_mut(&victim.unit_id).unwrap().attribute_damage(damage);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask,
                    blocked: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialBlock).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                    damage_over_time: false,
                    damage_components: vec![DamageComponent {
                        school_mask: school as u8,
                        damage,
                        resisted_or_glanced: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialResist).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                        absorbed: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialAbsorb).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                    }],
                }),
            ]);
        }

        if let Some(captures) = RE_DAMAGE_SHIELD.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let damage = u32::from_str_radix(captures.get(2)?.as_str(), 10).ok()?;
            let school = match captures.get(3)?.as_str() {
                "Physical" => School::Physical,
                "Arcane" => School::Arcane,
                "Fire" => School::Fire,
                "Frost" => School::Frost,
                "Shadow" => School::Shadow,
                "Nature" => School::Nature,
                "Holy" => School::Holy,
                _ => unreachable!(),
            };
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(4)?.as_str())?;
            let spell_id = 2; // Thats our reflection spell
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(4)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);
            self.participants.get_mut(&victim.unit_id).unwrap().attribute_damage(damage);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask: HitType::Hit as u32,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask: HitType::Hit as u32,
                    blocked: 0,
                    damage_over_time: false,
                    damage_components: vec![DamageComponent {
                        school_mask: school as u8,
                        damage,
                        resisted_or_glanced: 0,
                        absorbed: 0,
                    }],
                }),
            ]);
        }

        /*
         * Melee Damage
         */
        if let Some(captures) = RE_DAMAGE_HIT_OR_CRIT.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let mut hit_mask = if captures.get(2)?.as_str() == "cr" { HitType::Crit as u32 } else { HitType::Hit as u32 };
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(3)?.as_str())?;
            let damage = u32::from_str_radix(captures.get(4)?.as_str(), 10).ok()?;
            let trailer = parse_trailer(captures.get(5)?.as_str());
            trailer.iter().for_each(|(_, hit_type)| hit_mask |= hit_type.clone() as u32);
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(3)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);
            self.participants.get_mut(&victim.unit_id).unwrap().attribute_damage(damage);

            return Some(vec![MessageType::MeleeDamage(DamageDone {
                attacker,
                victim,
                spell_id: None,
                hit_mask,
                blocked: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialBlock).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                damage_over_time: false,
                damage_components: vec![DamageComponent {
                    school_mask: School::Physical as u8,
                    damage,
                    resisted_or_glanced: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialResist).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                    absorbed: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialAbsorb).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                }],
            })]);
        }

        if let Some(captures) = RE_DAMAGE_HIT_OR_CRIT_SCHOOL.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let mut hit_mask = if captures.get(2)?.as_str() == "cr" { HitType::Crit as u32 } else { HitType::Hit as u32 };
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(3)?.as_str())?;
            let damage = u32::from_str_radix(captures.get(4)?.as_str(), 10).ok()?;
            let school = match captures.get(5)?.as_str() {
                "Physical" => School::Physical,
                "Arcane" => School::Arcane,
                "Fire" => School::Fire,
                "Frost" => School::Frost,
                "Shadow" => School::Shadow,
                "Nature" => School::Nature,
                "Holy" => School::Holy,
                _ => unreachable!(),
            };
            let trailer = parse_trailer(captures.get(6)?.as_str());
            trailer.iter().for_each(|(_, hit_type)| hit_mask |= hit_type.clone() as u32);
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(3)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);
            self.participants.get_mut(&victim.unit_id).unwrap().attribute_damage(damage);

            return Some(vec![MessageType::MeleeDamage(DamageDone {
                attacker,
                victim,
                spell_id: None,
                hit_mask,
                blocked: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialBlock).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                damage_over_time: false,
                damage_components: vec![DamageComponent {
                    school_mask: school as u8,
                    damage,
                    resisted_or_glanced: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialResist).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                    absorbed: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialAbsorb).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                }],
            })]);
        }

        /*
         * Heal
         */

        if let Some(captures) = RE_HEAL_CRIT.captures(&content) {
            let caster = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            let hit_mask = HitType::Crit as u32;
            let target = parse_unit(&mut self.cache_unit, data, captures.get(3)?.as_str())?;
            let amount = u32::from_str_radix(captures.get(4)?.as_str(), 10).ok()?;
            self.collect_participant(&caster, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&target, captures.get(3)?.as_str(), event_ts);
            self.collect_active_map(data, &caster, event_ts);
            self.collect_active_map(data, &target, event_ts);
            let effective_heal = self.participants.get_mut(&target.unit_id).unwrap().attribute_heal(amount);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: caster.clone(),
                    target: Some(target.clone()),
                    spell_id,
                    hit_mask,
                }),
                MessageType::Heal(HealDone {
                    caster,
                    target,
                    spell_id,
                    total_heal: amount,
                    effective_heal,
                    absorb: 0,
                    hit_mask,
                }),
            ]);
        }

        if let Some(captures) = RE_HEAL_HIT.captures(&content) {
            let caster = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            let hit_mask = HitType::Hit as u32;
            let target = parse_unit(&mut self.cache_unit, data, captures.get(3)?.as_str())?;
            let amount = u32::from_str_radix(captures.get(4)?.as_str(), 10).ok()?;
            self.collect_participant(&caster, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&target, captures.get(3)?.as_str(), event_ts);
            self.collect_active_map(data, &caster, event_ts);
            self.collect_active_map(data, &target, event_ts);
            let effective_heal = self.participants.get_mut(&target.unit_id).unwrap().attribute_heal(amount);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: caster.clone(),
                    target: Some(target.clone()),
                    spell_id,
                    hit_mask,
                }),
                MessageType::Heal(HealDone {
                    caster,
                    target,
                    spell_id,
                    total_heal: amount,
                    effective_heal,
                    absorb: 0,
                    hit_mask,
                }),
            ]);
        }

        /*
         * Aura Application
         */
        if let Some(captures) = RE_AURA_GAIN_HARMFUL_HELPFUL.captures(&content) {
            let target = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(3)?.as_str())?;
            let stack_amount = u8::from_str_radix(captures.get(4)?.as_str(), 10).ok()?;
            let caster = Unit { is_player: true, unit_id: 0 };
            self.collect_participant(&target, captures.get(1)?.as_str(), event_ts);
            self.collect_active_map(data, &target, event_ts);

            return Some(vec![MessageType::AuraApplication(AuraApplication {
                caster,
                target,
                spell_id,
                stack_amount: stack_amount as u32,
                delta: stack_amount as i8,
            })]);
        }

        if let Some(captures) = RE_AURA_FADE.captures(&content) {
            let target = parse_unit(&mut self.cache_unit, data, captures.get(2)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(1)?.as_str())?;
            let caster = Unit { is_player: true, unit_id: 0 };
            self.collect_participant(&target, captures.get(2)?.as_str(), event_ts);
            self.collect_active_map(data, &target, event_ts);

            return Some(vec![MessageType::AuraApplication(AuraApplication {
                caster,
                target,
                spell_id,
                stack_amount: 0,
                delta: -1,
            })]);
        }

        /*
         * Spell damage continued
         */
        if let Some(captures) = RE_DAMAGE_SPELL_SPLIT.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(3)?.as_str())?;
            let damage = u32::from_str_radix(captures.get(4)?.as_str(), 10).ok()?;

            let mut hit_mask = HitType::Hit as u32;
            let trailer = parse_trailer(captures.get(5)?.as_str());
            trailer.iter().for_each(|(_, hit_type)| hit_mask |= hit_type.clone() as u32);
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(3)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);
            self.participants.get_mut(&victim.unit_id).unwrap().attribute_damage(damage);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask,
                    blocked: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialBlock).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                    damage_over_time: false,
                    damage_components: vec![DamageComponent {
                        school_mask: School::Physical as u8,
                        damage,
                        resisted_or_glanced: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialResist).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                        absorbed: trailer.iter().find(|(_, hit_type)| *hit_type == HitType::PartialAbsorb).map(|(amount, _)| amount.unwrap()).unwrap_or(0),
                    }],
                }),
            ]);
        }

        if let Some(captures) = RE_DAMAGE_SPELL_MISS.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(4)?.as_str())?;
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(4)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask: HitType::Miss as u32,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask: HitType::Miss as u32,
                    blocked: 0,
                    damage_over_time: false,
                    damage_components: vec![],
                }),
            ]);
        }

        if let Some(captures) = RE_DAMAGE_SPELL_BLOCK_PARRY_EVADE_DODGE_RESIST_DEFLECT.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            let hit_type = match captures.get(3)?.as_str() {
                "blocked" => HitType::FullBlock,
                "parried" => HitType::Parry,
                "evaded" => HitType::Evade,
                "dodged" => HitType::Dodge,
                "deflected" => HitType::Deflect,
                "resisted" => HitType::FullResist,
                _ => unreachable!(),
            };
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(4)?.as_str())?;
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(4)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask: hit_type.clone() as u32,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask: hit_type as u32,
                    blocked: 0,
                    damage_over_time: false,
                    damage_components: vec![],
                }),
            ]);
        }

        if let Some(captures) = RE_DAMAGE_SPELL_ABSORB.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(3)?.as_str())?;
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(3)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask: HitType::FullAbsorb as u32,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask: HitType::FullAbsorb as u32,
                    blocked: 0,
                    damage_over_time: false,
                    damage_components: vec![],
                }),
            ]);
        }

        if let Some(captures) = RE_DAMAGE_SPELL_ABSORB_SELF.captures(&content) {
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(2)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(3)?.as_str())?;
            self.collect_participant(&victim, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&attacker, captures.get(2)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask: HitType::FullAbsorb as u32,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask: HitType::FullAbsorb as u32,
                    blocked: 0,
                    damage_over_time: false,
                    damage_components: vec![],
                }),
            ]);
        }

        if let Some(captures) = RE_DAMAGE_REFLECT.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(3)?.as_str())?;
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(3)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask: HitType::Reflect as u32,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask: HitType::Reflect as u32,
                    blocked: 0,
                    damage_over_time: false,
                    damage_components: vec![],
                }),
            ]);
        }

        if let Some(captures) = RE_DAMAGE_PROC_RESIST.captures(&content) {
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(2)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(3)?.as_str())?;
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(2)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask: HitType::FullResist as u32,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask: HitType::FullResist as u32,
                    blocked: 0,
                    damage_over_time: false,
                    damage_components: vec![],
                }),
            ]);
        }

        if let Some(captures) = RE_DAMAGE_SPELL_IMMUNE.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(3)?.as_str())?;
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(3)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: attacker.clone(),
                    target: Some(victim.clone()),
                    spell_id,
                    hit_mask: HitType::Immune as u32,
                }),
                MessageType::SpellDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: Some(spell_id),
                    hit_mask: HitType::Immune as u32,
                    blocked: 0,
                    damage_over_time: false,
                    damage_components: vec![],
                }),
            ]);
        }

        /*
         * Melee Damage continued
         */
        if let Some(captures) = RE_DAMAGE_MISS.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(2)?.as_str())?;
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(2)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![MessageType::MeleeDamage(DamageDone {
                attacker,
                victim,
                spell_id: None,
                hit_mask: HitType::Miss as u32,
                blocked: 0,
                damage_over_time: false,
                damage_components: vec![],
            })]);
        }

        if let Some(captures) = RE_DAMAGE_BLOCK_PARRY_EVADE_DODGE_DEFLECT.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(2)?.as_str())?;
            let hit_type = match captures.get(3)?.as_str() {
                "blocks" => HitType::FullBlock,
                "parries" => HitType::Parry,
                "evades" => HitType::Evade,
                "dodges" => HitType::Dodge,
                "deflects" => HitType::Deflect,
                _ => unreachable!(),
            };
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(2)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![MessageType::MeleeDamage(DamageDone {
                attacker,
                victim,
                spell_id: None,
                hit_mask: hit_type as u32,
                blocked: 0,
                damage_over_time: false,
                damage_components: vec![],
            })]);
        }

        if let Some(captures) = RE_DAMAGE_ABSORB_RESIST.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(2)?.as_str())?;
            let hit_type = match captures.get(3)?.as_str() {
                "absorbs" => HitType::FullAbsorb,
                "resists" => HitType::FullResist,
                _ => unreachable!(),
            };
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(2)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![MessageType::MeleeDamage(DamageDone {
                attacker,
                victim,
                spell_id: None,
                hit_mask: hit_type as u32,
                blocked: 0,
                damage_over_time: false,
                damage_components: vec![],
            })]);
        }

        if let Some(captures) = RE_DAMAGE_IMMUNE.captures(&content) {
            let attacker = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(2)?.as_str())?;
            self.collect_participant(&attacker, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&victim, captures.get(2)?.as_str(), event_ts);
            self.collect_active_map(data, &attacker, event_ts);
            self.collect_active_map(data, &victim, event_ts);

            return Some(vec![MessageType::MeleeDamage(DamageDone {
                attacker,
                victim,
                spell_id: None,
                hit_mask: HitType::Immune as u32,
                blocked: 0,
                damage_over_time: false,
                damage_components: vec![],
            })]);
        }

        /*
         * Spell casts
         */
        if let Some(captures) = RE_SPELL_CAST_PERFORM_DURABILITY.captures(&content) {
            let caster = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(3)?.as_str())?;
            let target = parse_unit(&mut self.cache_unit, data, captures.get(4)?.as_str())?;
            self.collect_participant(&caster, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&target, captures.get(4)?.as_str(), event_ts);
            self.collect_active_map(data, &caster, event_ts);
            self.collect_active_map(data, &target, event_ts);

            return Some(vec![MessageType::SpellCast(SpellCast {
                caster,
                target: Some(target),
                spell_id,
                hit_mask: HitType::Hit as u32,
            })]);
        }

        if let Some(captures) = RE_SPELL_CAST_PERFORM.captures(&content) {
            let caster = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(3)?.as_str())?;
            let target = parse_unit(&mut self.cache_unit, data, captures.get(4)?.as_str())?;
            self.collect_participant(&caster, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&target, captures.get(4)?.as_str(), event_ts);
            self.collect_active_map(data, &caster, event_ts);
            self.collect_active_map(data, &target, event_ts);

            return Some(vec![MessageType::SpellCast(SpellCast {
                caster,
                target: Some(target),
                spell_id,
                hit_mask: HitType::Hit as u32,
            })]);
        }

        if let Some(captures) = RE_SPELL_CAST_PERFORM_UNKNOWN.captures(&content) {
            let caster = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(3)?.as_str())?;
            self.collect_participant(&caster, captures.get(1)?.as_str(), event_ts);
            self.collect_active_map(data, &caster, event_ts);

            return Some(vec![MessageType::SpellCast(SpellCast {
                caster,
                target: None,
                spell_id,
                hit_mask: HitType::Hit as u32,
            })]);
        }

        /*
         * Unit Death
         */
        if let Some(captures) = RE_UNIT_DIE_DESTROYED.captures(&content) {
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            self.collect_participant(&victim, captures.get(1)?.as_str(), event_ts);
            self.collect_active_map(data, &victim, event_ts);
            return Some(vec![MessageType::Death(Death { cause: None, victim })]);
        }

        if let Some(captures) = RE_UNIT_SLAY.captures(&content) {
            let victim = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let cause = parse_unit(&mut self.cache_unit, data, captures.get(2)?.as_str())?;
            self.collect_participant(&victim, captures.get(1)?.as_str(), event_ts);
            self.collect_participant(&cause, captures.get(2)?.as_str(), event_ts);
            self.collect_active_map(data, &victim, event_ts);
            self.collect_active_map(data, &cause, event_ts);
            return Some(vec![MessageType::Death(Death { cause: Some(cause), victim })]);
        }

        /*
         * Misc
         */
        let content_vec = if content.starts_with("CONSOLIDATED: ") {
            content.trim_start_matches("CONSOLIDATED: ").split('{').collect::<Vec<&str>>()
        } else {
            vec![content]
        };

        for i_content in content_vec {
            if let Some(captures) = RE_LOOT.captures(&i_content) {
                let timestamp = NaiveDateTime::parse_from_str(captures.get(1)?.as_str(), "%d.%m.%y %H:%M:%S").ok()?.timestamp_millis();
                let receiver = parse_unit(&mut self.cache_unit, data, captures.get(2)?.as_str())?;
                self.collect_participant(&receiver, captures.get(2)?.as_str(), event_ts);
                self.collect_active_map(data, &receiver, event_ts);
                let item_id = u32::from_str_radix(captures.get(4)?.as_str(), 10).ok()?;
                let count = u32::from_str_radix(captures.get(9)?.as_str(), 10).ok()?;
                self.bonus_messages.push(Message::new_parsed(timestamp as u64, 0, MessageType::Loot(Loot { unit: receiver, item_id, count })));
                continue;
            }

            if let Some(captures) = RE_ZONE_INFO.captures(&i_content) {
                let timestamp = NaiveDateTime::parse_from_str(captures.get(1)?.as_str(), "%d.%m.%y %H:%M:%S").ok()?.timestamp_millis();
                let map_name = captures.get(2)?.as_str().to_string();
                let instance_id = u32::from_str_radix(captures.get(3)?.as_str(), 10).ok()?;
                if let Some(map) = data.get_map_by_name(&map_name) {
                    self.bonus_messages.push(Message::new_parsed(
                        timestamp as u64,
                        0,
                        MessageType::InstanceMap(InstanceMap {
                            map_id: map.id as u32,
                            instance_id,
                            map_difficulty: 0,
                            unit: Unit { is_player: false, unit_id: 1 },
                        }),
                    ));
                }
                continue;
            }

            if i_content.starts_with("PET: ") {
                let message_args = content.trim_start_matches("PET: ").split('&').collect::<Vec<&str>>();
                let _timestamp = NaiveDateTime::parse_from_str(message_args[0], "%d.%m.%y %H:%M:%S").ok()?.timestamp_millis();
                let player_name = message_args[1];
                let pet_name = message_args[2];

                let unit_id = get_hashed_player_unit_id(player_name);
                if pet_name != "nil" && !pet_name.is_empty() {
                    let pet_unit = parse_unit(&mut self.cache_unit, data, pet_name)?;
                    self.pet_owner.insert(pet_unit.unit_id, unit_id);
                }
                continue;
            }
        }

        if content.starts_with("COMBATANT_INFO:") {
            let message_args = content.trim_start_matches("COMBATANT_INFO: ").split('&').collect::<Vec<&str>>();
            if message_args.len() <= 27 {
                return None;
            }

            let timestamp = NaiveDateTime::parse_from_str(message_args[0], "%d.%m.%y %H:%M:%S").ok()?.timestamp_millis();
            let player_name = message_args[1];
            let hero_class_local = message_args[2].to_lowercase();
            let race_local = message_args[3].to_lowercase();
            let gender_local = message_args[4];
            let pet_name = message_args[5];
            let guild_name = message_args[6];
            let guild_rank_name = message_args[7];
            let guild_rank_index = message_args[8];

            let unit_id = get_hashed_player_unit_id(player_name);
            let participant = self.participants.entry(unit_id).or_insert_with(|| Participant::new(unit_id, true, player_name.to_string(), event_ts));
            if participant.hero_class_id.is_none() {
                participant.hero_class_id = Some(match hero_class_local.as_str() {
                    "warrior" => 1,
                    "paladin" => 2,
                    "hunter" => 3,
                    "rogue" => 4,
                    "priest" => 5,
                    "shaman" => 7,
                    "mage" => 8,
                    "warlock" => 9,
                    "Druid" => 11,
                    _ => return None,
                });
            }

            if participant.gender_id.is_none() {
                if gender_local == "2" {
                    participant.gender_id = Some(false);
                } else if gender_local == "3" {
                    participant.gender_id = Some(true);
                }
            }

            if participant.race_id.is_none() {
                participant.race_id = Some(match race_local.as_str() {
                    "human" => 1,
                    "orc" => 2,
                    "dwarf" => 3,
                    "night elf" => 4,
                    "nightelf" => 4,
                    "undead" => 5,
                    "scourge" => 5,
                    "tauren" => 6,
                    "gnome" => 7,
                    "troll" => 8,
                    _ => return None,
                });
            }

            if participant.guild_args.is_none() && guild_name != "nil" && guild_rank_name != "nil" {
                let guild_rank_index = u8::from_str_radix(guild_rank_index, 10).ok()?;
                participant.guild_args = Some((guild_name.to_string(), guild_rank_name.to_string(), guild_rank_index));
            }

            if pet_name != "nil" && !pet_name.is_empty() {
                let pet_unit = parse_unit(&mut self.cache_unit, data, pet_name)?;
                self.pet_owner.insert(pet_unit.unit_id, unit_id);
            }

            if (9..28).into_iter().any(|i| message_args[i] != "nil") {
                let mut gear = Vec::with_capacity(19);
                let gear_setups = participant.gear_setups.get_or_insert_with(Vec::new);
                for arg in message_args.iter().take(28).skip(9) {
                    if *arg == "nil" {
                        gear.push(None);
                        continue;
                    }

                    let item_args = arg.split(':').collect::<Vec<&str>>();
                    if item_args.len() < 2 {
                        gear.push(None);
                        continue;
                    }
                    let item_id = u32::from_str_radix(item_args[0], 10).ok()?;
                    let enchant_id = u32::from_str_radix(item_args[1], 10).ok()?;
                    if item_id == 0 {
                        gear.push(None);
                    } else if enchant_id == 0 {
                        gear.push(Some((item_id, None, None)));
                    } else {
                        gear.push(Some((item_id, Some(enchant_id), None)));
                    }
                }
                gear_setups.push((timestamp as u64, gear));
            }

            if message_args[28] != "nil" && message_args[28].contains("}") {
                participant.talents = strip_talent_specialization(&Some(message_args[28].replace("}", "|")));
            }

            return None;
        }

        /*
         * Dispel, Steal and Interrupt
         */
        if let Some(captures) = RE_AURA_DISPEL.captures(&content) {
            let un_aura_caster = Unit { is_player: true, unit_id: 0 };
            let un_aura_spell_id = 42;
            let target = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let target_spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(2)?.as_str())?;
            self.collect_participant(&target, captures.get(1)?.as_str(), event_ts);
            self.collect_active_map(data, &target, event_ts);

            return Some(vec![MessageType::Dispel(UnAura {
                un_aura_caster,
                target,
                aura_caster: None,
                un_aura_spell_id,
                target_spell_id,
                un_aura_amount: 1,
            })]);
        }

        if let Some(captures) = RE_AURA_INTERRUPT.captures(&content) {
            let un_aura_caster = parse_unit(&mut self.cache_unit, data, captures.get(1)?.as_str())?;
            let target = parse_unit(&mut self.cache_unit, data, captures.get(2)?.as_str())?;
            let interrupted_spell_id = parse_spell_args(&mut self.cache_spell_id, data, captures.get(3)?.as_str())?;
            self.collect_participant(&target, captures.get(2)?.as_str(), event_ts);
            self.collect_active_map(data, &target, event_ts);

            return Some(vec![
                MessageType::SpellCast(SpellCast {
                    caster: un_aura_caster,
                    target: Some(target.clone()),
                    spell_id: 2139, // Must always be counter spell
                    hit_mask: HitType::Hit as u32,
                }),
                MessageType::Interrupt(Interrupt { target, interrupted_spell_id })
            ]);
        }

        None
    }

    fn do_message_post_processing(&mut self, data: &Data, messages: &mut Vec<Message>) {
        // Correct pet unit ids
        for message in messages.iter_mut() {
            match &mut message.message_type {
                MessageType::MeleeDamage(damage_done) | MessageType::SpellDamage(damage_done) => {
                    correct_pet_unit(data, &mut damage_done.attacker, &self.pet_owner);
                    correct_pet_unit(data, &mut damage_done.victim, &self.pet_owner);
                }
                MessageType::InstanceMap(instance_map) => correct_pet_unit(data, &mut instance_map.unit, &self.pet_owner),
                MessageType::Interrupt(interrupt) => correct_pet_unit(data, &mut interrupt.target, &self.pet_owner),
                MessageType::Dispel(dispel) => correct_pet_unit(data, &mut dispel.target, &self.pet_owner),
                MessageType::SpellSteal(spell_steal) => {
                    correct_pet_unit(data, &mut spell_steal.un_aura_caster, &self.pet_owner);
                    correct_pet_unit(data, &mut spell_steal.target, &self.pet_owner);
                }
                MessageType::SpellCast(spell_cast) => {
                    correct_pet_unit(data, &mut spell_cast.caster, &self.pet_owner);
                    if let Some(target) = spell_cast.target.as_mut() {
                        correct_pet_unit(data, target, &self.pet_owner);
                    }
                }
                MessageType::AuraApplication(aura_app) => correct_pet_unit(data, &mut aura_app.target, &self.pet_owner),
                MessageType::Heal(heal) => {
                    correct_pet_unit(data, &mut heal.caster, &self.pet_owner);
                    correct_pet_unit(data, &mut heal.target, &self.pet_owner);
                }
                MessageType::Death(death) => {
                    correct_pet_unit(data, &mut death.victim, &self.pet_owner);
                    if let Some(cause) = death.cause.as_mut() {
                        correct_pet_unit(data, cause, &self.pet_owner);
                    }
                }
                _ => {}
            };
        }

        // And create pet summon events
        let mut summon_events: Vec<Message> = Vec::with_capacity(40);
        for (pet_unit_id, owner_unit_id) in self.pet_owner.iter() {
            summon_events.push(Message::new_parsed(
                0,
                0,
                MessageType::Summon(Summon {
                    owner: Unit { is_player: true, unit_id: *owner_unit_id },
                    unit: Unit {
                        is_player: false,
                        unit_id: 0xF14000FFFF000000 + (*pet_unit_id & 0x0000000000FFFFFF),
                    },
                }),
            ));
        }

        // Find caster of aura applications
        // For a gain its usually ~100ms apart, else we assume its the target
        // There are also group buffs to consider, like Greater Blessings, GMotW, Fortitude, Shouts
        // Auras just seem to appear
        // For fade we just use the first gain owner as owner
        // Okay, fuck it. It just stays unknown

        // Find dispel caster and cast
        let mut last_dispel_index = None;
        let mut matching_spell_cast = None;
        for i in 0..messages.len() {
            {
                let message = messages.get(i).unwrap();
                match &message.message_type {
                    MessageType::Dispel(_) => last_dispel_index = Some(i),
                    MessageType::SpellCast(spell_cast) => {
                        if let Some(index) = &last_dispel_index {
                            let last_message = messages.get(*index).unwrap();
                            if message.timestamp - last_message.timestamp <= 100 {
                                if let MessageType::Dispel(un_aura) = &last_message.message_type {
                                    if let Some(target) = &spell_cast.target {
                                        if un_aura.target.unit_id == target.unit_id {
                                            matching_spell_cast = Some(message.clone());
                                        }
                                    }
                                }
                            } else {
                                last_dispel_index = None;
                                matching_spell_cast = None;
                            }
                        }
                    }
                    _ => {}
                };
            }

            if let Some(Message {
                            message_type: MessageType::SpellCast(spell_cast),
                            ..
                        }) = matching_spell_cast.as_ref()
            {
                if let Some(last_message_index) = last_dispel_index {
                    let last_message = messages.get_mut(last_message_index).unwrap();
                    if let MessageType::Dispel(un_aura) = &mut last_message.message_type {
                        un_aura.un_aura_caster = spell_cast.caster.clone();
                        un_aura.un_aura_spell_id = spell_cast.spell_id;
                        matching_spell_cast = None;
                        last_dispel_index = None;
                    }
                }
            }
        }

        messages.append(&mut summon_events);
        messages.sort_by(|left, right| left.timestamp.cmp(&right.timestamp));
    }

    fn get_involved_server(&self) -> Option<Vec<(u32, String, String)>> {
        None
    }

    fn get_involved_character_builds(&self) -> Vec<(Option<u32>, u64, CharacterDto)> {
        let mut result = self.participants.iter().filter(|(_, participant)| participant.is_player).fold(Vec::new(), |mut acc, (_, participant)| {
            let gear_setups = &participant.gear_setups;
            if gear_setups.is_some() && !gear_setups.as_ref().unwrap().is_empty() {
                for (ts, gear) in gear_setups.as_ref().unwrap().iter() {
                    acc.push((
                        None,
                        *ts,
                        CharacterDto {
                            server_uid: participant.id,
                            character_history: Some(CharacterHistoryDto {
                                character_info: CharacterInfoDto {
                                    gear: CharacterGearDto {
                                        head: create_character_item_dto(&gear[0]),
                                        neck: create_character_item_dto(&gear[1]),
                                        shoulder: create_character_item_dto(&gear[2]),
                                        back: create_character_item_dto(&gear[14]),
                                        chest: create_character_item_dto(&gear[4]),
                                        shirt: create_character_item_dto(&gear[3]),
                                        tabard: create_character_item_dto(&gear[18]),
                                        wrist: create_character_item_dto(&gear[8]),
                                        main_hand: create_character_item_dto(&gear[15]),
                                        off_hand: create_character_item_dto(&gear[16]),
                                        ternary_hand: create_character_item_dto(&gear[17]),
                                        glove: create_character_item_dto(&gear[9]),
                                        belt: create_character_item_dto(&gear[5]),
                                        leg: create_character_item_dto(&gear[6]),
                                        boot: create_character_item_dto(&gear[7]),
                                        ring1: create_character_item_dto(&gear[10]),
                                        ring2: create_character_item_dto(&gear[11]),
                                        trinket1: create_character_item_dto(&gear[12]),
                                        trinket2: create_character_item_dto(&gear[13]),
                                    },
                                    hero_class_id: participant.hero_class_id.unwrap_or(12),
                                    level: 60,
                                    gender: participant.gender_id.unwrap_or(false),
                                    profession1: None,
                                    profession2: None,
                                    talent_specialization: None,
                                    race_id: participant.race_id.unwrap_or(1),
                                },
                                character_name: participant.name.clone(),
                                character_guild: participant.guild_args.as_ref().map(|(guild_name, rank_name, rank_index)| CharacterGuildDto {
                                    guild: GuildDto {
                                        server_uid: get_hashed_player_unit_id(guild_name),
                                        name: guild_name.clone(),
                                    },
                                    rank: GuildRank { index: *rank_index, name: rank_name.clone() },
                                }),
                                character_title: None,
                                profession_skill_points1: None,
                                profession_skill_points2: None,
                                facial: None,
                                arena_teams: vec![],
                            }),
                        },
                    ));
                }
            } else {
                acc.push((
                    None,
                    time_util::now() * 1000,
                    CharacterDto {
                        server_uid: participant.id,
                        character_history: Some(CharacterHistoryDto {
                            character_info: CharacterInfoDto {
                                gear: CharacterGearDto {
                                    head: None,
                                    neck: None,
                                    shoulder: None,
                                    back: None,
                                    chest: None,
                                    shirt: None,
                                    tabard: None,
                                    wrist: None,
                                    main_hand: None,
                                    off_hand: None,
                                    ternary_hand: None,
                                    glove: None,
                                    belt: None,
                                    leg: None,
                                    boot: None,
                                    ring1: None,
                                    ring2: None,
                                    trinket1: None,
                                    trinket2: None,
                                },
                                hero_class_id: participant.hero_class_id.unwrap_or(12),
                                level: 60,
                                gender: participant.gender_id.unwrap_or(false),
                                profession1: None,
                                profession2: None,
                                talent_specialization: None,
                                race_id: participant.race_id.unwrap_or(1),
                            },
                            character_name: participant.name.clone(),
                            character_guild: participant.guild_args.as_ref().map(|(guild_name, rank_name, rank_index)| CharacterGuildDto {
                                guild: GuildDto {
                                    server_uid: get_hashed_player_unit_id(guild_name),
                                    name: guild_name.clone(),
                                },
                                rank: GuildRank { index: *rank_index, name: rank_name.clone() },
                            }),
                            character_title: None,
                            profession_skill_points1: None,
                            profession_skill_points2: None,
                            facial: None,
                            arena_teams: vec![],
                        }),
                    },
                ));
            }
            acc
        });
        result.push((None, time_util::now() * 1000, CharacterDto { server_uid: 0, character_history: None }));
        result
    }

    fn get_participants(&self) -> Vec<Participant> {
        self.participants.iter().map(|(_, participant)| participant).cloned().collect()
    }

    fn get_active_maps(&self) -> ActiveMapVec {
        self.active_map.iter().map(|(_, active_map)| active_map.clone()).collect()
    }

    fn get_npc_appearance_offset(&self, entry: u32) -> Option<i64> {
        Some(match entry {
            15990 => -228000,
            12435 => -300000,
            11583 => -180000,
            65534 => -3000,
            // Thaddius
            15928 => -30000,
            _ => return None,
        })
    }

    fn get_npc_timeout(&self, entry: u32) -> Option<u64> {
        Some(match entry {
            65534 => 90000,
            15990 => 180000,
            // Thaddius
            15928 => 80000,
            // Viscidius
            15299 => 80000,
            // Nefarian
            11583 => 120000,
            // Gothik the Harvester
            16060 => 80000,
            _ => return None,
        })
    }

    fn get_death_implied_npc_combat_state_and_offset(&self, entry: u32) -> Option<Vec<(u32, i64, i64)>> {
        Some(match entry {
            15929 | 15930 => vec![(15928, -1000, 180000)],
            16427 | 16428 | 16429 => vec![(65534, 0, 180000)],
            12557 | 14456 | 12416 | 12422 | 12420 => vec![(12435, 0, 240000)],
            14261 | 14262 | 14263 | 14264 | 14265 => vec![(11583, 0, 180000)],
            _ => return None,
        })
    }

    fn get_in_combat_implied_npc_combat(&self, entry: u32) -> Option<Vec<u32>> {
        Some(match entry {
            16124 | 16125 | 16126 | 16127 | 16148 | 16149 | 16150 => vec![16060],
            12557 | 14456 | 12416 | 12422 | 12420 => vec![12435],
            16427 | 16429 | 16428 => vec![65534],
            15667 => vec![15299],
            // Nefarian
            14261 | 14262 | 14263 | 14264 | 14265 | 10162 | 10163 => vec![11583],
            _ => return None,
        })
    }

    fn get_ignore_after_death_ignore_abilities(&self, entry: u32) -> Option<Vec<u32>> {
        Some(match entry {
            14020 => vec![23169, 23155, 23315, 23316],
            _ => return None,
        })
    }

    fn get_expansion_id(&self) -> u8 {
        1
    }

    fn get_server_id(&self) -> Option<u32> {
        Some(self.server_id)
    }

    fn get_bonus_messages(&self) -> Option<Vec<Message>> {
        Some(self.bonus_messages.clone())
    }

    fn get_npc_in_combat_offset(&self, _entry: u32) -> Option<i64> {
        None
    }

    fn get_ability_caster(&self, _ability_id: u32) -> Option<u32> {
        None
    }
}

fn create_character_item_dto(item: &Option<(u32, Option<u32>, Option<Vec<Option<u32>>>)>) -> Option<CharacterItemDto> {
    item.as_ref().map(|(item_id, enchant_id, _)| CharacterItemDto {
        item_id: *item_id,
        random_property_id: None,
        enchant_id: *enchant_id,
        gem_ids: vec![],
    })
}

fn correct_pet_unit(data: &Data, unit: &mut Unit, pet_owner: &HashMap<u64, u64>) {
    if pet_owner.contains_key(&unit.unit_id) {
        if let Some(entry) = unit.unit_id.get_entry() {
            if let Some(npc) = data.get_npc(1, entry) {
                if npc.map_id.is_some() {
                    return;
                }
            }
        }
        unit.unit_id = 0xF14000FFFF000000 + (unit.unit_id | 0x0000000000FFFFFF);
        unit.is_player = false;
    }
}
