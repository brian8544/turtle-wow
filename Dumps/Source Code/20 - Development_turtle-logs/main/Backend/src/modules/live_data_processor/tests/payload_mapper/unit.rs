use crate::modules::live_data_processor::tools::payload_mapper::unit::MapUnit;

#[test]
fn test_to_unit_failure() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_unit();

    // Assert
    assert!(result.is_err());
}

#[test]
fn test_to_unit_is_not_player() {
    // Arrange
    let payload = vec![0, 0, 0, 0, 0, 0, 0, 0, 42];

    // Act
    let result = payload.to_unit();

    // Assert
    assert!(result.is_ok());
}
