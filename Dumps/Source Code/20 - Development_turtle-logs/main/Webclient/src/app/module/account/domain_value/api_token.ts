export interface APIToken {
    id: number;
    member_id: number;
    token: string | undefined;
    purpose: string;
    exp_date: number;
}
