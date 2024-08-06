import {Component, EventEmitter, OnDestroy, Output} from "@angular/core";
import {LootService} from "../../service/loot";
import {Observable, Subscription} from "rxjs";
import {Loot} from "../../domain_value/loot";
import {InstanceDataService} from "../../../../service/instance_data";
import {concatMap, map} from "rxjs/operators";
import {DataService} from "../../../../../../service/data";

@Component({
    selector: "RaidLoot",
    templateUrl: "./raid_loot.html",
    styleUrls: ["./raid_loot.scss"],
    providers: [
        LootService
    ]
})
export class RaidLootComponent implements OnDestroy {

    private subscription: Subscription;

    expansion_id: Observable<number>;
    loot: Array<Loot> = [];

    show_insignificant: boolean = false;
    toggle_decisions = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    @Output() lootEmpty: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private instanceDataService: InstanceDataService,
        private dataService: DataService,
        private lootService: LootService
    ) {
        this.subscription = this.lootService.loot.subscribe(loot => {
            this.loot = loot;
            this.lootEmpty.next(this.loot.length === 0);
        });
        this.expansion_id = this.instanceDataService.meta.pipe(map(meta => meta.expansion_id));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    isFilteredGroupEmpty(items): boolean {
        console.log(items);
        return false;
    }
}
