use crate::modules::armory::dto::{CharacterDto, CharacterGearDto, CharacterHistoryDto, CharacterInfoDto, CharacterItemDto};
use crate::modules::data::tools::RetrieveEncounter;
use crate::modules::data::Data;
use crate::modules::live_data_processor::domain_value::HitType;
use crate::modules::live_data_processor::dto::{AuraApplication, DamageDone, Death, HealDone, Interrupt, Message, MessageType, SpellCast, Summon, UnAura, Unit};
use crate::modules::live_data_processor::material::{ActiveMapVec, Participant, WoWRetailClassicParser};
use crate::modules::live_data_processor::tools::cbl_parser::combat_log_parser::CombatLogParser;
use crate::modules::live_data_processor::tools::cbl_parser::wow_retail_classic::parse_damage;
use crate::modules::live_data_processor::tools::cbl_parser::wow_retail_classic::parse_miss;
use crate::modules::live_data_processor::tools::cbl_parser::wow_retail_classic::parse_unit;
use crate::modules::live_data_processor::tools::cbl_parser::wow_tbc::parse_spell_args;
use crate::modules::live_data_processor::tools::cbl_parser::wow_wotlk::parse_heal;
use regex::Regex;
use std::collections::HashMap;

impl CombatLogParser for WoWRetailClassicParser {
    fn parse_cbl_line(&mut self, data: &Data, event_ts: u64, content: &str) -> Option<Vec<MessageType>> {
        let message_args = content.trim_end_matches('\r').split(',').collect::<Vec<&str>>();
        Some(match message_args[0] {
            // TODO: _ABSORBED
            "COMBATANT_INFO" => {
                lazy_static! {
                    static ref ITEM_REGEX: Regex = Regex::new(r"(\((\d+),(\d+),(\(\d+,\d+,\d+\)|\(\)),\(\),\(\)\))+").unwrap();
                }

                let unit_params = message_args[1].split('-').collect::<Vec<&str>>();
                let unit_id = u64::from_str_radix(unit_params[2], 16).ok()?;
                let mut gear = Vec::with_capacity(20);
                for cap in ITEM_REGEX.captures_iter(&content) {
                    let item_id = u32::from_str_radix(&cap[2], 10).ok()?;
                    if item_id == 0 {
                        gear.push(None);
                    } else {
                        let enchant_id = if cap.len() > 2 { u32::from_str_radix(&cap[4], 10).ok() } else { None };
                        gear.push(Some((item_id, enchant_id, None)));
                    }
                }

                if let Some(participant) = self.participants.get_mut(&unit_id) {
                    let gear_entries = participant.gear_setups.get_or_insert_with(Vec::new);
                    gear_entries.push((event_ts, gear));
                }

                // Return none for meta infos
                return None;
            },
            "ENCOUNTER_START" => {
                let retail_encounter_id = u32::from_str_radix(message_args[1], 10).ok()?;
                let encounter = data.get_encounter_by_retail_id(retail_encounter_id).expect("I hope I didnt forget to update the table as I add expansions");
                vec![MessageType::EncounterStart(encounter.id)]
            },
            "ENCOUNTER_END" => {
                let retail_encounter_id = u32::from_str_radix(message_args[1], 10).ok()?;
                let encounter = data.get_encounter_by_retail_id(retail_encounter_id).expect("I hope I didnt forget to update the table as I add expansions");
                vec![MessageType::EncounterEnd(encounter.id)]
            },
            "SWING_DAMAGE_LANDED" => {
                let attacker = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let victim = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                let (hit_mask, blocked, damage_component) = parse_damage(&message_args[(9 + 17)..])?;
                self.collect_participant(&attacker, message_args[1], message_args[2], event_ts);
                self.collect_participant(&victim, message_args[5], message_args[6], event_ts);
                self.collect_active_map(data, &attacker, event_ts);
                self.collect_active_map(data, &victim, event_ts);
                vec![MessageType::MeleeDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: None,
                    hit_mask,
                    blocked,
                    damage_over_time: false,
                    damage_components: vec![damage_component],
                })]
            },
            "SWING_MISSED" => {
                let attacker = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let victim = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                let (hit_mask, blocked, damage_component) = parse_miss(&message_args[9..])?;
                self.collect_participant(&attacker, message_args[1], message_args[2], event_ts);
                self.collect_participant(&victim, message_args[5], message_args[6], event_ts);
                self.collect_active_map(data, &attacker, event_ts);
                self.collect_active_map(data, &victim, event_ts);
                vec![MessageType::MeleeDamage(DamageDone {
                    attacker,
                    victim,
                    spell_id: None,
                    hit_mask,
                    blocked,
                    damage_over_time: false,
                    damage_components: damage_component.map(|comp| vec![comp]).unwrap_or_else(Vec::new),
                })]
            },
            "SPELL_DAMAGE" | "SPELL_PERIODIC_DAMAGE" | "RANGE_DAMAGE" | "DAMAGE_SHIELD" | "DAMAGE_SPLIT" => {
                let attacker = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let victim = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                let spell_id = parse_spell_args(&message_args[9..12])?;
                let (hit_mask, blocked, damage_component) = parse_damage(&message_args[(12 + 17)..])?;
                self.collect_participant(&attacker, message_args[1], message_args[2], event_ts);
                self.collect_participant(&victim, message_args[5], message_args[6], event_ts);
                self.collect_participant_class(&attacker, spell_id);
                self.collect_active_map(data, &attacker, event_ts);
                self.collect_active_map(data, &victim, event_ts);
                vec![
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
                        blocked,
                        damage_over_time: false, // message_args[0] == "SPELL_PERIODIC_DAMAGE",
                        damage_components: vec![damage_component],
                    }),
                ]
            },
            "SPELL_MISSED" | "SPELL_PERIODIC_MISSED" | "RANGE_MISSED" | "DAMAGE_SHIELD_MISSED" => {
                let attacker = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let victim = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                let spell_id = parse_spell_args(&message_args[9..12])?;
                let (hit_mask, blocked, damage_component) = parse_miss(&message_args[12..])?;
                self.collect_participant(&attacker, message_args[1], message_args[2], event_ts);
                self.collect_participant(&victim, message_args[5], message_args[6], event_ts);
                self.collect_participant_class(&attacker, spell_id);
                self.collect_active_map(data, &attacker, event_ts);
                self.collect_active_map(data, &victim, event_ts);
                vec![
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
                        blocked,
                        damage_over_time: false, // message_args[0] == "SPELL_PERIODIC_MISSED",
                        damage_components: damage_component.map(|comp| vec![comp]).unwrap_or_else(Vec::new),
                    }),
                ]
            },
            "SPELL_HEAL" | "SPELL_PERIODIC_HEAL" => {
                let caster = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                let spell_id = parse_spell_args(&message_args[9..12])?;
                let (amount, overhealing, absorb, is_crit) = parse_heal(&message_args[(12 + 17)..])?;
                self.collect_participant(&caster, message_args[1], message_args[2], event_ts);
                self.collect_participant(&target, message_args[5], message_args[6], event_ts);
                self.collect_participant_class(&caster, spell_id);
                vec![
                    MessageType::SpellCast(SpellCast {
                        caster: caster.clone(),
                        target: Some(target.clone()),
                        spell_id,
                        hit_mask: if is_crit { HitType::Crit as u32 } else { HitType::Hit as u32 },
                    }),
                    MessageType::Heal(HealDone {
                        caster,
                        target,
                        spell_id,
                        total_heal: amount,
                        effective_heal: amount - overhealing,
                        absorb,
                        hit_mask: if is_crit { HitType::Crit as u32 } else { HitType::Hit as u32 },
                    }),
                ]
            },
            // "SPELL_AURA_APPLIED_DOSE" | "SPELL_AURA_REMOVED_DOSE"
            "SPELL_AURA_APPLIED" | "SPELL_AURA_REMOVED" => {
                let caster = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                let spell_id = parse_spell_args(&message_args[9..12])?;
                let is_removed = message_args[0].contains("REMOVED");
                self.collect_participant(&caster, message_args[1], message_args[2], event_ts);
                self.collect_participant(&target, message_args[5], message_args[6], event_ts);
                self.collect_active_map(data, &caster, event_ts);
                self.collect_active_map(data, &target, event_ts);
                vec![MessageType::AuraApplication(AuraApplication {
                    caster,
                    target,
                    spell_id,
                    stack_amount: if is_removed { 0 } else { 1 }, // TODO: Amount estimation
                    delta: if is_removed { -1 } else { 1 },
                })]
            },
            "SPELL_CAST_SUCCESS" => {
                let caster = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                let spell_id = parse_spell_args(&message_args[9..12])?;
                self.collect_participant(&caster, message_args[1], message_args[2], event_ts);
                self.collect_participant(&target, message_args[5], message_args[6], event_ts);
                self.collect_active_map(data, &caster, event_ts);
                self.collect_active_map(data, &target, event_ts);

                vec![MessageType::SpellCast(SpellCast {
                    caster,
                    target: Some(target),
                    spell_id,
                    hit_mask: HitType::Hit as u32,
                })]
            },
            "SPELL_SUMMON" => {
                let owner = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let unit = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                self.collect_participant(&owner, message_args[1], message_args[2], event_ts);
                self.collect_participant(&unit, message_args[5], message_args[6], event_ts);
                vec![MessageType::Summon(Summon { owner, unit })]
            },
            "UNIT_DIED" | "UNIT_DESTROYED" => {
                let victim = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                vec![MessageType::Death(Death { cause: None, victim })]
            },
            "SPELL_DISPEL" => {
                let un_aura_caster = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                let un_aura_spell_id = parse_spell_args(&message_args[9..12])?;
                let target_spell_id = parse_spell_args(&message_args[12..15])?;
                vec![
                    MessageType::SpellCast(SpellCast {
                        caster: un_aura_caster.clone(),
                        target: Some(target.clone()),
                        spell_id: un_aura_spell_id,
                        hit_mask: HitType::Hit as u32,
                    }),
                    MessageType::Dispel(UnAura {
                        un_aura_caster,
                        target,
                        aura_caster: None,
                        un_aura_spell_id,
                        target_spell_id,
                        un_aura_amount: 1,
                    }),
                ]
            },
            "SPELL_INTERRUPT" => {
                let un_aura_caster = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                let un_aura_spell_id = parse_spell_args(&message_args[9..12])?;
                let interrupted_spell_id = parse_spell_args(&message_args[12..15])?;
                vec![
                    MessageType::SpellCast(SpellCast {
                        caster: un_aura_caster,
                        target: Some(target.clone()),
                        spell_id: un_aura_spell_id,
                        hit_mask: HitType::Hit as u32,
                    }),
                    MessageType::Interrupt(Interrupt { target, interrupted_spell_id }),
                ]
            },
            "SPELL_STOLEN" => {
                let un_aura_caster = parse_unit(&message_args[1..5]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[5..9]).unwrap_or_else(Unit::default);
                let un_aura_spell_id = parse_spell_args(&message_args[9..12])?;
                let target_spell_id = parse_spell_args(&message_args[12..15])?;
                vec![
                    MessageType::SpellCast(SpellCast {
                        caster: un_aura_caster.clone(),
                        target: Some(target.clone()),
                        spell_id: un_aura_spell_id,
                        hit_mask: HitType::Hit as u32,
                    }),
                    MessageType::SpellSteal(UnAura {
                        un_aura_caster,
                        target,
                        aura_caster: None,
                        un_aura_spell_id,
                        target_spell_id,
                        un_aura_amount: 1,
                    }),
                ]
            },
            // TODO: Use more events
            // https://wow.gamepedia.com/index.php?title=COMBAT_LOG_EVENT&oldid=2561876
            _ => return None,
        })
    }

    fn do_message_post_processing(&mut self, _data: &Data, _messages: &mut Vec<Message>) {
        // Do nothing
    }

    fn get_involved_server(&self) -> Option<Vec<(u32, String, String)>> {
        Some(
            self.participants
                .iter()
                .filter(|(_, participant)| participant.is_player)
                .fold(HashMap::new(), |mut acc, (_, participant)| {
                    if let Some((server_id, server_name)) = &participant.server {
                        acc.insert(server_id, server_name);
                    }
                    acc
                })
                .iter()
                .map(|(server_id, server_name)| (**server_id, server_name.to_string(), "1.13".to_string()))
                .collect(),
        )
    }

    fn get_involved_character_builds(&self) -> Vec<(Option<u32>, u64, CharacterDto)> {
        self.participants.iter().filter(|(_, participant)| participant.is_player).fold(Vec::new(), |mut acc, (_, participant)| {
            if let Some(gear_setups) = &participant.gear_setups {
                for (ts, gear) in gear_setups.iter() {
                    acc.push((
                        participant.server.as_ref().map(|(server_id, _)| *server_id),
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
                                    gender: false,
                                    profession1: None,
                                    profession2: None,
                                    talent_specialization: None,
                                    race_id: 1,
                                },
                                character_name: participant.name.clone(),
                                character_guild: None,
                                character_title: None,
                                profession_skill_points1: None,
                                profession_skill_points2: None,
                                facial: None,
                                arena_teams: vec![],
                            }),
                        },
                    ));
                }
            }
            acc
        })
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
            _ => return None,
        })
    }

    fn get_npc_timeout(&self, entry: u32) -> Option<u64> {
        Some(match entry {
            65534 => 90000,
            15990 => 180000,
            // Viscidius
            15299 => 80000,
            // Razorgore
            12435 => 80000,
            // Nefarian
            11583 => 120000,
            _ => return None,
        })
    }

    fn get_death_implied_npc_combat_state_and_offset(&self, entry: u32) -> Option<Vec<(u32, i64, i64)>> {
        Some(match entry {
            15929 | 15930 => vec![(15928, 0, 180000)],
            16427 | 16428 | 16429 => vec![(65534, 0, 180000)],
            12557 | 14456 | 12416 | 12422 | 12420 => vec![(12435, 0, 240000)],
            14261 | 14262 | 14263 | 14264 | 14265 => vec![(11583, 0, 180000)],
            _ => return None,
        })
    }

    fn get_in_combat_implied_npc_combat(&self, entry: u32) -> Option<Vec<u32>> {
        Some(match entry {
            // Kel'thuzad
            16427 | 16429 | 16428 => vec![65534],
            // Razorscale
            12557 | 14456 | 12416 | 12422 | 12420 => vec![12435],
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
        None
    }

    fn get_bonus_messages(&self) -> Option<Vec<Message>> {
        None
    }

    fn get_npc_in_combat_offset(&self, _entry: u32) -> Option<i64> {
        None
    }

    fn get_ability_caster(&self, _ability_id: u32) -> Option<u32> {
        None
    }
}

fn create_character_item_dto(item: &Option<(u32, Option<u32>, Option<Vec<Option<u32>>>)>) -> Option<CharacterItemDto> {
    item.as_ref().map(|item| CharacterItemDto {
        item_id: item.0,
        random_property_id: None,
        enchant_id: item.1,
        gem_ids: vec![],
    })
}
