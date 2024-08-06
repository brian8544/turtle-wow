import {NgModule} from "@angular/core";

import {CookieBannerComponent} from "./component/cookie_banner/cookie_banner";
import {CookieOptionsModule} from "./module/cookie_options/module";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {CookieFrontModule} from "./module/cookie_front/module";

@NgModule({
    declarations: [CookieBannerComponent],
    imports: [
        CommonModule,
        CookieFrontModule,
        CookieOptionsModule,
        TranslateModule
    ],
    exports: [CookieBannerComponent],
    bootstrap: [CookieBannerComponent]
})
export class CookieBannerModule {
}
