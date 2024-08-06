import {Heal} from "../../../domain_value/event";
import {get_unit_id} from "../../../domain_value/unit";
import {te_heal} from "../../../extractor/targets";
import {se_heal} from "../../../extractor/sources";
import {HealMode} from "../../../domain_value/heal_mode";

export function commit_heal_summary(inverse: boolean, current_mode: HealMode, heal: Array<Heal>): Array<[number, Array<[number, number]>]> {
    const result = new Map();
    const mode_se_heal = inverse ? te_heal : se_heal;
    const mode_te_heal = inverse ? se_heal : te_heal;

    for (const event of heal) {
        const se_unit_id = get_unit_id(mode_se_heal(event), true);
        if (!result.has(se_unit_id))
            result.set(se_unit_id, new Map());

        const am_map = result.get(se_unit_id);
        const te_unit_id = get_unit_id(mode_te_heal(event), true);
        let healing;
        if (current_mode === HealMode.Total) healing = event[8];
        else if (current_mode === HealMode.Effective) healing = event[9];
        else healing = event[8] - event[9];
        if (am_map.has(te_unit_id))
            am_map.set(te_unit_id, am_map.get(te_unit_id) + healing);
        else
            am_map.set(te_unit_id, healing);
    }

    return [...result.entries()].map(([se_unit_id, dmgs]) => [se_unit_id, [...dmgs.entries()]]);
}
