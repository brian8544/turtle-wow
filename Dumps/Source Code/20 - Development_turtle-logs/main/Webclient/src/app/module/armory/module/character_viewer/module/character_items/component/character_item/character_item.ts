import {Component, Input} from "@angular/core";

@Component({
    selector: "CharacterItem",
    templateUrl: "./character_item.html",
    styleUrls: ["./character_item.scss"]
})
export class CharacterItemComponent {

    @Input() history_id: number;
    @Input() item: any;
    @Input() piece: string;

}
