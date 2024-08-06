import {SpellCast} from "../../../domain_value/event";
import {get_unit_id, get_unit_owner, Unit} from "../../../domain_value/unit";
import {group_by} from "../../../../../stdlib/group_by";

export function commit_spell_cast(spell_casts: Array<SpellCast>, unit_extraction: (Event) => Unit): Array<[number, [Unit, Array<[number, number]>]]> {
    const newData = new Map<number, [Unit, Map<number, number>]>();

    const grouping = group_by(spell_casts, (event) => get_unit_id(unit_extraction(event)));
    // tslint:disable-next-line:forin
    for (const unit_id in grouping) {
        const subject_id = Number(unit_id);
        if (!newData.has(subject_id))
            newData.set(subject_id, [get_unit_owner(unit_extraction(grouping[unit_id][0])), new Map()]);

        const abilities_data = newData.get(subject_id)[1];
        for (const event of grouping[unit_id]) {
            const spell_id = event[4];
            if (abilities_data.has(spell_id)) abilities_data.set(spell_id, abilities_data.get(spell_id) + 1);
            else abilities_data.set(spell_id, 1);
        }
    }

    return [...newData.entries()].map(([unit_id, [unit, abilities]]) => [unit_id, [unit, [...abilities.entries()]]]);
}
