export interface ItemTooltip {
    item_id: number;
    name: string;
    icon: string;
    quality: number;
    inventory_type: string | undefined;
    bonding: string | undefined;
    sheath_type: string | undefined;
    sub_class: string;
    armor: number | undefined;
    stats: Array<{ value: number, name: string }> | undefined;
    durability: number | undefined;
    item_level: number | undefined;
    required_level: number | undefined;
    item_effects: Array<string> | undefined;
    item_set: {
        name: string,
        set_items: Array<{ item_id: number, active: boolean, name: string, item_level: number, inventory_type: number }>,
        set_effects: Array<{ threshold: number, description: string }>
    } | undefined;
    socket: { socket_bonus: string, slots: Array<{ flag: number, item: { icon: string, effect: string, flag: number } | undefined }> } | undefined;
    enchant: string | undefined;
    weapon_stat: { delay: number, damage_sources: Array<{ damage_min: number, damage_max: number, damage_type: string | undefined }> } | undefined;
}
