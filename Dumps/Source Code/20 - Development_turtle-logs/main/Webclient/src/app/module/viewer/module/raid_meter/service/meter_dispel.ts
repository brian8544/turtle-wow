import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {InstanceDataService} from "../../../service/instance_data";
import {UnAuraOverviewRow} from "../module/un_aura_overview/domain_value/un_aura_overview_row";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";
import {UnitService} from "../../../service/unit";
import {SpellService} from "../../../service/spell";
import {InstanceViewerMeta} from "../../../domain_value/instance_viewer_meta";

@Injectable({
    providedIn: "root",
})
export class MeterDispelService implements OnDestroy {

    private subscription: Subscription;

    private data$: BehaviorSubject<Array<[number, Array<UnAuraOverviewRow>]>> = new BehaviorSubject([]);

    private initialized: boolean = false;
    private current_mode: boolean = false;
    private current_meta: InstanceViewerMeta;

    constructor(
        private instanceDataService: InstanceDataService,
        private unitService: UnitService,
        private spellService: SpellService
    ) {
        this.instanceDataService.meta.subscribe(meta => this.current_meta = meta);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get_data(mode: boolean): Observable<Array<[number, Array<UnAuraOverviewRow>]>> {
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
            if (knecht_update.includes(KnechtUpdates.FilterChanged) || (knecht_update.includes(KnechtUpdates.NewData) && [9].some(evt => evt_types.includes(evt))))
                this.merge_data();
        });
    }

    private async merge_data(): Promise<void> {
        if (!this.instanceDataService.isInitialized()) return;
        const result = new Map<number, Array<UnAuraOverviewRow>>();

        const result1 = await this.instanceDataService.knecht_un_aura.meter_dispel(this.current_mode);
        for (const [subject_id, [subject, un_aura_overview_rows]] of result1) {
            if (!result.has(subject_id))
                result.set(subject_id, un_aura_overview_rows);
            else result.get(subject_id).push(...un_aura_overview_rows);
            for (const row of un_aura_overview_rows) {
                this.unitService.get_unit_basic_information(row.caster, this.current_meta.end_ts ?? this.current_meta.start_ts);
                this.unitService.get_unit_basic_information(row.target, this.current_meta.end_ts ?? this.current_meta.start_ts);
                this.spellService.get_spell_basic_information(row.caster_spell_id);
                this.spellService.get_spell_basic_information(row.target_spell_id);
            }
        }

        this.data$.next([...result.entries()]);
    }
}
