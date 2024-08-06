import {Event} from "../../../domain_value/event";
import {get_unit_id, get_unit_owner, Unit} from "../../../domain_value/unit";
import {group_by} from "../../../../../stdlib/group_by";
import {CONST_AUTO_ATTACK_ID} from "../../../constant/viewer";
import {hit_mask_to_hit_type_array, HitType} from "../../../domain_value/hit_type";
import {School, school_mask_to_school_array} from "../../../domain_value/school";
import {ae_spell_damage} from "../../../extractor/abilities";

export function commit_absorb_damages(melee_damage: Array<Event>, spell_damage: Array<Event>,
                                      melee_unit_extraction: (Event) => Unit,
                                      spell_unit_extraction: (Event) => Unit): Array<[number, Array<[number, number, number, Array<School>]>]> {
    const newData = new Map<number, Array<[number, number, number, Array<School>]>>();

    // Melee Damage
    // @ts-ignore
    let grouping = group_by(melee_damage, (event) => get_unit_id(melee_unit_extraction(event), false));
    // @ts-ignore
    // tslint:disable-next-line:forin
    for (const unit_id in grouping) {
        const subject_id = Number(unit_id);
        const result = [];
        for (const event of grouping[unit_id]) {
            const hit_mask = hit_mask_to_hit_type_array(event[4]);
            if (!hit_mask.includes(HitType.FullAbsorb) && !hit_mask.includes(HitType.PartialAbsorb))
                continue;
            for (const component of event[5]) {
                const absorb = component[2];
                if (absorb === 0)
                    continue;
                result.push([CONST_AUTO_ATTACK_ID, event[1], absorb, school_mask_to_school_array(component[2]), ]);
            }
        }
        if (result.length > 0)
            newData.set(subject_id, result);
    }

    // Spell Damage
    grouping = group_by(spell_damage, (event) => get_unit_id(spell_unit_extraction(event), false));
    // tslint:disable-next-line:forin
    for (const unit_id in grouping) {
        const subject_id = Number(unit_id);
        if (!newData.has(subject_id))
            newData.set(subject_id, []);

        const absorbs = newData.get(subject_id);
        for (const event of grouping[unit_id]) {
            const spell_id = ae_spell_damage(event);
            const hit_mask = hit_mask_to_hit_type_array(event[6]);
            if (!hit_mask.includes(HitType.FullAbsorb) && !hit_mask.includes(HitType.PartialAbsorb))
                continue;
            for (const component of event[7]) {
                const absorb = component[2];
                if (absorb === 0)
                    continue;
                absorbs.push([spell_id, event[1], absorb, school_mask_to_school_array(component[2])]);
            }
        }

        if (absorbs.length === 0)
            newData.delete(subject_id);
    }

    // @ts-ignore
    return [...newData.entries()];
}
