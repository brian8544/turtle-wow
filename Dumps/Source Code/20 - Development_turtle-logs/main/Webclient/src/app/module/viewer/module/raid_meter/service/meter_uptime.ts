import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {InstanceDataService} from "../../../service/instance_data";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";
import {UnitService} from "../../../service/unit";
import {InstanceViewerMeta} from "../../../domain_value/instance_viewer_meta";

@Injectable({
    providedIn: "root",
})
export class MeterUptimeService implements OnDestroy {
    private static TIMEOUT: number = 5000;

    private subscription: Subscription;

    private data$: BehaviorSubject<Array<[number, Array<[number, number]>]>> = new BehaviorSubject([]);

    private initialized: boolean = false;
    private current_mode: boolean = false;
    private current_meta: InstanceViewerMeta;

    constructor(
        private instanceDataService: InstanceDataService,
        private unitService: UnitService,
    ) {
        this.instanceDataService.meta.subscribe(meta => this.current_meta = meta);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get_data(mode: boolean): Observable<Array<[number, Array<[number, number]>]>> {
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
            if (knecht_update.includes(KnechtUpdates.FilterChanged) || (knecht_update.includes(KnechtUpdates.NewData) && [12, 13, 14].some(evt => evt_types.includes(evt))))
                this.merge_data();
        });
    }

    private async merge_data(): Promise<void> {
        if (!this.instanceDataService.isInitialized()) return;

        const result1_job = this.instanceDataService.knecht_melee.meter_uptime(this.current_mode);
        const result2_job = this.instanceDataService.knecht_spell_damage.meter_uptime(this.current_mode);
        const result3_job = this.instanceDataService.knecht_heal.meter_uptime(this.current_mode);
        const result1 = await result1_job;
        const result2 = await result2_job;
        const result3 = await result3_job;
        const result = new Map<number, Array<[number, number]>>();
        for (const data_set of [result1, result2, result3]) {
            for (const [subject_id, [subject, uptime_intervals]] of data_set) {
                this.unitService.get_unit_basic_information(subject, this.current_meta.end_ts ?? this.current_meta.start_ts);

                // Merging
                if (result.has(subject_id)) {
                    let intervals = result.get(subject_id);
                    intervals.push(...uptime_intervals);
                    intervals = intervals.sort((left, right) => left[0] - right[0]);
                    const new_intervals = [];
                    let current_start = intervals[0][0];
                    let current_end = intervals[0][0];
                    for (const [start, end] of intervals) {
                        if (start - MeterUptimeService.TIMEOUT > current_end) {
                            new_intervals.push([current_start, current_end]);
                            current_start = start;
                            current_end = end;
                        } else {
                            current_start = Math.min(current_start, start);
                            current_end = Math.max(current_end, end);
                        }
                    }
                    new_intervals.push([current_start, current_end]);
                    result.set(subject_id, new_intervals);
                } else {
                    result.set(subject_id, uptime_intervals);
                }
            }
        }

        this.data$.next([...result.entries()]);
    }
}
