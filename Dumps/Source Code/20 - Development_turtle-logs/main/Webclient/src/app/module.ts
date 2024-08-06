import {BrowserModule, Meta, Title} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRouting} from "./routing";
import {AppComponent} from "./component/app/app";

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {FooterBarModule} from "./module/footer_bar/module";
import {NavigationBarModule} from "./module/navigation_bar/module";
import {CookieBannerComponent} from "./module/cookie_banner/component/cookie_banner/cookie_banner";
import {SettingsService} from "./service/settings";
import {NotificationListModule} from "./module/notification_list/module";
import {NotificationService} from "./service/notification";
import {RouterLoadingBarModule} from "./module/router_loading_bar/module";
import {TranslationService} from "./service/translation";
import {APIService} from "./service/api";
import {LoadingBarService} from "./service/loading_bar";
import {LoadingBarInterceptor} from "./service/interceptor/loading_bar";
import {AuthenticationService} from "./service/authentication";
import {AuthenticationInterceptor} from "./service/interceptor/authentication";
import {WindowService} from "./styling_service/window";
import {LanguageInterceptor} from "./service/interceptor/language";
import {DataService} from "./service/data";
import {TooltipModule} from "./module/tooltip/module";
import {TooltipControllerService} from "./service/tooltip_controller";
import {MousePositionService} from "./styling_service/mouse_position";
import {CookieBannerModule} from "./module/cookie_banner/module";
import {DateService} from "./service/date";
import {DatePipe} from "@angular/common";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRouting,
        NotificationListModule,
        NavigationBarModule,
        RouterLoadingBarModule,
        FooterBarModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        TooltipModule,
        CookieBannerModule
    ],
    providers: [
        SettingsService,
        NotificationService,
        TranslationService,
        LoadingBarService,
        APIService,
        DataService,
        AuthenticationService,
        WindowService,
        TooltipControllerService,
        MousePositionService,
        {provide: HTTP_INTERCEPTORS, useClass: LoadingBarInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true},
        DatePipe,
        DateService,
        Meta,
        Title
    ],
    bootstrap: [AppComponent],
    entryComponents: [CookieBannerComponent]
})
export class AppModule {
}
