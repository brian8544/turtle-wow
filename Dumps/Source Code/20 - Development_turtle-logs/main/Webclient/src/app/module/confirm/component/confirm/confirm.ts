import {Component} from "@angular/core";
import {ConfirmService} from "../../service/confirm";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: "Confirm",
    templateUrl: "./confirm.html",
    styleUrls: ["./confirm.scss"]
})
export class ConfirmComponent {

    constructor(private confirmService: ConfirmService,
                private routerService: Router,
                private activeRouteService: ActivatedRoute) {
        this.activeRouteService.params.subscribe(params => this.processParams(params));
    }

    private processParams(params): void {
        switch (params.type) {
            case "forgot":
                this.confirmService.forgot(params.confirm_id);
                break;
            case "update_mail":
                this.confirmService.update_mail(params.confirm_id);
                break;
            case "delete":
                this.confirmService.delete(params.confirm_id);
                break;
            case "create":
                this.confirmService.create(params.confirm_id);
                break;
            default:
                this.routerService.navigate(["/"]);
                break;
        }
    }

}
