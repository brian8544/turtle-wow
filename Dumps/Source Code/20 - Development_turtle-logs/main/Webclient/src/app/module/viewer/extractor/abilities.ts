import {Event} from "../domain_value/event";
import {CONST_AUTO_ATTACK_ID} from "../constant/viewer";

export function ae_spell_cast(event: Event): number {
    return event[4] as number;
}

export function ae_aura_application(event: Event): number {
    return event[4] as number;
}

export function ae_interrupt(event: Event): Array<number> {
    return [event[5] as number, event[6] as number];
}

export function ae_un_aura(event: Event): Array<number> {
    return [event[6] as number, event[7] as number];
}

export function ae_melee_damage(): number {
    return CONST_AUTO_ATTACK_ID;
}

export function ae_spell_damage(event: Event): number {
    return event[5] as number;
}

export function ae_heal(event: Event): number {
    return event[5] as number;
}

export function ae_threat(event: Event): number {
    return event[5] as number;
}
