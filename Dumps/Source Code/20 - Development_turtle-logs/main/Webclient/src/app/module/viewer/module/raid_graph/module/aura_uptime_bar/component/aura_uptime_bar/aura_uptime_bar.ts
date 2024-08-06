import {Component, Input, OnInit} from "@angular/core";
import {Localized} from "../../../../../../../../domain_value/localized";
import {BasicSpell} from "../../../../../../../../domain_value/data/basic_spell";
import {SpellService} from "../../../../../../service/spell";
import {Observable} from "rxjs";

@Component({
    selector: "AuraUptimeBar",
    templateUrl: "./aura_uptime_bar.html",
    styleUrls: ["./aura_uptime_bar.scss"]
})
export class AuraUptimeBarComponent implements OnInit {

    @Input() details: { id: number, label: string };
    @Input() intervals: Array<[number, number]>;
    @Input() min: number;
    @Input() max: number;

    spell: Observable<Localized<BasicSpell>>;

    constructor(private spell_service: SpellService) {
    }

    ngOnInit(): void {
        this.spell = this.spell_service.get_localized_basic_spell(this.details.id);
    }

    normalize_interval(interval: [number, number]): [number, number] {
        const start = Math.max(interval[0], this.min);
        const end = Math.min(interval[1], this.max);
        return [start, end];
    }

    get_interval_width(interval: [number, number]): number {
        const [start, end] = this.normalize_interval(interval);
        return 100 * (end - start) / (this.max - this.min);
    }

    get_left_position(interval: [number, number]): number {
        const [start, end] = this.normalize_interval(interval);
        return 100 * (start - this.min) / (this.max - this.min);
    }
}
