import {HitType} from "../../../domain_value/hit_type";
import {DetailRow, DetailRowContent, ResistSummary, ResistSummaryRow} from "../domain_value/detail_row";
import {School, school_mask_to_school_array} from "../../../domain_value/school";
import {SpellComponent} from "../../../domain_value/damage";

export function detail_row_post_processing(ability_details: any): Array<[number, Array<[HitType, DetailRow]>]> {
    const result = [];
    for (const [spell_id, hit_categories] of ability_details) {
        let total_count = 0;
        let total_amount = 0;
        for (const [hit_type, [content, components]] of hit_categories) {
            total_count += content.count;
            total_amount += content.amount;
        }

        const detail_rows = [];
        for (const [hit_type, [content, components]] of hit_categories) {
            const detail_row_components = [];
            for (const [school, [comp_content, resists]] of components) {
                // Sort resists into 25, 50, 75 category
                const avg_percent_0 = (comp_content.resist_summary.percent_0.amount / comp_content.resist_summary.percent_0.count) || 0;
                for (const resist of resists) {
                    const frac = (100 * resist) / avg_percent_0;
                    if (frac >= 62.5) update_resist_summary_row(comp_content.resist_summary.percent_25, 1, resist, resist, resist);
                    else if (frac >= 37.5) update_resist_summary_row(comp_content.resist_summary.percent_50, 1, resist, resist, resist);
                    else update_resist_summary_row(comp_content.resist_summary.percent_75, 1, resist, resist, resist);
                }

                // Calculate resist summary average etc.
                post_process_resist_summary(comp_content.resist_summary);

                // Update parent resist summary
                update_resist_summary_row(content.resist_summary.percent_25, comp_content.resist_summary.percent_25.count, comp_content.resist_summary.percent_25.amount,
                    comp_content.resist_summary.percent_25.min, comp_content.resist_summary.percent_25.max);
                update_resist_summary_row(content.resist_summary.percent_50, comp_content.resist_summary.percent_50.count, comp_content.resist_summary.percent_50.amount,
                    comp_content.resist_summary.percent_50.min, comp_content.resist_summary.percent_50.max);
                update_resist_summary_row(content.resist_summary.percent_75, comp_content.resist_summary.percent_75.count, comp_content.resist_summary.percent_75.amount,
                    comp_content.resist_summary.percent_75.min, comp_content.resist_summary.percent_75.max);

                // Set comp content avg, and percents
                comp_content.average = comp_content.amount / comp_content.count;
                comp_content.amount_percent = (100 * comp_content.amount) / content.amount;
                comp_content.count_percent = (100 * comp_content.count) / content.count;

                detail_row_components.push({
                    school,
                    content: comp_content
                });
            }

            // Calculate resist summary average etc.
            post_process_resist_summary(content.resist_summary);

            // Set content avg, percent
            content.average = content.amount / content.count;
            content.amount_percent = total_amount === 0 ? 0 : (100 * content.amount) / total_amount;
            content.count_percent = total_count === 0 ? 0 : (100 * content.count) / total_count;

            detail_rows.push([hit_type, {
                hit_type,
                content,
                components: detail_row_components
            }]);
        }

        result.push([spell_id, detail_rows]);
    }
    return result;
}

export const DETAIL_CATEGORIES = [
    HitType.None,
    HitType.Glancing,
    HitType.Crushing,
    HitType.Hit,
    HitType.Crit,
    HitType.Parry,
    HitType.Dodge,
    HitType.Miss,
    HitType.Environment,
    HitType.Evade,
    HitType.Immune,
    HitType.FullBlock,
    HitType.FullAbsorb,
    HitType.FullResist
];

export function find_category(hit_mask: Array<HitType>): HitType {
    for (const hit_type of hit_mask) {
        if (DETAIL_CATEGORIES.includes(hit_type))
            return hit_type;
    }
    return HitType.None;
}

