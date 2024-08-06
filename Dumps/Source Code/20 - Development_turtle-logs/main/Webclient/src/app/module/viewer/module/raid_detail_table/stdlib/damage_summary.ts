import {MeleeDamage, SpellDamage} from "../../../domain_value/event";
import {get_unit_id} from "../../../domain_value/unit";
import {se_melee_damage, se_spell_damage} from "../../../extractor/sources";
import {te_melee_damage, te_spell_damage} from "../../../extractor/targets";
import {
    get_spell_components_total_amount,
    get_spell_components_total_amount_only_absorb
} from "../../../domain_value/damage";

export function commit_damage_summary(inverse: boolean, spell_damage: Array<SpellDamage>, melee_damage: Array<MeleeDamage>, only_absorb: boolean = false): Array<[number, Array<[number, number]>]> {
    const result = new Map();
    const mode_se_melee = inverse ? te_melee_damage : se_melee_damage;
    const mode_te_melee = inverse ? se_melee_damage : te_melee_damage;
    const mode_se_spell = inverse ? te_spell_damage : se_spell_damage;
    const mode_te_spell = inverse ? se_spell_damage : te_spell_damage;

    for (const event of melee_damage) {
        const se_unit_id = get_unit_id(mode_se_melee(event), true);
        if (!result.has(se_unit_id))
            result.set(se_unit_id, new Map());

        const am_map = result.get(se_unit_id);
        const te_unit_id = get_unit_id(mode_te_melee(event), true);
        const amount = !only_absorb ? get_spell_components_total_amount(event[5]) : get_spell_components_total_amount_only_absorb(event[5]);
        if (am_map.has(te_unit_id))
            am_map.set(te_unit_id, am_map.get(te_unit_id) + amount);
        else
            am_map.set(te_unit_id, amount);
    }

    for (const event of spell_damage) {
        const se_unit_id = get_unit_id(mode_se_spell(event), true);
        if (!result.has(se_unit_id))
            result.set(se_unit_id, new Map());

        const am_map = result.get(se_unit_id);
        const te_unit_id = get_unit_id(mode_te_spell(event), true);
        const amount = !only_absorb ? get_spell_components_total_amount(event[7]) : get_spell_components_total_amount_only_absorb(event[7]);
        if (am_map.has(te_unit_id))
            am_map.set(te_unit_id, am_map.get(te_unit_id) + amount);
        else
            am_map.set(te_unit_id, amount);
    }

    return [...result.entries()].map(([se_unit_id, dmgs]) => [se_unit_id, [...dmgs.entries()]]);
}
