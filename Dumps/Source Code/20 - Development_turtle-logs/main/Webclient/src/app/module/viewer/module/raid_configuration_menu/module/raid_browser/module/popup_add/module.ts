import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {PopupAddComponent} from "./component/popup_add/popup_add";
import {CommonModule} from "@angular/common";
import {SelectInputModule} from "../../../../../../../../template/input/select_input/module";
import {MultiSelectModule} from "../../../../../../../../template/input/multi_select/module";
import {GeneralInputModule} from "../../../../../../../../template/input/general_input/module";

@NgModule({
    declarations: [PopupAddComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SelectInputModule,
        MultiSelectModule,
        GeneralInputModule,
    ],
    exports: [PopupAddComponent]
})
export class PopupAddModule {
}
