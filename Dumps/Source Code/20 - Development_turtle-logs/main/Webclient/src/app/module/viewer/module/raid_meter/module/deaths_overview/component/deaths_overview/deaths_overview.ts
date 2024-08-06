import {Component, Input} from "@angular/core";
import {DeathOverviewRow} from "../../domain_value/death_overview_row";
import {DateService} from "../../../../../../../../service/date";
import {get_unit_id, Unit} from "../../../../../../domain_value/unit";
import {CONST_UNKNOWN_LABEL} from "../../../../../../constant/viewer";
import {RaidMeterSubject} from "../../../../../../../../template/meter_graph/domain_value/raid_meter_subject";

@Component({
    selector: "DeathsOverview",
    templateUrl: "./deaths_overview.html",
    styleUrls: ["./deaths_overview.scss"]
})
export class DeathsOverviewComponent {

    @Input() death_overview_rows: Array<DeathOverviewRow> = [];
    @Input() abilities: Map<number, RaidMeterSubject>;
    @Input() units: Map<number, RaidMeterSubject>;
    @Input() to_actor: boolean = true;
    @Input() bar_tooltips: Map<number, any>;

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

    get_tooltip(row_index: number): any {
        if (!this.bar_tooltips)
            return {};
        return this.bar_tooltips.get(row_index);
    }

    get routerLink(): string {
        if (this.to_actor)
            return "../event_log/to_actor";
        return "../event_log/by_actor";
    }
}
