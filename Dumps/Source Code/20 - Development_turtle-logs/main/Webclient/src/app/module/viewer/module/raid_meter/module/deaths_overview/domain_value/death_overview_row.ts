import {Unit} from "../../../../../domain_value/unit";

export interface DeathOverviewRow {
    timestamp: number;
    murder: Unit;
    murdered: Unit;
    killing_blow: {
        ability_id: number;
        amount: number;
        timestamp: number;
    };
}
