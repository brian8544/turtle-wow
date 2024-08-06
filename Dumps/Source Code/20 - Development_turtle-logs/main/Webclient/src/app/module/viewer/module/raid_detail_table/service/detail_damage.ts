import {Injectable, OnDestroy} from "@angular/core";
import {InstanceDataService} from "../../../service/instance_data";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {SelectOption} from "../../../../../template/input/select_input/domain_value/select_option";
import {DetailRow} from "../domain_value/detail_row";
import {HitType} from "../../../domain_value/hit_type";
import {SpellService} from "../../../service/spell";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";

@Injectable({
    providedIn: "root",
})
export class DetailDamageService implements OnDestroy {

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
            if (knecht_update.includes(KnechtUpdates.FilterChanged) || (knecht_update.includes(KnechtUpdates.NewData) && [12, 13].some(evt => evt_types.includes(evt))))
                this.commit();
        });
        this.commit();
    }

    private async commit(): Promise<void> {
        if (!this.instanceDataService.isInitialized()) return;
        const abilities = new Map<number, SelectOption>();

        const result1_job = this.instanceDataService.knecht_melee.detail_damage(this.current_mode);
        const result2_job = this.instanceDataService.knecht_spell_damage.detail_damage(this.current_mode);
        const ts_result1_job = this.instanceDataService.knecht_melee.damage_target_summary(this.current_mode);
        const ts_result2_job = this.instanceDataService.knecht_spell_damage.damage_target_summary(this.current_mode);
        const result1 = await result1_job;
        const result2 = await result2_job;

        for (const data_set of [result1, result2]) {
            for (const [unit_id, ab_arr] of data_set) {
                for (const [ability_id, detail_rows] of ab_arr) {
                    if (!abilities.has(ability_id))
                        abilities.set(ability_id, {
                            value: ability_id,
                            label_key: this.spellService.get_spell_name(ability_id)
                        });
                }
            }
        }

        for (const [unit_id, ab_arr] of result1) {
            const res2_arr = result2.find(([i_unit_id,]) => i_unit_id === unit_id);
            if (res2_arr === undefined) result2.push([unit_id, ab_arr]);
            else res2_arr[1].push(...ab_arr);
        }

        const ts_result1 = await ts_result1_job;
        const ts_result2 = await ts_result2_job;

        for (const [se_unit_id, te_dmg] of ts_result1) {
            const res2_arr = ts_result2.find(([i_unit_id,]) => i_unit_id === se_unit_id);
            if (!!res2_arr) {
                for (const [te_unit_id, amount] of te_dmg) {
                    const res_te_unit = res2_arr[1].find(([i_te_unit_id, amount]) => i_te_unit_id === te_unit_id);
                    if (!!res_te_unit) res_te_unit[1] += amount;
                    else res2_arr[1].push([te_unit_id, amount]);
                }
            } else {
                ts_result2.push([se_unit_id, te_dmg]);
            }
        }

        // @ts-ignore
        this.abilities$.next([...abilities.values()]);
        this.ability_details$.next(result2);
        this.target_summary$.next(ts_result2);
    }
}
