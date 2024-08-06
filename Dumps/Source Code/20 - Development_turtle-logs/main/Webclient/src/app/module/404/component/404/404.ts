import {Component} from "@angular/core";

@Component({
    selector: "FourOFour",
    templateUrl: "./404.html",
    styleUrls: ["./404.scss"]
})
export class FourOFourComponent {

    reeee: string = 'REEE';

    constructor() {
        this.reeee += 'E'.repeat(100 + Math.random() * 900);
    }
}
