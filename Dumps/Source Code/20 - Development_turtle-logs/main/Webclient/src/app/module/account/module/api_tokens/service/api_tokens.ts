import {Injectable} from "@angular/core";
import {APIService} from "../../../../../service/api";
import {CreateToken} from "../dto/create_token";
import {Severity} from "../../../../../domain_value/severity";
import {NotificationService} from "../../../../../service/notification";

@Injectable({
    providedIn: "root",
})
export class APITokensService {
    private static readonly URL_TOKEN: string = '/account/token';

    constructor(private apiService: APIService,
                private notificationService: NotificationService) {
    }

    get(on_success: any): void {
        this.apiService.get(APITokensService.URL_TOKEN, on_success);
    }

    add_token(create_token: CreateToken, on_success: any, on_failure: any): void {
        this.apiService.post(APITokensService.URL_TOKEN, create_token, (api_token) => {
            this.notificationService.propagate(Severity.Success, "serverResponses.200");
            on_success.call(on_success, api_token);
        }, on_failure);
    }

    delete_token(token_id: number, on_success: any, on_failure: any): void {
        this.apiService.delete(APITokensService.URL_TOKEN, token_id, () => {
            this.notificationService.propagate(Severity.Success, "serverResponses.200");
            on_success.call(on_success);
        }, on_failure);
    }
}
