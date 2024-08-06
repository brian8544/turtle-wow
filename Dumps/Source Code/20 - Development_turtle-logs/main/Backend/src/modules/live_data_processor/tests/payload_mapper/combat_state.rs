use crate::modules::live_data_processor::tools::payload_mapper::combat_state::MapCombatState;

#[test]
fn map_combat_state_positive() {
    // Arrange
    let payload = vec![
        1, 234, 0, 0, 0, 0, 0, 0, 0, // unit
        1, // InCombat
    ];

    // Act
    let result = payload.to_combat_state();

    // Assert
    assert!(result.is_ok());
    let combat_state = result.unwrap();
    assert_eq!(combat_state.unit.is_player, true);
    assert_eq!(combat_state.unit.unit_id, 234);
    assert_eq!(combat_state.in_combat, true);
}

#[test]
fn map_combat_state_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_combat_state();

    // Assert
    assert!(result.is_err());
}

#[test]
fn test_map_combat_state_in_combat_false() {
    // Arrange
    let payload = vec![
        1, 234, 0, 0, 0, 0, 0, 0, 0, // unit
        0, // InCombat
    ];

    // Act
    let result = payload.to_combat_state();

    // Assert
    assert!(result.is_ok());
    let combat_state = result.unwrap();
    assert_eq!(combat_state.in_combat, false);
}
