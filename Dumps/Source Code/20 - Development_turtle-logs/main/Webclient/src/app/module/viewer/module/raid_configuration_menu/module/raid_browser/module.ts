import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {RaidBrowserComponent} from "./component/raid_browser/raid_browser";
import {CommonModule} from "@angular/common";
import {MultiSelectModule} from "../../../../../../template/input/multi_select/module";
import {PopupRemoveModule} from "./module/popup_remove/module";
import {PopupAddModule} from "./module/popup_add/module";

@NgModule({
    declarations: [RaidBrowserComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MultiSelectModule,
        PopupRemoveModule,
        PopupAddModule,
    ],
    exports: [RaidBrowserComponent]
})
export class RaidBrowserModule {
}
