export function hm_spell_cast(event: Event): number {
    return event[5];
}

export function hm_melee_damage(event: Event): number {
    return event[4];
}

export function hm_spell_damage(event: Event): number {
    return event[6];
}

export function hm_heal(event: Event): number {
    return event[6];
}

export function hm_threat(event: Event): number {
    return event[6];
}
