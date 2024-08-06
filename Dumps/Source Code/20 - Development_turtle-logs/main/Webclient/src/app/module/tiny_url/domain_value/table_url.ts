export interface TableUrl {
    page: number;
    columns: Array<{
        filter_name: string;
        filter: [string | number, boolean | null];
    }>;
}
