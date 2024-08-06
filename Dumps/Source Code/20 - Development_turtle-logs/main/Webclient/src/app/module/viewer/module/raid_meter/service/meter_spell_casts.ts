import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {UnAuraOverviewRow} from "../module/un_aura_overview/domain_value/un_aura_overview_row";
import {InstanceDataService} from "../../../service/instance_data";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";
import {InstanceViewerMeta} from "../../../domain_value/instance_viewer_meta";
import {UnitService} from "../../../service/unit";
import {SpellService} from "../../../service/spell";

@Injectable({
    providedIn: "root",
})
export class MeterSpellCastsService implements OnDestroy {

    private subscription: Subscription;

    private data$: BehaviorSubject<Array<[number, Array<[number, number]>]>> = new BehaviorSubject([]);

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
            if (knecht_update.includes(KnechtUpdates.FilterChanged) || (knecht_update.includes(KnechtUpdates.NewData) && [0].some(evt => evt_types.includes(evt))))
                this.merge_data();
        });
    }

    private async merge_data(): Promise<void> {
        if (!this.instanceDataService.isInitialized()) return;
        const result = new Map<number, Map<number, number>>();

        const result1 = await this.instanceDataService.knecht_spell_cast.meter_spell_casts(this.current_mode);
        for (const [subject_id, [subject, abilities]] of result1) {
            this.unitService.get_unit_basic_information(subject, this.current_meta.end_ts ?? this.current_meta.start_ts);
            if (!result.has(subject_id))
                result.set(subject_id, new Map());
            const ability_map = result.get(subject_id);
            for (const [ability_id, amount] of abilities) {
                this.spellService.get_spell_basic_information(ability_id);
                ability_map.set(ability_id, amount);
            }
        }

        this.data$.next([...result.entries()].map(([subject_id, abilities]) => [subject_id, [...abilities.entries()]]));
    }
}
