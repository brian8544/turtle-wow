import {Observable} from "rxjs";
import {LootItem} from "./loot_item";

export interface Loot {
    name: Observable<string>;
    loot_items: Array<LootItem>;
}
