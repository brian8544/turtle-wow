import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {ConfirmComponent} from "./component/confirm/confirm";
import {CommonModule} from "@angular/common";
import {ConfirmRouting} from "./routing";
import {ConfirmService} from "./service/confirm";

@NgModule({
    declarations: [ConfirmComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ConfirmRouting
    ],
    exports: [ConfirmComponent],
    providers: [ConfirmService]
})
export class ConfirmModule {
}
