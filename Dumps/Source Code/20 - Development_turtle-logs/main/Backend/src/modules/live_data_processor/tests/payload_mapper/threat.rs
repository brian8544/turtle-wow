use crate::modules::live_data_processor::tools::payload_mapper::threat::MapThreat;

#[test]
fn map_threat_positive() {
    // Arrange
    let payload = vec![
        1, 2, 0, 0, 0, 0, 0, 0, 0, // threater
        1, 3, 0, 0, 0, 0, 0, 0, 0, // threatened
        213, 0, 0, 0, // SpellId
        240, 255, 255, 255, // Amount
    ];

    // Act
    let result = payload.to_threat();

    // Assert
    assert!(result.is_ok());
    let threat = result.unwrap();
    assert_eq!(threat.threater.is_player, true);
    assert_eq!(threat.threater.unit_id, 2);
    assert_eq!(threat.threatened.is_player, true);
    assert_eq!(threat.threatened.unit_id, 3);
    assert_eq!(threat.spell_id, Some(213));
    assert_eq!(threat.amount, -16);
}

#[test]
fn map_threat_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_threat();

    // Assert
    assert!(result.is_err());
}
