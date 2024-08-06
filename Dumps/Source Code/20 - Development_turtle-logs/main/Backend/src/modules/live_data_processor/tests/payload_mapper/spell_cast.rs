use crate::modules::live_data_processor::dto::Unit;
use crate::modules::live_data_processor::tools::payload_mapper::spell_cast::MapSpellCast;

#[test]
fn map_spell_cast_positive_with_target() {
    // Arrange
    let payload = vec![
        1, 78, 0, 0, 0, 0, 0, 0, 0, // caster
        1, 22, 0, 0, 0, 0, 0, 0, 0, // target
        77, 0, 0, 0, // SpellId
        8, 0, 0, 0, // HitMask
    ];

    // Act
    let result = payload.to_spell_cast();

    // Assert
    assert!(result.is_ok());
    let spell_cast = result.unwrap();
    assert_eq!(spell_cast.caster.is_player, true);
    assert_eq!(spell_cast.caster.unit_id, 78);
    assert_eq!(spell_cast.target, Some(Unit { is_player: true, unit_id: 22 }));
    assert_eq!(spell_cast.spell_id, 77);
    assert_eq!(spell_cast.hit_mask, 8);
}

#[test]
fn map_spell_cast_positive_without_target() {
    // Arrange
    let payload = vec![
        1, 78, 0, 0, 0, 0, 0, 0, 0, // caster
        1, 0, 0, 0, 0, 0, 0, 0, 0, // target
        77, 0, 0, 0, // SpellId
        8, 0, 0, 0, // HitMask
    ];

    // Act
    let result = payload.to_spell_cast();

    // Assert
    assert!(result.is_ok());
    let spell_cast = result.unwrap();
    assert_eq!(spell_cast.caster.is_player, true);
    assert_eq!(spell_cast.caster.unit_id, 78);
    assert_eq!(spell_cast.target, None);
    assert_eq!(spell_cast.spell_id, 77);
    assert_eq!(spell_cast.hit_mask, 8);
}

#[test]
fn map_spell_cast_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_spell_cast();

    // Assert
    assert!(result.is_err());
}
