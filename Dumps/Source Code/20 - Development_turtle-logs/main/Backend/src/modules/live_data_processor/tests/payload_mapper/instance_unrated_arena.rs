use crate::modules::live_data_processor::tools::payload_mapper::instance_unrated_arena::MapInstanceUnratedArena;

#[test]
fn map_instance_unrated_arena_start_positive() {
    // Arrange
    let payload = vec![
        22, 0, 0, 0, // MapId
        33, 0, 0, 0, // InstanceId
        1, // winner
    ];

    // Act
    let result = payload.to_instance_unrated_arena();

    // Assert
    assert!(result.is_ok());
    let instance = result.unwrap();
    assert_eq!(instance.map_id, 22);
    assert_eq!(instance.instance_id, 33);
    assert_eq!(instance.winner, 1);
}

#[test]
fn map_instance_unrated_arena_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_instance_unrated_arena();

    // Assert
    assert!(result.is_err());
}
