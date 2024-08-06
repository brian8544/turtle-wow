import {Component, Input} from "@angular/core";

@Component({
    selector: "ItemIcon",
    templateUrl: "./item_icon.html",
    styleUrls: ["./item_icon.scss"]
})
export class ItemIconComponent {

    @Input() size: number = 32;
    @Input() quality: number = 0;
    @Input() item_id: number;
    @Input() history_id: number;
    @Input() iconPath: string;
    @Input() expansion_id: number;

}