export function fill_details(spell_components: Array<SpellComponent>, hit_mask: Array<HitType>, details: Map<HitType, [DetailRowContent, Map<School, [DetailRowContent, Array<number>]>]>): void {
    const category = find_category(hit_mask);

    if (!details.has(category)) {
        const i_components = new Map<School, [DetailRowContent, Array<number>]>();
        const row_summary: [DetailRowContent, Map<School, [DetailRowContent, Array<number>]>] = [create_detail_row_content(), i_components];
        details.set(category, row_summary);
    }

    const [detail_row_content, components] = details.get(category);
    let total_amount = 0;
    let total_resist = 0;
    let total_block = 0;
    let total_absorb = 0;
    let total_percent_0 = 0;
    let total_percent_0_min = detail_row_content.resist_summary.percent_0.min;
    let total_percent_0_max = detail_row_content.resist_summary.percent_0.max;
    for (const component of spell_components) {
        const school_mask = school_mask_to_school_array(component[1]);
        if (!components.has(school_mask[0])) {
            components.set(school_mask[0], [create_detail_row_content(), []]);
        }
        const [comp_content, resists] = components.get(school_mask[0]);
        const resist = component[3];
        const block = component[4];
        const absorb = component[2];
        total_amount += component[0];
        total_resist += resist;
        total_block += block;
        total_absorb += absorb;
        const percent_0 = hit_mask.includes(HitType.PartialResist) ? 0 : component[0];
        total_percent_0 += percent_0;
        if (hit_mask.includes(HitType.PartialResist))
            resists.push(resist);

        if (percent_0 > 0) {
            total_percent_0_min = Math.min(total_percent_0_min, percent_0);
            total_percent_0_max = Math.max(total_percent_0_max, percent_0);
        }

        update_detail_row_content(comp_content, component[0], resist, block, absorb, percent_0, percent_0, percent_0);
    }

    update_detail_row_content(detail_row_content, total_amount, total_resist, total_block, total_absorb, total_percent_0,
        total_percent_0_min, total_percent_0_max);
}

export function post_process_resist_summary(resist_summary: ResistSummary): void {
    const total_count = resist_summary.percent_0.count + resist_summary.percent_25.count + resist_summary.percent_50.count
        + resist_summary.percent_75.count;
    const total_amount = resist_summary.percent_0.amount + resist_summary.percent_25.amount + resist_summary.percent_50.amount
        + resist_summary.percent_75.amount;

    resist_summary.percent_0.average = resist_summary.percent_0.count === 0 ? 0 : resist_summary.percent_0.amount / resist_summary.percent_0.count;
    resist_summary.percent_25.average = resist_summary.percent_25.count === 0 ? 0 : resist_summary.percent_25.amount / resist_summary.percent_25.count;
    resist_summary.percent_50.average = resist_summary.percent_50.count === 0 ? 0 : resist_summary.percent_50.amount / resist_summary.percent_50.count;
    resist_summary.percent_75.average = resist_summary.percent_75.count === 0 ? 0 : resist_summary.percent_75.amount / resist_summary.percent_75.count;

    resist_summary.percent_0.count_percent = total_count === 0 ? 0 : (100 * resist_summary.percent_0.count) / total_count;
    resist_summary.percent_25.count_percent = total_count === 0 ? 0 : (100 * resist_summary.percent_25.count) / total_count;
    resist_summary.percent_50.count_percent = total_count === 0 ? 0 : (100 * resist_summary.percent_50.count) / total_count;
    resist_summary.percent_75.count_percent = total_count === 0 ? 0 : (100 * resist_summary.percent_75.count) / total_count;

    resist_summary.percent_0.amount_percent = total_amount === 0 ? 0 : (100 * resist_summary.percent_0.amount) / total_amount;
    resist_summary.percent_25.amount_percent = total_amount === 0 ? 0 : (100 * resist_summary.percent_25.amount) / total_amount;
    resist_summary.percent_50.amount_percent = total_amount === 0 ? 0 : (100 * resist_summary.percent_50.amount) / total_amount;
    resist_summary.percent_75.amount_percent = total_amount === 0 ? 0 : (100 * resist_summary.percent_75.amount) / total_amount;

    if (resist_summary.percent_0.count === 0) resist_summary.percent_0.min = 0;
    if (resist_summary.percent_25.count === 0) resist_summary.percent_25.min = 0;
    if (resist_summary.percent_50.count === 0) resist_summary.percent_50.min = 0;
    if (resist_summary.percent_75.count === 0) resist_summary.percent_75.min = 0;
}

