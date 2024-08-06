import {InstanceDataService} from "../service/instance_data";
import {get_unit_id} from "../domain_value/unit";
import {ALL_SCHOOLS, School} from "../domain_value/school";

export const ABSORBING_SPELL_IDS: Map<number, [Array<School>, Array<School>]> = new Map([
    // Power Word: Shield
    [17, [[School.Holy], ALL_SCHOOLS]],
    [592, [[School.Holy], ALL_SCHOOLS]],
    [600, [[School.Holy], ALL_SCHOOLS]],
    // [1277, [[School.Holy], ALL_SCHOOLS]],
    // [1278, [[School.Holy], ALL_SCHOOLS]],
    // [1298, [[School.Holy], ALL_SCHOOLS]],
    // [2851, [[School.Holy], ALL_SCHOOLS]],
    [3747, [[School.Holy], ALL_SCHOOLS]],
    [6065, [[School.Holy], ALL_SCHOOLS]],
    [6066, [[School.Holy], ALL_SCHOOLS]],
    // [6067, [[School.Holy], ALL_SCHOOLS]],
    // [6068, [[School.Holy], ALL_SCHOOLS]],
    [10898, [[School.Holy], ALL_SCHOOLS]],
    [10899, [[School.Holy], ALL_SCHOOLS]],
    [10900, [[School.Holy], ALL_SCHOOLS]],
    [10901, [[School.Holy], ALL_SCHOOLS]],
    // [10902, [[School.Holy], ALL_SCHOOLS]],
    // [10903, [[School.Holy], ALL_SCHOOLS]],
    // [10904, [[School.Holy], ALL_SCHOOLS]],
    // [10905, [[School.Holy], ALL_SCHOOLS]],
    [11647, [[School.Holy], ALL_SCHOOLS]],
    [11835, [[School.Holy], ALL_SCHOOLS]],
    [11974, [[School.Holy], ALL_SCHOOLS]],
    [17139, [[School.Holy], ALL_SCHOOLS]],
    [20697, [[School.Holy], ALL_SCHOOLS]],
    [20706, [[School.Holy], ALL_SCHOOLS]],
    [22187, [[School.Holy], ALL_SCHOOLS]],
    [25217, [[School.Holy], ALL_SCHOOLS]],
    [25218, [[School.Holy], ALL_SCHOOLS]],
    [27607, [[School.Holy], ALL_SCHOOLS]],
    [29408, [[School.Holy], ALL_SCHOOLS]],
    [32595, [[School.Holy], ALL_SCHOOLS]],
    [35944, [[School.Holy], ALL_SCHOOLS]],
    [36052, [[School.Holy], ALL_SCHOOLS]],
    [41373, [[School.Holy], ALL_SCHOOLS]],
    [44175, [[School.Holy], ALL_SCHOOLS]],
    [44291, [[School.Holy], ALL_SCHOOLS]],
    [46193, [[School.Holy], ALL_SCHOOLS]],
    [48065, [[School.Holy], ALL_SCHOOLS]],
    [48066, [[School.Holy], ALL_SCHOOLS]],
    [66099, [[School.Holy], ALL_SCHOOLS]],
    [68032, [[School.Holy], ALL_SCHOOLS]],
    [68033, [[School.Holy], ALL_SCHOOLS]],
    [68034, [[School.Holy], ALL_SCHOOLS]],
    [71548, [[School.Holy], ALL_SCHOOLS]],
    [71780, [[School.Holy], ALL_SCHOOLS]],
    [71781, [[School.Holy], ALL_SCHOOLS]],
    [71781, [[School.Holy], ALL_SCHOOLS]],
    // Mana Shield
    [1463, [[School.Arcane], ALL_SCHOOLS]],
    [8494, [[School.Arcane], ALL_SCHOOLS]],
    [8495, [[School.Arcane], ALL_SCHOOLS]],
    [10191, [[School.Arcane], ALL_SCHOOLS]],
    [10192, [[School.Arcane], ALL_SCHOOLS]],
    [10193, [[School.Arcane], ALL_SCHOOLS]],
    [17740, [[School.Arcane], ALL_SCHOOLS]],
    [17741, [[School.Arcane], ALL_SCHOOLS]],
    [27131, [[School.Arcane], ALL_SCHOOLS]],
    [29880, [[School.Arcane], ALL_SCHOOLS]],
    [30973, [[School.Arcane], ALL_SCHOOLS]],
    [31635, [[School.Arcane], ALL_SCHOOLS]],
    [35064, [[School.Arcane], ALL_SCHOOLS]],
    [38151, [[School.Arcane], ALL_SCHOOLS]],
    [43019, [[School.Arcane], ALL_SCHOOLS]],
    [43020, [[School.Arcane], ALL_SCHOOLS]],
    [46151, [[School.Arcane], ALL_SCHOOLS]],
    [56778, [[School.Arcane], ALL_SCHOOLS]],
    [58348, [[School.Arcane], ALL_SCHOOLS]],
    // Fire Protection
    [7230, [[School.Fire], [School.Fire]]],
    [7231, [[School.Fire], [School.Fire]]],
    [7232, [[School.Fire], [School.Fire]]],
    [7233, [[School.Fire], [School.Fire]]],
    [7234, [[School.Fire], [School.Fire]]],
    [12561, [[School.Fire], [School.Fire]]],
    [16894, [[School.Fire], [School.Fire]]],
    [17543, [[School.Fire], [School.Fire]]],
    [18942, [[School.Fire], [School.Fire]]],
    [28511, [[School.Fire], [School.Fire]]],
    [29432, [[School.Fire], [School.Fire]]],
    [53911, [[School.Fire], [School.Fire]]],
    // Frost Protection
    [7236, [[School.Frost], [School.Frost]]],
    [7237, [[School.Frost], [School.Frost]]],
    [7238, [[School.Frost], [School.Frost]]],
    [7239, [[School.Frost], [School.Frost]]],
    [7240, [[School.Frost], [School.Frost]]],
    [16895, [[School.Frost], [School.Frost]]],
    [17544, [[School.Frost], [School.Frost]]],
    [28512, [[School.Frost], [School.Frost]]],
    [53913, [[School.Frost], [School.Frost]]],
    // Nature Protection
    [7250, [[School.Nature], [School.Nature]]],
    [7251, [[School.Nature], [School.Nature]]],
    [7252, [[School.Nature], [School.Nature]]],
    [7253, [[School.Nature], [School.Nature]]],
    [7254, [[School.Nature], [School.Nature]]],
    [16893, [[School.Nature], [School.Nature]]],
    [17546, [[School.Nature], [School.Nature]]],
    [28513, [[School.Nature], [School.Nature]]],
    [53914, [[School.Nature], [School.Nature]]],
    // Arcane Protection
    [17549, [[School.Arcane], [School.Arcane]]],
    [21892, [[School.Arcane], [School.Arcane]]],
    [21893, [[School.Arcane], [School.Arcane]]],
    [28536, [[School.Arcane], [School.Arcane]]],
    [53910, [[School.Arcane], [School.Arcane]]],
    // Shadow Protection
    [28537, [[School.Shadow], [School.Shadow]]],
    [7235, [[School.Shadow], [School.Shadow]]],
    [7241, [[School.Shadow], [School.Shadow]]],
    [7242, [[School.Shadow], [School.Shadow]]],
    [7243, [[School.Shadow], [School.Shadow]]],
    [7244, [[School.Shadow], [School.Shadow]]],
    [16891, [[School.Shadow], [School.Shadow]]],
    [53915, [[School.Shadow], [School.Shadow]]],
    // Holy Protection
    [7245, [[School.Holy], [School.Holy]]],
    [7246, [[School.Holy], [School.Holy]]],
    [7247, [[School.Holy], [School.Holy]]],
    [7248, [[School.Holy], [School.Holy]]],
    [7249, [[School.Holy], [School.Holy]]],
    [16892, [[School.Holy], [School.Holy]]],
    [17545, [[School.Holy], [School.Holy]]],
    [28538, [[School.Holy], [School.Holy]]],
    // Val'Anyr
    [64411, [[School.Physical], ALL_SCHOOLS]],
    // Sacrifice
    [7812, [[School.Shadow], ALL_SCHOOLS]],
    [19438, [[School.Shadow], ALL_SCHOOLS]],
    [19440, [[School.Shadow], ALL_SCHOOLS]],
    [19441, [[School.Shadow], ALL_SCHOOLS]],
    [19442, [[School.Shadow], ALL_SCHOOLS]],
    [19443, [[School.Shadow], ALL_SCHOOLS]],
    [27273, [[School.Shadow], ALL_SCHOOLS]],
    [47985, [[School.Shadow], ALL_SCHOOLS]],
    [47986, [[School.Shadow], ALL_SCHOOLS]],
    // Ice Barrier
    [11426, [[School.Frost], ALL_SCHOOLS]],
    [13031, [[School.Frost], ALL_SCHOOLS]],
    [13032, [[School.Frost], ALL_SCHOOLS]],
    [13033, [[School.Frost], ALL_SCHOOLS]],
    [27134, [[School.Frost], ALL_SCHOOLS]],
    [33405, [[School.Frost], ALL_SCHOOLS]],
    [43038, [[School.Frost], ALL_SCHOOLS]],
    [43039, [[School.Frost], ALL_SCHOOLS]],
    // Glyph: PoW
    [56160, [[School.Holy], ALL_SCHOOLS]],
    // Sacred Shield
    [58597, [[School.Holy], ALL_SCHOOLS]],
    // Divine Aegis
    [47753, [[School.Holy], ALL_SCHOOLS]],
]);

