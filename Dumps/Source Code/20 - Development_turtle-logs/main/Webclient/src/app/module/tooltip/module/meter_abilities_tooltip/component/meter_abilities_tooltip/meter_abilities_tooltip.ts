import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import {HitType} from "../../../../../viewer/domain_value/hit_type";
import {DetailRow} from "../../../../../viewer/module/raid_detail_table/domain_value/detail_row";

@Component({
    selector: "MeterAbilitiesTooltip",
    templateUrl: "./meter_abilities_tooltip.html",
    styleUrls: ["./meter_abilities_tooltip.scss"]
})
export class MeterAbilitiesTooltipComponent {

    private static HITTING_HIT_TYPES: Array<HitType> = [HitType.Hit, HitType.PartialAbsorb, HitType.OffHand,
        HitType.Crushing, HitType.PartialResist, HitType.Glancing, HitType.Crit, HitType.PartialBlock, HitType.Split];

    @Input() payload: Array<[string, number, Array<[HitType, DetailRow]>]>;
    @Input() target_summary: Array<[string, number]>;

    format_number(number_str: number): string {
        return number_str.toLocaleString("en-US");
    }

    get_percent(amount: number): string {
        return (100 * amount / this.payload.reduce((acc, value) => acc + value[1], 0)).toFixed(1);
    }

    get_num_hits(details: Array<[HitType, DetailRow]>): number {
        return details.filter(([ht, dr]) => MeterAbilitiesTooltipComponent.HITTING_HIT_TYPES.includes(ht))
            .reduce((acc, [ht, dr]) => acc + dr.content.count, 0);
    }

    get_num_misses(details: Array<[HitType, DetailRow]>): number {
        return details.filter(([ht, dr]) => !MeterAbilitiesTooltipComponent.HITTING_HIT_TYPES.includes(ht))
            .reduce((acc, [ht, dr]) => acc + dr.content.count, 0);
    }
}