export function update_resist_summary_row(resist_summary_row: ResistSummaryRow, count: number, amount: number, min: number, max: number): void {
    resist_summary_row.count += count;
    resist_summary_row.amount += amount;
    resist_summary_row.min = Math.min(min, resist_summary_row.min);
    resist_summary_row.max = Math.max(max, resist_summary_row.max);
}

export function update_detail_row_content(comp_content: DetailRowContent, amount: number, resist: number, block: number,
                                          absorb: number, percent_0: number, percent_0_min: number, percent_0_max: number): void {
    ++comp_content.count;
    comp_content.amount += amount;
    comp_content.resist += resist;
    comp_content.block += block;
    comp_content.absorb += absorb;
    comp_content.min = Math.min(amount, comp_content.min);
    comp_content.max = Math.max(amount, comp_content.max);
    if (percent_0 > 0) {
        ++comp_content.resist_summary.percent_0.count;
        comp_content.resist_summary.percent_0.amount += percent_0;
        comp_content.resist_summary.percent_0.min = Math.min(percent_0_min, comp_content.resist_summary.percent_0.min);
        comp_content.resist_summary.percent_0.max = Math.max(percent_0_max, comp_content.resist_summary.percent_0.max);
    }
}

export function merge_detail_rows(dr1: Array<DetailRow>, dr2: Array<DetailRow>): Array<DetailRow> {
    const result = dr1.map(dr => copy_detail_row(dr));
    for (const dr of dr2) {
        const dr_ht = result.find((i_dr) => i_dr.hit_type === dr.hit_type);
        if (dr_ht === undefined) result.push(copy_detail_row(dr));
        else merge_detail_row(dr_ht, dr);
    }

    const total_amount = result.reduce((acc, dr) => acc + dr.content.amount, 0);
    const total_count = result.reduce((acc, dr) => acc + dr.content.count, 0);
    for (const dr of result) {
        dr.content.amount_percent = 100 * (dr.content.amount / total_amount);
        dr.content.count_percent = 100 * (dr.content.count / total_count);
    }
    return result;
}

export function merge_detail_row(dr1: DetailRow, dr2: DetailRow): void {
    merge_detail_row_content(dr1.content, dr2.content);
    const components = [...dr1.components];
    for (const drc of dr2.components) {
        const drc_sc = components.find((comp) => comp.school === drc.school);
        if (drc_sc === undefined) components.push(drc);
        else merge_detail_row_content(drc_sc.content, drc.content);
    }
    dr1.components = components;

    const total_amount = components.reduce((acc, {content}) => acc + content.amount, 0);
    const total_count = components.reduce((acc, {content}) => acc + content.count, 0);
    for (const {content} of components) {
        content.count_percent = 100 * (content.count / total_count);
        content.amount_percent = 100 * (content.amount / total_amount);
    }
}

