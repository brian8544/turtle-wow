import {Component, Input} from "@angular/core";
import {AuraGainOverviewRow} from "../../../../../viewer/module/raid_meter/domain_value/aura_gain_overview_row";
import {RaidMeterSubject} from "../../../../../../template/meter_graph/domain_value/raid_meter_subject";
import {DateService} from "../../../../../../service/date";
import {get_unit_id, Unit} from "../../../../../viewer/domain_value/unit";
import {CONST_UNKNOWN_LABEL} from "../../../../../viewer/constant/viewer";

@Component({
    selector: "ViewerAuraGainTooltip",
    templateUrl: "./viewer_aura_gain_tooltip.html",
    styleUrls: ["./viewer_aura_gain_tooltip.scss"]
})
export class ViewerAuraGainTooltipComponent {

    @Input() payload: Array<AuraGainOverviewRow> = [];
    @Input() abilities$: Map<number, RaidMeterSubject>;
    @Input() units$: Map<number, RaidMeterSubject>;

    constructor(
        public dateService: DateService
    ) {
    }

    get_unit_name(unit: Unit): string {
        if (!this.units$)
            return CONST_UNKNOWN_LABEL;
        return this.units$.get(get_unit_id(unit, false))?.name;
    }

    get_ability_name(spell_id: number): string {
        if (!this.abilities$)
            return CONST_UNKNOWN_LABEL;
        return this.abilities$.get(spell_id)?.name;
    }

}
