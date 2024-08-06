use crate::modules::{
    data::{
        tools::{RetrieveIcon, RetrieveLocalization, RetrievePowerType, RetrieveSpell, SpellDescription},
        Data,
    },
    tooltip::{domain_value::SpellCost, dto::TooltipFailure, material::SpellTooltip, Tooltip},
};

pub trait RetrieveSpellTooltip {
    fn get_spell(&self, data: &Data, language_id: u8, expansion_id: u8, spell_id: u32) -> Result<SpellTooltip, TooltipFailure>;
}

impl RetrieveSpellTooltip for Tooltip {
    fn get_spell(&self, data: &Data, language_id: u8, expansion_id: u8, spell_id: u32) -> Result<SpellTooltip, TooltipFailure> {
        let spell_res = data.get_spell(expansion_id, spell_id);
        if spell_res.is_none() {
            return Err(TooltipFailure::InvalidInput);
        }
        let spell = spell_res.unwrap();
        let spell_cost = if spell.cost > 0 {
            Some(SpellCost {
                cost: spell.cost,
                cost_in_percent: spell.cost_in_percent,
                power_type: data.get_power_type(spell.power_type).and_then(|power_type| data.get_localization(language_id, power_type.localization_id)).unwrap().content,
            })
        } else {
            None
        };

        Ok(SpellTooltip {
            name: data.get_localization(language_id, spell.localization_id).unwrap().content,
            icon: data.get_icon(spell.icon).unwrap().name,
            subtext: data.get_localization(language_id, spell.subtext_localization_id).unwrap().content,
            spell_cost,
            range: spell.range_max,
            description: data.get_localized_spell_description(expansion_id, language_id, spell_id).unwrap_or("?! ERROR ?!".to_owned()),
        })
    }
}
