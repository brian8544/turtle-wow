import {Component, Input} from "@angular/core";
import {ResistSummary} from "../../../../domain_value/detail_row";

@Component({
    selector: "ResistSummary",
    templateUrl: "./resist_summary.html",
    styleUrls: ["./resist_summary.scss"]
})
export class ResistSummaryComponent {

    @Input() resist_summary: ResistSummary;

}
