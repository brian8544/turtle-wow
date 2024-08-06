import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {RaidCompositionComponent} from "./component/raid_composition/raid_composition";
import {CommonModule} from "@angular/common";
import {CaretButtonModule} from "../../../../template/button/caret_button/module";
import {RouterModule} from "@angular/router";
import {ShowTooltipDirectiveModule} from "../../../../directive/show_tooltip/module";

@NgModule({
    declarations: [RaidCompositionComponent],
    imports: [
        CommonModule,
        TranslateModule,
        CaretButtonModule,
        RouterModule,
        ShowTooltipDirectiveModule
    ],
    exports: [RaidCompositionComponent]
})
export class RaidCompositionModule {
}
