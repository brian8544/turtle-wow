import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {RankingMeterTooltipComponent} from "./component/ranking_meter_tooltip/ranking_meter_tooltip";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [RankingMeterTooltipComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule
    ],
    exports: [RankingMeterTooltipComponent]
})
export class RankingMeterTooltipModule {
}
