import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ViewerComponent} from "./component/viewer/viewer";
import {CommonModule} from "@angular/common";
import {ViewerRouting} from "./routing";
import {ClipboardModule} from "@angular/cdk/clipboard";

@NgModule({
    declarations: [ViewerComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ViewerRouting,
        ClipboardModule,
    ],
    exports: [ViewerComponent]
})
export class ViewerModule {
}
