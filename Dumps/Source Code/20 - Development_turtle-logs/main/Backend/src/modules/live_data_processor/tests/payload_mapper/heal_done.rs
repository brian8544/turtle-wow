use crate::modules::live_data_processor::tools::payload_mapper::heal_done::MapHealDone;

#[test]
fn map_heal_done_positive() {
    // Arrange
    let payload = vec![
        1, 12, 0, 0, 0, 0, 0, 0, 0, // caster
        1, 13, 0, 0, 0, 0, 0, 0, 0, // target
        99, 0, 0, 0, // SpellId
        255, 0, 0, 0, // Total heal
        100, 0, 0, 0, // Effective Heal
        55, 0, 0, 0, // Absorbed
        4, 0, 0, 0, // HitMask
    ];

    // Act
    let result = payload.to_heal_done();

    // Assert
    assert!(result.is_ok());
    let heal_done = result.unwrap();
    assert_eq!(heal_done.caster.is_player, true);
    assert_eq!(heal_done.caster.unit_id, 12);
    assert_eq!(heal_done.target.is_player, true);
    assert_eq!(heal_done.target.unit_id, 13);
    assert_eq!(heal_done.spell_id, 99);
    assert_eq!(heal_done.total_heal, 255);
    assert_eq!(heal_done.effective_heal, 100);
    assert_eq!(heal_done.absorb, 55);
    assert_eq!(heal_done.hit_mask, 4);
}

#[test]
fn map_heal_done_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_heal_done();

    // Assert
    assert!(result.is_err());
}
