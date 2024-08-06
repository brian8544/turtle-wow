import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {RankingResult} from "../domain_value/ranking_result";
import {RankingCharacterMeta} from "../domain_value/ranking_character_meta";
import {RankingRow} from "../domain_value/ranking_row";
import {DataService} from "../../../../../service/data";

@Injectable({
    providedIn: "root",
})
export class RankingService {
    private static readonly URL_INSTANCE_RANKING_DPS: string = "/instance/ranking/dps/by_season/:season";
    private static readonly URL_INSTANCE_RANKING_HPS: string = "/instance/ranking/hps/by_season/:season";
    private static readonly URL_INSTANCE_RANKING_TPS: string = "/instance/ranking/tps/by_season/:season";
    private static readonly URL_INSTANCE_ATTEMPT_DELETE: string = "/instance/ranking/unrank";

    private rankings$: BehaviorSubject<Array<RankingRow>> = new BehaviorSubject([]);
    private dps_rankings$: Subject<Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]>> = new Subject();
    private hps_rankings$: Subject<Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]>> = new Subject();
    private tps_rankings$: Subject<Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]>> = new Subject();

    private dps_rankings: Map<number, Map<number, [RankingCharacterMeta, Array<RankingResult>]>> = new Map();
    private hps_rankings: Map<number, Map<number, [RankingCharacterMeta, Array<RankingResult>]>> = new Map();
    private tps_rankings: Map<number, Map<number, [RankingCharacterMeta, Array<RankingResult>]>> = new Map();

    private season_loaded_dps: Array<number> = [];
    private season_loaded_hps: Array<number> = [];
    private season_loaded_tps: Array<number> = [];

    private current_mode$: number = 1;
    private current_selection$: number = 1;
    private current_encounter_ids$: Array<number> = [];
    private current_specs$: Array<[number, number]> = [];
    private current_server_ids$: Array<number> = [];
    private current_difficulty_ids$: Array<number> = [];
    private current_season_ids$: Array<number> = [];

    constructor(
        private apiService: APIService,
        private dataService: DataService
    ) {
    }

    get rankings(): Observable<Array<RankingRow>> {
        return this.rankings$.asObservable();
    }

    get all_dps_rankings(): Observable<Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]>> {
        this.current_season_ids$ = this.dataService.ranking_seasons.map(item => item.value as number);
        this.load(RankingService.URL_INSTANCE_RANKING_DPS, this.season_loaded_dps, this.dps_rankings, this.dps_rankings$);
        return this.dps_rankings$.asObservable();
    }

    get all_hps_rankings(): Observable<Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]>> {
        this.current_season_ids$ = this.dataService.ranking_seasons.map(item => item.value as number);
        this.load(RankingService.URL_INSTANCE_RANKING_HPS, this.season_loaded_hps, this.hps_rankings, this.hps_rankings$);
        return this.hps_rankings$.asObservable();
    }

    get all_tps_rankings(): Observable<Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]>> {
        this.current_season_ids$ = this.dataService.ranking_seasons.map(item => item.value as number);
        this.load(RankingService.URL_INSTANCE_RANKING_TPS, this.season_loaded_tps, this.tps_rankings, this.tps_rankings$);
        return this.tps_rankings$.asObservable();
    }

    select(mode: number, selection: number, encounter_ids: Array<number>, spec_ids: Array<number>, server_ids: Array<number>, difficulty_ids: Array<number>, season_ids: Array<number>): void {
        this.current_selection$ = selection;
        this.current_encounter_ids$ = encounter_ids;
        this.current_specs$ = spec_ids.map(spec_id => [this.dataService.spec_mapping.get(spec_id)[0], this.dataService.spec_mapping.get(spec_id)[1]]);
        this.current_server_ids$ = server_ids;
        this.current_difficulty_ids$ = difficulty_ids;
        this.current_season_ids$ = season_ids;
        this.current_mode$ = Number(mode);
        this.load_current_mode();
    }

    private commit() {
        const new_rankings = new Map<number, [RankingCharacterMeta, Array<Array<number>>]>();
        if (this.current_selection$ === 1) {
            this.current_mode_data
                .filter(([npc_id, char_rankings]) => this.current_encounter_ids$.includes(npc_id))
                .forEach(([npc_id, char_rankings]) =>
                    char_rankings
                        .filter(([character_id, meta, rankings]) => this.current_server_ids$.includes(meta.server_id)
                            && !!this.current_specs$.find(spec => spec[0] === meta.hero_class_id))
                        .map(([character_id, meta, rankings]) => {
                            const best_result = rankings
                                .filter(ranking => this.current_difficulty_ids$.includes(ranking.difficulty_id) && this.current_season_ids$.includes(ranking.season_index)
                                    && !!this.current_specs$.find(spec => spec[0] === meta.hero_class_id && spec[1] === ranking.character_spec))
                                .reduce((best, ranking) => {
                                    const ranking_result = (ranking.amount * 1000) / ranking.duration;
                                    return best[0] > ranking_result ? best : [ranking_result, ranking.instance_meta_id, ranking.attempt_id, ranking.character_spec, npc_id, ranking.amount, ranking.duration];
                                }, [0, 0, 0]);
                            if (!new_rankings.has(character_id))
                                new_rankings.set(character_id, [meta, []]);
                            new_rankings.get(character_id)[1].push(best_result);
                        })
                );
        }
        this.rankings$.next([...new_rankings.entries()]
            .filter(([_character_id, [_character_meta, amounts]]) =>
                amounts.filter(am => am[0] > 0).length === this.current_encounter_ids$.length)
            .map(([character_id, [character_meta, ranking_results]]) => {
                const result = ranking_results.reduce(([count, acc], amount) => [++count, acc + amount[0]], [0, 0]);
                return {
                    character_id,
                    character_meta,
                    amount: Number((result[1] / result[0])),
                    instance_meta_ids: ranking_results.map(rr => rr[1]),
                    attempt_ids: ranking_results.map(rr => rr[2]),
                    spec_ids: ranking_results.map(rr => rr[3]),
                    encounter_ids: ranking_results.map(rr => rr[4]),
                    amounts: ranking_results.map(rr => rr[5]),
                    durations: ranking_results.map(rr => rr[6]),
                };
            }).sort((left, right) => right.amount - left.amount));
    }

    delete(attempt_id: number): void {
        this.apiService.delete(RankingService.URL_INSTANCE_ATTEMPT_DELETE, attempt_id, () => {
            this.load_current_mode();
        });
    }

    private flatten_map(input): Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]> {
        return [...input.entries()].map(([id, i_map]) => [id, [...i_map.entries()].map(([a, [b, c]]) => [a, b, c])]);
    }

    private get current_mode_data(): Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]> {
        if (this.current_mode$ === 1)
            return this.flatten_map(this.dps_rankings);
        if (this.current_mode$ === 2)
            return this.flatten_map(this.hps_rankings);
        return this.flatten_map(this.tps_rankings);
    }

    private load_current_mode(): void {
        if (this.current_mode$ === 1)
            this.load(RankingService.URL_INSTANCE_RANKING_DPS, this.season_loaded_dps, this.dps_rankings, this.dps_rankings$);
        else if (this.current_mode$ === 2)
            this.load(RankingService.URL_INSTANCE_RANKING_HPS, this.season_loaded_hps, this.hps_rankings, this.hps_rankings$);
        else this.load(RankingService.URL_INSTANCE_RANKING_TPS, this.season_loaded_tps, this.tps_rankings, this.tps_rankings$);
    }

    private load(url: string, loaded_arr: Array<number>, container: Map<number, Map<number, [RankingCharacterMeta, Array<RankingResult>]>>,
                 observable: Subject<Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]>>): void {
        for (const selected_season of this.current_season_ids$) {
            if (loaded_arr.includes(selected_season))
                continue;
            this.apiService.get(url.replace(":season", selected_season.toString()), result => {
                for (const [encounter_id, char_results] of result) {
                    if (container.has(encounter_id)) {
                        const encounter_map = container.get(encounter_id);
                        for (const [character_id, meta, rr] of char_results) {
                            if (encounter_map.has(character_id)) {
                                const char_map = encounter_map.get(character_id);
                                char_map[1].push(...rr);
                            } else {
                                encounter_map.set(character_id, [meta, rr]);
                            }
                        }
                    } else {
                        container.set(encounter_id, new Map(char_results.map(([id, meta, rr]) => [id, [meta, rr]])));
                    }
                }
                observable.next(this.flatten_map(container));
                this.commit();
            });
            loaded_arr.push(selected_season);
        }
        this.commit();
    }
}
