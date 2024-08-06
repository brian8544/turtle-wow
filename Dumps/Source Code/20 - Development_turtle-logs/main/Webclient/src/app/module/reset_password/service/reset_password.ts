import {Injectable} from "@angular/core";
import {APIService} from "../../../service/api";
import {Severity} from "../../../domain_value/severity";
import {NotificationService} from "../../../service/notification";

@Injectable({
    providedIn: "root",
})
export class ResetPasswordService {
    private static readonly URL_RESET_PASSWORD: string = '/account/forgot';

    constructor(private apiService: APIService,
                private notificationService: NotificationService) {
    }

    reset_password(mail: string, on_success: any, on_failure: any): void {
        this.apiService.post(ResetPasswordService.URL_RESET_PASSWORD, mail, () => {
            this.notificationService.propagate(Severity.Info, 'serverResponses.reset_mail_confirm');
            on_success.call(on_success);
        }, on_failure);
    }
}
