use crate::modules::live_data_processor::tools::payload_mapper::summon::MapSummon;

#[test]
fn map_summon_positive() {
    // Arrange
    let payload = vec![
        1, 222, 0, 0, 0, 0, 0, 0, 0, // owner
        1, 223, 0, 0, 0, 0, 0, 0, 0, // unit
    ];

    // Act
    let result = payload.to_summon();

    // Assert
    assert!(result.is_ok());
    let summon = result.unwrap();
    assert_eq!(summon.owner.is_player, true);
    assert_eq!(summon.owner.unit_id, 222);
    assert_eq!(summon.unit.is_player, true);
    assert_eq!(summon.unit.unit_id, 223);
}

#[test]
fn map_summon_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_summon();

    // Assert
    assert!(result.is_err());
}
