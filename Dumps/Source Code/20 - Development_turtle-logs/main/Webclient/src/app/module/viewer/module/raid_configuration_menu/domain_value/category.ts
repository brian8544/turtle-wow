export interface Category {
    label: string;
    id: number;
    time: number;
    segments: Set<number>;
}