export function merge_detail_row_content(drc1: DetailRowContent, drc2: DetailRowContent): void {
    drc1.count += drc2.count;
    drc1.resist += drc2.resist;
    drc1.amount += drc2.amount;
    drc1.count_percent += drc2.count_percent;
    drc1.amount_percent += drc2.amount_percent;
    drc1.min = Math.min(drc1.min, drc2.min);
    drc1.max = Math.max(drc1.max, drc2.max);
    drc1.absorb += drc2.absorb;
    drc1.block += drc2.block;
    drc1.average = drc1.amount / drc1.count;
    merge_resist_summary_row(drc1.resist_summary.percent_0, drc2.resist_summary.percent_0);
    merge_resist_summary_row(drc1.resist_summary.percent_25, drc2.resist_summary.percent_25);
    merge_resist_summary_row(drc1.resist_summary.percent_50, drc2.resist_summary.percent_50);
    merge_resist_summary_row(drc1.resist_summary.percent_75, drc2.resist_summary.percent_75);

    const total_amount = drc1.resist_summary.percent_0.amount
        + drc1.resist_summary.percent_25.amount
        + drc1.resist_summary.percent_50.amount
        + drc1.resist_summary.percent_75.amount;
    drc1.resist_summary.percent_0.amount_percent = drc1.resist_summary.percent_0.amount / total_amount;
    drc1.resist_summary.percent_25.amount_percent = drc1.resist_summary.percent_25.amount / total_amount;
    drc1.resist_summary.percent_50.amount_percent = drc1.resist_summary.percent_50.amount / total_amount;
    drc1.resist_summary.percent_75.amount_percent = drc1.resist_summary.percent_75.amount / total_amount;

    const total_count = drc1.resist_summary.percent_0.count
        + drc1.resist_summary.percent_25.count
        + drc1.resist_summary.percent_50.count
        + drc1.resist_summary.percent_75.count;
    drc1.resist_summary.percent_0.count_percent = 100 * (drc1.resist_summary.percent_0.count / total_count);
    drc1.resist_summary.percent_25.count_percent = 100 * (drc1.resist_summary.percent_25.count / total_count);
    drc1.resist_summary.percent_50.count_percent = 100 * (drc1.resist_summary.percent_50.count / total_count);
    drc1.resist_summary.percent_75.count_percent = 100 * (drc1.resist_summary.percent_75.count / total_count);
}

export function merge_resist_summary_row(rsr1: ResistSummaryRow, rsr2: ResistSummaryRow): void {
    rsr1.min = Math.min(rsr1.min, rsr2.min);
    rsr1.max = Math.max(rsr1.max, rsr2.max);
    rsr1.amount += rsr2.amount;
    rsr1.count += rsr2.count;
    rsr1.average = rsr1.amount / rsr1.count;
}

export function create_resist_summary_row(): ResistSummaryRow {
    return {
        amount: 0,
        amount_percent: 0,
        count: 0,
        count_percent: 0,
        min: Number.MAX_VALUE,
        max: 0,
        average: 0
    };
}

export function create_detail_row_content(): DetailRowContent {
    return {
        amount: 0,
        amount_percent: 0,
        average: 0,
        count: 0,
        count_percent: 0,
        max: 0,
        min: Number.MAX_VALUE,
        resist: 0,
        block: 0,
        absorb: 0,
        resist_summary: {
            percent_0: create_resist_summary_row(),
            percent_25: create_resist_summary_row(),
            percent_50: create_resist_summary_row(),
            percent_75: create_resist_summary_row(),
            percent_100: create_resist_summary_row(),
        } as ResistSummary
    };
}

export function copy_detail_row(dr: DetailRow): DetailRow {
    return {
        hit_type: dr.hit_type,
        content: {
            ...dr.content,
            resist_summary: {
                percent_0: { ...dr.content.resist_summary.percent_0 },
                percent_25: { ...dr.content.resist_summary.percent_25 },
                percent_50: { ...dr.content.resist_summary.percent_50 },
                percent_75: { ...dr.content.resist_summary.percent_75 },
            }
        },
        components: dr.components.map(({school, content}) => {
            return {
                school,
                content: {
                    ...content,
                    resist_summary: {
                        percent_0: { ...content.resist_summary.percent_0 },
                        percent_25: { ...content.resist_summary.percent_25 },
                        percent_50: { ...content.resist_summary.percent_50 },
                        percent_75: { ...content.resist_summary.percent_75 },
                    }
                }
            };
        })
    };
}
