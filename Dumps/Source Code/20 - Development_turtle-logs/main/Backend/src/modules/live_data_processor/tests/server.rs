use crate::modules::armory::Armory;
use crate::modules::data::Data;
use crate::modules::live_data_processor::dto::{DamageComponent, DamageDone, InstanceMap, Message, MessageType, Position, SpellCast, Unit};
use crate::modules::live_data_processor::material::Server;
use crate::tests::TestContainer;

#[test]
#[ignore]
fn parse_spell_damage() {
    let container = TestContainer::new(true);
    let (mut conn, _dns, _node) = container.run();

    // Arrange
    let server_id = 2;
    let mut server = Server::new(server_id, 2);
    let armory = Armory::default();
    let data = Data::default();
    let member_id = 23;

    let caster_unit_id = 0xF140000000000000 + 40;
    let target_unit_id = 0xF140000000000000 + 43;
    let caster_instance_id = 42;
    let messages = vec![
        Message {
            message_count: 0,
            api_version: 0,
            message_length: 0,
            timestamp: 0,
            message_type: MessageType::InstanceMap(InstanceMap {
                map_id: 249,
                instance_id: caster_instance_id,
                map_difficulty: 0,
                unit: Unit { is_player: false, unit_id: caster_unit_id },
            }),
        },
        Message {
            message_count: 1,
            api_version: 0,
            message_length: 0,
            timestamp: 0,
            message_type: MessageType::InstanceMap(InstanceMap {
                map_id: 249,
                instance_id: caster_instance_id,
                map_difficulty: 0,
                unit: Unit { is_player: false, unit_id: target_unit_id },
            }),
        },
        Message {
            message_count: 2,
            api_version: 0,
            message_length: 0,
            timestamp: 0,
            message_type: MessageType::Position(Position {
                unit: Unit { is_player: false, unit_id: caster_unit_id },
                x: 0,
                y: 0,
                z: 0,
                orientation: 0,
            }),
        },
        Message {
            message_count: 3,
            api_version: 0,
            message_length: 0,
            timestamp: 0,
            message_type: MessageType::Position(Position {
                unit: Unit { is_player: false, unit_id: target_unit_id },
                x: 0,
                y: 0,
                z: 0,
                orientation: 0,
            }),
        },
        Message {
            message_count: 4,
            api_version: 0,
            message_length: 0,
            timestamp: 0,
            message_type: MessageType::SpellDamage(DamageDone {
                attacker: Unit { is_player: false, unit_id: caster_unit_id },
                victim: Unit { is_player: false, unit_id: target_unit_id },
                spell_id: Some(26),
                hit_mask: 1,
                blocked: 1,
                damage_components: vec![DamageComponent {
                    school_mask: 2,
                    damage: 10,
                    resisted_or_glanced: 1,
                    absorbed: 1,
                }],
                damage_over_time: false,
            }),
        },
    ];

    // Act + Assert
    let parse_result1 = server.parse_events(&mut conn, &armory, &data, messages, member_id);
    assert!(parse_result1.is_ok());
    assert_eq!(server.non_committed_events.get(&caster_unit_id).unwrap().len(), 1);
    assert_eq!(server.committed_events.get(&(caster_instance_id, member_id)).unwrap().len(), 2);

    let messages = vec![Message {
        message_count: 5,
        api_version: 0,
        message_length: 0,
        timestamp: 5,
        message_type: MessageType::SpellCast(SpellCast {
            caster: Unit { is_player: false, unit_id: caster_unit_id },
            target: Some(Unit { is_player: false, unit_id: target_unit_id }),
            spell_id: 26,
            hit_mask: 7,
        }),
    }];

    let parse_result2 = server.parse_events(&mut conn, &armory, &data, messages, member_id);
    assert!(parse_result2.is_ok());
    assert_eq!(server.non_committed_events.get(&caster_unit_id).unwrap().len(), 2);

    let messages = vec![Message {
        message_count: 6,
        api_version: 0,
        message_length: 0,
        timestamp: 75,
        message_type: MessageType::SpellCast(SpellCast {
            caster: Unit { is_player: false, unit_id: target_unit_id },
            target: Some(Unit {
                is_player: false,
                unit_id: 0xF140000000000000 + 22,
            }),
            spell_id: 22,
            hit_mask: 1,
        }),
    }];

    let parse_result3 = server.parse_events(&mut conn, &armory, &data, messages, member_id);
    assert!(parse_result3.is_ok());

    let messages = vec![Message {
        message_count: 7,
        api_version: 0,
        message_length: 0,
        timestamp: 75,
        message_type: MessageType::SpellCast(SpellCast {
            caster: Unit { is_player: false, unit_id: target_unit_id },
            target: Some(Unit {
                is_player: false,
                unit_id: 0xF140000000000000 + 22,
            }),
            spell_id: 22,
            hit_mask: 1,
        }),
    }];

    let parse_result4 = server.parse_events(&mut conn, &armory, &data, messages, member_id);
    assert!(parse_result4.is_ok());
    assert_eq!(server.committed_events.get(&(caster_instance_id, member_id)).unwrap().len(), 5);
    assert!(!server.non_committed_events.contains_key(&caster_unit_id));
}
