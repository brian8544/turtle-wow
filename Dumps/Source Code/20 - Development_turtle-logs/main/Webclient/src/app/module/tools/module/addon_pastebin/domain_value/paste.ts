export interface Paste {
    id: number | undefined;
    title: string;
    expansion_id: number;
    addon_name: string;
    tags: Array<number>;
    description: string;
    content: string;
    member_id: number;
}
