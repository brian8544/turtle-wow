import {Injectable} from "@angular/core";
import {APIService} from "../../../service/api";
import {SettingsService} from "../../../service/settings";
import {NotificationService} from "../../../service/notification";
import {Router} from "@angular/router";
import {Severity} from "../../../domain_value/severity";

@Injectable({
    providedIn: "root",
})
export class ConfirmService {
    private static readonly URL_CONFIRM_DELETE: string = '/account/delete';
    private static readonly URL_CONFIRM_CREATE: string = '/account/create';
    private static readonly URL_CONFIRM_UPDATE_MAIL: string = '/account/update/mail';
    private static readonly URL_CONFIRM_FORGOT: string = '/account/forgot';

    constructor(private apiService: APIService,
                private settingsService: SettingsService,
                private notificationService: NotificationService,
                private routerService: Router) {
    }

    create(confirm_id: string): void {
        this.apiService.get(ConfirmService.URL_CONFIRM_CREATE + "/" + confirm_id, () => {
            this.notificationService.propagate(Severity.Success, "serverResponses.200");
            this.routerService.navigate(["/account"]);
        }, () => this.routerService.navigate(["/"]));
    }

    delete(confirm_id: string): void {
        this.apiService.get(ConfirmService.URL_CONFIRM_DELETE + "/" + confirm_id, () => this.notificationService.propagate(Severity.Success, "serverResponses.200"));
        this.routerService.navigate(["/"]);
    }

    update_mail(confirm_id: string): void {
        this.apiService.get(ConfirmService.URL_CONFIRM_UPDATE_MAIL + "/" + confirm_id, (api_token) => {
            this.settingsService.set("API_TOKEN", api_token);
            this.notificationService.propagate(Severity.Success, "serverResponses.200");
            this.routerService.navigate(["/account"]);
        }, () => this.routerService.navigate(["/"]));
    }

    forgot(confirm_id: string): void {
        this.apiService.get(ConfirmService.URL_CONFIRM_FORGOT + "/" + confirm_id, (api_token) => {
            this.settingsService.set("API_TOKEN", api_token);
            this.notificationService.propagate(Severity.Success, "serverResponses.200");
            this.routerService.navigate(["/account/password"]);
        }, () => this.routerService.navigate(["/"]));
    }
}
