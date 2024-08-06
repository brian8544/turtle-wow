use crate::modules::live_data_processor::dto::Unit;
use crate::modules::live_data_processor::tools::payload_mapper::death::MapDeath;

#[test]
fn map_death_positive() {
    // Arrange
    let payload = vec![
        1, 122, 0, 0, 0, 0, 0, 0, 0, // cause
        1, 133, 0, 0, 0, 0, 0, 0, 0, // victim
    ];

    // Act
    let result = payload.to_death();

    // Assert
    assert!(result.is_ok());
    let death = result.unwrap();
    assert_eq!(death.cause, Some(Unit { is_player: true, unit_id: 122 }));
    assert_eq!(death.victim.is_player, true);
    assert_eq!(death.victim.unit_id, 133);
}

#[test]
fn map_death_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_death();

    // Assert
    assert!(result.is_err());
}
