import {Component, Input} from "@angular/core";

@Component({
    selector: "HeroClass",
    templateUrl: "./hero_class.html",
    styleUrls: ["./hero_class.scss"]
})
export class HeroClassComponent {
    @Input() hero_class_id: number;
    @Input() hero_class_label: string;
}
