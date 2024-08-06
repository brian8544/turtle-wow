import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {SelectOption} from "../../../../../template/input/select_input/domain_value/select_option";
import {HitType} from "../../../domain_value/hit_type";
import {DetailRow} from "../domain_value/detail_row";
import {InstanceDataService} from "../../../service/instance_data";
import {SpellService} from "../../../service/spell";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";

@Injectable({
    providedIn: "root",
})
export class DetailThreatService implements OnDestroy {

    private subscription: Subscription;

    private abilities$: BehaviorSubject<Array<SelectOption>> = new BehaviorSubject([]);
    private ability_details$: BehaviorSubject<Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]>> = new BehaviorSubject([]);
    private target_summary$: BehaviorSubject<Array<[number, Array<[number, number]>]>> = new BehaviorSubject([]);

    private initialized: boolean = false;

    private current_mode: boolean = false;

    constructor(
        private instanceDataService: InstanceDataService,
        private spellService: SpellService
    ) {
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get_ability_and_details(mode: boolean): [Observable<Array<SelectOption>>, Observable<Array<[number, Array<[number, Array<[HitType, DetailRow]>]>]>>, Observable<Array<[number, Array<[number, number]>]>>] {
        if (!this.initialized) {
            this.current_mode = mode;
            this.initialize();
        } else if (this.current_mode !== mode) {
            this.current_mode = mode;
            this.commit();
        }
        return [this.abilities$.asObservable(), this.ability_details$.asObservable(), this.target_summary$.asObservable()];
    }

    private initialize(): void {
        this.initialized = true;
        this.subscription = this.instanceDataService.knecht_updates.subscribe(async ([knecht_update, evt_types]) => {
            if (knecht_update.includes(KnechtUpdates.FilterChanged) || (knecht_update.includes(KnechtUpdates.NewData) && [15].some(evt => evt_types.includes(evt))))
                this.commit();
        });
        this.commit();
    }

    private async commit(): Promise<void> {
        if (!this.instanceDataService.isInitialized()) return;
        const abilities = new Map<number, SelectOption>();

        const result1_job = this.instanceDataService.knecht_threat.detail_threat(this.current_mode);
        const target_summary_job = this.instanceDataService.knecht_threat.threat_target_summary(this.current_mode);
        const result1 = await result1_job;
        const target_summary = await target_summary_job;

        for (const [unit_id, ab_arr] of result1) {
            for (const [ability_id, detail_rows] of ab_arr) {
                if (!abilities.has(ability_id))
                    abilities.set(ability_id, {
                        value: ability_id,
                        label_key: this.spellService.get_spell_name(ability_id)
                    });
            }
        }

        // @ts-ignore
        this.abilities$.next([...abilities.values()]);
        this.ability_details$.next(result1);
        this.target_summary$.next(target_summary);
    }
}
