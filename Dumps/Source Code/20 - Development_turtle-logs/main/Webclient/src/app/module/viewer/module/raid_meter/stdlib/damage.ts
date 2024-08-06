import {group_by} from "../../../../../stdlib/group_by";
import {get_unit_id, get_unit_owner, Unit} from "../../../domain_value/unit";
import {MeleeDamage, SpellDamage} from "../../../domain_value/event";
import {CONST_AUTO_ATTACK_ID} from "../../../constant/viewer";
import {get_spell_components_total_amount} from "../../../domain_value/damage";

export function commit_damage(melee_damage: Array<MeleeDamage>, spell_damage: Array<SpellDamage>,
                              melee_unit_extraction: (Event) => Unit, spell_unit_extraction: (Event) => Unit): Array<[number, [Unit, Array<[number, number]>]]> {
    const newData = new Map<number, [Unit, Map<number, number>]>();

    // Melee Damage
    // @ts-ignore
    let grouping = group_by(melee_damage, (event) => get_unit_id(melee_unit_extraction(event)));
    // @ts-ignore
    // tslint:disable-next-line:forin
    for (const unit_id: number in grouping) {
        const subject_id = Number(unit_id);
        const total_damage = grouping[unit_id].reduce((acc, event) => acc + get_spell_components_total_amount(event[5]), 0);
        if (total_damage > 0) {
            if (!newData.has(subject_id))
                newData.set(subject_id, [get_unit_owner(melee_unit_extraction(grouping[unit_id][0])), new Map([[CONST_AUTO_ATTACK_ID, total_damage]])]);
            else newData.get(subject_id)[1].set(CONST_AUTO_ATTACK_ID, total_damage);
        }
    }

    // Spell Damage
    grouping = group_by(spell_damage, (event) => get_unit_id(spell_unit_extraction(event)));
    // tslint:disable-next-line:forin
    for (const unit_id in grouping) {
        const subject_id = Number(unit_id);
        if (!newData.has(subject_id))
            newData.set(subject_id, [get_unit_owner(spell_unit_extraction(grouping[unit_id][0])), new Map()]);

        const abilities_data = newData.get(subject_id)[1];
        for (const event of grouping[unit_id]) {
            const spell_id = event[5];
            const damage = get_spell_components_total_amount(event[7]);

            if (abilities_data.has(spell_id)) abilities_data.set(spell_id, abilities_data.get(spell_id) + damage);
            else abilities_data.set(spell_id, damage);
        }
    }

    // @ts-ignore
    return [...newData.entries()].map(([unit_id, [unit, abilities]]) => [unit_id, [unit, [...abilities.entries()]]]);
}
