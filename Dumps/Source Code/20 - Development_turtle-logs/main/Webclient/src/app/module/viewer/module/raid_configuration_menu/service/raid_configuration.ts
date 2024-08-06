import {Injectable, OnDestroy} from "@angular/core";
import {InstanceDataService} from "../../../service/instance_data";
import {BehaviorSubject, combineLatest, Observable, Subject, Subscription, zip} from "rxjs";
import {Category} from "../domain_value/category";
import {InstanceViewerAttempt} from "../../../domain_value/instance_viewer_attempt";
import {Segment} from "../domain_value/segment";
import {EventSource} from "../domain_value/event_source";
import {RaidOption} from "../domain_value/raid_option";
import {debounceTime, map, take, takeUntil} from "rxjs/operators";
import {UnitService} from "../../../service/unit";
import {get_creature_entry, get_unit_id, is_player, Unit} from "../../../domain_value/unit";
import {InstanceViewerMeta} from "../../../domain_value/instance_viewer_meta";
import {EventAbility} from "../domain_value/event_ability";
import {SpellService} from "../../../service/spell";
import {DataService} from "../../../../../service/data";
import {CONST_UNKNOWN_LABEL} from "../../../constant/viewer";
import {ViewerMode} from "../../../domain_value/viewer_mode";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {iterable_map, iterable_some} from "../../../../../stdlib/iterable_higher_order";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";
import {IntervalBucket} from "../../../../../stdlib/interval_bucket";

export interface FilterStackItem {
    viewer_mode: ViewerMode;
    segments: Set<number>;
    sources: Set<number>;
    targets: Set<number>;
    abilities: Set<number>;
    boundaries: [number, number];
}

@Injectable({
    providedIn: "root",
})
export class RaidConfigurationService implements OnDestroy {

    private subscription: Subscription = new Subscription();

    private current_meta: InstanceViewerMeta;

    private current_source_intervals: IntervalBucket = new IntervalBucket(0, 1, 1);
    private current_target_intervals: IntervalBucket = new IntervalBucket(0, 1, 1);
    private current_ability_intervals: IntervalBucket = new IntervalBucket(0, 1, 1);

    private current_source_map: Map<number, Unit> = new Map();
    private current_target_map: Map<number, Unit> = new Map();
    private current_ability_map: Map<number, Set<number>> = new Map();

    private current_filtered_intervals: Array<[number, number]> = [];

    private segments$: BehaviorSubject<Array<Segment>> = new BehaviorSubject([]);
    private sources$: BehaviorSubject<Array<EventSource>> = new BehaviorSubject([]);
    private targets$: BehaviorSubject<Array<EventSource>> = new BehaviorSubject([]);
    private abilities$: BehaviorSubject<Array<EventAbility>> = new BehaviorSubject([]);
    private options$: BehaviorSubject<Array<RaidOption>> = new BehaviorSubject([]);

    segment_filter: Set<number> = new Set();
    source_filter: Set<number> = new Set();
    target_filter: Set<number> = new Set();
    ability_filter: Set<number> = new Set();
    time_boundaries: [number, number] = [0, 1];

    private current_mode: ViewerMode = ViewerMode.Base;

    private nextSegments: Subject<void> = new Subject();
    private nextSources: Subject<void> = new Subject();
    private nextTargets: Subject<void> = new Subject();
    private nextAbilities: Subject<void> = new Subject();

    private filter_updated$: Subject<boolean> = new Subject();
    private current_event_types: Set<number> = new Set();

    public selection_overwrite$: Subject<FilterStackItem> = new Subject();
    public boundaries_updated$: Subject<[number, number]> = new Subject();

    private history_state: number = 0;
    private preselected_attempt_id: number = 0;

