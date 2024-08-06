use chrono::NaiveDateTime;
use regex::Regex;

use crate::modules::armory::domain_value::GuildRank;
use crate::modules::armory::dto::{CharacterDto, CharacterGearDto, CharacterGuildDto, CharacterHistoryDto, CharacterInfoDto, CharacterItemDto, GuildDto};
use crate::modules::armory::tools::strip_talent_specialization;
use crate::modules::data::Data;
use crate::modules::data::tools::RetrieveGem;
use crate::modules::live_data_processor::domain_value::HitType;
use crate::modules::live_data_processor::dto::{AuraApplication, DamageDone, Death, HealDone, InstanceMap, Interrupt, Loot, Message, MessageType, SpellCast, Summon, UnAura, Unit};
use crate::modules::live_data_processor::material::{ActiveMapVec, Participant, WoWWOTLKParser};
use crate::modules::live_data_processor::tools::cbl_parser::combat_log_parser::CombatLogParser;
use crate::modules::live_data_processor::tools::cbl_parser::wow_tbc::parse_spell_args;
use crate::modules::live_data_processor::tools::cbl_parser::wow_wotlk::parse_damage;
use crate::modules::live_data_processor::tools::cbl_parser::wow_wotlk::parse_heal;
use crate::modules::live_data_processor::tools::cbl_parser::wow_wotlk::parse_miss;
use crate::modules::live_data_processor::tools::cbl_parser::wow_wotlk::parse_unit;
use crate::modules::live_data_processor::tools::GUID;
use crate::util::hash_str::hash_str;

