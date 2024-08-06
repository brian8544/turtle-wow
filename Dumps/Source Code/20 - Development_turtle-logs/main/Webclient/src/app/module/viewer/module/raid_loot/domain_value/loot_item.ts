import {Observable} from "rxjs";
import {BasicItem} from "../../../../../domain_value/data/basic_item";
import {Localized} from "../../../../../domain_value/localized";

export interface LootItem {
    receiver_id: number;
    receiver: Observable<string>;
    amount: number;
    item: Observable<Localized<BasicItem>>;
}
