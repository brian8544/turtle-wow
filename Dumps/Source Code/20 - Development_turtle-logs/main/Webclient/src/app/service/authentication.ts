import {Injectable} from "@angular/core";
import {SettingsService} from "./settings";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {

    constructor(
        private settingsService: SettingsService
    ) {
    }

    getToken(): string {
        if (this.settingsService.check("API_TOKEN"))
            return this.settingsService.get("API_TOKEN").token;
        return '';
    }

    clearToken(): void {
        this.settingsService.delete("API_TOKEN");
    }

}
