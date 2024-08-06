import {Unit} from "../domain_value/unit";
import {Event} from "../domain_value/event";

export function se_spell_cast(event: Event): Unit | null {
    return event[2] as Unit;
}

export function se_death(event: Event): Unit {
    return event[2] as Unit;
}

export function se_combat_state(event: Event): Unit {
    return event[2] as Unit;
}

export function se_loot(event: Event): Unit {
    return event[2] as Unit;
}

export function se_position(event: Event): Unit {
    return event[2] as Unit;
}

export function se_power(event: Event): Unit {
    return event[2] as Unit;
}

export function se_aura_application(event: Event): Unit {
    return event[2] as Unit;
}

export function se_interrupt(event: Event): Unit {
    return event[3] as Unit;
}

export function se_un_aura(event: Event): Unit {
    return event[4] as Unit;
}

export function se_threat_wipe(event: Event): Unit {
    return event[2] as Unit;
}

export function se_summon(event: Event): Unit {
    return event[2] as Unit;
}

export function se_melee_damage(event: Event): Unit {
    return event[2] as Unit;
}

export function se_spell_damage(event: Event): Unit {
    return event[3] as Unit;
}

export function se_heal(event: Event): Unit {
    return event[3] as Unit;
}

export function se_threat(event: Event): Unit {
    return event[3] as Unit;
}
