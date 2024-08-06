import {Injectable, OnDestroy} from "@angular/core";
import {InstanceDataService} from "../../../service/instance_data";
import {BehaviorSubject, from, Observable, of, Subscription} from "rxjs";
import {Loot} from "../domain_value/loot";
import {concatMap, map, take} from "rxjs/operators";
import {InstanceViewerAttempt} from "../../../domain_value/instance_viewer_attempt";
import {Loot as EventLoot} from "../../../domain_value/event";
import {LootItem} from "../domain_value/loot_item";
import {UnitService} from "../../../service/unit";
import {DataService} from "../../../../../service/data";
import {InstanceViewerMeta} from "../../../domain_value/instance_viewer_meta";
import {Localized} from "../../../../../domain_value/localized";
import {BasicItem} from "../../../../../domain_value/data/basic_item";
import {CONST_UNKNOWN_LABEL} from "../../../constant/viewer";
import {KnechtUpdates} from "../../../domain_value/knecht_updates";
import {se_loot} from "../../../extractor/sources";

@Injectable({
    providedIn: "root",
})
export class LootService implements OnDestroy {

    private subscription: Subscription;
    private current_meta: InstanceViewerMeta;

    private loot$: BehaviorSubject<Array<Loot>> = new BehaviorSubject([]);

    constructor(
        private instanceDataService: InstanceDataService,
        private unitService: UnitService,
        private dataService: DataService
    ) {
        this.subscription = this.instanceDataService.meta.subscribe(meta => {
            this.current_meta = meta;
            this.reload();
        });
        this.instanceDataService.knecht_updates.subscribe(async ([knecht_update, evt_types]) => {
            if (knecht_update.includes(KnechtUpdates.FilterChanged) || (knecht_update.includes(KnechtUpdates.NewData) && [3].some(evt => evt_types.includes(evt))))
                this.reload();
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    get loot(): Observable<Array<Loot>> {
        return this.loot$.asObservable();
    }

    private reload() {
        if (!this.current_meta)
            return;
        this.instanceDataService
            .attempts.pipe(take(1))
            .subscribe(attempts => {
                from(this.instanceDataService.knecht_misc.get_loot()).pipe(take(1))
                    .subscribe( loot => {
                        this.loot$.next(this.create_loot(attempts, loot as Array<EventLoot>));
                    });
            });
    }

    private get_basic_item(item_id: number): Observable<Localized<BasicItem> | undefined> {
        return this.dataService.get_localized_basic_item(this.current_meta.expansion_id, item_id);
    }

    private create_loot(attempts: Array<InstanceViewerAttempt>, loot: Array<EventLoot>): Array<Loot> {
        const result = new Map<number, Loot>();
        const sorted_attempts = attempts.sort((left, right) => left.start_ts - right.start_ts);
        for (const item of loot) {
            let last_attempt: InstanceViewerAttempt;
            for (const attempt of sorted_attempts) {
                if (attempt.start_ts > item[1])
                    break;
                last_attempt = attempt;
            }
            const loot_item: LootItem = {
                receiver_id: se_loot(item)[1],
                receiver: this.unitService.get_unit_name(se_loot(item), this.current_meta.end_ts ?? this.current_meta.start_ts),
                item: this.get_basic_item(item[3]),
                amount: item[4]
            };
            if (!last_attempt) {
                if (result.has(0)) {
                    const entry = result.get(0);
                    entry.loot_items.push(loot_item);
                } else  {
                    result.set(0, {
                        name: of(CONST_UNKNOWN_LABEL),
                        loot_items: [loot_item]
                    });
                }
            } else {
                if (result.has(last_attempt.encounter_id)) {
                    const entry = result.get(last_attempt.encounter_id);
                    entry.loot_items.push(loot_item);
                } else {
                    result.set(last_attempt.encounter_id, {
                        name: this.dataService.get_encounter(last_attempt.encounter_id).pipe(map(encounter => encounter?.localization)),
                        loot_items: [loot_item]
                    });
                }
            }
        }
        return [...result.values()];
    }
}
