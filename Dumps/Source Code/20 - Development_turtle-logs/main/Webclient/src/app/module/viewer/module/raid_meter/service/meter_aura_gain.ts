import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {InstanceDataService} from "../../../service/instance_data";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";
import {AuraGainOverviewRow} from "../domain_value/aura_gain_overview_row";
import {SpellService} from "../../../service/spell";
import {UnitService} from "../../../service/unit";
import {InstanceViewerMeta} from "../../../domain_value/instance_viewer_meta";

@Injectable({
    providedIn: "root",
})
export class MeterAuraGainService implements OnDestroy {

    private subscription: Subscription;

    private data$: BehaviorSubject<Array<[number, Array<AuraGainOverviewRow>]>> = new BehaviorSubject([]);

    private initialized: boolean = false;
    private current_mode: boolean = false;
    private current_meta: InstanceViewerMeta;

    constructor(
        private instanceDataService: InstanceDataService,
        private spellService: SpellService,
        private unitService: UnitService
    ) {
        this.instanceDataService.meta.subscribe(meta => this.current_meta = meta);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get_data(mode: boolean): Observable<Array<[number, Array<AuraGainOverviewRow>]>> {
        if (!this.initialized) {
            this.current_mode = mode;
            this.initialize();
        } else if (this.current_mode !== mode) {
            this.current_mode = mode;
            this.merge_data();
        }
        return this.data$.asObservable();
    }

    private initialize(): void {
        this.initialized = true;
        this.merge_data();
        this.subscription = this.instanceDataService.knecht_updates.subscribe(async ([knecht_update, evt_types]) => {
            if (knecht_update.includes(KnechtUpdates.FilterChanged) || (knecht_update.includes(KnechtUpdates.NewData) && [6].some(evt => evt_types.includes(evt))))
                this.merge_data();
        });
    }

    private async merge_data(): Promise<void> {
        if (!this.instanceDataService.isInitialized()) return;
        const data_set = await this.instanceDataService.knecht_aura.meter_aura_gain(this.current_mode);
        const result = [];
        for (const [subject_id, [subject, rows]] of data_set) {
            this.unitService.get_unit_basic_information(subject, this.current_meta.end_ts ?? this.current_meta.start_ts);
            for (const row of rows) {
                this.spellService.get_spell_basic_information(row.ability);
                this.unitService.get_unit_basic_information(row.caster, this.current_meta.end_ts ?? this.current_meta.start_ts);
                this.unitService.get_unit_basic_information(row.target, this.current_meta.end_ts ?? this.current_meta.start_ts);
            }
            result.push([subject_id, rows]);
        }

        this.data$.next(result);
    }
}
