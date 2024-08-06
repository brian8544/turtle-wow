import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {PopupRemoveComponent} from "./component/popup_remove/popup_remove";
import {CommonModule} from "@angular/common";
import {SelectInputModule} from "../../../../../../../../template/input/select_input/module";

@NgModule({
    declarations: [PopupRemoveComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SelectInputModule,
    ],
    exports: [PopupRemoveComponent]
})
export class PopupRemoveModule {
}
