use crate::modules::live_data_processor::tools::payload_mapper::loot::MapLoot;

#[test]
fn map_loot_positive() {
    // Arrange
    let payload = vec![
        1, 7, 0, 0, 0, 0, 0, 0, 0, // unit
        5, 0, 0, 0, // ItemId
        3, 0, 0, 0, // Count
    ];

    // Act
    let result = payload.to_loot();

    // Assert
    assert!(result.is_ok());
    let loot = result.unwrap();
    assert_eq!(loot.unit.is_player, true);
    assert_eq!(loot.unit.unit_id, 7);
    assert_eq!(loot.item_id, 5);
    assert_eq!(loot.count, 3);
}

#[test]
fn map_loot_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_loot();

    // Assert
    assert!(result.is_err());
}
