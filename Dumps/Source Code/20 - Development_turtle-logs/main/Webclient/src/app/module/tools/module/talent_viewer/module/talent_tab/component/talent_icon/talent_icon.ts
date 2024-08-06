import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Talent} from "../../value_object/talent";

@Component({
    selector: "TalentIcon",
    templateUrl: "./talent_icon.html",
    styleUrls: ["./talent_icon.scss"]
})
export class TalentIconComponent {

    @Input() talent: Talent;
    @Input() expansion_id: number;
    @Input() is_horizontal_arrow_filler: boolean = false;
    @Input() is_vertical_arrow_filler: boolean = false;
    @Input() is_diagonal_arrow_filler: boolean = false;
    @Input() can_spend_points: boolean;
    @Input() can_retrieve_points: boolean;
    @Input() is_grayed_out: boolean;
    @Input() is_vertical_arrow_golden: boolean = false;
    @Input() is_horizontal_arrow_golden: boolean = false;
    @Input() is_diagonal_arrow_golden: boolean = false;

    @Output() talentChange: EventEmitter<Talent> = new EventEmitter();

    on_click(event): void {
        if (event.shiftKey) {
            if (!this.can_retrieve_points)
                return;
            this.on_left_click_shift();
        } else {
            if (!this.can_spend_points)
                return;
            this.on_left_click();
        }
    }

    on_left_click(): void {
        if (this.talent.max_points > this.talent.points_spend) {
            ++this.talent.points_spend;
            this.talentChange.next(this.talent);
        }
    }

    on_left_click_shift(): void {
        if (this.talent.points_spend > 0) {
            --this.talent.points_spend;
            this.talentChange.next(this.talent);
        }
    }

    has_green_border(): boolean {
        return !this.talent.is_filler && this.talent.points_spend < this.talent.max_points;
    }

    has_golden_border(): boolean {
        return !this.talent.is_filler && this.talent.points_spend === this.talent.max_points;
    }

}
