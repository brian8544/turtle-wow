import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {EditComponent} from "./component/edit/edit";
import {CommonModule} from "@angular/common";
import {EditRouting} from "./routing";
import {GeneralInputModule} from "../../../../../../template/input/general_input/module";
import {SelectInputModule} from "../../../../../../template/input/select_input/module";
import {MultiSelectModule} from "../../../../../../template/input/multi_select/module";

@NgModule({
    declarations: [EditComponent],
    imports: [
        CommonModule,
        TranslateModule,
        EditRouting,
        GeneralInputModule,
        SelectInputModule,
        MultiSelectModule
    ],
    exports: [EditComponent]
})
export class EditModule {
}
