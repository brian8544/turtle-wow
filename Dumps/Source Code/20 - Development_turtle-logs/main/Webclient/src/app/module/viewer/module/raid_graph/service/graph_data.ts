import {Injectable, OnDestroy} from "@angular/core";
import {InstanceDataService} from "../../../service/instance_data";
import {BehaviorSubject, Observable, Subject, Subscription, zip} from "rxjs";
import {DataSet, is_event_data_set} from "../domain_value/data_set";
import {RaidGraphKnecht} from "../tool/raid_graph_knecht";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";
import {MeterAuraUptimeService} from "../../raid_meter/service/meter_aura_uptime";
import {flatten_aura_uptime_to_spell_map} from "../../raid_meter/stdlib/aura_uptime";
import {SpellService} from "../../../service/spell";
import {map} from "rxjs/operators";
import {get_absorb_data_points} from "../../../stdlib/absorb";
import {ChartType, number_to_chart_type} from "../domain_value/chart_type";
import {Unit} from "../../../domain_value/unit";
import {UnitService} from "../../../service/unit";
import {MeterSpellCastsService} from "../../raid_meter/service/meter_spell_casts";

@Injectable({
    providedIn: "root",
})
export class GraphDataService implements OnDestroy {
    private static readonly X_AXIS_RESOLUTION: number = 1000;

    private subscription_absorb_done: Subscription;

    private subscription: Subscription;
    private data_points$: BehaviorSubject<[Array<number>, Array<[DataSet, [Array<number>, Array<number>, Array<Unit>, Array<Array<[number, number]>>]]>]> = new BehaviorSubject([[], []]);
    private current_data: Map<DataSet, [Array<number>, Array<number>, Array<Unit>, Array<Array<[number, number]>>]> = new Map();

    private source_ability_intervals: Array<[number, Array<[number, number]>]> = [];
    private target_ability_intervals: Array<[number, Array<[number, number]>]> = [];

    private source_abilities$: Subject<Array<{ id: number, label: string }>> = new Subject();
    private target_abilities$: Subject<Array<{ id: number, label: string }>> = new Subject();
    private source_spell_cast_abilities$: Subject<Array<{ id: number, label: string }>> = new Subject();

    private source_meter_aura_uptime_service: MeterAuraUptimeService;
    private target_meter_aura_uptime_service: MeterAuraUptimeService;
    private source_meter_spell_cast_service: MeterSpellCastsService;

    // Helper for Export
    private graph_mode: ChartType = ChartType.Line;
    private selectedSourceAbilities: Array<number> = [];
    private selectedTargetAbilities: Array<number> = [];
    private selectedSourceSpellCastAbilities: Array<number> = [];
    public overwrite_selection: Subject<any> = new Subject();