impl CombatLogParser for WoWWOTLKParser {
    fn parse_cbl_line(&mut self, data: &Data, event_ts: u64, content: &str) -> Option<Vec<MessageType>> {
        let message_args = content.trim_end_matches('\r').split(',').collect::<Vec<&str>>();
        Some(match message_args[0] {
            "SPELL_CAST_FAILED" => {
                lazy_static! {
                    static ref RE_LOOT: Regex = Regex::new(r##"(.+[^\s]) receives loot: \|c([a-zA-Z0-9]+)\|Hitem:(\d+):(.+)\|h\[([a-zA-Z0-9\s']+)\]\|h\|rx(\d+)\."##).unwrap();
                }

                let fail_str: String = message_args.iter().skip(10).cloned().collect::<Vec<&str>>().concat().replace("\"", "");
                if fail_str.starts_with("COMBATANT_INFO: ") {
                    let args: Vec<&str> = fail_str.trim_start_matches("COMBATANT_INFO: ").split('&').collect();
                    let timestamp = NaiveDateTime::parse_from_str(args[0], "%d.%m.%y %H:%M:%S").ok()?.timestamp_millis();
                    let mut unit_guid = u64::from_str_radix(args[1].trim_start_matches("0x"), 16).ok()?;
                    // Crystalsong UID fix
                    if unit_guid.get_high() == 0x0110 {
                        unit_guid &= 0x0000000000FFFFFF;
                    }

                    let unit_name = args[2].to_string();
                    let race = args[3].to_lowercase();
                    let hero_class = args[4].to_lowercase();
                    let gender = args[5];
                    let guild_name = args[6];
                    let guild_rank_name = args[7];
                    let guild_rank_index = args[8];
                    let gear = args[9];
                    let talents = args[10];
                    let _arena_team2 = args[11];
                    let _arena_team3 = args[12];
                    let _arena_team5 = args[13];

                    let mut participant = self.participants.entry(unit_guid).or_insert_with(|| Participant::new(unit_guid, true, unit_name, 0));

                    if race != "nil" && participant.race_id.is_none() {
                        participant.race_id = Some(match race.as_str() {
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
                            "blood elf" => 10,
                            "bloodelf" => 10,
                            "draenei" => 11,
                            _ => return None,
                        });
                    }

                    if hero_class != "nil" && participant.hero_class_id.is_none() {
                        participant.hero_class_id = Some(match hero_class.as_str() {
                            "warrior" => 1,
                            "paladin" => 2,
                            "hunter" => 3,
                            "rogue" => 4,
                            "priest" => 5,
                            "death knight" => 6,
                            "deathknight" => 6,
                            "shaman" => 7,
                            "mage" => 8,
                            "warlock" => 9,
                            "druid" => 11,
                            _ => return None,
                        });
                    }

                    if gender != "nil" && participant.gender_id.is_none() {
                        if gender == "2" {
                            participant.gender_id = Some(false);
                        } else if gender == "3" {
                            participant.gender_id = Some(true);
                        }
                    }

                    if guild_name != "nil" && guild_rank_name != "nil" && guild_rank_index != "nil" && participant.guild_args.is_none() {
                        participant.guild_args = Some((guild_name.to_string(), guild_rank_name.to_string(), u8::from_str_radix(guild_rank_index, 10).ok()?));
                    }

                    let items: Vec<&str> = gear.split('}').collect();
                    if items.iter().any(|item| *item != "nil") {
                        let mut gear = Vec::with_capacity(19);
                        let gear_setups = participant.gear_setups.get_or_insert_with(Vec::new);
                        for item in items {
                            if item == "nil" {
                                gear.push(None);
                                continue;
                            }

                            let item_args = item.split(':').collect::<Vec<&str>>();
                            if item_args.len() <= 5 {
                                // Early return, something is wrong here!
                                return None;
                            }

                            let item_id = u32::from_str_radix(item_args[0], 10).ok()?;
                            let enchant_id = u32::from_str_radix(item_args[1], 10).ok()?;
                            let mut gems = Vec::with_capacity(4);
                            for arg in item_args.iter().take(6).skip(2) {
                                let gem_enchant_id = u32::from_str_radix(arg, 10).ok()?;
                                if gem_enchant_id > 0 {
                                    if let Some(gem) = data.get_gem_by_enchant_id(3, gem_enchant_id) {
                                        gems.push(Some(gem.item_id));
                                    }
                                } else {
                                    gems.push(None);
                                }
                            }

                            if item_id == 0 {
                                gear.push(None);
                            } else if enchant_id == 0 {
                                gear.push(Some((item_id, None, Some(gems))));
                            } else {
                                gear.push(Some((item_id, Some(enchant_id), Some(gems))));
                            }
                        }
                        gear_setups.push((timestamp as u64, gear));
                    }

                    if talents != "nil" && !talents.contains(":") {
                        participant.talents = strip_talent_specialization(&Some(talents.replace("}", "|")));
                    }
                } else {
                    let content_vec = if fail_str.starts_with("CONSOLIDATED: ") {
                        fail_str.trim_start_matches("CONSOLIDATED: ").split('{').collect::<Vec<&str>>()
                    } else {
                        vec![fail_str.as_str()]
                    };
                    for i_content in content_vec {
                        if i_content.starts_with("LOOT: ") {
                            let args: Vec<&str> = i_content.trim_start_matches("LOOT: ").split('&').collect();
                            let timestamp = NaiveDateTime::parse_from_str(args[0], "%d.%m.%y %H:%M:%S").ok()?.timestamp_millis();
                            let captures = RE_LOOT.captures(&args[1])?;
                            let unit_name = captures[1].to_string();
                            let unit_guid = self.participants.iter().find_map(|(guid, participant)| if participant.name == unit_name { Some(*guid) } else { None })?;
                            let item_id = u32::from_str_radix(&captures[3], 10).ok()?;
                            let count = u32::from_str_radix(&captures[6], 10).ok()?;
                            self.bonus_messages.push(Message::new_parsed(
                                timestamp as u64,
                                0,
                                MessageType::Loot(Loot {
                                    unit: Unit { is_player: true, unit_id: unit_guid },
                                    item_id,
                                    count,
                                }),
                            ));
                        } else if i_content.starts_with("ZONE_INFO: ") {
                            let args: Vec<&str> = i_content.trim_start_matches("ZONE_INFO: ").split('&').collect();
                            let timestamp = NaiveDateTime::parse_from_str(args[0], "%d.%m.%y %H:%M:%S").ok()?.timestamp_millis();
                            let instance_id = u32::from_str_radix(args[8], 10).unwrap_or(0);
                            let map_id = match args[1] {
                                "Naxxramas" => 533,
                                "Ulduar" => 603,
                                "The Obsidian Sanctum" => 615,
                                "The Eye of Eternity" => 616,
                                "Vault of Archavon" => 624,
                                "Icecrown Citadel" => 631,
                                "Trial of the Crusader" => 649,
                                "The Ruby Sanctum" => 724,
                                _ => return None,
                            };
                            let mut difficulty_id = match args[4] {
                                "10 Player" => 3,
                                "25 Player" => 4,
                                "10 Player (Heroic)" => 5,
                                "25 Player (Heroic)" => 6,
                                _ => return None,
                            };
                            if let Ok(player_difficulty) = u32::from_str_radix(args[6], 10) {
                                if player_difficulty == 1 {
                                    if difficulty_id == 3 {
                                        difficulty_id = 5;
                                    } else if difficulty_id == 4 {
                                        difficulty_id = 6;
                                    }
                                }
                            }

                            self.bonus_messages.push(Message::new_parsed(
                                timestamp as u64,
                                0,
                                MessageType::InstanceMap(InstanceMap {
                                    map_id,
                                    instance_id,
                                    map_difficulty: difficulty_id,
                                    unit: Unit { is_player: false, unit_id: 1 },
                                }),
                            ));
                            /*
                        if args.len() >= 10 {
                            for participant_unit_guid in args.iter().skip(9) {
                                if let Ok(mut guid) = u64::from_str_radix(participant_unit_guid.trim_start_matches("0x"), 16) {
                                    // Crystalsong UID fix
                                    if guid.get_high() == 0x0110 {
                                        guid &= 0x0000000000FFFFFF;
                                    }
                                    self.bonus_messages.push(Message::new_parsed(
                                        timestamp as u64,
                                        0,
                                        MessageType::InstanceMap(InstanceMap {
                                            map_id,
                                            instance_id,
                                            map_difficulty: difficulty_id,
                                            unit: Unit { is_player: true, unit_id: guid },
                                        }),
                                    ));
                                }
                            }
                        }
                         */
                        } else if i_content.starts_with("PET_SUMMON: ") {
                            let args: Vec<&str> = i_content.trim_start_matches("PET_SUMMON: ").split('&').collect();
                            let timestamp = NaiveDateTime::parse_from_str(args[0], "%d.%m.%y %H:%M:%S").ok()?.timestamp_millis();
                            let mut owner_guid = u64::from_str_radix(args[1].trim_start_matches("0x"), 16).ok()?;
                            let mut pet_guid = u64::from_str_radix(args[2].trim_start_matches("0x"), 16).ok()?;
                            // Crystalsong UID fix
                            if owner_guid.get_high() == 0x0110 {
                                owner_guid &= 0x0000000000FFFFFF;
                            }
                            if pet_guid.is_pet() {
                                let mut new_unit_id = pet_guid;
                                new_unit_id = (new_unit_id & 0x000000FFFF000000).rotate_right(24);
                                new_unit_id |= 0x000000FFFF000000;
                                new_unit_id |= 0xF140000000000000;
                                pet_guid = new_unit_id;
                            }

                            self.bonus_messages.push(Message::new_parsed(
                                timestamp as u64,
                                1,
                                MessageType::Summon(Summon {
                                    owner: Unit { is_player: true, unit_id: owner_guid },
                                    unit: Unit { is_player: false, unit_id: pet_guid },
                                }),
                            ));
                        }
                    }
                }
                return None;
            }
            "SWING_DAMAGE" => {
                let attacker = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let victim = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                let (hit_mask, blocked, damage_component) = parse_damage(&message_args[7..])?;
                self.collect_participant(&attacker, message_args[2], event_ts);
                self.collect_participant(&victim, message_args[5], event_ts);
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
            }
            "SWING_MISSED" => {
                let attacker = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let victim = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                let (hit_mask, blocked, damage_component) = parse_miss(&message_args[7..])?;
                self.collect_participant(&attacker, message_args[2], event_ts);
                self.collect_participant(&victim, message_args[5], event_ts);
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
            }
            "SPELL_DAMAGE" | "SPELL_PERIODIC_DAMAGE" | "RANGE_DAMAGE" | "DAMAGE_SHIELD" | "DAMAGE_SPLIT" => {
                let attacker = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let victim = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                let spell_id = parse_spell_args(&message_args[7..10])?;
                let (hit_mask, blocked, damage_component) = parse_damage(&message_args[10..])?;
                self.collect_participant(&attacker, message_args[2], event_ts);
                self.collect_participant(&victim, message_args[5], event_ts);
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
            }
            "SPELL_MISSED" | "SPELL_PERIODIC_MISSED" | "RANGE_MISSED" | "DAMAGE_SHIELD_MISSED" => {
                let attacker = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let victim = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                let spell_id = parse_spell_args(&message_args[7..10])?;
                let (hit_mask, blocked, damage_component) = parse_miss(&message_args[10..])?;
                self.collect_participant(&attacker, message_args[2], event_ts);
                self.collect_participant(&victim, message_args[5], event_ts);
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
            }
            "SPELL_HEAL" | "SPELL_PERIODIC_HEAL" => {
                let caster = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                let spell_id = parse_spell_args(&message_args[7..10])?;
                let (amount, overhealing, absorb, is_crit) = parse_heal(&message_args[10..])?;
                self.collect_participant(&caster, message_args[2], event_ts);
                self.collect_participant(&target, message_args[5], event_ts);
                self.collect_participant_class(&caster, spell_id);
                let mut result = vec![
                    MessageType::SpellCast(SpellCast {
                        caster: caster.clone(),
                        target: Some(target.clone()),
                        spell_id,
                        hit_mask: if is_crit { HitType::Crit as u32 } else { HitType::Hit as u32 },
                    }),
                    MessageType::Heal(HealDone {
                        caster: caster.clone(),
                        target: target.clone(),
                        spell_id,
                        total_heal: amount,
                        effective_heal: amount - overhealing,
                        absorb,
                        hit_mask: if is_crit { HitType::Crit as u32 } else { HitType::Hit as u32 },
                    }),
                ];

                if self.is_owner_binding_pet_ability(spell_id) {
                    result.push(MessageType::Summon(Summon { owner: caster, unit: target }));
                }
                result
            }
            // "SPELL_AURA_APPLIED_DOSE" | "SPELL_AURA_REMOVED_DOSE"
            "SPELL_AURA_APPLIED" | "SPELL_AURA_REMOVED" => {
                let caster = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                let spell_id = parse_spell_args(&message_args[7..10])?;
                let is_removed = message_args[0].contains("REMOVED");
                self.collect_participant(&caster, message_args[2], event_ts);
                self.collect_participant(&target, message_args[5], event_ts);
                self.collect_active_map(data, &caster, event_ts);
                self.collect_active_map(data, &target, event_ts);
                let mut result = vec![MessageType::AuraApplication(AuraApplication {
                    caster: caster.clone(),
                    target: target.clone(),
                    spell_id,
                    stack_amount: if is_removed { 0 } else { 1 }, // TODO: Amount estimation
                    delta: if is_removed { -1 } else { 1 },
                })];

                if self.is_owner_binding_pet_ability(spell_id) {
                    result.push(MessageType::Summon(Summon { owner: caster, unit: target }));
                }

                result
            }
            "SPELL_CAST_SUCCESS" => {
                let caster = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                let spell_id = parse_spell_args(&message_args[7..10])?;
                self.collect_participant(&caster, message_args[2], event_ts);
                self.collect_participant(&target, message_args[5], event_ts);
                self.collect_active_map(data, &caster, event_ts);
                self.collect_active_map(data, &target, event_ts);

                let mut result = vec![MessageType::SpellCast(SpellCast {
                    caster: caster.clone(),
                    target: Some(target.clone()),
                    spell_id,
                    hit_mask: HitType::Hit as u32,
                })];

                if self.is_owner_binding_pet_ability(spell_id) {
                    result.push(MessageType::Summon(Summon { owner: caster, unit: target }));
                }

                result
            }
            "SPELL_SUMMON" => {
                let owner = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let unit = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                self.collect_participant(&owner, message_args[2], event_ts);
                self.collect_participant(&unit, message_args[5], event_ts);
                vec![MessageType::Summon(Summon { owner, unit })]
            }
            "UNIT_DIED" | "UNIT_DESTROYED" => {
                let victim = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                self.collect_participant(&victim, message_args[5], event_ts);
                vec![MessageType::Death(Death { cause: None, victim })]
            }
            "PARTY_KILL" => {
                let killer = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let victim = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                self.collect_participant(&killer, message_args[2], event_ts);
                self.collect_participant(&victim, message_args[5], event_ts);
                vec![MessageType::Death(Death { cause: Some(killer), victim })]
            }
            "SPELL_DISPEL" => {
                let un_aura_caster = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                let un_aura_spell_id = parse_spell_args(&message_args[7..10])?;
                let target_spell_id = parse_spell_args(&message_args[10..13])?;
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
            }
            "SPELL_INTERRUPT" => {
                let un_aura_caster = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                let un_aura_spell_id = parse_spell_args(&message_args[7..10])?;
                let interrupted_spell_id = parse_spell_args(&message_args[10..13])?;
                vec![
                    MessageType::SpellCast(SpellCast {
                        caster: un_aura_caster,
                        target: Some(target.clone()),
                        spell_id: un_aura_spell_id,
                        hit_mask: HitType::Hit as u32,
                    }),
                    MessageType::Interrupt(Interrupt { target, interrupted_spell_id }),
                ]
            }
            "SPELL_STOLEN" => {
                let un_aura_caster = parse_unit(&message_args[1..4]).unwrap_or_else(Unit::default);
                let target = parse_unit(&message_args[4..7]).unwrap_or_else(Unit::default);
                let un_aura_spell_id = parse_spell_args(&message_args[7..10])?;
                let target_spell_id = parse_spell_args(&message_args[10..13])?;
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
            }
            // TODO: Use more events
            // https://wow.gamepedia.com/index.php?title=COMBAT_LOG_EVENT&oldid=2561876
            _ => return None,
        })
    }

    fn do_message_post_processing(&mut self, _data: &Data, _messages: &mut Vec<Message>) {
        // Do nothing
    }

    fn get_involved_server(&self) -> Option<Vec<(u32, String, String)>> {
        None
    }

    fn get_involved_character_builds(&self) -> Vec<(Option<u32>, u64, CharacterDto)> {
        self.participants.iter().filter(|(_, participant)| participant.is_player).fold(Vec::new(), |mut acc, (_, participant)| {
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
                                    level: 80,
                                    gender: participant.gender_id.unwrap_or(false),
                                    profession1: None,
                                    profession2: None,
                                    talent_specialization: participant.talents.clone(),
                                    race_id: participant.race_id.unwrap_or(1),
                                },
                                character_name: participant.name.clone(),
                                character_guild: participant.guild_args.as_ref().map(|(guild_name, rank_name, rank_index)| CharacterGuildDto {
                                    guild: GuildDto {
                                        server_uid: hash_str(guild_name) & 0x0000FFFFFFFFFFFF,
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
                                level: 80,
                                gender: participant.gender_id.unwrap_or(false),
                                profession1: None,
                                profession2: None,
                                talent_specialization: participant.talents.clone(),
                                race_id: participant.race_id.unwrap_or(1),
                            },
                            character_name: participant.name.clone(),
                            character_guild: participant.guild_args.as_ref().map(|(guild_name, rank_name, rank_index)| CharacterGuildDto {
                                guild: GuildDto {
                                    server_uid: hash_str(guild_name) & 0x0000FFFFFFFFFFFF,
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
            // Kel'Thuzad
            15990 => -228000,
            65534 => -3000,
            // Wyrmrest Skytalon
            32535 => -30000,
            // VX-001
            33651 => -50000,
            // Yogg-Saron Npcs
            33966 | 33983 | 33985 | 33988 | 33990 | 33288 => -55000,
            // Thaddius
            15928 => -30000,
            // Northrend Beasts
            34799 | 35144 => -45000,
            34797 => -120000,
            _ => return None,
        })
    }

    fn get_npc_timeout(&self, entry: u32) -> Option<u64> {
        Some(match entry {
            // Kel'Thuzad
            15990 => 228000,
            65534 => 90000,
            // Malygos
            28859 => 120000,
            // Yogg-Saron
            33288 => 120000,
            33136 | 33134 => 90000,
            // Thaddius
            15928 => 80000,
            // Northrend Beasts
            34799 | 35144 => 60000,
            34797 => 120000,
            // Anub
            34564 => 80000,
            // Lady Deathwhisper
            36855 => 80000,
            // Valithria Dreamwalker
            36789 => 120000,
            // Lich King
            36597 | 38153 => 180000,
            // Noth the Plaguebringer
            15954 => 120000,
            // Halion
            40142 => 180000,
            _ => return None,
        })
    }

    fn get_death_implied_npc_combat_state_and_offset(&self, entry: u32) -> Option<Vec<(u32, i64, i64)>> {
        Some(match entry {
            15929 | 15930 => vec![(15928, -1000, 180000)],
            16427 | 16428 | 16429 => vec![(65534, 0, 180000)],
            // Malygos
            30084 | 30245 | 30249 => vec![(28859, 0, 180000)],
            // Norhrend Beasts
            34796 => vec![(35144, -2000, 180000), (34799, -2000, 180000)],
            35144 | 34799 => vec![(34797, -2000, 180000)],
            // Yogg-Saron
            33136 | 33134 => vec![(33288, -2000, 180000), (33136, -10000, 120000)],
            _ => return None,
        })
    }

    fn get_in_combat_implied_npc_combat(&self, entry: u32) -> Option<Vec<u32>> {
        Some(match entry {
            // Yogg-Saron Npcs
            33966 | 33983 | 33985 | 33988 | 33990 | 33136 | 33134 | 33890 | 33943 => vec![33288],
            // Kel'thuzad
            16427 | 16429 | 16428 => vec![65534],
            // Malygos
            30084 | 30245 | 30249 => vec![28859],
            // Anub Swarm Scarabs
            34605 => vec![34564],
            // Lady Deathwhisper
            37890 | 37949 | 38009 | 38010 | 38135 | 38136 | 38222 => vec![36855],
            36791 | 37863 | 37868 | 37886 | 37907 | 37934 => vec![36789],
            // Noth the Plaguebringer
            16981 | 16983 => vec![15954],
            // Halion
            40142 => vec![39863],
            _ => return None,
        })
    }

    fn get_ignore_after_death_ignore_abilities(&self, _entry: u32) -> Option<Vec<u32>> {
        None
    }

    fn get_expansion_id(&self) -> u8 {
        3
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

    fn get_ability_caster(&self, ability_id: u32) -> Option<u32> {
        Some(match ability_id {
            63884 => 33288,
            64125 => 33983,
            55601 => 16011,
            _ => return None
        })
    }
}

fn create_character_item_dto(item: &Option<(u32, Option<u32>, Option<Vec<Option<u32>>>)>) -> Option<CharacterItemDto> {
    item.as_ref().map(|(item_id, enchant_id, gems)| CharacterItemDto {
        item_id: *item_id,
        random_property_id: None,
        enchant_id: *enchant_id,
        gem_ids: gems.clone().unwrap_or_else(Vec::new),
    })
}
