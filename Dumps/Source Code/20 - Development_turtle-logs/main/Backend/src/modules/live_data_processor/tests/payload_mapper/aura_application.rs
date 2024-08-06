use crate::modules::live_data_processor::tools::payload_mapper::aura_application::MapAuraApplication;

#[test]
fn map_aura_application_positive() {
    // Arrange
    let payload = vec![
        1, 1, 0, 0, 0, 0, 0, 0, 0, // Caster
        1, 42, 0, 0, 0, 0, 0, 0, 0, // Target
        23, 0, 0, 0, // SpellId
        3, 0, 0, 0, // StackAmount
        1, // Delta
    ];

    // Act
    let aura_application = payload.to_aura_application();

    // Assert
    assert!(aura_application.is_ok());
    let aura_application = aura_application.unwrap();
    assert_eq!(aura_application.caster.is_player, true);
    assert_eq!(aura_application.caster.unit_id, 1);
    assert_eq!(aura_application.target.is_player, true);
    assert_eq!(aura_application.target.unit_id, 42);
    assert_eq!(aura_application.spell_id, 23);
    assert_eq!(aura_application.stack_amount, 3);
    assert_eq!(aura_application.delta, 1);
}

#[test]
fn map_aura_application_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let aura_application = payload.to_aura_application();

    // Assert
    assert!(aura_application.is_err());
}

#[test]
fn test_map_aura_application_applied_negative() {
    // Arrange
    let payload = vec![
        1, 1, 0, 0, 0, 0, 0, 0, 0, // Caster
        1, 42, 0, 0, 0, 0, 0, 0, 0, // Target
        23, 0, 0, 0, // SpellId
        3, 0, 0, 0,   // StackAmount
        255, // Delta
    ];

    // Act
    let aura_application = payload.to_aura_application();

    // Assert
    assert!(aura_application.is_ok());
    let aura_application = aura_application.unwrap();
    assert_eq!(aura_application.delta, -1);
}
