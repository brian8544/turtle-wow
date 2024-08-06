import {Component, OnDestroy, OnInit} from "@angular/core";
import {TinyUrlService} from "../../service/tiny_url";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";
import {Subscription} from "rxjs";
import {NotificationService} from "src/app/service/notification";
import {Severity} from "../../../../domain_value/severity";

@Component({
    selector: "TinyUrl",
    templateUrl: "./tiny_url.html",
    styleUrls: ["./tiny_url.scss"],
    providers: [
        TinyUrlService
    ]
})
export class TinyUrlComponent implements OnInit, OnDestroy {

    private subscription_success: Subscription;
    private subscription_failure: Subscription;

    constructor(
        private tinyUrlService: TinyUrlService,
        private routerService: Router,
        private activatedRouteService: ActivatedRoute,
        private notificationService: NotificationService
    ) {
        this.subscription_success = this.tinyUrlService.redirect_url.subscribe(url => {
           this.routerService.navigate([url]);
        });
        this.subscription_failure = this.tinyUrlService.failure.subscribe(() => {
            this.notificationService.propagate(Severity.Error, "TinyUrl.not_found");
            this.routerService.navigate(["/"]);
        });
    }

    ngOnInit(): void {
        this.activatedRouteService.paramMap
            .pipe(take(1))
            .subscribe(params => this.tinyUrlService.load_tiny_url(Number(params.get("link"))));
    }

    ngOnDestroy(): void {
        this.subscription_success?.unsubscribe();
        this.subscription_failure?.unsubscribe();
    }
}
