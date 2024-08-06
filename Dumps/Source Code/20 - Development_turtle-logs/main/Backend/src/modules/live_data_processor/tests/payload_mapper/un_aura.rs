use crate::modules::live_data_processor::dto::Unit;
use crate::modules::live_data_processor::tools::payload_mapper::un_aura::MapUnAura;

#[test]
fn map_un_aura_positive() {
    // Arrange
    let payload = vec![
        1, 244, 0, 0, 0, 0, 0, 0, 0, // UnAura caster
        1, 245, 0, 0, 0, 0, 0, 0, 0, // Target
        1, 246, 0, 0, 0, 0, 0, 0, 0, // Aura caster
        144, 0, 0, 0, // un_aura_spell id
        145, 0, 0, 0, // target spell id
        2, // Amount
    ];

    // Act
    let result = payload.to_un_aura();

    // Assert
    assert!(result.is_ok());
    let un_aura = result.unwrap();
    assert_eq!(un_aura.un_aura_caster.is_player, true);
    assert_eq!(un_aura.un_aura_caster.unit_id, 244);
    assert_eq!(un_aura.target.is_player, true);
    assert_eq!(un_aura.target.unit_id, 245);
    assert_eq!(un_aura.aura_caster, Some(Unit { is_player: true, unit_id: 246 }));
    assert_eq!(un_aura.un_aura_spell_id, 144);
    assert_eq!(un_aura.target_spell_id, 145);
    assert_eq!(un_aura.un_aura_amount, 2);
}

#[test]
fn map_un_aura_negative() {
    // Arrange
    let payload = vec![1, 2, 3, 4, 5];

    // Act
    let result = payload.to_un_aura();

    // Assert
    assert!(result.is_err());
}
