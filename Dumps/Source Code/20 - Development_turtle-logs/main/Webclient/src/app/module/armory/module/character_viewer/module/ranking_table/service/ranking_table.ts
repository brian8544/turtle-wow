import {Injectable, OnDestroy} from "@angular/core";
import {BodyColumn} from "../../../../../../../template/table/module/table_body/domain_value/body_column";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {RankingService} from "../../../../../../pve/module/ranking/service/ranking";
import {RankingCharacterMeta} from "../../../../../../pve/module/ranking/domain_value/ranking_character_meta";
import {RankingResult} from "../../../../../../pve/module/ranking/domain_value/ranking_result";
import {enumerate} from "../../../../../../../stdlib/enumerate";
import {max_by} from "../../../../../../../stdlib/max_by";

interface CharacterRankingResult {
    rank: number;
    amount: number;
    duration: number;
    instance_meta_id: number;
    attempt_id: number;
}

@Injectable({
    providedIn: "root",
})
export class RankingTableService implements OnDestroy {
    private subscription: Subscription = new Subscription();

    private rows$: BehaviorSubject<Array<Array<BodyColumn>>> = new BehaviorSubject([]);

    private dps_rankings: Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]> = [];
    private hps_rankings: Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]> = [];
    private tps_rankings: Array<[number, Array<[number, RankingCharacterMeta, Array<RankingResult>]>]> = [];

    private current_character_id: number = 0;
    private current_server_id: number = 0;

    constructor(
        private rankingService: RankingService,
    ) {
        this.subscription.add(this.rankingService.all_dps_rankings.subscribe(rankings => {
            this.dps_rankings = rankings;
            this.commit();
        }));
        this.subscription.add(this.rankingService.all_hps_rankings.subscribe(rankings => {
            this.hps_rankings = rankings;
            this.commit();
        }));
        this.subscription.add(this.rankingService.all_tps_rankings.subscribe(rankings => {
            this.tps_rankings = rankings;
            this.commit();
        }));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    set_current_meta(character_id: number, server_id: number): void {
        this.current_character_id = character_id;
        this.current_server_id = server_id;
        this.commit();
    }

    commit(): void {
        const encounter_results: Map<string, [[number, number], [CharacterRankingResult | undefined, CharacterRankingResult | undefined, CharacterRankingResult | undefined]]> = new Map();
        this.dps_rankings.forEach(([encounter_id, char_results]) => {
            for (const difficulty_id of [3, 4, 5, 6, 9, 148]) {
                if (char_results.some(([a, b, rankings]) => rankings.some(ranking => ranking.difficulty_id === difficulty_id))) {
                    const key = encounter_id.toString() + "," + difficulty_id.toString();
                    if (!encounter_results.has(key))
                        encounter_results.set(key, [[encounter_id, difficulty_id], [undefined, undefined, undefined]]);
                    encounter_results.get(key)[1][0] = this.process_char_results(char_results.map(([a, b, rankings]) =>
                        [a, b, rankings.filter(ranking => ranking.difficulty_id === difficulty_id)]));
                }
            }
        });
        this.hps_rankings.forEach(([encounter_id, char_results]) => {
            for (const difficulty_id of [3, 4, 5, 6, 9, 148]) {
                if (char_results.some(([a, b, rankings]) => rankings.some(ranking => ranking.difficulty_id === difficulty_id))) {
                    const key = encounter_id.toString() + "," + difficulty_id.toString();
                    if (!encounter_results.has(key))
                        encounter_results.set(key, [[encounter_id, difficulty_id], [undefined, undefined, undefined]]);
                    encounter_results.get(key)[1][1] = this.process_char_results(char_results.map(([a, b, rankings]) =>
                        [a, b, rankings.filter(ranking => ranking.difficulty_id === difficulty_id)]));
                }
            }
        });
        this.tps_rankings.forEach(([encounter_id, char_results]) => {
            for (const difficulty_id of [3, 4, 5, 6, 9, 148]) {
                if (char_results.some(([a, b, rankings]) => rankings.some(ranking => ranking.difficulty_id === difficulty_id))) {
                    const key = encounter_id.toString() + "," + difficulty_id.toString();
                    if (!encounter_results.has(key))
                        encounter_results.set(key, [[encounter_id, difficulty_id], [undefined, undefined, undefined]]);
                    encounter_results.get(key)[1][2] = this.process_char_results(char_results.map(([a, b, rankings]) =>
                        [a, b, rankings.filter(ranking => ranking.difficulty_id === difficulty_id)]));
                }
            }
        });

        const ranking_results = [];
        for (const [key, [[encounter_id, difficulty_id], [dps, hps, tps]]] of encounter_results.entries()) {
            if (!dps && !hps && !tps)
                continue;

            const columns: Array<BodyColumn> = [];

            columns.push({
                type: 3,
                content: encounter_id.toString(),
                args: null
            });

            columns.push({
                type: 3,
                content: difficulty_id.toString(),
                args: null
            });

            columns.push({
                type: 0,
                content: this.format_ranking(dps),
                args: dps
            });

            columns.push({
                type: 0,
                content: this.format_ranking(hps),
                args: hps
            });

            columns.push({
                type: 0,
                content: this.format_ranking(tps),
                args: tps
            });

            ranking_results.push({
                color: '',
                columns
            });
        }
        this.rows$.next(ranking_results);
    }

    private format_ranking(ranking: CharacterRankingResult): string {
        if (!ranking)
            return "-";
        return (ranking.amount / (ranking.duration / 1000)).toFixed(1) + " (" + ranking.rank + ")"
    }

    private process_char_results(char_results: Array<[number, RankingCharacterMeta, Array<RankingResult>]>): CharacterRankingResult | undefined {
        const ranked_results = enumerate(char_results.filter(([a, meta]) => meta.server_id === this.current_server_id)
            .map(([a, b, rankings]) => [a, b, max_by(rankings, (ranking) => ranking.amount / ranking.duration)])
            .sort((left, right) => ((right[2] as any).amount / (right[2] as any).duration) - ((left[2] as any).amount / (left[2] as any).duration)));
        const results = ranked_results.find(([rank, [char_id,]]) => char_id === this.current_character_id);
        if (!results)
            return undefined;
        return {
            amount: results[1][2].amount,
            attempt_id: results[1][2].attempt_id,
            duration: results[1][2].duration,
            instance_meta_id: results[1][2].instance_meta_id,
            rank: results[0] + 1
        };
    }

    get rows(): Observable<Array<Array<BodyColumn>>> {
        return this.rows$.asObservable();
    }

}
