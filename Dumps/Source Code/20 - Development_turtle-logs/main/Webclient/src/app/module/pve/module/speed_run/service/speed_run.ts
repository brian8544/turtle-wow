import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {SpeedRun} from "../domain_value/speed_run";
import {DataService} from "../../../../../service/data";

@Injectable({
    providedIn: "root",
})
export class SpeedRunService {
    private static readonly URL_INSTANCE_SPEED_RUN: string = "/instance/speed_run/by_season/:season";

    private speed_runs$: Subject<Array<SpeedRun>> = new Subject();
    private all_speed_runs$: BehaviorSubject<Array<SpeedRun>> = new BehaviorSubject([]);
    private current_mode$: number = 1;
    private current_map_id$: number = 1;
    private current_server_ids$: Array<number> = [];
    private current_difficulty_ids$: Array<number> = [];
    private current_season_ids$: Array<number> = [];

    private seasons_loaded: Array<number> = [];

    private speed_runs_internal: Array<SpeedRun> = [];

    constructor(
        private apiService: APIService,
        private dataService: DataService
    ) {}

    get speed_runs(): Observable<Array<SpeedRun>> {
        return this.speed_runs$.asObservable();
    }

    get all_speed_runs(): Observable<Array<SpeedRun>> {
        this.current_season_ids$ = this.dataService.ranking_seasons.map(item => item.value as number);
        this.load_data();
        return this.all_speed_runs$.asObservable();
    }

    select(mode: number, map_id: number, server_ids: Array<number>, difficulty_ids: Array<number>, season_ids: Array<number>): void {
        this.current_mode$ = mode;
        this.current_map_id$ = map_id;
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
            this.apiService.get(SpeedRunService.URL_INSTANCE_SPEED_RUN.replace(":season", selected_season.toString()), result => {
                this.speed_runs_internal.push(...result);
                this.all_speed_runs$.next(this.speed_runs_internal);
                this.commit();
            });
        }
    }

    commit(): void {
        const result = this.speed_runs_internal.filter(speed_run => speed_run.map_id === this.current_map_id$
            && this.current_server_ids$.includes(speed_run.server_id) && this.current_difficulty_ids$.includes(speed_run.difficulty_id)
            && this.current_season_ids$.includes(speed_run.season_index))
            .sort((left, right) => left.duration - right.duration);
        this.speed_runs$.next(result);
    }

}
