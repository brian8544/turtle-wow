import {Component, Input} from "@angular/core";

@Component({
    selector: "TalentArrow",
    templateUrl: "./talent_arrow.html",
    styleUrls: ["./talent_arrow.scss"]
})
export class TalentArrowComponent {
    @Input() vertical: boolean = false;
    @Input() is_filler: boolean = false;
    @Input() arrow_has_pointer: boolean = true;
    @Input() arrow_is_golden: boolean = false;
}