    constructor(
        private instanceDataService: InstanceDataService,
        private unitService: UnitService,
        private spellService: SpellService,
        private dataService: DataService,
        private activated_route_service: ActivatedRoute,
        private router_service: Router
    ) {
        this.subscription.add(this.instanceDataService.meta.subscribe(meta => this.current_meta = meta));
        this.subscription.add(this.instanceDataService.attempts.subscribe(attempts => this.update_segments(attempts)));
        this.subscription.add(this.instanceDataService.knecht_updates.subscribe(([knecht_updates, evt_types]) => {
            if (knecht_updates.some(elem => [KnechtUpdates.NewData, KnechtUpdates.Initialized, KnechtUpdates.PresetSet].includes(elem))) {
                this.update_subjects();
            }
            if (knecht_updates.includes(KnechtUpdates.WorkerInitialized)) {
                this.instanceDataService.set_segment_intervals(this.current_filtered_intervals);
                this.instanceDataService.set_source_filter([...this.source_filter.values()]);
                this.instanceDataService.set_target_filter([...this.target_filter.values()]);
                this.instanceDataService.set_ability_filter([...this.ability_filter.values()]);
                this.instanceDataService.set_time_boundaries(this.time_boundaries);
            }
            if (knecht_updates.includes(KnechtUpdates.FilterInitialized)) {
                const state = {
                    viewer_mode: this.current_mode,
                    segments: new Set([...this.segment_filter.values()]),
                    sources: new Set(this.source_filter),
                    targets: new Set(this.target_filter),
                    abilities: new Set(this.ability_filter),
                    boundaries: [this.time_boundaries[0], this.time_boundaries[1]]
                };
                this.router_service.navigate([this.router_service.url.split('?')[0]], {
                    state: state,
                    queryParams: {history_state: this.history_state++}
                } as NavigationExtras).then(() => {
                    if (this.preselected_attempt_id > 0) {
                        this.segments$.next(this.segments$.getValue().filter(segment => segment.id === this.preselected_attempt_id));
                    }
                });
            }
        }));

        this.subscription.add(this.activated_route_service.paramMap.subscribe(params => {
            this.current_mode = params.get("mode") as ViewerMode;
        }));
        this.subscription.add(this.activated_route_service.queryParamMap.subscribe(params => {
            const attempt_id = Number(params.get("preselected_attempt_id"));
            if (attempt_id > 0)
                this.preselected_attempt_id = attempt_id;
        }));

        this.subscription.add(this.filter_updated$.pipe(debounceTime(100)).subscribe((push_history) => {
            if (push_history) {
                const state = {
                    viewer_mode: this.current_mode,
                    segments: new Set([...this.segment_filter.values()]),
                    sources: new Set(this.source_filter),
                    targets: new Set(this.target_filter),
                    abilities: new Set(this.ability_filter),
                    boundaries: [this.time_boundaries[0], this.time_boundaries[1]]
                };
                this.router_service.navigate([this.router_service.url.split('?')[0]], {
                    state: state,
                    queryParams: {history_state: this.history_state++}
                } as NavigationExtras);
            }
        }));

        window.onpopstate = (evt) => {
            const last_stack_entry = evt.state;
            if (!!last_stack_entry && !!last_stack_entry.segments) {
                this.update_segment_filter([...last_stack_entry.segments.values()]);
                this.update_source_filter([...last_stack_entry.sources.values()]);
                this.update_target_filter([...last_stack_entry.targets.values()]);
                this.update_ability_filter([...last_stack_entry.abilities.values()]);
                this.update_time_boundaries([last_stack_entry.boundaries[0], last_stack_entry.boundaries[1]]);
                this.selection_overwrite$.next(last_stack_entry);
                this.boundaries_updated$.next(last_stack_entry.boundaries);
            }
        };
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.nextSegments.next();
        this.nextSources.next();
        this.nextTargets.next();
        this.nextAbilities.next();
        this.nextSegments.complete();
        this.nextSources.complete();
        this.nextTargets.complete();
        this.nextAbilities.complete();
    }

    get segments(): Observable<Array<Segment>> {
        return this.segments$.asObservable();
    }

    get sources(): Observable<Array<EventSource>> {
        return this.sources$.asObservable();
    }

    get targets(): Observable<Array<EventSource>> {
        return this.targets$.asObservable();
    }

    get abilities(): Observable<Array<EventAbility>> {
        return this.abilities$.asObservable();
    }

    get options(): Observable<Array<RaidOption>> {
        return this.options$.asObservable();
    }

