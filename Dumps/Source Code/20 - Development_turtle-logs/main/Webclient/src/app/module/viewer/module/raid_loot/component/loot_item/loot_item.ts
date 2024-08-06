import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";

@Component({
    selector: "LootItem",
    templateUrl: "./loot_item.html",
    styleUrls: ["./loot_item.scss"]
})
export class LootItemComponent {

    @Input() item_id: number;
    @Input() icon_path: string;
    @Input() quality: number;
    @Input() character_id: number;
    @Input() character_name: Observable<string>;
    @Input() amount: number;
    @Input() expansion_id: number;

}
