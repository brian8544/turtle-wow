use crate::modules::live_data_processor::tools::payload_mapper::damage_done::MapDamageDone;

#[test]
fn map_damage_done_from_melee_damage_positive() {
    // Arrange
    let payload = vec![
        1, 234, 0, 0, 0, 0, 0, 0, 0, // Attacker
        1, 255, 0, 0, 0, 0, 0, 0, 0, // Victim
        32, 0, 0, 0, // Blocked
        4, 0, 0, 0, // Hit Mask for melee attacks
        4, // SchoolMask
        42, 0, 0, 0, // Damage
        10, 0, 0, 0, // Resisted or glanced
        12, 0, 0, 0, // Absorbed
    ];

    // Act
    let result = payload.from_melee_damage();

    // Assert
    assert!(result.is_ok());
    let damage_done = result.unwrap();
    assert_eq!(damage_done.attacker.is_player, true);
    assert_eq!(damage_done.attacker.unit_id, 234);
    assert_eq!(damage_done.victim.is_player, true);
    assert_eq!(damage_done.victim.unit_id, 255);
    assert_eq!(damage_done.spell_id, None);
    assert_eq!(damage_done.blocked, 32);
    assert_eq!(damage_done.hit_mask, 4);
    assert_eq!(damage_done.damage_components.len(), 1);
    assert_eq!(damage_done.damage_components[0].school_mask, 4);
    assert_eq!(damage_done.damage_components[0].damage, 42);
    assert_eq!(damage_done.damage_components[0].resisted_or_glanced, 10);
    assert_eq!(damage_done.damage_components[0].absorbed, 12);
}

#[test]
fn map_damage_done_from_spell_damage_positive() {
    // Arrange
    let payload = vec![
        1, 234, 0, 0, 0, 0, 0, 0, 0, // Attacker
        1, 255, 0, 0, 0, 0, 0, 0, 0, // Victim
        111, 0, 0, 0, // SpellId
        32, 0, 0, 0, // Blocked
        4, // SchoolMask
        42, 0, 0, 0, // Damage
        10, 0, 0, 0, // Resisted or glanced
        12, 0, 0, 0, // Absorbed
        1, // Damage over time,
        4, 0, 0, 0,
    ];

    // Act
    let result = payload.from_spell_damage();

    // Assert
    assert!(result.is_ok());
    let damage_done = result.unwrap();
    assert_eq!(damage_done.attacker.is_player, true);
    assert_eq!(damage_done.attacker.unit_id, 234);
    assert_eq!(damage_done.victim.is_player, true);
    assert_eq!(damage_done.victim.unit_id, 255);
    assert_eq!(damage_done.spell_id, Some(111));
    assert_eq!(damage_done.blocked, 32);
    assert_eq!(damage_done.hit_mask, 4);
    assert_eq!(damage_done.damage_components.len(), 1);
    assert_eq!(damage_done.damage_components[0].school_mask, 4);
    assert_eq!(damage_done.damage_components[0].damage, 42);
    assert_eq!(damage_done.damage_components[0].resisted_or_glanced, 10);
    assert_eq!(damage_done.damage_components[0].absorbed, 12);
    assert_eq!(damage_done.damage_over_time, true);
    assert_eq!(damage_done.hit_mask, 4);
}

#[test]
fn map_damage_done_from_melee_damage_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.from_melee_damage();

    // Assert
    assert!(result.is_err());
}

#[test]
fn map_damage_done_from_spell_damage_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.from_spell_damage();

    // Assert
    assert!(result.is_err());
}
