import {NgModule} from "@angular/core";

import {CookieOptionsComponent} from "./component/cookie_options/cookie_options";
import {CookieOptionRowComponent} from "./component/cookie_option_row/cookie_option_row";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        CookieOptionsComponent,
        CookieOptionRowComponent
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [CookieOptionsComponent]
})
export class CookieOptionsModule {
}
