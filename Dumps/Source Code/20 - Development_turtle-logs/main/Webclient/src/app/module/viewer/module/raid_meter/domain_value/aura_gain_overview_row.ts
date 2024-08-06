import {Unit} from "../../../domain_value/unit";

export interface AuraGainOverviewRow {
    timestamp: number;
    caster: Unit;
    target: Unit;
    ability: number;
}
