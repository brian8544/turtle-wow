import {Event} from "../../../domain_value/event";
import {get_unit_id, Unit} from "../../../domain_value/unit";
import {group_by} from "../../../../../stdlib/group_by";
import {se_aura_application} from "../../../extractor/sources";
import {AuraGainOverviewRow} from "../domain_value/aura_gain_overview_row";
import {te_aura_application} from "../../../extractor/targets";

export function commit_aura_gain(aura_applications: Array<Event>, getter: (Event) => Unit): Array<[number, [Unit, Array<AuraGainOverviewRow>]]> {
    const newData = new Map<number, [Unit, Array<AuraGainOverviewRow>]>();

    const grouping = group_by(aura_applications, (event) => get_unit_id(getter(event), false));
    for (const unit_id in grouping) {
        if (!unit_id) {
            continue;
        }

        const subject_id = Number(unit_id);
        if (!newData.has(subject_id))
            newData.set(subject_id, [getter(grouping[unit_id][0]), []]);

        const rows = newData.get(subject_id)[1];
        grouping[subject_id].forEach(event => {
            const stack_amount = event[5];
            if (stack_amount > 0) {
                rows.push({
                    timestamp: event[0],
                    caster: te_aura_application(event),
                    target: se_aura_application(event),
                    ability: event[4]
                });
            }
        });
    }

    return [...newData.entries()];
}
