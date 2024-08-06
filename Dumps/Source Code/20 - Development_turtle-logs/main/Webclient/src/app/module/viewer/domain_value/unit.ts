export type Unit = [number, number, number | null, Unit | null];

export function get_unit_owner(unit: Unit): Unit {
    if (!unit || !unit[3])
        return unit;
    return get_unit_owner(unit[3]);
}

export function get_unit_id(unit: Unit, get_owner: boolean = true): number {
    if (!unit)
        return 0;
    if (get_owner === true)
        return get_unit_id(get_unit_owner(unit), false);
    return unit[1];
}

export function get_creature_entry(unit: Unit, get_owner: boolean = false): number | null {
    if (get_owner === true)
        return get_creature_entry(get_unit_owner(unit), false);
    return unit[2];
}

export function is_player(unit: Unit, get_owner: boolean = true): boolean {
    if (get_owner === true)
        return is_player(get_unit_owner(unit), false);
    return unit[0] === 1;
}

export function is_creature(unit: Unit, get_owner: boolean = true): boolean {
    if (get_owner === true)
        return is_creature(get_unit_owner(unit), false);
    return unit[0] === 0;
}

export function has_unit(container: Array<Unit>, unit: Unit): boolean {
    return container.find(inner_unit => unit[0] === inner_unit[0] && unit[1] === inner_unit[1]) !== undefined;
}

export function player_id_or_npc_id(unit: Unit): number {
    if (is_player(unit))
        return get_unit_id(unit);
    return get_creature_entry(unit);
}
