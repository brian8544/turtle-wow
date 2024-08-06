import {Component, EventEmitter, Output} from "@angular/core";
import {CookieOption} from "../../material/cookie_option";
import {SettingsService} from "../../../../service/settings";
import {NotificationService} from "../../../../service/notification";
import {Severity} from "../../../../domain_value/severity";

@Component({
    selector: "CookieBanner",
    templateUrl: "./cookie_banner.html",
    styleUrls: ["./cookie_banner.scss"]
})
export class CookieBannerComponent {
    @Output() close_banner: EventEmitter<boolean> = new EventEmitter();

    show_options = false;
    cookies_third_party: Array<CookieOption> = [];
    cookies_other: Array<CookieOption> = [];
    cookies_necessary: Array<CookieOption> = [];

    constructor(private settingsService: SettingsService,
                private notificationService: NotificationService) {
        this.cookies_necessary.push(new CookieOption("CookieBanner.cookieDecisions.title", "CookieBanner.cookieDecisions.description", true, true));
        this.cookies_necessary.push(new CookieOption("CookieBanner.pwa_prompt.title", "CookieBanner.pwa_prompt.description", true, true));
        this.cookies_necessary.push(new CookieOption("CookieBanner.api_token.title", "CookieBanner.api_token.description", true, true));

        // GDPR requires an active opt-in. Setting them to be enabled by default is not legal!
        // this.cookies_other.push(new CookieOption("CookieBanner.googleAnalytics.title", "CookieBanner.googleAnalytics.description", false, false));

        this.load();
    }

    set_show_options(show: boolean): void {
        this.show_options = show;
    }

    agree_all(): void {
        this.cookies_other.forEach(cookie => cookie.setEnabled(true));
        this.cookies_third_party.forEach(cookie => cookie.setEnabled(true));
        this.save();
    }

    reject_all(): void {
        this.cookies_other.forEach(cookie => cookie.setEnabled(false));
        this.cookies_third_party.forEach(cookie => cookie.setEnabled(false));
        this.save();
    }

    save(): void {
        const cookieDecisions = {
            other: this.cookies_other.map(cookie => cookie.enabled),
            third_party: this.cookies_third_party.map(cookie => cookie.enabled)
        };

        this.settingsService.set("cookieDecisions", cookieDecisions);
        this.notificationService.propagate(Severity.Success, "CookieBanner.notification.saved");
        this.close_banner.emit(false);
    }

    private load(): void {
        if (!this.settingsService.check("cookieDecisions"))
            return;
        const cookieDecisions = this.settingsService.get("cookieDecisions");
        cookieDecisions.other.forEach((decison, i) => {
            if (!!this.cookies_other[i])
                this.cookies_other[i].setEnabled(decison);
        });
        cookieDecisions.third_party.forEach((decison, i) => {
            if (!!this.cookies_third_party[i])
                this.cookies_third_party[i].setEnabled(decison);
        });
    }
}
