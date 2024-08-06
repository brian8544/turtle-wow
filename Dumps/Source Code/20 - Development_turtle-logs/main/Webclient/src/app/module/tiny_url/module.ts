import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {TinyUrlComponent} from "./component/tiny_url/tiny_url";
import {CommonModule} from "@angular/common";
import {TinyUrlRouting} from "./routing";
import {ClipboardModule} from "@angular/cdk/clipboard";

@NgModule({
    declarations: [TinyUrlComponent],
    imports: [
        CommonModule,
        TranslateModule,
        TinyUrlRouting,
        ClipboardModule
    ],
    exports: [TinyUrlComponent],
})
export class TinyUrlModule {
}
