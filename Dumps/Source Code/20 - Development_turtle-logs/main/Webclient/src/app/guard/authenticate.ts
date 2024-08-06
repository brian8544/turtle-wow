import {Injectable} from "@angular/core";
import {SettingsService} from "../service/settings";
import {CanLoad, Router} from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthenticateGuard implements CanLoad {
    constructor(private settingsService: SettingsService,
                private routingService: Router) {
    }

    canLoad(): boolean {
        if (!this.settingsService.check("API_TOKEN")) {
            this.routingService.navigate(["/login"]);
            return false;
        }
        return true;
    }
}
