import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {APIService} from "../../../../../service/api";
import {SpeedKill} from "../domain_value/speed_kill";
import {DataService} from "../../../../../service/data";

@Injectable({
    providedIn: "root",
})
export class SpeedKillService {
    private static readonly URL_INSTANCE_SPEED_KILL: string = "/instance/speed_kill/by_season/:season";
    private static readonly URL_INSTANCE_ATTEMPT_DELETE: string = "/instance/ranking/unrank";

    private speed_kills$: Subject<Array<SpeedKill>> = new Subject();
    private all_speed_kills$: BehaviorSubject<Array<SpeedKill>> = new BehaviorSubject([]);

    private current_mode$: number = 1;
    private current_encounter_id$: number = 1;
    private current_server_ids$: Array<number> = [];
    private current_difficulty_ids$: Array<number> = [];
    private current_season_ids$: Array<number> = [];

    private seasons_loaded: Array<number> = [];

    private speed_kills_internal: Array<SpeedKill> = [];

    constructor(
        private apiService: APIService,
        private dataService: DataService
    ) {}

    get speed_kills(): Observable<Array<SpeedKill>> {
        return this.speed_kills$.asObservable();
    }

    get all_speed_kills(): Observable<Array<SpeedKill>> {
        this.current_season_ids$ = this.dataService.ranking_seasons.map(item => item.value as number);
        this.load_data();
        return this.all_speed_kills$.asObservable();
    }

    select(mode: number, encounter_id: number, server_ids: Array<number>, difficulty_ids: Array<number>, season_ids: Array<number>): void {
        this.current_mode$ = mode;
        this.current_encounter_id$ = encounter_id;
        this.current_server_ids$ = server_ids;
        this.current_difficulty_ids$ = difficulty_ids;
        this.current_season_ids$ = season_ids;
        this.load_data();
        this.commit();
    }

    load_data(): void {
        for (const selected_season of this.current_season_ids$) {
            if (this.seasons_loaded.includes(selected_season))
                continue;
            this.seasons_loaded.push(selected_season);
            this.apiService.get(SpeedKillService.URL_INSTANCE_SPEED_KILL.replace(":season", selected_season.toString()), result => {
                this.speed_kills_internal.push(...result);
                this.all_speed_kills$.next(this.speed_kills_internal);
                this.commit();
            });
        }
    }

    commit(): void {
        const result = this.speed_kills_internal.filter(speed_kill => speed_kill.encounter_id === this.current_encounter_id$
            && this.current_server_ids$.includes(speed_kill.server_id) && this.current_difficulty_ids$.includes(speed_kill.difficulty_id)
            && this.current_season_ids$.includes(speed_kill.season_index))
            .sort((left, right) => left.duration - right.duration);
        this.speed_kills$.next(result);
    }

    delete(attempt_id: number): void {
        this.apiService.delete(SpeedKillService.URL_INSTANCE_ATTEMPT_DELETE, attempt_id, () => {
            this.apiService.get(SpeedKillService.URL_INSTANCE_SPEED_KILL, result => {
                this.speed_kills_internal = result;
                this.all_speed_kills$.next(result);
                this.commit();
            });
        });
    }
}
