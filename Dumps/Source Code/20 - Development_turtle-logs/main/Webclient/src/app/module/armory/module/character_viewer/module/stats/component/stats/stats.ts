import {Component, Input} from "@angular/core";

@Component({
    selector: "Stats",
    templateUrl: "./stats.html",
    styleUrls: ["./stats.scss"]
})
export class StatsComponent {

    @Input() stats: Array<{ stat_type: string; stat_value: number }>;

}
