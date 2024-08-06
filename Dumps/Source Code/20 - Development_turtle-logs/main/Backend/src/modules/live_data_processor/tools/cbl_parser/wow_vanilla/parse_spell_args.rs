use crate::modules::data::tools::RetrieveSpell;
use crate::modules::data::Data;
use std::collections::HashMap;

pub fn parse_spell_args(cache: &mut HashMap<String, Option<u32>>, data: &Data, spell_name: &str) -> Option<u32> {
    if spell_name == "Unknown" {
        return None;
    }

    let spell_name = spell_name.to_string();
    if let Some(spell_id) = cache.get(&spell_name) {
        return *spell_id;
    }

    let spell_id = data.get_spell_by_name(1, &spell_name).map(|spell| spell.id);
    cache.insert(spell_name, spell_id);
    spell_id
}
