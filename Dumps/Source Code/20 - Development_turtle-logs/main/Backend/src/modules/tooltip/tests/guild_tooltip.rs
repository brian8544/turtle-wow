use crate::modules::{
    armory::{
        domain_value::{CharacterGear, CharacterGuild, CharacterInfo, GuildRank},
        material::{Character, CharacterHistory, Guild},
        tools::GetGuild,
        Armory,
    },
    tooltip::{tools::RetrieveGuildTooltip, Tooltip},
};
use std::cmp::Ordering;

fn build_character_guild(guild_id: u32) -> CharacterGuild {
    CharacterGuild {
        guild_id,
        rank: GuildRank { index: 0, name: "".to_string() },
    }
}

fn build_character_history(enable_character_guild: bool, guild_id: u32) -> CharacterHistory {
    CharacterHistory {
        id: 0,
        character_id: 0,
        character_info: CharacterInfo {
            id: 0,
            gear: CharacterGear {
                id: 0,
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
            hero_class_id: 0,
            level: 0,
            gender: false,
            profession1: None,
            profession2: None,
            talent_specialization: None,
            race_id: 0,
        },
        character_name: "".to_string(),
        character_guild: if enable_character_guild { Some(build_character_guild(guild_id)) } else { None },
        character_title: None,
        profession_skill_points1: None,
        profession_skill_points2: None,
        facial: None,
        arena_teams: vec![],
        timestamp: 0,
    }
}

fn build_character(enable_character_history: bool, enable_character_guild: bool, guild_id: u32) -> Character {
    Character {
        id: 0,
        server_id: 0,
        server_uid: 0,
        last_update: if enable_character_history { Some(build_character_history(enable_character_guild, guild_id)) } else { None },
        history_moments: vec![],
    }
}

fn build_guild(guild_id: u32, guild_name: String) -> Guild {
    Guild {
        id: guild_id,
        server_id: 0,
        server_uid: 0,
        name: guild_name,
        ranks: vec![],
    }
}

#[test]
fn improved_acts() {
    // Test requirements generated with ACTS tool
    //
    //  [0] = *`characters` size*:                                    `0` = zero, `1` = one,    `2` = more than one
    //  [1] = *`characters` with `last_update` being not none*:       `0` = none, `1` = one,    `2` = more than one
    //  [2] = *`characters` with `character_guild` being not none*:   `0` = none, `1` = one,    `2` = more than one
    //  [3] = *`characters` with `guild_id` being zero*:              `0` = none, `1` = one,    `2` = more than one
    //  [4] = *`characters` with `guild_id` being others*:            `0` = none, `1` = one,    `2` = more than one
    //  [5] = *`characters` with `guild_id` being maximum `u32`*:     `0` = none, `1` = one,    `2` = more than one
    //  [6] = *`guilds` size*:                                        `0` = zero, `1` = one,    `2` = more than one
    //  [7] = *`guilds` with `id` being zero*:                        `0` = none, `1` = one
    //  [8] = *`guilds` with `id` being others*:                      `0` = none, `1` = one,    `2` = more than one
    //  [9] = *`guilds` with `id` being maximum `u32`*:               `0` = none, `1` = one
    // [10] = *`guilds` with `name` being empty*:                     `0` = none, `1` = one,    `2` = more than one
    // [11] = *`guilds` with `name` having one character*:            `0` = none, `1` = one,    `2` = more than one
    // [12] = *`guilds` with `name` having more than one characters*: `0` = none, `1` = one,    `2` = more than one
    // [13] = *`guild_id` value*:                                     `0` = zero, `1` = others, `2` = maximum `u32`
    // [14] = *guild with `guild_id` exists*:                         `0` = true, `1` = false
    // [15] = *`characters` associated with `guild_id`*:              `0` = none, `1` = one,    `2` = more than one
    //
    // The 2-dimensional array of the test requirements has each test requirement in the first axis and the equivalence classes in the second axis.
    //
    // The following ACTS input file has been used to generate the test requirements:
    //
    // [Parameter]
    // q0 (enum) :  A0, A1, A2
    // q1 (enum) :  B0, B1, B2
    // q2 (enum) :  C0, C1, C2
    // q3 (enum) :  D0, D1, D2
    // q4 (enum) :  E0, E1, E2
    // q5 (enum) :  F0, F1, F2
    // q6 (enum) :  G0, G1, G2
    // q7 (enum) :  H0, H1
    // q8 (enum) :  I0, I1, I2
    // q9 (enum) :  J0, J1
    // q10 (enum) : K0, K1, K2
    // q11 (enum) : L0, L1, L2
    // q12 (enum) : M0, M1, M2
    // q13 (enum) : N0, N1, N2
    // q14 (enum) : O0, O1
    // q15 (enum) : P0, P1, P2
    //
    // [Constraint]
    // (q0 = "A0") => (q1 = "B0")
    // (q0 = "A1") => (q1 = "B0" || q1 = "B1")
    // (q1 = "B0") => (q2 = "C0")
    // (q1 = "B1") => (q2 = "C0" || q2 = "C1")
    // (q2 = "C0") => (q3 = "D0" && q4 = "E0" && q5 = "F0")
    // (q2 = "C1") => ((q3 = "D1" && q4 = "E0" && q5 = "F0") || (q3 = "D0" && q4 = "E1" && q5 = "F0") || (q3 = "D0" && q4 = "E0" && q5 = "F1"))
    // (q6 = "G0") => (q7 = "H0" && q8 = "I0" && q9 = "J0")
    // (q6 = "G1") => ((q7 = "H1" && q8 = "I0" && q9 = "J0") || (q7 = "H0" && q8 = "I1" && q9 = "J0") || (q7 = "H0" && q8 = "I0" && q9 = "J1"))
    // (q6 = "G0") => (q10 = "K0" && q11 = "L0" && q12 = "M0")
    // (q6 = "G1") => ((q10 = "K1" && q11 = "L0" && q12 = "M0") || (q10 = "K0" && q11 = "L1" && q12 = "M0") || (q10 = "K0" && q11 = "L0" && q12 = "M1"))
    // (q8 = "I2" || q10 = "K2" || q11 = "L2" || q12 = "M2") => (q6 = "G2")
    // ((q7 = "H1" && q8 = "I1") || (q7 = "H1" && q9 = "J1") || (q8 = "I1" && q9 = "J1") || (q7 = "H1" && q8 = "I1" && q9 = "J1")) => (q6 = "G2")
    // ((q10 = "K1" && q11 = "L1") || (q10 = "K1" && q12 = "M1") || (q11 = "L1" && q12 = "M1") || (q10 = "K1" && q11 = "L1" && q12 = "M1")) => (q6 = "G2")
    // (q14 = "O0") => (q6 != "G0")
    // (q14 = "O0" && q13 = "N0") => (q7 = "H1")
    // (q14 = "O0" && q13 = "N1") => (q8 = "I1" || q8 = "I2")
    // (q14 = "O0" && q13 = "N2") => (q9 = "J1")
    // (q15 = "P0" && q13 = "N0") => (q3 = "D0")
    // (q15 = "P0" && q13 = "N2") => (q5 = "F0")
    // (q15 = "P1" && q13 = "N0") => (q3 = "D1")
    // (q15 = "P1" && q13 = "N1") => (q4 = "E1" || q4 = "E2")
    // (q15 = "P1" && q13 = "N2") => (q5 = "F1")
    // (q15 = "P2" && q13 = "N0") => (q3 = "D2")
    // (q15 = "P2" && q13 = "N1") => (q4 = "E2")
    // (q15 = "P2" && q13 = "N2") => (q5 = "F2")
    // (q15 = "P1" || q15 = "P2") => (q14 = "O0")
    // (q14 = "O1" && q13 = "N0") => (q7 = "H0")
    // (q14 = "O1" && q13 = "N1") => (q8 = "I0")
    // (q14 = "O1" && q13 = "N2") => (q9 = "J0")
    //
    let test_requirements: [[u8; 16]; 30] = [
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 2, 1, 2, 1, 2, 1, 1, 2, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [2, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
        [2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 0, 2, 2, 1, 0, 1],
        [2, 1, 0, 0, 0, 0, 2, 0, 0, 1, 2, 2, 2, 0, 1, 0],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [2, 2, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 2, 1, 0],
        [2, 2, 2, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [2, 2, 2, 1, 2, 2, 1, 0, 1, 0, 1, 0, 0, 1, 0, 2],
        [2, 2, 2, 2, 0, 2, 2, 1, 1, 1, 2, 1, 1, 2, 0, 2],
        [2, 2, 2, 1, 1, 1, 2, 1, 2, 0, 2, 0, 1, 0, 0, 1],
        [2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [2, 2, 2, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [2, 2, 2, 2, 2, 0, 1, 1, 0, 0, 1, 0, 0, 2, 1, 0],
        [1, 1, 1, 0, 0, 1, 2, 1, 2, 1, 1, 2, 2, 2, 0, 1],
        [2, 2, 2, 1, 2, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 2, 2, 0, 1, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 2, 1, 2, 0, 0, 2],
        [1, 1, 1, 1, 0, 0, 2, 0, 0, 0, 2, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 1, 1, 1, 2, 1, 0],
        [2, 2, 2, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 0, 2],
        [2, 2, 2, 2, 2, 0, 2, 1, 0, 0, 0, 2, 1, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 2, 0, 2, 1, 0, 0],
        [1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
        [2, 2, 2, 1, 2, 2, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [2, 2, 2, 0, 2, 2, 1, 0, 0, 1, 0, 1, 0, 2, 0, 2],
    ];
    for test_requirement in test_requirements.iter() {
        let armory = Armory::default();
        {
            let mut characters = armory.characters.write().unwrap();
            // add characters with guild_id = 0 required by test requirement
            for _ in 0..test_requirement[3] {
                let characters_len = characters.len() as u32;
                characters.insert(characters_len, build_character(true, true, 0));
            }
            // add characters with guild_id != 0 and guild_id != u32::MAX required by test requirement
            for i in 0..test_requirement[4] {
                let characters_len = characters.len() as u32;
                // if it is required to only have exactly one character associated with the guild, give all characters other guilds
                characters.insert(characters_len, build_character(true, true, if test_requirement[15] == 1 { (i + 1) as u32 } else { 1 }));
            }
            // add characters with guild_id = u32::MAX required by test requirement
            for _ in 0..test_requirement[5] {
                let characters_len = characters.len() as u32;
                characters.insert(characters_len, build_character(true, true, u32::MAX));
            }
            // we don't need to look at test_requirement[2] vs. the current amount of characters, because this is covered with the constraints
            // add (eventually two) characters without character_guild if number of characters not reached
            if test_requirement[1] > test_requirement[2] {
                let characters_len = characters.len() as u32;
                characters.insert(characters_len, build_character(true, false, 0));
            }
            if test_requirement[1] > test_requirement[2] {
                let characters_len = characters.len() as u32;
                characters.insert(characters_len, build_character(true, false, 0));
            }
            // add (eventually two) characters without last_update if number of characters not reached
            if test_requirement[0] > test_requirement[1] {
                let characters_len = characters.len() as u32;
                characters.insert(characters_len, build_character(false, false, 0));
            }
            if test_requirement[0] > test_requirement[1] {
                let characters_len = characters.len() as u32;
                characters.insert(characters_len, build_character(false, false, 0));
            }
        }
        {
            // calculate the required size of guilds: each item of the following array contains the amount of values required in this class (side note: integer overflows not possible because input values are in range 0..3)
            let mut amounts_in_id_classes = [test_requirement[7], test_requirement[8], test_requirement[9]];
            let mut amounts_in_name_classes = [test_requirement[10], test_requirement[11], test_requirement[12]];
            let amount_difference = amounts_in_id_classes.iter().sum::<u8>() as i8 - amounts_in_name_classes.iter().sum::<u8>() as i8;
            match amount_difference.cmp(&0) {
                Ordering::Less => {
                    // increase first `more than one` by the difference
                    for amount in &mut amounts_in_id_classes {
                        if *amount == 2 {
                            *amount += (-amount_difference) as u8;
                            break;
                        }
                    }
                },
                Ordering::Greater => {
                    // increase first `more than one` by the difference
                    for amount in &mut amounts_in_name_classes {
                        if *amount == 2 {
                            *amount += (amount_difference) as u8;
                            break;
                        }
                    }
                },
                Ordering::Equal => {},
            }
            // build iterators to iterate over values: from above we have classes with amounts, convert them into vectors of required size (by repeating values based on amount), do that both for guild_id and guild_name
            let id_classes = amounts_in_id_classes.iter().enumerate().fold(vec![], |accumulator, (i, amount)| [accumulator, vec![i; *amount as usize]].concat());
            let id_values = id_classes.iter().enumerate().map(|(i, id)| match id {
                0 => 0_u32,
                1 => {
                    if test_requirement[7] == 1 {
                        i as u32
                    } else {
                        (i + 1) as u32
                    }
                },
                _ => u32::MAX, // id = 2
            });
            let name_classes = amounts_in_name_classes.iter().enumerate().fold(vec![], |accumulator, (i, amount)| [accumulator, vec![i; *amount as usize]].concat());
            let name_values = name_classes.iter().map(|name| match name {
                0 => "".to_string(),
                1 => "h".to_string(),
                _ => "hs".to_string(), // name = 2
            });
            // insert guilds by iterating over zipped `guild_id` and `guild_name` iterators
            let mut guilds = armory.guilds.write().unwrap();
            for (id, name) in id_values.zip(name_values) {
                guilds.insert(id, build_guild(id, name));
            }
        }
        // create `guild_id` parameter: 0 or u32::MAX are used without looking at other requirements (constraints are used for that)
        // for `guild_id` being between 0 and u32::MAX, we either need to find a valid/invalid guild_id based on requirement [14]
        let mut guild_id: u32 = 0;
        if test_requirement[13] == 2 {
            guild_id = u32::MAX;
        } else if test_requirement[13] == 1 {
            // if a guild with `guild_id` should exist
            if test_requirement[14] == 0 {
                // find guild that has its `guild_id` in the required range
                for (id, _) in armory.guilds.read().unwrap().iter() {
                    if *id > 0 && *id < u32::MAX {
                        // count the number of characters associated with this guild
                        let characters = armory.characters.read().unwrap();
                        let count = characters
                            .iter()
                            .filter(|(_, character)| character.last_update.is_some())
                            .filter(|(_, character)| character.last_update.as_ref().unwrap().character_guild.is_some())
                            .filter(|(_, character)| character.last_update.as_ref().unwrap().character_guild.as_ref().unwrap().guild_id == *id)
                            .count();
                        // the number of characters must match test_requirement[15]
                        if (count == 0 && test_requirement[15] == 0) || (count == 1 && test_requirement[15] == 1) || (count > 1 && test_requirement[15] == 2) {
                            guild_id = *id;
                            break;
                        }
                    }
                }
                // when reaching this point, no matching guild_id has been found, this is an invalid test case
                assert_ne!(guild_id, 0);
            } else {
                // find guild that has its `guild_id` outside of the required range
                for (id, _) in armory.guilds.read().unwrap().iter() {
                    if *id == 0 || *id == u32::MAX {
                        guild_id = *id;
                        break;
                    }
                }
            }
        }
        // comment in for debug output
        // for (_, character) in armory.characters.read().unwrap().iter() {
        //     if character.last_update.is_none() {
        //         println!("Character: last_update is none");
        //     } else if character.last_update.as_ref().unwrap().character_guild.is_none() {
        //         println!("Character: character_guild is none");
        //     } else {
        //         println!("Character: associated with guild {}", character.last_update.as_ref().unwrap().character_guild.as_ref().unwrap().guild_id);
        //     }
        // }
        // for (id, guild) in armory.guilds.read().unwrap().iter() {
        //     println!("Guild: {} {}", id, guild.name);
        // }
        // actually execute the function under test
        let tooltip = Tooltip::default();
        let tooltip_res = tooltip.get_guild(&armory, guild_id);
        if test_requirement[14] == 0 {
            assert!(
                tooltip_res.is_ok(),
                "result should be valid while applying test vector: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]",
                test_requirement[0],
                test_requirement[1],
                test_requirement[2],
                test_requirement[3],
                test_requirement[4],
                test_requirement[5],
                test_requirement[6],
                test_requirement[7],
                test_requirement[8],
                test_requirement[9],
                test_requirement[10],
                test_requirement[11],
                test_requirement[12],
                test_requirement[13],
                test_requirement[14],
                test_requirement[15]
            );
            let tooltip = tooltip_res.unwrap();
            let guild = armory.get_guild(guild_id).unwrap();
            assert_eq!(
                tooltip.guild_id,
                guild_id,
                "resulting guild_id should be the same guild_id from the input parameters while applying test vector: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]",
                test_requirement[0],
                test_requirement[1],
                test_requirement[2],
                test_requirement[3],
                test_requirement[4],
                test_requirement[5],
                test_requirement[6],
                test_requirement[7],
                test_requirement[8],
                test_requirement[9],
                test_requirement[10],
                test_requirement[11],
                test_requirement[12],
                test_requirement[13],
                test_requirement[14],
                test_requirement[15]
            );
            assert_eq!(
                tooltip.guild_name,
                guild.name,
                "resulting guild_name should be the same as stored in the armory while applying test vector: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]",
                test_requirement[0],
                test_requirement[1],
                test_requirement[2],
                test_requirement[3],
                test_requirement[4],
                test_requirement[5],
                test_requirement[6],
                test_requirement[7],
                test_requirement[8],
                test_requirement[9],
                test_requirement[10],
                test_requirement[11],
                test_requirement[12],
                test_requirement[13],
                test_requirement[14],
                test_requirement[15]
            );
            match test_requirement[15] {
                0 => {
                    assert_eq!(
                        tooltip.num_member,
                        0,
                        "resulting count should be zero while applying test vector: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]",
                        test_requirement[0],
                        test_requirement[1],
                        test_requirement[2],
                        test_requirement[3],
                        test_requirement[4],
                        test_requirement[5],
                        test_requirement[6],
                        test_requirement[7],
                        test_requirement[8],
                        test_requirement[9],
                        test_requirement[10],
                        test_requirement[11],
                        test_requirement[12],
                        test_requirement[13],
                        test_requirement[14],
                        test_requirement[15]
                    );
                },
                1 => {
                    assert_eq!(
                        tooltip.num_member,
                        1,
                        "resulting count should be one while applying test vector: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]",
                        test_requirement[0],
                        test_requirement[1],
                        test_requirement[2],
                        test_requirement[3],
                        test_requirement[4],
                        test_requirement[5],
                        test_requirement[6],
                        test_requirement[7],
                        test_requirement[8],
                        test_requirement[9],
                        test_requirement[10],
                        test_requirement[11],
                        test_requirement[12],
                        test_requirement[13],
                        test_requirement[14],
                        test_requirement[15]
                    );
                },
                2 => {
                    assert!(
                        tooltip.num_member > 1,
                        "resulting count should be more than one while applying test vector: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]",
                        test_requirement[0],
                        test_requirement[1],
                        test_requirement[2],
                        test_requirement[3],
                        test_requirement[4],
                        test_requirement[5],
                        test_requirement[6],
                        test_requirement[7],
                        test_requirement[8],
                        test_requirement[9],
                        test_requirement[10],
                        test_requirement[11],
                        test_requirement[12],
                        test_requirement[13],
                        test_requirement[14],
                        test_requirement[15]
                    );
                },
                _ => {
                    panic!("unimplemented: test_requirement[15] being not 0, 1 or 2");
                },
            }
        } else {
            assert!(
                !tooltip_res.is_ok(),
                "result should be invalid while applying test vector: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]",
                test_requirement[0],
                test_requirement[1],
                test_requirement[2],
                test_requirement[3],
                test_requirement[4],
                test_requirement[5],
                test_requirement[6],
                test_requirement[7],
                test_requirement[8],
                test_requirement[9],
                test_requirement[10],
                test_requirement[11],
                test_requirement[12],
                test_requirement[13],
                test_requirement[14],
                test_requirement[15]
            );
        }
    }
}
