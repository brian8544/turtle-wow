export interface Segment {
    id: number;
    encounter_id: number;
    label: string;
    duration: number;
    is_kill: boolean;
    start_ts: number;
}
