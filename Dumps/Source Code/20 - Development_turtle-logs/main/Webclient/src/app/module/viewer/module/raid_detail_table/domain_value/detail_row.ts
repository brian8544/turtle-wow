import {HitType} from "../../../domain_value/hit_type";
import {School} from "../../../domain_value/school";

export interface DetailRow {
    hit_type: HitType;
    content: DetailRowContent;
    components: Array<{
        school: School; // Could also be a school mask
        content: DetailRowContent;
    }>;
}

export interface DetailRowContent {
    count: number;
    count_percent: number;
    amount: number;
    amount_percent: number;
    min: number;
    max: number;
    average: number;
    resist: number;
    absorb: number;
    block: number;
    resist_summary: ResistSummary;
}

export interface ResistSummary {
    percent_0: ResistSummaryRow;
    percent_25: ResistSummaryRow;
    percent_50: ResistSummaryRow;
    percent_75: ResistSummaryRow;
}

export interface ResistSummaryRow {
    count: number;
    count_percent: number;
    amount: number;
    amount_percent: number;
    min: number;
    max: number;
    average: number;
}