    update_segment_filter(selected_segments: Array<number>, update_stack: boolean = false, push_history: boolean = true): void {
        if (this.segment_filter.size === selected_segments.length && selected_segments.every(elem => this.segment_filter.has(elem)))
            return;
        this.segment_filter = new Set(selected_segments);
        this.current_filtered_intervals = this.segments$.getValue()
            .filter(segment => this.segment_filter.has(segment.id))
            .map(segment => [segment.start_ts, segment.start_ts + segment.duration]);
        this.instanceDataService.set_segment_intervals(this.current_filtered_intervals);
        this.update_filter();
        if (update_stack) this.filter_updated$.next(push_history);
    }

    update_source_filter(selected_sources: Array<number>, update_stack: boolean = false, push_history: boolean = true): void {
        if (this.source_filter.size === selected_sources.length && selected_sources.every(elem => this.source_filter.has(elem)))
            return;
        this.source_filter = new Set(selected_sources);
        this.instanceDataService.set_source_filter(selected_sources);
        if (update_stack) this.filter_updated$.next(push_history);
    }

    update_target_filter(selected_targets: Array<number>, update_stack: boolean = false, push_history: boolean = true): void {
        if (this.target_filter.size === selected_targets.length && selected_targets.every(elem => this.target_filter.has(elem)))
            return;
        this.target_filter = new Set(selected_targets);
        this.instanceDataService.set_target_filter(selected_targets);
        if (update_stack) this.filter_updated$.next(push_history);
    }

    update_ability_filter(selected_abilities: Array<number>, update_stack: boolean = false, push_history: boolean = true): void {
        if (this.ability_filter.size === selected_abilities.length && selected_abilities.every(elem => this.ability_filter.has(elem)))
            return;
        this.ability_filter = new Set(selected_abilities);
        this.instanceDataService.set_ability_filter(selected_abilities);
        if (update_stack) this.filter_updated$.next(push_history);
    }

    update_time_boundaries(boundaries: [number, number], update_stack: boolean = false, push_history: boolean = true): void {
        if (this.time_boundaries[0] === boundaries[0] && this.time_boundaries[1] === boundaries[1])
            return;
        this.time_boundaries = boundaries;
        this.instanceDataService.set_time_boundaries(boundaries);
        if (update_stack) this.filter_updated$.next(push_history);
    }

    private update_segments(attempts: Array<InstanceViewerAttempt>): void {
        this.nextSegments.next();
        const segments: Array<Segment> = [];
        for (const attempt of attempts)
            segments.push({
                duration: (attempt.end_ts - attempt.start_ts),
                id: attempt.id,
                encounter_id: attempt.encounter_id,
                is_kill: attempt.is_kill,
                label: undefined,
                start_ts: attempt.start_ts
            });
        for (const [index, start, end] of this.calculate_non_boss_attempts(attempts).map(([i_start, i_end], i_index) => [i_index, i_start, i_end]))
            segments.push({
                duration: (end - start),
                id: -index,
                encounter_id: 0,
                is_kill: false,
                label: "Non-Boss Segment " + (index + 1).toString(),
                start_ts: start
            });
        zip(...[...segments.values()].map(segment => this.dataService.get_encounter(segment.encounter_id)
            .pipe(map(encounter => {
                if (!segment.label || segment.label === CONST_UNKNOWN_LABEL)
                    segment.label = !encounter ? CONST_UNKNOWN_LABEL : encounter.localization;
                return segment;
            })))).pipe(takeUntil(this.nextSegments.asObservable())).subscribe(update => this.segments$.next(update));
    }

    private update_sources(sources: Array<Unit>): void {
        if (sources.length === 0) {
            this.sources$.next([]);
            return;
        }
        this.nextSources.next();
        const result: Array<Observable<EventSource>> = [];
        // TODO: Optimize!
        for (const source of sources)
            result.push(combineLatest([this.unitService.get_unit_name(source, this.current_meta.end_ts ?? this.current_meta.start_ts),
                this.unitService.is_unit_boss(source), this.unitService.get_unit_hero_class_id(source, this.current_meta.end_ts ?? this.current_meta.start_ts)])
                .pipe(map(([label, is_boss, hero_class_id]) => {
                    const isPlayer = is_player(source, false);
                    return {
                        id: get_unit_id(source, false),
                        label,
                        is_player: isPlayer,
                        is_boss,
                        hero_class_id,
                        npc_id: isPlayer ? 0 : get_creature_entry(source, false)
                    };
                })));
        zip(...result).pipe(takeUntil(this.nextSources.asObservable())).subscribe(update => this.sources$.next(update));
    }

