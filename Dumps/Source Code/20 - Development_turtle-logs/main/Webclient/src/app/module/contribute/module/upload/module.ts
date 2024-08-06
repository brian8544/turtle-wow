import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {UploadComponent} from "./component/upload/upload";
import {CommonModule} from "@angular/common";
import {UploadRouting} from "./routing";
import {SelectInputModule} from "../../../../template/input/select_input/module";
import {DateInputModule} from "../../../../template/input/date_input/module";
import {GeneralInputModule} from "../../../../template/input/general_input/module";
import {FormsModule} from "@angular/forms";
import {FormValidDirectiveModule} from "../../../../directive/form_valid/module";

@NgModule({
    declarations: [UploadComponent],
    imports: [
        CommonModule,
        TranslateModule,
        UploadRouting,
        SelectInputModule,
        DateInputModule,
        GeneralInputModule,
        FormsModule,
        FormValidDirectiveModule
    ],
    exports: [UploadComponent]
})
export class UploadModule {
}
