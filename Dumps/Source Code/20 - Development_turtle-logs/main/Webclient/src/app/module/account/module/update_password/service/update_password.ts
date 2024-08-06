import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";
import {SettingsService} from "../../../../../service/settings";
import {Severity} from "../../../../../domain_value/severity";
import {NotificationService} from "../../../../../service/notification";

@Injectable({
    providedIn: "root",
})
export class UpdatePasswordService {
    private static readonly URL_UPDATE_PASSWORD: string = '/account/update/password';

    constructor(private apiService: APIService,
                private settingsService: SettingsService,
                private notificationService: NotificationService) {
    }

    update(password: string, on_success: any, on_failure: any): void {
        this.apiService.post(UpdatePasswordService.URL_UPDATE_PASSWORD, password, (api_token) => {
            this.settingsService.set("API_TOKEN", api_token);
            this.notificationService.propagate(Severity.Success, 'serverResponses.200');
            on_success.call(on_success);
        }, on_failure);
    }
}
