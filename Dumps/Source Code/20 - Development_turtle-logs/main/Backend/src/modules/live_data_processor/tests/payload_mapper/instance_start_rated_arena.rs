use crate::modules::live_data_processor::tools::payload_mapper::instance_start_rated_arena::MapInstanceStartRatedArena;

#[test]
fn map_instance_start_rated_arena_positive() {
    // Arrange
    let payload = vec![
        22, 0, 0, 0, // MapId
        33, 0, 0, 0, // InstanceId
        1, 0, 0, 0, 0, 0, 0, 0, // Team ID 1
        2, 0, 0, 0, 0, 0, 0, 0, // Team ID 2
    ];

    // Act
    let result = payload.to_instance_start_rated_arena();

    // Assert
    assert!(result.is_ok());
    let instance = result.unwrap();
    assert_eq!(instance.map_id, 22);
    assert_eq!(instance.instance_id, 33);
    assert_eq!(instance.team_id1, 1);
    assert_eq!(instance.team_id2, 2);
}

#[test]
fn map_instance_start_rated_arena_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_instance_start_rated_arena();

    // Assert
    assert!(result.is_err());
}
