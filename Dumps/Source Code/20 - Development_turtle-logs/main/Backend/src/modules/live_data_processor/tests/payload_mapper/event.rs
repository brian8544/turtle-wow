use crate::modules::live_data_processor::tools::payload_mapper::event::MapEvent;

#[test]
fn map_event_positive() {
    // Arrange
    let payload = vec![
        1, 78, 0, 0, 0, 0, 0, 0, 0, // unit
        0, // Event
    ];

    // Act
    let result = payload.to_event();

    // Assert
    assert!(result.is_ok());
    let event = result.unwrap();
    assert_eq!(event.unit.is_player, true);
    assert_eq!(event.unit.unit_id, 78);
    assert_eq!(event.event_type, 0);
}

#[test]
fn map_event_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_event();

    // Assert
    assert!(result.is_err());
}
