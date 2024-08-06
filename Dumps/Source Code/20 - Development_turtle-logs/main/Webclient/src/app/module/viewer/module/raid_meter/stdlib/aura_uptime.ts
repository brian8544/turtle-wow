import {Event} from "../../../domain_value/event";
import {get_unit_id, Unit} from "../../../domain_value/unit";
import {group_by} from "../../../../../stdlib/group_by";
import {se_aura_application} from "../../../extractor/sources";
import {te_aura_application} from "../../../extractor/targets";


export function commit_aura_uptime(aura_applications: Array<Event>, current_segment_intervals: Array<[number, number]>):
    Array<[number, [Unit, Array<[number, Array<[number | undefined, number | undefined, Unit | undefined, Unit | undefined]>]>]]> {
    if (current_segment_intervals.length === 0)
        return [];

    const newData = new Map<number, [Unit, Map<number, Array<[number | undefined, number | undefined, Unit | undefined, Unit | undefined]>>]>();

    const grouping = group_by(aura_applications, (event) => get_unit_id(se_aura_application(event), false));
    // tslint:disable-next-line:forin
    for (const unit_id in grouping) {
        const subject_id = Number(unit_id);
        if (!newData.has(subject_id))
            newData.set(subject_id, [se_aura_application(grouping[unit_id][0]), new Map()]);

        const abilities_data = newData.get(subject_id)[1];
        const sorted_aura_app = grouping[subject_id].sort((left, right) => {
            if (left[0] === right[0])
                return left[5] - right[5];
            return left[0] - right[0];
        });
        sorted_aura_app.forEach(event => {
            const spell_id = event[4];
            if (!abilities_data.has(spell_id))
                abilities_data.set(spell_id, [[undefined, undefined, undefined, undefined]]);
            const ability_intervals = abilities_data.get(spell_id);
            const current_interval = ability_intervals[ability_intervals.length - 1];

            if (event[5] > 0) {
                // If we get a non 0 event twice, it is probably a refresh
                if (current_interval[0] === undefined) {
                    current_interval[0] = event[1];
                    current_interval[2] = te_aura_application(event);
                } else {
                    current_interval[1] = event[1];
                    current_interval[3] = te_aura_application(event);
                }
            } else {
                current_interval[1] = event[1];
                current_interval[3] = te_aura_application(event);
                ability_intervals.push([undefined, undefined, undefined, undefined]);
            }
        });
    }

    const sorted_segment_intervals = current_segment_intervals.sort((left, right) => left[0] - right[0]);
    return [...newData.entries()].map(([unit_id, [unit, abilities]]) => {
        const result = [];
        for (const [spell_id, intervals] of abilities) {
            const res_intervals = [];
            for (const [start, end, start_id, end_id] of intervals) {
                // TODO: With information about the spell duration, we could approximate the end or start if its undefined
                if (start === undefined || end === undefined)
                    continue;
                for (const [ci_start, ci_end] of sorted_segment_intervals) {
                    if (start >= ci_end)
                        continue;
                    if (ci_start >= end)
                        break;
                    res_intervals.push([
                        Math.max(start, ci_start),
                        Math.min(end, ci_end),
                        start_id, end_id]);

                }
            }

            if (res_intervals.length > 0)
                result.push([spell_id, res_intervals]);
        }
        return [unit_id, [unit, result]];
    });
}

export function flatten_aura_uptime_to_spell_map(data: Array<[number, Array<[number, Array<[number, number]>]>]>): Array<[number, Array<[number, number]>]> {
    const ability_intervals = new Map<number, Array<[number, number]>>();
    for (const [unit_id, abilities] of data) {
        for (const [spell_id, intervals] of abilities) {
            if (!ability_intervals.has(spell_id)) ability_intervals.set(spell_id, intervals);
            else {
                const ab_intervals = ability_intervals.get(spell_id);
                ab_intervals.push(...intervals);
            }
        }
    }
    const result = Array(ability_intervals.size);
    let arr_count = 0;
    for (let [spell_id, intervals] of ability_intervals) {
        intervals = intervals.sort((left, right) => left[0] - right[0]);
        const consolidated_intervals = [[intervals[0][0], intervals[0][1]]];
        let cons_int_count = 0;
        for (let i=1; i<intervals.length; ++i) {
            const [start, end] = intervals[i];
            const [c_start, c_end] = consolidated_intervals[cons_int_count];
            if (c_start >= end || c_end >= start) {
                consolidated_intervals[cons_int_count][0] = Math.min(consolidated_intervals[cons_int_count][0], start);
                consolidated_intervals[cons_int_count][1] = Math.max(consolidated_intervals[cons_int_count][1], end);
            } else {
                consolidated_intervals.push([start, end]);
                ++cons_int_count;
            }
        }
        result[arr_count++] = [spell_id, consolidated_intervals];
    }
    return result;
}

export function flatten_aura_uptime_to_subject_map(data: Array<[number, Array<[number, Array<[number, number]>]>]>): Array<[number, Array<[number, number]>]> {
    const unit_intervals = new Map<number, Array<[number, number]>>();
    for (const [unit_id, abilities] of data) {
        for (const [spell_id, intervals] of abilities) {
            if (!unit_intervals.has(unit_id)) unit_intervals.set(unit_id, intervals);
            else {
                const un_intervals = unit_intervals.get(unit_id);
                intervals.push(...un_intervals);
            }
        }
    }

    const result = Array(unit_intervals.size);
    let arr_count = 0;
    for (let [unit_id, intervals] of unit_intervals) {
        intervals = intervals.sort((left, right) => left[0] - right[0]);
        const consolidated_intervals = [[intervals[0][0], intervals[0][1]]];
        let cons_int_count = 0;
        for (let i=1; i<intervals.length; ++i) {
            const [start, end] = intervals[i];
            const [c_start, c_end] = consolidated_intervals[cons_int_count];
            if (c_start >= end || c_end >= start) {
                consolidated_intervals[cons_int_count][0] = Math.min(consolidated_intervals[cons_int_count][0], start);
                consolidated_intervals[cons_int_count][1] = Math.max(consolidated_intervals[cons_int_count][1], end);
            } else {
                consolidated_intervals.push([start, end]);
                ++cons_int_count;
            }
        }
        result[arr_count++] = [unit_id, consolidated_intervals];
    }
    return result;
}
