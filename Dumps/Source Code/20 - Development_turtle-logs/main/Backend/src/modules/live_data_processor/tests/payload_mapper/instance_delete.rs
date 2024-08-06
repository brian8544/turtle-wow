use crate::modules::live_data_processor::tools::payload_mapper::instance_delete::MapInstanceDelete;

#[test]
fn map_instance_delete_positive() {
    // Arrange
    let payload = vec![
        22, 0, 0, 0, // InstanceId
    ];

    // Act
    let result = payload.to_instance_delete();

    // Assert
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), 22);
}

#[test]
fn map_instance_delete_negative() {
    // Arrange
    let payload = vec![1, 2, 3];

    // Act
    let result = payload.to_instance_delete();

    // Assert
    assert!(result.is_err());
}
