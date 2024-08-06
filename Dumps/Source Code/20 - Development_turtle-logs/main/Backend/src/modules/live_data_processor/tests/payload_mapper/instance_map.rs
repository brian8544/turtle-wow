use crate::modules::live_data_processor::tools::payload_mapper::instance_map::MapInstanceMap;

#[test]
fn map_instance_map_positive() {
    // Arrange
    let payload = vec![
        10, 0, 0, 0, // MapId
        12, 0, 0, 0, // InstanceId
        7, // Difficulty
        1, 78, 0, 0, 0, 0, 0, 0, 0, // unit
    ];

    // Act
    let result = payload.to_instance_map();

    // Assert
    assert!(result.is_ok());
    let position = result.unwrap();
    assert_eq!(position.map_id, 10);
    assert_eq!(position.instance_id, 12);
    assert_eq!(position.map_difficulty, 7);
    assert_eq!(position.unit.is_player, true);
    assert_eq!(position.unit.unit_id, 78);
}

#[test]
fn map_instance_map_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_instance_map();

    // Assert
    assert!(result.is_err());
}
