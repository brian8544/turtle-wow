import {AfterViewInit, Component, OnChanges, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SettingsService} from "../../service/settings";
import {TranslationService} from "../../service/translation";
import {APIService} from "../../service/api";
import {AccountInformation} from "../../module/account/domain_value/account_information";

declare var gtag;

@Component({
    selector: "root",
    templateUrl: "./app.html",
    styleUrls: ["./app.scss"]
})
export class AppComponent implements OnInit, OnChanges {
    private static readonly URL_ACCOUNT_GET: string = '/account/get';


    public show_cookie_banner = false;
    title = "LegacyPlayers";
    private googleAnalyticsSubscription: Subscription

    enable_ads: boolean = false;
    is_on_viewer_site: boolean = false;
    enough_bottom_space: boolean = false;
    enough_width_for_side_ads: boolean = false;

    constructor(
        private settingsService: SettingsService,
        private translationService: TranslationService,
        private router: Router,
        private apiService: APIService
    ) {
        this.settingsService.subscribe("cookieDecisions", item => this.configure_google_analytics(item));
        (window as any).addEventListener("beforeinstallprompt", (e) => () => this.prompt_for_pwa(e));
        this.router.events.subscribe(event => this.set_ad_width_flags());
    }

    ngOnInit(): void {
        this.set_cookie_banner(!this.settingsService.check("cookieDecisions"));
        this.configure_google_analytics(this.settingsService.get("cookieDecisions"));
        this.retrieve_account_information();
        setInterval(() => this.set_ad_width_flags(), 500);
    }

    ngOnChanges(): void {
        this.configure_google_analytics(this.settingsService.get("cookieDecisions"));
    }

    set_cookie_banner(state: boolean): void {
        this.show_cookie_banner = state;
    }

    set_ad_width_flags(): void {
        this.is_on_viewer_site = this.router.url.includes("viewer/");
        this.enough_width_for_side_ads = document.getElementsByTagName("body")[0].clientWidth >= 800;
        const ad_element = document.getElementById("bottom_layer");
        this.enough_bottom_space = !!ad_element && ad_element.clientWidth >= 2000;
    }

    private configure_google_analytics(cookieDecisions: any): void {
        if (!gtag || !!this.googleAnalyticsSubscription)
            return;

        /*
        if (!cookieDecisions || !cookieDecisions.other[0]) {
            if (this.googleAnalyticsSubscription) {
                this.googleAnalyticsSubscription.unsubscribe();
            }
            return;
        }*/

        gtag("config", "UA-107735472-1");
        this.googleAnalyticsSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd && (window as any).ga) {
                (window as any).ga("create", "UA-107735472-1", "auto");
                (window as any).ga("set", "anonymizeIp", true);
                (window as any).ga("set", "allowAdFeatures", false);
                (window as any).ga("set", "page", event.urlAfterRedirects);
                (window as any).ga("send", "pageview");
            }
        });
    }

    private prompt_for_pwa(e: any): void {
        if (this.settingsService.check("PWA_PROMPT"))
            return;
        e.prompt();
        this.settingsService.set("PWA_PROMPT", true);
    }

    get isMobile(): boolean {
        return navigator.userAgent.toLowerCase().includes("mobile") || !this.enough_width_for_side_ads;
    }

    private retrieve_account_information(): void {
        if (this.settingsService.check("API_TOKEN")) {
            this.apiService.get<AccountInformation>(AppComponent.URL_ACCOUNT_GET, (result) => {
                this.settingsService.set("ACCOUNT_INFORMATION", result);
                this.enable_ads = !(((result as AccountInformation).access_rights & 2) == 2);
            });
        }
    }
}