    private update_targets(targets: Array<Unit>): void {
        if (targets.length === 0) {
            this.targets$.next([]);
            return;
        }
        this.nextTargets.next();
        const result: Array<Observable<EventSource>> = [];

        // TODO: Optimize!
        for (const target of targets)
            result.push(combineLatest([this.unitService.get_unit_name(target, this.current_meta.end_ts ?? this.current_meta.start_ts),
                this.unitService.is_unit_boss(target), this.unitService.get_unit_hero_class_id(target, this.current_meta.end_ts ?? this.current_meta.start_ts)])
                .pipe(map(([label, is_boss, hero_class_id]) => {
                    const isPlayer = is_player(target, false);
                    return {
                        id: get_unit_id(target, false),
                        label,
                        is_player: isPlayer,
                        is_boss,
                        hero_class_id,
                        npc_id: isPlayer ? 0 : get_creature_entry(target, false)
                    };
                })));
        zip(...result).pipe(takeUntil(this.nextTargets.asObservable())).subscribe(update => this.targets$.next(update));
    }

    private update_abilities(abilities: Array<number>): void {
        if (abilities.length === 0) {
            this.abilities$.next([]);
            return;
        }
        this.nextAbilities.next();
        const result: Array<Observable<EventAbility>> = [];

        // TODO: Optimize!
        for (const spell_id of abilities)
            result.push(this.spellService.get_localized_basic_spell(spell_id)
                .pipe(map(spell => {
                    return {
                        id: spell_id,
                        label: spell?.localization
                    };
                })));
        zip(...result).pipe(takeUntil(this.nextAbilities.asObservable())).subscribe(update => this.abilities$.next(update));
    }

    private calculate_non_boss_attempts(attempts: Array<InstanceViewerAttempt>): Array<[number, number]> {
        if (!this.current_meta)
            return [];

        let current_start_ts = this.current_meta.start_ts;
        const intervals = [];
        for (const attempt of attempts.sort((left, right) => left.start_ts - right.start_ts)) {
            if (attempt.start_ts > current_start_ts) {
                intervals.push([current_start_ts, attempt.start_ts]);
                current_start_ts = attempt.end_ts;
            } else if (attempt.end_ts > current_start_ts) {
                current_start_ts = attempt.end_ts;
            }
        }
        if (current_start_ts < this.current_meta.end_ts)
            intervals.push([current_start_ts, this.current_meta.end_ts]);
        return intervals;
    }

    private update_filter(): void {
        const sources = new Set();
        for (const [start, end] of this.current_filtered_intervals) {
            for (const [source_id] of this.current_source_intervals.find_within_range(start, end))
                sources.add(source_id);
        }

        const targets = new Set();
        for (const [start, end] of this.current_filtered_intervals) {
            for (const [target_id] of this.current_target_intervals.find_within_range(start, end))
                targets.add(target_id);
        }

        const abilities: Set<number> = new Set();
        for (const [start, end] of this.current_filtered_intervals) {
            for (const [ability_id] of this.current_ability_intervals.find_within_range(start, end))
                //if (iterable_some(this.current_ability_map.get(ability_id).values(), (evt_type) => this.current_event_types.has(evt_type)))
                abilities.add(ability_id);
        }

        this.update_sources(iterable_map(sources.values(), (id) => this.current_source_map.get(id)));
        this.update_targets(iterable_map(targets.values(), (id) => this.current_target_map.get(id)));
        this.update_abilities([...abilities.values()]);
    }

