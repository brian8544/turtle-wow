use crate::modules::live_data_processor::tools::payload_mapper::power::MapPower;

#[test]
fn map_power_positive() {
    // Arrange
    let payload = vec![
        1, 78, 0, 0, 0, 0, 0, 0, 0, // unit
        4, // PowerType
        200, 0, 0, 0, // MaxPower
        199, 0, 0, 0, // CurrentPower
    ];

    // Act
    let result = payload.to_power();

    // Assert
    assert!(result.is_ok());
    let power = result.unwrap();
    assert_eq!(power.unit.is_player, true);
    assert_eq!(power.unit.unit_id, 78);
    assert_eq!(power.power_type, 4);
    assert_eq!(power.max_power, 200);
    assert_eq!(power.current_power, 199);
}

#[test]
fn map_power_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_power();

    // Assert
    assert!(result.is_err());
}
