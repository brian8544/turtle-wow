import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {InstanceDataService} from "../../../service/instance_data";
import {DeathOverviewRow} from "../module/deaths_overview/domain_value/death_overview_row";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";
import {UnitService} from "../../../service/unit";
import {SpellService} from "../../../service/spell";
import {InstanceViewerMeta} from "../../../domain_value/instance_viewer_meta";

@Injectable({
    providedIn: "root",
})
export class MeterDeathService implements OnDestroy {

    private subscription: Subscription;

    private data$: BehaviorSubject<Array<[number, Array<DeathOverviewRow>]>> = new BehaviorSubject([]);

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

    get_data(mode: boolean): Observable<Array<[number, Array<DeathOverviewRow>]>> {
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
            if (knecht_update.includes(KnechtUpdates.FilterChanged) || (knecht_update.includes(KnechtUpdates.NewData) && [12, 13].some(evt => evt_types.includes(evt))))
                this.merge_data();
        });
    }

    private async merge_data(): Promise<void> {
        if (!this.instanceDataService.isInitialized()) return;
        const result = new Map<number, Array<DeathOverviewRow>>();

        const result1 = await this.instanceDataService.knecht_melee.meter_death(this.current_mode);
        const result2 = await this.instanceDataService.knecht_spell_damage.meter_death(this.current_mode);
        for (const data_set of [result1, result2]) {
            for (const [subject_id, [subject, death_overview_rows]] of data_set) {
                this.unitService.get_unit_basic_information(subject, this.current_meta.end_ts ?? this.current_meta.start_ts);
                if (!result.has(subject_id))
                    result.set(subject_id, death_overview_rows);
                else {
                    const existing_rows = result.get(subject_id);
                    for (const row of death_overview_rows) {
                        const existing_row = existing_rows.find(i_row => i_row.timestamp === row.timestamp && i_row.murdered[0] === row.murdered[0]);
                        if (!!existing_row) {
                            if (existing_row.killing_blow.timestamp > row.killing_blow.timestamp) {
                                existing_row.killing_blow = row.killing_blow;
                                existing_row.murder = row.murder;
                            }
                        } else {
                            existing_rows.push(row);
                        }
                    }
                }
                for (const row of death_overview_rows) {
                    this.spellService.get_spell_basic_information(row.killing_blow.ability_id);
                    this.unitService.get_unit_basic_information(row.murder, this.current_meta.end_ts ?? this.current_meta.start_ts);
                    this.unitService.get_unit_basic_information(row.murdered, this.current_meta.end_ts ?? this.current_meta.start_ts);
                }
            }
        }

        this.data$.next([...result.entries()]);
    }
}
