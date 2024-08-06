import {Injectable, OnDestroy} from "@angular/core";
import {APIService} from "src/app/service/api";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {InstanceViewerMeta} from "../domain_value/instance_viewer_meta";
import {InstanceViewerParticipants} from "../domain_value/instance_viewer_participants";
import {InstanceViewerAttempt} from "../domain_value/instance_viewer_attempt";
import * as Comlink from "comlink";
import {Remote} from "comlink";
import {Rechenknecht} from "../tool/rechenknecht";
import {KnechtUpdates} from "../domain_value/knecht_updates";
import {LoadingBarService} from "../../../service/loading_bar";
import {debounceTime} from "rxjs/operators";
import {CommunicationEvent} from "../domain_value/communication_event";
import {Preset} from "../module/raid_configuration_menu/module/raid_browser/domain_value/preset";

@Injectable({
    providedIn: "root",
})
export class InstanceDataService implements OnDestroy {

    private static readonly NUMBER_OF_WORKER: number = 8;

    private static INSTANCE_EXPORT_META_URL: string = "/instance/export/:instance_meta_id";
    private static INSTANCE_EXPORT_PARTICIPANTS_URL: string = "/instance/export/participants/:instance_meta_id";
    private static INSTANCE_EXPORT_ATTEMPTS_URL: string = "/instance/export/attempts/:instance_meta_id";

    private subscription: Subscription = new Subscription();

    private instance_meta_id$: number;

    private instance_meta$: BehaviorSubject<InstanceViewerMeta>;
    private participants$: BehaviorSubject<Array<InstanceViewerParticipants>>;
    private attempts$: BehaviorSubject<Array<InstanceViewerAttempt>>;

    private attempt_total_duration$: BehaviorSubject<number> = new BehaviorSubject(1);

    private readonly updater: any;

    private worker: Array<Worker> = [];
    knecht_melee: Remote<Rechenknecht>;
    knecht_misc: Remote<Rechenknecht>;
    // knecht_replay: Remote<Rechenknecht>;
    knecht_spell_damage: Remote<Rechenknecht>;
    knecht_heal: Remote<Rechenknecht>;
    knecht_un_aura: Remote<Rechenknecht>;
    knecht_threat: Remote<Rechenknecht>;
    knecht_spell_cast: Remote<Rechenknecht>;
    knecht_aura: Remote<Rechenknecht>;

    private public_knecht_updates$: Subject<[Array<KnechtUpdates>, Array<number>]> = new Subject();
    private knecht_updates$: Subject<[KnechtUpdates, Array<number>]> = new Subject();
    private recent_knecht_updates$: [Set<KnechtUpdates>, Set<number>] = [new Set(), new Set()];
    private worker_initialized: number = 0;
    private filter_initialized: Array<boolean> = [false, false, false, false];
    private init_worker_done: boolean = false;
    private filter_update_in_progress: number = 0;
    private filter_initialized_fired: boolean = false;

    private current_intervals: Array<[number, number]> = [];
    private boundaries: [number, number] = [0, 1];

    communicator: Subject<[CommunicationEvent, any]> = new Subject();

    constructor(
        private apiService: APIService,
        private loading_bar_service: LoadingBarService
    ) {
        this.updater = setInterval(() => {
            this.load_instance_meta(meta => {
                const current_meta = this.instance_meta$.getValue();
                if (current_meta.end_ts !== meta.end_ts) {
                    this.instance_meta$.next(meta);
                }
            });
            this.load_attempts(attempts => {
                if (attempts.length > this.attempts$.getValue().length) {
                    this.attempts$.next(attempts);
                }
            });
        }, 60000);

        this.subscription.add(this.knecht_updates$
            .subscribe(([knecht_update, event_types]) => {
                if (knecht_update === KnechtUpdates.Initialized) {
                    ++this.worker_initialized;
                }

                this.recent_knecht_updates$[0].add(knecht_update);
                if (!!event_types) {
                    for (const evt_type of event_types)
                        this.recent_knecht_updates$[1].add(evt_type);
                }
            }));
        this.subscription.add(this.knecht_updates$.pipe(debounceTime(50)).subscribe(() => {
            if (this.worker_initialized < InstanceDataService.NUMBER_OF_WORKER)
                return;

            this.public_knecht_updates$.next([[...this.recent_knecht_updates$[0].values()], [...this.recent_knecht_updates$[1].values()]]);
            this.recent_knecht_updates$[0].clear();
            this.recent_knecht_updates$[1].clear();
        }));
    }

