export interface SpellTooltip {
    spell_id: number;
    name: string;
    icon: string;
    subtext: string;
    spell_cost: {
        cost: number;
        cost_in_percent: boolean;
        power_type: string;
    } | null;
    range: number;
    description: string;
}
