import {Injectable} from "@angular/core";
import {SettingsService} from "../service/settings";
import {CanLoad, Router} from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class SignedInGuard implements CanLoad {
    constructor(private settingsService: SettingsService,
                private routingService: Router) {
    }

    canLoad(): boolean {
        if (this.settingsService.check("API_TOKEN")) {
            this.routingService.navigate(["/account"]);
            return false;
        }
        return true;
    }
}
