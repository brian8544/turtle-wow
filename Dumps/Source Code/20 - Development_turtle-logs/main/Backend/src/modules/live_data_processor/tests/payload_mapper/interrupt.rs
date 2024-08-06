use crate::modules::live_data_processor::tools::payload_mapper::interrupt::MapInterrupt;

#[test]
fn map_interrupt_positive() {
    // Arrange
    let payload = vec![
        1, 78, 0, 0, 0, 0, 0, 0, 0, // Target
        66, 0, 0, 0, // SpellId
    ];

    // Act
    let result = payload.to_interrupt();

    // Assert
    assert!(result.is_ok());
    let interrupt = result.unwrap();
    assert_eq!(interrupt.target.is_player, true);
    assert_eq!(interrupt.target.unit_id, 78);
    assert_eq!(interrupt.interrupted_spell_id, 66);
}

#[test]
fn map_interrupt_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_interrupt();

    // Assert
    assert!(result.is_err());
}
