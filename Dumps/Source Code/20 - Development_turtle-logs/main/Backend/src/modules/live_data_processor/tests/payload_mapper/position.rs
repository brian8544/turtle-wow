use crate::modules::live_data_processor::tools::payload_mapper::position::MapPosition;

#[test]
fn map_position_positive() {
    // Arrange
    let payload = vec![
        1, 78, 0, 0, 0, 0, 0, 0, 0, // unit,
        246, 255, 255, 255, // X
        10, 0, 0, 0, // Y
        90, 0, 0, 0, // Z
        200, 0, 0, 0, // Orientation
    ];

    // Act
    let result = payload.to_position();

    // Assert
    assert!(result.is_ok());
    let position = result.unwrap();
    assert_eq!(position.unit.is_player, true);
    assert_eq!(position.unit.unit_id, 78);
    assert_eq!(position.x, -10);
    assert_eq!(position.y, 10);
    assert_eq!(position.z, 90);
    assert_eq!(position.orientation, 200);
}

#[test]
fn map_position_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_position();

    // Assert
    assert!(result.is_err());
}
