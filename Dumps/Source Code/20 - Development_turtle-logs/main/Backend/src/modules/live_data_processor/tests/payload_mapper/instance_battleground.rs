use crate::modules::live_data_processor::tools::payload_mapper::instance_battleground::MapInstanceBattleground;

#[test]
fn map_instance_battleground_positive() {
    // Arrange
    let payload = vec![
        23, 0, 0, 0, // MapId
        34, 0, 0, 0, // InstanceId
        1, // Winner
        111, 0, 0, 0, // ScoreAlliance
        121, 0, 0, 0, // ScoreHorde
    ];

    // Act
    let result = payload.to_instance_battleground();

    // Assert
    assert!(result.is_ok());
    let instance_battleground = result.unwrap();
    assert_eq!(instance_battleground.map_id, 23);
    assert_eq!(instance_battleground.instance_id, 34);
    assert_eq!(instance_battleground.winner, 1);
    assert_eq!(instance_battleground.score_alliance, 111);
    assert_eq!(instance_battleground.score_horde, 121);
}

#[test]
fn map_instance_battleground_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_instance_battleground();

    // Assert
    assert!(result.is_err());
}
