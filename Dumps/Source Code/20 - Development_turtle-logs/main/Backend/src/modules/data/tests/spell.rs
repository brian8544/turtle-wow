use crate::modules::data::domain_value::Spell;
use crate::modules::data::{tools::RetrieveSpell, Data};
use std::collections::HashMap;

#[test]
fn get_spell() {
    let mut data = Data::default();
    let expansion_id = 1;
    let spell_id = 1;
    let spell = Spell {
        id: spell_id,
        expansion_id,
        localization_id: 0,
        subtext_localization_id: 0,
        cost: 0,
        cost_in_percent: false,
        power_type: 0,
        cast_time: 0,
        school_mask: 0,
        dispel_type: 0,
        range_max: 0,
        cooldown: 0,
        duration: 0,
        icon: 0,
        description_localization_id: 0,
        aura_localization_id: 0,
    };
    let mut hashmap = HashMap::new();
    hashmap.insert(spell_id, spell.clone());
    data.spells.push(hashmap);

    let spell_res = data.get_spell(expansion_id, spell_id);
    assert!(spell_res.is_some());
    assert_eq!(spell_res.unwrap(), spell);
    let no_spell = data.get_spell(0, 0);
    assert!(no_spell.is_none());
}
