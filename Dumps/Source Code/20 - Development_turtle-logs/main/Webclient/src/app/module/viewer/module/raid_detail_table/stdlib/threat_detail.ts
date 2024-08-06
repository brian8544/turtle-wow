import {Threat} from "../../../domain_value/event";
import {hit_mask_to_hit_type_array, HitType} from "../../../domain_value/hit_type";
import {DetailRow} from "../domain_value/detail_row";
import {detail_row_post_processing, fill_details} from "./util";
import {te_threat} from "../../../extractor/targets";
import {se_threat} from "../../../extractor/sources";
import {get_unit_id} from "../../../domain_value/unit";

export function commit_threat_detail(inverse: boolean, threat: Array<Threat>): Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]> {
    const per_unit_details = new Map();
    const mode_se_threat = inverse ? te_threat : se_threat;

    for (const event of threat) {
        const unit_id = get_unit_id(mode_se_threat(event), true);
        const spell_id = event[5];
        const hit_mask = hit_mask_to_hit_type_array(event[6]);
        if (!per_unit_details.get(unit_id).has(spell_id))
            per_unit_details.get(unit_id).set(spell_id, new Map());

        const details_map = per_unit_details.get(unit_id).get(spell_id);
        fill_details([[event[7], event[8], 0, 0, 0]], hit_mask, details_map);
    }

    return [...per_unit_details.entries()].map(([unit_id, ab_details]) => [unit_id, detail_row_post_processing(ab_details)]);
}
