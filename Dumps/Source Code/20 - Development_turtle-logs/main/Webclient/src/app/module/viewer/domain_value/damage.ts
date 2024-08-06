export type SpellComponent = [number, number, number, number, number];

export function get_spell_components_total_amount(components: Array<SpellComponent>): number {
    return components.reduce((acc, component) => acc + component[0] + component[2], 0);
}

export function get_spell_components_total_amount_without_absorb(components: Array<SpellComponent>): number {
    return components.reduce((acc, component) => acc + component[0], 0);
}

export function get_spell_components_total_amount_only_absorb(components: Array<SpellComponent>): number {
    return components.reduce((acc, component) => acc + component[2], 0);
}
