use std::cmp::Ordering;
use std::collections::{BTreeSet, HashMap, VecDeque};

use chrono::{Datelike, NaiveDateTime};

use crate::modules::armory::Armory;
use crate::modules::armory::tools::{GetCharacter, SetCharacter};
use crate::modules::data::Data;
use crate::modules::data::tools::{RetrieveNPC, RetrieveServer, RetrieveSpell};
use crate::modules::live_data_processor::dto::{CombatState, InstanceMap, Message, MessageType, SpellCast, Unit, Interrupt};
use crate::modules::live_data_processor::material::{IntervalBucket, Participant, RetrieveActiveMap};
use crate::modules::live_data_processor::tools::cbl_parser::CombatLogParser;
use crate::modules::live_data_processor::tools::GUID;
use crate::util::database::{Execute, Select};
use crate::modules::live_data_processor::LiveDataProcessor;

pub fn parse_cbl(parser: &mut impl CombatLogParser, live_data_processor: &LiveDataProcessor, db_main: &mut (impl Select + Execute), data: &Data, armory: &Armory, file_content: &str, start_parse: u64, _end_parse: u64, member_id: u32) -> Option<(u32, Vec<Message>)> {
    let mut messages = Vec::with_capacity(1000000);

    // Pre processing
    // TODO: Handle 31/12 => 01/01 raids
    let current_year = NaiveDateTime::from_timestamp((start_parse / 1000) as i64, 0).year();
    for line in file_content.split('\n').into_iter() {
        let meta = line.split("  ").collect::<Vec<&str>>();
        if meta.len() != 2 {
            continue;
        }
        if let Ok(timestamp) = NaiveDateTime::parse_from_str(&format!("{}/{}", current_year, meta[0]), "%Y/%m/%d %H:%M:%S%.3f") {
            let event_timestamp = timestamp.timestamp_millis() as u64;
            /*
            if event_timestamp < start_parse || event_timestamp > end_parse {
                continue;
            }
             */

            if let Some(message_types) = parser.parse_cbl_line(data, event_timestamp, meta[1].trim_end_matches('\r')) {
                let mut message_count = (messages.len() + message_types.len()) as u64;
                let mut msg_type_len = message_types.len() as u64;
                for message_type in message_types {
                    let mut ts_offset = 0;
                    if let MessageType::Summon(summon) = &message_type {
                        if let Some(entry) = summon.unit.unit_id.get_entry() {
                            match entry {
                                // Order for Shaman Totems
                                15439 | 15430 => ts_offset = 50,
                                _ => {}
                            };
                        }
                    }

                    message_count -= 1;
                    msg_type_len -= 1;
                    messages.push(Message {
                        api_version: 0,
                        message_length: 0,
                        timestamp: event_timestamp - msg_type_len - ts_offset,
                        message_count,
                        message_type,
                    });
                }
            }
        }
    }

    // Make sure all timestamps are in the correct order.
    messages.sort_by(|left, right| {
        let res = left.timestamp.cmp(&right.timestamp);
        if res == Ordering::Equal {
            let _result = left.message_count.cmp(&right.message_count);
        }
        res
    });

    {
        let mut upload_progress = live_data_processor.upload_progress.write().unwrap();
        upload_progress.insert(member_id, 10);
    }

    // Post processing step
    parser.do_message_post_processing(data, &mut messages);

    {
        let mut upload_progress = live_data_processor.upload_progress.write().unwrap();
        upload_progress.insert(member_id, 20);
    }

    let expansion_id = parser.get_expansion_id();
    let mut server_id = parser.get_server_id();
    if let Some(involved_server) = parser.get_involved_server() {
        for (retail_server_id, server_name, patch_tag) in involved_server {
            let mut server = data.get_internal_server_by_retail_id(retail_server_id);
            if server.is_none() {
                server = Some(data.set_internal_retail_server(db_main, server_name, expansion_id, patch_tag, retail_server_id));
            }
            let server = server.unwrap();
            server_id = Some(server.id); // TODO: Better way to determine server id
        }
    }

    {
        let mut upload_progress = live_data_processor.upload_progress.write().unwrap();
        upload_progress.insert(member_id, 25);
    }

    let server_id = server_id?;

    println!("Start Char processing");
    let mut remove_unit = BTreeSet::new();
    let mut replace_unit_id = HashMap::new();
    for (retail_server_id, timestamp, character_dto) in parser.get_involved_character_builds() {
        let server_id = retail_server_id.map(|id| data.get_internal_server_by_retail_id(id).unwrap().id).unwrap_or(server_id);
        if server_id == 4 || server_id == 5 {
            if let Some(character) = armory.get_character_by_name(server_id, character_dto.character_history.as_ref().unwrap().character_name.clone()) {
                replace_unit_id.insert(character_dto.server_uid, character.server_uid);
            } else {
                remove_unit.insert(character_dto.server_uid);
                continue;
            }
        } else {
            // Only set char if gear is not empty or char does not exist
            if let Some(character_info) = &character_dto.character_history {
                if character_info.character_info.gear.is_naked() {
                    if let Some(character) = armory.get_character_by_uid(server_id, character_dto.server_uid) {
                        if let Some(last_update) = character.last_update {
                            if last_update.character_info.hero_class_id != 12 {
                                continue;
                            }
                        }
                    }
                }
            }
            let _result = armory.set_character(db_main, server_id, character_dto, timestamp);
        }
    }

    {
        let mut upload_progress = live_data_processor.upload_progress.write().unwrap();
        upload_progress.insert(member_id, 50);
    }
    println!("Stop Char processing");

    // Pre-fill instance ids
    let bonus_messages = parser.get_bonus_messages().unwrap_or_else(Vec::new);
    let mut instance_ids = HashMap::new();
    let mut suggested_instances = Vec::new();
    for Message { message_type, timestamp, .. } in bonus_messages.iter() {
        if let MessageType::InstanceMap(map) = message_type {
            // We cant deal with instance whose difficulties share the instance_id, like ICC
            // let instance_id = if map.instance_id == 0 { rand::random::<u32>() } else { map.instance_id };
            let instance_id = rand::random::<u32>();
            let instance_key = (map.map_id as u16, if map.map_difficulty == 0 { None } else { Some(map.map_difficulty) });
            if !instance_ids.contains_key(&instance_key) {
                instance_ids.insert(instance_key, instance_id);
            }
            suggested_instances.push((*timestamp, map.map_id as u16, map.map_difficulty));
        }
    }

    let msg_start = messages[0].timestamp;
    let msg_end = messages[messages.len() - 1].timestamp;
    let mut participants_by_interval = IntervalBucket::new(msg_start as i64, msg_end as i64, 300000);
    let mut player_participants_by_interval = IntervalBucket::new(msg_start as i64, msg_end as i64, 300000);

    let mut parsed_participants = parser.get_participants();
    let incombat_participant_helper = Participant::new(0xF13000FFFE000000, false, "CBT Helper".to_string(), 10000);
    let unknown_participant = Participant::new(0, true, "Unknown".to_string(), 10000);
    participants_by_interval.insert(msg_start as i64, msg_end as i64, incombat_participant_helper.clone());
    participants_by_interval.insert(msg_start as i64, msg_end as i64, unknown_participant.clone());
    player_participants_by_interval.insert(msg_start as i64, msg_end as i64, unknown_participant.clone());

    parsed_participants.iter().for_each(|participant| {
        participant.active_intervals.iter().for_each(|(start, end)| {
            participants_by_interval.insert(*start as i64, *end as i64, participant.clone());
            if participant.is_player {
                player_participants_by_interval.insert(*start as i64, *end as i64, participant.clone());
            }
        });
    });
    parsed_participants.push(incombat_participant_helper);
    parsed_participants.push(unknown_participant);
    let active_maps = parser.get_active_maps();

    let mut current_map: Option<(u16, Option<u8>, u64)> = None;
    let mut participants = HashMap::new();
    let mut last_combat_update = HashMap::new();
    let mut unit_died_recently = HashMap::new();
    let mut additional_messages = Vec::with_capacity(20000);
    let mut unit_last_instance_leave = HashMap::new();
    let mut pom_owner = HashMap::new();
    let mut looking_for_new_pom_owner = None;
    let mut recent_spell_casts: VecDeque<(u64, SpellCast)> = VecDeque::new();

    for Message { timestamp, message_count, message_type, .. } in messages.iter_mut() {
        // Insert Instance Map Messages
        if let Some((map_id, difficulty)) = active_maps.get_current_active_map(&suggested_instances, &player_participants_by_interval, expansion_id, *timestamp) {
            if current_map.is_none() || current_map.unwrap().0 != map_id || current_map.unwrap().1 != difficulty {
                current_map = Some((map_id, difficulty, *timestamp));
                for (unit_id, is_player) in participants.iter() {
                    if let Some(last_cbt_state) = last_combat_update.get(unit_id) {
                        additional_messages.push(Message {
                            api_version: 0,
                            message_length: 0,
                            timestamp: *last_cbt_state + 5,
                            message_count: *message_count,
                            message_type: MessageType::CombatState(CombatState {
                                unit: Unit { is_player: *is_player, unit_id: *unit_id },
                                in_combat: false,
                            }),
                        });
                        last_combat_update.remove(unit_id);
                    }
                }
                participants.clear();
            };

            let mut new_participants: HashMap<u64, (bool, i64, i64)> = HashMap::new();
            for (unit_id, start, end) in participants_by_interval.find_unique_ids(*timestamp as i64).iter().filter(|(unit_id, _, _)| !participants.contains_key(unit_id)) {
                new_participants.insert(*unit_id, (participants_by_interval.value_map.get(unit_id).unwrap().is_player, *start, *end));
            }

            let instance_id = *instance_ids.entry((map_id, difficulty)).or_insert_with(rand::random::<u32>);
            for (unit_id, (is_player, start, _end)) in new_participants {
                let mut ts_offset: i64 = -1;
                if !is_player {
                    if let Some(entry) = unit_id.get_entry() {
                        if let Some(delay) = parser.get_npc_appearance_offset(entry) {
                            ts_offset = delay - 100;
                        }
                    }
                }

                let mut join_instance_ts = (start + ts_offset - 1000) as u64;
                if let Some(last_leave_ts) = unit_last_instance_leave.get(&unit_id) {
                    join_instance_ts = join_instance_ts.max(*last_leave_ts + 1);
                }
                join_instance_ts = join_instance_ts.max(current_map.unwrap().2);

                additional_messages.push(Message::new_parsed(
                    join_instance_ts,
                    *message_count,
                    MessageType::InstanceMap(InstanceMap {
                        map_id: map_id as u32,
                        instance_id,
                        map_difficulty: difficulty.unwrap_or(0),
                        unit: Unit { is_player, unit_id },
                    }),
                ));
                participants.insert(unit_id, is_player);
            }
        } else if current_map.is_some() {
            for (unit_id, is_player) in participants.iter() {
                if let Some(last_cbt_state) = last_combat_update.get(unit_id) {
                    additional_messages.push(Message {
                        api_version: 0,
                        message_length: 0,
                        timestamp: *last_cbt_state + 5,
                        message_count: *message_count,
                        message_type: MessageType::CombatState(CombatState {
                            unit: Unit { is_player: *is_player, unit_id: *unit_id },
                            in_combat: false,
                        }),
                    });
                    last_combat_update.remove(unit_id);
                }

                unit_last_instance_leave.insert(*unit_id, *timestamp + 500);

                additional_messages.push(Message::new_parsed(
                    *timestamp + 500,
                    *message_count,
                    MessageType::InstanceMap(InstanceMap {
                        map_id: 0,
                        instance_id: 0,
                        map_difficulty: 0,
                        unit: Unit { is_player: *is_player, unit_id: *unit_id },
                    }),
                ));
            }
            participants.clear();
            current_map = None;
        }

        // Register timeouts
        if parser.get_expansion_id() == 1 {
            for (index, (ts, spell_cast)) in recent_spell_casts.clone().iter().enumerate().rev() {
                if let Some(spell) = data.get_spell(1, spell_cast.spell_id) {
                    if ((spell.cast_time + 500) as u64) < (*timestamp - *ts) {
                        additional_messages.push(Message::new_parsed(
                            *ts + ((3 * (spell.cast_time / 4)) as u64),
                            *message_count - 1,
                            MessageType::Interrupt(Interrupt {
                                target: spell_cast.caster.clone(),
                                interrupted_spell_id: spell_cast.spell_id
                            }),
                        ));
                        recent_spell_casts.remove(index);
                    }
                } else {
                    recent_spell_casts.remove(index);
                }
            }
        }

        // Insert Combat Start/End Events
        // We assume CBT Start when we see it doing sth
        // We assume end if it dies or after a timeout
        match message_type {
            MessageType::SpellCastAttempt(cast) => {
                if !cast.caster.is_player {
                    recent_spell_casts.push_back((*timestamp, cast.clone()));
                }
            },
            MessageType::MeleeDamage(dmg) | MessageType::SpellDamage(dmg) => {
                static IN_COMBAT_DEATH_TIMEOUT: u64 = 180000;
                static IN_COMBAT_DEATH_IGNORE_IMMEDIATE_TIMEOUT: u64 = 20000;
                let mut ignore = false;
                if unit_died_recently.contains_key(&dmg.attacker.unit_id) && *timestamp - *unit_died_recently.get(&dmg.attacker.unit_id).unwrap() < IN_COMBAT_DEATH_TIMEOUT {
                    ignore = *timestamp - *unit_died_recently.get(&dmg.attacker.unit_id).unwrap() < IN_COMBAT_DEATH_IGNORE_IMMEDIATE_TIMEOUT;
                    if let Some(entry) = dmg.attacker.unit_id.get_entry() {
                        if let Some(ignore_abilities) = parser.get_ignore_after_death_ignore_abilities(entry) {
                            ignore = ignore || ignore_abilities.into_iter().any(|ability_id| dmg.spell_id.contains(&ability_id));
                        }
                    }
                }
                if !ignore {
                    if unit_died_recently.contains_key(&dmg.victim.unit_id) && *timestamp - *unit_died_recently.get(&dmg.victim.unit_id).unwrap() < IN_COMBAT_DEATH_TIMEOUT {
                        ignore = *timestamp - *unit_died_recently.get(&dmg.victim.unit_id).unwrap() < IN_COMBAT_DEATH_IGNORE_IMMEDIATE_TIMEOUT;
                        if let Some(entry) = dmg.victim.unit_id.get_entry() {
                            if let Some(ignore_abilities) = parser.get_ignore_after_death_ignore_abilities(entry) {
                                ignore = ignore || ignore_abilities.into_iter().any(|ability_id| dmg.spell_id.contains(&ability_id));
                            }
                        }
                    }
                }

                ignore = ignore || dmg.victim.unit_id == 0 || dmg.attacker.unit_id == 0 || dmg.spell_id.contains(&72273) || dmg.spell_id.contains(&72550) | dmg.spell_id.contains(&70598);
                if !ignore {
                    add_combat_event(parser, data, expansion_id, &mut additional_messages, &mut last_combat_update, *timestamp, *message_count, &dmg.attacker);
                    add_combat_event(parser, data, expansion_id, &mut additional_messages, &mut last_combat_update, *timestamp, *message_count, &dmg.victim);
                }

                if dmg.attacker.unit_id == 0 {
                    if let Some(spell_id) = dmg.spell_id {
                        if let Some(unit) = find_casting_unit(parser, spell_id, &mut last_combat_update, *timestamp) {
                            dmg.attacker = unit;
                            additional_messages.push(Message::new_parsed(
                                *timestamp - 1,
                                *message_count - 1,
                                MessageType::SpellCast(SpellCast {
                                    caster: dmg.attacker.clone(),
                                    target: Some(dmg.victim.clone()),
                                    spell_id,
                                    hit_mask: dmg.hit_mask,
                                }),
                            ));
                        }
                    }
                }
            }
            MessageType::Heal(heal_done) => {
                if heal_done.target.unit_id.get_entry().contains(&36789) {
                    add_combat_event(parser, data, expansion_id, &mut additional_messages, &mut last_combat_update, *timestamp, *message_count, &heal_done.target);
                }
                if heal_done.caster.unit_id.get_entry().contains(&36789) {
                    add_combat_event(parser, data, expansion_id, &mut additional_messages, &mut last_combat_update, *timestamp, *message_count, &heal_done.caster);
                }

                if heal_done.caster.unit_id == 0 {
                    if let Some(unit) = find_casting_unit(parser, heal_done.spell_id, &mut last_combat_update, *timestamp) {
                        heal_done.caster = unit;
                        additional_messages.push(Message::new_parsed(
                            *timestamp - 1,
                            *message_count - 1,
                            MessageType::SpellCast(SpellCast {
                                caster: heal_done.caster.clone(),
                                target: Some(heal_done.target.clone()),
                                spell_id: heal_done.spell_id,
                                hit_mask: heal_done.hit_mask,
                            }),
                        ));
                    }
                }

                if heal_done.spell_id == 33110 {
                    if let Some(owner_unit_id) = pom_owner.get(&heal_done.caster.unit_id).cloned() {
                        pom_owner.remove(&heal_done.caster.unit_id);
                        looking_for_new_pom_owner = Some(owner_unit_id);
                        heal_done.caster = Unit { unit_id: owner_unit_id, is_player: true };
                        additional_messages.push(Message::new_parsed(
                            *timestamp - 1,
                            *message_count - 1,
                            MessageType::SpellCast(SpellCast {
                                caster: heal_done.caster.clone(),
                                target: Some(heal_done.target.clone()),
                                spell_id: heal_done.spell_id,
                                hit_mask: heal_done.hit_mask,
                            }),
                        ));
                    }
                }
            }
            MessageType::SpellCast(spell_cast) => {
                if spell_cast.spell_id == 33076 {
                    pom_owner.insert(spell_cast.target.as_ref().unwrap().unit_id, spell_cast.caster.unit_id);
                }
            }
            MessageType::AuraApplication(aura_app) => {
                if aura_app.caster.unit_id == 0 {
                    if aura_app.spell_id == 41635 {
                        if aura_app.delta == 1 {
                            if let Some(pom_owner_unit_id) = looking_for_new_pom_owner {
                                pom_owner.insert(aura_app.target.unit_id, pom_owner_unit_id);
                                aura_app.caster = Unit { is_player: true, unit_id: pom_owner_unit_id };
                                looking_for_new_pom_owner = None;
                            }
                        } else if aura_app.delta == -1 {
                            if let Some(owner_unit_id) = pom_owner.get(&aura_app.target.unit_id).cloned() {
                                aura_app.caster = Unit { is_player: true, unit_id: owner_unit_id };
                            }
                        }
                    }

                    if let Some(unit) = find_casting_unit(parser, aura_app.spell_id, &mut last_combat_update, *timestamp) {
                        aura_app.caster = unit;
                    }
                }
            }
            MessageType::Death(death) => {
                if !death.victim.is_player {
                    if let Some(entry) = death.victim.unit_id.get_entry() {
                        if let Some(implied_npc_ids) = parser.get_death_implied_npc_combat_state_and_offset(entry) {
                            for (npc_id, delay_ts, lookahead_delay) in implied_npc_ids {
                                if let Some(unit_id) = parsed_participants.iter().find_map(|participant| {
                                    if !participant.is_player
                                        && participant.id.get_entry().contains(&npc_id)
                                        && participant.id != death.victim.unit_id
                                        && participant
                                        .active_intervals
                                        .iter()
                                        .any(|(start, end)| (*start as i64 - lookahead_delay) as u64 <= *timestamp && *end >= *timestamp)
                                    {
                                        return Some(participant.id);
                                    }
                                    None
                                }) {
                                    if let Some((map_id, difficulty, _)) = current_map {
                                        let instance_id = *instance_ids.entry((map_id, difficulty)).or_insert_with(rand::random::<u32>);
                                        additional_messages.push(Message::new_parsed(
                                            (*timestamp as i64 + delay_ts - 1) as u64,
                                            *message_count - 2,
                                            MessageType::InstanceMap(InstanceMap {
                                                map_id: map_id as u32,
                                                instance_id,
                                                map_difficulty: difficulty.unwrap_or(0),
                                                unit: Unit { is_player: false, unit_id },
                                            }),
                                        ));
                                    }
                                    add_combat_event(
                                        parser,
                                        data,
                                        expansion_id,
                                        &mut additional_messages,
                                        &mut last_combat_update,
                                        (*timestamp as i64 + delay_ts) as u64,
                                        *message_count - 1,
                                        &Unit { is_player: false, unit_id },
                                    );
                                }
                            }
                        }
                    }
                }

                additional_messages.push(Message {
                    api_version: 0,
                    message_length: 0,
                    timestamp: *timestamp + 5,
                    message_count: *message_count,
                    message_type: MessageType::CombatState(CombatState { unit: death.victim.clone(), in_combat: false }),
                });
                last_combat_update.remove(&death.victim.unit_id);
                unit_died_recently.insert(death.victim.unit_id, *timestamp);
            }
            _ => {}
        };
    }

    {
        let mut upload_progress = live_data_processor.upload_progress.write().unwrap();
        upload_progress.insert(member_id, 80);
    }

    // Artificially set in combat to false at the end for each in combat npc
    for (entry, last_update_ts) in last_combat_update.iter() {
        let last_in_combat_msg = additional_messages
            .iter()
            .rev()
            .find(|msg| match &msg.message_type {
                MessageType::CombatState(state) => state.unit.unit_id == *entry,
                _ => false,
            })
            .cloned();

        if let Some(msg) = last_in_combat_msg {
            if let MessageType::CombatState(state) = msg.message_type {
                if state.in_combat {
                    additional_messages.push(Message {
                        api_version: 0,
                        message_length: 0,
                        timestamp: *last_update_ts + 100,
                        message_count: messages.len() as u64 + 1,
                        message_type: MessageType::CombatState(CombatState { unit: state.unit, in_combat: false }),
                    });
                }
            }
        }
    }

    messages.append(&mut bonus_messages.into_iter().filter(|msg| {
        match &msg.message_type {
            MessageType::InstanceMap(_) => false,
            _ => true
        }
    }).collect());
    messages.append(&mut additional_messages);
    if server_id == 4 || server_id == 5 {
        // Dont remove unknown unit
        remove_unit.remove(&0);
        messages = messages
            .into_iter()
            .filter(|msg| !is_in_remove_list(&remove_unit, &msg.message_type))
            .map(|mut msg| {
                replace_ids(&replace_unit_id, &mut msg.message_type);
                msg
            })
            .collect();
    }
    messages.sort_by(|left, right| left.timestamp.cmp(&right.timestamp));

    {
        let mut upload_progress = live_data_processor.upload_progress.write().unwrap();
        upload_progress.insert(member_id, 99);
    }

    Some((server_id, messages))
}