// TODO: How to deal with several active absorb spells?
export async function get_absorb_data_points(current_mode: boolean, instance_data_service: InstanceDataService): Promise<[Array<[number, Array<[number, Array<[number, number]>]>]>, Array<[number, Array<[number, number]>]>]> {
    const aura_uptime_job = instance_data_service.knecht_aura.meter_aura_uptime(current_mode);
    const absorb_melee_job = instance_data_service.knecht_melee.meter_absorbed_damage();
    const absorb_spell_job = instance_data_service.knecht_spell_damage.meter_absorbed_damage();

    const aura_uptime = await aura_uptime_job;
    const absorb_melee = await absorb_melee_job;
    const absorb_spell = await absorb_spell_job;

    const result = new Map();
    const target_summary = new Map();

    const aura_uptime_map = new Map(aura_uptime);
    for (const data_set of [absorb_melee, absorb_spell]) {
        for (const [subject_id, absorbs] of data_set) {
            if (!aura_uptime_map.has(subject_id))
                continue;
            const subject_intervals = new Map(aura_uptime_map.get(subject_id)[1]);
            for (const [spell_id, timestamp, amount, schools] of absorbs) {
                let found_outer = false;
                for (const [absorb_spell_id, [school_mask, absorbing_schools]] of ABSORBING_SPELL_IDS.entries()) {
                    if (!subject_intervals.has(absorb_spell_id) || (schools.length > 0 && !absorbing_schools.some(school => schools.includes(school))))
                        continue;
                    const uptime_intervals = subject_intervals.get(absorb_spell_id);
                    let found = false;
                    for (const [start, end, start_aura_app_unit, end_aura_app_unit] of uptime_intervals) {
                        if ((start === undefined || start - 500 <= timestamp) && (end === undefined || end + 500 >= timestamp)) {
                            const start_unit_id = get_unit_id(start_aura_app_unit, false);
                            if (current_mode) {
                                if (!result.has(subject_id)) {
                                    result.set(subject_id, new Map());
                                    target_summary.set(subject_id, new Map());
                                }
                                if (!target_summary.get(subject_id).has(start_unit_id))
                                    target_summary.get(subject_id).set(start_unit_id, 0);
                                if (!result.get(subject_id).has(absorb_spell_id))
                                    result.get(subject_id).set(absorb_spell_id, []);
                                result.get(subject_id).get(absorb_spell_id).push([timestamp, amount]);
                                target_summary.get(subject_id).set(start_unit_id, target_summary.get(subject_id).get(start_unit_id) + amount);
                            } else {
                                if (!result.has(start_unit_id)) {
                                    result.set(start_unit_id, new Map());
                                    target_summary.set(start_unit_id, new Map());
                                }
                                if (!target_summary.get(start_unit_id).has(subject_id))
                                    target_summary.get(start_unit_id).set(subject_id, 0);
                                if (!result.get(start_unit_id).has(absorb_spell_id))
                                    result.get(start_unit_id).set(absorb_spell_id, []);
                                result.get(start_unit_id).get(absorb_spell_id).push([timestamp, amount]);
                                target_summary.get(start_unit_id).set(subject_id, target_summary.get(start_unit_id).get(subject_id) + amount);
                            }
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        found_outer = true;
                        break;
                    }
                }
            }


        }
    }

    return [[...result.entries()].map(([unit_id, ab_map]) => [unit_id, [...ab_map.entries()]]),
        [...target_summary.entries()].map(([unit_id, tar_amount]) => [unit_id, [...tar_amount.entries()]])]
}
