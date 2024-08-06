import {Component} from "@angular/core";

@Component({
    selector: "Minimizer",
    templateUrl: "./minimizer.html",
    styleUrls: ["./minimizer.scss"]
})
export class MinimizerComponent {

    minimized: boolean = false;

    toggle(): void {
        this.minimized = !this.minimized;
    }

}