fn replace_ids(replace_unit_id: &HashMap<u64, u64>, message_type: &mut MessageType) {
    match message_type {
        MessageType::SpellDamage(dmg) | MessageType::MeleeDamage(dmg) => {
            replace_id(replace_unit_id, &mut dmg.attacker);
            replace_id(replace_unit_id, &mut dmg.victim);
        }
        MessageType::Heal(heal) => {
            replace_id(replace_unit_id, &mut heal.caster);
            replace_id(replace_unit_id, &mut heal.target);
        }
        MessageType::Death(death) => {
            replace_id(replace_unit_id, &mut death.victim);
        }
        MessageType::AuraApplication(aura) => {
            replace_id(replace_unit_id, &mut aura.caster);
            replace_id(replace_unit_id, &mut aura.target);
        }
        // Aura Cast always None
        MessageType::SpellSteal(un_aura) | MessageType::Dispel(un_aura) => {
            replace_id(replace_unit_id, &mut un_aura.un_aura_caster);
            replace_id(replace_unit_id, &mut un_aura.target);
        }
        MessageType::Interrupt(interrupt) => {
            replace_id(replace_unit_id, &mut interrupt.target);
        }
        MessageType::SpellCast(cast) => {
            replace_id(replace_unit_id, &mut cast.caster);
            if let Some(target) = &mut cast.target {
                replace_id(replace_unit_id, target);
            }
        }
        MessageType::Summon(summon) => {
            replace_id(replace_unit_id, &mut summon.unit);
            replace_id(replace_unit_id, &mut summon.owner);
        }
        MessageType::CombatState(cbt) => {
            replace_id(replace_unit_id, &mut cbt.unit);
        }
        MessageType::InstanceMap(map) => {
            replace_id(replace_unit_id, &mut map.unit);
        }
        _ => {}
    };
}

