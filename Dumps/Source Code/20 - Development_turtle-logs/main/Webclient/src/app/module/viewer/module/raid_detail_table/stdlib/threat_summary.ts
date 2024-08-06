import {Threat} from "../../../domain_value/event";
import {te_threat} from "../../../extractor/targets";
import {se_threat} from "../../../extractor/sources";
import {get_unit_id} from "../../../domain_value/unit";

export function commit_threat_summary(inverse: boolean, threats: Array<Threat>): Array<[number, Array<[number, number]>]> {
    const result = new Map();
    const mode_se_threat = inverse ? te_threat : se_threat;
    const mode_te_threat = inverse ? se_threat : te_threat;

    for (const event of threats) {
        const se_unit_id = get_unit_id(mode_se_threat(event), true);
        if (!result.has(se_unit_id))
            result.set(se_unit_id, new Map());

        const am_map = result.get(se_unit_id);
        const te_unit_id = get_unit_id(mode_te_threat(event), true);
        const amount = event[7]; // May not be everything :/
        if (am_map.has(te_unit_id))
            am_map.set(te_unit_id, am_map.get(te_unit_id) + amount);
        else
            am_map.set(te_unit_id, amount);
    }

    return [...result.entries()].map(([se_unit_id, dmgs]) => [se_unit_id, [...dmgs.entries()]]);
}