    private async update_subjects(): Promise<void> {
        const source_prom = [];
        source_prom.push([this.instanceDataService.knecht_melee.get_sources(), [12, 1]]);
        source_prom.push([this.instanceDataService.knecht_misc.get_sources(), [3, 10]]);
        source_prom.push([this.instanceDataService.knecht_spell_damage.get_sources(), [13, 1]]);
        source_prom.push([this.instanceDataService.knecht_heal.get_sources(), [14, 1]]);
        source_prom.push([this.instanceDataService.knecht_un_aura.get_sources(), [7, 8, 9]]);
        source_prom.push([this.instanceDataService.knecht_threat.get_sources(), [15]]);
        source_prom.push([this.instanceDataService.knecht_aura.get_sources(), [6]]);
        source_prom.push([this.instanceDataService.knecht_spell_cast.get_sources(), [0]]);

        const target_prom = [];
        target_prom.push([this.instanceDataService.knecht_melee.get_targets(), [12, 1]]);
        target_prom.push([this.instanceDataService.knecht_misc.get_targets(), [3, 10]]);
        target_prom.push([this.instanceDataService.knecht_spell_damage.get_targets(), [13, 1]]);
        target_prom.push([this.instanceDataService.knecht_heal.get_targets(), [14, 1]]);
        target_prom.push([this.instanceDataService.knecht_un_aura.get_targets(), [7, 8, 9]]);
        target_prom.push([this.instanceDataService.knecht_threat.get_targets(), [15]]);
        target_prom.push([this.instanceDataService.knecht_aura.get_targets(), [6]]);
        target_prom.push([this.instanceDataService.knecht_spell_cast.get_targets(), [0]]);

        const ability_prom = [];
        ability_prom.push([this.instanceDataService.knecht_melee.get_abilities(), [12, 1]]);
        ability_prom.push([this.instanceDataService.knecht_misc.get_abilities(), [3, 10]]);
        ability_prom.push([this.instanceDataService.knecht_spell_damage.get_abilities(), [13, 1]]);
        ability_prom.push([this.instanceDataService.knecht_heal.get_abilities(), [14, 1]]);
        ability_prom.push([this.instanceDataService.knecht_un_aura.get_abilities(), [7, 8, 9]]);
        ability_prom.push([this.instanceDataService.knecht_threat.get_abilities(), [15]]);
        ability_prom.push([this.instanceDataService.knecht_aura.get_abilities(), [6]]);
        ability_prom.push([this.instanceDataService.knecht_spell_cast.get_abilities(), [0]]);

        const source_intervals = new IntervalBucket(this.current_meta.start_ts, this.current_meta.end_ts, 180000);
        for (const [prom] of source_prom) {
            const subjects = await prom;
            for (const [subject_id, [subject, intervals]] of subjects) {
                if (!this.current_source_map.has(subject_id))
                    this.current_source_map.set(subject_id, subject);
                for (const [start, end] of intervals)
                    source_intervals.insert(start, end, subject_id);
            }
        }
        this.current_source_intervals = source_intervals;

        const target_intervals = new IntervalBucket(this.current_meta.start_ts, this.current_meta.end_ts, 180000);
        for (const [prom] of target_prom) {
            const subjects = await prom;
            for (const [subject_id, [subject, intervals]] of subjects) {
                if (!this.current_target_map.has(subject_id))
                    this.current_target_map.set(subject_id, subject);
                for (const [start, end] of intervals)
                    target_intervals.insert(start, end, subject_id);
            }
        }
        this.current_target_intervals = target_intervals;

        const ability_intervals = new IntervalBucket(this.current_meta.start_ts, this.current_meta.end_ts, 180000);
        for (const [prom, evt_types] of ability_prom) {
            const subjects = await prom;
            for (const [subject_id, [_, intervals]] of subjects) {
                if (this.current_ability_map.has(subject_id)) {
                    const current_evt_types = this.current_ability_map.get(subject_id);
                    for (const evt_type of evt_types) current_evt_types.add(evt_type);
                } else {
                    this.current_ability_map.set(subject_id, new Set(evt_types));
                }
                for (const [start, end] of intervals)
                    ability_intervals.insert(start, end, subject_id);
            }
        }
        this.current_ability_intervals = ability_intervals;
        this.update_filter();
    }

    public select_event_types(evt_types: Array<number>): void {
        if (evt_types.length !== this.current_event_types.size || evt_types.some(evt_type => !this.current_event_types.has(evt_type))) {
            this.current_event_types = new Set(evt_types);
            this.update_filter();
        }
    }

    public update_stack(): void {
        this.filter_updated$.next(true);
    }

}

