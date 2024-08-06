use crate::modules::live_data_processor::tools::payload_mapper::instance_arena::MapInstanceArena;

#[test]
fn map_instance_arena_positive() {
    // Arrange
    let payload = vec![
        23, 0, 0, 0, // MapId
        34, 0, 0, 0, // InstanceId
        1, // Winner
        111, 0, 0, 0, 0, 0, 0, 0, // TeamId1
        121, 0, 0, 0, 0, 0, 0, 0, // TeamId2
        246, 255, 255, 255, // TeamChange 1
        10, 0, 0, 0, // TeamChange 2
    ];

    // Act
    let result = payload.to_instance_arena();

    // Assert
    assert!(result.is_ok());
    let instance_arena = result.unwrap();
    assert_eq!(instance_arena.map_id, 23);
    assert_eq!(instance_arena.instance_id, 34);
    assert_eq!(instance_arena.winner, 1);
    assert_eq!(instance_arena.team_id1, 111);
    assert_eq!(instance_arena.team_id2, 121);
    assert_eq!(instance_arena.team_change1, -10);
    assert_eq!(instance_arena.team_change2, 10);
}

#[test]
fn map_instance_arena_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_instance_arena();

    // Assert
    assert!(result.is_err());
}
