import {Component, Input} from "@angular/core";
import {DateService} from "../../../../../../service/date";
import {Router} from "@angular/router";

@Component({
    selector: "RankingMeterTooltip",
    templateUrl: "./ranking_meter_tooltip.html",
    styleUrls: ["./ranking_meter_tooltip.scss"]
})
export class RankingMeterTooltipComponent {

    @Input() payload: {
        instance_meta_ids: Array<number>,
        attempt_ids: Array<number>,
        encounter_names: Array<string>,
        amounts: Array<number>,
        durations: Array<number>
    };

    constructor(
        public dateService: DateService,
        private router: Router
    ) {
    }

    format_number(number_str: number): string {
        return number_str.toLocaleString("en-US");
    }

    navigate_to_viewer(row: [string, number, number, number, number, number]): void {
        this.router.navigate(["/viewer/" + row[4].toString() + "/base"], {queryParams: {preselected_attempt_id: row[5]}});
    }

    get results(): Array<[string, number, number, number, number, number]> {
        if (!this.payload?.encounter_names)
            return [];

        const results = [];
        for (let i=0; i<this.payload.encounter_names.length; ++i) {
            results.push([
                this.payload.encounter_names[i],
                this.payload.amounts[i],
                this.payload.durations[i],
                (this.payload.amounts[i] / (this.payload.durations[i] / 1000)).toFixed(1),
                this.payload.instance_meta_ids[i],
                this.payload.attempt_ids[i]
            ]);
        }
        return results.sort((left, right) => right[3] - left[3]);
    }
}