fn replace_id(replace_unit_id: &HashMap<u64, u64>, unit: &mut Unit) {
    if unit.is_player {
        if let Some(char_id) = replace_unit_id.get(&unit.unit_id) {
            unit.unit_id = *char_id;
        } else {
            unit.unit_id = 0;
        }
    }
}

fn is_in_remove_list(remove_unit: &BTreeSet<u64>, message_type: &MessageType) -> bool {
    match &message_type {
        MessageType::SpellDamage(dmg) | MessageType::MeleeDamage(dmg) => remove_unit.contains(&dmg.attacker.unit_id) || remove_unit.contains(&dmg.victim.unit_id),
        MessageType::Heal(heal) => remove_unit.contains(&heal.caster.unit_id) || remove_unit.contains(&heal.target.unit_id),
        MessageType::Death(death) => remove_unit.contains(&death.victim.unit_id),
        MessageType::AuraApplication(aura) => remove_unit.contains(&aura.caster.unit_id) || remove_unit.contains(&aura.target.unit_id),
        // Aura Cast always None
        MessageType::SpellSteal(un_aura) | MessageType::Dispel(un_aura) => remove_unit.contains(&un_aura.un_aura_caster.unit_id) || remove_unit.contains(&un_aura.target.unit_id),
        MessageType::Interrupt(interrupt) => remove_unit.contains(&interrupt.target.unit_id),
        MessageType::SpellCast(cast) => remove_unit.contains(&cast.caster.unit_id) || (cast.target.is_some() && remove_unit.contains(&cast.target.as_ref().unwrap().unit_id)),
        MessageType::Summon(summon) => remove_unit.contains(&summon.unit.unit_id) || remove_unit.contains(&summon.owner.unit_id),
        MessageType::CombatState(cbt) => remove_unit.contains(&cbt.unit.unit_id),
        MessageType::InstanceMap(map) => remove_unit.contains(&map.unit.unit_id),
        _ => false,
    }
}

