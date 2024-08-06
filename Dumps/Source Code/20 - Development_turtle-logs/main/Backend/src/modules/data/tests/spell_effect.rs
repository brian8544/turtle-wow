use crate::modules::data::domain_value::SpellEffect;
use crate::modules::data::{tools::RetrieveSpellEffect, Data};
use std::collections::HashMap;

#[test]
fn get_spell_effects() {
    let mut data = Data::default();
    let expansion_id = 1;
    let spell_id = 1;
    let spell_effect = SpellEffect {
        id: 234234,
        expansion_id,
        spell_id,
        points_lower: 0,
        points_upper: 0,
        chain_targets: 0,
        radius: 0,
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(spell_id, vec![spell_effect.clone()]);
    data.spell_effects.push(hashmap);

    let spell_effects = data.get_spell_effects(expansion_id, spell_id);
    assert!(spell_effects.is_some());
    let spell_effects_vec = spell_effects.unwrap();
    assert!(!spell_effects_vec.is_empty());
    assert_eq!(spell_effects_vec[0], spell_effect);
    let no_spell_effects = data.get_spell_effects(0, 0);
    assert!(no_spell_effects.is_none());
}
