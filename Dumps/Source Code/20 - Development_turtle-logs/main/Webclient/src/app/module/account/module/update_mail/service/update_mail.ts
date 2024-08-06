import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";
import {Severity} from "../../../../../domain_value/severity";
import {NotificationService} from "../../../../../service/notification";

@Injectable({
    providedIn: "root",
})
export class UpdateMailService {
    private static readonly URL_UPDATE_MAIL: string = '/account/update/mail';

    constructor(private apiService: APIService,
                private notificationService: NotificationService) {
    }

    update(mail: string, on_success: any, on_failure: any): void {
        this.apiService.post(UpdateMailService.URL_UPDATE_MAIL, mail, (pw_changed) => {
            if (pw_changed)
                this.notificationService.propagate(Severity.Success, 'serverResponses.200');
            else
                this.notificationService.propagate(Severity.Info, 'serverResponses.mail_confirm');
            on_success.call(on_success);
        }, on_failure);
    }

}
