export interface EventLogEntry {
    id: number;
    type: number;
    timestamp: number;
    subject_id: number; // Used for filtering

    source_id: number;
    target_id: number;
    source_ability_id: number;
    target_ability_id: number;
    amount: number;
    amount2: number;
    amount3: number;
    hit_type_str: string;
    trailer: string;
}