    public isInitialized(): boolean {
        return this.worker_initialized >= InstanceDataService.NUMBER_OF_WORKER && this.filter_initialized.every(init => init);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        clearInterval(this.updater);
        this.worker.forEach(worker => worker.terminate());
    }

    private load_instance_meta(on_success: any): void {
        if (!this.instance_meta_id$)
            return;
        return this.apiService.get(
            InstanceDataService.INSTANCE_EXPORT_META_URL
                .replace(":instance_meta_id", this.instance_meta_id$.toString()),
            (result) => {
                this.init_worker(this.instance_meta_id$, !!result.expired);
                on_success.call(on_success, result);
            }, () => {
            }
        );
    }

    private load_participants(on_success: any): void {
        if (!this.instance_meta_id$)
            return;

        return this.apiService.get(
            InstanceDataService.INSTANCE_EXPORT_PARTICIPANTS_URL
                .replace(":instance_meta_id", this.instance_meta_id$.toString()),
            on_success, () => {
            }
        );
    }

    private load_attempts(on_success: any): void {
        if (!this.instance_meta_id$)
            return;

        return this.apiService.get(
            InstanceDataService.INSTANCE_EXPORT_ATTEMPTS_URL
                .replace(":instance_meta_id", this.instance_meta_id$.toString()),
            on_success, () => {
            }
        );
    }

    public async set_segment_intervals(intervals: Array<[number, number]>) {
        if (this.worker_initialized < InstanceDataService.NUMBER_OF_WORKER) return;
        this.knecht_updates$.next([KnechtUpdates.FilterChanging, []]);
        ++this.filter_update_in_progress;
        this.current_intervals = intervals;
        this.update_total_duration();

        const promises = [];
        promises.push(this.knecht_melee.set_segment_intervals(intervals));
        promises.push(this.knecht_misc.set_segment_intervals(intervals));
        // promises.push(this.knecht_replay.set_segment_intervals(intervals));
        promises.push(this.knecht_spell_damage.set_segment_intervals(intervals));
        promises.push(this.knecht_heal.set_segment_intervals(intervals));
        promises.push(this.knecht_un_aura.set_segment_intervals(intervals));
        promises.push(this.knecht_threat.set_segment_intervals(intervals));
        promises.push(this.knecht_spell_cast.set_segment_intervals(intervals));
        promises.push(this.knecht_aura.set_segment_intervals(intervals));

        for (const prom of promises)
            await prom;

        --this.filter_update_in_progress;
        this.filter_initialized[0] = true;
        if (this.filter_update_in_progress === 0)
            this.knecht_updates$.next([KnechtUpdates.FilterChanged, []]);
        if (this.isInitialized() && !this.filter_initialized_fired) {
            this.knecht_updates$.next([KnechtUpdates.FilterInitialized, []]);
            this.filter_initialized_fired = true;
        }
    }

    public async set_source_filter(sources: Array<number>) {
        if (this.worker_initialized < InstanceDataService.NUMBER_OF_WORKER) return;
        this.knecht_updates$.next([KnechtUpdates.FilterChanging, []]);
        ++this.filter_update_in_progress;
        const promises = [];
        promises.push(this.knecht_melee.set_source_filter(sources));
        promises.push(this.knecht_misc.set_source_filter(sources));
        // promises.push(this.knecht_replay.set_source_filter(sources));
        promises.push(this.knecht_spell_damage.set_source_filter(sources));
        promises.push(this.knecht_heal.set_source_filter(sources));
        promises.push(this.knecht_un_aura.set_source_filter(sources));
        promises.push(this.knecht_threat.set_source_filter(sources));
        promises.push(this.knecht_spell_cast.set_source_filter(sources));
        promises.push(this.knecht_aura.set_source_filter(sources));

        for (const prom of promises)
            await prom;

        --this.filter_update_in_progress;
        this.filter_initialized[1] = true;
        if (this.filter_update_in_progress === 0)
            this.knecht_updates$.next([KnechtUpdates.FilterChanged, []]);
        if (this.isInitialized() && !this.filter_initialized_fired) {
            this.knecht_updates$.next([KnechtUpdates.FilterInitialized, []]);
            this.filter_initialized_fired = true;
        }
    }

