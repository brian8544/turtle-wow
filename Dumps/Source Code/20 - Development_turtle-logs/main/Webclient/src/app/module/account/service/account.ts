import {Injectable} from "@angular/core";
import {APIService} from "../../../service/api";
import {SettingsService} from "../../../service/settings";

@Injectable({
    providedIn: "root",
})
export class AccountService {
    private static readonly URL_PROLONG: string = '/account/token/prolong';

    constructor(private apiService: APIService,
                private settingsService: SettingsService) {
        this.prolong();
    }

    prolong(): void {
        if (!this.settingsService.check("API_TOKEN"))
            return;

        const api_token = this.settingsService.get("API_TOKEN");
        // Only prolong token, if 3 days or less remain
        if (api_token.exp_date - (Date.now() / 1000) > 3 * 24 * 60 * 60)
            return;
        this.apiService.post(AccountService.URL_PROLONG, {
            token_id: api_token.token,
            days: 7
        }, (new_token) => this.settingsService.set("API_TOKEN", new_token));
    }
}
