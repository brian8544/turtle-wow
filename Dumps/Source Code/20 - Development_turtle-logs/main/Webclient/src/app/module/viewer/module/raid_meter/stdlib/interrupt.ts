import {Interrupt} from "../../../domain_value/event";
import {get_unit_id, get_unit_owner, Unit} from "../../../domain_value/unit";
import {UnAuraOverviewRow} from "../module/un_aura_overview/domain_value/un_aura_overview_row";
import {group_by} from "../../../../../stdlib/group_by";
import {se_interrupt} from "../../../extractor/sources";
import {te_interrupt} from "../../../extractor/targets";

export function commit_interrupt(interrupts: Array<Interrupt>, interrupt_unit_extraction: (Event) => Unit): Array<[number, [Unit, Array<UnAuraOverviewRow>]]> {
    const newData = new Map<number, [Unit, Array<UnAuraOverviewRow>]>();
    const grouping = group_by(interrupts, (event) => get_unit_id(interrupt_unit_extraction(event)));
    // tslint:disable-next-line:forin
    for (const unit_id in grouping) {
        const subject_id = Number(unit_id);
        if (!newData.has(subject_id))
            newData.set(subject_id, [get_unit_owner(interrupt_unit_extraction(grouping[unit_id][0])), []]);
        const un_aura_overview_row = newData.get(subject_id)[1];
        for (const event of grouping[unit_id]) {
            un_aura_overview_row.push({
                timestamp: event[1],
                caster: se_interrupt(event),
                target: te_interrupt(event),
                caster_spell_id: event[5],
                target_spell_id: event[6]
            });
        }
    }

    // @ts-ignore
    return [...newData.entries()];
}
