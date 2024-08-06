import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {SelectOption} from "../../../../../template/input/select_input/domain_value/select_option";
import {HitType} from "../../../domain_value/hit_type";
import {DetailRow} from "../domain_value/detail_row";
import {InstanceDataService} from "../../../service/instance_data";
import {SpellService} from "../../../service/spell";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";
import {ABSORBING_SPELL_IDS, get_absorb_data_points} from "../../../stdlib/absorb";
import {detail_row_post_processing, fill_details} from "../stdlib/util";
import {HealMode} from "../../../domain_value/heal_mode";
import {school_array_to_school_mask} from "../../../domain_value/school";

@Injectable({
    providedIn: "root",
})
export class DetailHealAndAbsorbService implements OnDestroy {

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
            if (knecht_update.includes(KnechtUpdates.FilterChanged) || (knecht_update.includes(KnechtUpdates.NewData) && [6, 12, 13].some(evt => evt_types.includes(evt))))
                this.commit();
        });
        this.commit();
    }

    private async commit(): Promise<void> {
        if (!this.instanceDataService.isInitialized()) return;
        const abilities = new Map<number, SelectOption>();

        const absorbs_job = get_absorb_data_points(this.current_mode, this.instanceDataService);
        const heal_job = this.instanceDataService.knecht_heal.detail_heal(HealMode.Effective, this.current_mode);
        const target_summary_heal_job = this.instanceDataService.knecht_heal.heal_target_summary(HealMode.Effective, this.current_mode);
        const [absorbs, ts_absorbs] = await absorbs_job;
        const heal = await heal_job;

        const result = [];
        for (const [subject_id, ab_arr] of absorbs) {
            const i_result = new Map();
            for (const [absorbed_spell_id, points] of ab_arr) {
                if (!abilities.has(absorbed_spell_id))
                    abilities.set(absorbed_spell_id, {
                        value: absorbed_spell_id,
                        label_key: this.spellService.get_spell_name(absorbed_spell_id)
                    });
                if (!i_result.has(absorbed_spell_id))
                    i_result.set(absorbed_spell_id, new Map());
                const details_map = i_result.get(absorbed_spell_id);
                for (const [timestamp, amount] of points) {
                    fill_details([[amount, school_array_to_school_mask(ABSORBING_SPELL_IDS.get(absorbed_spell_id)[1]), 0, 0, 0]], [HitType.Hit], details_map);
                }
            }
            result.push([subject_id, i_result]);
        }

        for (const [unit_id, ab_arr] of heal) {
            for (const [ability_id,] of ab_arr) {
                if (!abilities.has(ability_id))
                    abilities.set(ability_id, {
                        value: ability_id,
                        label_key: this.spellService.get_spell_name(ability_id)
                    });
            }
        }

        const processed_absorbs = result.map(([unit_id, i_result]) => [unit_id, detail_row_post_processing(i_result)]);
        for (const [subject_id, ab_arr] of processed_absorbs) {
            const healed_unit = heal.find(([unit_id,]) => unit_id === subject_id);
            if (!!healed_unit) healed_unit[1].push(...ab_arr);
            else heal.push([subject_id, ab_arr]);
        }

        const target_summary = await target_summary_heal_job;
        for (const [se_unit_id, te_dmg] of ts_absorbs) {
            const res2_arr = target_summary.find(([i_unit_id,]) => i_unit_id === se_unit_id);
            if (!!res2_arr) {
                for (const [te_unit_id, amount] of te_dmg) {
                    const res_te_unit = res2_arr[1].find(([i_te_unit_id, amount]) => i_te_unit_id === te_unit_id);
                    if (!!res_te_unit) res_te_unit[1] += amount;
                    else res2_arr[1].push([te_unit_id, amount]);
                }
            } else {
                target_summary.push([se_unit_id, te_dmg]);
            }
        }

        // @ts-ignore
        this.abilities$.next([...abilities.values()]);
        this.ability_details$.next(heal);
        this.target_summary$.next(target_summary);
    }
}
