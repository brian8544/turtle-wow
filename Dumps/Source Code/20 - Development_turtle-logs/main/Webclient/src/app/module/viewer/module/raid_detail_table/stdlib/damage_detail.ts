import {hit_mask_to_hit_type_array, HitType} from "../../../domain_value/hit_type";
import {DetailRow, DetailRowContent} from "../domain_value/detail_row";
import {CONST_AUTO_ATTACK_ID, CONST_AUTO_ATTACK_ID_MH, CONST_AUTO_ATTACK_ID_OH} from "../../../constant/viewer";
import {MeleeDamage, SpellDamage} from "../../../domain_value/event";
import {School} from "../../../domain_value/school";
import {detail_row_post_processing, fill_details} from "./util";
import {se_melee_damage, se_spell_damage} from "../../../extractor/sources";
import {get_unit_id} from "../../../domain_value/unit";
import {te_melee_damage, te_spell_damage} from "../../../extractor/targets";

export function commit_damage_detail(inverse: boolean, spell_damage: Array<SpellDamage>, melee_damage: Array<MeleeDamage>): Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]> {
    const per_unit_details = new Map();
    const mode_se_melee_fn = inverse ? te_melee_damage : se_melee_damage;
    const mode_se_spell_fn = inverse ? te_spell_damage : se_spell_damage;

    if (melee_damage.length > 0) {
        for (const event of melee_damage) {
            const unit_id = get_unit_id(mode_se_melee_fn(event), true);
            if (!per_unit_details.has(unit_id)) {
                const ab_details = new Map();
                ab_details.set(CONST_AUTO_ATTACK_ID, new Map());
                // ab_details.set(CONST_AUTO_ATTACK_ID_OH, new Map());
                // ab_details.set(CONST_AUTO_ATTACK_ID_MH, new Map());
                per_unit_details.set(unit_id, ab_details);
            }

            const hit_mask = hit_mask_to_hit_type_array(event[4]);
            fill_details(event[5], hit_mask, per_unit_details.get(unit_id).get(CONST_AUTO_ATTACK_ID));
            /*
            // TODO: Not yet sure if that is a thing
            if (hit_mask.includes(HitType.OffHand))
                fill_details(event[5], hit_mask, per_unit_details.get(unit_id).get(CONST_AUTO_ATTACK_ID_OH));
            else fill_details(event[5], hit_mask, per_unit_details.get(unit_id).get(CONST_AUTO_ATTACK_ID_MH));
             */
        }

        /*
        if (melee_details_oh.size > 0 && melee_details_mh.size > 0) {
            ability_details.set(CONST_AUTO_ATTACK_ID_OH, melee_details_oh);
            ability_details.set(CONST_AUTO_ATTACK_ID_MH, melee_details_mh);
        } else {
            ability_details.set(CONST_AUTO_ATTACK_ID, melee_details);
        }
         */
    }

    if (spell_damage.length > 0) {
        for (const event of spell_damage) {
            const unit_id = get_unit_id(mode_se_spell_fn(event), true);
            if (!per_unit_details.has(unit_id))
                per_unit_details.set(unit_id, new Map());
            const hit_mask = hit_mask_to_hit_type_array(event[6]);
            const spell_id = event[5];
            if (!per_unit_details.get(unit_id).has(spell_id))
                per_unit_details.get(unit_id).set(spell_id, new Map());
            fill_details(event[7], hit_mask, per_unit_details.get(unit_id).get(spell_id));
        }
    }



    return [...per_unit_details.entries()].map(([unit_id, ab_details]) => [unit_id, detail_row_post_processing(ab_details)]);
}