    constructor(
        private instanceDataService: InstanceDataService,
        private spell_service: SpellService,
        private unitService: UnitService,
        private spellService: SpellService
    ) {
        this.subscription = this.instanceDataService.knecht_updates.subscribe(([knecht_updates, _]) => {
            if (knecht_updates.some(elem => [KnechtUpdates.NewData, KnechtUpdates.FilterChanged].includes(elem))) {
                for (const [data_set, data] of this.data_points$.getValue()[1])
                    this.add_data_set(data_set);
            }
        });

        this.source_meter_aura_uptime_service = new MeterAuraUptimeService(instanceDataService, unitService, spellService);
        this.target_meter_aura_uptime_service = new MeterAuraUptimeService(instanceDataService, unitService, spellService);
        this.source_meter_spell_cast_service = new MeterSpellCastsService(instanceDataService, unitService, spellService);

        this.subscription.add(this.source_meter_aura_uptime_service.get_data(false).subscribe(data => {
            this.source_ability_intervals = flatten_aura_uptime_to_spell_map(data);
            const observables = this.source_ability_intervals
                .map(([spell_id, intervals]) => this.spell_service.get_localized_basic_spell(spell_id)
                    .pipe(map(spell => {
                        return {
                            id: spell_id,
                            label: spell?.localization
                        };
                    })));
            zip(...observables).subscribe(abilities => this.source_abilities$.next(abilities));
        }));
        this.subscription.add(this.target_meter_aura_uptime_service.get_data(true).subscribe(data => {
            this.target_ability_intervals = flatten_aura_uptime_to_spell_map(data);
            const observables = this.target_ability_intervals
                .map(([spell_id, intervals]) => this.spell_service.get_localized_basic_spell(spell_id)
                    .pipe(map(spell => {
                        return {
                            id: spell_id,
                            label: spell?.localization
                        };
                    })));
            zip(...observables).subscribe(abilities => this.target_abilities$.next(abilities));
        }));
        this.subscription.add(this.source_meter_spell_cast_service.get_data(false).subscribe(data => {
            const spells = data.reduce((acc, [unit_id, ab_arr]) => acc.concat(ab_arr.map(([ability_id,]) => ability_id)), []);
            const observables = spells
                .map((spell_id) => this.spell_service.get_localized_basic_spell(spell_id)
                    .pipe(map(spell => {
                        return {
                            id: spell_id,
                            label: spell?.localization
                        };
                    })));
            zip(...observables).subscribe(abilities => this.source_spell_cast_abilities$.next(abilities));
        }));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    set_graph_mode(chart_type: number): void {
        this.graph_mode = number_to_chart_type(chart_type);
    }

    get_current_graph_mode(): ChartType {
        return this.graph_mode;
    }

    get_selected_data_sets(): Array<DataSet> {
        return [...this.current_data.keys()].filter(dataset => !is_event_data_set(dataset));
    }

    get_selected_events(): Array<DataSet> {
        return [...this.current_data.keys()].filter(dataset => is_event_data_set(dataset));
    }

    setSelectedSourceAbilities(abilities: Array<number>): void {
        this.selectedSourceAbilities = [...abilities];
    }

    setSelectedSourceSpellCastAbilities(abilities: Array<number>): void {
        if (this.selectedSourceSpellCastAbilities.length > abilities.length) {
            this.remove_data_set(DataSet.SpellCasts);
        }

        this.selectedSourceSpellCastAbilities = [...abilities];
        if (abilities.length > 0) {
            this.add_data_set(DataSet.SpellCasts);
        }
    }

    get_selected_source_spell_cast_spell_ids(): Array<number> {
        return this.selectedSourceSpellCastAbilities;
    }

    get_selected_source_auras(): Array<number> {
        return this.selectedSourceAbilities;
    }

    setSelectedTargetAbilities(abilities: Array<number>): void {
        this.selectedTargetAbilities = [...abilities];
    }

    get_selected_target_auras(): Array<number> {
        return this.selectedTargetAbilities;
    }

    get data_points(): Observable<[Array<number>, Array<[DataSet, [Array<number>, Array<number>, Array<Unit>, Array<Array<[number, number]>>]]>]> {
        return this.data_points$.asObservable();
    }

    get source_abilities(): Observable<Array<{ id: number, label: string }>> {
        return this.source_abilities$.asObservable();
    }

    get target_abilities(): Observable<Array<{ id: number, label: string }>> {
        return this.target_abilities$.asObservable();
    }

    get source_spell_cast_abilities(): Observable<Array<{ id: number, label: string }>> {
        return this.source_spell_cast_abilities$.asObservable();
    }

    // TODO: This causes many updates
    get_source_aura_uptime_interval(ability_id: number): Array<[number, number]> {
        const result = this.source_ability_intervals
            .find(([spell_id, interval]) => spell_id === ability_id);
        return !!result ? result[1] : undefined;
    }

    get_target_aura_uptime_interval(ability_id: number): Array<[number, number]> {
        const result = this.target_ability_intervals
            .find(([spell_id, interval]) => spell_id === ability_id);
        return !!result ? result[1] : undefined;
    }

    update(): void {
        this.data_points$.next(this.data_points$.getValue());
    }

    async add_data_set(data_set: DataSet): Promise<void> {
        if (!this.instanceDataService.isInitialized()) return;
        switch (data_set) {
            case DataSet.DamageDone:
            case DataSet.DamageTaken:
                this.commit_data_set(data_set, RaidGraphKnecht.__squash([
                    ...await this.instanceDataService.knecht_melee.graph_data_set(data_set),
                    ...await this.instanceDataService.knecht_spell_damage.graph_data_set(data_set)
                ].sort((left, right) => left[0] - right[0]) as Array<[number, number, Array<[number, number]>]>));
                break;
            case DataSet.ThreatDone:
            case DataSet.ThreatTaken:
                // TODO
                break;
            case DataSet.Deaths:
            case DataSet.Kills:
                this.commit_data_set(data_set, await this.instanceDataService.knecht_melee.graph_data_set(data_set));
                break;
            case DataSet.TotalHealingDone:
            case DataSet.TotalHealingTaken:
            case DataSet.EffectiveHealingDone:
            case DataSet.EffectiveHealingTaken:
            case DataSet.OverhealingDone:
            case DataSet.OverhealingTaken:
                this.commit_data_set(data_set, await this.instanceDataService.knecht_heal.graph_data_set(data_set));
                break;
            case DataSet.DispelsDone:
            case DataSet.DispelsReceived:
            case DataSet.SpellStealDone:
            case DataSet.SpellStealReceived:
            case DataSet.InterruptDone:
            case DataSet.InterruptReceived:
                this.commit_data_set(data_set, await this.instanceDataService.knecht_un_aura.graph_data_set(data_set));
                break;
            case DataSet.AbsorbDone:
            case DataSet.AbsorbTaken:
                this.commit_data_set(data_set, RaidGraphKnecht.squash((await get_absorb_data_points(data_set === DataSet.AbsorbTaken, this.instanceDataService))[0]
                    .reduce((acc, [subject_id, ab_arr]) => ab_arr.reduce((i_acc, [ability_id, points]) => [...i_acc, ...points], acc), [])
                    .sort((left, right) => left[0] - right[0])));
                break;
            case DataSet.HealAndAbsorbDone:
            case DataSet.HealAndAbsorbTaken:
                this.commit_data_set(data_set, RaidGraphKnecht.squash([...(await get_absorb_data_points(data_set === DataSet.HealAndAbsorbTaken, this.instanceDataService))[0]
                    .reduce((acc, [subject_id, ab_arr]) => ab_arr.reduce((i_acc, [ability_id, points]) => [...i_acc, ...points], acc), []),
                    ...await this.instanceDataService.knecht_heal.graph_data_set(data_set === DataSet.HealAndAbsorbDone ? DataSet.EffectiveHealingDone : DataSet.EffectiveHealingTaken)]
                    .sort((left, right) => left[0] - right[0])));
                break;
            case DataSet.SpellCasts:
                this.commit_data_set(data_set, ((await this.instanceDataService.knecht_spell_cast.graph_data_set(data_set)) as any)
                    .filter(pt => this.selectedSourceSpellCastAbilities.includes(pt[2])));
                break;
        }
    }

    commit_data_set(data_set: DataSet, data_set_points: Array<[number, number | Unit, Array<[number, number]>]>): void {
        const data_points = this.current_data;
        const x_axis = new Array<number>();
        const y_axis = [];
        const units = [];
        const ab_arr_dmg = []
        for (const [x, y, ab_arr] of data_set_points) {
            x_axis.push(x);
            y_axis.push(y);
            if (is_event_data_set(data_set)) {
                units.push(y);
                // @ts-ignore
                if (ab_arr > 0) {
                    // @ts-ignore
                    this.spellService.get_spell_basic_information(ab_arr);
                }
            }
            // For event datasets, its either undefined or the spell_ids as array
            ab_arr_dmg.push(ab_arr);
        }

        data_points.set(data_set, [x_axis, y_axis, units, ab_arr_dmg]);
        const res_x_axis = this.compute_x_axis();
        // const res_xy_data_sets = this.compute_dataset_xy_axis(res_x_axis);
        this.data_points$.next([res_x_axis, [...data_points.entries()]]);
    }

    remove_data_set(data_set: DataSet): void {
        this.current_data.delete(data_set);
        const res_x_axis = this.compute_x_axis();
        //const res_xy_data_sets = this.compute_dataset_xy_axis(res_x_axis);
        this.data_points$.next([res_x_axis, [...this.current_data.entries()]]);

        switch (data_set) {
            case DataSet.AbsorbDone:
                this.subscription_absorb_done?.unsubscribe();
                break;
        }
    }

    private compute_x_axis(): Array<number> {
        const data_points = this.current_data;
        let result = new Set<number>();
        for (const [timestamps, values] of data_points.values())
            result = new Set<number>([...result.values(), ...timestamps]);

        const intermediate_result = [...result.values()].sort((left, right) => left - right);
        if (intermediate_result.length < 2)
            return intermediate_result;

        const graph_resolution = Math.min(GraphDataService.X_AXIS_RESOLUTION, intermediate_result.length) + 1;
        const min = Math.min(...intermediate_result);
        const max = Math.max(...intermediate_result);
        const final_result = [];
        const tick_size = (max - min) / graph_resolution;
        for (let ts = min; ts <= max; ts += tick_size)
            final_result.push(ts);
        return final_result;
    }
}
