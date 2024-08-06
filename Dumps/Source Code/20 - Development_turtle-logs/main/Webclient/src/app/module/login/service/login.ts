import {Injectable} from "@angular/core";
import {APIService} from "../../../service/api";
import {LoginForm} from "../dto/login_form";
import {SettingsService} from "../../../service/settings";
import {Router} from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class LoginService {
    private static readonly URL_LOGIN: string = "/account/login";

    constructor(private apiService: APIService,
                private settingsService: SettingsService,
                private routingService: Router) {
    }

    signIn(loginForm: LoginForm, on_success: any, on_failure: any): void {
        this.apiService.post<any, LoginForm>(LoginService.URL_LOGIN, loginForm, (resp) => {
            this.settingsService.set("API_TOKEN", resp);
            this.routingService.navigate(["/account"]);
            on_success.call(on_success);
        }, on_failure);
    }
}
