import {Unit} from "../../../../../domain_value/unit";

export interface UnAuraOverviewRow {
    timestamp: number;
    caster: Unit;
    target: Unit;
    caster_spell_id: number;
    target_spell_id: number;
}
