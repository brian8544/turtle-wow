import {Component, EventEmitter, Input, Output} from "@angular/core";
import {RaidMeterSubject} from "../../domain_value/raid_meter_subject";
import {of} from "rxjs";
import {LoadingBarService} from "../../../../service/loading_bar";

@Component({
    selector: "MeterGraph",
    templateUrl: "./meter_graph.html",
    styleUrls: ["./meter_graph.scss"]
})
export class MeterGraphComponent {
    @Input() bar_subjects: Map<number, RaidMeterSubject> = new Map();
    @Input() bar_tooltips: Map<number, any> = new Map();
    @Input() bars: Array<[number, number]> = [];
    @Input() per_second_duration: number = 1;
    @Input() show_per_second: boolean = true;
    @Input() show_percent: boolean = true;
    @Input() show_loading: boolean = false;
    @Input() bar_label_function: (args: any, amount: number) => string;
    @Input() bar_label_args: any;
    @Input() invert: boolean = false;
    @Input() delete_label: boolean = false;

    @Output() bar_clicked: EventEmitter<[number, number]> = new EventEmitter();
    @Output() delete_clicked: EventEmitter<number> = new EventEmitter();

    isLoading: boolean = false;

    constructor(
        loadingBarService: LoadingBarService
    ) {
        loadingBarService.loading.subscribe(loading => this.isLoading = loading);
    }

    get_total(): number {
        return this.bars.reduce((acc, bar) => acc + bar[1], 0);
    }

    get_weighted_bar_fraction(amount: number): number {
        if (this.invert)
            return (this.bars.reduce((acc, bar) => bar[1] < acc ? bar[1] : acc, Number.MAX_VALUE) / amount);
        return amount / this.bars.reduce((acc, bar) => bar[1] > acc ? bar[1] : acc, 0);
    }

    get_fraction(amount: number): number {
        return amount / this.get_total();
    }

    get_dps(amount: number): number {
        return amount / this.per_second_duration;
    }

    get_bar_subject(subject_id: number): RaidMeterSubject {
        if (this.bar_subjects.has(subject_id))
            return this.bar_subjects.get(subject_id);
        return {
            id: subject_id,
            name: "Unknown",
            color_class: "hero_class_bg_1",
            icon: "/assets/wow_icon/inv_misc_questionmark.jpg"
        };
    }

    get_width_style(amount: number): string {
        const bar_fraction = this.get_weighted_bar_fraction(amount);
        if (!this.show_percent)
            return "calc(max(0px, calc(" + bar_fraction.toString() + " * calc(100% - 25px))))";
        return "calc(max(0px, calc(" + bar_fraction.toString() + " * calc(100% - 85px))))";
    }

    get_amount(amount: number): string {
        if (!!this.bar_label_function)
            return this.bar_label_function(this.bar_label_args, amount);
        if (amount % 1 === 0)
            return amount.toLocaleString('en-US');
        return amount.toFixed(1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    format_dps(amount: number): string {
        return this.get_dps(amount).toFixed(1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    emit_delete(subject_id: number): void {
        this.delete_clicked.next(subject_id);
    }
}
