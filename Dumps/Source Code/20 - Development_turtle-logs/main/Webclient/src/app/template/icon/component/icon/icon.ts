import {Component, Input} from "@angular/core";

@Component({
    selector: "Icon",
    templateUrl: "./icon.html",
    styleUrls: ["./icon.scss"]
})
export class IconComponent {

    @Input() iconPath: string;
    @Input() size: number = 32;
    @Input() border: boolean = true;

}
