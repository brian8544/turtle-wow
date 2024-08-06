import {Event} from "../domain_value/event";
import {Unit} from "../domain_value/unit";

export function te_spell_cast(event: Event): Unit {
    return event[3] as Unit;
}

export function te_death(event: Event): Unit | undefined {
    return event[3] as Unit;
}

export function te_aura_application(event: Event): Unit {
    return event[3] as Unit;
}

export function te_interrupt(event: Event): Unit {
    return event[4] as Unit;
}

export function te_un_aura(event: Event): Unit {
    return event[5] as Unit;
}

export function te_summon(event: Event): Unit {
    return event[3] as Unit;
}

export function te_melee_damage(event: Event): Unit {
    return event[3] as Unit;
}

export function te_spell_damage(event: Event): Unit {
    return event[4] as Unit;
}

export function te_heal(event: Event): Unit {
    return event[4] as Unit;
}

export function te_threat(event: Event): Unit {
    return event[4] as Unit;
}
