import {Component, OnDestroy} from "@angular/core";
import {LoadingBarService} from "../../../../service/loading_bar";
import {Subscription} from "rxjs";
import {auditTime} from "rxjs/operators";

@Component({
    selector: "RouterLoadingBar",
    templateUrl: "./router_loading_bar.html",
    styleUrls: ["./router_loading_bar.scss"]
})
export class RouterLoadingBarComponent implements OnDestroy {

    private subscription: Subscription;

    displayBar = false;

    constructor(private loadingBarService: LoadingBarService) {
        this.subscription = this.loadingBarService.loading.subscribe(state => this.displayBar = state);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
