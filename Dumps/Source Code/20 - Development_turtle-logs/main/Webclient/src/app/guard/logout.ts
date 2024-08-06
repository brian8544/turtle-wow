import {Injectable} from "@angular/core";
import {SettingsService} from "../service/settings";
import {CanActivate, Router} from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class LogOutGuard implements CanActivate {
    constructor(private settingsService: SettingsService,
                private routingService: Router) {
    }

    canActivate(): boolean {
        this.settingsService.set("API_TOKEN", undefined);
        this.settingsService.set("ACCOUNT_INFORMATION", undefined);
        this.routingService.navigate(["/"]);
        return false;
    }
}
