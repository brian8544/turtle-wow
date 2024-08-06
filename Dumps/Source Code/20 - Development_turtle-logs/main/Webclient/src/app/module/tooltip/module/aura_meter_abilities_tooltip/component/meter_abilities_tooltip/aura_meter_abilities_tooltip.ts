import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import {HitType} from "../../../../../viewer/domain_value/hit_type";
import {DetailRow} from "../../../../../viewer/module/raid_detail_table/domain_value/detail_row";

@Component({
    selector: "AuraMeterAbilitiesTooltip",
    templateUrl: "./aura_meter_abilities_tooltip.html",
    styleUrls: ["./aura_meter_abilities_tooltip.scss"]
})
export class AuraMeterAbilitiesTooltipComponent {

    @Input() payload: Array<[string, number]>;

    format_number(number_str: number): string {
        return number_str.toLocaleString("en-US");
    }
}
