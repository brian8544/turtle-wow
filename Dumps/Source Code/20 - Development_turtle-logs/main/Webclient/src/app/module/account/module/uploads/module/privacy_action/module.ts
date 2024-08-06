import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {PrivacyActionComponent} from "./component/privacy_action/privacy_action";
import {CommonModule} from "@angular/common";
import {SelectInputModule} from "../../../../../../template/input/select_input/module";

@NgModule({
    declarations: [PrivacyActionComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SelectInputModule,
    ],
    exports: [PrivacyActionComponent]
})
export class PrivacyActionModule {
}
