import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {RaidTitleBarComponent} from "./component/raid_title_bar/raid_title_bar";
import {CommonModule} from "@angular/common";
import {ShowTooltipDirectiveModule} from "../../../../directive/show_tooltip/module";

@NgModule({
    declarations: [RaidTitleBarComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ShowTooltipDirectiveModule
    ],
    exports: [RaidTitleBarComponent]
})
export class RaidTitleBarModule {
}
