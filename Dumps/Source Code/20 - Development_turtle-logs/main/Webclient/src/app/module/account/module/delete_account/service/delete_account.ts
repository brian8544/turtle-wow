import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";
import {NotificationService} from "../../../../../service/notification";
import {Severity} from "../../../../../domain_value/severity";

@Injectable({
    providedIn: "root",
})
export class DeleteAccountService {
    private static readonly URL_ISSUE_DELETE: string = '/account/delete';

    constructor(private apiService: APIService,
                private notificationService: NotificationService) {
    }

    delete(on_response: any): void {
        this.apiService.delete(DeleteAccountService.URL_ISSUE_DELETE, '', () => {
            this.notificationService.propagate(Severity.Info, 'serverResponses.mail_confirm');
            on_response.call(on_response);
        }, on_response);
    }
}
