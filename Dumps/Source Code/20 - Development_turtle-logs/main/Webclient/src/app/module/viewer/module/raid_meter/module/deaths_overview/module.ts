import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {DeathsOverviewComponent} from "./component/deaths_overview/deaths_overview";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ShowTooltipDirectiveModule} from "../../../../../../directive/show_tooltip/module";

@NgModule({
    declarations: [DeathsOverviewComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        ShowTooltipDirectiveModule
    ],
    exports: [DeathsOverviewComponent]
})
export class DeathsOverviewModule {
}