    public async set_target_filter(targets: Array<number>) {
        if (this.worker_initialized < InstanceDataService.NUMBER_OF_WORKER) return;
        this.knecht_updates$.next([KnechtUpdates.FilterChanging, []]);
        ++this.filter_update_in_progress;
        const promises = [];
        promises.push(this.knecht_melee.set_target_filter(targets));
        promises.push(this.knecht_misc.set_target_filter(targets));
        // promises.push(this.knecht_replay.set_target_filter(targets));
        promises.push(this.knecht_spell_damage.set_target_filter(targets));
        promises.push(this.knecht_heal.set_target_filter(targets));
        promises.push(this.knecht_un_aura.set_target_filter(targets));
        promises.push(this.knecht_threat.set_target_filter(targets));
        promises.push(this.knecht_spell_cast.set_target_filter(targets));
        promises.push(this.knecht_aura.set_target_filter(targets));

        for (const prom of promises)
            await prom;

        --this.filter_update_in_progress;
        this.filter_initialized[2] = true;
        if (this.filter_update_in_progress === 0)
            this.knecht_updates$.next([KnechtUpdates.FilterChanged, []]);
        if (this.isInitialized() && !this.filter_initialized_fired) {
            this.knecht_updates$.next([KnechtUpdates.FilterInitialized, []]);
            this.filter_initialized_fired = true;
        }
    }

    public async set_ability_filter(abilities: Array<number>) {
        if (this.worker_initialized < InstanceDataService.NUMBER_OF_WORKER) return;
        this.knecht_updates$.next([KnechtUpdates.FilterChanging, []]);
        ++this.filter_update_in_progress;
        const promises = [];
        promises.push(this.knecht_melee.set_ability_filter(abilities));
        promises.push(this.knecht_misc.set_ability_filter(abilities));
        // promises.push(this.knecht_replay.set_ability_filter(abilities));
        promises.push(this.knecht_spell_damage.set_ability_filter(abilities));
        promises.push(this.knecht_heal.set_ability_filter(abilities));
        promises.push(this.knecht_un_aura.set_ability_filter(abilities));
        promises.push(this.knecht_threat.set_ability_filter(abilities));
        promises.push(this.knecht_spell_cast.set_ability_filter(abilities));
        promises.push(this.knecht_aura.set_ability_filter(abilities));

        for (const prom of promises)
            await prom;

        --this.filter_update_in_progress;
        this.filter_initialized[3] = true;
        if (this.filter_update_in_progress === 0)
            this.knecht_updates$.next([KnechtUpdates.FilterChanged, []]);
        if (this.isInitialized() && !this.filter_initialized_fired) {
            this.knecht_updates$.next([KnechtUpdates.FilterInitialized, []]);
            this.filter_initialized_fired = true;
        }
    }

    public async set_time_boundaries(boundaries: [number, number]) {
        if (this.worker_initialized < InstanceDataService.NUMBER_OF_WORKER) return;
        this.knecht_updates$.next([KnechtUpdates.FilterChanging, []]);
        ++this.filter_update_in_progress;
        this.boundaries = boundaries;
        this.update_total_duration();

        const promises = [];
        promises.push(this.knecht_melee.set_time_boundaries(boundaries));
        promises.push(this.knecht_misc.set_time_boundaries(boundaries));
        // promises.push(this.knecht_replay.set_time_boundaries(boundaries));
        promises.push(this.knecht_spell_damage.set_time_boundaries(boundaries));
        promises.push(this.knecht_heal.set_time_boundaries(boundaries));
        promises.push(this.knecht_un_aura.set_time_boundaries(boundaries));
        promises.push(this.knecht_threat.set_time_boundaries(boundaries));
        promises.push(this.knecht_spell_cast.set_time_boundaries(boundaries));
        promises.push(this.knecht_aura.set_time_boundaries(boundaries));

        for (const prom of promises)
            await prom;

        --this.filter_update_in_progress;
        this.filter_initialized[3] = true;
        if (this.filter_update_in_progress === 0)
            this.knecht_updates$.next([KnechtUpdates.FilterChanged, []]);
        if (this.isInitialized() && !this.filter_initialized_fired) {
            this.knecht_updates$.next([KnechtUpdates.FilterInitialized, []]);
            this.filter_initialized_fired = true;
        }
    }

