import {Component, OnDestroy} from "@angular/core";
import {ExportViewerService} from "../../service/export_viewer";
import {ActivatedRoute} from "@angular/router";
import {ViewerMode} from "../../../../../../domain_value/viewer_mode";
import {Subscription} from "rxjs";

@Component({
    selector: "ExportViewer",
    templateUrl: "./export_viewer.html",
    styleUrls: ["./export_viewer.scss"]
})
export class ExportViewerComponent implements OnDestroy {

    private subscription: Subscription;

    constructor(
        private activatedRouteService: ActivatedRoute,
        private exportViewerService: ExportViewerService
    ) {
        this.subscription = this.activatedRouteService.paramMap.subscribe(params => {
            const route_mode = params.get("mode") as ViewerMode;
            if ([ViewerMode.Base, ViewerMode.Ability, ViewerMode.Detail, ViewerMode.EventLog].includes(route_mode)) {
                this.exportViewerService.setViewerMode(route_mode);
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    emit_share(): void {
        this.exportViewerService.export();
    }
}
