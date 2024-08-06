import {UnAura} from "../../../domain_value/event";
import {get_unit_id, get_unit_owner, Unit} from "../../../domain_value/unit";
import {group_by} from "../../../../../stdlib/group_by";
import {UnAuraOverviewRow} from "../module/un_aura_overview/domain_value/un_aura_overview_row";
import {se_un_aura} from "../../../extractor/sources";
import {te_un_aura} from "../../../extractor/targets";

function commit_dispel(dispels: Array<UnAura>, dispel_unit_extraction: (Event) => Unit): Array<[number, [Unit, Array<UnAuraOverviewRow>]]> {
    const newData = new Map<number, [Unit, Array<UnAuraOverviewRow>]>();

    const grouping = group_by(dispels, (event) => get_unit_id(dispel_unit_extraction(event)));
    // tslint:disable-next-line:forin
    for (const unit_id in grouping) {
        const subject_id = Number(unit_id);
        if (!newData.has(subject_id))
            newData.set(subject_id, [get_unit_owner(dispel_unit_extraction(grouping[unit_id][0])), []]);
        const un_aura_overview_row = newData.get(subject_id)[1];
        for (const event of grouping[unit_id]) {
            un_aura_overview_row.push({
                timestamp: event[1],
                caster: se_un_aura(event),
                target: te_un_aura(event),
                caster_spell_id: event[6],
                target_spell_id: event[7]
            });
        }
    }

    // @ts-ignore
    return [...newData.entries()];
}

export {commit_dispel};
