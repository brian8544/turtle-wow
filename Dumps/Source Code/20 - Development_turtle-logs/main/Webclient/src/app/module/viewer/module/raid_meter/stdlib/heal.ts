import {Heal} from "../../../domain_value/event";
import {get_unit_id, get_unit_owner, Unit} from "../../../domain_value/unit";
import {group_by} from "../../../../../stdlib/group_by";
import {HealMode} from "../../../domain_value/heal_mode";

function commit_heal(current_mode: HealMode, heal: Array<Heal>, heal_unit_extraction: (Event) => Unit): Array<[number, [Unit, Array<[number, number]>]]> {
    const newData = new Map<number, [Unit, Map<number, number>]>();

    // Heal
    const grouping = group_by(heal, (event) => get_unit_id(heal_unit_extraction(event)));
    // tslint:disable-next-line:forin
    for (const unit_id in grouping) {
        const subject_id = Number(unit_id);
        if (!newData.has(subject_id))
            newData.set(subject_id, [get_unit_owner(heal_unit_extraction(grouping[unit_id][0])), new Map()]);

        const abilities_data = newData.get(subject_id)[1];
        for (const event of grouping[unit_id]) {
            const spell_id = event[5];
            let healing;
            if (current_mode === HealMode.Total) healing = event[8];
            else if (current_mode === HealMode.Effective) healing = event[9];
            else healing = event[8] - event[9];
            if (current_mode !== HealMode.Overheal || healing > 0) {
                if (abilities_data.has(spell_id)) abilities_data.set(spell_id, abilities_data.get(spell_id) + healing);
                else abilities_data.set(spell_id, healing);
            }
        }
    }

    // @ts-ignore
    return [...newData.entries()].map(([unit_id, [unit, abilities]]) => [unit_id, [unit, [...abilities.entries()]]]);
}

export {commit_heal};
