import {get_unit_id, get_unit_owner, Unit} from "../../../domain_value/unit";
import {group_by} from "../../../../../stdlib/group_by";

export function commit_uptime(events: Array<Event>, unit_extractor: (Event) => Unit): Array<[number, [Unit, Array<[number, number]>]]> {
    const TIMEOUT: number = 5000;
    const newData = new Map<number, [Unit, Array<[number, number]>]>();
    const grouping = group_by(events, (event) => get_unit_id(unit_extractor(event)));
    // tslint:disable-next-line:forin
    for (const unit_id in grouping) {
        const subject_id = Number(unit_id);

        const sorted_grouping = grouping[unit_id].sort((left, right) => left[1] - right[1]);
        let intervals = [];
        let current_start = sorted_grouping[0][1];
        let current_end = sorted_grouping[0][1];
        for (const event of sorted_grouping) {
            if (event[1] - TIMEOUT > current_end) {
                intervals.push([current_start, current_end]);
                current_start = event[1];
                current_end = event[1];
            } else {
                current_start = Math.min(current_start, event[1]);
                current_end = Math.max(current_end, event[1]);
            }
        }
        intervals.push([current_start, current_end]);
        newData.set(subject_id, [get_unit_owner(unit_extractor(grouping[unit_id][0])), intervals]);
    }

    return [...newData.entries()];
}