    public set instance_meta_id(instance_meta_id: number) {
        if (!!this.instance_meta_id$)
            return;

        this.instance_meta_id$ = instance_meta_id;
    }

    private init_worker(instance_meta_id: number, is_expired: boolean): void {
        if (this.init_worker_done) return;
        this.init_worker_done = true;

        // Cant be put into a function because Angular won't recognize paths otherwise
        const knecht_condition = data => !!data && !!data[0] && data[0] === "KNECHT_UPDATES";
        const handle_loading_bar = data => {
            if (data[1] === KnechtUpdates.WorkStart)
                this.loading_bar_service.incrementCounter();
            else if ([KnechtUpdates.WorkEnd, KnechtUpdates.Initialized].includes(data[1]))
                this.loading_bar_service.decrementCounter();
        };

        for (let i = 0; i < InstanceDataService.NUMBER_OF_WORKER; ++i)
            this.loading_bar_service.incrementCounter();

        let worker = new Worker(new URL('./../worker/melee.worker', import.meta.url), {type: 'module'});
        worker.postMessage(["INIT", instance_meta_id, is_expired]);
        worker.onmessage = ({data}) => {
            if (knecht_condition(data)) {
                handle_loading_bar(data);
                this.knecht_updates$.next([data[1], data[2]]);
            }
        };
        this.worker.push(worker);
        this.knecht_melee = Comlink.wrap<Rechenknecht>(worker);

        worker = new Worker(new URL('./../worker/spell_damage.worker', import.meta.url), {type: 'module'});
        worker.postMessage(["INIT", instance_meta_id, is_expired]);
        worker.onmessage = ({data}) => {
            if (knecht_condition(data)) {
                handle_loading_bar(data);
                this.knecht_updates$.next([data[1], data[2]]);
            }
        };
        this.worker.push(worker);
        this.knecht_spell_damage = Comlink.wrap<Rechenknecht>(worker);

        worker = new Worker(new URL('./../worker/misc.worker', import.meta.url), {type: 'module'});
        worker.postMessage(["INIT", instance_meta_id, is_expired]);
        worker.onmessage = ({data}) => {
            if (knecht_condition(data)) {
                handle_loading_bar(data);
                this.knecht_updates$.next([data[1], data[2]]);
            }
        };
        this.worker.push(worker);
        this.knecht_misc = Comlink.wrap<Rechenknecht>(worker);

        /*
        worker = new Worker('./../worker/replay.worker', {type: 'module'});
        worker.postMessage(["INIT", instance_meta_id, is_expired]);
        worker.onmessage = ({data}) => {
            if (knecht_condition(data)) {
                handle_loading_bar(data);
                this.knecht_updates$.next([data[1], data[2]]);
            }
        };
        this.worker.push(worker);
        this.knecht_replay = Comlink.wrap<Rechenknecht>(worker);
         */

        worker = new Worker(new URL('./../worker/un_aura.worker', import.meta.url), {type: 'module'});
        worker.postMessage(["INIT", instance_meta_id, is_expired]);
        worker.onmessage = ({data}) => {
            if (knecht_condition(data)) {
                handle_loading_bar(data);
                this.knecht_updates$.next([data[1], data[2]]);
            }
        };
        this.worker.push(worker);
        this.knecht_un_aura = Comlink.wrap<Rechenknecht>(worker);

        worker = new Worker(new URL('./../worker/heal.worker', import.meta.url), {type: 'module'});
        worker.postMessage(["INIT", instance_meta_id, is_expired]);
        worker.onmessage = ({data}) => {
            if (knecht_condition(data)) {
                handle_loading_bar(data);
                this.knecht_updates$.next([data[1], data[2]]);
            }
        };
        this.worker.push(worker);
        this.knecht_heal = Comlink.wrap<Rechenknecht>(worker);

        worker = new Worker(new URL('./../worker/spell_cast.worker', import.meta.url), {type: 'module'});
        worker.postMessage(["INIT", instance_meta_id, is_expired]);
        worker.onmessage = ({data}) => {
            if (knecht_condition(data)) {
                handle_loading_bar(data);
                this.knecht_updates$.next([data[1], data[2]]);
            }
        };
        this.worker.push(worker);
        this.knecht_spell_cast = Comlink.wrap<Rechenknecht>(worker);

        worker = new Worker(new URL('./../worker/threat.worker', import.meta.url), {type: 'module'});
        worker.postMessage(["INIT", instance_meta_id, is_expired]);
        worker.onmessage = ({data}) => {
            if (knecht_condition(data)) {
                handle_loading_bar(data);
                this.knecht_updates$.next([data[1], data[2]]);
            }
        };
        this.worker.push(worker);
        this.knecht_threat = Comlink.wrap<Rechenknecht>(worker);

        worker = new Worker(new URL('./../worker/aura.worker', import.meta.url), {type: 'module'});
        worker.postMessage(["INIT", instance_meta_id, is_expired]);
        worker.onmessage = ({data}) => {
            if (knecht_condition(data)) {
                handle_loading_bar(data);
                this.knecht_updates$.next([data[1], data[2]]);
            }
        };
        this.worker.push(worker);
        this.knecht_aura = Comlink.wrap<Rechenknecht>(worker);
        this.knecht_updates$.next([KnechtUpdates.WorkerInitialized, []]);
    }

