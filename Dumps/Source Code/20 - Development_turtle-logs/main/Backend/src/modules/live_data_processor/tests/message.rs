use crate::modules::live_data_processor::dto::MessageType;
use crate::modules::live_data_processor::tools::MessageParser;

#[test]
fn parse_message_positive() {
    // Arrange
    let message_vec = vec![
        0,  // API_Version
        1,  // Message Type
        48, // Message length
        5, 0, 0, 0, 0, 0, 0, 0, // Timestamp
        2, 0, 0, 0, 0, 0, 0, 0, // Message count
        // Payload: Damage done
        1, 234, 0, 0, 0, 0, 0, 0, 0, // Attacker
        1, 255, 0, 0, 0, 0, 0, 0, 0, // Victim
        111, 0, 0, 0, // SpellId
        32, 0, 0, 0, // Blocked
        4, // SchoolMask
        42, 0, 0, 0, // Damage
        10, 0, 0, 0, // Resisted or glanced
        12, 0, 0, 0, // Absorbed
        1, // Dot
        4, 0, 0, 0, // HitMask
    ];

    // Act
    let message = message_vec.parse_message();

    // Assert
    assert!(message.is_ok());
    let message = message.unwrap();
    assert_eq!(message.api_version, 0);
    assert_eq!(message.message_length, 48);
    assert_eq!(message.timestamp, 5);
    assert_eq!(message.message_count, 2);
    matches!(message.message_type, MessageType::SpellDamage(_));
}

#[test]
fn parse_message_negative_invalid_length() {
    // Arrange
    let message_vec = vec![1, 2, 3, 4, 5];

    // Act
    let message = message_vec.parse_message();

    // Assert
    assert!(message.is_err());
}

#[test]
fn parse_message_negative_invalid_message_type() {
    // Arrange
    let message_vec = vec![1, 255, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // Act
    let message = message_vec.parse_message();

    // Assert
    assert!(message.is_err());
}
