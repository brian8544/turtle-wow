import {hit_mask_to_hit_type_array, HitType} from "../../../domain_value/hit_type";
import {DetailRow, DetailRowContent} from "../domain_value/detail_row";
import {Heal} from "../../../domain_value/event";
import {HealMode} from "../../../domain_value/heal_mode";
import {detail_row_post_processing, fill_details} from "./util";
import {School} from "../../../domain_value/school";
import {te_heal} from "../../../extractor/targets";
import {se_heal} from "../../../extractor/sources";
import {get_unit_id} from "../../../domain_value/unit";

export function commit_heal_detail(inverse: boolean, current_mode: HealMode, heal: Array<Heal>): Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]> {
    const per_unit_details = new Map();
    const mode_se_heal = inverse ? te_heal : se_heal;

    for (const event of heal) {
        const unit_id = get_unit_id(mode_se_heal(event), true);
        if (!per_unit_details.has(unit_id))
            per_unit_details.set(unit_id, new Map());

        const hit_mask = hit_mask_to_hit_type_array(event[6]);
        const spell_id = event[5];
        const school_mask = event[7];
        if (!per_unit_details.get(unit_id).has(spell_id))
            per_unit_details.get(unit_id).set(spell_id, new Map());

        const details_map = per_unit_details.get(unit_id).get(spell_id);
        let healing;
        if (current_mode === HealMode.Total) healing = event[8];
        else if (current_mode === HealMode.Effective) healing = event[9];
        else healing = event[8] - event[9];
        if (current_mode !== HealMode.Overheal || healing > 0)
            fill_details([[healing, school_mask, event[10], 0, 0]], hit_mask, details_map);
    }

    return [...per_unit_details.entries()].map(([unit_id, ab_details]) => [unit_id, detail_row_post_processing(ab_details)]);
}
