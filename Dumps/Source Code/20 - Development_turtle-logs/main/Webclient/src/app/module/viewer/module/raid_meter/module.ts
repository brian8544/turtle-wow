import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {RaidMeterComponent} from "./component/raid_meter/raid_meter";
import {CommonModule} from "@angular/common";
import {SelectInputModule} from "../../../../template/input/select_input/module";
import {RouterModule} from "@angular/router";
import {ShowTooltipDirectiveModule} from "../../../../directive/show_tooltip/module";
import {MeterGraphModule} from "../../../../template/meter_graph/module";
import {DeathsOverviewModule} from "./module/deaths_overview/module";
import {UnAuraOverviewModule} from "./module/un_aura_overview/module";

@NgModule({
    declarations: [RaidMeterComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SelectInputModule,
        RouterModule,
        ShowTooltipDirectiveModule,
        MeterGraphModule,
        DeathsOverviewModule,
        UnAuraOverviewModule
    ],
    exports: [RaidMeterComponent]
})
export class RaidMeterModule {
}