    public get meta(): Observable<InstanceViewerMeta> {
        if (!this.instance_meta$) {
            this.instance_meta$ = new BehaviorSubject(undefined);
            this.load_instance_meta(meta => {
                this.instance_meta$.next(meta);
            });
            this.subscription.add(this.instance_meta$.subscribe(meta => {
                if (!!meta && !!meta.expired)
                    clearInterval(this.updater);
            }));
        }
        return this.instance_meta$.asObservable();
    }

    public get participants(): Observable<Array<InstanceViewerParticipants>> {
        if (!this.participants$) {
            this.participants$ = new BehaviorSubject([]);
            this.load_participants(participants => {
                this.participants$.next(participants);
            });
        }
        return this.participants$.asObservable();
    }

    public get attempts(): Observable<Array<InstanceViewerAttempt>> {
        if (!this.attempts$) {
            this.attempts$ = new BehaviorSubject([]);
            this.load_attempts(attempts => {
                this.attempts$.next(attempts);
            });
        }
        return this.attempts$.asObservable();
    }

    public get knecht_updates(): Observable<[Array<KnechtUpdates>, Array<number>]> {
        return this.public_knecht_updates$.asObservable();
    }

    public get attempt_total_duration(): Observable<number> {
        return this.attempt_total_duration$.asObservable();
    }

    private update_total_duration(): void {
        this.attempt_total_duration$.next(Math.min(this.current_intervals.reduce((acc, interval) => acc + interval[1] - interval[0], 0), this.boundaries[1] - this.boundaries[0]));
    }

    public async apply_preset(presets: Array<Preset>) {
        if (this.worker_initialized < InstanceDataService.NUMBER_OF_WORKER) return;
        const promises = [];
        promises.push(this.knecht_melee.set_preset_filter(presets));
        promises.push(this.knecht_misc.set_preset_filter(presets));
        // promises.push(this.knecht_replay.set_preset_filter(presets));
        promises.push(this.knecht_spell_damage.set_preset_filter(presets));
        promises.push(this.knecht_heal.set_preset_filter(presets));
        promises.push(this.knecht_un_aura.set_preset_filter(presets));
        promises.push(this.knecht_threat.set_preset_filter(presets));
        promises.push(this.knecht_spell_cast.set_preset_filter(presets));
        promises.push(this.knecht_aura.set_preset_filter(presets));

        for (const prom of promises)
            await prom;

        this.knecht_updates$.next([KnechtUpdates.PresetSet, []]);
        this.knecht_updates$.next([KnechtUpdates.FilterChanged, []]);
    }

}
