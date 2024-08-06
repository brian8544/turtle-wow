export interface Talent {
    is_filler: boolean;
    row_index: number;
    column_index: number;
    spell_id?: Array<number>;
    icon?: string;
    max_points?: number;
    points_spend?: number;
    parent?: {
        row_index: number;
        column_index: number;
    };
}