fn add_combat_event(parser: &impl CombatLogParser, data: &Data, expansion_id: u8, additional_messages: &mut Vec<Message>, last_combat_update: &mut HashMap<u64, u64>, current_timestamp: u64, current_message_count: u64, unit: &Unit) {
    let mut ts_offset: i64 = -1;
    let mut timeout = 60000;
    let mut current_unit_is_boss = false;
    if let Some(entry) = unit.unit_id.get_entry() {
        if let Some(delay) = parser.get_npc_in_combat_offset(entry) {
            ts_offset = delay;
        }

        if let Some(implied_in_combat_npc_ids) = parser.get_in_combat_implied_npc_combat(entry) {
            for (unit_id, ts) in last_combat_update.clone() {
                if current_timestamp - ts >= 60000 {
                    continue;
                }

                for npc_id in &implied_in_combat_npc_ids {
                    if unit_id.get_entry().contains(npc_id) {
                        add_combat_event(parser, data, expansion_id, additional_messages, last_combat_update, current_timestamp, current_message_count, &Unit { is_player: false, unit_id });
                    }
                }
            }
        }

        if let Some(delay) = parser.get_npc_timeout(entry) {
            timeout = delay;
        }

        // For bosses consider timeout of same entry not unit id
        current_unit_is_boss = data.get_npc(expansion_id, entry).map(|npc| npc.is_boss).contains(&true);
        if current_unit_is_boss {
            for (unit_id, last_update) in last_combat_update.clone() {
                // Due to the delay ts, current_timestamp can be < last_update.
                // TODO: Look into it if the delay ts makes sense at all.
                if unit_id.get_entry().contains(&entry) && current_timestamp > last_update && current_timestamp - last_update >= timeout {
                    additional_messages.push(Message {
                        api_version: 0,
                        message_length: 0,
                        timestamp: current_timestamp - (current_timestamp - last_update) + 10,
                        message_count: current_message_count,
                        message_type: MessageType::CombatState(CombatState {
                            unit: Unit { is_player: false, unit_id },
                            in_combat: false,
                        }),
                    });
                    last_combat_update.remove(&unit_id);
                }
            }
        }
    } else if !unit.is_player {
        timeout = 20000;
    }

    if let Some(last_update) = last_combat_update.get_mut(&unit.unit_id) {
        if current_timestamp - *last_update >= timeout {
            if !current_unit_is_boss {
                additional_messages.push(Message {
                    api_version: 0,
                    message_length: 0,
                    timestamp: current_timestamp - (current_timestamp - *last_update) + 10,
                    message_count: current_message_count,
                    message_type: MessageType::CombatState(CombatState { unit: unit.clone(), in_combat: false }),
                });
            }
            additional_messages.push(Message {
                api_version: 0,
                message_length: 0,
                timestamp: (current_timestamp as i64 + ts_offset - 10) as u64,
                message_count: current_message_count,
                message_type: MessageType::CombatState(CombatState { unit: unit.clone(), in_combat: true }),
            });
        }
        *last_update = current_timestamp;
    } else {
        additional_messages.push(Message {
            api_version: 0,
            message_length: 0,
            timestamp: (current_timestamp as i64 + ts_offset - 10) as u64,
            message_count: current_message_count,
            message_type: MessageType::CombatState(CombatState { unit: unit.clone(), in_combat: true }),
        });
        last_combat_update.insert(unit.unit_id, current_timestamp);
    }
}

fn find_casting_unit(parser: &impl CombatLogParser, ability_id: u32, last_combat_update: &mut HashMap<u64, u64>, timestamp: u64) -> Option<Unit> {
    let npc_id = parser.get_ability_caster(ability_id)?;
    let mut potential_candidates = last_combat_update.iter()
        .filter(|(unit_id, last_cbt)| unit_id.get_entry().contains(&npc_id) && timestamp - *last_cbt <= 120000)
        .collect::<Vec<(&u64, &u64)>>();
    potential_candidates.sort_by(|left, right| right.1.cmp(left.1));
    potential_candidates.first().map(|(unit_id, _)| Unit { is_player: false, unit_id: **unit_id })
}