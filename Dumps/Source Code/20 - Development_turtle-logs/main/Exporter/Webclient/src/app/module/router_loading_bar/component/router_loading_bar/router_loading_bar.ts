import {Component} from "@angular/core";
import {LoadingBarService} from "../../../../service/loading_bar";

@Component({
    selector: "RouterLoadingBar",
    templateUrl: "./router_loading_bar.html",
    styleUrls: ["./router_loading_bar.scss"]
})
export class RouterLoadingBarComponent {
    displayBar = false;

    constructor(private loadingBarService: LoadingBarService) {
        this.loadingBarService.subscribe(state => this.displayBar = state);
    }
}
