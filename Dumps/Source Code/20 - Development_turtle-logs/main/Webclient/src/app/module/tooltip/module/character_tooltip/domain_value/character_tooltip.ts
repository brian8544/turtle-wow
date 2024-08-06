export interface CharacterTooltip {
    guild: { name: string; rank: string; };
    name: string;
    server: string;
    faction: boolean;
    hero_class_id: number;
    expansion_id: number;
    race_id: number;
    gender: boolean;
    level: number;
    items: Array<{ name: string; quality: number; }>;
}
