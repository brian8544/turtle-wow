import {Component, Input} from "@angular/core";
import {DateService} from "../../../../../../../../service/date";
import {UnAuraOverviewRow} from "../../domain_value/un_aura_overview_row";
import {RaidMeterSubject} from "../../../../../../../../template/meter_graph/domain_value/raid_meter_subject";
import {get_unit_id, Unit} from "../../../../../../domain_value/unit";
import {Observable, of} from "rxjs";
import {CONST_UNKNOWN_LABEL} from "../../../../../../constant/viewer";

@Component({
    selector: "UnAuraOverview",
    templateUrl: "./un_aura_overview.html",
    styleUrls: ["./un_aura_overview.scss"]
})
export class UnAuraOverviewComponent {

    @Input() un_aura_overview_rows: Array<UnAuraOverviewRow> = [];
    @Input() abilities: Map<number, RaidMeterSubject>;
    @Input() units: Map<number, RaidMeterSubject>;

    constructor(
        public dateService: DateService
    ) {
    }

    get_unit_name(unit: Unit): string {
        if (!this.units)
            return CONST_UNKNOWN_LABEL;
        return this.units.get(get_unit_id(unit, false))?.name;
    }

    get_ability_name(spell_id: number): string {
        if (!this.abilities)
            return CONST_UNKNOWN_LABEL;
        return this.abilities.get(spell_id)?.name;
    }
}
