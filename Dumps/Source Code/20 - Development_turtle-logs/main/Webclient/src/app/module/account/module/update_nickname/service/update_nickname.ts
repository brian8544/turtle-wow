import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";
import {Severity} from "../../../../../domain_value/severity";
import {NotificationService} from "../../../../../service/notification";

@Injectable({
    providedIn: "root",
})
export class UpdateNicknameService {
    private static readonly URL_UPDATE_NICKNAME: string = '/account/update/nickname';

    constructor(private apiService: APIService,
                private notificationService: NotificationService) {
    }

    update(nickname: string, on_success: any, on_failure: any): void {
        this.apiService.post(UpdateNicknameService.URL_UPDATE_NICKNAME, nickname, () => {
            this.notificationService.propagate(Severity.Success, 'serverResponses.200');
            on_success.call(on_success);
        }, on_failure);
    }

}
